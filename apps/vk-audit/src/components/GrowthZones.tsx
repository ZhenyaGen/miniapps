import type { CSSProperties } from 'react';
import { Accordion, Div, Footnote, Group, Header, Placeholder, Text } from '@vkontakte/vkui';

import type { Finding, Severity } from '../engine/types';

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

export function GrowthZones({ findings }: { findings: Finding[] }) {
  if (!findings.length) {
    return (
      <Group>
        <Placeholder title="Зон роста не нашлось">
          Правила не нашли, к чему придраться. Так тоже бывает — сверьтесь
          с динамикой через месяц.
        </Placeholder>
      </Group>
    );
  }

  return (
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
  );
}
