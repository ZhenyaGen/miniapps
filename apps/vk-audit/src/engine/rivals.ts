/**
 * Сравнение страницы с конкурентами.
 *
 * Считаются медианы, а не средние: один вирусный пост не должен превращать
 * слабую страницу в сильную.
 */

import type { Metrics, Post, Snapshot } from './types';
import { median } from './util';

/** Что сравниваем: подпись, поле карточки, «больше — лучше», единица. */
const COMPARE_ROWS: Array<[string, keyof RivalCard, boolean | null, string]> = [
  ['Подписчиков', 'audience', true, ''],
  ['Постов в неделю', 'per_week', true, ''],
  ['Просмотров на пост', 'views_median', true, ''],
  ['Охват аудитории', 'coverage', true, '%'],
  ['Вовлечённость (ER)', 'er_median', true, '%'],
  ['Комментариев на пост', 'comments', true, ''],
  ['Репостов на пост', 'reposts', true, ''],
  ['Постов с фото или видео', 'media_share', true, '%'],
  ['Длина поста, знаков', 'text_len', null, ''],
];

export interface RivalTopPost {
  date: string;
  type: string;
  views: number;
  engagement: number;
  er: number | null;
  url: string;
  text: string;
}

/** Компактная карточка страницы — то, что участвует в сравнении. */
export interface RivalCard {
  name: string;
  url: string;
  screen_name: string;
  kind: string;
  kind_label: string;
  audience: number;
  posts_total: number;
  posts_with_views: number;
  per_week: number;
  views_median: number;
  er_median: number;
  coverage: number;
  comments: number;
  reposts: number;
  media_share: number;
  text_len: number;
  silent_days: number;
  best_format: string;
  best_slot: string;
  top_posts: RivalTopPost[];
  warnings: string[];
}

export type Verdict = 'ahead' | 'even' | 'behind' | null;

export interface CompareRow {
  label: string;
  key: string;
  unit: string;
  mine: number;
  median: number;
  best: number;
  leader: string;
  verdict: Verdict;
  gap_pct: number | null;
}

export interface RivalsReport {
  client: RivalCard;
  rivals: RivalCard[];
  rows: CompareRow[];
  gaps: CompareRow[];
  errors: Array<{ target: string; reason: string }>;
  warnings: string[];
  period_days: number;
}

const round = (x: number, digits = 0) => {
  const scale = 10 ** digits;
  return Math.round(x * scale) / scale;
};

const MEDIA_TYPES = new Set(['photo', 'video', 'album', 'doc']);

export function buildCard(snapshot: Snapshot, m: Metrics): RivalCard {
  const posts: Post[] = m.posts ?? [];
  const withViews = posts.filter((p) => p.views);
  const profile = snapshot.profile;

  return {
    name: profile.name,
    url: profile.url,
    screen_name: profile.screen_name,
    kind: profile.kind,
    kind_label: profile.kind === 'group' ? 'сообщество' : 'личная страница',
    audience: m.audience || 0,
    posts_total: m.posts_total ?? 0,
    posts_with_views: withViews.length,
    per_week: round(m.per_week ?? 0, 1),
    views_median: round(median(withViews.map((p) => p.views))),
    er_median: round(m.er_median ?? 0, 2),
    coverage: round(m.views_per_audience ?? 0, 1),
    comments: m.avg ? round(m.avg.comments ?? 0, 1) : 0,
    reposts: m.avg ? round(m.avg.reposts ?? 0, 1) : 0,
    media_share: posts.length
      ? round((posts.filter((p) => MEDIA_TYPES.has(p.type)).length / posts.length) * 100)
      : 0,
    text_len: round(median(posts.map((p) => p.len))),
    silent_days: round(m.silent_days ?? 0),
    best_format: m.by_type?.length ? m.by_type[0].label : '—',
    best_slot: m.best_slots?.length ? m.best_slots[0].label : '—',
    top_posts: (m.top_posts ?? []).slice(0, 3).map((p) => ({
      date: p.date_label,
      type: p.type,
      views: p.views,
      engagement: p.engagement,
      er: p.er === null ? null : round(p.er, 2),
      url: p.url,
      text: (p.text ?? '').split(/\s+/).filter(Boolean).join(' ').slice(0, 700),
    })),
    warnings: m.warnings ?? [],
  };
}

/** Значение клиента против медианы и лучшего результата у конкурентов. */
export function compare(client: RivalCard, rivalCards: RivalCard[]): CompareRow[] {
  const rows: CompareRow[] = [];
  for (const [label, key, higherBetter, unit] of COMPARE_ROWS) {
    const mine = (client[key] as number) || 0;
    const theirs = rivalCards.map((r) => (r[key] as number) || 0);
    if (!theirs.length) continue;

    const med = round(median(theirs), 2);
    const best = higherBetter ? Math.max(...theirs) : Math.min(...theirs);
    const leader = rivalCards.find((r) => ((r[key] as number) || 0) === best)?.name ?? '';

    // расхождение до 10% считаем равенством: это шум, а не отставание
    let verdict: Verdict = null;
    if (higherBetter !== null && med) {
      const gap = ((mine - med) / med) * 100;
      if (gap >= 10) verdict = 'ahead';
      else if (gap <= -10) verdict = 'behind';
      else verdict = 'even';
    }

    rows.push({
      label,
      key: key as string,
      unit,
      mine,
      median: med,
      best,
      leader,
      verdict,
      gap_pct: med ? Math.round(((mine - med) / med) * 100) : null,
    });
  }
  return rows;
}

/** Самые заметные отставания — их и выносим в начало отчёта. */
export function topGaps(rows: CompareRow[], limit = 3): CompareRow[] {
  return rows
    .filter((r) => r.verdict === 'behind' && r.gap_pct !== null)
    .sort((a, b) => (a.gap_pct as number) - (b.gap_pct as number))
    .slice(0, limit);
}

/** Предупреждения, из-за которых сравнение стоит читать осторожнее. */
export function comparisonWarnings(client: RivalCard, rivals: RivalCard[]): string[] {
  const warnings: string[] = [];
  const cards = [client, ...rivals];

  if (new Set(cards.map((c) => c.kind)).size > 1) {
    warnings.push(
      'В сравнении есть и сообщества, и личные страницы. ВКонтакте ранжирует '
      + 'их по-разному, поэтому охваты между ними впрямую несопоставимы — '
      + 'смотрите на динамику внутри одного типа.',
    );
  }

  const thin = cards.filter((c) => c.posts_with_views < 5).map((c) => c.name);
  if (thin.length) {
    warnings.push(
      `Мало постов с просмотрами (меньше пяти) у: ${thin.join(', ')}. `
      + 'Медианы по ним ненадёжны.',
    );
  }
  return warnings;
}
