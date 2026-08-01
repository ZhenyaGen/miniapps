/**
 * Общие для всех клиентов константы сбора.
 *
 * Отдельно от `src/config.ts`, потому что тот читает `import.meta.env` —
 * его нет в Node, а этот модуль импортирует ещё и бот из `apps/vk-bot`.
 */

export const API_VERSION = '5.199';

/** Ограничение ВК для пользовательского ключа — 3 запроса в секунду. */
export const RATE_LIMIT_RPS = 3;

/** Глубина анализа и потолок выборки — те же, что в десктопной версии. */
export const DEFAULT_PERIOD_DAYS = 180;
export const DEFAULT_MAX_POSTS = 300;

/** Часовой пояс, в котором считаются день недели и час публикации. */
export const DEFAULT_TZ_OFFSET = 3;
