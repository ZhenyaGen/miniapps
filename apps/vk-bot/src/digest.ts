/**
 * Разбор для личного сообщения: сбор данных, факты для модели и готовый текст.
 *
 * Числа считает движок, DeepSeek только пересказывает их по-человечески.
 * Если ключа нет или модель не ответила, письмо всё равно уходит — просто
 * фактами, без пересказа.
 */

import { collect } from '../../vk-audit/src/vk/collect';
import type { ApiClient } from '../../vk-audit/src/vk/client';
import { compute, findGrowthZones, buildPlan, f } from './engine';
import type { Finding, Metrics, Snapshot } from './engine';
import { longTrend, movement, planStalled, type Movement } from './compare';
import type { DeepSeek } from './deepseek';
import { detectNiche, systemPrompt, type Niche } from './niche';
import type { Subscription } from './store';
import { PERIOD_DAYS, PERIOD_LABEL } from './store';

export interface Digest {
  text: string;
  title: string;
  metrics: NonNullable<Subscription['lastMetrics']>;
  usedLLM: boolean;
  /** Факты, ушедшие модели: по ним же бот отвечает на уточняющие вопросы. */
  facts: string;
  /** Что советовали — чтобы в следующий раз проверить, сдвинулось ли. */
  advice: string[];
  niche: Niche;
}

/**
 * Период сбора заметно шире периода рассылки: нужно и с чем сравнивать,
 * и на чём считать медианы. Две недели постов — это не выборка.
 */
function periodDays(subscription: Subscription): number {
  if (subscription.period === 'week') return 60;
  return subscription.period === 'biweek' ? 90 : 120;
}

/** Окно «победы и поражения» — по периоду подписки, но не короче двух недель. */
function movementDays(subscription: Subscription): number {
  return Math.max(14, PERIOD_DAYS[subscription.period]);
}

/** Сухая выжимка — она же контекст для модели, она же запасной текст. */
export function factsBlock(
  snapshot: Snapshot,
  m: Metrics,
  findings: Finding[],
  previous?: Subscription['lastMetrics'],
  move?: Movement,
  history?: Subscription['history'],
  niche?: Niche,
): string {
  const p = snapshot.profile;
  const lines = [
    `Страница: ${p.name} (${p.url})`,
    `${p.audience_label}: ${f(m.audience, 0)}`,
    `Период: ${m.period.from} — ${m.period.to}`,
    `Постов: ${m.posts_total}, частота ${f(m.per_week)} в неделю`,
    `${m.er_basis_label}: ${f(m.er, 2)}% (медиана ${f(m.er_median, 2)}%)`,
    `Просмотров на пост: ${f(m.avg.views, 0)} (${f(m.views_per_audience)}% аудитории)`,
    `Реакций на пост: ${f(m.avg.engagement, 1)}, комментариев ${f(m.avg.comments, 1)}, репостов ${f(m.avg.reposts, 1)}`,
    `Молчание: ${f(m.silent_days, 0)} дней с последнего поста`,
  ];

  if (previous) {
    lines.push(
      '',
      'Прошлый разбор (для сравнения):',
      `ER было ${f(previous.er, 2)}%, стало ${f(m.er, 2)}%`,
      `Частота была ${f(previous.perWeek)}, стала ${f(m.per_week)}`,
      `Просмотры были ${f(previous.avgViews, 0)}, стали ${f(m.avg.views, 0)}`,
      `${p.audience_label} было ${f(previous.audience, 0)}, стало ${f(m.audience, 0)}`,
      `Зон роста было ${previous.findings}, стало ${findings.length}`,
    );
  }

  if (niche?.label) {
    lines.push('', `Ниша страницы: ${niche.label} (определена по: ${niche.source})`);
  }

  if (move) {
    const label = `Последние ${f(move.recent.perWeek ? 14 : 14, 0)} дней против предыдущих`;
    lines.push('', `${label}:`);
    if (move.wins.length) {
      lines.push('Выросло:');
      move.wins.forEach((w) => lines.push(`+ ${w}`));
    }
    if (move.losses.length) {
      lines.push('Просело:');
      move.losses.forEach((l) => lines.push(`- ${l}`));
    }
    if (!move.wins.length && !move.losses.length) {
      lines.push('Заметных изменений нет — всё в пределах обычного разброса.');
    }
    if (!move.reliable) {
      lines.push('ВНИМАНИЕ: постов в окне мало, сравнение приблизительное — '
        + 'так и скажи владельцу, не выдавай это за факт.');
    }
    if (move.best) {
      lines.push(`Лучший пост окна: ER ${f(move.best.er ?? 0, 2)}%, `
        + `${move.best.type}, «${move.best.excerpt}»`);
    }
    if (move.worst) {
      lines.push(`Худший пост окна: ER ${f(move.worst.er ?? 0, 2)}%, `
        + `${move.worst.type}, «${move.worst.excerpt}»`);
    }
  }

  const trend = longTrend(history);
  if (trend.length) lines.push('', ...trend);

  if (m.best_slots.length) {
    lines.push('', `Лучшее время: ${m.best_slots.slice(0, 2).map((s) => `${s.label} (ER ${f(s.avg_er, 2)}%)`).join(', ')}`);
  }
  if (m.by_type.length) {
    lines.push(`Лучший формат: ${m.by_type[0].label}, ER ${f(m.by_type[0].avg_er, 2)}%`);
  }

  lines.push('', 'Зоны роста по важности:');
  findings.slice(0, 6).forEach((item) => {
    lines.push(`${item.rank}. ${item.title} — ${item.evidence}`);
  });

  return lines.join('\n');
}

/** Что делать на этой неделе — первые задачи ближайшего этапа плана. */
export function nextSteps(findings: Finding[], m: Metrics): string[] {
  const plan = buildPlan(findings, m);
  const stage = plan.find((s) => s.tasks.some((t) => t.source !== 'База')) ?? plan[0];
  return stage.tasks.filter((t) => t.source !== 'База').slice(0, 3).map((t) => t.text);
}

/** Запасной текст без модели: то же самое, только сухо. */
export function plainDigest(
  snapshot: Snapshot,
  m: Metrics,
  findings: Finding[],
  subscription: Subscription,
  move?: Movement,
): string {
  const p = snapshot.profile;
  const prev = subscription.lastMetrics;
  const lines = [
    `Разбор страницы «${p.name}» за ${PERIOD_DAYS[subscription.period]} дней.`,
    '',
    `Постов: ${m.posts_total}, это ${f(m.per_week)} в неделю.`,
    `${m.er_basis_label}: ${f(m.er, 2)}%. Просмотров на пост: ${f(m.avg.views, 0)}.`,
    `Реакций на пост: ${f(m.avg.engagement, 1)}.`,
  ];

  if (prev) {
    const delta = m.er - prev.er;
    const word = delta > 0.05 ? 'вырос' : delta < -0.05 ? 'просел' : 'держится';
    lines.push('', `С прошлого раза ER ${word}: было ${f(prev.er, 2)}%, стало ${f(m.er, 2)}%.`);
  }

  if (move?.wins.length) {
    lines.push('', 'Победы:');
    move.wins.forEach((w) => lines.push(`+ ${w}`));
  }
  if (move?.losses.length) {
    lines.push('', 'Просело:');
    move.losses.forEach((l) => lines.push(`- ${l}`));
  }
  if (move && !move.reliable && (move.wins.length || move.losses.length)) {
    lines.push('', 'Постов за окно мало — сравнение приблизительное.');
  }

  if (findings.length) {
    lines.push('', 'Что чинить в первую очередь:');
    findings.slice(0, 3).forEach((item, i) => {
      lines.push(`${i + 1}. ${item.title}. ${item.evidence}.`);
    });

    const steps = nextSteps(findings, m);
    if (steps.length) {
      lines.push('', 'Ближайшие шаги:');
      steps.forEach((step) => lines.push(`— ${step}`));
    }
  } else {
    lines.push('', 'Правила не нашли, к чему придраться. Держите темп.');
  }

  lines.push('', `Следующий разбор — ${PERIOD_LABEL[subscription.period]}. `
    + 'Чтобы поменять, напишите «неделя», «две недели» или «месяц». '
    + 'Вопрос по разбору можно задать прямо в ответ на это сообщение.');
  return lines.join('\n');
}

const TAIL_COMMON = 'Без приветствий вроде «здравствуйте», сразу по делу. '
  + 'В конце одной строкой напомни, что периодичность меняется словами '
  + '«неделя», «две недели» или «месяц», «стоп» отключает рассылку, '
  + 'а на любой вопрос по разбору можно просто написать в ответ.';

/**
 * Два разных письма под две разные ситуации.
 *
 * Если с прошлого раза ничего не сдвинулось, а советы были, — предлагать
 * новые идеи поверх несделанных старых бессмысленно: список растёт,
 * руки не доходят, человек отписывается. Тогда письмо короче и про то,
 * что уже решено делать.
 */
const PROMPT_STALLED = 'Напиши личное сообщение владельцу страницы. '
  + 'С прошлого раза заметных улучшений нет, а советы уже были даны — '
  + 'перечисли их в блоке ПРОШЛЫЕ СОВЕТЫ. Не придумывай новых задач. '
  + 'Скажи прямо: что из прошлого списка важнее всего сделать первым и почему, '
  + 'и какой самый маленький шаг можно сделать на этой неделе, чтобы сдвинуться. '
  + `Одним абзацем отметь, что именно просело. ${TAIL_COMMON}`;

const PROMPT_NORMAL = 'Напиши личное сообщение владельцу страницы: что изменилось '
  + 'с прошлого раза — сначала победы, потом просадки, — какая одна проблема '
  + 'сейчас главная и что сделать в ближайшие дни: три конкретных действия. '
  + 'Если в данных есть лучший и худший посты окна, объясни одним предложением, '
  + 'чем они отличаются, и предложи, какой формат или тему стоит попробовать '
  + `в следующих постах. ${TAIL_COMMON}`;

export async function buildDigest(
  api: ApiClient,
  subscription: Subscription,
  llm: DeepSeek | null,
  tzOffset: number,
): Promise<Digest> {
  const snapshot = await collect(api, subscription.target, {
    periodDays: periodDays(subscription),
    maxPosts: 200,
  });
  const m = compute(snapshot, tzOffset);
  const findings = findGrowthZones(m, snapshot.profile);

  const move = movement(m, movementDays(subscription));
  // ниша определяется заново каждый раз: страница могла сменить тему,
  // и промпт должен ехать за ней, а не за тем, чем она была полгода назад
  const niche = detectNiche(snapshot.profile, m);
  const advice = nextSteps(findings, m);

  const facts = factsBlock(
    snapshot, m, findings, subscription.lastMetrics, move, subscription.history, niche,
  );

  let text = plainDigest(snapshot, m, findings, subscription, move);
  let usedLLM = false;

  if (llm) {
    const stalled = planStalled(move, subscription.lastAdvice);
    const previous = stalled && subscription.lastAdvice?.length
      ? `\n\nПРОШЛЫЕ СОВЕТЫ\n${subscription.lastAdvice.map((a) => `— ${a}`).join('\n')}`
      : '';
    try {
      text = await llm.chat(
        `ДАННЫЕ\n${facts}${previous}\n\n${stalled ? PROMPT_STALLED : PROMPT_NORMAL}`,
        1200,
        0.6,
        systemPrompt(niche),
      );
      usedLLM = true;
    } catch {
      // модель недоступна — уходит сухая версия, человек всё равно получит цифры
    }
  }

  return {
    text,
    title: snapshot.profile.name,
    usedLLM,
    facts,
    advice,
    niche,
    metrics: {
      er: m.er,
      perWeek: m.per_week,
      avgViews: m.avg.views,
      audience: m.audience,
      findings: findings.length,
    },
  };
}
