/** Настройки бота. Всё секретное — только из окружения, ничего в коде. */

/**
 * Читаем `.env`, если он лежит рядом.
 *
 * Инструкция велит скопировать `.env.example` в `.env` — без этой строки
 * файл никто не читал бы, и бот падал бы на «не задана переменная»
 * при заполненном файле. В окружении, где переменные уже заданы
 * (сервер, systemd, CI), файла нет и вызов молча ничего не делает.
 */
export function loadEnvFile(path = '.env'): void {
  try {
    process.loadEnvFile(path);
  } catch {
    // файла нет — значит, переменные приходят из окружения
  }
}

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Не задана переменная окружения ${name}. Скопируйте .env.example в .env и заполните.`,
    );
  }
  return value;
}

function optional(name: string, fallback: string): string {
  return process.env[name]?.trim() || fallback;
}

export interface BotConfig {
  /** Ключ доступа сообщества: им бот читает Long Poll и пишет сообщения. */
  groupToken: string;
  /** Числовой ID сообщества, от имени которого работает бот. */
  groupId: number;
  /**
   * Сервисный ключ приложения — им читаются стены.
   *
   * Ключом сообщества `wall.get` недоступен (ВК отвечает ошибкой 27), поэтому
   * для сбора нужен именно сервисный. На сервере держать его безопасно.
   */
  serviceToken: string;
  /** Ключ DeepSeek. Без него бот шлёт разбор без «человеческого» текста. */
  llmKey: string;
  llmBase: string;
  llmModel: string;
  /** Как часто планировщик проверяет, кому пора слать, в минутах. */
  tickMinutes: number;
  /** Файл с подписками. */
  storePath: string;
  tzOffset: number;
  /**
   * Режим без отправки: бот слушает, считает и пишет в лог то, что отправил бы,
   * но `messages.send` не вызывает. Так проверяют формулировки и расписание,
   * не рискуя разослать черновик живым людям.
   */
  dryRun: boolean;
}

export function loadConfig(): BotConfig {
  loadEnvFile();
  return {
    groupToken: required('VK_GROUP_TOKEN'),
    groupId: Number(required('VK_GROUP_ID')),
    serviceToken: required('VK_SERVICE_TOKEN'),
    llmKey: optional('VK_LLM_KEY', ''),
    llmBase: optional('VK_LLM_BASE', 'https://api.deepseek.com/v1'),
    llmModel: optional('VK_LLM_MODEL', 'deepseek-chat'),
    tickMinutes: Number(optional('BOT_TICK_MINUTES', '15')),
    storePath: optional('BOT_STORE', 'data/subscriptions.json'),
    tzOffset: Number(optional('BOT_TZ_OFFSET', '3')),
    dryRun: optional('BOT_DRY_RUN', '') === '1',
  };
}

export const API_VERSION = '5.199';
