/**
 * Разбор клипов проверяется без сети: `analyzeClips` и `clipFindings` —
 * чистые функции. Числа сверяются с арифметикой напрямую, эталонов
 * из питоновской версии для них не существует.
 */
import { describe, expect, it } from 'vitest';

import { analyzeClips, clipFindings } from './clips';
import type { VideoStat } from '../vk/video';

const clip = (
  id: number,
  views: number,
  duration = 20,
  extra: Partial<VideoStat> = {},
): VideoStat => ({
  ownerId: -100,
  id,
  postId: id,
  onWall: true,
  isClip: true,
  title: `Клип ${id}`,
  duration,
  views,
  likes: Math.round(views * 0.05),
  comments: 1,
  reposts: 1,
  date: Date.UTC(2026, 0, 15) / 1000,
  ...extra,
});

describe('разбор клипов', () => {
  it('берёт только клипы, обычные видео не считает', () => {
    const report = analyzeClips([
      clip(1, 100), clip(2, 200),
      { ...clip(3, 9999), isClip: false },
    ]);

    expect(report.count).toBe(2);
    expect(report.totalViews).toBe(300);
  });

  it('считает разброс: лучший к серединному', () => {
    const report = analyzeClips([clip(1, 100), clip(2, 200), clip(3, 1200)]);
    expect(report.medianViews).toBe(200);
    expect(report.maxViews).toBe(1200);
    expect(report.spread).toBe(6);
  });

  it('находит выстрелы и их долю в просмотрах', () => {
    // медиана 100, порог выстрела — больше 300
    const report = analyzeClips([
      clip(1, 50), clip(2, 100), clip(3, 100), clip(4, 150), clip(5, 1600),
    ]);

    expect(report.hits).toBe(1);
    expect(report.totalViews).toBe(2000);
    expect(report.hitsShare).toBe(80);
  });

  it('раскладывает по длине узкими корзинами', () => {
    const report = analyzeClips([
      clip(1, 100, 10), clip(2, 200, 12),
      clip(3, 300, 45), clip(4, 400, 90),
    ]);

    expect(report.byDuration.map((r) => [r.label, r.count]))
      .toEqual([['до 15 сек', 2], ['30–60 сек', 1], ['больше минуты', 1]]);
  });

  it('строит помесячную динамику по возрастанию', () => {
    const report = analyzeClips([
      clip(1, 100, 20, { date: Date.UTC(2026, 1, 10) / 1000 }),
      clip(2, 300, 20, { date: Date.UTC(2026, 0, 10) / 1000 }),
      clip(3, 500, 20, { date: Date.UTC(2026, 0, 20) / 1000 }),
    ]);

    expect(report.byMonth.map((m) => [m.label, m.count, m.medianViews]))
      .toEqual([['января 2026', 2, 400], ['февраля 2026', 1, 100]]);
  });

  it('на пустом списке ничего не выдумывает', () => {
    const report = analyzeClips([]);
    expect(report.count).toBe(0);
    expect(report.spread).toBeNull();
    expect(report.hitsShare).toBe(0);
    expect(clipFindings(report)).toEqual([]);
  });
});

describe('замечания по клипам', () => {
  it('говорит про разброс, когда он велик', () => {
    const report = analyzeClips([
      clip(1, 100), clip(2, 100), clip(3, 100), clip(4, 100), clip(5, 2000),
    ]);
    const out = clipFindings(report);
    expect(out.some((t) => t.includes('Разброс огромный'))).toBe(true);
    expect(out.some((t) => t.includes('всех просмотров'))).toBe(true);
  });

  it('замечает, когда выстрелов нет вовсе', () => {
    const flat = analyzeClips([1, 2, 3, 4, 5].map((i) => clip(i, 100)));
    expect(clipFindings(flat).some((t) => t.includes('Ни одного выстрела'))).toBe(true);
  });

  it('замечает падение по месяцам', () => {
    const report = analyzeClips([
      clip(1, 1000, 20, { date: Date.UTC(2026, 0, 10) / 1000 }),
      clip(2, 900, 20, { date: Date.UTC(2026, 1, 10) / 1000 }),
      clip(3, 200, 20, { date: Date.UTC(2026, 2, 10) / 1000 }),
    ]);
    expect(clipFindings(report).some((t) => t.includes('упала на'))).toBe(true);
  });

  it('замечает клипы мимо стены', () => {
    const report = analyzeClips([clip(1, 100, 20, { onWall: false }), clip(2, 100)]);
    expect(clipFindings(report).some((t) => t.includes('не выложены записью'))).toBe(true);
  });
});
