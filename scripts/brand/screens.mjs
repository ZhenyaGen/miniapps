/**
 * Скриншоты приложения для карточки в каталоге ВКонтакте.
 *
 * Снимает собранную версию из `apps/vk-audit/dist` в демо-режиме: без входа,
 * на вымышленном сообществе — в каталог нельзя выкладывать чужую статистику.
 *
 * Перед запуском нужна свежая сборка:
 * `npm --prefix apps/vk-audit run build && node scripts/brand/screens.mjs`.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { mkdir } from 'node:fs/promises';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const here = dirname(fileURLToPath(import.meta.url));
const dist = join(here, '../../apps/vk-audit/dist');
const out = join(here, '../../apps/vk-audit/docs/brand/screens');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.png': 'image/png',
};

// Тот же размер, что у сторис: 1080×1920 — вертикальный экран телефона.
// Снимаем в 540×960 при удвоенной плотности, иначе VKUI рисует планшетную вёрстку.
const WIDTH = 540;
const HEIGHT = 960;

const SHOTS = [
  { name: '1-start.png', tab: null, start: true },
  { name: '2-svodka.png', tab: 'Сводка' },
  { name: '3-zony-rosta.png', tab: 'Зоны роста' },
  { name: '4-plan.png', tab: 'План' },
  { name: '5-kontent.png', tab: 'Контент' },
  { name: '6-konkurenty.png', tab: 'Конкуренты', rivals: true },
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

await mkdir(out, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 2,
  colorScheme: 'light',
  isMobile: true,
  hasTouch: true,
});

// параметры запуска — чтобы приложение считало, что открыто внутри ВК:
// иначе на первом экране рисуется подсказка про возврат на localhost:8910,
// а её в каталоге видеть никто не должен
const LAUNCH = 'vk_app_id=54693601&vk_platform=mobile_web&vk_is_app_user=1';
await page.goto(`http://127.0.0.1:${port}/?${LAUNCH}`, { waitUntil: 'networkidle' });

for (const shot of SHOTS) {
  if (shot.start) {
    // первый экран снимаем до входа в демо
  } else {
    if (await page.getByText('Открыть демо-отчёт').isVisible()) {
      await page.getByText('Открыть демо-отчёт').click();
      await page.waitForTimeout(600);
    }
    await page.getByRole('tab', { name: shot.tab, exact: true }).click();
    await page.waitForTimeout(400);
    if (shot.rivals) {
      await page.getByText('Показать демо-сравнение').click();
      await page.waitForTimeout(800);
    }
  }
  // курсор уводим за пределы кадра, иначе вкладка остаётся подсвеченной наведением
  await page.mouse.move(WIDTH - 1, HEIGHT - 1);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(out, shot.name) });
  console.log(`${shot.name} — ${WIDTH * 2}×${HEIGHT * 2}`);
}

await browser.close();
server.close();
