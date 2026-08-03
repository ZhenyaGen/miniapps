/**
 * Проверяется всё, что можно проверить без сети: разбор команд, расписание,
 * нарезка длинных сообщений, разбор событий Long Poll и сценарий подписки
 * на подставном API.
 */
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { Bot } from './bot';
import { parseCommand } from './commands';
import { longTrend, movement, planStalled } from './compare';
import { compute } from './engine';
import { detectNiche, systemPrompt } from './niche';
import { toEvent } from './longpoll';
import { due, PERIOD_DAYS, Store } from './store';
import { splitMessage } from './vk';
import demoSnapshot from '../../vk-audit/src/engine/__fixtures__/demo-snapshot.json';
import type { ApiClient } from '../../vk-audit/src/vk/client';

describe('команды', () => {
  it('узнаёт ключевые слова', () => {
    expect(parseCommand('начать')).toEqual({ kind: 'start' });
    expect(parseCommand('  СТОП ')).toEqual({ kind: 'stop' });
    expect(parseCommand('месяц')).toEqual({ kind: 'setPeriod', period: 'month' });
    expect(parseCommand('неделя')).toEqual({ kind: 'setPeriod', period: 'week' });
    expect(parseCommand('разбор')).toEqual({ kind: 'now' });
    expect(parseCommand('статус')).toEqual({ kind: 'status' });
  });

  it('вытаскивает страницу из ссылки в любом виде', () => {
    for (const raw of [
      'https://vk.com/durov',
      'vk.ru/durov',
      'm.vk.com/durov?w=wall1',
      '@durov',
      'durov',
    ]) {
      expect(parseCommand(raw)).toEqual({ kind: 'setTarget', target: 'durov' });
    }
  });

  it('различает периодичность, включая две недели', () => {
    expect(parseCommand('две недели')).toEqual({ kind: 'setPeriod', period: 'biweek' });
    expect(parseCommand('раз в две недели')).toEqual({ kind: 'setPeriod', period: 'biweek' });
    expect(parseCommand('2 недели')).toEqual({ kind: 'setPeriod', period: 'biweek' });
    // «неделя» отдельно от «двух недель» — иначе biweek никогда бы не сработал
    expect(parseCommand('неделя')).toEqual({ kind: 'setPeriod', period: 'week' });
  });

  it('обычную фразу считает вопросом, а не адресом', () => {
    expect(parseCommand('а что ты умеешь делать'))
      .toEqual({ kind: 'question', text: 'а что ты умеешь делать' });
    expect(parseCommand('почему упали просмотры?'))
      .toEqual({ kind: 'question', text: 'почему упали просмотры?' });
    expect(parseCommand('')).toEqual({ kind: 'unknown' });
    expect(parseCommand('ага')).toEqual({ kind: 'unknown' });
  });
});

describe('победы и поражения', () => {
  const post = (daysAgo: number, views: number, engagement: number, now: number) => ({
    id: daysAgo, url: '', ts: now - daysAgo * 86400, date_label: '', month: '', dow: 1,
    hour: 12, text: '', excerpt: '', len: 100, type: 'Фото' as const, is_repost: false,
    is_pinned: false, is_ad: false, hashtags: [], has_link: false, has_question: false,
    has_cta: false, likes: engagement, comments: 0, reposts: 0, views,
    engagement, er: views ? (engagement / views) * 100 : null, er_aud: 0,
  });

  const now = 1_800_000_000;
  /** Свежее окно лучше предыдущего: больше просмотров и реакций. */
  const grown = {
    posts: [
      ...[2, 5, 9, 12].map((d) => post(d, 1000, 30, now)),
      ...[16, 20, 24, 27].map((d) => post(d, 600, 12, now)),
    ],
  } as never;

  it('видит рост и не путает его с падением', () => {
    const move = movement(grown, 14, now);
    expect(move.reliable).toBe(true);
    expect(move.wins.some((w) => w.includes('Просмотры на пост'))).toBe(true);
    expect(move.wins.some((w) => w.includes('Вовлечённость'))).toBe(true);
    expect(move.losses).toEqual([]);
  });

  it('мелкие колебания не считает движением', () => {
    const flat = {
      posts: [
        ...[2, 5, 9, 12].map((d) => post(d, 1000, 20, now)),
        ...[16, 20, 24, 27].map((d) => post(d, 1030, 20, now)),
      ],
    } as never;
    const move = movement(flat, 14, now);
    expect(move.wins).toEqual([]);
    expect(move.losses).toEqual([]);
  });

  it('молчание называет отдельно и ставит первым', () => {
    const silent = { posts: [16, 20, 24, 27].map((d) => post(d, 600, 12, now)) } as never;
    const move = movement(silent, 14, now);
    expect(move.losses[0]).toContain('не вышло ни одного поста');
  });

  it('на двух постах честно говорит, что сравнение ненадёжно', () => {
    const thin = { posts: [post(2, 1000, 30, now), post(20, 600, 12, now)] } as never;
    expect(movement(thin, 14, now).reliable).toBe(false);
  });

  it('находит лучший пост свежего окна', () => {
    const move = movement(grown, 14, now);
    expect(move.best?.ts).toBeGreaterThan(now - 14 * 86400);
  });
});

describe('длинная дистанция', () => {
  const point = (weeksAgo: number, er: number) => ({
    at: 1_800_000_000 - weeksAgo * 604800,
    er, perWeek: 2, avgViews: 500, audience: 1000, findings: 5,
  });

  it('на трёх точках молчит — это ещё не дистанция', () => {
    expect(longTrend([point(3, 1), point(2, 1.2), point(1, 1.4)])).toEqual([]);
  });

  it('сравнивает первую треть с последней', () => {
    const lines = longTrend([
      point(6, 1.0), point(5, 1.1), point(4, 1.2),
      point(3, 1.6), point(2, 1.8), point(1, 2.0),
    ]);
    expect(lines[0]).toContain('недель наблюдений');
    expect(lines.some((l) => l.startsWith('Вовлечённость'))).toBe(true);
  });

  it('ровный ряд поводом для вывода не считает', () => {
    const flat = [1, 2, 3, 4, 5, 6].map((w) => point(w, 1.5));
    expect(longTrend(flat)).toEqual([]);
  });
});

describe('ниша и промпт', () => {
  it('без ниши промпт остаётся общим', () => {
    expect(systemPrompt()).not.toContain('нише');
    expect(systemPrompt({ label: '', source: 'не определена', keywords: [] })).not.toContain('нише');
  });

  it('с нишей добавляет её и словарь страницы', () => {
    const prompt = systemPrompt({
      label: 'автосервис', source: 'категория', keywords: ['подвеска', 'диагностика'],
    });
    expect(prompt).toContain('автосервис');
    expect(prompt).toContain('подвеска');
    // правила про числа никуда не деваются
    expect(prompt).toContain('ЖЁСТКОЕ ПРАВИЛО');
  });

  it('берёт нишу из категории сообщества, когда она есть', () => {
    const snapshot = { ...demoSnapshot } as never;
    const metrics = compute(snapshot, 3);
    const niche = detectNiche(
      { ...(demoSnapshot as never as { profile: object }).profile, kind: 'group', occupation: 'Маркетинг' } as never,
      metrics,
    );
    expect(niche.label).toBe('маркетинг');
    expect(niche.source).toBe('категория');
  });
});

describe('напоминание про план', () => {
  const move = (wins: string[], reliable: boolean) => (
    { wins, losses: [], best: null, worst: null, reliable } as never
  );

  it('молчит, когда советов ещё не было', () => {
    expect(planStalled(move([], true), [])).toBe(false);
  });

  it('срабатывает, когда советы были, а роста нет', () => {
    expect(planStalled(move([], true), ['Поднять частоту'])).toBe(true);
  });

  it('не срабатывает, если что-то выросло', () => {
    expect(planStalled(move(['ER вырос'], true), ['Поднять частоту'])).toBe(false);
  });

  it('не срабатывает на ненадёжной выборке', () => {
    expect(planStalled(move([], false), ['Поднять частоту'])).toBe(false);
  });
});

describe('расписание', () => {
  const base = {
    userId: 1, target: 'durov', period: 'week' as const, createdAt: 0,
    active: true, failures: 0,
  };
  const now = 1_800_000_000;

  it('шлёт, когда период прошёл, и молчит, когда нет', () => {
    const fresh = { ...base, lastSentAt: now - 3 * 86400 };
    const stale = { ...base, lastSentAt: now - PERIOD_DAYS.week * 86400 };
    expect(due([fresh], now)).toEqual([]);
    expect(due([stale], now)).toEqual([stale]);
  });

  it('пропускает отключённых, безадресных и упавших трижды', () => {
    const old = now - 400 * 86400;
    expect(due([{ ...base, lastSentAt: old, active: false }], now)).toEqual([]);
    expect(due([{ ...base, lastSentAt: old, target: '' }], now)).toEqual([]);
    expect(due([{ ...base, lastSentAt: old, failures: 3 }], now)).toEqual([]);
  });

  it('месячная подписка ждёт дольше недельной', () => {
    const lastSentAt = now - 10 * 86400;
    expect(due([{ ...base, lastSentAt }], now)).toHaveLength(1);
    expect(due([{ ...base, lastSentAt, period: 'month' }], now)).toHaveLength(0);
  });
});

describe('длинные сообщения', () => {
  it('короткое не трогает', () => {
    expect(splitMessage('привет')).toEqual(['привет']);
  });

  it('режет по абзацам и укладывается в лимит', () => {
    const text = Array.from({ length: 40 }, (_, i) => `Абзац ${i} ${'я'.repeat(200)}`).join('\n\n');
    const parts = splitMessage(text, 1000);
    expect(parts.length).toBeGreaterThan(1);
    parts.forEach((part) => expect(part.length).toBeLessThanOrEqual(1000));
    expect(parts.join('\n\n')).toBe(text);
  });

  it('разрезает абзац, который сам длиннее лимита', () => {
    const parts = splitMessage(`${'а'.repeat(500)}\n${'б'.repeat(500)}`, 600);
    expect(parts.length).toBe(2);
    parts.forEach((part) => expect(part.length).toBeLessThanOrEqual(600));
  });
});

describe('события Long Poll', () => {
  it('берёт личное сообщение от человека', () => {
    expect(toEvent({
      type: 'message_new',
      object: { message: { from_id: 42, text: 'привет' } },
    })).toEqual({ kind: 'message', userId: 42, text: 'привет', payload: undefined });
  });

  it('пропускает беседы, сообщества и чужие события', () => {
    expect(toEvent({ type: 'message_new', object: { message: { from_id: 2_000_000_001, text: 'x' } } })).toBeNull();
    expect(toEvent({ type: 'message_new', object: { message: { from_id: -100, text: 'x' } } })).toBeNull();
    expect(toEvent({ type: 'like_add', object: { from_id: 1 } })).toBeNull();
  });

  it('разбирает разрешение и запрет сообщений', () => {
    expect(toEvent({ type: 'message_allow', object: { user_id: 7, key: 'demo_marketing' } }))
      .toEqual({ kind: 'allow', userId: 7, key: 'demo_marketing' });
    expect(toEvent({ type: 'message_deny', object: { user_id: 7 } }))
      .toEqual({ kind: 'deny', userId: 7 });
  });
});

describe('сценарий подписки', () => {
  let dir: string;
  let store: Store;
  let sent: Array<{ userId: number; text: string }>;
  let bot: Bot;

  /** Подставной VK API: сообщения копим, данные отдаём из демо-снимка. */
  const fakeApi = (): ApiClient => ({
    calls: 0,
    async call<T>(method: string, params: Record<string, string | number> = {}): Promise<T> {
      if (method === 'messages.send') {
        sent.push({ userId: Number(params.user_id), text: String(params.message) });
        return 1 as T;
      }
      if (method === 'utils.resolveScreenName') {
        return { type: 'group', object_id: 100500 } as T;
      }
      if (method === 'groups.getById') {
        return { groups: [{ id: 100500, name: 'Демо-сообщество', screen_name: 'demo_marketing', members_count: 2840, description: 'Практика продвижения.' }] } as T;
      }
      if (method === 'wall.get') {
        return { items: demoSnapshot.posts, count: demoSnapshot.posts.length } as T;
      }
      if (method === 'stats.get' || method === 'stats.getPostReach') {
        throw new Error('Нет доступа');
      }
      return null as T;
    },
  });

  beforeEach(async () => {
    dir = await mkdtemp(join(tmpdir(), 'vk-bot-'));
    store = new Store(join(dir, 'subs.json'));
    await store.load();
    sent = [];
    const api = fakeApi();
    bot = new Bot({ groupApi: api, readApi: api, store, llm: null, tzOffset: 3, log: () => {} });
  });

  afterEach(async () => {
    await rm(dir, { recursive: true, force: true });
  });

  it('на «начать» здоровается и заводит подписчика', async () => {
    await bot.handleMessage({ userId: 7, text: 'начать' });
    expect(store.get(7)?.active).toBe(true);
    expect(sent).toHaveLength(1);
  });

  it('по ссылке собирает разбор и запоминает метрики', async () => {
    await bot.handleMessage({ userId: 7, text: 'vk.com/demo_marketing' });

    const subscription = store.get(7);
    expect(subscription?.target).toBe('demo_marketing');
    expect(subscription?.lastSentAt).toBeGreaterThan(0);
    expect(subscription?.lastMetrics?.findings).toBeGreaterThan(0);

    // первое сообщение — «принял», второе — сам разбор с цифрами
    expect(sent).toHaveLength(2);
    expect(sent[1].text).toContain('Демо-сообщество');
    expect(sent[1].text).toMatch(/Постов: \d+/);
  });

  it('второй разбор сравнивает с прошлым', async () => {
    await bot.handleMessage({ userId: 7, text: 'vk.com/demo_marketing' });
    sent = [];
    await bot.handleMessage({ userId: 7, text: 'разбор' });
    expect(sent[1].text).toContain('С прошлого раза');
  });

  it('меняет периодичность и отключается', async () => {
    await bot.handleMessage({ userId: 7, text: 'vk.com/demo_marketing' });
    await bot.handleMessage({ userId: 7, text: 'месяц' });
    expect(store.get(7)?.period).toBe('month');

    await bot.handleMessage({ userId: 7, text: 'стоп' });
    expect(store.get(7)?.active).toBe(false);
    expect(store.get(7)?.target).toBe('demo_marketing');
  });

  it('планировщик шлёт только тем, у кого срок подошёл', async () => {
    await bot.handleMessage({ userId: 7, text: 'vk.com/demo_marketing' });
    expect(await bot.tick()).toBe(0);

    const later = Math.floor(Date.now() / 1000) + PERIOD_DAYS.week * 86400;
    expect(await bot.tick(later)).toBe(1);
  });

  it('разрешение из мини-приложения сразу подписывает на страницу', async () => {
    await bot.handleEvent({ kind: 'allow', userId: 7, key: 'demo_marketing' });

    expect(store.get(7)?.target).toBe('demo_marketing');
    expect(store.get(7)?.lastSentAt).toBeGreaterThan(0);
    expect(sent[1].text).toContain('Демо-сообщество');
  });

  it('запрет сообщений отключает рассылку', async () => {
    await bot.handleMessage({ userId: 7, text: 'vk.com/demo_marketing' });
    await bot.handleEvent({ kind: 'deny', userId: 7 });
    expect(store.get(7)?.active).toBe(false);
  });

  it('пишет историю и отвечает на вопрос по последнему разбору', async () => {
    await bot.handleMessage({ userId: 7, text: 'vk.com/demo_marketing' });

    const subscription = store.get(7);
    expect(subscription?.history).toHaveLength(1);
    expect(subscription?.history?.[0].at).toBeGreaterThan(0);
    // факты сохранены — по ним бот и отвечает на уточняющие вопросы
    expect(subscription?.lastFacts).toContain('Демо-сообщество');
    expect(subscription?.lastAdvice?.length).toBeGreaterThan(0);

    sent = [];
    await bot.handleMessage({ userId: 7, text: 'почему просели просмотры?' });
    // модели в тесте нет, и бот честно говорит об этом, а не выдумывает ответ
    expect(sent[0].text).toContain('моделью');
  });

  it('на вопрос без разбора зовёт сначала прислать ссылку', async () => {
    await bot.handleMessage({ userId: 7, text: 'а что вообще происходит с охватом' });
    expect(sent[0].text).toContain('пришлите ссылку');
  });

  it('история копится и обрезается до двенадцати точек', async () => {
    for (let i = 0; i < 14; i += 1) {
      await store.pushHistory(7, {
        at: i, er: i, perWeek: 1, avgViews: 100, audience: 10, findings: 1,
      });
    }
    const history = store.get(7)?.history ?? [];
    expect(history).toHaveLength(12);
    // обрезаются старые, свежие остаются
    expect(history[history.length - 1].er).toBe(13);
  });

  it('переключается на раз в две недели', async () => {
    await bot.handleMessage({ userId: 7, text: 'vk.com/demo_marketing' });
    await bot.handleMessage({ userId: 7, text: 'две недели' });
    expect(store.get(7)?.period).toBe('biweek');

    const later = Math.floor(Date.now() / 1000) + PERIOD_DAYS.biweek * 86400;
    expect(await bot.tick(later)).toBe(1);
    // через неделю после разбора двухнедельная подписка ещё молчит
    await store.upsert(7, { lastSentAt: Math.floor(Date.now() / 1000) });
    expect(await bot.tick(Math.floor(Date.now() / 1000) + 8 * 86400)).toBe(0);
  });

  it('подписки переживают перезапуск', async () => {
    await bot.handleMessage({ userId: 7, text: 'vk.com/demo_marketing' });
    const reopened = new Store(join(dir, 'subs.json'));
    await reopened.load();
    expect(reopened.get(7)?.target).toBe('demo_marketing');
  });

  describe('режим без отправки', () => {
    let logged: string[];
    let dryBot: Bot;

    beforeEach(() => {
      logged = [];
      const api = fakeApi();
      dryBot = new Bot({
        groupApi: api,
        readApi: api,
        store,
        llm: null,
        tzOffset: 3,
        log: (message) => logged.push(message),
        dryRun: true,
      });
    });

    it('не вызывает messages.send, но показывает текст в логе', async () => {
      await dryBot.handleMessage({ userId: 7, text: 'vk.com/demo_marketing' });

      expect(sent).toEqual([]);
      expect(logged.some((line) => line.includes('Демо-сообщество'))).toBe(true);
      expect(logged.some((line) => line.includes('[без отправки] → 7'))).toBe(true);
    });

    it('всё остальное работает как обычно: подписка и метрики сохраняются', async () => {
      await dryBot.handleMessage({ userId: 7, text: 'vk.com/demo_marketing' });

      const subscription = store.get(7);
      expect(subscription?.target).toBe('demo_marketing');
      expect(subscription?.lastSentAt).toBeGreaterThan(0);
      expect(subscription?.lastMetrics?.findings).toBeGreaterThan(0);
    });

    it('планировщик отрабатывает срок, ничего не отправляя', async () => {
      await dryBot.handleMessage({ userId: 7, text: 'vk.com/demo_marketing' });
      const later = Math.floor(Date.now() / 1000) + PERIOD_DAYS.week * 86400;

      expect(await dryBot.tick(later)).toBe(1);
      expect(sent).toEqual([]);
    });
  });
});
