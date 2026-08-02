import { Fragment } from 'react';
import { Footnote } from '@vkontakte/vkui';

import { DOW_LABELS } from '../engine/metrics';
import type { HeatCell } from '../engine/types';

/** Насыщенность клетки — доля от лучшего ER в сетке. */
function cellStyle(cell: HeatCell, max: number) {
  if (!cell.n || !cell.avg_er) {
    return { background: 'var(--vkui--color_background_secondary)', color: 'var(--vkui--color_text_tertiary)' };
  }
  const strength = Math.min(cell.avg_er / max, 1);
  return {
    background: `color-mix(in srgb, var(--vkui--color_background_accent) ${Math.round(20 + strength * 80)}%, transparent)`,
    color: strength > 0.55 ? 'var(--vkui--color_text_contrast)' : 'var(--vkui--color_text_primary)',
  };
}

export function Heatmap({ grid }: { grid: HeatCell[][] }) {
  const max = Math.max(...grid.flat().map((c) => c.avg_er), 0.0001);

  return (
    <>
      <div className="heatmap">
        <div />
        {Array.from({ length: 8 }, (_, slot) => (
          <div key={slot} className="heatmap__head">{slot * 3}</div>
        ))}
        {grid.map((row, dow) => (
          <Fragment key={dow}>
            <div className="heatmap__label">{DOW_LABELS[dow]}</div>
            {row.map((cell, slot) => (
              <div
                key={`${dow}-${slot}`}
                className="heatmap__cell"
                style={cellStyle(cell, max)}
                title={cell.n ? `${cell.n} постов, ER ${cell.avg_er.toFixed(2)}%` : 'нет постов'}
              >
                {cell.n || ''}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      <Footnote style={{ color: 'var(--vkui--color_text_secondary)', marginTop: 8, display: 'block' }}>
        Цифра в клетке — сколько постов вышло в этот трёхчасовой слот, насыщенность — вовлечённость.
      </Footnote>
    </>
  );
}
