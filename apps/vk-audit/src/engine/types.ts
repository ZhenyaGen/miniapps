/** Формы данных, которыми обмениваются сбор, метрики и правила. */

/** Запись стены в том виде, в каком её отдаёт `wall.get`. */
export interface RawPost {
  id: number;
  date: number;
  text?: string;
  attachments?: Array<{ type: string }>;
  copy_history?: Array<{ text?: string }>;
  is_pinned?: number | boolean;
  marked_as_ads?: number | boolean;
  likes?: { count: number };
  comments?: { count: number };
  reposts?: { count: number };
  views?: { count: number };
}

export type TargetKind = 'user' | 'group';

/** Профиль страницы, приведённый к общему виду для сообществ и людей. */
export interface Profile {
  kind: TargetKind;
  id: number;
  name: string;
  screen_name: string;
  url: string;
  photo?: string | null;
  audience: number;
  audience_label: string;
  verified: boolean;
  is_closed: boolean;
  about: string;
  status: string;
  site: string;
  city?: string | null;
  occupation?: string | null;
  has_photo: boolean;
  has_cover?: boolean;
  has_contacts?: boolean;
  has_links?: boolean;
  counters?: Record<string, number>;
}

export interface PostReach {
  reach_total?: number;
  reach_subscribers?: number;
  reach_ads?: number;
  join_group?: number;
  unsubscribe?: number;
  hide?: number;
  links?: number;
}

/** День статистики сообщества из `stats.get`. */
export interface RawStatsDay {
  period_from?: number;
  visitors?: {
    views?: number;
    visitors?: number;
    sex_age?: Array<{ value?: string; count?: number; reach?: number }>;
    cities?: Array<{ name?: string; count?: number; visitors?: number }>;
    countries?: Array<{ name?: string; code?: string; count?: number }>;
  };
  reach?: {
    reach?: number;
    reach_subscribers?: number;
    sex_age?: Array<{ value?: string; count?: number; reach?: number }>;
  };
  activity?: { subscribed?: number; unsubscribed?: number };
}

/** Всё, что собрано по странице за один заход к API. */
export interface Snapshot {
  meta: {
    generated_at: string;
    target: string;
    kind: TargetKind;
    owner_id: number;
    period_days: number;
    since_ts: number;
    until_ts: number;
    api_calls?: number;
    token_kind?: string;
    source: string;
  };
  profile: Profile;
  posts: RawPost[];
  stats?: RawStatsDay[] | null;
  post_reach?: Record<string, PostReach>;
  warnings: string[];
}

export type PostType =
  | 'video' | 'photo' | 'poll' | 'link' | 'doc'
  | 'album' | 'audio' | 'market' | 'repost' | 'text';

/** Пост со всеми признаками, по которым считаются метрики и правила. */
export interface Post {
  id: number;
  url: string;
  ts: number;
  date_label: string;
  month: string;
  dow: number;
  hour: number;
  text: string;
  excerpt: string;
  len: number;
  type: PostType;
  is_repost: boolean;
  is_pinned: boolean;
  is_ad: boolean;
  hashtags: string[];
  has_link: boolean;
  has_question: boolean;
  has_cta: boolean;
  likes: number;
  comments: number;
  reposts: number;
  views: number;
  engagement: number;
  /** ER к просмотрам; `null`, если у поста нет просмотров. */
  er: number | null;
  /** ER к числу подписчиков — запасная база, когда просмотров нет. */
  er_aud: number;
  reach_total?: number;
  reach_subscribers?: number;
  reach_ads?: number;
  joins?: number;
  unsubscribes?: number;
  hides?: number;
  link_clicks?: number;
}

export interface ProfileCheck {
  key: string;
  label: string;
  short: string;
  ok: boolean;
  hint: string;
}

export interface TypeRow {
  type: PostType;
  label: string;
  n: number;
  share: number;
  avg_views: number;
  avg_eng: number;
  avg_er: number;
}

export interface LengthRow {
  label: string;
  n: number;
  avg_er: number;
  avg_views: number;
}

export interface HeatCell {
  n: number;
  avg_er: number;
  avg_views: number;
}

export interface SlotRow {
  dow: number;
  slot: number;
  label: string;
  avg_er: number;
  n: number;
  avg_views: number;
}

export interface MonthRow {
  key: string;
  label: string;
  posts: number;
  views: number;
  avg_views: number;
  engagement: number;
  avg_er: number;
}

export interface GroupStats {
  days: Array<{
    ts?: number;
    views: number;
    visitors: number;
    reach: number;
    reach_subscribers: number;
    subscribed: number;
    unsubscribed: number;
  }>;
  subscribed: number;
  unsubscribed: number;
  net: number;
  churn: number;
  avg_reach: number;
  avg_visitors: number;
  sex_age: Array<[string, number]>;
  cities: Array<[string, number]>;
  countries: Array<[string, number]>;
}

export interface Reach {
  posts: number;
  avg_total: number;
  avg_subscribers: number;
  viral_share: number;
  joins: number;
  unsubscribes: number;
  hides: number;
  link_clicks: number;
  coverage: number;
}

/** Результат расчёта: всё, на что опираются правила и отчёт. */
export interface Metrics {
  er_basis: 'views' | 'audience';
  er_basis_label: string;
  audience: number;
  audience_label: string;
  period: { days: number; from: string; to: string };
  posts_total: number;
  posts_own: number;
  profile_check: ProfileCheck[];
  warnings: string[];
  empty?: boolean;

  per_week: number;
  per_week_period: number;
  silent_days: number;
  gap: { median: number; max: number; cv: number; max_range: string };

  totals: Record<'views' | 'likes' | 'comments' | 'reposts' | 'engagement', number>;
  avg: Record<'views' | 'likes' | 'comments' | 'reposts' | 'engagement' | 'len', number>;
  median: Record<'views' | 'likes' | 'comments' | 'reposts' | 'engagement', number>;
  er: number;
  er_median: number;
  er_aud: number;
  views_per_audience: number;
  comment_ratio: number;
  repost_ratio: number;
  reposts_share: number;
  ads_share: number;
  questions_share: number;
  cta_share: number;

  by_type: TypeRow[];
  by_length: LengthRow[];
  heatmap: HeatCell[][];
  best_slots: SlotRow[];
  worst_slots: SlotRow[];
  monthly: MonthRow[];
  hashtags: {
    share_with: number;
    avg_er_with: number;
    avg_er_without: number;
    unique: number;
    top: Array<{ tag: string; n: number; avg_er: number }>;
  };
  top_posts: Post[];
  flop_posts: Post[];
  trend: {
    views: number | null;
    er: number | null;
    posts: number | null;
    engagement: number | null;
    note?: string;
  };
  trend_reliable: boolean;

  pinned: { exists: boolean; age_days: number | null; url: string | null };
  polls: number;
  links_share: number;
  tags_per_post: number;
  last30: { posts: number; expected: number };
  dow_used: number;
  slots_used: number;
  weekend_share: number;
  like_rate: number;
  er_stability: number;
  views_cv: number;
  dominant_format: { label: string; share: number; avg_er: number } | null;
  best_format: { label: string; avg_er: number; share: number } | null;
  repeat_share: number;

  reach: Reach | null;
  group_stats: GroupStats | null;
  posts: Post[];
}

export type Severity = 'high' | 'mid' | 'low';

/** Зона роста: что не так, чем это подтверждается и что с этим делать. */
export interface Finding {
  id: string;
  area: string;
  title: string;
  severity: Severity;
  evidence: string;
  why: string;
  actions: string[];
  kpi: string;
  stage: number;
  impact: number;
  effort: number;
  blocker: boolean;
  rank: number;
  priority: number;
}

export interface PlanStage {
  stage: number;
  title: string;
  goal: string;
  tasks: Array<{ text: string; source: string; severity: Severity }>;
  metric: string;
}

export interface Target {
  label: string;
  now: string;
  goal: string;
}
