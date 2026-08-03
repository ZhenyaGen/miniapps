/**
 * Победы и поражения: что случилось за последние две недели и что
 * происходит на длинной дистанции.
 *
 * Отчёт в приложении показывает срез — «вот такая страница сейчас».
 * Подписчику этого мало: он и так знает, какая она. Ему нужно движение —
 * что стало лучше, что хуже, и не показалось ли.
 *
 * Всё считается по тем же постам, что и метрики, поэтому расхождений
 * с отчётом быть не может: это та же выборка, разрезанная по времени.
 */

import { f } from './engine';
import type { Metrics, Post } from './engine';
import type { Snapshot as HistoryPoint } from './store';

/** Сводка по одному окну времени. */
export interface Window {
  posts: number;
  perWeek: number;
  avgViews: number;
  avgEr: number;
  avgEngagement: number;
}

export interface Movement {
  /** Что стало заметно лучше. */
  wins: string[];
  /** Что просело. */
  losses: string[];
  /** Лучший и худший пост свежего окна — по ним видно, что сработало. */
  best: Post | null;
  worst: Post | null;
  recent: Window;
  previous: Window;
  /** Хватает ли постов, чтобы сравнение вообще что-то значило. */
  reliable: boolean;
}

const mean = (values: number[]): number => (
  values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0
);

function summarize(posts: Post[], days: number): Window {
  const views = posts.map((p) => p.views).filter((v) => v > 0);
  const ers = posts.map((p) => p.er).filter((v): v is number => v !== null);
  return {
    posts: posts.length,
    perWeek: posts.length / (days / 7),
    avgViews: mean(views),
    avgEr: mean(ers),
    avgEngagement: mean(posts.map((p) => p.engagement)),
  };
}

/**
 * Насколько изменилось, в процентах. `null`, когда сравнивать не с чем:
 * рост с нуля — это не «+∞ процентов», а «раньше не было».
 */
function delta(now: number, before: number): number | null {
  if (!before) return null;
  return ((now - before) / before) * 100;
}

/** Порог, ниже которого изменение — шум, а не движение. */
const NOISE = 12;

/**
 * Сравнить два соседних окна одинаковой длины.
 *
 * По умолчанию две недели против предыдущих двух: короче — и любой
 * удачный пост переворачивает картину, длиннее — и человек не помнит,
 * что он тогда делал.
 */
export function movement(m: Metrics, days = 14, now = Date.now() / 1000): Movement {
  const span = days * 86400;
  // берём разобранные посты из метрик, а не сырые из снимка: там уже
  // посчитаны ER и признаки, и расхождению с отчётом взяться неоткуда
  const posts = m.posts.filter((p) => !p.is_pinned && !p.is_ad);

  const recentPosts = posts.filter((p) => p.ts > now - span);
  const previousPosts = posts.filter((p) => p.ts <= now - span && p.ts > now - span * 2);

  const recent = summarize(recentPosts, days);
  const previous = summarize(previousPosts, days);

  const wins: string[] = [];
  const losses: string[] = [];

  const push = (
    label: string, change: number | null, nowValue: string, beforeValue: string,
  ) => {
    if (change === null || Math.abs(change) < NOISE) return;
    const line = `${label}: было ${beforeValue}, стало ${nowValue} (${change > 0 ? '+' : ''}${f(change, 0)}%)`;
    (change > 0 ? wins : losses).push(line);
  };

  push('Просмотры на пост', delta(recent.avgViews, previous.avgViews),
    f(recent.avgViews, 0), f(previous.avgViews, 0));
  push('Вовлечённость (ER)', delta(recent.avgEr, previous.avgEr),
    `${f(recent.avgEr, 2)}%`, `${f(previous.avgEr, 2)}%`);
  push('Реакций на пост', delta(recent.avgEngagement, previous.avgEngagement),
    f(recent.avgEngagement, 1), f(previous.avgEngagement, 1));
  push('Постов в неделю', delta(recent.perWeek, previous.perWeek),
    f(recent.perWeek), f(previous.perWeek));

  // молчание — не «падение метрики», а отдельная беда, и обычно причина
  // всех остальных: без постов нечему собирать просмотры
  if (!recentPosts.length && previousPosts.length) {
    losses.unshift(`За последние ${days} дней не вышло ни одного поста`);
  }

  const ranked = [...recentPosts]
    .filter((p) => p.er !== null)
    .sort((a, b) => (b.er ?? 0) - (a.er ?? 0));

  return {
    wins,
    losses,
    best: ranked[0] ?? null,
    worst: ranked.length > 2 ? ranked[ranked.length - 1] : null,
    recent,
    previous,
    // два поста в окне — это ещё не выборка, о чём и предупреждаем
    reliable: recentPosts.length >= 3 && previousPosts.length >= 3,
  };
}

/**
 * Что видно на длинной дистанции — по ряду прошлых разборов.
 *
 * Пара соседних значений не отличает тренд от качелей: ER мог упасть
 * и вернуться. Поэтому смотрим на первую и последнюю треть истории.
 */
export function longTrend(history: HistoryPoint[] = []): string[] {
  if (history.length < 4) return [];

  const third = Math.max(1, Math.floor(history.length / 3));
  const early = history.slice(0, third);
  const late = history.slice(-third);
  const weeks = Math.round((history[history.length - 1].at - history[0].at) / 604800);

  const lines: string[] = [];
  const compare = (label: string, pick: (p: HistoryPoint) => number, digits = 2, unit = '') => {
    const before = mean(early.map(pick));
    const after = mean(late.map(pick));
    const change = delta(after, before);
    if (change === null || Math.abs(change) < NOISE) return;
    lines.push(`${label}: ${f(before, digits)}${unit} → ${f(after, digits)}${unit} `
      + `(${change > 0 ? '+' : ''}${f(change, 0)}%)`);
  };

  compare('Вовлечённость', (p) => p.er, 2, '%');
  compare('Просмотры на пост', (p) => p.avgViews, 0);
  compare('Частота', (p) => p.perWeek, 1);
  compare('Аудитория', (p) => p.audience, 0);

  if (!lines.length) return [];
  return [`За ${weeks} недель наблюдений:`, ...lines];
}

/**
 * Сделали ли то, что советовали в прошлый раз.
 *
 * Прямо проверить нельзя — бот не видит, что человек делал. Но если
 * ни одна цифра не сдвинулась, а советы были про частоту и охват,
 * скорее всего до них не дошли руки. Тогда полезнее напомнить план,
 * чем предлагать новые идеи поверх несделанных старых.
 */
export function planStalled(move: Movement, advice: string[] = []): boolean {
  if (!advice.length) return false;
  if (!move.reliable) return false;
  return move.wins.length === 0;
}
