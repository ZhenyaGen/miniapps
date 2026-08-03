/**
 * Кладёт собранное приложение в dist/ в корне репозитория.
 *
 * Хостинги (Cloudflare Pages, Netlify, Vercel) по умолчанию собирают из корня
 * и там же ищут результат. Настройка «root directory» есть у всех, но
 * применяется по-разному и легко теряется, поэтому проще не зависеть от неё:
 * корневая сборка работает везде без единой настройки.
 */
import { cp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const from = join(root, 'apps/vk-audit/dist');
const to = join(root, 'dist');

/**
 * Знак охраны авторского права — статья 1300 ГК РФ.
 *
 * Приписывается здесь, а не сборщиком: минификатор вырезает комментарии
 * из готовых файлов, в том числе помеченные `/*!`. Так знак едет вместе
 * с кодом, и его удаление из копии — отдельное нарушение, которое
 * доказать проще самого копирования.
 */
const COPYRIGHT = `/*!
 * Аудит страницы ВК — мини-приложение проекта «ЖеняГенерирует».
 * © 2026 Евгений Тюрин · https://vk.ru/ea_tyurin
 * Все права защищены. Использование кода в своих продуктах — только
 * с письменного разрешения автора: https://vk.me/ea_tyurin
 * Исходники: https://github.com/ZhenyaGen/miniapps
 */
`;

await rm(to, { recursive: true, force: true });
await cp(from, to, { recursive: true });

const assets = join(to, 'assets');
for (const name of await readdir(assets)) {
  if (!name.endsWith('.js') && !name.endsWith('.css')) continue;
  const file = join(assets, name);
  await writeFile(file, COPYRIGHT + await readFile(file, 'utf8'));
}

console.log(`Сборка приложения скопирована в ${to}`);
