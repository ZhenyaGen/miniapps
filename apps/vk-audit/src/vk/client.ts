/**
 * Контракт клиента VK API, не зависящий от способа доставки запроса.
 *
 * В мини-аппе его реализует мост, на сервере (бот) — обычный fetch. Благодаря
 * этому сбор данных в `collect.ts` общий: цифры в приложении и в личных
 * сообщениях считаются одним кодом.
 */
export interface ApiClient {
  call<T>(method: string, params?: Record<string, string | number>): Promise<T>;
  /** Сколько запросов ушло — попадает в снимок для отладки. */
  readonly calls: number;
}

export class VKError extends Error {
  readonly code: number;

  constructor(code: number, message: string) {
    super(message);
    this.name = 'VKError';
    this.code = code;
  }
}

/** Подсказки к кодам ошибок ВК, одинаковые для клиента и сервера. */
export const ERROR_HINTS: Record<number, string> = {
  5: 'Ключ доступа не принят — войдите заново.',
  15: 'Доступ к этой странице закрыт её настройками приватности.',
  18: 'Страница удалена или заблокирована.',
  27: 'Ключом сообщества стену читать нельзя — нужен ключ пользователя.',
  30: 'Профиль закрыт: данные доступны только друзьям.',
  100: 'ВК не понял параметры запроса.',
  203: 'Нет доступа к этому сообществу.',
};

export function describeError(code: number, message: string): string {
  return ERROR_HINTS[code] ? `${ERROR_HINTS[code]} (код ${code})` : `${message} (код ${code})`;
}
