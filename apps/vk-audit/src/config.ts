/** Настройки приложения ВКонтакте: одно приложение на все клиенты. */

// Адрес возврата после входа — общий для мини-аппа, exe и APK.
export { OAUTH_PORT, OAUTH_REDIRECT_URI } from './oauth';

// Параметры сбора общие с ботом, поэтому лежат отдельно от Vite-окружения.
export {
  API_VERSION, DEFAULT_MAX_POSTS, DEFAULT_PERIOD_DAYS, DEFAULT_TZ_OFFSET, RATE_LIMIT_RPS,
} from './vk/defaults';

/**
 * Числовой ID приложения ВКонтакте. Не секрет: виден в адресной строке при
 * любом входе. Подставляется на сборке через `VITE_VK_APP_ID`.
 */
export const VK_APP_ID = Number(import.meta.env?.VITE_VK_APP_ID ?? 0);

/**
 * Сообщество бота, который присылает разборы в личные сообщения.
 *
 * Пусто — блок подписки в отчёте не показывается: без сообщества боту неоткуда
 * писать. Задаётся через `VITE_VK_BOT_GROUP_ID`.
 */
export const VK_BOT_GROUP_ID = Number(import.meta.env?.VITE_VK_BOT_GROUP_ID ?? 0);

/**
 * Права, которые запрашиваются у пользователя.
 *
 * `groups` — список сообществ, где он администратор; `stats` — охваты и
 * демография этих сообществ. Публичные страницы читаются и без них.
 */
export const AUTH_SCOPE = 'groups,stats';

