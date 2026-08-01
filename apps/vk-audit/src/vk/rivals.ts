/** Сбор конкурентов: по каждому — такой же снимок, что и в обычном аудите. */

import { compute } from '../engine/metrics';
import {
  buildCard, compare, comparisonWarnings, topGaps, type RivalCard, type RivalsReport,
} from '../engine/rivals';
import { DEFAULT_TZ_OFFSET } from './defaults';
import type { ApiClient } from './client';
import { collect, parseTarget } from './collect';

/**
 * Период сравнения короче, чем у аудита: свежие 90 дней честнее показывают,
 * кто где находится сейчас, и вдвое экономят запросы.
 */
export const RIVALS_PERIOD_DAYS = 90;
export const RIVALS_MAX_POSTS = 100;

/** Больше пяти конкурентов упираются в лимит 3 запроса в секунду. */
export const MAX_RIVALS = 5;

/** Список из текстового поля: по одной ссылке в строке, пустые пропускаем. */
export function parseRivalList(raw: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const line of raw.split(/[\n,;]+/)) {
    const name = parseTarget(line);
    if (!name || seen.has(name.toLowerCase())) continue;
    seen.add(name.toLowerCase());
    out.push(name);
  }
  return out.slice(0, MAX_RIVALS);
}

export interface CollectRivalsOptions {
  onProgress?: (stage: string) => void;
}

/**
 * Клиент пересобирается за тот же период, что и конкуренты: сравнивать
 * полугодовые медианы с трёхмесячными нельзя.
 */
export async function collectRivals(
  api: ApiClient,
  clientTarget: string,
  rivalTargets: string[],
  options: CollectRivalsOptions = {},
): Promise<RivalsReport> {
  const { onProgress } = options;
  const errors: Array<{ target: string; reason: string }> = [];

  const one = async (target: string): Promise<RivalCard> => {
    const snapshot = await collect(api, target, {
      periodDays: RIVALS_PERIOD_DAYS,
      maxPosts: RIVALS_MAX_POSTS,
    });
    return buildCard(snapshot, compute(snapshot, DEFAULT_TZ_OFFSET));
  };

  onProgress?.('Пересобираем вашу страницу за 90 дней');
  const client = await one(clientTarget);

  const rivals: RivalCard[] = [];
  for (const [i, target] of rivalTargets.entries()) {
    onProgress?.(`Конкурент ${i + 1} из ${rivalTargets.length}: ${target}`);
    try {
      // закрытая или удалённая страница не должна ронять весь прогон
      rivals.push(await one(target));
    } catch (err) {
      errors.push({ target, reason: err instanceof Error ? err.message : String(err) });
    }
  }

  const warnings = comparisonWarnings(client, rivals);
  if (errors.length) {
    warnings.unshift(
      `Не удалось собрать: ${errors.map((e) => `${e.target} — ${e.reason}`).join('; ')}`,
    );
  }

  const rows = rivals.length ? compare(client, rivals) : [];
  return {
    client,
    rivals,
    rows,
    gaps: topGaps(rows),
    errors,
    warnings,
    period_days: RIVALS_PERIOD_DAYS,
  };
}

/** Демо-сравнение: карточки из той же фикстуры, что и в тестах движка. */
export async function buildDemoRivals(): Promise<RivalsReport> {
  const fixture = (await import('../engine/__fixtures__/demo-rivals.json')).default;
  const client = fixture.client_card as unknown as RivalCard;
  const rivals = fixture.rival_cards as unknown as RivalCard[];
  const rows = compare(client, rivals);
  return {
    client,
    rivals,
    rows,
    gaps: topGaps(rows),
    errors: [],
    warnings: [
      'Демонстрационное сравнение: конкурентов не существует, но таблица '
      + 'считается тем же кодом, что и настоящая.',
      ...comparisonWarnings(client, rivals),
    ],
    period_days: RIVALS_PERIOD_DAYS,
  };
}
