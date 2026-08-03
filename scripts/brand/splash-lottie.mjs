/**
 * Анимация экрана запуска в формате Lottie.
 *
 * ВКонтакте показывает её, пока приложение не отправило `VKWebAppInit`.
 * Требования из документации (`docs/vk/mini-apps/razrabotka-zapusk-*`):
 * 96×96, файл до 24 Кбайт, флажок «Анимация» в настройках приложения.
 *
 * Собирается кодом, а не руками в редакторе: JSON у Lottie нечитаемый,
 * и через год «поправить оттенок» в нём было бы дешевле переделать,
 * чем найти нужное число.
 *
 * Три площадки рендерят по-разному: Android — lottie-android, iOS —
 * rlottie, сайт — lottie-web. Поэтому здесь только то, что поддерживают
 * все трое: шейповые слои, градиентная заливка с анимацией точек,
 * trim path и обычные трансформации. Ни масок, ни матовых слоёв, ни 3D —
 * Android 3D на этих экранах не умеет вовсе.
 *
 *   node scripts/brand/splash-lottie.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, '../../apps/vk-audit/docs/brand');

const SIZE = 96;
const FPS = 60;
const DURATION = 150; // кадров, 2,5 секунды — цикл перелива

/** Цвета бренда в том виде, в каком их хочет Lottie: доли единицы. */
const rgb = (hex) => [
  parseInt(hex.slice(1, 3), 16) / 255,
  parseInt(hex.slice(3, 5), 16) / 255,
  parseInt(hex.slice(5, 7), 16) / 255,
];

const BLUE = rgb('#2688eb');
const VIOLET = rgb('#7c4dff');
const TEAL = rgb('#00b3a4');

/** Ключевые кадры со стандартным сглаживанием. */
const ease = (frames) => frames.map((k, i, all) => (
  i === all.length - 1
    ? { t: k.t, s: k.s }
    : { t: k.t, s: k.s, i: { x: [0.4], y: [1] }, o: { x: [0.3], y: [0] } }
));

/** Обёртка вокруг фигуры: у Lottie у каждой группы свои трансформации. */
const transform = (extra = {}) => ({
  ty: 'tr',
  p: { a: 0, k: [0, 0] },
  a: { a: 0, k: [0, 0] },
  s: { a: 0, k: [100, 100] },
  r: { a: 0, k: 0 },
  o: { a: 0, k: 100 },
  ...extra,
});

/**
 * Подложка: скруглённый квадрат с градиентом, который ездит из угла в угол.
 *
 * Перелив сделан движением точек градиента, а не сменой цветов: так его
 * одинаково понимают все три библиотеки, и файл остаётся маленьким.
 */
function background() {
  return {
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: 'fon',
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [SIZE / 2, SIZE / 2] },
      a: { a: 0, k: [0, 0] },
      s: {
        a: 1,
        k: ease([
          { t: 0, s: [82, 82] },
          { t: 22, s: [104, 104] },
          { t: 38, s: [100, 100] },
        ]),
      },
    },
    ao: 0,
    shapes: [{
      ty: 'gr',
      nm: 'plitka',
      it: [
        {
          ty: 'rc',
          d: 1,
          s: { a: 0, k: [SIZE, SIZE] },
          p: { a: 0, k: [0, 0] },
          r: { a: 0, k: 22 },
        },
        {
          ty: 'gf',
          nm: 'gradient',
          o: { a: 0, k: 100 },
          r: 1,
          t: 1,
          g: {
            p: 3,
            k: {
              a: 0,
              k: [
                0, ...BLUE,
                0.55, ...VIOLET,
                1, ...TEAL,
              ],
            },
          },
          // точки старта и конца ездят по диагонали — это и есть перелив
          s: {
            a: 1,
            k: ease([
              { t: 0, s: [-SIZE * 0.7, -SIZE * 0.7] },
              { t: 75, s: [SIZE * 0.2, SIZE * 0.5] },
              { t: 150, s: [-SIZE * 0.7, -SIZE * 0.7] },
            ]),
          },
          e: {
            a: 1,
            k: ease([
              { t: 0, s: [SIZE * 0.5, SIZE * 0.5] },
              { t: 75, s: [SIZE * 1.3, SIZE * 1.1] },
              { t: 150, s: [SIZE * 0.5, SIZE * 0.5] },
            ]),
          },
        },
        transform(),
      ],
    }],
    ip: 0,
    op: DURATION,
    st: 0,
  };
}

/** Столбики: выезжают снизу вверх, каждый со своей задержкой. */
function bar(index, { x, height, delay }) {
  const width = 12;
  // основание столбиков — там же, где у иконки: ось Y у Lottie растёт вниз,
  // поэтому «низ» это большое число, а не маленькое
  const baseY = 76;
  return {
    ddd: 0,
    ind: index,
    ty: 4,
    nm: `stolbik-${index}`,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: ease([
          { t: delay, s: [0] },
          { t: delay + 10, s: [75] },
        ]),
      },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [x, baseY] },
      a: { a: 0, k: [0, 0] },
      s: {
        a: 1,
        k: ease([
          { t: delay, s: [100, 0] },
          { t: delay + 22, s: [100, 112] },
          { t: delay + 32, s: [100, 100] },
        ]),
      },
    },
    ao: 0,
    shapes: [{
      ty: 'gr',
      nm: 'stolbik',
      it: [
        {
          ty: 'rc',
          d: 1,
          s: { a: 0, k: [width, height] },
          // якорь у основания: столбик растёт вверх, а не в обе стороны
          p: { a: 0, k: [0, -height / 2] },
          r: { a: 0, k: 5 },
        },
        {
          ty: 'fl',
          c: { a: 0, k: [1, 1, 1, 1] },
          o: { a: 0, k: 100 },
          r: 1,
        },
        transform(),
      ],
    }],
    ip: 0,
    op: DURATION,
    st: 0,
  };
}

/** Линия роста: рисуется слева направо через trim path. */
function line() {
  return {
    ddd: 0,
    ind: 5,
    ty: 4,
    nm: 'liniya',
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [0, 0] },
      a: { a: 0, k: [0, 0] },
      s: { a: 0, k: [100, 100] },
    },
    ao: 0,
    shapes: [{
      ty: 'gr',
      nm: 'put',
      it: [
        {
          ty: 'sh',
          nm: 'traektoriya',
          ks: {
            a: 0,
            k: {
              c: false,
              v: [[23, 50], [41, 39], [59, 25], [73, 20]],
              i: [[0, 0], [0, 0], [0, 0], [0, 0]],
              o: [[0, 0], [0, 0], [0, 0], [0, 0]],
            },
          },
        },
        {
          ty: 'st',
          nm: 'obvodka',
          c: { a: 0, k: [1, 1, 1, 1] },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 5 },
          lc: 2,
          lj: 2,
        },
        {
          ty: 'tm',
          nm: 'risovanie',
          s: { a: 0, k: 0 },
          e: {
            a: 1,
            k: ease([
              { t: 18, s: [0] },
              { t: 58, s: [100] },
            ]),
          },
          o: { a: 0, k: 0 },
          m: 1,
        },
        transform(),
      ],
    }],
    ip: 0,
    op: DURATION,
    st: 0,
  };
}

/** Точка на конце линии: появляется, когда линия дорисовалась. */
function dot() {
  return {
    ddd: 0,
    ind: 6,
    ty: 4,
    nm: 'tochka',
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: ease([
          { t: 54, s: [0] },
          { t: 62, s: [100] },
        ]),
      },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [73, 20] },
      a: { a: 0, k: [0, 0] },
      s: {
        a: 1,
        k: ease([
          { t: 54, s: [0, 0] },
          { t: 68, s: [118, 118] },
          { t: 80, s: [100, 100] },
        ]),
      },
    },
    ao: 0,
    shapes: [{
      ty: 'gr',
      nm: 'krug',
      it: [
        { ty: 'el', d: 1, s: { a: 0, k: [13, 13] }, p: { a: 0, k: [0, 0] } },
        { ty: 'fl', c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 100 }, r: 1 },
        transform(),
      ],
    }],
    ip: 0,
    op: DURATION,
    st: 0,
  };
}

const animation = {
  v: '5.7.4',
  fr: FPS,
  ip: 0,
  op: DURATION,
  w: SIZE,
  h: SIZE,
  nm: 'zapusk',
  ddd: 0,
  assets: [],
  layers: [
    dot(),
    line(),
    // пропорции сняты с иконки: та же ширина, те же три высоты
    bar(4, { x: 62, height: 46, delay: 20 }),
    bar(3, { x: 44, height: 32, delay: 12 }),
    bar(2, { x: 26, height: 21, delay: 4 }),
    background(),
  ],
};

await mkdir(out, { recursive: true });
const file = join(out, 'ekran-zapuska.json');
const json = JSON.stringify(animation);
await writeFile(file, json);

const kb = Buffer.byteLength(json) / 1024;
console.log(`ekran-zapuska.json — ${SIZE}×${SIZE}, ${kb.toFixed(1)} КБ, `
  + `${(DURATION / FPS).toFixed(1)} с`);
if (kb > 24) {
  console.error('Больше 24 КБ — ВКонтакте такой файл не примет.');
  process.exitCode = 1;
}
