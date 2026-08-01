/**
 * Сверка сравнения с конкурентами с питоновской версией.
 *
 * Карточка клиента строится здесь заново из общего демо-снимка, карточки
 * конкурентов берутся из эталона — так проверяются и `buildCard`, и таблица
 * сравнения целиком.
 */
import { describe, expect, it } from 'vitest';

import goldenRivals from './__fixtures__/demo-rivals.json';
import snapshotJson from './__fixtures__/demo-snapshot.json';
import { compare, buildCard, topGaps, type RivalCard } from './rivals';
import { compute } from './metrics';
import type { Snapshot } from './types';

const snapshot = snapshotJson as unknown as Snapshot;
const clientCard = buildCard(snapshot, compute(snapshot, 3));
const rivalCards = goldenRivals.rival_cards as unknown as RivalCard[];
const rows = compare(clientCard, rivalCards);

describe('карточка страницы', () => {
  it('совпадает с питоновской по всем полям сравнения', () => {
    const want = goldenRivals.client_card as unknown as RivalCard;
    for (const key of [
      'audience', 'posts_total', 'posts_with_views', 'per_week', 'views_median',
      'er_median', 'coverage', 'comments', 'reposts', 'media_share', 'text_len',
      'silent_days', 'best_format', 'best_slot',
    ] as const) {
      expect({ [key]: clientCard[key] }).toEqual({ [key]: want[key] });
    }
  });

  it('топ-посты те же, с обрезанными текстами', () => {
    const want = (goldenRivals.client_card as unknown as RivalCard).top_posts;
    expect(clientCard.top_posts.map((p) => p.url)).toEqual(want.map((p) => p.url));
    expect(clientCard.top_posts.map((p) => p.text)).toEqual(want.map((p) => p.text));
    expect(clientCard.top_posts.map((p) => p.er)).toEqual(want.map((p) => p.er));
  });
});

describe('таблица сравнения', () => {
  it('те же строки в том же порядке', () => {
    expect(rows.map((r) => r.key)).toEqual(goldenRivals.rows.map((r) => r.key));
    expect(rows.map((r) => r.label)).toEqual(goldenRivals.rows.map((r) => r.label));
  });

  it('медианы, лидеры и вердикты совпадают', () => {
    rows.forEach((row, i) => {
      const want = goldenRivals.rows[i];
      expect({ key: row.key, mine: row.mine }).toEqual({ key: want.key, mine: want.mine });
      expect({ key: row.key, median: row.median }).toEqual({ key: want.key, median: want.median });
      expect({ key: row.key, best: row.best }).toEqual({ key: want.key, best: want.best });
      expect({ key: row.key, leader: row.leader }).toEqual({ key: want.key, leader: want.leader });
      expect({ key: row.key, verdict: row.verdict }).toEqual({ key: want.key, verdict: want.verdict });
      expect({ key: row.key, gap: row.gap_pct }).toEqual({ key: want.key, gap: want.gap_pct });
    });
  });

  it('главные отставания выбраны так же', () => {
    expect(topGaps(rows).map((r) => r.key)).toEqual(goldenRivals.gaps);
  });
});
