/**
 * Отбор конкурентов проверяется без сети: `pickRivals` и `rivalQueries` —
 * чистые функции, и правила отбора должны держаться сами по себе,
 * без запроса к ВК.
 */
import { describe, expect, it } from 'vitest';

import { pickRivals, rivalQueries, type Candidate } from './rivals';
import type { Niche } from './niche';

const candidate = (id: number, members: number, extra: Partial<Candidate> = {}): Candidate => ({
  id,
  name: `Сообщество ${id}`,
  screenName: `club${id}`,
  members,
  isClosed: false,
  ...extra,
});

describe('отбор конкурентов', () => {
  const client = 2840;

  it('берёт сопоставимых по размеру и отсекает крайности', () => {
    const found = pickRivals([
      candidate(1, 3200),
      candidate(2, 250_000), // миллионник — другая механика охвата
      candidate(3, 2400),
      candidate(4, 120), // слишком мелкий, метрики скачут от одного поста
    ], 999, client);

    // 3200 ближе к 2840, чем 2400: близость считается по отношению
    // размеров, а не по разнице — вдвое больше и вдвое меньше одинаково далеко
    expect(found.map((c) => c.id)).toEqual([1, 3]);
  });

  it('сортирует по близости размера, а не по величине', () => {
    const found = pickRivals([
      candidate(1, 8000),
      candidate(2, 2900),
      candidate(3, 1200),
    ], 999, client);

    expect(found[0].id).toBe(2);
  });

  it('выбрасывает саму страницу из выдачи', () => {
    const found = pickRivals([candidate(42, 3000), candidate(7, 3000)], 42, client);
    expect(found.map((c) => c.id)).toEqual([7]);
  });

  it('пропускает закрытые: у них не прочитать стену', () => {
    const found = pickRivals([candidate(1, 3000, { isClosed: true }), candidate(2, 3000)], 9, client);
    expect(found.map((c) => c.id)).toEqual([2]);
  });

  it('отдаёт не больше трёх', () => {
    const many = [1, 2, 3, 4, 5, 6].map((i) => candidate(i, 3000 + i));
    expect(pickRivals(many, 999, client)).toHaveLength(3);
  });

  it('без известного размера клиента не фильтрует по размеру', () => {
    const found = pickRivals([candidate(1, 400), candidate(2, 90_000)], 999, 0);
    expect(found).toHaveLength(2);
  });
});

describe('поисковые запросы', () => {
  const niche = (over: Partial<Niche> = {}): Niche => ({
    label: '', source: 'не определена', keywords: [], ...over,
  });

  it('первым идёт категория сообщества', () => {
    const queries = rivalQueries(niche({ label: 'автосервис', keywords: ['подвеска', 'диагностика'] }));
    expect(queries[0]).toBe('автосервис');
  });

  it('короткие слова не берёт: по ним находится что угодно', () => {
    expect(rivalQueries(niche({ keywords: ['еда', 'кот'] }))).toEqual([]);
  });

  it('повторы схлопывает и режет до трёх', () => {
    const queries = rivalQueries(niche({
      label: 'маркетинг',
      keywords: ['маркетинг', 'реклама', 'таргет', 'воронки'],
    }));
    expect(queries).toEqual(['маркетинг', 'реклама', 'таргет']);
  });

  it('без ниши запросов нет — и подбор честно ничего не вернёт', () => {
    expect(rivalQueries(niche())).toEqual([]);
  });
});
