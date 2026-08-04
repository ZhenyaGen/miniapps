/**
 * Выгрузка в таблицу.
 *
 * Одним плоским файлом, а не пятью: в первом столбце тип строки —
 * запись, клип, видео, фотография. Так из выгрузки собирается сводная
 * таблица в Excel одним движением, и так же её проще скормить модели:
 * одна шапка, одинаковые столбцы, ничего не надо склеивать.
 *
 * Пустые ячейки там, где показателя у формата не существует
 * (у фотографии нет длительности, у записи — привязки к записи),
 * заполнять нулями нельзя: ноль — это результат, а не отсутствие.
 */

import type { Report } from '../App';
import type { ClipsReport } from '../video/clips';
import type { VideoReport } from '../video/analyze';
import type { PhotoReport } from '../photos/analyze';
import type { VideoStat } from '../vk/video';
import type { PhotoStat } from '../photos/collect';

export interface CsvInput {
  video?: VideoReport | null;
  clips?: ClipsReport | null;
  photos?: PhotoReport | null;
  /** Полные списки: в отчётах лежат только вершины и хвосты. */
  allVideos?: VideoStat[];
  allPhotos?: PhotoStat[];
}

const HEAD = [
  'тип', 'дата', 'id', 'ссылка', 'текст', 'длительность_сек', 'просмотры',
  'лайки', 'комментарии', 'репосты', 'вовлечённость_%', 'формат', 'в_записи',
];

/**
 * Экранирование по RFC 4180 с одной поправкой: разделитель — точка
 * с запятой. Русский Excel по умолчанию ждёт именно её, а с запятой
 * складывает всю строку в одну ячейку.
 */
function cell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '';
  const text = String(value);
  if (!/[";\n\r]/.test(text)) return text;
  return `"${text.replace(/"/g, '""')}"`;
}

const row = (cells: Array<string | number | null | undefined>): string => cells.map(cell).join(';');

/** ISO-дата без времени: сортируется как строка и читается человеком. */
function day(ts: number): string {
  return new Date(ts * 1000).toISOString().slice(0, 10);
}

/** Одна строка текста: переносы ломают чтение выгрузки глазами. */
function flat(text: string, limit = 300): string {
  return text.replace(/\s+/g, ' ').trim().slice(0, limit);
}

function er(views: number, engagement: number): string {
  return views ? ((engagement / views) * 100).toFixed(2) : '';
}

export function buildCsv(report: Report, input: CsvInput = {}): string {
  const { metrics: m, snapshot } = report;
  const lines: string[] = [row(HEAD)];

  for (const post of m.posts) {
    lines.push(row([
      post.is_repost ? 'репост' : 'запись',
      day(post.ts),
      post.id,
      post.url,
      flat(post.text),
      '',
      post.views,
      post.likes,
      post.comments,
      post.reposts,
      post.er === null ? '' : post.er.toFixed(2),
      post.type,
      '',
    ]));
  }

  for (const video of input.allVideos ?? []) {
    lines.push(row([
      video.isClip ? 'клип' : 'видео',
      day(video.date),
      `${video.ownerId}_${video.id}`,
      `https://vk.com/video${video.ownerId}_${video.id}`,
      flat(video.title),
      video.duration,
      video.views,
      video.likes,
      video.comments,
      video.reposts,
      er(video.views, video.likes + video.comments + video.reposts),
      video.isClip ? 'клип' : 'видео',
      video.onWall ? video.postId : '',
    ]));
  }

  for (const photo of input.allPhotos ?? []) {
    const shape = photo.width && photo.height
      ? (photo.width / photo.height > 1.15 ? 'горизонтальное'
        : photo.width / photo.height < 0.87 ? 'вертикальное' : 'квадратное')
      : '';
    lines.push(row([
      'фото',
      day(photo.date),
      `${photo.ownerId}_${photo.id}`,
      `https://vk.com/photo${photo.ownerId}_${photo.id}`,
      flat(photo.text),
      '',
      '',
      photo.likes,
      photo.comments,
      photo.reposts,
      '',
      shape,
      photo.onWall ? photo.postId : '',
    ]));
  }

  // сноской в конце — чья это страница и за какой срок: файл уедет
  // в переписку и потеряет всякий контекст
  lines.push('');
  lines.push(row([`Страница: ${snapshot.profile.name} (${snapshot.profile.url})`]));
  lines.push(row([`Период: ${m.period.from} — ${m.period.to}, ${m.period.days} дней`]));

  return lines.join('\r\n');
}

/** Имя файла: со страницей и датой, иначе в загрузках будет десять «report». */
export function csvName(report: Report): string {
  const name = report.snapshot.profile.screen_name.replace(/[^\w-]+/g, '') || 'vk';
  return `vk-audit-${name}-${report.metrics.period.to}.csv`;
}

/**
 * Скачать выгрузку файлом.
 *
 * Возвращает `false`, когда браузер не дал: внутри приложения ВКонтакте
 * загрузки бывают запрещены, и тогда остаётся копирование в буфер —
 * вызывающий код это и делает.
 */
export function downloadCsv(text: string, filename: string): boolean {
  try {
    // BOM обязателен: без него Excel читает UTF-8 как ANSI и вместо
    // кириллицы показывает кракозябры
    const blob = new Blob([`﻿${text}`], { type: 'text/csv;charset=utf-8' });
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
