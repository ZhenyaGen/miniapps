import {
  Button, Div, Footnote, Group, Header, Placeholder, SimpleCell, Spinner,
} from '@vkontakte/vkui';

import { f } from '../engine/util';
import { videoUrl } from '../vk/video';
import { ColumnChart, LineChart } from './Chart';
import { thinNote } from '../report/mix';
import type { ClipsReport } from '../video/clips';
import { clipFindings } from '../video/clips';

interface Props {
  report: ClipsReport | null;
  busy: boolean;
  stage: string;
  /** Что пошло не так при сборе — показываем вместо молчаливого нуля. */
  note?: string;
  canCollect: boolean;
  onCollect: () => void;
}

const seconds = (value: number): string => `${Math.round(value)} сек`;

/**
 * Крупные числа сокращаются: 6 800 000 в плитку не влезает и читается
 * хуже, чем «6,8 млн» — так же, как их показывает сам ВКонтакте.
 */
const big = (value: number): string => {
  if (value >= 1_000_000) return `${f(value / 1_000_000, 1)} млн`;
  if (value >= 10_000) return `${f(value / 1000, 0)} тыс.`;
  return f(value, 0);
};

export function ClipsView({ report, busy, stage, note, canCollect, onCollect }: Props) {
  if (busy) {
    return (
      <Group>
        <Placeholder icon={<Spinner size="l" />} title={stage || 'Читаем клипы'}>
          Клипы ВКонтакте отдаёт вместе с видео, отдельно от стены —
          это ещё несколько запросов.
        </Placeholder>
      </Group>
    );
  }

  if (!report) {
    return (
      <Group header={<Header>Клипы</Header>}>
        <Div>
          <Footnote style={{ color: 'var(--vkui--color_text_secondary)', display: 'block', marginBottom: 12 }}>
            Клип живёт не в ленте сообщества, а в ленте клипов, и охват
            там раздаётся иначе: почти не зависит от числа подписчиков,
            зато сильно — от первых секунд. Поэтому клипы считаются
            отдельно от обычных видео.
          </Footnote>
          <Button size="l" stretched disabled={!canCollect} onClick={onCollect}>
            ⚡ Разобрать клипы
          </Button>
          {!canCollect && (
            <Footnote style={{ color: 'var(--vkui--color_text_secondary)', marginTop: 8, display: 'block' }}>
              Нужен вход через ВКонтакте: клипы читаются тем же ключом,
              что и стена.
            </Footnote>
          )}
        </Div>
      </Group>
    );
  }

  if (!report.count) {
    return (
      <Group>
        <Placeholder title="Клипов не нашлось">
          {note || 'За период у страницы нет вертикальных роликов. '
            + 'Обычные смотрите на вкладке «Видео»: там весь раздел '
            + 'без клипов.'}
        </Placeholder>
      </Group>
    );
  }

  const findings = clipFindings(report);
  const thin = thinNote(report.count, 'Клипов');

  return (
    <>
      <Group header={<Header subtitle="лента клипов, а не лента сообщества">Клипы</Header>}>
        <Div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div className="kpi rise">
            <span className="kpi__icon">👁</span>
            <div className="kpi__value">{big(report.totalViews)}</div>
            <div className="kpi__label">просмотров всего</div>
            <div className="kpi__hint">{`${f(report.avgViews, 0)} на клип`}</div>
          </div>
          <div className="kpi rise rise-1">
            <span className="kpi__icon">❤</span>
            <div className="kpi__value">{big(report.totalLikes)}</div>
            <div className="kpi__label">лайков всего</div>
            <div className="kpi__hint">{`${f(report.avgLikes, 0)} на клип`}</div>
          </div>
          <div className="kpi rise rise-2">
            <span className="kpi__icon">💬</span>
            <div className="kpi__value">{big(report.totalComments)}</div>
            <div className="kpi__label">комментариев всего</div>
            <div className="kpi__hint">{`${f(report.avgComments, 1)} на клип`}</div>
          </div>
          <div className="kpi rise rise-3">
            <span className="kpi__icon">↗</span>
            <div className="kpi__value">{big(report.totalReposts)}</div>
            <div className="kpi__label">поделились</div>
            <div className="kpi__hint">{`клипов за период ${f(report.count, 0)}`}</div>
          </div>
          <div className="kpi rise rise-4">
            <span className="kpi__icon">🚀</span>
            <div className="kpi__value">{big(report.maxViews)}</div>
            <div className="kpi__label">лучший клип</div>
            <div className="kpi__hint">
              {report.totalViews
                ? `${f((report.maxViews / report.totalViews) * 100, 0)}% всех просмотров`
                : ''}
            </div>
          </div>
          <div className="kpi rise rise-5">
            <span className="kpi__icon">🔥</span>
            <div className="kpi__value">{f(report.hits, 0)}</div>
            <div className="kpi__label">выстрелов</div>
            <div className="kpi__hint">{`${f(report.hitsShare, 0)}% всех просмотров`}</div>
          </div>
        </Div>
        <Div style={{ paddingTop: 0 }}>
          <Footnote style={{ color: 'var(--vkui--color_text_secondary)' }}>
            Суммы за период — то же, что показывает статистика сообщества.
            Охвата и среднего досмотра в открытых данных нет: их отдаёт
            только раздел статистики самому владельцу, поэтому здесь
            считаются просмотры и реакции.
          </Footnote>
          {thin && (
            <Footnote style={{ color: 'var(--vkui--color_text_secondary)', display: 'block', marginTop: 8 }}>
              {thin}
            </Footnote>
          )}
          {report.guessed && (
            <Footnote style={{ color: 'var(--vkui--color_text_secondary)', display: 'block', marginTop: 8 }}>
              ВКонтакте не пометил эти ролики клипами — мы определили их
              по формату: вертикальная обложка и не длиннее трёх минут.
              Если среди них попало обычное видео, цифры по нему тоже
              учтены.
            </Footnote>
          )}
        </Div>
      </Group>

      {findings.length > 0 && (
        <Group header={<Header>Что из этого следует</Header>}>
          <Div>
            <ul className="guide__list">
              {findings.map((text, i) => (
                <li key={text} className={`guide__point rise rise-${Math.min(i + 1, 6)}`}>
                  {text}
                </li>
              ))}
            </ul>
          </Div>
        </Group>
      )}

      {report.byDuration.length > 1 && (
        <Group header={<Header subtitle="медиана просмотров и вовлечённость">
          Длина клипа
        </Header>}
        >
          <Div>
            <ColumnChart
              points={report.byDuration.map((row) => ({
                label: row.label.replace(' сек', 'с').replace('больше минуты', '>1 мин'),
                value: row.medianViews,
                note: `${row.count} шт.`,
              }))}
              color="var(--accent-amber)"
            />
          </Div>
          {report.byDuration.map((row) => (
            <SimpleCell
              key={row.label}
              subtitle={`${row.count} шт. · вовлечённость ${f(row.medianEr, 2)}%`}
              indicator={f(row.medianViews, 0)}
            >
              {row.label}
            </SimpleCell>
          ))}
        </Group>
      )}

      {report.byMonth.length > 1 && (
        <Group header={<Header subtitle="все просмотры за месяц — как в статистике сообщества">
          Как менялось
        </Header>}
        >
          <Div>
            <LineChart
              points={report.byMonth.map((row) => ({
                label: row.label.split(' ')[0],
                value: row.views,
              }))}
              color="var(--accent-amber)"
            />
          </Div>
          {report.byMonth.map((row) => (
            <SimpleCell
              key={row.key}
              subtitle={`${row.count} клипов · серединный ${f(row.medianViews, 0)}`}
              indicator={big(row.views)}
            >
              {row.label}
            </SimpleCell>
          ))}
        </Group>
      )}

      <Group header={<Header subtitle="разберите первые секунды именно у них">
        Лучшие клипы
      </Header>}
      >
        {report.top.map((item) => (
          <SimpleCell
            key={`${item.ownerId}_${item.id}`}
            multiline
            subtitle={`${seconds(item.duration)} · ${f(item.likes, 0)} лайков · ${f(item.comments, 0)} комментариев`}
            indicator={f(item.views, 0)}
            href={videoUrl(item)}
            target="_blank"
            rel="noreferrer"
          >
            {item.title || 'Без названия'}
          </SimpleCell>
        ))}
      </Group>

      {report.flop.length > 0 && (
        <Group header={<Header subtitle="сравните их с лучшими: чем отличается начало">
          Слабые клипы
        </Header>}
        >
          {report.flop.map((item) => (
            <SimpleCell
              key={`${item.ownerId}_${item.id}`}
              multiline
              subtitle={seconds(item.duration)}
              indicator={f(item.views, 0)}
              href={videoUrl(item)}
              target="_blank"
              rel="noreferrer"
            >
              {item.title || 'Без названия'}
            </SimpleCell>
          ))}
        </Group>
      )}

      <Group header={<Header subtitle="серединный клип — не средний: он показывает обычный уровень, без выбросов">
        Серединный клип
      </Header>}
      >
        <SimpleCell indicator={f(report.medianViews, 0)}>Просмотров</SimpleCell>
        <SimpleCell indicator={seconds(report.medianDuration)}>Длина</SimpleCell>
        <SimpleCell indicator={report.spread === null ? '—' : `${f(report.spread, 1)}×`}>
          Лучший клип выше серединного
        </SimpleCell>
        <SimpleCell indicator={`${f(report.medianEr, 2)}%`}>
          Вовлечённость к просмотрам
        </SimpleCell>
        <SimpleCell indicator={f(report.offWall, 0)}>Не выложены на стену</SimpleCell>
      </Group>
    </>
  );
}
