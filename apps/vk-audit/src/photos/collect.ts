/**
 * Сбор фотографий страницы.
 *
 * Зачем отдельно от стены: у фотографии свои лайки и свои комментарии,
 * и с реакциями записи они не совпадают. Человек листает альбом или
 * открывает картинку из ленты — реакция уходит на саму фотографию,
 * а `wall.get` про неё не знает вовсе.
 *
 * Второе: фотографии живут дольше записей. Снимок из альбома собирает
 * лайки месяцами, и это единственный формат, где «старое» продолжает
 * работать. По стене этого не видно.
 *
 * Лежит рядом с `src/video`, а не в движке: движок сверяется
 * с питоновской версией, а этих расчётов там нет.
 */

import type { ApiClient } from '../vk/client';

export interface PhotoStat {
  ownerId: number;
  id: number;
  /** Запись, в которой фотография опубликована; 0 — если только в альбоме. */
  postId: number;
  onWall: boolean;
  albumId: number;
  /** Подпись к фотографии. */
  text: string;
  date: number;
  likes: number;
  comments: number;
  reposts: number;
  width: number;
  height: number;
}

export interface PhotoHarvest {
  photos: PhotoStat[];
  /** Почему раздел не прочитался, если не прочитался. */
  error: string | null;
}

/** ВК отдаёт до 200 фотографий за раз. */
const PHOTO_BATCH = 200;

/** Больше — это уже выгрузка архива, а не разбор. */
const PHOTO_MAX = 1000;

/** Самый большой из размеров — по нему видно ориентацию кадра. */
function biggest(item: Record<string, any>): { width: number; height: number } {
  const sizes = (item.sizes ?? []) as Array<{ width?: number; height?: number }>;
  let best = { width: 0, height: 0 };
  for (const size of sizes) {
    const w = Number(size.width ?? 0);
    const h = Number(size.height ?? 0);
    if (w * h > best.width * best.height) best = { width: w, height: h };
  }
  return best;
}

function toStat(item: Record<string, any>): PhotoStat {
  const postId = Number(item.post_id ?? 0);
  const { width, height } = biggest(item);
  return {
    ownerId: Number(item.owner_id ?? 0),
    id: Number(item.id ?? 0),
    postId,
    onWall: postId > 0,
    albumId: Number(item.album_id ?? 0),
    text: String(item.text ?? ''),
    date: Number(item.date ?? 0),
    likes: Number(item.likes?.count ?? 0),
    comments: Number(item.comments?.count ?? 0),
    reposts: Number(item.reposts?.count ?? 0),
    width,
    height,
  };
}

/**
 * Все фотографии страницы за период.
 *
 * `no_service_albums: 0` — служебные альбомы нужны: именно в «Фотографии
 * со стены» лежат картинки из записей, а без них разбор превратился бы
 * в разбор одних только альбомов.
 *
 * `extended: 1` — без него ВК не отдаёт лайки и комментарии, ради
 * которых всё и затевалось.
 */
export async function collectPhotos(
  api: ApiClient,
  ownerId: number,
  sinceTs: number,
  onProgress?: (done: number) => void,
): Promise<PhotoHarvest> {
  const photos: PhotoStat[] = [];
  let error: string | null = null;

  for (let offset = 0; offset < PHOTO_MAX; offset += PHOTO_BATCH) {
    onProgress?.(photos.length);
    let items: Array<Record<string, any>> = [];
    try {
      const resp = await api.call<{ items?: Array<Record<string, any>>; count?: number }>(
        'photos.getAll',
        {
          owner_id: ownerId,
          extended: 1,
          no_service_albums: 0,
          photo_sizes: 0,
          count: PHOTO_BATCH,
          offset,
        },
      );
      items = resp?.items ?? [];
    } catch (err) {
      error = err instanceof Error ? err.message : 'ВКонтакте не отдал фотографии';
      break;
    }
    if (!items.length) break;

    let older = false;
    for (const item of items) {
      if (Number(item.date ?? 0) < sinceTs) {
        older = true;
        continue;
      }
      photos.push(toStat(item));
    }
    // выдача антихронологическая: дошли до снимков старше периода —
    // дальше листать нечего
    if (older || items.length < PHOTO_BATCH) break;
  }

  photos.sort((a, b) => b.date - a.date);
  return { photos, error };
}
