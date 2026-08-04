/**
 * Скачивание текстового файла из браузера.
 *
 * Общее место для брифа и таблицы: файл собирается в памяти и отдаётся
 * ссылкой, сервер не участвует. Внутри приложения ВКонтакте загрузки
 * бывают запрещены — тогда функция честно возвращает `false`,
 * а вызывающий код предлагает буфер обмена.
 */

export function downloadText(
  text: string,
  filename: string,
  mime: string,
  /** BOM нужен таблицам: без него Excel читает UTF-8 как ANSI. */
  bom = false,
): boolean {
  try {
    const blob = new Blob([bom ? `﻿${text}` : text], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
    // отзываем не сразу: часть браузеров читает ссылку уже после клика
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
    return true;
  } catch {
    return false;
  }
}

/** Основа имени файла: страница и последний день периода. */
export function fileBase(screenName: string, lastDay: string): string {
  const name = screenName.replace(/[^\w-]+/g, '') || 'vk';
  return `vk-audit-${name}-${lastDay}`;
}
