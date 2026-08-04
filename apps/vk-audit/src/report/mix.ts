/**
 * Профиль контента: чем страница вообще занимается.
 *
 * Без этого разбор медиа врёт по умолчанию. Одна страница выкладывает
 * сорок клипов и два видео, другая — наоборот, третья вообще пишет
 * текстом и картинку ставит для вида. Показывать им одни и те же
 * разделы с одинаковым весом нельзя: там, где формата почти нет,
 * медиана — это совпадение, и подавать её как наблюдение вредно.
 *
 * Поэтому сначала считается, на чём страница держится, а уже потом
 * решается, какие выводы вообще имеют смысл.
 */

import type { Metrics } from '../engine/types';
import type { ClipsReport } from '../video/clips';
import type { VideoReport } from '../video/analyze';
import type { PhotoReport } from '../photos/analyze';

/** Ниже этого числа единиц формата медианы по нему — шум. */
export const MIN_SAMPLE = 5;

export type Focus = 'clips' | 'video' | 'photo' | 'text' | 'mixed';

export interface MixRow {
  key: 'clips' | 'video' | 'photo' | 'posts';
  label: string;
  count: number;
  /** Доля в общем объёме выпущенного за период, %. */
  share: number;
  /** Хватает ли штук, чтобы делать выводы. */
  enough: boolean;
}

export interface ContentMix {
  focus: Focus;
  /** Короткая пометка: «страница на клипах». */
  label: string;
  /** Фраза, объясняющая, что это значит для разбора. */
  summary: string;
  rows: MixRow[];
  /** Форматы, по которым данных мало: выводы по ним ненадёжны. */
  thin: string[];
  /** Форматы, которых нет вовсе: их разделы показывать незачем. */
  missing: string[];
}

interface Input {
  metrics: Metrics;
  video?: VideoReport | null;
  clips?: ClipsReport | null;
  photos?: PhotoReport | null;
}

/**
 * Что доминирует.
 *
 * Считается по выпущенному за период, а не по типам записей: клип,
 * не выложенный на стену, в разбор типов постов не попадёт вовсе,
 * хотя ради него страница и существует.
 */
function detectFocus(clips: number, video: number, photo: number, posts: number): Focus {
  const media = clips + video + photo;
  // текстовая страница: медиа почти нет, а посты есть
  if (posts >= MIN_SAMPLE && media <= 2) return 'text';
  if (!media) return 'text';

  const top = Math.max(clips, video, photo);
  // «специализация» — когда формат вдвое обходит остальные вместе взятые
  if (top < MIN_SAMPLE || top * 2 <= media) return 'mixed';
  if (top === clips) return 'clips';
  if (top === video) return 'video';
  return 'photo';
}

const SUMMARY: Record<Focus, string> = {
  clips: 'Страница держится на клипах: охват приходит из ленты клипов, '
    + 'а не от подписчиков. Смотреть надо частоту попаданий, а не средний '
    + 'уровень — и разбирать первые секунды.',
  video: 'Страница держится на видео. Здесь решают удержание и обложка, '
    + 'а разбор по стене занижает охват: у ролика свой счётчик просмотров.',
  photo: 'Страница держится на фотографиях. Реакция уходит на саму картинку, '
    + 'и в ленте решают кадр и формат, а не длина текста.',
  text: 'Текстовая страница: медиа почти нет. Разделы по видео, клипам '
    + 'и фото будут пустыми — это нормально, разбор идёт по текстам, '
    + 'ритму и времени выхода.',
  mixed: 'Смешанная лента: ни один формат не доминирует. Тогда важнее всего '
    + 'сравнение форматов между собой — какой из них окупает потраченное время.',
};

const LABEL: Record<Focus, string> = {
  clips: 'страница на клипах',
  video: 'страница на видео',
  photo: 'страница на фотографиях',
  text: 'текстовая страница',
  mixed: 'смешанная лента',
};

export function buildMix({ metrics, video, clips, photos }: Input): ContentMix {
  const clipCount = clips?.count ?? 0;
  const videoCount = video?.count ?? 0;
  const photoCount = photos?.count ?? 0;
  const postCount = metrics.posts_own || metrics.posts_total;

  const total = clipCount + videoCount + photoCount + postCount;
  const share = (n: number) => (total ? (n / total) * 100 : 0);

  const rows: MixRow[] = [
    { key: 'posts', label: 'Записей на стене', count: postCount, share: share(postCount), enough: postCount >= MIN_SAMPLE },
    { key: 'clips', label: 'Клипов', count: clipCount, share: share(clipCount), enough: clipCount >= MIN_SAMPLE },
    { key: 'video', label: 'Обычных видео', count: videoCount, share: share(videoCount), enough: videoCount >= MIN_SAMPLE },
    { key: 'photo', label: 'Фотографий', count: photoCount, share: share(photoCount), enough: photoCount >= MIN_SAMPLE },
  ];

  const focus = detectFocus(clipCount, videoCount, photoCount, postCount);

  return {
    focus,
    label: LABEL[focus],
    summary: SUMMARY[focus],
    rows,
    thin: rows.filter((r) => r.count > 0 && !r.enough).map((r) => r.label.toLowerCase()),
    missing: rows.filter((r) => r.count === 0).map((r) => r.label.toLowerCase()),
  };
}

/**
 * Оговорка для вкладки, где единиц формата мало.
 *
 * Возвращает пустую строку, когда оговаривать нечего: лишний текст
 * там, где всё в порядке, обесценивает предупреждение там, где нет.
 */
export function thinNote(count: number, what: string): string {
  if (count === 0 || count >= MIN_SAMPLE) return '';
  return `${what} за период всего ${count}. Медианы и сравнения ниже `
    + 'посчитаны честно, но на таком числе это ещё не наблюдение — '
    + 'скорее справка.';
}
