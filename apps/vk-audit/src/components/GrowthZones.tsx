import type { CSSProperties } from 'react';
import { Accordion, Div, Footnote, Group, Header, Placeholder, Text } from '@vkontakte/vkui';

import type { Finding, Severity } from '../engine/types';
import type { Gap } from '../report/gaps';

const SEVERITY_LABEL: Record<Severity, string> = {
  high: 'критично',
  mid: 'важно',
  low: 'по мелочи',
};

const SEVERITY_COLOR: Record<Severity, string> = {
  high: 'var(--accent-red)',
  mid: 'var(--accent-amber)',
  low: 'var(--accent-teal)',
};

/**
 * Чего нет — отдельным списком под зонами роста.
 *
 * Зоны роста говорят, что сломано; этот блок — что просто не заведено.
 * Отсутствие в метрики не попадает вовсе (нет опросов — нет и строки
 * про опросы), поэтому и живёт отдельно.
 */
function Gaps({ gaps }: { gaps: Gap[] }) {
  if (!gaps.length) return null;
  return (
    <Group header={<Header subtitle="это не поломки — это то, что не заведено">
      Чего на странице нет
    </Header>}
    >
      {gaps.map((gap, i) => (
        <Accordion key={gap.key}>
          <Accordion.Summary
            multiline
            className={`rise rise-${Math.min(i + 1, 6)}`}
            subtitle={gap.detail}
          >
            {gap.label}
          </Accordion.Summary>
          <Accordion.Content>
            <Div>
              <Footnote style={{ color: 'var(--vkui--color_text_secondary)', display: 'block' }}>
                {`Что это дало бы: ${gap.gain}`}
              </Footnote>
            </Div>
          </Accordion.Content>
        </Accordion>
      ))}
    </Group>
  );
}

export function GrowthZones({ findings, gaps = [] }: { findings: Finding[]; gaps?: Gap[] }) {
  if (!findings.length) {
    return (
      <>
        <Group>
          <Placeholder title="Зон роста не нашлось">
            Правила не нашли, к чему придраться. Так тоже бывает — сверьтесь
            с динамикой через месяц.
          </Placeholder>
        </Group>
        <Gaps gaps={gaps} />
      </>
    );
  }

  return (
    <>
      <Group header={<Header>{`Найдено зон роста: ${findings.length}`}</Header>}>
        {findings.map((item, i) => (
          <Accordion key={item.id}>
            <Accordion.Summary
              multiline
              className={`rise rise-${Math.min(i + 1, 6)}`}
              before={(
                <div
                  className="zone-rank"
                  style={{ '--badge-color': SEVERITY_COLOR[item.severity] } as CSSProperties}
                >
                  {item.rank}
                </div>
              )}
              subtitle={(
                <span
                  className="badge"
                  style={{ '--badge-color': SEVERITY_COLOR[item.severity] } as CSSProperties}
                >
                  {`${item.area} · ${SEVERITY_LABEL[item.severity]}`}
                  {item.blocker ? ' · блокирует остальное' : ''}
                </span>
              )}
            >
              {item.title}
            </Accordion.Summary>
            <Accordion.Content>
              <Div>
                <Text weight="2">{item.evidence}</Text>
                <Footnote style={{ color: 'var(--vkui--color_text_secondary)', display: 'block', margin: '8px 0 12px' }}>
                  {item.why}
                </Footnote>
                <Text weight="2" style={{ display: 'block', marginBottom: 4 }}>Что делать</Text>
                <ul style={{ margin: '0 0 12px', paddingLeft: 20 }}>
                  {item.actions.map((action) => (
                    <li key={action} style={{ marginBottom: 4 }}>
                      <Text>{action}</Text>
                    </li>
                  ))}
                </ul>
                <div
                  className="badge"
                  style={{ '--badge-color': 'var(--accent-green)' } as CSSProperties}
                >
                  {`Цель: ${item.kpi}`}
                </div>
                <Footnote style={{ color: 'var(--vkui--color_text_tertiary)', display: 'block', marginTop: 8 }}>
                  {`Неделя ${item.stage} плана`}
                </Footnote>
              </Div>
            </Accordion.Content>
          </Accordion>
        ))}
      </Group>
      <Gaps gaps={gaps} />
    </>
  );
}
