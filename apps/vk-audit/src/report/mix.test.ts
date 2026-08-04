/**
 * Профиль контента: страницы бывают очень разные, и разбор не должен
 * делать вид, что все они одинаковые. Проверяем именно это — вывод
 * о специализации и честную пометку «данных мало».
 */
import { describe, expect, it } from 'vitest';

import { buildMix, thinNote } from './mix';
import type { Metrics } from '../engine/types';
import type { ClipsReport } from '../video/clips';
import type { VideoReport } from '../video/analyze';
import type { PhotoReport } from '../photos/analyze';

const metrics = (posts: number): Metrics => ({
  posts_own: posts, posts_total: posts,
} as unknown as Metrics);

const clips = (count: number) => ({ count } as ClipsReport);
const video = (count: number) => ({ count } as VideoReport);
const photos = (count: number) => ({ count } as PhotoReport);

describe('профиль контента', () => {
  it('узнаёт страницу на клипах', () => {
    const mix = buildMix({ metrics: metrics(4), clips: clips(40), video: video(2) });
    expect(mix.focus).toBe('clips');
    expect(mix.label).toBe('страница на клипах');
  });

  it('узнаёт страницу на видео', () => {
    const mix = buildMix({ metrics: metrics(3), clips: clips(1), video: video(30) });
    expect(mix.focus).toBe('video');
  });

  it('узнаёт страницу на фотографиях', () => {
    const mix = buildMix({ metrics: metrics(2), photos: photos(50) });
    expect(mix.focus).toBe('photo');
  });

  it('текстовую страницу не записывает в медийные', () => {
    const mix = buildMix({ metrics: metrics(40), clips: clips(0), video: video(1) });
    expect(mix.focus).toBe('text');
    expect(mix.missing).toContain('клипов');
  });

  it('когда форматы вперемешку, специализации не выдумывает', () => {
    const mix = buildMix({
      metrics: metrics(20), clips: clips(10), video: video(10), photos: photos(10),
    });
    expect(mix.focus).toBe('mixed');
  });

  it('помечает форматы, по которым данных мало', () => {
    const mix = buildMix({ metrics: metrics(20), clips: clips(2), video: video(30) });
    expect(mix.thin).toContain('клипов');
    expect(mix.rows.find((r) => r.key === 'clips')?.enough).toBe(false);
    expect(mix.rows.find((r) => r.key === 'video')?.enough).toBe(true);
  });

  it('доли считаются от всего выпущенного', () => {
    const mix = buildMix({ metrics: metrics(25), clips: clips(25), video: video(25), photos: photos(25) });
    expect(mix.rows.every((r) => Math.round(r.share) === 25)).toBe(true);
  });
});

describe('оговорка про малую выборку', () => {
  it('молчит, когда формата нет вовсе', () => {
    expect(thinNote(0, 'Клипов')).toBe('');
  });

  it('молчит, когда данных достаточно', () => {
    expect(thinNote(12, 'Клипов')).toBe('');
  });

  it('предупреждает на паре штук', () => {
    expect(thinNote(2, 'Клипов')).toContain('всего 2');
  });
});
