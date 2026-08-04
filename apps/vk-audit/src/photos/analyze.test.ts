/**
 * Разбор фотографий — чистые функции, сверяются с арифметикой напрямую.
 * Эталонов из питоновской версии здесь нет: этих расчётов в ней не было.
 */
import { describe, expect, it } from 'vitest';

import { analyzePhotos, photoFindings } from './analyze';
import type { PhotoStat } from './collect';
import type { RawPost } from '../engine/types';

const photo = (
  id: number, likes: number, extra: Partial<PhotoStat> = {},
): PhotoStat => ({
  ownerId: -100,
  id,
  postId: id,
  onWall: true,
  albumId: -7,
  text: `Снимок ${id}`,
  date: Date.UTC(2026, 0, 15) / 1000,
  likes,
  comments: 1,
  reposts: 0,
  width: 1080,
  height: 1350,
  ...extra,
});

const post = (id: number, likes: number): RawPost => ({
  id, date: 0, likes: { count: likes },
} as unknown as RawPost);

describe('разбор фотографий', () => {
  it('считает медианы и общие числа', () => {
    const report = analyzePhotos([photo(1, 10), photo(2, 20), photo(3, 60)], []);

    expect(report.count).toBe(3);
    expect(report.totalLikes).toBe(90);
    expect(report.medianLikes).toBe(20);
    expect(report.totalComments).toBe(3);
  });

  it('сравнивает лайки снимка с лайками его записи', () => {
    const report = analyzePhotos(
      [photo(1, 30), photo(2, 30)],
      [post(1, 10), post(2, 10)],
    );

    expect(report.postLikesMedian).toBe(10);
    expect(report.likesRatio).toBe(3);
    expect(report.linkedPosts).toBe(2);
  });

  it('не выдумывает отношение, когда записей с фото нет', () => {
    const report = analyzePhotos([photo(1, 30, { onWall: false, postId: 0 })], []);
    expect(report.likesRatio).toBeNull();
    expect(report.offWall).toBe(1);
    expect(report.onWall).toBe(0);
  });

  it('считает долю лайков, собранную мимо ленты', () => {
    const report = analyzePhotos([
      photo(1, 30, { onWall: false, postId: 0 }),
      photo(2, 10),
    ], []);

    expect(report.offWallLikesShare).toBe(75);
  });

  it('раскладывает по форме кадра', () => {
    const report = analyzePhotos([
      photo(1, 10, { width: 1080, height: 1350 }),
      photo(2, 20, { width: 1080, height: 1080 }),
      photo(3, 30, { width: 1920, height: 1080 }),
    ], []);

    expect(report.byOrientation.map((r) => [r.label, r.count]))
      .toEqual([['вертикальные', 1], ['квадратные', 1], ['горизонтальные', 1]]);
  });

  it('на малом числе снимков «худших» не показывает', () => {
    const few = analyzePhotos([1, 2, 3, 4].map((i) => photo(i, i * 10)), []);
    expect(few.flop).toEqual([]);

    const many = analyzePhotos([1, 2, 3, 4, 5, 6, 7, 8].map((i) => photo(i, i * 10)), []);
    expect(many.flop).toHaveLength(3);
    expect(many.flop[0].likes).toBe(10);
  });
});

describe('замечания по фотографиям', () => {
  it('на паре снимков предупреждает, что это не наблюдение', () => {
    const out = photoFindings(analyzePhotos([photo(1, 10), photo(2, 20)], []));
    expect(out).toHaveLength(1);
    expect(out[0]).toContain('медианы ничего не значат');
  });

  it('замечает, что реакция уходит на картинку, а не на запись', () => {
    const report = analyzePhotos(
      [1, 2, 3, 4, 5].map((i) => photo(i, 30)),
      [1, 2, 3, 4, 5].map((i) => post(i, 10)),
    );
    expect(photoFindings(report).some((t) => t.includes('под самой фотографией'))).toBe(true);
  });

  it('замечает лайки мимо ленты', () => {
    const report = analyzePhotos([
      ...[1, 2, 3].map((i) => photo(i, 100, { onWall: false, postId: 0 })),
      ...[4, 5].map((i) => photo(i, 10)),
    ], []);
    expect(photoFindings(report).some((t) => t.includes('мимо ленты') || t.includes('не было в ленте')))
      .toBe(true);
  });

  it('на пустом списке молчит', () => {
    expect(photoFindings(analyzePhotos([], []))).toEqual([]);
  });
});
