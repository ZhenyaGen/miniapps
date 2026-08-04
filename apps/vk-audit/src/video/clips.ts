/**
 * Разбор клипов — отдельно от обычных видео.
 *
 * Клип живёт не в ленте сообщества, а в ленте клипов, и правила там
 * другие: охват почти не зависит от числа подписчиков, зато сильно
 * зависит от того, досмотрели ли первые секунды. Поэтому и смотреть
 * на них надо иначе — не «сколько в среднем», а «как часто выстреливает
 * и насколько сильно».
 *
 * Как и остальное в `src/video`, к движку отношения не имеет: там
 * числа сверяются с питоновской версией, здесь считается то, чего
 * в ней нет вовсе.
 */

import type { VideoStat } from '../vk/video';

function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

const sum = (values: number[]): number => values.reduce((a, b) => a + b, 0);

/**
 * Корзины под клипы — узкие.
 *
 * У обычных видео шаг «минуты», у клипов всё решается в первые секунды,
 * и разница между пятнадцатью и сорока секундами больше, чем между
 * тремя минутами и пятью.
 */
const BUCKETS: Array<[string, number, number]> = [
  ['до 15 сек', 0, 15],
  ['15–30 сек', 15, 30],
  ['30–60 сек', 30, 60],
  ['больше минуты', 60, Infinity],
];

export interface ClipBucket {
  label: string;
  count: number;
  medianViews: number;
  medianEr: number;
}

export interface ClipMonth {
  key: string;
  label: string;
  count: number;
  medianViews: number;
}

export interface ClipsReport {
  count: number;
  totalViews: number;
  medianViews: number;
  /** Самый удачный клип периода: у клипов разброс важнее среднего. */
  maxViews: number;
  /**
   * Во сколько раз лучший клип обошёл серединный.
   *
   * У клипов это главный показатель: лента раздаёт охват неравномерно,
   * и один выстрел может стоить больше, чем все остальные вместе.
   */
  spread: number | null;
  /** Клипы, набравшие больше трёх медиан, — те самые выстрелы. */
  hits: number;
  /** Доля всех просмотров, которую принесли выстрелы. */
  hitsShare: number;
  /** Вовлечённость к просмотрам: лайки, комментарии и репосты вместе. */
  medianEr: number;
  medianDuration: number;
  totalComments: number;
  byDuration: ClipBucket[];
  byMonth: ClipMonth[];
  /** Клипы, не прикреплённые ни к одной записи. */
  offWall: number;
  top: VideoStat[];
  flop: VideoStat[];
}

const MONTHS = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

function er(clip: VideoStat): number {
  if (!clip.views) return 0;
  return ((clip.likes + clip.comments + clip.reposts) / clip.views) * 100;
}

export function analyzeClips(videos: VideoStat[]): ClipsReport {
  const clips = videos.filter((v) => v.isClip);
  const views = clips.map((c) => c.views);
  const medianViews = median(views);
  const totalViews = sum(views);
  const maxViews = views.length ? Math.max(...views) : 0;

  // выстрел — втрое выше серединного клипа; порог грубый нарочно,
  // тонкая настройка тут создала бы точность, которой нет в данных
  const hits = medianViews ? clips.filter((c) => c.views > medianViews * 3) : [];
  const hitViews = sum(hits.map((c) => c.views));

  const byDuration = BUCKETS.map(([label, from, to]) => {
    const inBucket = clips.filter((c) => c.duration >= from && c.duration < to);
    return {
      label,
      count: inBucket.length,
      medianViews: median(inBucket.map((c) => c.views)),
      medianEr: median(inBucket.map(er)),
    };
  }).filter((row) => row.count > 0);

  const months = new Map<string, VideoStat[]>();
  for (const clip of clips) {
    const date = new Date(clip.date * 1000);
    const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
    months.set(key, [...(months.get(key) ?? []), clip]);
  }
  const byMonth: ClipMonth[] = [...months.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, list]) => ({
      key,
      label: `${MONTHS[Number(key.slice(5)) - 1]} ${key.slice(0, 4)}`,
      count: list.length,
      medianViews: median(list.map((c) => c.views)),
    }));

  const ranked = [...clips].sort((a, b) => b.views - a.views);

  return {
    count: clips.length,
    totalViews,
    medianViews,
    maxViews,
    spread: medianViews ? maxViews / medianViews : null,
    hits: hits.length,
    hitsShare: totalViews ? (hitViews / totalViews) * 100 : 0,
    medianEr: median(clips.map(er)),
    medianDuration: median(clips.map((c) => c.duration)),
    totalComments: sum(clips.map((c) => c.comments)),
    byDuration,
    byMonth,
    offWall: clips.filter((c) => !c.onWall).length,
    top: ranked.slice(0, 5),
    flop: ranked.length >= 8 ? ranked.slice(-3).reverse() : [],
  };
}

/** Замечания по клипам: цифра, потом что с ней делать. */
export function clipFindings(report: ClipsReport): string[] {
  const out: string[] = [];
  if (!report.count) return out;

  if (report.spread !== null && report.spread >= 5 && report.count >= 5) {
    out.push(`Разброс огромный: лучший клип собрал ${Math.round(report.maxViews)} `
      + `просмотров при серединных ${Math.round(report.medianViews)} — это `
      + `в ${report.spread.toFixed(1)} раза. Так и работает лента клипов: `
      + 'решают единичные попадания, а не средний уровень.');
  }

  if (report.hits && report.hitsShare >= 50) {
    out.push(`${report.hits} клипов принесли ${Math.round(report.hitsShare)}% всех просмотров. `
      + 'Разберите именно их: первые секунды, тема, звук — остальное '
      + 'повторять смысла нет.');
  }

  if (report.count >= 5 && !report.hits) {
    out.push('Ни одного выстрела за период: все клипы держатся на одном уровне. '
      + 'Лента клипов почти не выносит их дальше подписчиков — обычно дело '
      + 'в первых секундах.');
  }

  const best = [...report.byDuration].sort((a, b) => b.medianViews - a.medianViews)[0];
  const worst = [...report.byDuration].sort((a, b) => a.medianViews - b.medianViews)[0];
  if (best && worst && best.label !== worst.label && worst.medianViews > 0
    && best.medianViews / worst.medianViews >= 1.5) {
    out.push(`Длина решает: «${best.label}» — медиана ${Math.round(best.medianViews)} `
      + `просмотров, «${worst.label}» — ${Math.round(worst.medianViews)}.`);
  }

  if (report.byMonth.length >= 3) {
    const first = report.byMonth[0];
    const last = report.byMonth[report.byMonth.length - 1];
    if (first.medianViews > 0) {
      const change = ((last.medianViews - first.medianViews) / first.medianViews) * 100;
      if (Math.abs(change) >= 25) {
        out.push(`С ${first.label} по ${last.label} медиана просмотров клипа `
          + `${change > 0 ? 'выросла' : 'упала'} на ${Math.abs(Math.round(change))}%: `
          + `${Math.round(first.medianViews)} → ${Math.round(last.medianViews)}.`);
      }
    }
  }

  if (report.offWall) {
    out.push(`${report.offWall} клипов не выложены записью на стену. `
      + 'Подписчики сообщества их не увидят — только те, кому клип покажет лента.');
  }

  return out;
}
