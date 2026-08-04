/**
 * Дымовой прогон собранного приложения.
 *
 * Юнит-тесты проверяют расчёты, но не то, что приложение вообще
 * открывается: сломанный импорт, портал в `body`, SVG-диаграмма
 * с некорректным атрибутом — всё это падает только в браузере
 * и только в рантайме. Здесь демо-отчёт открывается по-настоящему,
 * обходятся все вкладки и проверяется, что консоль чистая.
 *
 * Перед запуском нужна свежая сборка:
 * `npm --prefix apps/vk-audit run build && node scripts/smoke.mjs`.
 */
import { createServer } from 'node:http';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const here = dirname(fileURLToPath(import.meta.url));
const dist = join(here, '../apps/vk-audit/dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.png': 'image/png',
};

const TABS = [
  'Сводка', 'Зоны роста', 'План', 'Контент', 'Клипы', 'Видео', 'Фото',
  'Конкуренты', 'Аудитория',
];

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const rel = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  const file = join(dist, rel === '/' ? 'index.html' : rel);
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('not found');
  }
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();
const out = await mkdtemp(join(tmpdir(), 'vk-audit-smoke-'));

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({
  viewport: { width: 540, height: 960 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});

const problems = [];
page.on('pageerror', (err) => problems.push(`исключение: ${err.message}`));
page.on('console', (msg) => {
  if (msg.type() === 'error') problems.push(`консоль: ${msg.text()}`);
});

const LAUNCH = 'vk_app_id=54693601&vk_user_id=1&vk_platform=mobile_web';
await page.goto(`http://127.0.0.1:${port}/?${LAUNCH}`, { waitUntil: 'networkidle' });
await page.getByText('Открыть демо-отчёт').click();
await page.waitForTimeout(600);

for (const tab of TABS) {
  await page.getByRole('tab', { name: tab, exact: true }).click();
  await page.waitForTimeout(220);
  console.log(`вкладка «${tab}» открылась`);
}

// печатная версия существует и не пуста
const printed = await page.evaluate(() => document.querySelector('.print-root')?.innerText?.length ?? 0);
if (printed < 500) problems.push(`печатная версия почти пуста: ${printed} знаков`);
console.log(`печатная версия: ${printed} знаков`);

// в режиме печати интерфейс скрыт, а печатный корень показан
await page.emulateMedia({ media: 'print' });
const shown = await page.evaluate(() => ({
  app: getComputedStyle(document.getElementById('root')).display,
  print: getComputedStyle(document.querySelector('.print-root')).display,
}));
if (shown.app !== 'none' || shown.print === 'none') {
  problems.push(`печатные стили не сработали: ${JSON.stringify(shown)}`);
}
await page.emulateMedia({ media: 'screen' });
console.log(`печатные стили: интерфейс ${shown.app}, отчёт ${shown.print}`);

// PDF собирается тем же путём, что и «Сохранить как PDF» в браузере
const pdf = join(out, 'report.pdf');
await page.pdf({ path: pdf, format: 'A4' });
console.log(`PDF собран: ${pdf}`);

for (const label of ['Скачать бриф', 'Скачать таблицу', 'Сохранить в PDF', 'Скопировать бриф']) {
  if (!(await page.getByText(label).count())) problems.push(`нет кнопки «${label}»`);
}

// выгрузки действительно скачиваются, а не молча падают в буфер
for (const [label, ext] of [['Скачать бриф', '.txt'], ['Скачать таблицу', '.csv']]) {
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 5000 }).catch(() => null),
    page.getByText(label).click(),
  ]);
  if (!download) {
    problems.push(`«${label}» не отдала файл`);
    continue;
  }
  const saved = join(out, download.suggestedFilename());
  await download.saveAs(saved);
  const size = (await readFile(saved)).length;
  if (!download.suggestedFilename().endsWith(ext)) {
    problems.push(`«${label}» отдала ${download.suggestedFilename()}, ждали ${ext}`);
  }
  if (size < 500) problems.push(`«${label}»: файл почти пуст (${size} байт)`);
  console.log(`${download.suggestedFilename()} — ${size} байт`);
}

await browser.close();
server.close();

if (problems.length) {
  console.error(`\nПроблемы:\n${problems.map((p) => `- ${p}`).join('\n')}`);
  process.exit(1);
}
console.log('\nвсё чисто');
