/** Точка входа: поднимает Long Poll и планировщик рассылки. */

import { Bot } from './bot';
import { loadConfig } from './config';
import { DeepSeek } from './deepseek';
import { LongPoll } from './longpoll';
import { Store } from './store';
import { ServerApi } from './vk';

const log = (message: string) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

async function main(): Promise<void> {
  const config = loadConfig();

  const store = new Store(config.storePath);
  await store.load();
  log(`Подписок загружено: ${store.all().length}`);

  // ключ сообщества — писать людям, сервисный — читать стены (ключом
  // сообщества wall.get запрещён, ВК отвечает ошибкой 27)
  const groupApi = new ServerApi(config.groupToken);
  const readApi = new ServerApi(config.serviceToken);

  let llm: DeepSeek | null = null;
  if (config.llmKey) {
    llm = new DeepSeek({ key: config.llmKey, base: config.llmBase, model: config.llmModel });
    try {
      await llm.check();
      log(`DeepSeek на связи: ${config.llmModel}`);
    } catch (err) {
      log(`DeepSeek недоступен (${(err as Error).message}). Разборы уйдут сухими фактами.`);
      llm = null;
    }
  } else {
    log('Ключ DeepSeek не задан — разборы уйдут сухими фактами.');
  }

  if (config.dryRun) {
    log('РЕЖИМ БЕЗ ОТПРАВКИ (BOT_DRY_RUN=1): сообщения печатаются в лог, '
      + 'messages.send не вызывается');
  }

  const bot = new Bot({
    groupApi, readApi, store, llm, tzOffset: config.tzOffset, log, dryRun: config.dryRun,
  });

  const longPoll = new LongPoll(
    groupApi,
    config.groupId,
    (event) => bot.handleEvent(event),
    log,
  );

  const tick = async () => {
    try {
      const sent = await bot.tick();
      if (sent) log(`Плановая рассылка: ${sent}`);
    } catch (err) {
      log(`Планировщик споткнулся: ${(err as Error).message}`);
    }
  };

  await tick();
  const timer = setInterval(tick, config.tickMinutes * 60_000);

  const shutdown = () => {
    log('Останавливаюсь');
    clearInterval(timer);
    longPoll.stop();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  log(`Планировщик каждые ${config.tickMinutes} мин. Слушаю сообщения.`);
  await longPoll.run();
}

main().catch((err: Error) => {
  console.error(`Бот не запустился: ${err.message}`);
  process.exit(1);
});
