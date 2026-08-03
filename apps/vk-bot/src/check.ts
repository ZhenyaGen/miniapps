/**
 * Проверка перед первым запуском: доходят ли ключи и отвечают ли сервисы.
 *
 * Ничего не отправляет, ничего не сохраняет — только читает. Запускать
 * можно сколько угодно раз: `npm run check`.
 *
 * Смысл в том, чтобы разделить ошибки. Когда бот молчит, причин обычно
 * четыре — не тот ключ, не включён Long Poll, не отмечены типы событий,
 * не отвечает модель, — и в общем логе они выглядят одинаково.
 */

import { loadConfig } from './config';
import { DeepSeek } from './deepseek';
import { ServerApi, VKError } from './vk';

interface Check {
  name: string;
  hint: string;
  run: () => Promise<string>;
}

function describe(err: unknown): string {
  if (err instanceof VKError) return err.message;
  return err instanceof Error ? err.message : String(err);
}

async function main(): Promise<void> {
  const config = loadConfig();
  const groupApi = new ServerApi(config.groupToken);
  const readApi = new ServerApi(config.serviceToken);

  // страница для пробного чтения: своё сообщество, если не задали другую
  const sample = process.argv[2]?.trim() || `-${config.groupId}`;

  const checks: Check[] = [
    {
      name: 'Ключ сообщества',
      hint: 'Управление → Работа с API → Ключи доступа. Права: сообщения сообщества.',
      run: async () => {
        const resp = await groupApi.call<any>('groups.getById', {
          group_id: config.groupId,
        });
        const items = Array.isArray(resp) ? resp : resp?.groups ?? [];
        if (!items.length) throw new Error('сообщество не найдено');
        return `${items[0].name} (id ${config.groupId})`;
      },
    },
    {
      name: 'Long Poll включён',
      hint: 'Управление → Работа с API → Long Poll API → Включено, версия 5.199. '
        + 'В «Типах событий» отметьте message_new, message_allow и message_deny.',
      run: async () => {
        const resp = await groupApi.call<{ server?: string; ts?: string }>(
          'groups.getLongPollServer', { group_id: config.groupId },
        );
        if (!resp?.server) throw new Error('сервер не выдан — Long Poll выключен');
        return `сервер отвечает, ts ${resp.ts}`;
      },
    },
    {
      name: 'Сервисный ключ читает стены',
      hint: 'dev.vk.ru → ваше приложение → Ключи доступа → сервисный. '
        + 'Ключом сообщества wall.get недоступен, ВК отвечает ошибкой 27.',
      run: async () => {
        const resp = await readApi.call<{ count?: number }>('wall.get', {
          domain: sample.replace(/^-/, 'club'), count: 1,
        });
        return `${sample}: записей на стене ${resp?.count ?? 0}`;
      },
    },
    {
      name: 'DeepSeek',
      hint: 'platform.deepseek.com → API keys. Без ключа бот работает, '
        + 'но присылает сухие факты вместо человеческого текста.',
      run: async () => {
        if (!config.llmKey) return 'ключа нет — разборы уйдут сухими фактами';
        const llm = new DeepSeek({
          key: config.llmKey, base: config.llmBase, model: config.llmModel,
        });
        await llm.check();
        return `${config.llmModel} отвечает`;
      },
    },
  ];

  let failed = 0;
  for (const check of checks) {
    try {
      console.log(`  ok   ${check.name} — ${await check.run()}`);
    } catch (err) {
      failed += 1;
      console.log(`  СБОЙ ${check.name} — ${describe(err)}`);
      console.log(`       ${check.hint}`);
    }
  }

  console.log('');
  if (failed) {
    console.log(`Не прошло проверок: ${failed}. Запускать бота рано.`);
    process.exitCode = 1;
    return;
  }
  console.log('Всё на месте. Следующий шаг — npm run preview, посмотреть текст разбора.');
}

main().catch((err: Error) => {
  console.error(`Проверка не запустилась: ${err.message}`);
  process.exit(1);
});
