/**
 * Сторис-инструкция: восемь кадров 1080×1920 с настоящими экранами приложения.
 *
 * Скриншоты берутся готовыми из `apps/vk-audit/docs/brand/screens` —
 * их делает `screens.mjs`. Здесь они вставляются в рамку телефона и
 * подписываются, поэтому кадры пересобираются после каждой правки
 * интерфейса вместе со скриншотами:
 *
 *   npm --prefix apps/vk-audit run build
 *   node scripts/brand/screens.mjs
 *   node scripts/brand/story-guide.mjs
 */
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const here = dirname(fileURLToPath(import.meta.url));
const screens = join(here, '../../apps/vk-audit/docs/brand/screens');
const out = join(here, '../../apps/vk-audit/docs/brand/storis-instrukciya');

const W = 1080;
const H = 1920;

// Телефон «выглядывает» снизу: показываем верх экрана, а не весь кадр целиком —
// целиком он ужался бы до нечитаемого.
const PHONE = { x: 150, y: 700, w: 780, h: 1320, radius: 56, border: 10 };

const FONT = "-apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif";

/**
 * Пары градиента: шаги идут синим, обложка и призыв — фиолетовым,
 * чтобы начало и конец серии отличались от середины на глаз.
 */
const GRADIENTS = {
  brand: ['#2688eb', '#7c4dff'],
  deep: ['#7c4dff', '#00b3a4'],
};

const SLIDES = [
  {
    name: '1-oblozhka.png',
    gradient: 'deep',
    chip: 'ЖеняГенерирует',
    title: ['Разбор страницы', 'ВК за минуту'],
    lead: ['Что мешает ей расти —', 'списком, с цифрами'],
    screen: '2-svodka.png',
  },
  {
    name: '2-shag-ssylka.png',
    chip: 'Шаг 1',
    title: ['Вставьте ссылку', 'на свою страницу'],
    lead: ['Подойдёт и профиль,', 'и сообщество — любое открытое'],
    screen: '1-start.png',
  },
  {
    name: '3-shag-svodka.png',
    chip: 'Шаг 2',
    title: ['Шесть цифр —', 'и что чинить первым'],
    lead: ['Охват, частота, вовлечённость,', 'сколько дней страница молчит'],
    screen: '2-svodka.png',
  },
  {
    name: '4-shag-zony.png',
    chip: 'Шаг 3',
    title: ['Зоны роста', 'с доказательствами'],
    lead: ['Тапните строку — внутри цифра,', 'причина и что сделать'],
    screen: '3-zony-rosta.png',
  },
  {
    name: '5-shag-plan.png',
    chip: 'Шаг 4',
    title: ['План на 4 недели', 'с галочками'],
    lead: ['Первая неделя — упаковка:', 'её правят за вечер'],
    screen: '4-plan.png',
  },
  {
    name: '6-shag-kontent.png',
    chip: 'Шаг 5',
    title: ['Форматы и время', 'публикаций'],
    lead: ['Видно, какой формат заходит,', 'а вы им почти не пользуетесь'],
    screen: '5-kontent.png',
  },
  {
    name: '7-shag-konkurenty.png',
    chip: 'Шаг 6',
    title: ['Сравнение', 'с конкурентами'],
    lead: ['До пяти страниц, медианы', 'за 90 дней — где отстаёте'],
    screen: '6-konkurenty.png',
  },
  {
    name: '8-prizyv.png',
    gradient: 'deep',
    chip: 'Бесплатно',
    title: ['Проверьте', 'свою страницу'],
    lead: ['Ссылка в описании профиля.', 'Разбор занимает минуту'],
    link: 'zhenyagen.github.io/miniapps',
    // на кадре с адресом телефон короче: плашка со ссылкой должна лечь под ним,
    // а не поверх экрана
    phone: { x: 230, y: 760, w: 620, h: 830 },
    screen: '3-zony-rosta.png',
  },
];

function escape(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function slideSvg(slide, imageData) {
  const [from, to] = GRADIENTS[slide.gradient ?? 'brand'];
  const chipWidth = 40 + slide.chip.length * 26;
  const phone = { ...PHONE, ...(slide.phone ?? {}) };

  const title = slide.title
    .map((line, i) => `<text x="90" y="${404 + i * 96}" font-family="${FONT}" font-size="80"
        font-weight="700" fill="#ffffff" letter-spacing="-2">${escape(line)}</text>`)
    .join('\n');

  const lead = slide.lead
    .map((line, i) => `<text x="90" y="${572 + i * 56}" font-family="${FONT}" font-size="40"
        fill="#ffffff" opacity="0.82">${escape(line)}</text>`)
    .join('\n');

  // Адрес на кадре призыва: его переписывают руками, поэтому крупно и отдельно.
  const link = slide.link
    ? `<g transform="translate(90, ${phone.y + phone.h + 60})">
         <rect width="900" height="132" rx="32" fill="#ffffff"/>
         <text x="450" y="84" text-anchor="middle" font-family="${FONT}" font-size="44"
               font-weight="700" fill="${from}">${escape(slide.link)}</text>
       </g>`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/><stop offset="100%" stop-color="${to}"/>
    </linearGradient>
    <clipPath id="screen">
      <rect x="${phone.x + phone.border}" y="${phone.y + phone.border}"
            width="${phone.w - phone.border * 2}" height="${phone.h - phone.border * 2}"
            rx="${phone.radius - phone.border}"/>
    </clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="920" cy="200" r="330" fill="#ffffff" opacity="0.1"/>
  <circle cx="90" cy="1180" r="240" fill="#ffffff" opacity="0.07"/>

  <g transform="translate(90, 190)">
    <rect width="${chipWidth}" height="72" rx="36" fill="#ffffff" opacity="0.22"/>
    <text x="${chipWidth / 2}" y="48" text-anchor="middle" font-family="${FONT}"
          font-size="34" font-weight="600" fill="#ffffff">${escape(slide.chip)}</text>
  </g>

  ${title}
  ${lead}

  <rect x="${phone.x}" y="${phone.y}" width="${phone.w}" height="${phone.h}"
        rx="${phone.radius}" fill="#ffffff"/>
  <image href="${imageData}" x="${phone.x + phone.border}" y="${phone.y + phone.border}"
         width="${phone.w - phone.border * 2}" clip-path="url(#screen)"
         preserveAspectRatio="xMidYMin slice"/>
  ${link}
</svg>`;
}

await mkdir(out, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

for (const slide of SLIDES) {
  const png = await readFile(join(screens, slide.screen));
  const svg = slideSvg(slide, `data:image/png;base64,${png.toString('base64')}`);
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await page.setContent(`<body style="margin:0">${svg}</body>`);
  await page.screenshot({ path: join(out, slide.name) });
  await page.close();
  console.log(`${slide.name} — ${W}×${H}`);
}

await browser.close();
await writeFile(join(out, '.gitattributes'), '*.png binary\n');
