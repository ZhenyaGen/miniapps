/**
 * Разбор роликов и комментариев.
 *
 * Лежит отдельно от `src/engine`: движок сверяется с питоновской версией
 * до сотых, и добавлять туда расчёты, которых там нет, нельзя. Здесь
 * ничего из его чисел не пересчитывается — только то, что движок вообще
 * не смотрит: длительность роликов, настоящие просмотры видео и тексты
 * комментариев.
 */

import type { RawPost } from '../engine/types';
import type { CommentThread, VideoStat } from '../vk/video';

function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/** Границы в секундах: короткие вертикальные, средние, длинные. */
const BUCKETS: Array<[string, number, number]> = [
  ['до 30 сек', 0, 30],
  ['30–60 сек', 30, 60],
  ['1–3 мин', 60, 180],
  ['3–10 мин', 180, 600],
  ['больше 10 мин', 600, Infinity],
];

export interface DurationRow {
  label: string;
  count: number;
  medianViews: number;
  medianComments: number;
}

export interface VideoReport {
  count: number;
  /** Просмотры самих роликов — не путать с просмотрами записей. */
  totalViews: number;
  medianViews: number;
  medianDuration: number;
  totalComments: number;
  byDuration: DurationRow[];
  top: VideoStat[];
  flop: VideoStat[];
  /**
   * Во сколько раз просмотры ролика отличаются от просмотров записи.
   *
   * Главная цифра вкладки. Если ролики смотрят заметно больше, чем
   * записи, весь разбор по стене занижает картину — и наоборот.
   */
  viewsRatio: number | null;
  postViewsMedian: number;
}

export function analyzeVideos(videos: VideoStat[], posts: RawPost[]): VideoReport {
  const views = videos.map((v) => v.views).filter((v) => v > 0);
  const withVideo = new Set(videos.map((v) => v.postId));
  const postViews = posts
    .filter((p) => withVideo.has(p.id))
    .map((p) => Number((p as { views?: { count?: number } }).views?.count ?? 0))
    .filter((v) => v > 0);

  const medianViews = median(views);
  const postViewsMedian = median(postViews);

  const byDuration = BUCKETS.map(([label, from, to]) => {
    const inBucket = videos.filter((v) => v.duration >= from && v.duration < to);
    return {
      label,
      count: inBucket.length,
      medianViews: median(inBucket.map((v) => v.views)),
      medianComments: median(inBucket.map((v) => v.comments)),
    };
  }).filter((row) => row.count > 0);

  const ranked = [...videos].sort((a, b) => b.views - a.views);

  return {
    count: videos.length,
    totalViews: videos.reduce((sum, v) => sum + v.views, 0),
    medianViews,
    medianDuration: median(videos.map((v) => v.duration)),
    totalComments: videos.reduce((sum, v) => sum + v.comments, 0),
    byDuration,
    top: ranked.slice(0, 5),
    // хвост показываем, только когда роликов хватает: на пяти видео
    // «худшие» и «лучшие» — это одни и те же записи
    flop: ranked.length >= 8 ? ranked.slice(-3).reverse() : [],
    viewsRatio: postViewsMedian ? medianViews / postViewsMedian : null,
    postViewsMedian,
  };
}

const STOP_WORDS = new Set([
  'очень', 'просто', 'спасибо', 'пожалуйста', 'здравствуйте', 'привет',
  'который', 'которые', 'когда', 'чтобы', 'также', 'этого', 'этом', 'ещё',
  'еще', 'всего', 'может', 'можно', 'нужно', 'будет', 'было', 'если',
  'даже', 'больше', 'меньше', 'лучше', 'хуже', 'такой', 'такая', 'тоже',
]);

export interface CommentReport {
  /** Сколько записей вообще разобрано. */
  posts: number;
  total: number;
  /** Комментарии без учёта ответов автора — то есть живой интерес. */
  fromPeople: number;
  /** Ответы автора: сообщество отвечает своим же id со знаком минус. */
  fromAuthor: number;
  /** Доля разобранных записей, где автор ответил хоть раз. */
  answeredShare: number;
  /** Медианное время до первого ответа автора, в часах. */
  medianReplyHours: number | null;
  /** Доля комментариев с вопросом — на них ждут ответа сильнее всего. */
  questionShare: number;
  /** Вопросы, оставшиеся без ответа автора в той же ветке. */
  unanswered: Array<{ postId: number; text: string }>;
  topWords: Array<{ word: string; n: number }>;
  /** Самые обсуждаемые записи. */
  discussed: Array<{ postId: number; comments: number }>;
}

/**
 * Разбор комментариев.
 *
 * `ownerId` отрицательный у сообществ — по нему и отличаются ответы
 * автора от чужих реплик. Для личной страницы он положительный.
 */
export function analyzeComments(threads: CommentThread[], ownerId: number): CommentReport {
  const all = threads.flatMap((t) => t.items);
  const isAuthor = (fromId: number) => fromId === ownerId;

  const fromAuthor = all.filter((c) => isAuthor(c.fromId));
  const fromPeople = all.filter((c) => !isAuthor(c.fromId));

  const answered = threads.filter((t) => t.items.some((c) => isAuthor(c.fromId)));

  // время до первого ответа считаем по каждой записи: сколько прошло
  // от первого чужого комментария до первого ответа автора
  const replyHours: number[] = [];
  for (const thread of threads) {
    const firstPerson = thread.items.filter((c) => !isAuthor(c.fromId))
      .sort((a, b) => a.date - b.date)[0];
    const firstAuthor = thread.items.filter((c) => isAuthor(c.fromId))
      .sort((a, b) => a.date - b.date)[0];
    if (firstPerson && firstAuthor && firstAuthor.date > firstPerson.date) {
      replyHours.push((firstAuthor.date - firstPerson.date) / 3600);
    }
  }

  const questions = fromPeople.filter((c) => c.text.includes('?'));

  const unanswered: Array<{ postId: number; text: string }> = [];
  for (const thread of threads) {
    const authorReplied = thread.items.some((c) => isAuthor(c.fromId));
    if (authorReplied) continue;
    for (const item of thread.items) {
      if (isAuthor(item.fromId) || !item.text.includes('?')) continue;
      unanswered.push({ postId: thread.postId, text: item.text.slice(0, 160) });
    }
  }

  const counts = new Map<string, number>();
  for (const comment of fromPeople) {
    for (const word of comment.text.toLowerCase().match(/[а-яёa-z]{5,}/gi) ?? []) {
      if (STOP_WORDS.has(word)) continue;
      counts.set(word, (counts.get(word) ?? 0) + 1);
    }
  }
  const topWords = [...counts.entries()]
    .filter(([, n]) => n > 1)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 12)
    .map(([word, n]) => ({ word, n }));

  return {
    posts: threads.length,
    total: all.length,
    fromPeople: fromPeople.length,
    fromAuthor: fromAuthor.length,
    answeredShare: threads.length ? (answered.length / threads.length) * 100 : 0,
    medianReplyHours: replyHours.length ? median(replyHours) : null,
    questionShare: fromPeople.length ? (questions.length / fromPeople.length) * 100 : 0,
    unanswered: unanswered.slice(0, 8),
    topWords,
    discussed: threads
      .map((t) => ({ postId: t.postId, comments: t.total }))
      .sort((a, b) => b.comments - a.comments)
      .slice(0, 5),
  };
}

/**
 * Замечания к роликам и обсуждению — тем же тоном, что зоны роста
 * в основном отчёте: цифра, потом что с ней делать.
 */
export function videoFindings(video: VideoReport, comments: CommentReport): string[] {
  const out: string[] = [];

  if (video.viewsRatio !== null && video.viewsRatio >= 2) {
    out.push(`Ролики смотрят в ${video.viewsRatio.toFixed(1)} раза чаще, чем открывают `
      + `записи: ${Math.round(video.medianViews)} против ${Math.round(video.postViewsMedian)}. `
      + 'Значит, разбор по стене занижает охват — ориентируйтесь на просмотры видео.');
  }
  if (video.viewsRatio !== null && video.viewsRatio > 0 && video.viewsRatio <= 0.5) {
    out.push('Запись открывают чаще, чем досматривают ролик. Обычно так бывает, '
      + 'когда обложка обещает не то, что внутри.');
  }

  const best = [...video.byDuration].sort((a, b) => b.medianViews - a.medianViews)[0];
  const worst = [...video.byDuration].sort((a, b) => a.medianViews - b.medianViews)[0];
  if (best && worst && best.label !== worst.label && worst.medianViews > 0
    && best.medianViews / worst.medianViews >= 1.5) {
    out.push(`Длительность решает: «${best.label}» собирают медиану `
      + `${Math.round(best.medianViews)} просмотров, «${worst.label}» — `
      + `${Math.round(worst.medianViews)}.`);
  }

  if (comments.posts && comments.answeredShare < 50) {
    out.push(`Автор отвечает только под ${Math.round(comments.answeredShare)}% обсуждаемых `
      + 'записей. Ответы считаются вовлечённостью и вытягивают запись в ленте.');
  }
  if (comments.unanswered.length) {
    out.push(`Вопросов без ответа: ${comments.unanswered.length}. `
      + 'Это самая дешёвая вовлечённость из возможных — человек уже написал.');
  }
  if (comments.medianReplyHours !== null && comments.medianReplyHours > 6) {
    out.push(`Первый ответ приходит в среднем через ${comments.medianReplyHours.toFixed(1)} ч. `
      + 'Лента раздаёт охват в первые часы — позже ответ на него уже не влияет.');
  }

  return out;
}
