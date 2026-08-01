import { Card, CardGrid, Div, Footnote, Group, Header, MiniInfoCell, SimpleCell, Title } from '@vkontakte/vkui';

import type { Report } from '../App';
import { f } from '../engine/util';

function Kpi({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Card mode="shadow" style={{ padding: 12, minWidth: 0 }}>
      <Footnote style={{ color: 'var(--vkui--color_text_secondary)' }}>{label}</Footnote>
      <Title level="2" style={{ margin: '4px 0 2px' }}>{value}</Title>
      {hint && <Footnote style={{ color: 'var(--vkui--color_text_tertiary)' }}>{hint}</Footnote>}
    </Card>
  );
}

export function Summary({ report }: { report: Report }) {
  const m = report.metrics;
  const top = report.findings.slice(0, 5);

  return (
    <>
      <Group header={<Header>Ключевые цифры</Header>}>
        <CardGrid size="s">
          <Kpi
            label={m.audience_label}
            value={f(m.audience, 0)}
            hint={m.views_per_audience ? `охват ${f(m.views_per_audience)}% базы` : undefined}
          />
          <Kpi label="Постов за период" value={String(m.posts_total)} hint={`${f(m.per_week)} в неделю`} />
          <Kpi
            label={m.er_basis_label}
            value={`${f(m.er, 2)}%`}
            hint={`медиана ${f(m.er_median, 2)}%`}
          />
          <Kpi label="Просмотров на пост" value={f(m.avg.views, 0)} />
          <Kpi label="Реакций на пост" value={f(m.avg.engagement, 1)} />
          <Kpi
            label="Молчит"
            value={`${f(m.silent_days, 0)} дн.`}
            hint={m.gap.max ? `макс. пауза ${f(m.gap.max, 0)} дн.` : undefined}
          />
        </CardGrid>
      </Group>

      {top.length > 0 && (
        <Group header={<Header>Что чинить первым</Header>}>
          {top.map((item) => (
            <SimpleCell
              key={item.id}
              multiline
              before={<Title level="3" style={{ width: 24, textAlign: 'center' }}>{item.rank}</Title>}
              subtitle={item.evidence}
            >
              {item.title}
            </SimpleCell>
          ))}
        </Group>
      )}

      <Group header={<Header>Цели на 90 дней</Header>}>
        {report.targets.map((t) => (
          <MiniInfoCell key={t.label} textWrap="full">
            {`${t.label}: ${t.now} → ${t.goal}`}
          </MiniInfoCell>
        ))}
      </Group>

      <Group header={<Header>Упаковка страницы</Header>}>
        {m.profile_check.map((check) => (
          <SimpleCell
            key={check.key}
            multiline
            before={<span style={{ fontSize: 18 }}>{check.ok ? '✅' : '⛔️'}</span>}
            subtitle={check.ok ? undefined : check.hint}
          >
            {check.label}
          </SimpleCell>
        ))}
      </Group>

      {m.warnings.length > 0 && (
        <Group header={<Header>Что осталось за кадром</Header>}>
          <Div>
            {m.warnings.map((warning) => (
              <Footnote
                key={warning}
                style={{ color: 'var(--vkui--color_text_secondary)', display: 'block', marginBottom: 8 }}
              >
                {warning}
              </Footnote>
            ))}
          </Div>
        </Group>
      )}
    </>
  );
}
