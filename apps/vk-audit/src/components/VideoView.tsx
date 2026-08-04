import { useState } from 'react';
import {
  Button, Div, Footnote, Group, Header, Placeholder, SimpleCell, Spinner,
} from '@vkontakte/vkui';

import { f } from '../engine/util';
import { videoUrl } from '../vk/video';
import { ColumnChart } from './Chart';
import { thinNote } from '../report/mix';
import type { CommentReport, VideoReport } from '../video/analyze';
import { videoFindings } from '../video/analyze';

interface Props {
  video: VideoReport | null;
  comments: CommentReport | null;
  busy: boolean;
  stage: string;
  /** Что пошло не так при сборе — показываем вместо молчаливого нуля. */
  note?: string;
  canCollect: boolean;
  onCollect: () => void;
}

const duration = (seconds: number): string => {
  if (seconds < 60) return `${Math.round(seconds)} сек`;
  const min = Math.floor(seconds / 60);
  const rest = Math.round(seconds % 60);
  return rest ? `${min} мин ${rest} сек` : `${min} мин`;
};

export function VideoView({
  video, comments, busy, stage, note, canCollect, onCollect,
}: Props) {
  const [showWords, setShowWords] = useState(false);

  if (busy) {
    return (
      <Group>
        <Placeholder icon={<Spinner size="l" />} title={stage || 'Читаем видео'}>
          Просмотры видео и тексты комментариев ВКонтакте отдаёт отдельно
          от стены, поэтому это ещё десяток-другой запросов.
        </Placeholder>
      </Group>
    );
  }

  if (!video || !comments) {
    return (
      <Group header={<Header>Видео и обсуждение</Header>}>
        <Div>
          <Footnote style={{ color: 'var(--vkui--color_text_secondary)', display: 'block', marginBottom: 12 }}>
            Здесь обычные ролики из раздела «Видео» — без клипов, они
            считаются на своей вкладке: охват там из другой ленты, и в общей
            медиане один залетевший клип перечёркивает картину. Чужое,
            добавленное к себе, тоже не в счёт. У записи с видео два разных
            счётчика просмотров: у самой записи и у видео внутри, и
            расходятся они в разы. Плюс тексты комментариев: ВКонтакте
            отдаёт их отдельно от стены.
          </Footnote>
          <Button size="l" stretched disabled={!canCollect} onClick={onCollect}>
            🎬 Разобрать видео и комментарии
          </Button>
          {!canCollect && (
            <Footnote style={{ color: 'var(--vkui--color_text_secondary)', marginTop: 8, display: 'block' }}>
              Нужен вход через ВКонтакте: видео и комментарии читаются
              тем же ключом, что и стена.
            </Footnote>
          )}
        </Div>
      </Group>
    );
  }

  if (!video.count) {
    return (
      <Group>
        <Placeholder title="Видео не нашлось">
          {note || (video.foreign
            ? `За период страница не публиковала обычных роликов. Чужого, `
              + `добавленного к себе, — ${video.foreign}: к охвату страницы `
              + 'оно отношения не имеет и в разбор не идёт.'
            : (video.clips.count
              ? `За период страница выкладывала только клипы (${video.clips.count}) — `
                + 'смотрите вкладку «Клипы».'
              : 'За выбранный период у страницы нет ни видео, ни клипов — или '
                + 'доступ к ним закрыт настройками.'))}
        </Placeholder>
      </Group>
    );
  }

  const findings = videoFindings(video, comments);
  const thin = thinNote(video.count, 'Видео');

  return (
    <>
      <Group header={<Header subtitle="обычные ролики без клипов: просмотры самого видео, а не записей">
        Видео
      </Header>}
      >
        <Div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div className="kpi rise">
            <span className="kpi__icon">🎬</span>
            <div className="kpi__value">{f(video.count, 0)}</div>
            <div className="kpi__label">видео</div>
            <div className="kpi__hint">{`медиана ${duration(video.medianDuration)}`}</div>
          </div>
          <div className="kpi rise rise-1">
            <span className="kpi__icon">👁</span>
            <div className="kpi__value">{f(video.medianViews, 0)}</div>
            <div className="kpi__label">просмотров на видео</div>
            <div className="kpi__hint">{`всего ${f(video.totalViews, 0)}`}</div>
          </div>
          <div className="kpi rise rise-2">
            <span className="kpi__icon">📄</span>
            <div className="kpi__value">
              {video.postViewsMedian ? f(video.postViewsMedian, 0) : '—'}
            </div>
            <div className="kpi__label">просмотров у записи</div>
            <div className="kpi__hint">
              {video.postViewsMedian ? 'то же видео на стене' : 'видео не выложено записями'}
            </div>
          </div>
          <div className="kpi rise rise-3">
            <span className="kpi__icon">💬</span>
            <div className="kpi__value">{f(video.totalComments, 0)}</div>
            <div className="kpi__label">комментариев к видео</div>
          </div>
        </Div>
        {thin && (
          <Div style={{ paddingTop: 0 }}>
            <Footnote style={{ color: 'var(--vkui--color_text_secondary)' }}>{thin}</Footnote>
          </Div>
        )}
      </Group>

      {video.clips.count > 0 && (
        <Group header={<Header subtitle="медиана просмотров: ВКонтакте раздаёт охват из разных лент">
          Против клипов
        </Header>}
        >
          <SimpleCell
            subtitle={`${video.count} шт. · комментариев ${f(video.medianComments, 1)}`}
            indicator={f(video.medianViews, 0)}
          >
            Обычные видео
          </SimpleCell>
          <SimpleCell
            subtitle={`${video.clips.count} шт. · комментариев ${f(video.clips.medianComments, 1)}`}
            indicator={f(video.clips.medianViews, 0)}
          >
            Клипы
          </SimpleCell>
          <Div style={{ paddingTop: 0 }}>
            <Footnote style={{ color: 'var(--vkui--color_text_secondary)' }}>
              Клипы в остальные цифры этой вкладки не входят — они разобраны
              на вкладке «Клипы».
            </Footnote>
          </Div>
        </Group>
      )}

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

      {video.byDuration.length > 1 && (
        <Group header={<Header subtitle="медиана просмотров по длительности">
          Какая длина заходит
        </Header>}
        >
          <Div>
            <ColumnChart
              points={video.byDuration.map((row) => ({
                label: row.label.replace(' сек', 'с').replace('больше ', '>'),
                value: row.medianViews,
                note: `${row.count} шт.`,
              }))}
            />
          </Div>
          {video.byDuration.map((row) => (
            <SimpleCell
              key={row.label}
              subtitle={`${row.count} видео · комментариев ${f(row.medianComments, 1)}`}
              indicator={f(row.medianViews, 0)}
            >
              {row.label}
            </SimpleCell>
          ))}
        </Group>
      )}

      <Group header={<Header>Лучшие видео</Header>}>
        {video.top.map((item) => (
          <SimpleCell
            key={`${item.ownerId}_${item.id}`}
            multiline
            subtitle={`${duration(item.duration)} · ${f(item.likes, 0)} лайков · ${f(item.comments, 0)} комментариев`}
            indicator={f(item.views, 0)}
            href={videoUrl(item)}
            target="_blank"
            rel="noreferrer"
          >
            {item.title || 'Без названия'}
          </SimpleCell>
        ))}
      </Group>

      {video.flop.length > 0 && (
        <Group header={<Header subtitle="сравните их с лучшими: чем отличаются обложка и первые секунды">
          Слабые видео
        </Header>}
        >
          {video.flop.map((item) => (
            <SimpleCell
              key={`${item.ownerId}_${item.id}`}
              multiline
              subtitle={duration(item.duration)}
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

      <Group header={<Header subtitle={comments.fromVideos
        ? `разобрано веток: ${comments.posts}, из них под видео ${comments.fromVideos}`
        : `разобрано записей: ${comments.posts}`}
      >
        Обсуждение
      </Header>}
      >
        <SimpleCell indicator={f(comments.total, 0)}>Комментариев</SimpleCell>
        <SimpleCell indicator={f(comments.fromPeople, 0)}>Из них от людей</SimpleCell>
        <SimpleCell indicator={f(comments.fromAuthor, 0)}>Ответов автора</SimpleCell>
        <SimpleCell indicator={`${f(comments.answeredShare, 0)}%`}>
          Записей, где автор ответил
        </SimpleCell>
        <SimpleCell indicator={comments.medianReplyHours === null
          ? '—'
          : `${f(comments.medianReplyHours, 1)} ч`}
        >
          Время до первого ответа
        </SimpleCell>
        <SimpleCell indicator={`${f(comments.questionShare, 0)}%`}>
          Комментариев с вопросом
        </SimpleCell>
      </Group>

      {comments.unanswered.length > 0 && (
        <Group header={<Header subtitle="человек уже написал — это самая дешёвая вовлечённость">
          Вопросы без ответа
        </Header>}
        >
          {comments.unanswered.map((item, i) => (
            <SimpleCell
              key={`${item.postId}:${i}`}
              multiline
              subtitle={item.where}
              href={item.url ?? undefined}
              target={item.url ? '_blank' : undefined}
              rel={item.url ? 'noreferrer' : undefined}
            >
              {item.text}
            </SimpleCell>
          ))}
        </Group>
      )}

      {comments.topWords.length > 0 && (
        <Group header={<Header>О чём пишут</Header>}>
          <Div>
            <div className="chips">
              {(showWords ? comments.topWords : comments.topWords.slice(0, 6)).map((item) => (
                <span key={item.word} className="badge">
                  {`${item.word} · ${item.n}`}
                </span>
              ))}
            </div>
            {comments.topWords.length > 6 && (
              <Button
                mode="tertiary"
                size="s"
                style={{ marginTop: 10 }}
                onClick={() => setShowWords((v) => !v)}
              >
                {showWords ? 'Свернуть' : 'Показать все'}
              </Button>
            )}
            <Footnote style={{ color: 'var(--vkui--color_text_secondary)', display: 'block', marginTop: 10 }}>
              Слова из комментариев людей, без ответов автора. Повторяющееся
              слово — готовая тема для следующего поста: об этом уже спросили.
            </Footnote>
          </Div>
        </Group>
      )}
    </>
  );
}
