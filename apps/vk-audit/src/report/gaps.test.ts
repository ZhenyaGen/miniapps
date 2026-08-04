/**
 * «Чего нет» — список того, что в метрики не попадает по определению.
 * Проверяем, что он не молчит там, где формата нет, и не выдумывает
 * там, где данных для суждения ещё не собрали.
 */
import { describe, expect, it } from 'vitest';

import { findGaps } from './gaps';
import type { GapsInput } from './gaps';
import type { Metrics } from '../engine/types';
import type { ClipsReport } from '../video/clips';
import type { VideoReport } from '../video/analyze';
import type { PhotoReport } from '../photos/analyze';
import type { ContentMix } from './mix';

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
  ...over,
} as unknown as Metrics);

const keys = (input: GapsInput) => findGaps(input).map((g) => g.key);

describe('чего нет на странице', () => {
  it('на здоровой странице молчит обо всём, кроме несобранного', () => {
    const out = keys({ metrics: healthy() });
    // медиа и конкуренты не читались — про это сказать надо
    expect(out).toEqual(['media-not-collected', 'no-rivals']);
  });

  it('замечает отсутствующие форматы, но только после разбора медиа', () => {
    const before = keys({ metrics: healthy() });
    expect(before).not.toContain('no-clips');

    const after = keys({
      metrics: healthy(),
      mix: {} as ContentMix,
      mediaCollected: true,
    });
    expect(after).toContain('no-clips');
    expect(after).toContain('no-video');
    expect(after).toContain('no-photos');
  });

  it('о редком формате говорит иначе, чем об отсутствующем', () => {
    const out = keys({
      metrics: healthy(),
      clips: { count: 2, offWall: 0 } as ClipsReport,
      mediaCollected: true,
    });
    expect(out).toContain('few-clips');
    expect(out).not.toContain('no-clips');
  });

  it('замечает клипы и фото, не выложенные записями', () => {
    const out = keys({
      metrics: healthy(),
      clips: { count: 8, offWall: 8 } as ClipsReport,
      photos: { count: 5, onWall: 0 } as PhotoReport,
      video: { count: 6 } as VideoReport,
      mediaCollected: true,
    });
    expect(out).toContain('clips-off-wall');
    expect(out).toContain('photos-off-wall');
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

  it('замечает молчащего автора в комментариях', () => {
    const out = keys({
      metrics: healthy(),
      comments: { posts: 5, fromAuthor: 0, unanswered: [] } as never,
    });
    expect(out).toContain('no-replies');
  });

  it('у каждого пункта есть и цифра, и польза', () => {
    const gaps = findGaps({ metrics: healthy({ polls: 0 } as Partial<Metrics>) });
    expect(gaps.every((g) => g.detail.length > 5 && g.gain.length > 20)).toBe(true);
  });
});
