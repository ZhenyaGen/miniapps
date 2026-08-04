/**
 * Разбор роликов и комментариев — чистые функции, проверяются без сети.
 * Движок эти числа не считает, поэтому эталонов из питоновской версии
 * здесь нет и быть не может: сверяемся с арифметикой напрямую.
 */
import { describe, expect, it } from 'vitest';

import { analyzeComments, analyzeVideos, videoFindings } from './analyze';
import { videoRefsFromPosts } from '../vk/video';
import type { CommentThread, VideoStat } from '../vk/video';
import type { RawPost } from '../engine/types';

const video = (
  id: number, views: number, duration: number, comments = 0, isClip = false,
): VideoStat => ({
  ownerId: -100,
  id,
  postId: id,
  onWall: true,
  isClip,
  title: `Ролик ${id}`,
  duration,
  views,
  likes: 10,
  comments,
  reposts: 1,
  date: 1_800_000_000,
});

const post = (id: number, views: number): RawPost => ({
  id,
  date: 1_800_000_000,
  views: { count: views },
} as unknown as RawPost);

describe('ролики из вложений', () => {
  it('находит видео и не повторяет одно дважды', () => {
    const posts = [
      { id: 1, date: 0, attachments: [{ type: 'video', video: { id: 5, owner_id: -100 } }] },
      { id: 2, date: 0, attachments: [{ type: 'video', video: { id: 5, owner_id: -100 } }] },
      { id: 3, date: 0, attachments: [{ type: 'photo' }] },
    ] as unknown as RawPost[];

    expect(videoRefsFromPosts(posts))
      .toEqual([{ ownerId: -100, id: 5, postId: 1, isClip: false }]);
  });

  it('запоминает пометку клипа из вложения', () => {
    const posts = [{
      id: 1,
      date: 0,
      attachments: [{ type: 'video', video: { id: 5, owner_id: -100, type: 'short_video' } }],
    }] as unknown as RawPost[];

    expect(videoRefsFromPosts(posts)[0].isClip).toBe(true);
  });

  it('пропускает вложения без идентификаторов', () => {
    const posts = [
      { id: 1, date: 0, attachments: [{ type: 'video', video: {} }] },
      { id: 2, date: 0 },
    ] as unknown as RawPost[];

    expect(videoRefsFromPosts(posts)).toEqual([]);
  });
});

describe('разбор роликов', () => {
  it('считает медианы и раскладывает по длительности', () => {
    const videos = [
      video(1, 1000, 20), video(2, 900, 25),
      video(3, 200, 120), video(4, 100, 150),
    ];
    const report = analyzeVideos(videos, [post(1, 50), post(2, 50), post(3, 50), post(4, 50)]);

    expect(report.count).toBe(4);
    expect(report.totalViews).toBe(2200);
    expect(report.medianViews).toBe(550);
    expect(report.byDuration.map((r) => [r.label, r.count]))
      .toEqual([['до 30 сек', 2], ['1–3 мин', 2]]);
  });

  it('показывает, во сколько раз ролики смотрят чаще записей', () => {
    const report = analyzeVideos([video(1, 1000, 30), video(2, 1000, 30)], [post(1, 100), post(2, 100)]);
    expect(report.viewsRatio).toBe(10);
    expect(report.postViewsMedian).toBe(100);
  });

  it('без просмотров у записей отношение не выдумывает', () => {
    const report = analyzeVideos([video(1, 1000, 30)], [post(1, 0)]);
    expect(report.viewsRatio).toBeNull();
  });

  it('на малом числе роликов не показывает «худшие»', () => {
    const few = analyzeVideos([1, 2, 3, 4].map((i) => video(i, i * 100, 30)), []);
    expect(few.flop).toEqual([]);

    const many = analyzeVideos(
      [1, 2, 3, 4, 5, 6, 7, 8].map((i) => video(i, i * 100, 30)),
      [],
    );
    expect(many.flop).toHaveLength(3);
    // худшие идут от самого слабого
    expect(many.flop[0].views).toBe(100);
  });
});

describe('разбор комментариев', () => {
  const OWNER = -100;
  const thread = (postId: number, items: Array<[number, number, string]>): CommentThread => ({
    postId,
    source: 'wall',
    total: items.length,
    items: items.map(([fromId, date, text]) => ({
      postId, fromId, date, text, likes: 0, isReply: false,
    })),
  });

  it('отделяет ответы автора от чужих реплик', () => {
    const report = analyzeComments([
      thread(1, [[7, 100, 'а как это сделано?'], [OWNER, 200, 'вот так']]),
      thread(2, [[8, 100, 'красиво']]),
    ], OWNER);

    expect(report.total).toBe(3);
    expect(report.fromPeople).toBe(2);
    expect(report.fromAuthor).toBe(1);
    expect(report.answeredShare).toBe(50);
  });

  it('считает время до первого ответа в часах', () => {
    const report = analyzeComments([
      thread(1, [[7, 0, 'вопрос?'], [OWNER, 7200, 'ответ']]),
    ], OWNER);

    expect(report.medianReplyHours).toBe(2);
  });

  it('собирает вопросы, оставшиеся без ответа', () => {
    const report = analyzeComments([
      thread(1, [[7, 0, 'а сколько это заняло?']]),
      thread(2, [[8, 0, 'а тут?'], [OWNER, 10, 'столько-то']]),
    ], OWNER);

    // из второй ветки вопрос не попадает: автор в ней ответил
    expect(report.unanswered).toEqual([{
      postId: 1, text: 'а сколько это заняло?', url: null, where: 'к записи 1',
    }]);
    expect(report.questionShare).toBe(100);
  });

  it('в частых словах не учитывает ответы автора и одиночные слова', () => {
    const report = analyzeComments([
      thread(1, [[7, 0, 'нейросеть огонь'], [8, 0, 'нейросеть класс'], [OWNER, 0, 'спасибо нейросеть']]),
    ], OWNER);

    expect(report.topWords).toEqual([{ word: 'нейросеть', n: 2 }]);
  });

  it('на пустом списке ничего не выдумывает', () => {
    const report = analyzeComments([], OWNER);
    expect(report.total).toBe(0);
    expect(report.medianReplyHours).toBeNull();
    expect(report.answeredShare).toBe(0);
  });

  it('считает ветки из-под роликов вместе со стеной и помечает их', () => {
    const underVideo: CommentThread = {
      postId: 0,
      source: 'video',
      total: 1,
      video: { ownerId: -100, id: 55, title: 'Коты сквозь века' },
      items: [{ postId: 0, fromId: 7, date: 0, text: 'а как это снято?', likes: 0, isReply: false }],
    };

    const report = analyzeComments([thread(1, [[8, 0, 'огонь']]), underVideo], OWNER);

    expect(report.posts).toBe(2);
    expect(report.fromVideos).toBe(1);
    expect(report.total).toBe(2);
    // вопрос из-под ролика ведёт на сам ролик, а не на запись
    expect(report.unanswered[0].url).toBe('https://vk.com/video-100_55');
    expect(report.unanswered[0].where).toContain('Коты сквозь века');
  });
});

describe('клипы и обычные видео', () => {
  it('считает их по отдельности', () => {
    const report = analyzeVideos([
      video(1, 900, 20, 0, true), video(2, 1100, 25, 0, true),
      video(3, 100, 300), video(4, 200, 400),
    ], []);

    expect(report.clips.count).toBe(2);
    expect(report.clips.medianViews).toBe(1000);
    expect(report.regular.count).toBe(2);
    expect(report.regular.medianViews).toBe(150);
  });

  it('когда ВК ничего не разметил, клипов просто нет', () => {
    const report = analyzeVideos([video(1, 100, 30), video(2, 200, 30)], []);
    expect(report.clips.count).toBe(0);
    expect(report.regular.count).toBe(2);
  });

  it('замечает ролики мимо стены', () => {
    const off = { ...video(1, 100, 30), onWall: false };
    const report = analyzeVideos([off, video(2, 100, 30)], []);
    expect(report.offWall).toBe(1);
    expect(videoFindings(report, analyzeComments([], -100))
      .some((t) => t.includes('мимо стены'))).toBe(true);
  });
});

describe('замечания', () => {
  const empty = analyzeComments([], -100);

  it('говорит про расхождение счётчиков, когда оно велико', () => {
    const report = analyzeVideos([video(1, 1000, 30), video(2, 1000, 30)], [post(1, 100), post(2, 100)]);
    const out = videoFindings(report, empty);
    expect(out.some((t) => t.includes('чаще, чем открывают'))).toBe(true);
  });

  it('молчит, когда счётчики сходятся', () => {
    const report = analyzeVideos([video(1, 100, 30), video(2, 110, 30)], [post(1, 100), post(2, 100)]);
    expect(videoFindings(report, empty)).toEqual([]);
  });

  it('замечает вопросы без ответа', () => {
    const comments = analyzeComments([{
      postId: 1,
      source: 'wall',
      total: 1,
      items: [{ postId: 1, fromId: 7, date: 0, text: 'а как?', likes: 0, isReply: false }],
    }], -100);
    const out = videoFindings(analyzeVideos([], []), comments);
    expect(out.some((t) => t.includes('без ответа'))).toBe(true);
  });
});
