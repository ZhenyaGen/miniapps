/**
 * Сверка TS-движка с питоновской версией.
 *
 * `demo-snapshot.json` — данные в формате VK API, `demo-golden.json` — то, что
 * на них насчитал десктопный `vk_audit`. Числа и формулировки должны совпасть:
 * пользователь видит один и тот же отчёт в exe, в APK и в мини-аппе.
 */
import { describe, expect, it } from 'vitest';

import golden from './__fixtures__/demo-golden.json';
import snapshotJson from './__fixtures__/demo-snapshot.json';
import { buildPlan, buildTargets, findGrowthZones } from './insights';
import { compute } from './metrics';
import type { Snapshot } from './types';

const snapshot = snapshotJson as unknown as Snapshot;
const m = compute(snapshot, 3);
const findings = findGrowthZones(m, snapshot.profile);

/** Питоновский эталон округлён до 6 знаков — сверяем с тем же допуском. */
const near = (actual: number, expected: number) => {
  expect(actual).toBeCloseTo(expected, 5);
};

describe('метрики', () => {
  it('база расчёта ER и объём выборки', () => {
    expect(m.er_basis).toBe(golden.er_basis);
    expect(m.posts_total).toBe(golden.posts_total);
    expect(m.posts_own).toBe(golden.posts_own);
  });

  it('ритм публикаций', () => {
    near(m.per_week, golden.per_week);
    near(m.per_week_period, golden.per_week_period);
    near(m.silent_days, golden.silent_days);
    near(m.gap.median, golden.gap.median);
    near(m.gap.max, golden.gap.max);
    near(m.gap.cv, golden.gap.cv);
    expect(m.gap.max_range).toBe(golden.gap.max_range);
  });

  it('суммы, средние и медианы', () => {
    for (const key of ['views', 'likes', 'comments', 'reposts', 'engagement'] as const) {
      near(m.totals[key], golden.totals[key]);
      near(m.avg[key], golden.avg[key]);
      near(m.median[key], golden.median[key]);
    }
    near(m.avg.len, golden.avg.len);
  });

  it('вовлечённость и охват', () => {
    near(m.er, golden.er);
    near(m.er_median, golden.er_median);
    near(m.er_aud, golden.er_aud);
    near(m.views_per_audience, golden.views_per_audience);
    near(m.comment_ratio, golden.comment_ratio);
    near(m.repost_ratio, golden.repost_ratio);
    near(m.like_rate, golden.like_rate);
    near(m.er_stability, golden.er_stability);
    near(m.views_cv, golden.views_cv);
  });

  it('доли по типам записей', () => {
    near(m.reposts_share, golden.reposts_share);
    near(m.ads_share, golden.ads_share);
    near(m.questions_share, golden.questions_share);
    near(m.cta_share, golden.cta_share);
    near(m.links_share, golden.links_share);
    near(m.repeat_share, golden.repeat_share);
    near(m.tags_per_post, golden.tags_per_post);
    expect(m.polls).toBe(golden.polls);
  });

  it('срез по форматам — тот же порядок и те же цифры', () => {
    expect(m.by_type.map((r) => r.type)).toEqual(golden.by_type.map((r) => r.type));
    m.by_type.forEach((row, i) => {
      const want = golden.by_type[i];
      expect(row.n).toBe(want.n);
      near(row.share, want.share);
      near(row.avg_views, want.avg_views);
      near(row.avg_eng, want.avg_eng);
      near(row.avg_er, want.avg_er);
    });
  });

  it('срез по длине текста', () => {
    expect(m.by_length.map((r) => r.label)).toEqual(golden.by_length.map((r) => r.label));
    m.by_length.forEach((row, i) => {
      expect(row.n).toBe(golden.by_length[i].n);
      near(row.avg_er, golden.by_length[i].avg_er);
    });
  });

  it('лучшие и худшие слоты времени', () => {
    expect(m.best_slots.map((s) => s.label)).toEqual(golden.best_slots.map((s) => s.label));
    expect(m.worst_slots.map((s) => s.label)).toEqual(golden.worst_slots.map((s) => s.label));
    m.best_slots.forEach((slot, i) => near(slot.avg_er, golden.best_slots[i].avg_er));
  });

  it('помесячная динамика', () => {
    expect(m.monthly.map((r) => r.label)).toEqual(golden.monthly.map((r) => r.label));
    m.monthly.forEach((row, i) => {
      expect(row.posts).toBe(golden.monthly[i].posts);
      near(row.avg_er, golden.monthly[i].avg_er);
      near(row.avg_views, golden.monthly[i].avg_views);
    });
  });

  it('хэштеги', () => {
    near(m.hashtags.share_with, golden.hashtags.share_with);
    expect(m.hashtags.unique).toBe(golden.hashtags.unique);
    near(m.hashtags.avg_er_with, golden.hashtags.avg_er_with);
    near(m.hashtags.avg_er_without, golden.hashtags.avg_er_without);
  });

  it('тренд по половинам периода', () => {
    expect(m.trend_reliable).toBe(golden.trend_reliable);
    for (const key of ['views', 'er', 'posts', 'engagement'] as const) {
      const want = golden.trend[key];
      if (want === null) expect(m.trend[key]).toBeNull();
      else near(m.trend[key] as number, want as number);
    }
  });

  it('чек-лист упаковки', () => {
    expect(m.profile_check.map((c) => [c.key, c.ok]))
      .toEqual(golden.profile_check.map((c) => [c.key, c.ok]));
  });

  it('сигналы однообразия и стабильности', () => {
    expect(m.dow_used).toBe(golden.dow_used);
    expect(m.slots_used).toBe(golden.slots_used);
    expect(m.pinned.exists).toBe(golden.pinned_exists);
    expect(m.dominant_format?.label).toBe(golden.dominant_format.label);
    expect(m.best_format?.label).toBe(golden.best_format.label);
    near(m.last30.expected, golden.last30.expected);
    expect(m.last30.posts).toBe(golden.last30.posts);
  });

  it('топ и антитоп постов', () => {
    expect(m.top_posts.map((p) => p.id)).toEqual(golden.top_posts);
    expect(m.flop_posts.map((p) => p.id)).toEqual(golden.flop_posts);
  });
});

describe('зоны роста', () => {
  it('те же правила в том же порядке', () => {
    expect(findings.map((f_) => f_.id)).toEqual(golden.findings.map((f_) => f_.id));
  });

  it('важность, этап и приоритет совпадают', () => {
    findings.forEach((f_, i) => {
      const want = golden.findings[i];
      expect(f_.severity).toBe(want.severity);
      expect(f_.rank).toBe(want.rank);
      expect(f_.stage).toBe(want.stage);
      expect(f_.priority).toBe(want.priority);
    });
  });

  it('формулировки с числами слово в слово', () => {
    findings.forEach((f_, i) => {
      expect(f_.title).toBe(golden.findings[i].title);
      expect(f_.evidence).toBe(golden.findings[i].evidence);
    });
  });
});

describe('план и цели', () => {
  it('план на 4 недели совпадает по задачам', () => {
    const plan = buildPlan(findings, m);
    expect(plan.map((s) => s.metric)).toEqual(golden.plan.map((s) => s.metric));
    plan.forEach((stage, i) => {
      expect(stage.tasks.map((t) => t.text)).toEqual(golden.plan[i].tasks);
    });
  });

  it('цели на 90 дней совпадают', () => {
    expect(buildTargets(m)).toEqual(golden.targets);
  });
});
