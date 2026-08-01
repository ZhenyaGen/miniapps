/**
 * Адрес возврата после входа через браузер — единственный источник правды.
 *
 * Файл отдельный, потому что его импортирует и приложение, и `vite.config.ts`
 * (dev-сервер должен слушать ровно тот порт, который зашит в redirect_uri).
 * В настройках приложения на dev.vk.ru этот адрес должен быть прописан
 * в поле «Доверенный redirect URI» — иначе ВК ответит `redirect_uri is
 * incorrect`. Тот же адрес использует десктопная версия и сборка под Android.
 */
export const OAUTH_PORT = 8910;

export const OAUTH_REDIRECT_URI = `http://localhost:${OAUTH_PORT}/callback`;
