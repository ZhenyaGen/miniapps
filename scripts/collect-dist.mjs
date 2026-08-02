/**
 * Кладёт собранное приложение в dist/ в корне репозитория.
 *
 * Хостинги (Cloudflare Pages, Netlify, Vercel) по умолчанию собирают из корня
 * и там же ищут результат. Настройка «root directory» есть у всех, но
 * применяется по-разному и легко теряется, поэтому проще не зависеть от неё:
 * корневая сборка работает везде без единой настройки.
 */
import { cp, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const from = join(root, 'apps/vk-audit/dist');
const to = join(root, 'dist');

await rm(to, { recursive: true, force: true });
await cp(from, to, { recursive: true });

console.log(`Сборка приложения скопирована в ${to}`);
