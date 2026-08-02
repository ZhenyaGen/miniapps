import { Accordion, Div, Footnote, Group, Header, Placeholder, Text } from '@vkontakte/vkui';

import type { Finding, Severity } from '../engine/types';

const SEVERITY_LABEL: Record<Severity, string> = {
  high: 'критично',
  mid: 'важно',
  low: 'по мелочи',
};

const SEVERITY_COLOR: Record<Severity, string> = {
  high: 'var(--vkui--color_text_negative)',
  mid: 'var(--vkui--color_text_accent)',
  low: 'var(--vkui--color_text_secondary)',
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
      {findings.map((item) => (
        <Accordion key={item.id}>
          <Accordion.Summary
            multiline
            subtitle={(
              <span style={{ color: SEVERITY_COLOR[item.severity] }}>
                {`${item.area} · ${SEVERITY_LABEL[item.severity]}`}
                {item.blocker ? ' · блокирует остальное' : ''}
              </span>
            )}
          >
            {`${item.rank}. ${item.title}`}
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
              <Footnote style={{ color: 'var(--vkui--color_text_secondary)' }}>
                {`Цель: ${item.kpi} · неделя ${item.stage} плана`}
              </Footnote>
            </Div>
          </Accordion.Content>
        </Accordion>
      ))}
    </Group>
  );
}
