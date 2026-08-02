/** Расчёт метрик по собранным данным: вовлечённость, ритм, форматы, время, тренды. */

import type {
  GroupStats, HeatCell, LengthRow, Metrics, MonthRow, Post, PostType, Profile,
  ProfileCheck, RawPost, RawStatsDay, SlotRow, Snapshot, TypeRow,
} from './types';
import {
  Counter, dateLabel, fullDate, mean, median, monthKey, parts, pctDelta, pstdev,
  shortDate, sortDesc,
} from './util';

const HASHTAG_RE = /#([^\s#@,.!?;:()[\]«»"']{2,40})/g;
const LINK_RE = /https?:\/\/\S+/;

const CTA_WORDS = [
  'подпис', 'ставь', 'лайк', 'коммент', 'напиш', 'поделись', 'репост', 'жми',
  'переходи', 'ссылка в', 'расскажи', 'как вы считаете', 'а вы ', 'делитесь',
  'сохрани', 'регистрир', 'успей', 'оставь заявк', 'пиши в личку', 'задавай',
];

export const TYPE_LABELS: Record<PostType, string> = {
  video: 'Видео',
  photo: 'Фото',
  poll: 'Опрос',
  link: 'Ссылка',
  doc: 'Документ/GIF',
  album: 'Альбом',
  audio: 'Аудио',
  market: 'Товар',
  repost: 'Репост',
  text: 'Только текст',
};

export const DOW_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const MONTH_LABELS = ['янв', 'фев', 'мар', 'апр', 'май', 'июн',
                      'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

const LENGTH_BUCKETS: Array<[number, number, string]> = [
  [0, 300, 'до 300'],
  [300, 800, '300–800'],
  [800, 1500, '800–1500'],
  [1500, 1e9, '1500+'],
];

function postType(post: RawPost): PostType {
  if (post.copy_history?.length) return 'repost';
  const kinds = (post.attachments ?? []).map((a) => a.type);
  for (const k of ['video', 'poll', 'photo', 'market', 'doc', 'album', 'audio'] as const) {
    if (kinds.includes(k)) return k;
  }
  if (kinds.includes('link') || kinds.includes('article') || LINK_RE.test(post.text ?? '')) {
    return 'link';
  }
  return 'text';
}

function hashtagsOf(text: string): string[] {
  return [...text.matchAll(HASHTAG_RE)].map((m) => m[1].toLowerCase());
}

export function normalizePosts(snapshot: Snapshot, tzOffset = 3): Post[] {
  const audience = Math.max(snapshot.profile.audience || 0, 1);
  const ownerId = snapshot.meta.owner_id;
  const reachMap = snapshot.post_reach ?? {};

  const out: Post[] = (snapshot.posts ?? []).map((p) => {
    let text = p.text ?? '';
    if (p.copy_history?.length && !text) text = p.copy_history[0]?.text ?? '';
    const ts = p.date ?? 0;
    const dp = parts(ts, tzOffset);
    const likes = p.likes?.count ?? 0;
    const comments = p.comments?.count ?? 0;
    const reposts = p.reposts?.count ?? 0;
    const views = p.views?.count ?? 0;
    const engagement = likes + comments + reposts;
    const reach = reachMap[String(p.id)] ?? {};
    const low = text.toLowerCase();

    return {
      id: p.id,
      url: `https://vk.com/wall${ownerId}_${p.id}`,
      ts,
      date_label: dateLabel(ts, tzOffset),
      month: monthKey(ts, tzOffset),
      dow: dp.dow,
      hour: dp.hour,
      text,
      excerpt: text.length > 110 ? `${text.slice(0, 110)}…` : (text || '(без текста)'),
      len: text.length,
      type: postType(p),
      is_repost: Boolean(p.copy_history?.length),
      is_pinned: Boolean(p.is_pinned),
      is_ad: Boolean(p.marked_as_ads),
      hashtags: hashtagsOf(text),
      has_link: LINK_RE.test(text),
      has_question: text.includes('?'),
      has_cta: CTA_WORDS.some((w) => low.includes(w)),
      likes,
      comments,
      reposts,
      views,
      engagement,
      er: views ? (engagement / views) * 100 : null,
      er_aud: (engagement / audience) * 100,
      reach_total: reach.reach_total,
      reach_subscribers: reach.reach_subscribers,
      reach_ads: reach.reach_ads,
      joins: reach.join_group,
      unsubscribes: reach.unsubscribe,
      hides: reach.hide,
      link_clicks: reach.links,
    };
  });

  out.sort((a, b) => b.ts - a.ts);
  return out;
}

type ErKey = 'er' | 'er_aud';

function byType(posts: Post[], erKey: ErKey): TypeRow[] {
  const groups = new Map<PostType, Post[]>();
  for (const p of posts) {
    const list = groups.get(p.type);
    if (list) list.push(p);
    else groups.set(p.type, [p]);
  }
  const rows: TypeRow[] = [...groups.entries()].map(([type, items]) => ({
    type,
    label: TYPE_LABELS[type] ?? type,
    n: items.length,
    share: (items.length / posts.length) * 100,
    avg_views: mean(items.map((p) => p.views)),
    avg_eng: mean(items.map((p) => p.engagement)),
    avg_er: mean(items.map((p) => p[erKey])),
  }));
  return sortDesc(rows, (r) => r.avg_er);
}

function heatmap(posts: Post[], erKey: ErKey): HeatCell[][] {
  const cells = new Map<string, Post[]>();
  for (const p of posts) {
    const key = `${p.dow}:${Math.floor(p.hour / 3)}`;
    const list = cells.get(key);
    if (list) list.push(p);
    else cells.set(key, [p]);
  }
  const grid: HeatCell[][] = [];
  for (let dow = 0; dow < 7; dow += 1) {
    const row: HeatCell[] = [];
    for (let slot = 0; slot < 8; slot += 1) {
      const items = cells.get(`${dow}:${slot}`) ?? [];
      row.push({
        n: items.length,
        avg_er: mean(items.map((p) => p[erKey])),
        avg_views: mean(items.map((p) => p.views)),
      });
    }
    grid.push(row);
  }
  return grid;
}

function bestSlots(grid: HeatCell[][], minPosts = 2, top = 3): [SlotRow[], SlotRow[]] {
  const flat: SlotRow[] = [];
  grid.forEach((row, dow) => {
    row.forEach((cell, slot) => {
      if (cell.n >= minPosts && cell.avg_er) {
        const from = String(slot * 3).padStart(2, '0');
        const to = String(slot * 3 + 3).padStart(2, '0');
        flat.push({
          dow,
          slot,
          label: `${DOW_LABELS[dow]} ${from}:00–${to}:00`,
          avg_er: cell.avg_er,
          n: cell.n,
          avg_views: cell.avg_views,
        });
      }
    });
  });
  const sorted = sortDesc(flat, (c) => c.avg_er);
  const worst = sorted.length > top ? sorted.slice(-top).reverse() : [];
  return [sorted.slice(0, top), worst];
}

function monthly(posts: Post[], erKey: ErKey): MonthRow[] {
  const groups = new Map<string, Post[]>();
  for (const p of posts) {
    const list = groups.get(p.month);
    if (list) list.push(p);
    else groups.set(p.month, [p]);
  }
  return [...groups.keys()].sort().map((key) => {
    const items = groups.get(key)!;
    const [y, m] = key.split('-');
    return {
      key,
      label: `${MONTH_LABELS[Number(m) - 1]} ${y.slice(2)}`,
      posts: items.length,
      views: items.reduce((a, p) => a + p.views, 0),
      avg_views: mean(items.map((p) => p.views)),
      engagement: items.reduce((a, p) => a + p.engagement, 0),
      avg_er: mean(items.map((p) => p[erKey])),
    };
  });
}

function gaps(posts: Post[], tzOffset: number): Metrics['gap'] {
  const ts = posts.map((p) => p.ts).sort((a, b) => a - b);
  if (ts.length < 2) return { median: 0, max: 0, cv: 0, max_range: '' };
  const diffs = ts.slice(1).map((t, i) => (t - ts[i]) / 86400);
  const mx = Math.max(...diffs);
  const idx = diffs.indexOf(mx);
  const range = `${shortDate(ts[idx], tzOffset)} → ${shortDate(ts[idx + 1], tzOffset)}`;
  const m = mean(diffs);
  return { median: median(diffs), max: mx, cv: m ? pstdev(diffs) / m : 0, max_range: range };
}

function profileCheck(profile: Profile): ProfileCheck[] {
  const checks: Array<[string, string, string, boolean, string]> = [
    ['avatar', 'Аватар загружен', 'аватар', Boolean(profile.has_photo),
     'Аватар — первое, что видит человек в ленте и поиске.'],
    ['screen_name', 'Короткий адрес (vk.com/имя)', 'короткий адрес',
     !/^(id|club|public)\d+$/.test(profile.screen_name ?? ''),
     'Адрес вида vk.com/id123 запоминается хуже и хуже ищется.'],
    ['about', 'Описание заполнено', 'описание', (profile.about ?? '').length >= 80,
     'Опишите, о чём страница и зачем на неё подписываться (80+ символов).'],
    ['status', 'Статус заполнен', 'статус', Boolean(profile.status),
     'Статус — бесплатная строка под именем: оффер, анонс или ссылка.'],
    ['site', 'Указан сайт/ссылка', 'сайт', Boolean(profile.site),
     'Дайте точку выхода: сайт, лендинг или мессенджер.'],
  ];
  if (profile.kind === 'group') {
    checks.push(
      ['cover', 'Обложка сообщества', 'обложка', Boolean(profile.has_cover),
       'Обложка задаёт первое впечатление и держит оффер на виду.'],
      ['contacts', 'Контакты указаны', 'контакты', Boolean(profile.has_contacts),
       'Живой контакт повышает доверие и конверсию в обращение.'],
      ['links', 'Блок ссылок заполнен', 'блок ссылок', Boolean(profile.has_links),
       'Ссылки в меню — навигация для новой аудитории.'],
    );
  }
  return checks.map(([key, label, short, ok, hint]) => ({ key, label, short, ok: Boolean(ok), hint }));
}

const EMPTY_METRIC_FIELDS = {
  per_week: 0,
  per_week_period: 0,
  silent_days: 0,
  totals: { views: 0, likes: 0, comments: 0, reposts: 0, engagement: 0 },
  avg: { views: 0, likes: 0, comments: 0, reposts: 0, engagement: 0, len: 0 },
  median: { views: 0, likes: 0, comments: 0, reposts: 0, engagement: 0 },
  er: 0,
  er_median: 0,
  er_aud: 0,
  views_per_audience: 0,
  comment_ratio: 0,
  repost_ratio: 0,
  reposts_share: 0,
  ads_share: 0,
  questions_share: 0,
  cta_share: 0,
  by_type: [] as TypeRow[],
  by_length: [] as LengthRow[],
  heatmap: [] as HeatCell[][],
  monthly: [] as MonthRow[],
  top_posts: [] as Post[],
  flop_posts: [] as Post[],
  best_slots: [] as SlotRow[],
  worst_slots: [] as SlotRow[],
  hashtags: { share_with: 0, avg_er_with: 0, avg_er_without: 0, unique: 0, top: [] },
  trend: { views: null, er: null, posts: null, engagement: null },
  trend_reliable: false,
  gap: { median: 0, max: 0, cv: 0, max_range: '' },
  reach: null,
  group_stats: null,
  pinned: { exists: false, age_days: null, url: null },
  polls: 0,
  links_share: 0,
  tags_per_post: 0,
  last30: { posts: 0, expected: 0 },
  dow_used: 0,
  slots_used: 0,
  weekend_share: 0,
  like_rate: 0,
  er_stability: 1,
  views_cv: 0,
  dominant_format: null,
  best_format: null,
  repeat_share: 0,
  posts: [] as Post[],
};

export function compute(snapshot: Snapshot, tzOffset = 3): Metrics {
  const posts = normalizePosts(snapshot, tzOffset);
  const profile = snapshot.profile;
  const audience = profile.audience || 0;
  const meta = snapshot.meta;

  const hasViews = posts.filter((p) => p.views).length >= Math.max(3, posts.length * 0.5);
  const erKey: ErKey = hasViews ? 'er' : 'er_aud';

  const active = posts.filter((p) => !p.is_pinned).length ? posts.filter((p) => !p.is_pinned) : posts;
  const periodDays = Math.max(meta.period_days, 1);

  const base = {
    er_basis: (hasViews ? 'views' : 'audience') as Metrics['er_basis'],
    er_basis_label: hasViews ? 'ER к просмотрам' : 'ER к аудитории',
    audience,
    audience_label: profile.audience_label ?? 'подписчиков',
    period: {
      days: periodDays,
      from: fullDate(meta.since_ts, tzOffset),
      to: fullDate(meta.until_ts, tzOffset),
    },
    posts_total: posts.length,
    posts_own: posts.filter((p) => !p.is_repost).length,
    profile_check: profileCheck(profile),
    warnings: snapshot.warnings ?? [],
  };

  if (!posts.length) {
    return { ...base, ...EMPTY_METRIC_FIELDS, empty: true } as Metrics;
  }

  const coveredDays = Math.max((posts[0].ts - posts[posts.length - 1].ts) / 86400, 1);
  const perWeek = (posts.length / Math.max(Math.min(periodDays, coveredDays), 1)) * 7;

  const totals = {
    views: posts.reduce((a, p) => a + p.views, 0),
    likes: posts.reduce((a, p) => a + p.likes, 0),
    comments: posts.reduce((a, p) => a + p.comments, 0),
    reposts: posts.reduce((a, p) => a + p.reposts, 0),
    engagement: posts.reduce((a, p) => a + p.engagement, 0),
  };
  const avg = {
    views: mean(posts.map((p) => p.views)),
    likes: mean(posts.map((p) => p.likes)),
    comments: mean(posts.map((p) => p.comments)),
    reposts: mean(posts.map((p) => p.reposts)),
    engagement: mean(posts.map((p) => p.engagement)),
    len: mean(posts.map((p) => p.len)),
  };
  const med = {
    views: median(posts.map((p) => p.views)),
    likes: median(posts.map((p) => p.likes)),
    comments: median(posts.map((p) => p.comments)),
    reposts: median(posts.map((p) => p.reposts)),
    engagement: median(posts.map((p) => p.engagement)),
  };

  const erValues = posts.map((p) => p[erKey]);
  const er = mean(erValues);
  const erMedian = median(erValues);
  const engTotal = Math.max(totals.engagement, 1);

  const typeRows = byType(posts, erKey);
  const grid = heatmap(active, erKey);
  const [best, worst] = bestSlots(grid);

  // --- дополнительные сигналы для правил
  const latest = Math.max(...posts.map((p) => p.ts));
  const pinnedPost = posts.find((p) => p.is_pinned);
  const biggest = typeRows.length
    ? typeRows.reduce((a, b) => (b.share > a.share ? b : a))
    : null;
  const views = posts.map((p) => p.views).filter(Boolean);
  const viewMean = mean(views);
  const starts = new Counter<string>();
  for (const p of posts) {
    if (p.len > 20) starts.add(p.text.slice(0, 45).toLowerCase().trim());
  }
  const repeated = starts.values().filter((c) => c > 1).reduce((a, b) => a + b, 0);

  const buckets: LengthRow[] = [];
  for (const [lo, hi, label] of LENGTH_BUCKETS) {
    const items = posts.filter((p) => p.len >= lo && p.len < hi);
    if (items.length) {
      buckets.push({
        label,
        n: items.length,
        avg_er: mean(items.map((p) => p[erKey])),
        avg_views: mean(items.map((p) => p.views)),
      });
    }
  }

  const tagged = posts.filter((p) => p.hashtags.length);
  const untagged = posts.filter((p) => !p.hashtags.length);
  const tagCounter = new Counter<string>();
  for (const p of posts) for (const t of p.hashtags) tagCounter.add(t);
  const tagRows = tagCounter.mostCommon(8).map(([tag, n]) => {
    const items = posts.filter((p) => p.hashtags.includes(tag));
    return { tag, n, avg_er: mean(items.map((p) => p[erKey])) };
  });

  const ranked = sortDesc(posts.filter((p) => p[erKey] !== null), (p) => p[erKey] as number);

  const mid = meta.since_ts + (meta.until_ts - meta.since_ts) / 2;
  const old = posts.filter((p) => p.ts < mid);
  const fresh = posts.filter((p) => p.ts >= mid);
  const trendReliable = old.length >= 3 && fresh.length >= 3;
  const trend: Metrics['trend'] = trendReliable
    ? {
      views: pctDelta(mean(fresh.map((p) => p.views)), mean(old.map((p) => p.views))),
      er: pctDelta(mean(fresh.map((p) => p[erKey])), mean(old.map((p) => p[erKey]))),
      posts: pctDelta(fresh.length, old.length),
      engagement: pctDelta(mean(fresh.map((p) => p.engagement)), mean(old.map((p) => p.engagement))),
    }
    : {
      views: null,
      er: null,
      posts: null,
      engagement: null,
      note: `Сравнение половин периода не показано: в одной из них всего ${Math.min(old.length, fresh.length)} постов.`,
    };

  const withReach = posts.filter((p) => p.reach_total);
  let reach: Metrics['reach'] = null;
  if (withReach.length) {
    const subs = withReach.reduce((a, p) => a + (p.reach_subscribers ?? 0), 0);
    const total = withReach.reduce((a, p) => a + (p.reach_total ?? 0), 0);
    reach = {
      posts: withReach.length,
      avg_total: mean(withReach.map((p) => p.reach_total)),
      avg_subscribers: mean(withReach.map((p) => p.reach_subscribers ?? 0)),
      viral_share: total ? (1 - subs / total) * 100 : 0,
      joins: withReach.reduce((a, p) => a + (p.joins ?? 0), 0),
      unsubscribes: withReach.reduce((a, p) => a + (p.unsubscribes ?? 0), 0),
      hides: withReach.reduce((a, p) => a + (p.hides ?? 0), 0),
      link_clicks: withReach.reduce((a, p) => a + (p.link_clicks ?? 0), 0),
      coverage: audience
        ? (mean(withReach.map((p) => p.reach_subscribers ?? 0)) / audience) * 100
        : 0,
    };
  }

  return {
    ...base,
    per_week: perWeek,
    per_week_period: (posts.length / periodDays) * 7,
    silent_days: (meta.until_ts - posts[0].ts) / 86400,
    gap: gaps(posts, tzOffset),
    totals,
    avg,
    median: med,
    er,
    er_median: erMedian,
    er_aud: mean(posts.map((p) => p.er_aud)),
    views_per_audience: audience ? (avg.views / audience) * 100 : 0,
    comment_ratio: (totals.comments / engTotal) * 100,
    repost_ratio: (totals.reposts / engTotal) * 100,
    reposts_share: (posts.filter((p) => p.is_repost).length / posts.length) * 100,
    ads_share: (posts.filter((p) => p.is_ad).length / posts.length) * 100,
    questions_share: (posts.filter((p) => p.has_question).length / posts.length) * 100,
    cta_share: (posts.filter((p) => p.has_cta).length / posts.length) * 100,
    by_type: typeRows,
    by_length: buckets,
    heatmap: grid,
    best_slots: best,
    worst_slots: worst,
    monthly: monthly(posts, erKey),
    hashtags: {
      share_with: (tagged.length / posts.length) * 100,
      avg_er_with: mean(tagged.map((p) => p[erKey])),
      avg_er_without: mean(untagged.map((p) => p[erKey])),
      unique: tagCounter.size,
      top: tagRows,
    },
    top_posts: ranked.slice(0, 5),
    flop_posts: ranked.length > 6 ? ranked.slice(-5).reverse().filter((p) => p.ts) : [],
    trend,
    trend_reliable: trendReliable,
    pinned: {
      exists: pinnedPost !== undefined,
      age_days: pinnedPost ? (latest - pinnedPost.ts) / 86400 : null,
      url: pinnedPost ? pinnedPost.url : null,
    },
    polls: posts.filter((p) => p.type === 'poll').length,
    links_share: (posts.filter((p) => p.has_link).length / posts.length) * 100,
    tags_per_post: mean(posts.map((p) => p.hashtags.length)),
    last30: {
      posts: posts.filter((p) => p.ts >= latest - 30 * 86400).length,
      expected: (perWeek / 7) * 30,
    },
    dow_used: new Set(active.map((p) => p.dow)).size,
    slots_used: new Set(active.map((p) => `${p.dow}:${Math.floor(p.hour / 3)}`)).size,
    weekend_share: (active.filter((p) => p.dow >= 5).length / Math.max(active.length, 1)) * 100,
    like_rate: totals.views ? (totals.likes / totals.views) * 100 : 0,
    er_stability: er ? erMedian / er : 1,
    views_cv: views.length > 2 && viewMean ? pstdev(views) / viewMean : 0,
    dominant_format: biggest
      ? { label: biggest.label, share: biggest.share, avg_er: biggest.avg_er }
      : null,
    best_format: typeRows.length
      ? { label: typeRows[0].label, avg_er: typeRows[0].avg_er, share: typeRows[0].share }
      : null,
    repeat_share: (repeated / posts.length) * 100,
    reach,
    group_stats: groupStats(snapshot.stats),
    posts,
  };
}

/** Свод по `stats.get`: динамика охвата, подписки-отписки, пол-возраст, города. */
function groupStats(stats?: RawStatsDay[] | null): GroupStats | null {
  if (!stats?.length) return null;
  const days: GroupStats['days'] = [];
  const sexAge = new Counter<string>();
  const cities = new Counter<string>();
  const countries = new Counter<string>();
  let subscribed = 0;
  let unsubscribed = 0;

  for (const row of stats) {
    const visitors = row.visitors ?? {};
    const reach = row.reach ?? {};
    const activity = row.activity ?? {};
    days.push({
      ts: row.period_from,
      views: visitors.views ?? 0,
      visitors: visitors.visitors ?? 0,
      reach: reach.reach ?? 0,
      reach_subscribers: reach.reach_subscribers ?? 0,
      subscribed: activity.subscribed ?? 0,
      unsubscribed: activity.unsubscribed ?? 0,
    });
    subscribed += activity.subscribed ?? 0;
    unsubscribed += activity.unsubscribed ?? 0;

    for (const item of reach.sex_age ?? visitors.sex_age ?? []) {
      const label = String(item.value ?? '?').replace(/^f\b/, 'Ж').replace(/^m\b/, 'М');
      sexAge.add(label, item.count ?? item.reach ?? 0);
    }
    for (const item of visitors.cities ?? []) {
      cities.add(item.name ?? '?', item.count ?? item.visitors ?? 0);
    }
    for (const item of visitors.countries ?? []) {
      countries.add(item.name ?? item.code ?? '?', item.count ?? 0);
    }
  }

  days.sort((a, b) => (a.ts ?? 0) - (b.ts ?? 0));
  return {
    days,
    subscribed,
    unsubscribed,
    net: subscribed - unsubscribed,
    churn: subscribed ? (unsubscribed / subscribed) * 100 : 0,
    avg_reach: mean(days.map((d) => d.reach)),
    avg_visitors: mean(days.map((d) => d.visitors)),
    sex_age: sexAge.mostCommon(10),
    cities: cities.mostCommon(6),
    countries: countries.mostCommon(5),
  };
}
