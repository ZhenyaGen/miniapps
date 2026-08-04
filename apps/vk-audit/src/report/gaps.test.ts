/**
 * «Чего нет» — список того, что в метрики не попадает по определению.
 * Проверяем, что он не молчит там, где приёма нет, и что каждый пункт
 * несёт и цифру, и пользу.
 */
import { describe, expect, it } from 'vitest';

import { findGaps } from './gaps';
import type { GapsInput } from './gaps';
import type { Metrics } from '../engine/types';

/** Страница, к которой не придраться: все проверки должны молчать. */
const healthy = (over: Partial<Metrics> = {}): Metrics => ({
  polls: 3,
  pinned: { exists: true, age_days: 10, url: 'x' },
  cta_share: 60,
  questions_share: 40,
  links_share: 50,
  hashtags: { share_with: 70 },
  per_week: 4,
  slots_used: 6,
  posts_own: 40,
  avg: { comments: 3 },
  by_type: [
    { type: 'video', label: 'Видео', n: 8, share: 30 },
    { type: 'photo', label: 'Фото', n: 20, share: 70 },
  ],
  ...over,
} as unknown as Metrics);

const keys = (input: GapsInput) => findGaps(input).map((g) => g.key);

describe('чего нет на странице', () => {
  it('на здоровой странице молчит обо всём, кроме несобранного', () => {
    // конкуренты не читались — про это сказать надо
    expect(keys({ metrics: healthy() })).toEqual(['no-rivals']);
  });

  it('замечает форматы, которых нет в ленте', () => {
    const out = keys({
      metrics: healthy({
        by_type: [{ type: 'text', label: 'Только текст', n: 40, share: 100 }],
      } as unknown as Partial<Metrics>),
    });

    expect(out).toEqual(expect.arrayContaining(['no-video-posts', 'no-photo-posts', 'one-format']));
  });

  it('замечает приёмы, которых нет в текстах', () => {
    const out = keys({
      metrics: healthy({
        polls: 0,
        pinned: { exists: false, age_days: null, url: null },
        cta_share: 5,
        questions_share: 0,
        links_share: 0,
        hashtags: { share_with: 0 },
      } as unknown as Partial<Metrics>),
    });

    expect(out).toEqual(expect.arrayContaining([
      'no-polls', 'no-pinned', 'no-cta', 'no-questions', 'no-links', 'no-tags',
    ]));
  });

  it('устаревший закреп отличает от отсутствующего', () => {
    const out = keys({
      metrics: healthy({ pinned: { exists: true, age_days: 200, url: 'x' } } as Partial<Metrics>),
    });
    expect(out).toContain('stale-pinned');
    expect(out).not.toContain('no-pinned');
  });

  it('замечает молчащую ленту и один слот выхода', () => {
    const out = keys({
      metrics: healthy({
        per_week: 1,
        slots_used: 1,
        avg: { comments: 0 },
      } as unknown as Partial<Metrics>),
    });

    expect(out).toEqual(expect.arrayContaining(['rare', 'one-slot', 'no-comments']));
  });

  it('у каждого пункта есть и цифра, и польза', () => {
    const gaps = findGaps({ metrics: healthy({ polls: 0 } as Partial<Metrics>) });
    expect(gaps.every((g) => g.detail.length > 5 && g.gain.length > 20)).toBe(true);
  });
});
