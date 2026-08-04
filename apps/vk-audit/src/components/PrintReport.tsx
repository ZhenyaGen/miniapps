/**
 * Печатная версия отчёта — она же PDF.
 *
 * Своей генерации PDF нет намеренно: библиотека, умеющая кириллицу,
 * тянет за собой встроенный шрифт и весит больше, чем всё приложение
 * вместе с движком. «Сохранить как PDF» умеет любой браузер, и ему
 * нужна только страница, свёрстанная под бумагу.
 *
 * Рисуется порталом прямо в `body`, а не внутрь приложения: печатать
 * интерфейс с вкладками и кнопками нельзя, а прятать его правилами
 * «спрячь всё, кроме» — значит оставлять пустые страницы от скрытых
 * блоков. Два соседних корня решают это одной строкой CSS.
 */

import { createPortal } from 'react-dom';

import type { Report } from '../App';
import type { RivalsReport } from '../engine/rivals';
import { f } from '../engine/util';
import type { BriefMedia } from '../report/brief';
import { findGaps } from '../report/gaps';

interface Props {
  report: Report;
  rivals: RivalsReport | null;
  media: BriefMedia;
}

function Rows({ rows }: { rows: Array<[string, string | number]> }) {
  return (
    <table className="print-table">
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <th>{label}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function PrintReport({ report, rivals, media }: Props) {
  const { metrics: m, snapshot, findings, plan, targets } = report;
  const p = snapshot.profile;
  const { video, clips, photos, comments, mix } = media;
  const gaps = findGaps({
    metrics: m, mix, video, clips, photos, comments, rivals, mediaCollected: Boolean(mix),
  });

  const body = (
    <div className="print-root">
      <header className="print-head">
        <h1>{p.name}</h1>
        <p>
          {`${p.url} · ${p.audience_label}: ${f(p.audience, 0)}`}
          <br />
          {`Период: ${m.period.from} — ${m.period.to} (${m.period.days} дней)`}
        </p>
      </header>

      {mix && (
        <section>
          <h2>Профиль контента</h2>
          <p><b>{mix.label}.</b>{` ${mix.summary}`}</p>
          <Rows rows={mix.rows.map((r) => [
            r.label,
            r.count === 0
              ? 'не выкладывались'
              : `${r.count} (${f(r.share, 0)}%)${r.enough ? '' : ' — мало для выводов'}`,
          ])}
          />
        </section>
      )}

      <section>
        <h2>Метрики стены</h2>
        <Rows rows={[
          ['Постов', `${m.posts_total}, своих ${m.posts_own}`],
          ['Частота', `${f(m.per_week)} в неделю`],
          [m.er_basis_label, `${f(m.er, 2)}% (медиана ${f(m.er_median, 2)}%)`],
          ['Просмотров на пост', `${f(m.avg.views, 0)} (${f(m.views_per_audience)}% аудитории)`],
          ['Реакций на пост', `${f(m.avg.engagement, 1)}`],
          ['Молчание', `${f(m.silent_days, 0)} дней`],
        ]}
        />
      </section>

      {m.by_type.length > 0 && (
        <section>
          <h2>Форматы записей</h2>
          <Rows rows={m.by_type.map((t) => [
            t.label, `${t.n} постов (${f(t.share, 0)}%), ER ${f(t.avg_er, 2)}%`,
          ])}
          />
        </section>
      )}

      {clips?.count ? (
        <section>
          <h2>Клипы</h2>
          <Rows rows={[
            ['Клипов', clips.count],
            ['Просмотров всего', f(clips.totalViews, 0)],
            ['Медиана на клип', f(clips.medianViews, 0)],
            ['Лучший клип', f(clips.maxViews, 0)],
            ['Выстрелов', `${clips.hits} — ${f(clips.hitsShare, 0)}% просмотров`],
            ['Вовлечённость', `${f(clips.medianEr, 2)}%`],
            ['Мимо стены', clips.offWall],
          ]}
          />
        </section>
      ) : null}

      {video?.count ? (
        <section>
          <h2>Обычные видео</h2>
          <Rows rows={[
            ['Видео', video.count],
            ['Медиана просмотров', f(video.medianViews, 0)],
            ['Медиана просмотров записи', f(video.postViewsMedian, 0)],
            ['Отношение', video.viewsRatio === null ? '—' : `${f(video.viewsRatio, 2)}×`],
            ['Комментариев', f(video.totalComments, 0)],
            ['Мимо стены', video.offWall],
          ]}
          />
        </section>
      ) : null}

      {photos?.count ? (
        <section>
          <h2>Фотографии</h2>
          <Rows rows={[
            ['Снимков', photos.count],
            ['Медиана лайков', f(photos.medianLikes, 0)],
            ['Медиана лайков у записи', f(photos.postLikesMedian, 0)],
            ['Отношение', photos.likesRatio === null ? '—' : `${f(photos.likesRatio, 2)}×`],
            ['Только в альбомах', photos.offWall],
            ['Лайков мимо ленты', `${f(photos.offWallLikesShare, 0)}%`],
          ]}
          />
        </section>
      ) : null}

      {comments?.posts ? (
        <section>
          <h2>Обсуждение</h2>
          <Rows rows={[
            ['Разобрано веток', comments.posts],
            ['Комментариев', `${comments.total}, от людей ${comments.fromPeople}`],
            ['Ответов автора', comments.fromAuthor],
            ['Веток с ответом', `${f(comments.answeredShare, 0)}%`],
            ['Вопросов без ответа', comments.unanswered.length],
          ]}
          />
        </section>
      ) : null}

      <section className="print-break">
        <h2>Зоны роста</h2>
        <ol className="print-list">
          {findings.map((item) => (
            <li key={item.id}>
              <b>{item.title}</b>
              {` [${item.severity}] — ${item.evidence}`}
            </li>
          ))}
        </ol>
      </section>

      {gaps.length > 0 && (
        <section>
          <h2>Чего на странице нет</h2>
          <ul className="print-list">
            {gaps.map((gap) => (
              <li key={gap.key}>
                <b>{gap.label}</b>
                {`. ${gap.detail} Что это дало бы: ${gap.gain}`}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="print-break">
        <h2>План на 4 недели</h2>
        {plan.map((stage) => (
          <div key={stage.title} className="print-stage">
            <h3>{`${stage.title} — ${stage.metric}`}</h3>
            <ul className="print-list">
              {stage.tasks.map((task) => <li key={task.text}>{task.text}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Цели на 90 дней</h2>
        <Rows rows={targets.map((t) => [t.label, `${t.now} → ${t.goal}`])} />
      </section>

      {rivals && rivals.rivals.length > 0 && (
        <section>
          <h2>{`На фоне конкурентов (${rivals.period_days} дней)`}</h2>
          <p>{rivals.rivals.map((r) => r.name).join(', ')}</p>
          <Rows rows={rivals.rows.map((row) => [
            row.label, `у нас ${row.mine}${row.unit}, у них ${row.median}${row.unit}`,
          ])}
          />
        </section>
      )}

      <footer className="print-foot">
        {`Аудит страницы ВК · ${p.url} · отчёт собран приложением, числа взяты из открытых данных ВКонтакте`}
      </footer>
    </div>
  );

  return createPortal(body, document.body);
}
