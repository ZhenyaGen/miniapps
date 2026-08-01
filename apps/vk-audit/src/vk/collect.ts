/** Сбор данных страницы: профиль/сообщество, посты, статистика. */

import { DEFAULT_MAX_POSTS, DEFAULT_PERIOD_DAYS } from './defaults';
import type { PostReach, Profile, RawPost, RawStatsDay, Snapshot, TargetKind } from '../engine/types';
import type { ApiClient } from './client';

const USER_FIELDS = [
  'photo_200', 'screen_name', 'counters', 'followers_count', 'city', 'country',
  'status', 'about', 'site', 'verified', 'is_closed', 'can_access_closed', 'occupation',
].join(',');

const GROUP_FIELDS = [
  'photo_200', 'description', 'status', 'site', 'contacts', 'links', 'cover',
  'verified', 'activity', 'members_count', 'counters', 'city', 'country',
  'can_message', 'is_closed', 'start_date',
].join(',');

/** `https://vk.com/durov`, `@durov`, `durov`, `id1`, `-123` → короткое имя или ID. */
export function parseTarget(raw: string): string {
  return (raw ?? '')
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/^(m\.|www\.)?vk\.(com|ru)\//i, '')
    .split('?')[0]
    .split('#')[0]
    .replace(/^[/@\s]+|[/@\s]+$/g, '');
}

export async function resolveTarget(
  api: ApiClient, raw: string,
): Promise<{ kind: TargetKind; ownerId: number; screenName: string }> {
  const name = parseTarget(raw);
  if (!name) throw new Error('Пустой адрес страницы');

  if (/^-\d+$/.test(name)) {
    return { kind: 'group', ownerId: Number(name), screenName: name.replace('-', '') };
  }
  if (/^\d+$/.test(name)) {
    return { kind: 'user', ownerId: Number(name), screenName: name };
  }

  const resp = await api.call<{ type: string; object_id: number } | null>(
    'utils.resolveScreenName', { screen_name: name },
  );
  if (!resp || !resp.type) {
    throw new Error(`ВК не знает страницу «${name}». Проверьте адрес.`);
  }
  if (resp.type === 'user') {
    return { kind: 'user', ownerId: Number(resp.object_id), screenName: name };
  }
  if (['group', 'page', 'event'].includes(resp.type)) {
    return { kind: 'group', ownerId: -Number(resp.object_id), screenName: name };
  }
  throw new Error(`«${name}» — это ${resp.type}, аудит такого объекта не поддерживается`);
}

export interface AdminGroup {
  id: number;
  name: string;
  screen_name: string;
  members: number;
  photo?: string;
}

/** Сообщества, где вошедший — админ, редактор или модератор. */
export async function listAdminGroups(api: ApiClient): Promise<AdminGroup[]> {
  const resp = await api.call<{ items?: Array<Record<string, unknown>> }>('groups.get', {
    filter: 'admin,editor,moder',
    extended: 1,
    fields: 'members_count,screen_name,photo_100',
    count: 200,
  });
  const groups = (resp?.items ?? []).map((g) => ({
    id: -Number(g.id),
    name: String(g.name ?? ''),
    screen_name: String(g.screen_name ?? `club${g.id}`),
    members: Number(g.members_count ?? 0),
    photo: g.photo_100 as string | undefined,
  }));
  groups.sort((a, b) => b.members - a.members);
  return groups;
}

function profileFromUser(u: Record<string, any>): Profile {
  const counters = (u.counters ?? {}) as Record<string, number>;
  const screenName = String(u.screen_name ?? `id${u.id}`);
  return {
    kind: 'user',
    id: Number(u.id),
    name: `${u.first_name ?? ''} ${u.last_name ?? ''}`.trim(),
    screen_name: screenName,
    url: `https://vk.com/${screenName}`,
    photo: u.photo_200 ?? null,
    audience: Number(u.followers_count ?? counters.followers ?? 0),
    audience_label: 'подписчиков',
    verified: Boolean(u.verified),
    is_closed: Boolean(u.is_closed) && !u.can_access_closed,
    about: String(u.about ?? '').trim(),
    status: String(u.status ?? '').trim(),
    site: String(u.site ?? '').trim(),
    city: u.city?.title ?? null,
    occupation: u.occupation?.name ?? null,
    has_photo: Boolean(u.photo_200),
    counters,
  };
}

function profileFromGroup(g: Record<string, any>): Profile {
  const counters = (g.counters ?? {}) as Record<string, number>;
  const screenName = String(g.screen_name ?? `club${g.id}`);
  return {
    kind: 'group',
    id: -Number(g.id),
    name: String(g.name ?? ''),
    screen_name: screenName,
    url: `https://vk.com/${screenName}`,
    photo: g.photo_200 ?? null,
    audience: Number(g.members_count ?? 0),
    audience_label: 'подписчиков',
    verified: Boolean(g.verified),
    is_closed: Boolean(g.is_closed),
    about: String(g.description ?? '').trim(),
    status: String(g.status ?? '').trim(),
    site: String(g.site ?? '').trim(),
    city: g.city?.title ?? null,
    occupation: String(g.activity ?? ''),
    has_photo: Boolean(g.photo_200),
    has_cover: Boolean(g.cover?.enabled),
    has_contacts: Boolean(g.contacts?.length),
    has_links: Boolean(g.links?.length),
    counters,
  };
}

/** Стена владельца до `sinceTs`; закреплённый пост не обрывает выборку. */
async function fetchPosts(
  api: ApiClient, ownerId: number, sinceTs: number, maxPosts: number,
  onProgress?: (loaded: number) => void,
): Promise<RawPost[]> {
  const posts: RawPost[] = [];
  let offset = 0;
  while (posts.length < maxPosts) {
    const resp = await api.call<{ items?: RawPost[]; count?: number }>('wall.get', {
      owner_id: ownerId, count: 100, offset, filter: 'owner',
    });
    const items = resp?.items ?? [];
    if (!items.length) break;

    let stop = false;
    for (const post of items) {
      if ((post.date ?? 0) < sinceTs) {
        if (post.is_pinned) continue;
        stop = true;
        break;
      }
      posts.push(post);
    }
    offset += items.length;
    onProgress?.(posts.length);
    if (stop || offset >= (resp?.count ?? 0)) break;
  }
  return posts.slice(0, maxPosts);
}

/** Статистика сообщества доступна очень по-разному — любую ошибку глотаем. */
async function fetchGroupStats(
  api: ApiClient, groupId: number, sinceTs: number, untilTs: number,
): Promise<[RawStatsDay[] | null, string | null]> {
  try {
    const resp = await api.call<RawStatsDay[]>('stats.get', {
      group_id: Math.abs(groupId),
      timestamp_from: sinceTs,
      timestamp_to: untilTs,
      interval: 'day',
      extended: 1,
    });
    return [resp ?? null, null];
  } catch (err) {
    return [null, err instanceof Error ? err.message : String(err)];
  }
}

/** `stats.getPostReach` — только для админов сообщества, пачками по 30. */
async function fetchPostReach(
  api: ApiClient, ownerId: number, postIds: number[],
): Promise<[Record<string, PostReach>, string | null]> {
  const reach: Record<string, PostReach> = {};
  let problem: string | null = null;
  for (let i = 0; i < postIds.length; i += 30) {
    const chunk = postIds.slice(i, i + 30);
    try {
      const resp = await api.call<Array<PostReach & { post_id: number }>>('stats.getPostReach', {
        owner_id: ownerId, post_ids: chunk.join(','),
      });
      for (const row of resp ?? []) reach[String(row.post_id)] = row;
    } catch (err) {
      problem = err instanceof Error ? err.message : String(err);
      break;
    }
  }
  return [reach, problem];
}

export interface CollectOptions {
  periodDays?: number;
  maxPosts?: number;
  onProgress?: (stage: string) => void;
}

export async function collect(
  api: ApiClient, target: string, options: CollectOptions = {},
): Promise<Snapshot> {
  const {
    periodDays = DEFAULT_PERIOD_DAYS,
    maxPosts = DEFAULT_MAX_POSTS,
    onProgress,
  } = options;
  const warnings: string[] = [];

  onProgress?.('Ищем страницу');
  const { kind, ownerId } = await resolveTarget(api, target);
  const untilTs = Math.floor(Date.now() / 1000);
  const sinceTs = untilTs - periodDays * 86400;

  onProgress?.(kind === 'group' ? 'Читаем сообщество' : 'Читаем профиль');
  let profile: Profile;
  if (kind === 'user') {
    const users = await api.call<Array<Record<string, any>>>('users.get', {
      user_ids: ownerId, fields: USER_FIELDS,
    });
    if (!users?.length) throw new Error('Профиль не найден');
    profile = profileFromUser(users[0]);
    if (!profile.audience) {
      try {
        const followers = await api.call<{ count?: number }>('users.getFollowers', {
          user_id: ownerId, count: 1,
        });
        profile.audience = followers?.count ?? 0;
      } catch (err) {
        warnings.push(`Не удалось получить число подписчиков: ${(err as Error).message}`);
      }
    }
  } else {
    const resp = await api.call<any>('groups.getById', {
      group_id: Math.abs(ownerId), fields: GROUP_FIELDS,
    });
    const items = Array.isArray(resp) ? resp : resp?.groups ?? [];
    if (!items.length) throw new Error('Сообщество не найдено');
    profile = profileFromGroup(items[0]);
  }

  if (profile.is_closed) {
    warnings.push('Страница закрыта — часть данных недоступна без подписки или прав.');
  }

  let posts: RawPost[] = [];
  try {
    posts = await fetchPosts(api, ownerId, sinceTs, maxPosts, (loaded) => {
      onProgress?.(`Собрано постов: ${loaded}`);
    });
  } catch (err) {
    warnings.push(
      `Записи со стены получить не удалось: ${(err as Error).message} `
      + 'Без них отчёт почти пустой — проверьте, что стена открыта.',
    );
  }

  let stats: RawStatsDay[] | null = null;
  let postReach: Record<string, PostReach> = {};
  if (kind === 'group') {
    onProgress?.('Запрашиваем статистику сообщества');
    const [statsResp, statsProblem] = await fetchGroupStats(api, ownerId, sinceTs, untilTs);
    stats = statsResp;
    if (statsProblem) {
      warnings.push(
        'Статистика сообщества (охваты, демография) недоступна — она отдаётся '
        + 'только администратору. Аудит построен по данным постов.',
      );
    }
    if (posts.length) {
      const [reach, reachProblem] = await fetchPostReach(
        api, ownerId, posts.filter((p) => !p.is_pinned).map((p) => p.id).slice(0, 120),
      );
      postReach = reach;
      if (reachProblem && !Object.keys(reach).length) {
        warnings.push('Охваты отдельных постов недоступны (нужны права администратора).');
      }
    }
  } else {
    warnings.push(
      'Для личных страниц ВК не отдаёт «Статистику страницы» через API — '
      + 'охваты считаются по просмотрам постов.',
    );
  }

  return {
    meta: {
      generated_at: new Date().toISOString(),
      target,
      kind,
      owner_id: ownerId,
      period_days: periodDays,
      since_ts: sinceTs,
      until_ts: untilTs,
      api_calls: api.calls,
      source: 'vk-api',
    },
    profile,
    posts,
    stats,
    post_reach: postReach,
    warnings,
  };
}

