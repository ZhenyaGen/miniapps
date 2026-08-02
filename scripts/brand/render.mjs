/**
 * Рендер иконок и обложки в PNG нужных размеров.
 *
 * Картинки для каталога ВКонтакте загружаются руками в настройках приложения,
 * поэтому лежат готовыми файлами: `node scripts/brand/render.mjs`.
 */
import { readFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, '../../apps/vk-audit/docs/brand');

// Размеры — из настроек приложения на dev.vk.ru, раздел «Оформление».
const TARGETS = [
  { svg: 'icon.svg', name: 'ikonka-universalnaya-576.png', width: 576, height: 576 },
  { svg: 'icon.svg', name: 'ikonka-katalog-278.png', width: 278, height: 278 },
  { svg: 'icon.svg', name: 'ikonka-malenkaya-150.png', width: 150, height: 150 },
  { svg: 'icon.svg', name: 'ekran-zapuska-96.png', width: 96, height: 96 },
  { svg: 'banner.svg', name: 'oblozhka-1590x400.png', width: 1590, height: 400 },
  { svg: 'snippet.svg', name: 'bolshoy-snippet-1120x630.png', width: 1120, height: 630 },
];

await mkdir(out, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

for (const target of TARGETS) {
  const svg = await readFile(join(here, target.svg), 'utf8');
  const page = await browser.newPage({
    viewport: { width: target.width, height: target.height },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<body style="margin:0">${svg.replace(/width="\d+" height="\d+"/, `width="${target.width}" height="${target.height}"`)}</body>`,
  );
  await page.screenshot({ path: join(out, target.name), omitBackground: true });
  await page.close();
  console.log(`${target.name} — ${target.width}×${target.height}`);
}

await browser.close();
