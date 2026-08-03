/**
 * Предпросмотр разбора: собрать и напечатать то, что ушло бы в личку.
 *
 *   npm run preview -- vk.com/my_group
 *   npm run preview -- vk.com/my_group месяц
 *
 * Ничего не отправляет и не пишет в подписки. Нужен, чтобы прочитать
 * письмо целиком до того, как его получит первый человек: у модели
 * бывает своё представление о том, что такое «коротко и по делу».
 */

import { loadConfig } from './config';
import { buildDigest } from './digest';
import { DeepSeek } from './deepseek';
import type { Period, Subscription } from './store';
import { PERIOD_DAYS } from './store';
import { ServerApi } from './vk';

function parsePeriod(raw?: string): Period {
  return raw?.toLowerCase().startsWith('мес') || raw === 'month' ? 'month' : 'week';
}

async function main(): Promise<void> {
  const target = process.argv[2]?.trim();
  if (!target) {
    console.error('Укажите страницу: npm run preview -- vk.com/my_group [неделя|месяц]');
    process.exit(1);
  }

  const config = loadConfig();
  const readApi = new ServerApi(config.serviceToken);
  const period = parsePeriod(process.argv[3]);

  let llm: DeepSeek | null = null;
  if (config.llmKey) {
    llm = new DeepSeek({ key: config.llmKey, base: config.llmBase, model: config.llmModel });
  } else {
    console.log('Ключа DeepSeek нет — покажу запасной сухой текст.\n');
  }

  // подписка на один раз, в файл не попадает: предпросмотр ничего не меняет
  const subscription: Subscription = {
    userId: 0,
    target,
    period,
    lastSentAt: 0,
    createdAt: Math.floor(Date.now() / 1000),
    active: true,
    failures: 0,
  };

  console.log(`Собираю разбор «${target}» за ${PERIOD_DAYS[period]} дней…\n`);
  const digest = await buildDigest(readApi, subscription, llm, config.tzOffset);

  console.log('─'.repeat(60));
  console.log(digest.text);
  console.log('─'.repeat(60));
  console.log(`\nСтраница: ${digest.title}`);
  console.log(`Текст писал: ${digest.usedLLM ? config.llmModel : 'запасной шаблон, без модели'}`);
  console.log(`Длина: ${digest.text.length} знаков`
    + `${digest.text.length > 4000 ? ' — уйдёт частями, ВК режет по 4000' : ''}`);
  console.log(`Запросов к API: ${readApi.calls}`);
}

main().catch((err: Error) => {
  console.error(`Не собралось: ${err.message}`);
  process.exit(1);
});
