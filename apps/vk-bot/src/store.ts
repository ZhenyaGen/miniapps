/**
 * Подписки: кому, что и как часто присылать.
 *
 * Хранилище — обычный JSON-файл: подписчиков у такого бота единицы или сотни,
 * ставить ради этого базу незачем. Запись атомарная (во временный файл
 * с переименованием), чтобы падение в момент сохранения не оставило обрезок.
 */

import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

export type Period = 'week' | 'month';

export const PERIOD_DAYS: Record<Period, number> = { week: 7, month: 30 };

export const PERIOD_LABEL: Record<Period, string> = {
  week: 'раз в неделю',
  month: 'раз в месяц',
};

export interface Subscription {
  userId: number;
  /** Страница, за которой следим: короткое имя или id. */
  target: string;
  /** Как её зовут — чтобы писать «по вашей странице Х», а не по ссылке. */
  title?: string;
  period: Period;
  /** Когда отправили прошлый разбор, unix-время. */
  lastSentAt: number;
  /** Ключевые цифры прошлого разбора — для строки «было → стало». */
  lastMetrics?: {
    er: number;
    perWeek: number;
    avgViews: number;
    audience: number;
    findings: number;
  };
  createdAt: number;
  /** Отписался, но историю не теряем: вернётся — вспомним страницу. */
  active: boolean;
  /** Сколько раз подряд не удалось собрать; после трёх — пауза и письмо. */
  failures: number;
}

interface StoreFile {
  version: 1;
  subscriptions: Subscription[];
}

export class Store {
  private data: StoreFile = { version: 1, subscriptions: [] };

  constructor(private readonly path: string) {}

  async load(): Promise<void> {
    try {
      const raw = await readFile(this.path, 'utf8');
      const parsed = JSON.parse(raw) as StoreFile;
      this.data = { version: 1, subscriptions: parsed.subscriptions ?? [] };
    } catch (err) {
      // первого запуска файла ещё нет — это не ошибка
      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
    }
  }

  private async save(): Promise<void> {
    await mkdir(dirname(this.path), { recursive: true });
    const tmp = `${this.path}.tmp`;
    await writeFile(tmp, JSON.stringify(this.data, null, 1), 'utf8');
    await rename(tmp, this.path);
  }

  get(userId: number): Subscription | undefined {
    return this.data.subscriptions.find((s) => s.userId === userId);
  }

  all(): Subscription[] {
    return [...this.data.subscriptions];
  }

  active(): Subscription[] {
    return this.data.subscriptions.filter((s) => s.active);
  }

  async upsert(userId: number, patch: Partial<Subscription>): Promise<Subscription> {
    const existing = this.get(userId);
    const now = Math.floor(Date.now() / 1000);
    const next: Subscription = {
      userId,
      target: '',
      period: 'week',
      lastSentAt: 0,
      createdAt: now,
      active: true,
      failures: 0,
      ...existing,
      ...patch,
    };
    if (existing) {
      this.data.subscriptions = this.data.subscriptions.map((s) => (s.userId === userId ? next : s));
    } else {
      this.data.subscriptions.push(next);
    }
    await this.save();
    return next;
  }

  async remove(userId: number): Promise<void> {
    this.data.subscriptions = this.data.subscriptions.filter((s) => s.userId !== userId);
    await this.save();
  }
}

/**
 * Кому пора слать: активные, с указанной страницей, у которых с прошлой
 * отправки прошёл их период.
 */
export function due(subscriptions: Subscription[], now = Math.floor(Date.now() / 1000)): Subscription[] {
  return subscriptions.filter((s) => {
    if (!s.active || !s.target) return false;
    if (s.failures >= 3) return false;
    const period = PERIOD_DAYS[s.period] * 86400;
    return now - s.lastSentAt >= period;
  });
}
