/**
 * Обложки уровней VK Донат.
 *
 * ВКонтакте требует минимум 351×154 — рисуем вдвое крупнее, чтобы
 * на плотных экранах не мылилось. Пропорция та же.
 *
 * Уровни различаются градиентом и знаком, а не только подписью:
 * в списке они стоят друг под другом, и на глаз должно быть видно,
 * что это лестница, а не пять одинаковых карточек.
 *
 *   node scripts/brand/donut.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, '../../apps/vk-audit/docs/brand/donut');

const W = 702;
const H = 308;
const FONT = "-apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif";

const LEVELS = [
  {
    file: 'uroven-1-podderzhka.png',
    mark: '◇',
    title: 'Поддержка',
    price: '250 ₽ в месяц',
    line: 'Приложения остаются бесплатными',
    from: '#2688eb',
    to: '#7c4dff',
  },
  {
    file: 'uroven-2-razbor.png',
    mark: '◆',
    title: 'Разбор',
    price: '1000 ₽ в месяц',
    line: 'Разбор страницы раз в месяц',
    from: '#7c4dff',
    to: '#c44dff',
  },
  {
    file: 'uroven-3-partner.png',
    mark: '★',
    title: 'Партнёр',
    price: '5000 ₽ в месяц',
    line: 'Ваши задачи первыми в разработке',
    from: '#00b3a4',
    to: '#2688eb',
  },
];

function escape(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function svg(level) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${level.from}"/>
      <stop offset="100%" stop-color="${level.to}"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="${W - 70}" cy="52" r="150" fill="#ffffff" opacity="0.1"/>
  <circle cx="58" cy="${H - 30}" r="96" fill="#ffffff" opacity="0.08"/>

  <!-- подпись проекта вверху: внизу она сталкивалась с описанием уровня -->
  <text x="${W - 44}" y="62" text-anchor="end" font-family="${FONT}"
        font-size="24" font-weight="600" fill="#ffffff" opacity="0.6">
    ЖеняГенерирует
  </text>

  <text x="52" y="112" font-family="${FONT}" font-size="60" fill="#ffffff" opacity="0.85">
    ${level.mark}
  </text>

  <text x="52" y="186" font-family="${FONT}" font-size="54" font-weight="700"
        fill="#ffffff" letter-spacing="-1">${escape(level.title)}</text>

  <text x="52" y="228" font-family="${FONT}" font-size="30"
        fill="#ffffff" opacity="0.9">${escape(level.price)}</text>

  <text x="52" y="272" font-family="${FONT}" font-size="24"
        fill="#ffffff" opacity="0.72">${escape(level.line)}</text>
</svg>`;
}

await mkdir(out, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

for (const level of LEVELS) {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await page.setContent(`<body style="margin:0">${svg(level)}</body>`);
  await page.screenshot({ path: join(out, level.file) });
  await page.close();
  console.log(`${level.file} — ${W}×${H}`);
}

await browser.close();
await writeFile(join(out, '.gitattributes'), '*.png binary\n');
