/**
 * Разбор фотографий.
 *
 * Главный вопрос вкладки — не «сколько лайков», а «где они собираются».
 * У картинки из записи и у той же картинки в альбоме разная судьба:
 * первая живёт сутки в ленте, вторая собирает реакции месяцами. Если
 * почти все лайки приходят на фотографии мимо стены, значит страницу
 * листают альбомами, а лента до людей не доходит.
 */

import type { RawPost } from '../engine/types';
import type { PhotoStat } from './collect';

function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

const sum = (values: number[]): number => values.reduce((a, b) => a + b, 0);

const MONTHS = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

export interface PhotoMonth {
  key: string;
  label: string;
  count: number;
  medianLikes: number;
}

export interface OrientationRow {
  label: string;
  count: number;
  medianLikes: number;
}

export interface PhotoReport {
  count: number;
  totalLikes: number;
  medianLikes: number;
  totalComments: number;
  medianComments: number;
  /** Фотографии, опубликованные записью на стене. */
  onWall: number;
  /** Фотографии только в альбомах — в ленте их не было. */
  offWall: number;
  /** Доля всех лайков, собранная фотографиями мимо стены. */
  offWallLikesShare: number;
  /**
   * Медиана лайков у записей, в которых есть фотография.
   *
   * Рядом с `medianLikes` это и есть ответ на вопрос «куда уходит
   * реакция»: на запись или на саму картинку.
   */
  postLikesMedian: number;
  /** Во сколько раз лайков у фотографии больше, чем у её записи. */
  likesRatio: number | null;
  /** Сколько записей с фотографиями удалось связать со снимками. */
  linkedPosts: number;
  byOrientation: OrientationRow[];
  byMonth: PhotoMonth[];
  top: PhotoStat[];
  flop: PhotoStat[];
}

/**
 * Ориентация кадра.
 *
 * Лента ВКонтакте показывает вертикальное крупнее горизонтального,
 * и на телефоне это половина успеха — но зависит от страницы, поэтому
 * считаем, а не постулируем.
 */
function orientation(photo: PhotoStat): string {
  if (!photo.width || !photo.height) return 'без размера';
  const ratio = photo.width / photo.height;
  if (ratio > 1.15) return 'горизонтальные';
  if (ratio < 0.87) return 'вертикальные';
  return 'квадратные';
}

const ORDER = ['вертикальные', 'квадратные', 'горизонтальные', 'без размера'];

export function analyzePhotos(photos: PhotoStat[], posts: RawPost[]): PhotoReport {
  const likes = photos.map((p) => p.likes);
  const offWall = photos.filter((p) => !p.onWall);
  const totalLikes = sum(likes);

  const withPhoto = new Set(photos.filter((p) => p.onWall).map((p) => p.postId));
  const postLikes = posts
    .filter((p) => withPhoto.has(p.id))
    .map((p) => Number((p as { likes?: { count?: number } }).likes?.count ?? 0));

  const medianLikes = median(likes);
  const postLikesMedian = median(postLikes);

  const buckets = new Map<string, PhotoStat[]>();
  for (const photo of photos) {
    const key = orientation(photo);
    buckets.set(key, [...(buckets.get(key) ?? []), photo]);
  }
  const byOrientation = ORDER
    .filter((label) => buckets.has(label))
    .map((label) => {
      const list = buckets.get(label) ?? [];
      return { label, count: list.length, medianLikes: median(list.map((p) => p.likes)) };
    });

  const months = new Map<string, PhotoStat[]>();
  for (const photo of photos) {
    const date = new Date(photo.date * 1000);
    const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
    months.set(key, [...(months.get(key) ?? []), photo]);
  }
  const byMonth: PhotoMonth[] = [...months.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, list]) => ({
      key,
      label: `${MONTHS[Number(key.slice(5)) - 1]} ${key.slice(0, 4)}`,
      count: list.length,
      medianLikes: median(list.map((p) => p.likes)),
    }));

  const ranked = [...photos].sort((a, b) => b.likes - a.likes);

  return {
    count: photos.length,
    totalLikes,
    medianLikes,
    totalComments: sum(photos.map((p) => p.comments)),
    medianComments: median(photos.map((p) => p.comments)),
    onWall: photos.length - offWall.length,
    offWall: offWall.length,
    offWallLikesShare: totalLikes ? (sum(offWall.map((p) => p.likes)) / totalLikes) * 100 : 0,
    postLikesMedian,
    likesRatio: postLikesMedian ? medianLikes / postLikesMedian : null,
    linkedPosts: postLikes.length,
    byOrientation,
    byMonth,
    top: ranked.slice(0, 5),
    flop: ranked.length >= 8 ? ranked.slice(-3).reverse() : [],
  };
}

/** Ниже этого числа снимков медианы — совпадение, а не наблюдение. */
export const PHOTO_MIN_SAMPLE = 5;

export function photoFindings(report: PhotoReport): string[] {
  const out: string[] = [];
  if (!report.count) return out;

  if (report.count < PHOTO_MIN_SAMPLE) {
    out.push(`Фотографий за период всего ${report.count} — на таком числе `
      + 'медианы ничего не значат. Цифры ниже смотрите как справку, '
      + 'а не как наблюдение.');
    return out;
  }

  if (report.likesRatio !== null && report.likesRatio >= 1.5) {
    out.push(`Лайков под самой фотографией в ${report.likesRatio.toFixed(1)} раза больше, `
      + `чем под записью: ${Math.round(report.medianLikes)} против `
      + `${Math.round(report.postLikesMedian)}. Люди реагируют на картинку, `
      + 'а не на текст рядом — значит, текст можно сокращать, а картинку '
      + 'выбирать тщательнее.');
  }
  if (report.likesRatio !== null && report.likesRatio > 0 && report.likesRatio <= 0.4) {
    out.push('Реакции собирает запись, а не фотография внутри. Обычно так и '
      + 'бывает у текстовых страниц: картинка там — иллюстрация, и вкладываться '
      + 'в неё смысла нет.');
  }

  if (report.offWall && report.offWallLikesShare >= 40) {
    out.push(`${Math.round(report.offWallLikesShare)}% всех лайков собрали фотографии, `
      + `которых не было в ленте (${report.offWall} шт.). Их находят через альбомы `
      + 'и поиск — то есть спрос есть, а записи под него нет. Выложите лучшие '
      + 'записью: это готовый контент, который уже нравится.');
  }

  const best = [...report.byOrientation].filter((r) => r.count >= 3)
    .sort((a, b) => b.medianLikes - a.medianLikes)[0];
  const worst = [...report.byOrientation].filter((r) => r.count >= 3)
    .sort((a, b) => a.medianLikes - b.medianLikes)[0];
  if (best && worst && best.label !== worst.label && worst.medianLikes > 0
    && best.medianLikes / worst.medianLikes >= 1.4) {
    out.push(`Формат кадра решает: ${best.label} собирают медиану `
      + `${Math.round(best.medianLikes)} лайков, ${worst.label} — `
      + `${Math.round(worst.medianLikes)}. В ленте на телефоне это разная площадь `
      + 'экрана, и разница копится.');
  }

  if (report.byMonth.length >= 3) {
    const first = report.byMonth[0];
    const last = report.byMonth[report.byMonth.length - 1];
    if (first.medianLikes > 0) {
      const change = ((last.medianLikes - first.medianLikes) / first.medianLikes) * 100;
      if (Math.abs(change) >= 25) {
        out.push(`С ${first.label} по ${last.label} медиана лайков на фотографию `
          + `${change > 0 ? 'выросла' : 'упала'} на ${Math.abs(Math.round(change))}%: `
          + `${Math.round(first.medianLikes)} → ${Math.round(last.medianLikes)}.`);
      }
    }
  }

  if (report.totalComments === 0 && report.count >= PHOTO_MIN_SAMPLE) {
    out.push('Под фотографиями не оставили ни одного комментария. Подпись-вопрос '
      + 'к снимку — самый дешёвый способ это изменить: отвечать проще, '
      + 'чем на пост.');
  }

  return out;
}
