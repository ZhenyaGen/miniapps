/** Вход: внутри ВК — через мост, снаружи — через тот же redirect, что у exe. */

import bridge from '@vkontakte/vk-bridge';

import { AUTH_SCOPE, OAUTH_REDIRECT_URI, VK_APP_ID } from '../config';

export interface Session {
  token: string;
  scope: string[];
  /** Каким транспортом ходить в API: изнутри ВК — мостом. */
  transport: 'bridge' | 'http';
  /** Кто вошёл — чтобы предложить разобрать свою страницу одной кнопкой. */
  userId?: number;
}

const STORAGE_KEY = 'vk-audit:session';

/** Приложение открыто в клиенте ВКонтакте, а не просто в браузере. */
export function isInsideVK(): boolean {
  const params = new URLSearchParams(window.location.search);
  return params.has('vk_app_id') || params.has('vk_user_id');
}

/**
 * Идентификатор зрителя из параметров запуска.
 *
 * ВК подставляет `vk_user_id` при открытии мини-приложения; вне ВК его нет
 * и число приезжает вместе с ключом доступа после входа.
 */
export function launchUserId(): number | null {
  const raw = new URLSearchParams(window.location.search).get('vk_user_id');
  const id = Number(raw);
  return Number.isFinite(id) && id > 0 ? id : null;
}

/** Вход внутри ВК: платформа сама покажет окно с правами. */
export async function authorizeViaBridge(): Promise<Session> {
  const data = await bridge.send('VKWebAppGetAuthToken', {
    app_id: VK_APP_ID,
    scope: AUTH_SCOPE,
  });
  return {
    token: data.access_token,
    scope: (data.scope ?? '').split(',').filter(Boolean),
    transport: 'bridge',
  };
}

/**
 * Вход вне ВК — тот же implicit flow, что в десктопной версии: браузер уходит
 * на страницу разрешений и возвращается на `OAUTH_REDIRECT_URI` с ключом
 * в hash. Адрес возврата должен быть прописан в настройках приложения на
 * dev.vk.ru как доверенный, иначе ВК ответит `redirect_uri is incorrect`.
 */
export function startStandaloneAuth(): void {
  const url = new URL('https://oauth.vk.com/authorize');
  url.searchParams.set('client_id', String(VK_APP_ID));
  url.searchParams.set('redirect_uri', OAUTH_REDIRECT_URI);
  url.searchParams.set('scope', AUTH_SCOPE);
  url.searchParams.set('response_type', 'token');
  url.searchParams.set('display', 'page');
  url.searchParams.set('revoke', '1');
  window.location.assign(url.toString());
}

/** Ключ из адресной строки после возврата с oauth.vk.com. */
export function readSessionFromRedirect(): Session | null {
  const hash = window.location.hash.replace(/^#/, '');
  if (!hash.includes('access_token=')) return null;
  const params = new URLSearchParams(hash);
  const token = params.get('access_token');
  if (!token) return null;
  const ownerId = Number(params.get('user_id'));
  const session: Session = {
    token,
    scope: (params.get('scope') ?? '').split(',').filter(Boolean),
    transport: 'http',
    userId: Number.isFinite(ownerId) && ownerId > 0 ? ownerId : undefined,
  };
  saveSession(session);
  window.history.replaceState(null, '', window.location.pathname);
  return session;
}

export function saveSession(session: Session): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // приватный режим — просто работаем без сохранения
  }
}

/**
 * Сохранённый ключ — только если прав в нём хватает.
 *
 * Набор прав меняется вместе с приложением: раздел «Видео» появился
 * позже стены, и старый ключ на `video.get` отвечает отказом. Ошибка
 * при этом видна только внутри сбора, а человек видит пустую вкладку.
 * Проще выбросить такой ключ и спросить права заново.
 *
 * Пустой `scope` не трогаем: некоторые клиенты его не возвращают,
 * и по нему нельзя судить, чего в ключе нет.
 */
export function loadSession(): Session | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as Session;
    const need = AUTH_SCOPE.split(',').map((s) => s.trim()).filter(Boolean);
    if (session.scope?.length && need.some((s) => !session.scope.includes(s))) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // нечего чистить
  }
}
