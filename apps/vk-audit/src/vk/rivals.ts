/** Сбор конкурентов: по каждому — такой же снимок, что и в обычном аудите. */

import { compute } from '../engine/metrics';
import {
  buildCard, compare, comparisonWarnings, topGaps, type RivalCard, type RivalsReport,
} from '../engine/rivals';
import type { Metrics, Profile } from '../engine/types';
import { DEFAULT_TZ_OFFSET } from './defaults';
import type { ApiClient } from './client';
import { collect, parseTarget } from './collect';
import { detectNiche, type Niche } from './niche';

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

/**
 * Сколько сообществ просмотреть в поиске, чтобы отобрать три.
 *
 * Выдача ВК по короткому запросу состоит наполовину из мёртвых пабликов
 * и барахолок, поэтому берём с запасом и отсеиваем сами.
 */
const SEARCH_POOL = 40;

/** Сколько конкурентов подбираем автоматически. */
export const AUTO_RIVALS = 3;

export interface Candidate {
  id: number;
  name: string;
  screenName: string;
  members: number;
  isClosed: boolean;
}

/**
 * Отобрать из выдачи поиска тех, с кем сравнение имеет смысл.
 *
 * Главный критерий — размер. Сравнивать сообщество на две тысячи
 * с миллионником бесполезно: у них разные механики охвата, и все
 * проценты уедут в красное без единого полезного вывода. Берём тех,
 * кто от трети до трёх размеров клиента, и сортируем по близости.
 *
 * Вынесено отдельно от запроса, чтобы правила отбора можно было
 * проверить без сети.
 */
export function pickRivals(
  candidates: Candidate[],
  clientId: number,
  clientMembers: number,
  limit = AUTO_RIVALS,
): Candidate[] {
  const low = clientMembers * 0.3;
  const high = clientMembers * 3;

  return candidates
    .filter((c) => c.id !== clientId)
    // закрытое сообщество не отдаст стену, и карточка выйдет пустой
    .filter((c) => !c.isClosed)
    // совсем мелкие не показательны: у страницы на сто подписчиков
    // любая метрика скачет от одного случайного поста
    .filter((c) => c.members >= 300)
    .filter((c) => (clientMembers ? c.members >= low && c.members <= high : true))
    .sort((a, b) => {
      const da = Math.abs(Math.log((a.members || 1) / (clientMembers || 1)));
      const db = Math.abs(Math.log((b.members || 1) / (clientMembers || 1)));
      return da - db;
    })
    .slice(0, limit);
}

/**
 * Из чего собирается поисковый запрос.
 *
 * Категория сообщества — самый честный сигнал, её выбирал владелец.
 * Если её нет, идут ключевые слова ниши. Название страницы в запрос
 * не берём: по нему находится она сама и её зеркала, а не конкуренты.
 */
export function rivalQueries(niche: Niche): string[] {
  const out: string[] = [];
  if (niche.label) out.push(niche.label);
  out.push(...niche.keywords.slice(0, 3));
  return out
    .map((q) => q.trim())
    .filter((q) => q.length >= 4)
    .filter((q, i, all) => all.indexOf(q) === i)
    .slice(0, 3);
}

export interface SuggestOptions {
  onProgress?: (stage: string) => void;
  limit?: number;
}

export interface Suggestion {
  found: Candidate[];
  /** По каким запросам искали — их видит человек, чтобы понять логику. */
  queries: string[];
  /**
   * Откуда взялись кандидаты. У сообществ и профилей источники разные,
   * и подписи в интерфейсе тоже должны быть разные: «нашёл похожие»
   * и «вот на кого вы подписаны» — это не одно и то же обещание.
   */
  source: 'поиск' | 'подписки' | 'нет';
}

/**
 * Кандидаты для личной страницы — из её подписок на других людей.
 *
 * Прямого способа найти «похожего автора» у ВК нет: `users.search`
 * ищет по имени и анкете, а не по тому, о чём человек пишет. Зато
 * авторы в одной нише почти всегда читают друг друга — подписки
 * оказываются лучшим доступным сигналом.
 *
 * Это именно кандидаты, а не вердикт: среди подписок будут и друзья,
 * и случайные страницы. Поэтому в интерфейсе они и подписаны честно.
 */
async function fromSubscriptions(
  api: ApiClient,
  profile: Profile,
  limit: number,
  onProgress?: (stage: string) => void,
): Promise<Candidate[]> {
  onProgress?.('Смотрим, кого читает эта страница');
  try {
    const resp = await api.call<{ items?: Array<Record<string, any>> }>(
      'users.getSubscriptions',
      { user_id: profile.id, extended: 1, fields: 'followers_count,screen_name', count: 200 },
    );
    const people = (resp?.items ?? [])
      .filter((item) => item.type !== 'page' && item.type !== 'group' && !item.name)
      .map((item) => ({
        id: Number(item.id),
        name: `${item.first_name ?? ''} ${item.last_name ?? ''}`.trim(),
        screenName: String(item.screen_name ?? `id${item.id}`),
        members: Number(item.followers_count ?? 0),
        isClosed: Boolean(item.is_closed) && !item.can_access_closed,
      }));
    return pickRivals(people, profile.id, profile.audience, limit);
  } catch {
    // подписки часто закрыты настройками приватности — это не ошибка
    return [];
  }
}

/**
 * Найти кандидатов в конкуренты.
 *
 * У сообществ и профилей разные пути: сообщества ищутся поиском
 * по нише, личные страницы — через подписки. Обещания в интерфейсе
 * тоже разные, поэтому источник возвращается наружу.
 */
export async function suggestRivals(
  api: ApiClient,
  profile: Profile,
  metrics: Metrics,
  options: SuggestOptions = {},
): Promise<Suggestion> {
  const { onProgress, limit = AUTO_RIVALS } = options;

  if (profile.kind === 'user') {
    const found = await fromSubscriptions(api, profile, limit, onProgress);
    return { found, queries: [], source: found.length ? 'подписки' : 'нет' };
  }

  const niche = detectNiche(profile, metrics);
  const queries = rivalQueries(niche);

  if (!queries.length) return { found: [], queries: [], source: 'нет' };

  const seen = new Map<number, Candidate>();
  for (const query of queries) {
    onProgress?.(`Ищем по запросу «${query}»`);
    try {
      const resp = await api.call<{ items?: Array<Record<string, any>> }>('groups.search', {
        q: query,
        type: 'group,page',
        count: SEARCH_POOL,
        sort: 0,
      });
      for (const item of resp?.items ?? []) {
        const id = Number(item.id);
        if (!id || seen.has(id)) continue;
        seen.set(id, {
          id,
          name: String(item.name ?? ''),
          screenName: String(item.screen_name ?? `club${id}`),
          members: Number(item.members_count ?? 0),
          isClosed: Boolean(item.is_closed),
        });
      }
    } catch {
      // один неудачный запрос не должен ронять подбор целиком
    }
  }

  const found = pickRivals([...seen.values()], Math.abs(profile.id), profile.audience, limit);
  return { found, queries, source: found.length ? 'поиск' : 'нет' };
}
