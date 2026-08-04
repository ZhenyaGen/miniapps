import {
  Button, Div, Footnote, Group, Header, Placeholder, SimpleCell, Spinner,
} from '@vkontakte/vkui';

import { f } from '../engine/util';
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

  return (
    <>
      <Group header={<Header subtitle="лента клипов, а не лента сообщества">Клипы</Header>}>
        <Div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div className="kpi rise">
            <span className="kpi__icon">⚡</span>
            <div className="kpi__value">{f(report.count, 0)}</div>
            <div className="kpi__label">клипов</div>
            <div className="kpi__hint">{`медиана ${seconds(report.medianDuration)}`}</div>
          </div>
          <div className="kpi rise rise-1">
            <span className="kpi__icon">👁</span>
            <div className="kpi__value">{f(report.medianViews, 0)}</div>
            <div className="kpi__label">просмотров на клип</div>
            <div className="kpi__hint">{`всего ${f(report.totalViews, 0)}`}</div>
          </div>
          <div className="kpi rise rise-2">
            <span className="kpi__icon">🚀</span>
            <div className="kpi__value">{f(report.maxViews, 0)}</div>
            <div className="kpi__label">лучший клип</div>
            <div className="kpi__hint">
              {report.spread === null ? '' : `в ${f(report.spread, 1)} раза выше медианы`}
            </div>
          </div>
          <div className="kpi rise rise-3">
            <span className="kpi__icon">🔥</span>
            <div className="kpi__value">{f(report.hits, 0)}</div>
            <div className="kpi__label">выстрелов</div>
            <div className="kpi__hint">{`${f(report.hitsShare, 0)}% всех просмотров`}</div>
          </div>
        </Div>
        <Div style={{ paddingTop: 0 }}>
          <Footnote style={{ color: 'var(--vkui--color_text_secondary)' }}>
            Выстрел — клип, набравший больше трёх медиан. У клипов важен
            не средний уровень, а частота попаданий: лента раздаёт охват
            рывками.
          </Footnote>
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
        <Group header={<Header subtitle="медиана просмотров по месяцам">
          Как менялось
        </Header>}
        >
          {report.byMonth.map((row) => (
            <SimpleCell
              key={row.key}
              subtitle={`${row.count} клипов`}
              indicator={f(row.medianViews, 0)}
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
            href={`https://vk.com/video${item.ownerId}_${item.id}`}
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
              href={`https://vk.com/video${item.ownerId}_${item.id}`}
              target="_blank"
              rel="noreferrer"
            >
              {item.title || 'Без названия'}
            </SimpleCell>
          ))}
        </Group>
      )}

      <Group header={<Header>Ещё по клипам</Header>}>
        <SimpleCell indicator={`${f(report.medianEr, 2)}%`}>
          Вовлечённость к просмотрам
        </SimpleCell>
        <SimpleCell indicator={f(report.totalComments, 0)}>Комментариев всего</SimpleCell>
        <SimpleCell indicator={f(report.offWall, 0)}>Не выложены на стену</SimpleCell>
      </Group>
    </>
  );
}
