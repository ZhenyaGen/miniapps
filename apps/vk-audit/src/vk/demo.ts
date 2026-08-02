/** Демо-режим: тот же снимок, что в тестах движка, сдвинутый к сегодняшнему дню. */

import demoSnapshot from '../engine/__fixtures__/demo-snapshot.json';
import type { Snapshot } from '../engine/types';

/**
 * Данные заморожены на момент генерации, поэтому все отметки времени
 * сдвигаются вперёд: иначе демо-страница выглядит заброшенной на полгода.
 */
export function buildDemoSnapshot(): Snapshot {
  const base = structuredClone(demoSnapshot) as unknown as Snapshot;
  const now = Math.floor(Date.now() / 1000);
  const shift = now - base.meta.until_ts;

  base.meta.until_ts += shift;
  base.meta.since_ts += shift;
  base.meta.generated_at = new Date().toISOString();
  base.meta.source = 'demo';
  base.posts = base.posts.map((p) => ({ ...p, date: p.date + shift }));
  base.warnings = [
    'Это демонстрационные данные: страницы «Демо-сообщество» не существует. '
    + 'Расчёт настоящий — правила и цифры считаются тем же движком.',
    ...base.warnings,
  ];
  return base;
}
