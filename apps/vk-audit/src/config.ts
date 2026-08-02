/** Настройки приложения ВКонтакте: одно приложение на все клиенты. */

// Адрес возврата после входа — общий для мини-аппа, exe и APK.
export { OAUTH_PORT, OAUTH_REDIRECT_URI } from './oauth';

// Параметры сбора общие с ботом, поэтому лежат отдельно от Vite-окружения.
export {
  API_VERSION, DEFAULT_MAX_POSTS, DEFAULT_PERIOD_DAYS, DEFAULT_TZ_OFFSET, RATE_LIMIT_RPS,
} from './vk/defaults';

/**
 * Приложение ВКонтакте по умолчанию — то, под которым живёт этот проект.
 *
 * Не секрет: ID виден в адресной строке при любом запуске. Зашит, чтобы
 * сборка работала без настройки; своё приложение подставляется переменной
 * `VITE_VK_APP_ID`.
 */
const DEFAULT_APP_ID = 54693601;

export const VK_APP_ID = Number(import.meta.env?.VITE_VK_APP_ID || DEFAULT_APP_ID);

/**
 * Сообщество бота, который присылает разборы в личные сообщения.
 *
 * Пусто — блок подписки в отчёте не показывается: без сообщества боту неоткуда
 * писать. Задаётся через `VITE_VK_BOT_GROUP_ID`.
 */
export const VK_BOT_GROUP_ID = Number(import.meta.env?.VITE_VK_BOT_GROUP_ID ?? 0);

/** Автор проекта — подпись в интерфейсе. */
export const AUTHOR_NAME = 'Евгений Тюрин';
export const AUTHOR_URL = 'https://vk.ru/ea_tyurin';

/**
 * Чат DeepSeek — куда уходит кнопка «Разобрать с ИИ».
 *
 * Ключ модели в приложении не нужен и не может быть: бандл распаковывается.
 * Бриф уезжает в буфер обмена, разбор человек получает в своём чате.
 */
export const DEEPSEEK_CHAT_URL = 'https://chat.deepseek.com/';

/**
 * Права, которые запрашиваются у пользователя.
 *
 * `groups` — список сообществ, где он администратор; `stats` — охваты и
 * демография этих сообществ. Публичные страницы читаются и без них.
 */
export const AUTH_SCOPE = 'groups,stats';

