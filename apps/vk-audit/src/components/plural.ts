/**
 * Склонение существительного при числе.
 *
 * Живёт рядом с интерфейсом, а не в `engine/util.ts`: тот повторяет
 * питоновскую версию один в один, и лишним функциям там не место.
 *
 * `plural(181, 'день', 'дня', 'дней')` → «дней», `plural(1, …)` → «день».
 */
export function plural(n: number, one: string, few: string, many: string): string {
  const abs = Math.abs(Math.round(n));
  const tail = abs % 100;
  if (tail >= 11 && tail <= 14) return many;
  const last = abs % 10;
  if (last === 1) return one;
  if (last >= 2 && last <= 4) return few;
  return many;
}
