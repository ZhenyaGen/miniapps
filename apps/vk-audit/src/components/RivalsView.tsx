import { useState } from 'react';
import {
  Button, Div, Footnote, FormItem, Group, Header, Placeholder, SimpleCell,
  Spinner, Textarea, Title,
} from '@vkontakte/vkui';

import type { CompareRow, RivalsReport, Verdict } from '../engine/rivals';
import { f } from '../engine/util';
import { MAX_RIVALS } from '../vk/rivals';

const VERDICT_LABEL: Record<Exclude<Verdict, null>, string> = {
  ahead: 'впереди',
  even: 'наравне',
  behind: 'отстаём',
};

const VERDICT_COLOR: Record<Exclude<Verdict, null>, string> = {
  ahead: 'var(--vkui--color_text_positive)',
  even: 'var(--vkui--color_text_secondary)',
  behind: 'var(--vkui--color_text_negative)',
};

function num(value: number, unit: string): string {
  const digits = Math.abs(value) >= 100 || Number.isInteger(value) ? 0 : 2;
  return `${f(value, digits)}${unit}`;
}

function Row({ row }: { row: CompareRow }) {
  return (
    <SimpleCell
      multiline
      subtitle={`у конкурентов ${num(row.median, row.unit)} · лучший ${num(row.best, row.unit)}`
        + (row.leader ? ` (${row.leader})` : '')}
      indicator={(
        <span style={{ color: row.verdict ? VERDICT_COLOR[row.verdict] : undefined }}>
          {num(row.mine, row.unit)}
        </span>
      )}
    >
      <span>{row.label}</span>
      {row.verdict && (
        <Footnote style={{ color: VERDICT_COLOR[row.verdict], display: 'block' }}>
          {VERDICT_LABEL[row.verdict]}
          {row.gap_pct !== null && row.verdict !== 'even' ? ` · ${row.gap_pct > 0 ? '+' : ''}${row.gap_pct}%` : ''}
        </Footnote>
      )}
    </SimpleCell>
  );
}

interface Props {
  report: RivalsReport | null;
  busy: boolean;
  stage: string;
  canCollect: boolean;
  isDemo: boolean;
  onCollect: (targets: string) => void;
  onDemo: () => void;
  onReset: () => void;
}

export function RivalsView({
  report, busy, stage, canCollect, isDemo, onCollect, onDemo, onReset,
}: Props) {
  const [raw, setRaw] = useState('');

  if (busy) {
    return (
      <Group>
        <Placeholder icon={<Spinner size="l" />} title={stage || 'Собираем конкурентов'}>
          По каждой странице читается стена за 90 дней. ВКонтакте отдаёт три
          запроса в секунду, поэтому пять конкурентов — это около минуты.
        </Placeholder>
      </Group>
    );
  }

  if (!report) {
    return (
      <>
        <Group header={<Header>Сравнение с конкурентами</Header>}>
          <FormItem
            top="Ссылки на похожие сообщества, по одной в строке"
            bottom={`Достаточно 3–5 сообществ вашей тематики. Максимум — ${MAX_RIVALS}.`}
          >
            <Textarea
              rows={5}
              value={raw}
              placeholder={'vk.com/rival_one\nvk.com/rival_two\nvk.com/rival_three'}
              onChange={(e) => setRaw(e.target.value)}
            />
          </FormItem>
          <Div>
            <Button
              size="l"
              stretched
              disabled={!raw.trim() || !canCollect}
              onClick={() => onCollect(raw)}
            >
              Собрать сравнение
            </Button>
            {!canCollect && (
              <Footnote style={{ color: 'var(--vkui--color_text_secondary)', marginTop: 8, display: 'block' }}>
                Для сравнения нужен вход через ВКонтакте: страницы конкурентов
                читаются тем же ключом, что и ваша.
              </Footnote>
            )}
          </Div>
        </Group>

        {isDemo && (
          <Group header={<Header>Демо</Header>}>
            <Div>
              <Button size="l" stretched mode="secondary" onClick={onDemo}>
                Показать демо-сравнение
              </Button>
            </Div>
          </Group>
        )}
      </>
    );
  }

  return (
    <>
      {report.gaps.length > 0 && (
        <Group header={<Header subtitle="где отставание заметнее всего">Главное</Header>}>
          {report.gaps.map((row) => (
            <SimpleCell
              key={row.key}
              multiline
              subtitle={`${num(row.mine, row.unit)} против ${num(row.median, row.unit)} — `
                + `это ${Math.abs(row.gap_pct ?? 0)}% разницы`}
            >
              {row.label}
            </SimpleCell>
          ))}
        </Group>
      )}

      <Group header={(
        <Header subtitle={`медианы за ${report.period_days} дней по ${report.rivals.length} конкурентам`}>
          Показатели
        </Header>
      )}
      >
        {report.rows.map((row) => <Row key={row.key} row={row} />)}
      </Group>

      <Group header={<Header>Кто участвовал</Header>}>
        {[report.client, ...report.rivals].map((card, i) => (
          <SimpleCell
            key={card.url}
            multiline
            href={card.url}
            target="_blank"
            rel="noreferrer"
            subtitle={`${f(card.audience, 0)} подписчиков · ${f(card.per_week, 1)} постов в неделю · `
              + `ER ${f(card.er_median, 2)}% · лучший формат: ${card.best_format}`}
            indicator={i === 0 ? 'вы' : undefined}
          >
            {card.name}
          </SimpleCell>
        ))}
      </Group>

      {report.rivals.some((r) => r.top_posts.length > 0) && (
        <Group header={<Header subtitle="по ним видно не насколько они впереди, а чем именно">Лучшие посты конкурентов</Header>}>
          {report.rivals.flatMap((rival) => rival.top_posts.slice(0, 2).map((post) => (
            <SimpleCell
              key={`${rival.screen_name}:${post.url}`}
              multiline
              href={post.url}
              target="_blank"
              rel="noreferrer"
              subtitle={`${rival.name} · ${post.date} · ${f(post.views, 0)} просмотров`}
              indicator={post.er === null ? '—' : `${f(post.er, 2)}%`}
            >
              {post.text.slice(0, 160) || '(без текста)'}
            </SimpleCell>
          )))}
        </Group>
      )}

      {report.warnings.length > 0 && (
        <Group header={<Header>Как это читать</Header>}>
          <Div>
            {report.warnings.map((warning) => (
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

      <Group>
        <Div>
          <Title level="3" style={{ marginBottom: 8 }}>Сравнить с другими</Title>
          <Button size="l" stretched mode="secondary" onClick={onReset}>
            Выбрать других конкурентов
          </Button>
        </Div>
      </Group>
    </>
  );
}
