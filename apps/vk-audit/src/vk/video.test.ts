/**
 * Сбор роликов проверяется на поддельном клиенте API: сети здесь нет,
 * а вся суть — в том, что именно мы берём из ответа `video.get` и что
 * выбрасываем. Раздел «Видео» отдаёт вперемешку своё и чужое, поэтому
 * ошибки тут не видно глазом — только тестом.
 */
import { describe, expect, it } from 'vitest';

import { collectVideos, videoRefsFromPosts } from './video';
import type { ApiClient } from './client';
import type { RawPost } from '../engine/types';

const OWNER = -100;
const NOW = 1_800_000_000;
const SINCE = NOW - 30 * 86_400;

type Call = { method: string; params: Record<string, string | number> };

/** Клиент, отвечающий заранее заданными наборами и запоминающий вызовы. */
function fakeApi(
  handler: (call: Call) => unknown,
): ApiClient & { log: Call[] } {
  const log: Call[] = [];
  return {
    calls: 0,
    log,
    async call<T>(method: string, params: Record<string, string | number> = {}): Promise<T> {
      log.push({ method, params });
      return handler({ method, params }) as T;
    },
  };
}

const raw = (id: number, extra: Record<string, unknown> = {}) => ({
  id,
  owner_id: OWNER,
  title: `Ролик ${id}`,
  duration: 60,
  views: 100,
  likes: { count: 5 },
  comments: 1,
  reposts: { count: 0 },
  date: NOW,
  ...extra,
});

describe('сбор роликов', () => {
  it('не считает своими чужие ролики, добавленные на страницу', async () => {
    const api = fakeApi(() => ({
      items: [raw(1), raw(2, { owner_id: 555 }), raw(3, { owner_id: 555 })],
    }));

    const { videos, foreign } = await collectVideos(api, OWNER, SINCE, []);

    expect(videos.map((v) => v.id)).toEqual([1]);
    expect(foreign).toBe(2);
  });

  it('не обрывает выборку на старом чужом ролике', async () => {
    // у добавленного чужого видео в `date` лежит дата съёмки, и по ней
    // страница выглядит «закончившейся» задолго до конца периода
    const first = Array.from({ length: 100 }, (_, i) => (i === 50
      ? raw(1000, { owner_id: 555, date: NOW - 400 * 86_400 })
      : raw(i + 1)));

    const api = fakeApi(({ params }) => (params.offset === 0
      ? { items: first }
      : { items: [raw(200)] }));

    const { videos } = await collectVideos(api, OWNER, SINCE, []);

    // вторая страница должна прочитаться: чужая дата листание не останавливает
    expect(videos.some((v) => v.id === 200)).toBe(true);
    expect(videos).toHaveLength(100);
  });

  it('на своём старом ролике листать перестаёт', async () => {
    const api = fakeApi(({ params }) => (params.offset === 0
      ? { items: [raw(1), raw(2, { date: SINCE - 1 })] }
      : { items: [raw(3)] }));

    const { videos } = await collectVideos(api, OWNER, SINCE, []);

    expect(videos.map((v) => v.id)).toEqual([1]);
    expect(api.log).toHaveLength(1);
  });

  it('берёт пометку клипа из вложения записи, если раздел её не отдал', async () => {
    const posts = [{
      id: 7,
      date: NOW,
      attachments: [{ type: 'video', video: { id: 1, owner_id: OWNER, type: 'short_video' } }],
    }] as unknown as RawPost[];
    // раздел «Видео» отдаёт тот же ролик без единого признака клипа
    const api = fakeApi(() => ({ items: [raw(1, { duration: 20 })] }));

    const { videos } = await collectVideos(api, OWNER, SINCE, videoRefsFromPosts(posts));

    expect(videos[0].isClip).toBe(true);
    expect(videos[0].clipGuess).toBeFalsy();
    expect(videos[0].postId).toBe(7);
    expect(videos[0].onWall).toBe(true);
  });

  it('добирает ролик из записи, которого нет в разделе', async () => {
    const posts = [{
      id: 7,
      date: NOW,
      attachments: [{ type: 'video', video: { id: 9, owner_id: OWNER } }],
    }] as unknown as RawPost[];

    const api = fakeApi(({ params }) => (params.videos
      ? { items: [raw(9)] }
      : { items: [raw(1)] }));

    const { videos } = await collectVideos(api, OWNER, SINCE, videoRefsFromPosts(posts));

    expect(videos.map((v) => v.id).sort()).toEqual([1, 9]);
    expect(api.log.some((c) => c.params.videos === `${OWNER}_9`)).toBe(true);
  });

  it('когда ВК не разметил ничего, клипами считает вертикальные короткие', async () => {
    const api = fakeApi(() => ({
      items: [
        raw(1, { duration: 30, image: [{ width: 320, height: 568 }] }),
        raw(2, { duration: 600, image: [{ width: 320, height: 568 }] }),
        raw(3, { duration: 30, image: [{ width: 640, height: 360 }] }),
      ],
    }));

    const { videos } = await collectVideos(api, OWNER, SINCE, []);
    const byId = new Map(videos.map((v) => [v.id, v]));

    expect(byId.get(1)?.isClip).toBe(true);
    expect(byId.get(1)?.clipGuess).toBe(true);
    // длинное вертикальное — не клип, горизонтальное короткое — тоже
    expect(byId.get(2)?.isClip).toBe(false);
    expect(byId.get(3)?.isClip).toBe(false);
  });

  it('разметку ВК на догадки не меняет', async () => {
    const api = fakeApi(() => ({
      items: [
        raw(1, { type: 'short_video' }),
        raw(2, { duration: 30, image: [{ width: 320, height: 568 }] }),
      ],
    }));

    const { videos } = await collectVideos(api, OWNER, SINCE, []);
    const byId = new Map(videos.map((v) => [v.id, v]));

    expect(byId.get(1)?.isClip).toBe(true);
    // ВК разметил хотя бы один — значит разметке можно верить, догадок нет
    expect(byId.get(2)?.isClip).toBe(false);
  });

  it('отказ раздела возвращает причиной, а не молчаливым нулём', async () => {
    const api = fakeApi(() => {
      throw new Error('Доступ к этой странице закрыт её настройками приватности. (код 15)');
    });

    const { videos, error } = await collectVideos(api, OWNER, SINCE, []);

    expect(videos).toEqual([]);
    expect(error).toContain('код 15');
  });
});
