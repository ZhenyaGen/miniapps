/**
 * Сбор видео и комментариев — то, чего нет в обычном разборе стены.
 *
 * Зачем отдельно: у записи с видео два разных счётчика просмотров.
 * `wall.get` отдаёт просмотры **записи**, а `video.get` — просмотры
 * самого ролика, и они расходятся в разы. На странице, где почти всё —
 * видео, разбор по просмотрам записи показывает не то, что происходит
 * на самом деле.
 *
 * Комментарии `wall.get` тоже не отдаёт: там только их количество.
 * А вопрос «о чём вообще пишут» без текстов не разобрать.
 */

import type { ApiClient } from './client';
import type { RawPost } from '../engine/types';

/**
 * Видео внутри вложений записи.
 *
 * `RawPost.attachments` описан в движке как `{ type }` — этого хватает
 * для метрик, но в ответе ВК лежат полные объекты. Читаем их локальным
 * типом, чтобы не трогать движок: он сверяется с питоновской версией.
 */
interface VideoAttachment {
  type: string;
  video?: { id?: number; owner_id?: number; title?: string; duration?: number };
}

export interface VideoRef {
  ownerId: number;
  id: number;
  /** Из какой записи взято — чтобы связать ролик с реакциями поста. */
  postId: number;
}

export interface VideoStat extends VideoRef {
  title: string;
  /** Длительность в секундах. */
  duration: number;
  views: number;
  likes: number;
  comments: number;
  reposts: number;
  date: number;
  /**
   * Клип это или обычное видео.
   *
   * ВК помечает клипы полем `type: 'short_video'`; в разных ответах
   * встречается и флаг `is_short`. Проверяем оба и ничего не угадываем
   * по длительности: короткое видео и клип — не одно и то же, они
   * живут в разных лентах и собирают охват по-разному.
   */
  isClip: boolean;
  /** Прикреплён ли ролик к записи на стене. */
  onWall: boolean;
}

/** Клип или нет — по тому, что прислал ВК, без догадок. */
function detectClip(item: Record<string, any>): boolean {
  return item.type === 'short_video' || item.is_short === true;
}

function toStat(item: Record<string, any>, postId: number | null): VideoStat {
  return {
    ownerId: Number(item.owner_id ?? 0),
    id: Number(item.id ?? 0),
    postId: postId ?? 0,
    onWall: postId !== null,
    title: String(item.title ?? ''),
    duration: Number(item.duration ?? 0),
    views: Number(item.views ?? 0),
    likes: Number(item.likes?.count ?? 0),
    comments: Number(item.comments ?? 0),
    reposts: Number(item.reposts?.count ?? 0),
    date: Number(item.date ?? 0),
    isClip: detectClip(item),
  };
}

export interface CommentItem {
  postId: number;
  fromId: number;
  date: number;
  text: string;
  likes: number;
  /** Ответ ли это на другой комментарий. */
  isReply: boolean;
}

export interface CommentThread {
  postId: number;
  /** Сколько всего комментариев у записи по данным ВК. */
  total: number;
  items: CommentItem[];
}

/** Ролики из вложений: без повторов, в порядке появления в ленте. */
export function videoRefsFromPosts(posts: RawPost[]): VideoRef[] {
  const seen = new Set<string>();
  const refs: VideoRef[] = [];

  for (const post of posts) {
    const attachments = (post.attachments ?? []) as VideoAttachment[];
    for (const attachment of attachments) {
      if (attachment.type !== 'video' || !attachment.video) continue;
      const { id, owner_id: ownerId } = attachment.video;
      if (!id || !ownerId) continue;
      const key = `${ownerId}_${id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      refs.push({ ownerId, id, postId: post.id });
    }
  }
  return refs;
}

/** ВК принимает до 200 идентификаторов за раз; берём с запасом поменьше. */
const VIDEO_BATCH = 100;

/** Сколько роликов забираем максимум: дальше это уже не разбор, а выгрузка. */
const VIDEO_MAX = 400;

/**
 * Все ролики страницы за период — и клипы, и обычные видео.
 *
 * Идём не от вложений в записях, а от самого раздела видео: клипы часто
 * публикуются только в ленту клипов, на стену не попадают, и разбор
 * «по вложениям» их бы не увидел вовсе. Привязка к записи проставляется
 * потом, по тем роликам, что всё-таки прикреплены к постам.
 *
 * Ошибки глотаем целиком: доступ к видео закрывают настройками, и
 * молчащая вкладка лучше упавшего отчёта.
 */
export async function collectVideos(
  api: ApiClient,
  ownerId: number,
  sinceTs: number,
  refs: VideoRef[],
  onProgress?: (done: number, total: number) => void,
): Promise<VideoStat[]> {
  const postByVideo = new Map(refs.map((r) => [`${r.ownerId}_${r.id}`, r.postId]));
  const out: VideoStat[] = [];

  for (let offset = 0; offset < VIDEO_MAX; offset += VIDEO_BATCH) {
    onProgress?.(out.length, VIDEO_MAX);
    let items: Array<Record<string, any>> = [];
    try {
      const resp = await api.call<{ items?: Array<Record<string, any>>; count?: number }>(
        'video.get',
        { owner_id: ownerId, count: VIDEO_BATCH, offset },
      );
      items = resp?.items ?? [];
    } catch {
      break;
    }
    if (!items.length) break;

    let older = false;
    for (const item of items) {
      if (Number(item.date ?? 0) < sinceTs) {
        older = true;
        continue;
      }
      const key = `${item.owner_id}_${item.id}`;
      const postId = postByVideo.get(key);
      out.push(toStat(item, postId ?? null));
    }
    // выдача идёт от свежих к старым: как только пошли ролики старше
    // периода, дальше листать незачем
    if (older || items.length < VIDEO_BATCH) break;
  }

  return out;
}

/**
 * Сколько записей разбирать по комментариям.
 *
 * Один запрос на запись, три запроса в секунду — на трёхстах постах
 * это две минуты ожидания ради текстов, которые всё равно читают
 * выборочно. Берём самые обсуждаемые: там, где комментариев нет,
 * и разбирать нечего.
 */
export const COMMENT_POSTS = 30;

export async function collectComments(
  api: ApiClient,
  ownerId: number,
  posts: RawPost[],
  onProgress?: (done: number, total: number) => void,
): Promise<CommentThread[]> {
  const targets = posts
    .filter((p) => Number((p as { comments?: { count?: number } }).comments?.count ?? 0) > 0)
    .sort((a, b) => {
      const ca = Number((a as { comments?: { count?: number } }).comments?.count ?? 0);
      const cb = Number((b as { comments?: { count?: number } }).comments?.count ?? 0);
      return cb - ca;
    })
    .slice(0, COMMENT_POSTS);

  const threads: CommentThread[] = [];
  for (const [i, post] of targets.entries()) {
    onProgress?.(i + 1, targets.length);
    try {
      const resp = await api.call<{ count?: number; items?: Array<Record<string, any>> }>(
        'wall.getComments',
        {
          owner_id: ownerId,
          post_id: post.id,
          count: 100,
          thread_items_count: 10,
          preview_length: 0,
        },
      );
      const items: CommentItem[] = [];
      for (const raw of resp?.items ?? []) {
        const base: CommentItem = {
          postId: post.id,
          fromId: Number(raw.from_id ?? 0),
          date: Number(raw.date ?? 0),
          text: String(raw.text ?? ''),
          likes: Number(raw.likes?.count ?? 0),
          isReply: Boolean(raw.reply_to_comment),
        };
        items.push(base);
        // ветки ответов ВК кладёт отдельно — без них диалог выглядит
        // односторонним, а именно ответы автора и надо посчитать
        for (const reply of raw.thread?.items ?? []) {
          items.push({
            postId: post.id,
            fromId: Number(reply.from_id ?? 0),
            date: Number(reply.date ?? 0),
            text: String(reply.text ?? ''),
            likes: Number(reply.likes?.count ?? 0),
            isReply: true,
          });
        }
      }
      threads.push({ postId: post.id, total: Number(resp?.count ?? items.length), items });
    } catch {
      // комментарии закрыты у записи — пропускаем её молча
    }
  }
  return threads;
}
