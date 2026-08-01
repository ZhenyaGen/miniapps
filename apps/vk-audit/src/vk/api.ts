/** Клиент VK API: троттлинг, повторы и разбор ошибок — поверх двух транспортов. */

import bridge from '@vkontakte/vk-bridge';

import { API_VERSION, RATE_LIMIT_RPS } from './defaults';
import { describeError, VKError, type ApiClient } from './client';

export { VKError };

const RETRY_CODES = new Set([6, 29]); // «слишком часто» и «превышен лимит»

interface Transport {
  (method: string, params: Record<string, string | number>): Promise<unknown>;
}

/** Внутри ВК запросы уходят через мост — токен не покидает клиент. */
const bridgeTransport = (token: string): Transport => async (method, params) => {
  try {
    const data = await bridge.send('VKWebAppCallAPIMethod', {
      method,
      params: { ...params, v: API_VERSION, access_token: token },
    });
    return (data as { response?: unknown }).response;
  } catch (raw) {
    throw toVKError(raw);
  }
};

/**
 * Запасной транспорт для запуска вне ВК (например, из десктопной программы,
 * открывающей мини-апп в браузере). Работает только если браузер пропустит
 * кросс-доменный запрос к `api.vk.com`.
 */
const httpTransport = (token: string): Transport => async (method, params) => {
  const body = new URLSearchParams({
    ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
    v: API_VERSION,
    access_token: token,
  });
  const resp = await fetch(`https://api.vk.com/method/${method}`, { method: 'POST', body });
  const data = (await resp.json()) as { response?: unknown; error?: { error_code: number; error_msg: string } };
  if (data.error) throw toVKError(data.error);
  return data.response;
};

function toVKError(raw: unknown): VKError {
  const err = raw as {
    error_code?: number;
    error_msg?: string;
    error_data?: { error_code?: number; error_msg?: string; error_reason?: unknown };
    error_type?: string;
  };
  const inner = (err.error_data ?? err) as {
    error_code?: number;
    error_msg?: string;
    error_reason?: { error_code?: number; error_msg?: string } | string;
  };
  const reason = typeof inner.error_reason === 'object' ? inner.error_reason : undefined;
  const code = inner.error_code ?? reason?.error_code ?? 0;
  const message = inner.error_msg ?? reason?.error_msg ?? err.error_type ?? 'Неизвестная ошибка ВК';
  return new VKError(code, describeError(code, message));
}

const sleep = (ms: number) => new Promise((resolve) => { setTimeout(resolve, ms); });

/**
 * Последовательный клиент с паузами между запросами.
 *
 * ВК разрешает пользовательскому ключу 3 запроса в секунду, поэтому вызовы
 * выстраиваются в очередь: параллелить смысла нет, а код 6 стоит дороже
 * ожидания.
 */
export class VKApi implements ApiClient {
  private readonly transport: Transport;

  private queue: Promise<unknown> = Promise.resolve();

  private lastCallAt = 0;

  calls = 0;

  constructor(token: string, kind: 'bridge' | 'http' = 'bridge') {
    this.transport = kind === 'bridge' ? bridgeTransport(token) : httpTransport(token);
  }

  async call<T>(method: string, params: Record<string, string | number> = {}): Promise<T> {
    const run = this.queue.then(() => this.callNow<T>(method, params));
    // очередь не должна вставать из-за упавшего запроса
    this.queue = run.catch(() => undefined);
    return run;
  }

  private async callNow<T>(method: string, params: Record<string, string | number>): Promise<T> {
    const minGap = 1000 / RATE_LIMIT_RPS;
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const wait = this.lastCallAt + minGap - Date.now();
      if (wait > 0) await sleep(wait);
      this.lastCallAt = Date.now();
      this.calls += 1;
      try {
        return (await this.transport(method, params)) as T;
      } catch (err) {
        // повторяем только «слишком часто»: на «доступ запрещён» это бессмысленно
        if (err instanceof VKError && RETRY_CODES.has(err.code) && attempt < 3) {
          await sleep(400 * 2 ** attempt);
          continue;
        }
        throw err;
      }
    }
    throw new VKError(6, 'ВК ограничил частоту запросов. Попробуйте через минуту.');
  }
}
