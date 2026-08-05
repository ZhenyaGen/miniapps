import { useState, type CSSProperties } from 'react';
import { Div, Footnote, Group, Header, SimpleCell } from '@vkontakte/vkui';

import type { Report } from '../App';
import type { Severity } from '../engine/types';
import { f } from '../engine/util';
import { LineChart } from './Chart';
import { plural } from './plural';

/** Цвета берутся из палитры в index.css — там же светлая и тёмная темы. */
const SEVERITY_COLOR: Record<Severity, string> = {
  high: 'var(--accent-red)',
  mid: 'var(--accent-amber)',
  low: 'var(--accent-teal)',
};

function Kpi({ icon, label, value, hint, color, index }: {
  icon: string;
  label: string;
  value: string;
  hint?: string;
  color: string;
  index: number;
}) {
  return (
    <div
      className={`kpi rise rise-${index}`}
      style={{ '--kpi-color': color } as CSSProperties}
    >
      <span className="kpi__icon">{icon}</span>
      <div className="kpi__value">{value}</div>
      <div className="kpi__label">{label}</div>
      {hint && <div className="kpi__hint">{hint}</div>}
    </div>
  );
}

export function Summary({ report, onOpenContent }: {
  report: Report;
  /** Переход на «Контент»: график — это вход в разбор, а не картинка. */
  onOpenContent?: () => void;
}) {
  const m = report.metrics;
  const top = report.findings.slice(0, 5);
  // по умолчанию выбран последний месяц: он и есть «как сейчас»
  const [month, setMonth] = useState(Math.max(m.monthly.length - 1, 0));
  const picked = m.monthly[month] ?? m.monthly[m.monthly.length - 1];

  return (
    <>
      <Group header={<Header>Ключевые цифры</Header>}>
        <Div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Kpi
            index={1}
            icon="👥"
            color="var(--accent-blue)"
            label={m.audience_label}
            value={f(m.audience, 0)}
            hint={m.views_per_audience ? `охват ${f(m.views_per_audience)}% базы` : undefined}
          />
          <Kpi
            index={2}
            icon="📝"
            color="var(--accent-violet)"
            label="Постов за период"
            value={String(m.posts_total)}
            hint={`${f(m.per_week)} в неделю`}
          />
          <Kpi
            index={3}
            icon="🔥"
            color={m.er >= 3 ? 'var(--accent-green)' : m.er >= 1 ? 'var(--accent-amber)' : 'var(--accent-red)'}
            label={m.er_basis_label}
            value={`${f(m.er, 2)}%`}
            hint={`медиана ${f(m.er_median, 2)}%`}
          />
          <Kpi
            index={4}
            icon="👁"
            color="var(--accent-teal)"
            label="Просмотров на пост"
            value={f(m.avg.views, 0)}
          />
          <Kpi
            index={5}
            icon="💬"
            color="var(--accent-green)"
            label="Реакций на пост"
            value={f(m.avg.engagement, 1)}
          />
          <Kpi
            index={6}
            icon={m.silent_days > 30 ? '😴' : '⏱'}
            color={m.silent_days > 30 ? 'var(--accent-red)' : 'var(--accent-blue)'}
            label="Молчит"
            value={`${f(m.silent_days, 0)} дн.`}
            hint={m.gap.max ? `макс. пауза ${f(m.gap.max, 0)} дн.` : undefined}
          />
        </Div>
      </Group>

      {m.monthly.length > 1 && (
        <Group header={<Header subtitle="просмотров на пост · нажмите месяц">
          Куда идёт охват
        </Header>}
        >
          <Div style={{ paddingBottom: 4 }}>
            <LineChart
              points={m.monthly.map((row) => ({
                label: row.label.split(' ')[0],
                value: row.avg_views,
              }))}
              color="var(--accent-teal)"
              active={month}
              onSelect={setMonth}
            />
          </Div>
          <SimpleCell
            subtitle={`${picked.posts} ${plural(picked.posts, 'пост', 'поста', 'постов')}`
              + ` · ER ${f(picked.avg_er, 2)}%`}
            indicator={`${f(picked.avg_views, 0)} просмотров`}
            onClick={onOpenContent}
            chevron="always"
          >
            {picked.label}
          </SimpleCell>
        </Group>
      )}

      {top.length > 0 && (
        <Group header={<Header>Что чинить первым</Header>}>
          {top.map((item, i) => (
            <SimpleCell
              key={item.id}
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
              subtitle={item.evidence}
            >
              {item.title}
            </SimpleCell>
          ))}
        </Group>
      )}

      <Group header={<Header>Цели на 90 дней</Header>}>
        <Div style={{ display: 'grid', gap: 8 }}>
          {report.targets.map((t) => (
            <div
              key={t.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 10,
                background: 'var(--vkui--color_background_secondary)',
              }}
            >
              <span style={{ color: 'var(--vkui--color_text_secondary)', fontSize: '0.875rem' }}>
                {t.label}
              </span>
              <span style={{ whiteSpace: 'nowrap', fontWeight: 600 }}>
                <span style={{ color: 'var(--vkui--color_text_tertiary)' }}>{t.now}</span>
                <span style={{ color: 'var(--vkui--color_text_tertiary)' }}> → </span>
                <span style={{ color: 'hsl(var(--accent-green))' }}>{t.goal}</span>
              </span>
            </div>
          ))}
        </Div>
      </Group>

      <Group header={<Header>Упаковка страницы</Header>}>
        {m.profile_check.map((check) => (
          <SimpleCell
            key={check.key}
            multiline
            before={(
              <span style={{ fontSize: 18, filter: check.ok ? 'none' : 'grayscale(0.2)' }}>
                {check.ok ? '✅' : '⛔️'}
              </span>
            )}
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
