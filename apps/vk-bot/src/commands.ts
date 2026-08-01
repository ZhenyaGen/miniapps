/** Разбор входящих сообщений: что человек написал боту и что с этим делать. */

import { parseTarget } from '../../vk-audit/src/vk/collect';
import { PERIOD_LABEL, type Period } from './store';

export type Command =
  | { kind: 'start' }
  | { kind: 'help' }
  | { kind: 'setTarget'; target: string }
  | { kind: 'setPeriod'; period: Period }
  | { kind: 'now' }
  | { kind: 'stop' }
  | { kind: 'status' }
  | { kind: 'unknown' };

const START = ['начать', 'старт', 'привет', 'start', 'begin'];
const HELP = ['помощь', 'help', 'что ты умеешь', 'команды'];
const NOW = ['разбор', 'сейчас', 'проверь', 'обнови'];
const STOP = ['стоп', 'stop', 'отписаться', 'хватит', 'отключи'];
const STATUS = ['статус', 'настройки'];
const WEEK = ['неделя', 'неделю', 'еженедельно', 'week'];
const MONTH = ['месяц', 'ежемесячно', 'month'];

/** Ссылка на страницу ВК — единственное, что бот принимает «как есть». */
const LINK = /(?:vk\.(?:com|ru)\/|^@)([a-z0-9_.]+)/i;

export function parseCommand(raw: string): Command {
  const text = (raw ?? '').trim().toLowerCase();
  if (!text) return { kind: 'unknown' };

  if (START.includes(text)) return { kind: 'start' };
  if (HELP.some((w) => text === w)) return { kind: 'help' };
  if (STOP.some((w) => text === w)) return { kind: 'stop' };
  if (STATUS.some((w) => text === w)) return { kind: 'status' };
  if (NOW.some((w) => text === w)) return { kind: 'now' };
  if (WEEK.some((w) => text === w)) return { kind: 'setPeriod', period: 'week' };
  if (MONTH.some((w) => text === w)) return { kind: 'setPeriod', period: 'month' };

  const link = LINK.exec(raw.trim());
  if (link) {
    const target = parseTarget(raw.trim());
    if (target) return { kind: 'setTarget', target };
  }

  // короткое слово без пробелов вполне может быть коротким адресом страницы
  if (/^[a-z0-9_.]{3,60}$/i.test(raw.trim())) {
    return { kind: 'setTarget', target: raw.trim() };
  }

  return { kind: 'unknown' };
}

export const GREETING = 'Я слежу за страницей во ВКонтакте и присылаю разбор: '
  + 'что изменилось, где просело и что делать дальше.\n\n'
  + 'Пришлите ссылку на сообщество или страницу — например, vk.com/vkappsdev. '
  + 'Дальше буду присылать разбор раз в неделю, это меняется словом «месяц».';

export const HELP_TEXT = 'Что я понимаю:\n'
  + '— ссылка на страницу: слежу за ней\n'
  + '— «неделя» или «месяц»: как часто присылать\n'
  + '— «разбор»: собрать прямо сейчас\n'
  + '— «статус»: что настроено\n'
  + '— «стоп»: отключить рассылку';

export function statusText(target: string, period: Period, lastSentAt: number): string {
  const last = lastSentAt
    ? new Date(lastSentAt * 1000).toLocaleDateString('ru-RU')
    : 'ещё не присылал';
  return `Слежу за: ${target}\nЧастота: ${PERIOD_LABEL[period]}\nПрошлый разбор: ${last}`;
}
