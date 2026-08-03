/**
 * Ниша страницы: о чём она вообще.
 *
 * Нужна в двух местах, и потому лежит здесь, а не у кого-то одного:
 * приложение по ней ищет конкурентов, бот — настраивает системный промпт
 * модели. Совет «добавьте больше сторителлинга» одинаково бесполезен
 * автосервису и психологу, но по-разному.
 *
 * Ниша определяется по тому, что ВК отдаёт публично: категория сообщества,
 * описание, хештеги и слова из собственных постов. Никакого угадывания
 * по названию — если сигналов не хватает, честно возвращается пустая ниша,
 * и тот, кто её спросил, сам решает, что делать без неё.
 *
 * Это не часть движка: правила и метрики считаются одинаково с питоновской
 * версией, а ниша — вспомогательная штука для сбора, её там нет.
 */

import type { Metrics, Profile } from '../engine/types';

export interface Niche {
  /** Короткая формулировка для промпта: «автосервис», «детский центр». */
  label: string;
  /** Откуда она взялась — это уходит в письмо, чтобы не выглядело магией. */
  source: 'категория' | 'описание' | 'посты' | 'не определена';
  /** Слова, которыми страница описывает себя: контекст для модели. */
  keywords: string[];
}

const STOP_WORDS = new Set([
  'этот', 'этого', 'этом', 'наши', 'наша', 'нашего', 'вашего', 'вами', 'который',
  'которые', 'когда', 'чтобы', 'также', 'более', 'очень', 'самый', 'просто',
  'всего', 'может', 'можно', 'нужно', 'будет', 'было', 'если', 'даже', 'уже',
  'ещё', 'еще', 'после', 'перед', 'между', 'через', 'здесь', 'сейчас', 'потом',
  'сегодня', 'завтра', 'вчера', 'больше', 'меньше', 'лучше', 'хуже', 'новый',
  'новая', 'новые', 'подписывайтесь', 'подписаться', 'ссылка', 'ссылке',
  'записи', 'запись', 'пост', 'посты', 'группе', 'группы', 'сообщества',
  'страницы', 'подробнее', 'читайте', 'смотрите', 'друзья', 'привет',
]);

/** Слова длиннее пяти букв, без служебных и без повторов. */
function keywordsFrom(text: string, limit: number): string[] {
  const counts = new Map<string, number>();
  for (const raw of text.toLowerCase().match(/[а-яёa-z]{5,}/gi) ?? []) {
    if (STOP_WORDS.has(raw)) continue;
    counts.set(raw, (counts.get(raw) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([word]) => word);
}

/**
 * Категория сообщества — самый надёжный сигнал: её выбирал сам владелец.
 *
 * У личных страниц её нет, там в `occupation` лежит место работы, что
 * нишей не является: человек может работать в банке и вести страницу
 * о рыбалке.
 */
function fromCategory(profile: Profile): string {
  if (profile.kind !== 'group') return '';
  const value = (profile.occupation ?? '').trim();
  return value.length >= 3 ? value.toLowerCase() : '';
}

export function detectNiche(profile: Profile, metrics: Metrics): Niche {
  const category = fromCategory(profile);

  // хештеги владелец ставит осознанно — они точнее случайных слов из текста
  const tags = metrics.hashtags.top.slice(0, 5).map((h) => h.tag.replace(/^#/, ''));

  const описание = `${profile.about ?? ''} ${profile.status ?? ''}`.trim();
  const собственные = metrics.posts
    .filter((p) => !p.is_repost && !p.is_ad)
    .map((p) => p.text)
    .join(' ');

  const keywords = [
    ...tags,
    ...keywordsFrom(описание, 6),
    ...keywordsFrom(собственные, 8),
  ].filter((word, i, all) => all.indexOf(word) === i).slice(0, 12);

  if (category) return { label: category, source: 'категория', keywords };
  if (описание.length >= 60) {
    return { label: keywordsFrom(описание, 3).join(', '), source: 'описание', keywords };
  }
  if (keywords.length >= 4) {
    return { label: keywords.slice(0, 3).join(', '), source: 'посты', keywords };
  }
  return { label: '', source: 'не определена', keywords };
}
