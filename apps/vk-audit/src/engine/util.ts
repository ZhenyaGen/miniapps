/** Мелкие функции, повторяющие поведение питоновской версии один в один. */

export function mean(xs: Array<number | null | undefined>): number {
  const v = xs.filter((x): x is number => x !== null && x !== undefined);
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0;
}

/** Медиана как в `statistics.median`: при чётной длине — среднее двух средних. */
export function median(xs: Array<number | null | undefined>): number {
  const v = xs.filter((x): x is number => x !== null && x !== undefined).sort((a, b) => a - b);
  if (!v.length) return 0;
  const mid = Math.floor(v.length / 2);
  return v.length % 2 ? v[mid] : (v[mid - 1] + v[mid]) / 2;
}

/** Стандартное отклонение по всей совокупности — аналог `statistics.pstdev`. */
export function pstdev(xs: number[]): number {
  if (!xs.length) return 0;
  const m = mean(xs);
  return Math.sqrt(xs.reduce((acc, x) => acc + (x - m) ** 2, 0) / xs.length);
}

export function pctDelta(next: number, prev: number): number | null {
  if (!prev) return null;
  return ((next - prev) / prev) * 100;
}

/**
 * Число в человеческом виде: `1 234,5`.
 *
 * Повторяет `_f` из insights.py, включая округление к чётному — иначе
 * формулировки зон роста разойдутся с десктопной версией на половинках.
 */
export function f(x: number, digits = 1): string {
  const scaled = x * 10 ** digits;
  const floor = Math.floor(scaled);
  let rounded: number;
  if (Math.abs(scaled - floor - 0.5) < Number.EPSILON * Math.abs(scaled)) {
    rounded = floor % 2 === 0 ? floor : floor + 1;
  } else {
    rounded = Math.round(scaled);
  }
  const value = rounded / 10 ** digits;
  const [int, frac] = Math.abs(value).toFixed(digits).split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const sign = value < 0 ? '-' : '';
  return sign + (frac ? `${grouped},${frac}` : grouped);
}

/** Целое со знаком: `+42`, `-7`. */
export function withSign(x: number): string {
  return (x >= 0 ? '+' : '') + Math.round(x).toString();
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Части даты в заданном часовом поясе (по умолчанию МСК). */
export function parts(ts: number, tzOffset: number) {
  const d = new Date((ts + tzOffset * 3600) * 1000);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
    /** Понедельник — 0, как в `datetime.weekday()`. */
    dow: (d.getUTCDay() + 6) % 7,
  };
}

export function dateLabel(ts: number, tzOffset: number): string {
  const p = parts(ts, tzOffset);
  return `${pad(p.day)}.${pad(p.month)}.${p.year} ${pad(p.hour)}:${pad(p.minute)}`;
}

export function shortDate(ts: number, tzOffset: number): string {
  const p = parts(ts, tzOffset);
  return `${pad(p.day)}.${pad(p.month)}.${String(p.year).slice(2)}`;
}

export function fullDate(ts: number, tzOffset: number): string {
  const p = parts(ts, tzOffset);
  return `${pad(p.day)}.${pad(p.month)}.${p.year}`;
}

export function monthKey(ts: number, tzOffset: number): string {
  const p = parts(ts, tzOffset);
  return `${p.year}-${pad(p.month)}`;
}

/**
 * Устойчивая сортировка по убыванию с сохранением исходного порядка равных —
 * так же ведёт себя `list.sort(reverse=True)` в Python.
 */
export function sortDesc<T>(items: T[], key: (item: T) => number): T[] {
  return items
    .map((item, i) => ({ item, i }))
    .sort((a, b) => key(b.item) - key(a.item) || a.i - b.i)
    .map(({ item }) => item);
}

/** Счётчик с порядком вставки — аналог `collections.Counter`. */
export class Counter<K> {
  private readonly map = new Map<K, number>();

  add(key: K, n = 1): void {
    this.map.set(key, (this.map.get(key) ?? 0) + n);
  }

  get size(): number {
    return this.map.size;
  }

  values(): number[] {
    return [...this.map.values()];
  }

  /** Как `most_common`: по убыванию счётчика, равные — в порядке появления. */
  mostCommon(n?: number): Array<[K, number]> {
    const rows = [...this.map.entries()];
    const sorted = rows
      .map((row, i) => ({ row, i }))
      .sort((a, b) => b.row[1] - a.row[1] || a.i - b.i)
      .map(({ row }) => row);
    return n === undefined ? sorted : sorted.slice(0, n);
  }
}
