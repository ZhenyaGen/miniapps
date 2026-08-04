import {
  Button, Div, Footnote, Group, Header, Placeholder, SimpleCell, Spinner,
} from '@vkontakte/vkui';

import { f } from '../engine/util';
import { ColumnChart, LineChart } from './Chart';
import { photoFindings } from '../photos/analyze';
import { thinNote } from '../report/mix';
import type { PhotoReport } from '../photos/analyze';

interface Props {
  report: PhotoReport | null;
  busy: boolean;
  stage: string;
  note?: string;
  canCollect: boolean;
  onCollect: () => void;
}

export function PhotosView({ report, busy, stage, note, canCollect, onCollect }: Props) {
  if (busy) {
    return (
      <Group>
        <Placeholder icon={<Spinner size="l" />} title={stage || 'Читаем фотографии'}>
          Лайки и комментарии к самим снимкам ВКонтакте отдаёт отдельно
          от стены — это ещё несколько запросов.
        </Placeholder>
      </Group>
    );
  }

  if (!report) {
    return (
      <Group header={<Header>Фотографии</Header>}>
        <Div>
          <Footnote style={{ color: 'var(--vkui--color_text_secondary)', display: 'block', marginBottom: 12 }}>
            У фотографии свои лайки и свои комментарии — с реакциями записи
            они не совпадают. И живёт она дольше: снимок из альбома собирает
            реакции месяцами, когда запись уже ушла из ленты. Вкладка
            показывает, куда на самом деле уходит внимание — на запись
            или на картинку.
          </Footnote>
          <Button size="l" stretched disabled={!canCollect} onClick={onCollect}>
            🖼 Разобрать фотографии
          </Button>
          {!canCollect && (
            <Footnote style={{ color: 'var(--vkui--color_text_secondary)', marginTop: 8, display: 'block' }}>
              Нужен вход через ВКонтакте: фотографии читаются тем же ключом,
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
        <Placeholder title="Фотографий не нашлось">
          {note || 'За период страница не выкладывала снимков — или раздел '
            + 'закрыт настройками приватности.'}
        </Placeholder>
      </Group>
    );
  }

  const findings = photoFindings(report);
  const thin = thinNote(report.count, 'Фотографий');

  return (
    <>
      <Group header={<Header subtitle="лайки под самим снимком, а не под записью">
        Фотографии
      </Header>}
      >
        <Div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div className="kpi rise">
            <span className="kpi__icon">🖼</span>
            <div className="kpi__value">{f(report.count, 0)}</div>
            <div className="kpi__label">снимков</div>
            <div className="kpi__hint">{`записью выложено ${f(report.onWall, 0)}`}</div>
          </div>
          <div className="kpi rise rise-1">
            <span className="kpi__icon">❤</span>
            <div className="kpi__value">{f(report.medianLikes, 0)}</div>
            <div className="kpi__label">лайков на снимок</div>
            <div className="kpi__hint">{`всего ${f(report.totalLikes, 0)}`}</div>
          </div>
          <div className="kpi rise rise-2">
            <span className="kpi__icon">📄</span>
            <div className="kpi__value">
              {report.postLikesMedian ? f(report.postLikesMedian, 0) : '—'}
            </div>
            <div className="kpi__label">лайков у записи</div>
            <div className="kpi__hint">
              {report.postLikesMedian ? 'та же картинка на стене' : 'снимки не выложены записями'}
            </div>
          </div>
          <div className="kpi rise rise-3">
            <span className="kpi__icon">💬</span>
            <div className="kpi__value">{f(report.totalComments, 0)}</div>
            <div className="kpi__label">комментариев к снимкам</div>
          </div>
        </Div>
        {thin && (
          <Div style={{ paddingTop: 0 }}>
            <Footnote style={{ color: 'var(--vkui--color_text_secondary)' }}>{thin}</Footnote>
          </Div>
        )}
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

      {report.byOrientation.length > 1 && (
        <Group header={<Header subtitle="медиана лайков по форме кадра">
          Какой кадр заходит
        </Header>}
        >
          <Div>
            <ColumnChart
              points={report.byOrientation.map((row) => ({
                label: row.label,
                value: row.medianLikes,
                note: `${row.count} шт.`,
              }))}
              color="var(--accent-violet)"
            />
          </Div>
        </Group>
      )}

      {report.byMonth.length > 1 && (
        <Group header={<Header subtitle="медиана лайков на снимок по месяцам">
          Как менялось
        </Header>}
        >
          <Div>
            <LineChart
              points={report.byMonth.map((row) => ({ label: row.label.split(' ')[0], value: row.medianLikes }))}
              color="var(--accent-violet)"
            />
          </Div>
          {report.byMonth.map((row) => (
            <SimpleCell key={row.key} subtitle={`${row.count} снимков`} indicator={f(row.medianLikes, 0)}>
              {row.label}
            </SimpleCell>
          ))}
        </Group>
      )}

      <Group header={<Header subtitle="что нравится больше всего">Лучшие снимки</Header>}>
        {report.top.map((item) => (
          <SimpleCell
            key={`${item.ownerId}_${item.id}`}
            multiline
            subtitle={`${f(item.comments, 0)} комментариев`
              + (item.onWall ? ' · выложен записью' : ' · только в альбоме')}
            indicator={f(item.likes, 0)}
            href={`https://vk.com/photo${item.ownerId}_${item.id}`}
            target="_blank"
            rel="noreferrer"
          >
            {item.text.slice(0, 80) || 'Без подписи'}
          </SimpleCell>
        ))}
      </Group>

      <Group header={<Header>Ещё по фотографиям</Header>}>
        <SimpleCell indicator={f(report.offWall, 0)}>Только в альбомах</SimpleCell>
        <SimpleCell indicator={`${f(report.offWallLikesShare, 0)}%`}>
          Лайков собрано мимо ленты
        </SimpleCell>
        <SimpleCell indicator={f(report.medianComments, 0)}>Комментариев на снимок</SimpleCell>
        <SimpleCell indicator={report.likesRatio === null ? '—' : `${f(report.likesRatio, 2)}×`}>
          Лайки снимка к лайкам записи
        </SimpleCell>
      </Group>
    </>
  );
}
