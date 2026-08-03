/** Логика бота: ответы на сообщения и рассылка разборов по расписанию. */

import type { ApiClient } from '../../vk-audit/src/vk/client';
import { GREETING, HELP_TEXT, parseCommand, statusText } from './commands';
import type { DeepSeek } from './deepseek';
import { buildDigest } from './digest';
import type { IncomingMessage, LongPollEvent } from './longpoll';
import { systemPrompt } from './niche';
import { due, PERIOD_LABEL, type Store, type Subscription } from './store';
import { sendMessage } from './vk';

export interface BotDeps {
  /** Ключ сообщества: им бот пишет людям. */
  groupApi: ApiClient;
  /** Сервисный ключ: им читаются стены (ключом сообщества это запрещено). */
  readApi: ApiClient;
  store: Store;
  llm: DeepSeek | null;
  tzOffset: number;
  log?: (message: string) => void;
  /**
   * Не отправлять сообщения, а печатать их в лог.
   *
   * Всё остальное работает как обычно: Long Poll слушается, данные
   * собираются, подписки сохраняются. Не происходит ровно одного —
   * `messages.send`. Это и есть разница между «проверить на себе»
   * и «разослать черновик живым людям».
   */
  dryRun?: boolean;
}

export class Bot {
  private readonly log: (message: string) => void;

  constructor(private readonly deps: BotDeps) {
    this.log = deps.log ?? console.log;
  }

  private async say(userId: number, text: string): Promise<void> {
    if (this.deps.dryRun) {
      this.log(`[без отправки] → ${userId}:\n${text}\n`);
      return;
    }
    await sendMessage(this.deps.groupApi, userId, text);
  }

  /** Единая точка входа для всего, что приходит из Long Poll. */
  async handleEvent(event: LongPollEvent): Promise<void> {
    if (event.kind === 'message') {
      await this.handleMessage(event);
      return;
    }
    if (event.kind === 'deny') {
      // человек запретил сообщения — писать ему больше нельзя
      if (this.deps.store.get(event.userId)) {
        await this.deps.store.upsert(event.userId, { active: false });
      }
      this.log(`Пользователь ${event.userId} запретил сообщения`);
      return;
    }
    await this.allow(event.userId, event.key);
  }

  async handleMessage({ userId, text }: IncomingMessage): Promise<void> {
    const { store } = this.deps;
    const command = parseCommand(text);
    const current = store.get(userId);

    switch (command.kind) {
      case 'start':
        await store.upsert(userId, { active: true });
        await this.say(userId, GREETING);
        return;

      case 'help':
        await this.say(userId, HELP_TEXT);
        return;

      case 'status':
        if (!current?.target) {
          await this.say(userId, 'Пока не за чем следить — пришлите ссылку на страницу.');
          return;
        }
        await this.say(userId, statusText(
          current.title ?? current.target, current.period, current.lastSentAt,
        ));
        return;

      case 'stop':
        if (current) await store.upsert(userId, { active: false });
        await this.say(userId, 'Отключил рассылку. Чтобы вернуть — напишите «начать».');
        return;

      case 'setPeriod': {
        if (!current?.target) {
          await this.say(userId, 'Сначала пришлите ссылку на страницу, за которой следить.');
          return;
        }
        await store.upsert(userId, { period: command.period, active: true });
        await this.say(userId, `Хорошо, буду присылать ${PERIOD_LABEL[command.period]}.`);
        return;
      }

      case 'setTarget': {
        await store.upsert(userId, {
          target: command.target, active: true, failures: 0, lastSentAt: 0, lastMetrics: undefined,
        });
        await this.say(userId, 'Принял. Собираю первый разбор — это займёт полминуты.');
        await this.sendDigest(userId);
        return;
      }

      case 'now': {
        if (!current?.target) {
          await this.say(userId, 'Сначала пришлите ссылку на страницу.');
          return;
        }
        await this.say(userId, 'Собираю разбор…');
        await this.sendDigest(userId);
        return;
      }

      case 'question':
        await this.answer(userId, command.text, current);
        return;

      default:
        await this.say(userId, `Не понял.\n\n${HELP_TEXT}`);
    }
  }

  /**
   * Ответ на уточняющий вопрос по последнему разбору.
   *
   * Отвечаем только по фактам, которые уже ушли человеку: так ответ
   * не разойдётся с письмом, которое он читал. Без модели или без
   * разбора честно говорим, чего не хватает, — выдумывать ответ
   * про чужую страницу нельзя.
   */
  async answer(userId: number, question: string, subscription?: Subscription): Promise<void> {
    const { llm } = this.deps;

    if (!subscription?.lastFacts) {
      await this.say(userId, 'Пока не по чему отвечать — сначала пришлите ссылку '
        + `на страницу, и я соберу разбор.\n\n${HELP_TEXT}`);
      return;
    }
    if (!llm) {
      await this.say(userId, 'Отвечать на вопросы я умею только с подключённой '
        + `моделью, а её сейчас нет.\n\n${HELP_TEXT}`);
      return;
    }

    try {
      const text = await llm.ask(
        question, subscription.lastFacts, systemPrompt(subscription.niche),
      );
      await this.say(userId, text);
      this.log(`Ответ на вопрос ${userId}: ${question.slice(0, 60)}`);
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      this.log(`Не ответил ${userId}: ${reason}`);
      await this.say(userId, 'Не получилось ответить: модель молчит. '
        + 'Попробуйте ещё раз через несколько минут.');
    }
  }

  /** Собрать и отправить разбор одному подписчику. */
  async sendDigest(userId: number): Promise<void> {
    const { store, readApi, llm, tzOffset } = this.deps;
    const subscription = store.get(userId);
    if (!subscription?.target) return;

    try {
      const digest = await buildDigest(readApi, subscription, llm, tzOffset);
      await this.say(userId, digest.text);
      const now = Math.floor(Date.now() / 1000);
      await store.upsert(userId, {
        title: digest.title,
        lastSentAt: now,
        lastMetrics: digest.metrics,
        lastFacts: digest.facts,
        lastAdvice: digest.advice,
        niche: digest.niche.label || undefined,
        failures: 0,
      });
      // история пишется после метрик: по ней считается длинная дистанция
      await store.pushHistory(userId, { at: now, ...digest.metrics });
      this.log(`Разбор отправлен ${userId} (${digest.title}${digest.usedLLM ? '' : ', без DeepSeek'})`);
    } catch (err) {
      const failures = (subscription.failures ?? 0) + 1;
      await store.upsert(userId, { failures });
      const reason = err instanceof Error ? err.message : String(err);
      this.log(`Не удалось собрать разбор для ${userId}: ${reason}`);

      // молчать нельзя: человек ждёт письма и должен понять, что пошло не так
      if (failures >= 3) {
        await this.say(userId, `Третий раз подряд не получается собрать разбор: ${reason}\n\n`
          + 'Поставил рассылку на паузу. Пришлите другую ссылку или напишите «разбор», '
          + 'когда страница снова будет доступна.');
      } else {
        await this.say(userId, `Не получилось собрать разбор: ${reason}\n\n`
          + 'Попробую в следующий раз по расписанию.');
      }
    }
  }

  /** Один проход планировщика: кому пора — тому и шлём. */
  async tick(now = Math.floor(Date.now() / 1000)): Promise<number> {
    const pending = due(this.deps.store.active(), now);
    for (const subscription of pending) {
      await this.sendDigest(subscription.userId);
    }
    return pending.length;
  }

  /**
   * Человек разрешил сообщения — обычно из мини-приложения.
   *
   * В `key` приложение кладёт адрес страницы, поэтому подписка оформляется
   * сразу, без переписки: сначала подтверждение, следом первый разбор.
   */
  async allow(userId: number, key?: string): Promise<Subscription> {
    const target = key?.trim();
    const subscription = await this.deps.store.upsert(userId, {
      active: true,
      ...(target ? { target, failures: 0, lastSentAt: 0, lastMetrics: undefined } : {}),
    });

    if (!target) {
      await this.say(userId, GREETING);
      return subscription;
    }

    await this.say(userId, `Готово: буду присылать разбор страницы ${target} `
      + `${PERIOD_LABEL[subscription.period]}. Собираю первый — минуту.`);
    await this.sendDigest(userId);
    return subscription;
  }
}
