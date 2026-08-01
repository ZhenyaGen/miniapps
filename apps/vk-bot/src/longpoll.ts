/**
 * Bots Long Poll API: очередь событий держит ВК, нам не нужен публичный адрес.
 *
 * Включается в сообществе: Управление → Дополнительно → Работа с API →
 * Long Poll API, там же отмечаются нужные типы событий (как минимум
 * «Входящее сообщение»).
 */

import type { ApiClient } from '../../vk-audit/src/vk/client';

export interface IncomingMessage {
  userId: number;
  text: string;
  /** `payload` кнопки, если сообщение пришло нажатием. */
  payload?: string;
}

/**
 * Пользователь разрешил сообщения от сообщества.
 *
 * `key` — произвольная строка, которую передали в
 * `VKWebAppAllowMessagesFromGroup`. Мини-приложение кладёт туда адрес
 * страницы, поэтому подписка оформляется одним нажатием, без переписки.
 */
export interface AllowEvent {
  userId: number;
  key?: string;
}

export type LongPollEvent =
  | ({ kind: 'message' } & IncomingMessage)
  | ({ kind: 'allow' } & AllowEvent)
  | { kind: 'deny'; userId: number };

interface LongPollSession {
  server: string;
  key: string;
  ts: string;
}

interface LongPollUpdate {
  type: string;
  object?: {
    message?: { from_id?: number; peer_id?: number; text?: string; payload?: string };
    from_id?: number;
    peer_id?: number;
    text?: string;
    user_id?: number;
    key?: string;
  };
}

interface LongPollResponse {
  ts?: string;
  updates?: LongPollUpdate[];
  failed?: number;
}

const sleep = (ms: number) => new Promise((resolve) => { setTimeout(resolve, ms); });

export class LongPoll {
  private session: LongPollSession | null = null;

  private stopped = false;

  constructor(
    private readonly api: ApiClient,
    private readonly groupId: number,
    private readonly onEvent: (event: LongPollEvent) => Promise<void>,
    private readonly log: (message: string) => void = console.log,
  ) {}

  stop(): void {
    this.stopped = true;
  }

  private async connect(): Promise<LongPollSession> {
    const resp = await this.api.call<LongPollSession>('groups.getLongPollServer', {
      group_id: this.groupId,
    });
    return resp;
  }

  async run(): Promise<void> {
    while (!this.stopped) {
      try {
        if (!this.session) {
          this.session = await this.connect();
          this.log('Long Poll подключён');
        }
        const { server, key, ts } = this.session;
        const url = `${server}?act=a_check&key=${encodeURIComponent(key)}&ts=${ts}&wait=25`;
        const resp = await fetch(url);
        const data = (await resp.json()) as LongPollResponse;

        // 1 — устарел ts, 2/3 — протухла сессия, её нужно взять заново
        if (data.failed) {
          if (data.failed === 1 && data.ts) {
            this.session = { server, key, ts: String(data.ts) };
          } else {
            this.session = null;
          }
          continue;
        }

        this.session = { server, key, ts: String(data.ts ?? ts) };
        for (const update of data.updates ?? []) {
          const event = toEvent(update);
          if (event) {
            // ошибка обработки одного события не должна ронять цикл
            await this.onEvent(event).catch((err: Error) => {
              this.log(`Ошибка обработки события: ${err.message}`);
            });
          }
        }
      } catch (err) {
        this.log(`Long Poll оборвался: ${(err as Error).message}. Переподключаюсь.`);
        this.session = null;
        await sleep(3000);
      }
    }
  }
}

/** Из события Long Poll — то, на что бот умеет отвечать. */
export function toEvent(update: LongPollUpdate): LongPollEvent | null {
  if (update.type === 'message_allow') {
    const userId = Number(update.object?.user_id ?? 0);
    return userId > 0 ? { kind: 'allow', userId, key: update.object?.key } : null;
  }
  if (update.type === 'message_deny') {
    const userId = Number(update.object?.user_id ?? 0);
    return userId > 0 ? { kind: 'deny', userId } : null;
  }
  if (update.type !== 'message_new') return null;

  const message = update.object?.message ?? update.object;
  if (!message) return null;

  const userId = Number(message.from_id ?? message.peer_id ?? 0);
  // отрицательный id — пишет сообщество; беседы (peer_id > 2e9) не обслуживаем
  if (!userId || userId < 0 || userId > 2_000_000_000) return null;

  return {
    kind: 'message',
    userId,
    text: String(message.text ?? ''),
    payload: 'payload' in message ? message.payload : undefined,
  };
}
