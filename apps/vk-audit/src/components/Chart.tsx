/**
 * Диаграммы — своим SVG, без библиотек.
 *
 * Готовая библиотека графиков весит больше, чем всё приложение вместе
 * с движком, а нужны здесь две формы: динамика по месяцам и сравнение
 * нескольких корзин. Обе рисуются десятком тегов.
 *
 * Цвета берутся из палитры в `index.css` в формате HSL-компонент,
 * поэтому тёмная тема работает сама.
 */

import type { CSSProperties } from 'react';

import { f } from '../engine/util';

export interface Point {
  label: string;
  value: number;
  /** Подпись под значением: «12 клипов», «8 постов». */
  note?: string;
}

const W = 320;
const H = 132;
const PAD_L = 4;
const PAD_R = 4;
const PAD_T = 16;
const PAD_B = 22;

const svgStyle: CSSProperties = { width: '100%', height: 'auto', display: 'block', overflow: 'visible' };

/** Подписи по оси X: первая, последняя и середина — иначе они слипаются. */
function axisLabels(count: number): Set<number> {
  if (count <= 3) return new Set(Array.from({ length: count }, (_, i) => i));
  return new Set([0, Math.floor((count - 1) / 2), count - 1]);
}

/**
 * Динамика: линия с заливкой под ней.
 *
 * Ноль на оси не показывается: разговор всегда про «выросло или упало»,
 * а не про абсолютную высоту столбика. Зато подписано, между какими
 * значениями идёт линия.
 */
export function LineChart({
  points, color = 'var(--accent-blue)', unit = '', active, onSelect,
}: {
  points: Point[];
  color?: string;
  unit?: string;
  /** Выбранная точка — её кружок крупнее и подписана. */
  active?: number;
  /** Нажатие по точке. Без него график остаётся картинкой. */
  onSelect?: (index: number) => void;
}) {
  if (points.length < 2) return null;

  const values = points.map((p) => p.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || max || 1;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;

  const x = (i: number) => PAD_L + (innerW * i) / (points.length - 1);
  const y = (v: number) => PAD_T + innerH - ((v - min) / span) * innerH;

  const line = points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const area = `${line} L${x(points.length - 1).toFixed(1)},${PAD_T + innerH} L${PAD_L},${PAD_T + innerH} Z`;
  const show = axisLabels(points.length);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={svgStyle} role="img" aria-label="динамика по месяцам">
      <path d={area} fill={`hsl(${color} / 0.14)`} />
      <path d={line} fill="none" stroke={`hsl(${color})`} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {points.map((p, i) => (
        <circle
          key={p.label}
          cx={x(i)}
          cy={y(p.value)}
          r={i === (active ?? points.length - 1) ? 5 : 2.5}
          fill={`hsl(${color})`}
        />
      ))}
      {/* прозрачные полосы во всю высоту: попасть пальцем в кружок
          радиусом три пикселя невозможно, а в полосу — легко */}
      {onSelect && points.map((p, i) => (
        <rect
          key={`hit-${p.label}`}
          x={x(i) - (innerW / (points.length - 1)) / 2}
          y={0}
          width={innerW / (points.length - 1)}
          height={H}
          fill="transparent"
          style={{ cursor: 'pointer' }}
          onClick={() => onSelect(i)}
        />
      ))}
      {/* крайние значения подписаны цифрами: без них график только про форму */}
      <text x={PAD_L} y={PAD_T - 5} fontSize="10" fill="var(--vkui--color_text_secondary)">
        {`${f(points[0].value, 0)}${unit}`}
      </text>
      <text
        x={W - PAD_R}
        y={PAD_T - 5}
        fontSize="10"
        textAnchor="end"
        fill="var(--vkui--color_text_primary)"
        fontWeight="600"
      >
        {`${f(points[points.length - 1].value, 0)}${unit}`}
      </text>
      {points.map((p, i) => (show.has(i) ? (
        <text
          key={`x-${p.label}`}
          x={x(i)}
          y={H - 6}
          fontSize="9.5"
          textAnchor={i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle'}
          fill="var(--vkui--color_text_secondary)"
        >
          {p.label}
        </text>
      ) : null))}
    </svg>
  );
}

/**
 * Сравнение корзин: столбики с подписями.
 *
 * Лучшая корзина красится отдельно — на телефоне это читается быстрее,
 * чем сравнение высот на глаз.
 */
export function ColumnChart({ points, color = 'var(--accent-blue)', best = 'var(--accent-green)', unit = '' }: {
  points: Point[];
  color?: string;
  best?: string;
  unit?: string;
}) {
  if (points.length < 2) return null;

  const max = Math.max(...points.map((p) => p.value), 1);
  const topIndex = points.reduce((bi, p, i) => (p.value > points[bi].value ? i : bi), 0);
  const innerH = H - PAD_T - PAD_B;
  const step = (W - PAD_L - PAD_R) / points.length;
  const barW = Math.min(step * 0.56, 38);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={svgStyle} role="img" aria-label="сравнение по корзинам">
      {points.map((p, i) => {
        const height = Math.max((p.value / max) * innerH, p.value > 0 ? 3 : 0);
        const cx = PAD_L + step * i + step / 2;
        return (
          <g key={p.label}>
            <rect
              x={cx - barW / 2}
              y={PAD_T + innerH - height}
              width={barW}
              height={height}
              rx="4"
              fill={`hsl(${i === topIndex ? best : color} / ${i === topIndex ? 1 : 0.55})`}
            />
            <text
              x={cx}
              y={PAD_T + innerH - height - 4}
              fontSize="10"
              textAnchor="middle"
              fill="var(--vkui--color_text_primary)"
              fontWeight="600"
            >
              {`${f(p.value, 0)}${unit}`}
            </text>
            <text x={cx} y={H - 12} fontSize="9" textAnchor="middle" fill="var(--vkui--color_text_secondary)">
              {p.label}
            </text>
            {p.note && (
              <text x={cx} y={H - 2} fontSize="8.5" textAnchor="middle" fill="var(--vkui--color_text_tertiary)">
                {p.note}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
