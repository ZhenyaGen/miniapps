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

/**
 * Настоящая статистика роликов.
 *
 * Ошибки глотаем целиком: доступ к видео закрывают настройками, и
 * молчащая вкладка лучше упавшего отчёта.
 */
export async function collectVideos(
  api: ApiClient,
  refs: VideoRef[],
  onProgress?: (done: number, total: number) => void,
): Promise<VideoStat[]> {
  const out: VideoStat[] = [];
  const byKey = new Map(refs.map((r) => [`${r.ownerId}_${r.id}`, r]));

  for (let i = 0; i < refs.length; i += VIDEO_BATCH) {
    const batch = refs.slice(i, i + VIDEO_BATCH);
    onProgress?.(Math.min(i + batch.length, refs.length), refs.length);
    try {
      const resp = await api.call<{ items?: Array<Record<string, any>> }>('video.get', {
        videos: batch.map((r) => `${r.ownerId}_${r.id}`).join(','),
        count: VIDEO_BATCH,
      });
      for (const item of resp?.items ?? []) {
        const ref = byKey.get(`${item.owner_id}_${item.id}`);
        if (!ref) continue;
        out.push({
          ...ref,
          title: String(item.title ?? ''),
          duration: Number(item.duration ?? 0),
          views: Number(item.views ?? 0),
          likes: Number(item.likes?.count ?? 0),
          comments: Number(item.comments ?? 0),
          reposts: Number(item.reposts?.count ?? 0),
          date: Number(item.date ?? 0),
        });
      }
    } catch {
      // видео закрыты или метод недоступен — вкладка просто останется пустой
    }
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
