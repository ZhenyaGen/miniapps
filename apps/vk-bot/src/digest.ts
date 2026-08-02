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
import type { DeepSeek } from './deepseek';
import type { Subscription } from './store';
import { PERIOD_DAYS, PERIOD_LABEL } from './store';

export interface Digest {
  text: string;
  title: string;
  metrics: NonNullable<Subscription['lastMetrics']>;
  usedLLM: boolean;
}

/** Период сбора чуть шире периода рассылки: нужно с чем сравнивать. */
function periodDays(subscription: Subscription): number {
  return subscription.period === 'week' ? 60 : 120;
}

/** Сухая выжимка — она же контекст для модели, она же запасной текст. */
export function factsBlock(
  snapshot: Snapshot, m: Metrics, findings: Finding[], previous?: Subscription['lastMetrics'],
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
function nextSteps(findings: Finding[], m: Metrics): string[] {
  const plan = buildPlan(findings, m);
  const stage = plan.find((s) => s.tasks.some((t) => t.source !== 'База')) ?? plan[0];
  return stage.tasks.filter((t) => t.source !== 'База').slice(0, 3).map((t) => t.text);
}

/** Запасной текст без модели: то же самое, только сухо. */
export function plainDigest(
  snapshot: Snapshot, m: Metrics, findings: Finding[], subscription: Subscription,
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

  lines.push('', `Следующий разбор — ${PERIOD_LABEL[subscription.period]}. Чтобы поменять, напишите «неделя» или «месяц».`);
  return lines.join('\n');
}

const PROMPT_TAIL = 'Напиши личное сообщение владельцу страницы: что изменилось '
  + 'с прошлого раза (если есть с чем сравнить), какая одна проблема сейчас '
  + 'главная и что сделать на этой неделе — три конкретных действия. '
  + 'Без приветствий вроде «здравствуйте», сразу по делу. В конце одной строкой '
  + 'напомни, что периодичность меняется словами «неделя» или «месяц», '
  + 'а «стоп» отключает рассылку.';

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
  const facts = factsBlock(snapshot, m, findings, subscription.lastMetrics);

  let text = plainDigest(snapshot, m, findings, subscription);
  let usedLLM = false;

  if (llm) {
    try {
      text = await llm.chat(`ДАННЫЕ\n${facts}\n\n${PROMPT_TAIL}`);
      usedLLM = true;
    } catch {
      // модель недоступна — уходит сухая версия, человек всё равно получит цифры
    }
  }

  return {
    text,
    title: snapshot.profile.name,
    usedLLM,
    metrics: {
      er: m.er,
      perWeek: m.per_week,
      avgViews: m.avg.views,
      audience: m.audience,
      findings: findings.length,
    },
  };
}
