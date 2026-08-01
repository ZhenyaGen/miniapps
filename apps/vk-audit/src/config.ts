/** Настройки приложения ВКонтакте: одно приложение на все клиенты. */

// Адрес возврата после входа — общий для мини-аппа, exe и APK.
export { OAUTH_PORT, OAUTH_REDIRECT_URI } from './oauth';

/**
 * Числовой ID приложения ВКонтакте. Не секрет: виден в адресной строке при
 * любом входе. Подставляется на сборке через `VITE_VK_APP_ID`.
 */
export const VK_APP_ID = Number(import.meta.env.VITE_VK_APP_ID ?? 0);

/**
 * Права, которые запрашиваются у пользователя.
 *
 * `groups` — список сообществ, где он администратор; `stats` — охваты и
 * демография этих сообществ. Публичные страницы читаются и без них.
 */
export const AUTH_SCOPE = 'groups,stats';

export const API_VERSION = '5.199';

/** Ограничение ВК для пользовательского ключа — 3 запроса в секунду. */
export const RATE_LIMIT_RPS = 3;

/** Глубина анализа и потолок выборки — те же, что в десктопной версии. */
export const DEFAULT_PERIOD_DAYS = 180;
export const DEFAULT_MAX_POSTS = 300;

/** Часовой пояс, в котором считаются день недели и час публикации. */
export const DEFAULT_TZ_OFFSET = 3;
