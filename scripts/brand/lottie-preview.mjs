/**
 * Раскладка кадров Lottie-анимации в один PNG — чтобы её было видно
 * глазами, не заливая файл на сторонний сайт.
 *
 * Рендерит той же библиотекой, что и десктопный сайт ВКонтакте
 * (`lottie-web`), поэтому «работает здесь» означает «работает в вебе».
 * Android и iOS используют другие библиотеки — их проверять отдельно,
 * ссылки в `docs/vk/mini-apps/razrabotka-zapusk-ekran-zapuska-*`.
 *
 *   npm i -D lottie-web && node scripts/brand/lottie-preview.mjs
 */
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, '../../apps/vk-audit/docs/brand/ekran-zapuska.json');
const target = join(here, '../../apps/vk-audit/docs/brand/ekran-zapuska-kadry.png');
const player = join(here, '../../node_modules/lottie-web/build/player/lottie.min.js');

// восемь кадров по всей длине: видно и сборку иконки, и ход перелива
const FRAMES = [0, 12, 24, 36, 52, 75, 105, 140];
const CELL = 96;
const SCALE = 2;

const [json, lottieJs] = await Promise.all([
  readFile(source, 'utf8'),
  readFile(player, 'utf8'),
]);

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({
  viewport: { width: CELL * FRAMES.length, height: CELL + 26 },
  deviceScaleFactor: SCALE,
});

await page.setContent(`<body style="margin:0;background:#0f1116;display:flex">
  ${FRAMES.map((f) => `<div style="width:${CELL}px">
      <div id="f${f}" style="width:${CELL}px;height:${CELL}px"></div>
      <div style="font:11px -apple-system,sans-serif;color:#7d8590;text-align:center;padding-top:6px">
        кадр ${f}
      </div>
    </div>`).join('')}
</body>`);

await page.addScriptTag({ content: lottieJs });
await page.evaluate(([data, frames]) => {
  for (const frame of frames) {
    const anim = window.lottie.loadAnimation({
      container: document.getElementById(`f${frame}`),
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: JSON.parse(data),
    });
    anim.goToAndStop(frame, true);
  }
}, [json, FRAMES]);

await page.waitForTimeout(400);
await page.screenshot({ path: target });
await browser.close();

console.log(`ekran-zapuska-kadry.png — ${FRAMES.length} кадров`);
