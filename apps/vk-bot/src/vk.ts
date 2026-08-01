/** Серверный клиент VK API: тот же контракт, что у моста в мини-аппе. */

import { API_VERSION } from './config';
import { describeError, VKError, type ApiClient } from '../../vk-audit/src/vk/client';

export { VKError };

const RETRY_CODES = new Set([6, 29]); // «слишком часто» и «превышен лимит»

const sleep = (ms: number) => new Promise((resolve) => { setTimeout(resolve, ms); });

interface VKResponse<T> {
  response?: T;
  error?: { error_code: number; error_msg: string };
}

/**
 * Запросы уходят по одному с паузой.
 *
 * Лимит зависит от ключа (пользовательский — 3 запроса в секунду, сервисный —
 * от 5), но упираться в него незачем: бот никуда не торопится, а код 6 стоит
 * дороже ожидания.
 */
export class ServerApi implements ApiClient {
  private queue: Promise<unknown> = Promise.resolve();

  private lastCallAt = 0;

  calls = 0;

  constructor(
    private readonly token: string,
    private readonly minGapMs = 350,
  ) {}

  async call<T>(method: string, params: Record<string, string | number> = {}): Promise<T> {
    const run = this.queue.then(() => this.callNow<T>(method, params));
    this.queue = run.catch(() => undefined);
    return run;
  }

  private async callNow<T>(method: string, params: Record<string, string | number>): Promise<T> {
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const wait = this.lastCallAt + this.minGapMs - Date.now();
      if (wait > 0) await sleep(wait);
      this.lastCallAt = Date.now();
      this.calls += 1;

      const body = new URLSearchParams({
        ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
        v: API_VERSION,
        access_token: this.token,
      });

      let data: VKResponse<T>;
      try {
        const resp = await fetch(`https://api.vk.com/method/${method}`, {
          method: 'POST',
          body,
        });
        data = (await resp.json()) as VKResponse<T>;
      } catch (err) {
        // сеть моргнула — повторяем, но не бесконечно
        if (attempt < 3) {
          await sleep(500 * 2 ** attempt);
          continue;
        }
        throw new VKError(0, `Сеть недоступна: ${(err as Error).message}`);
      }

      if (data.error) {
        const { error_code: code, error_msg: message } = data.error;
        if (RETRY_CODES.has(code) && attempt < 3) {
          await sleep(600 * 2 ** attempt);
          continue;
        }
        throw new VKError(code, describeError(code, message));
      }
      return data.response as T;
    }
    throw new VKError(6, 'ВК ограничил частоту запросов.');
  }
}

/** Отправка личного сообщения от имени сообщества. */
export async function sendMessage(
  api: ApiClient, userId: number, text: string,
): Promise<void> {
  // ВК режет сообщения длиннее ~4096 символов, поэтому длинный разбор
  // уходит несколькими частями по границам абзацев
  for (const chunk of splitMessage(text)) {
    await api.call('messages.send', {
      user_id: userId,
      message: chunk,
      random_id: Math.floor(Math.random() * 2 ** 31),
      dont_parse_links: 0,
    });
  }
}

export const MESSAGE_LIMIT = 4000;

export function splitMessage(text: string, limit = MESSAGE_LIMIT): string[] {
  if (text.length <= limit) return [text];
  const parts: string[] = [];
  let current = '';
  for (const paragraph of text.split('\n\n')) {
    const candidate = current ? `${current}\n\n${paragraph}` : paragraph;
    if (candidate.length <= limit) {
      current = candidate;
      continue;
    }
    if (current) parts.push(current);
    // абзац сам по себе длиннее лимита — режем по строкам
    if (paragraph.length <= limit) {
      current = paragraph;
    } else {
      let rest = paragraph;
      while (rest.length > limit) {
        const cut = rest.lastIndexOf('\n', limit) > 0 ? rest.lastIndexOf('\n', limit) : limit;
        parts.push(rest.slice(0, cut));
        rest = rest.slice(cut).trimStart();
      }
      current = rest;
    }
  }
  if (current) parts.push(current);
  return parts;
}
