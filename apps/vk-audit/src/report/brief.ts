/** Бриф для чата с ИИ: весь контекст отчёта текстом, без ключей и без сети. */

import type { Report } from '../App';
import type { RivalsReport } from '../engine/rivals';
import { f } from '../engine/util';
import type { ClipsReport } from '../video/clips';
import type { CommentReport, VideoReport } from '../video/analyze';
import { clipFindings } from '../video/clips';
import { videoFindings } from '../video/analyze';
import { photoFindings } from '../photos/analyze';
import type { PhotoReport } from '../photos/analyze';
import type { ContentMix } from './mix';
import { MIN_SAMPLE } from './mix';

export interface BriefMedia {
  video?: VideoReport | null;
  clips?: ClipsReport | null;
  photos?: PhotoReport | null;
  comments?: CommentReport | null;
  mix?: ContentMix | null;
}

/** Строка таблицы для брифа: разделитель — «|», как в markdown. */
const tsv = (cells: Array<string | number>): string => cells.join(' | ');

export function buildBrief(
  report: Report,
  rivals?: RivalsReport | null,
  media: BriefMedia = {},
): string {
  const { metrics: m, snapshot, findings, plan, targets } = report;
  const p = snapshot.profile;
  const { video, clips, photos, comments, mix } = media;
  const lines: string[] = [];

  lines.push(
    'Ты — маркетолог, который ведёт страницы во ВКонтакте.',
    'Ниже — полный разбор страницы: метрики стены, медиа (клипы, видео,',
    'фотографии), обсуждение и найденные зоны роста. Все числа уже',
    'посчитаны — не пересчитывай их и не выдумывай новых.',
    '',
    'Что нужно от тебя:',
    '1. Скажи, на чём эта страница держится и что ограничивает её рост.',
    '2. Построй диаграммы по разделу «Данные для диаграмм» — динамику',
    '   по месяцам и сравнение форматов между собой.',
    '3. Дай контент-план на месяц под тот формат, который здесь работает.',
    '4. Разбери тексты лучших и слабых постов: чем они отличаются.',
    '',
    `Важно: не делай выводов по форматам, где меньше ${MIN_SAMPLE} единиц`,
    'за период — такие пометки стоят ниже прямо в данных.',
    '',
    `## Страница: ${p.name} (${p.url})`,
    `Тип: ${p.kind === 'group' ? 'сообщество' : 'личная страница'}`,
    `${p.audience_label}: ${f(p.audience, 0)}`,
    `Период: ${m.period.from} — ${m.period.to} (${m.period.days} дней)`,
  );

  if (mix) {
    lines.push(
      '',
      '## Профиль контента',
      `Вывод: ${mix.label}.`,
      mix.summary,
      '',
      'формат | штук за период | доля объёма | хватает ли для выводов',
      ...mix.rows.map((r) => tsv([
        r.label, r.count, `${f(r.share, 0)}%`, r.enough ? 'да' : 'нет, мало',
      ])),
    );
    if (mix.missing.length) {
      lines.push(`Форматов нет вовсе: ${mix.missing.join(', ')} — по ним выводы не нужны.`);
    }
  }

  lines.push(
    '',
    '## Метрики стены',
    `Постов: ${m.posts_total}, из них своих: ${m.posts_own}`,
    `Частота: ${f(m.per_week)} постов в неделю`,
    `${m.er_basis_label}: ${f(m.er, 2)}% (медиана ${f(m.er_median, 2)}%)`,
    `Просмотров на пост: ${f(m.avg.views, 0)} (${f(m.views_per_audience)}% аудитории)`,
    `Реакций на пост: ${f(m.avg.engagement, 1)} — лайков ${f(m.avg.likes, 1)}, `
    + `комментариев ${f(m.avg.comments, 1)}, репостов ${f(m.avg.reposts, 1)}`,
    `Молчание: ${f(m.silent_days, 0)} дней с последнего поста`,
    `Призыв к действию — в ${f(m.cta_share, 0)}% постов, вопрос — в ${f(m.questions_share, 0)}%`,
    '',
    '## Форматы записей',
    ...m.by_type.map((t) => `- ${t.label}: ${t.n} постов (${f(t.share, 0)}%), ER ${f(t.avg_er, 2)}%`),
  );

  if (m.best_slots.length) {
    lines.push('', '## Время выхода',
      ...m.best_slots.map((s) => `- лучший слот ${s.label}: ER ${f(s.avg_er, 2)}% (${s.n} постов)`));
  }

  if (clips?.count) {
    lines.push(
      '',
      `## Клипы (${clips.count} за период${clips.count < MIN_SAMPLE ? ', мало для выводов' : ''})`,
      `Просмотров всего: ${f(clips.totalViews, 0)}, медиана на клип: ${f(clips.medianViews, 0)}`,
      `Лучший клип: ${f(clips.maxViews, 0)} просмотров`
      + (clips.spread === null ? '' : ` — в ${f(clips.spread, 1)} раза выше медианы`),
      `Выстрелов (больше трёх медиан): ${clips.hits}, они дали ${f(clips.hitsShare, 0)}% всех просмотров`,
      `Вовлечённость к просмотрам: ${f(clips.medianEr, 2)}%`,
      `Медианная длина: ${f(clips.medianDuration, 0)} сек`,
      `Не выложены записью на стену: ${clips.offWall}`,
    );
    if (clips.guessed) {
      lines.push('ВНИМАНИЕ: ВКонтакте не разметил эти ролики клипами — '
        + 'они определены по формату (вертикальные, до трёх минут).');
    }
    if (clips.byDuration.length > 1) {
      lines.push('', 'длина клипа | штук | медиана просмотров | вовлечённость',
        ...clips.byDuration.map((r) => tsv([r.label, r.count, f(r.medianViews, 0), `${f(r.medianEr, 2)}%`])));
    }
    const notes = clipFindings(clips);
    if (notes.length) lines.push('', 'Замечания по клипам:', ...notes.map((t) => `- ${t}`));
  }

  if (video?.count) {
    lines.push(
      '',
      `## Обычные видео, без клипов (${video.count} за период`
      + `${video.count < MIN_SAMPLE ? ', мало для выводов' : ''})`,
      `Просмотров всего: ${f(video.totalViews, 0)}, медиана на видео: ${f(video.medianViews, 0)}`,
      `Медиана просмотров у записей с этим видео: ${f(video.postViewsMedian, 0)}`,
      video.viewsRatio === null
        ? 'Связать видео с записями не удалось — они опубликованы мимо стены.'
        : `Видео смотрят в ${f(video.viewsRatio, 2)} раза чаще, чем открывают запись.`,
      `Комментариев к видео: ${f(video.totalComments, 0)} (медиана ${f(video.medianComments, 1)})`,
      `Медианная длина: ${f(video.medianDuration, 0)} сек`,
      `Не выложены записью: ${video.offWall}`,
      `Чужих роликов на странице (в разбор не вошли): ${video.foreign}`,
    );
    if (video.byDuration.length > 1) {
      lines.push('', 'длительность | штук | медиана просмотров | медиана комментариев',
        ...video.byDuration.map((r) => tsv([r.label, r.count, f(r.medianViews, 0), f(r.medianComments, 1)])));
    }
    if (comments) {
      const notes = videoFindings(video, comments);
      if (notes.length) lines.push('', 'Замечания по видео:', ...notes.map((t) => `- ${t}`));
    }
  }

  if (photos?.count) {
    lines.push(
      '',
      `## Фотографии (${photos.count} за период${photos.count < MIN_SAMPLE ? ', мало для выводов' : ''})`,
      `Лайков всего: ${f(photos.totalLikes, 0)}, медиана на снимок: ${f(photos.medianLikes, 0)}`,
      `Медиана лайков у записей с фотографией: ${f(photos.postLikesMedian, 0)}`,
      photos.likesRatio === null
        ? 'Связать снимки с записями не удалось — они лежат только в альбомах.'
        : `Лайков под самим снимком в ${f(photos.likesRatio, 2)} раза больше, чем под записью.`,
      `Комментариев к снимкам: ${f(photos.totalComments, 0)} (медиана ${f(photos.medianComments, 1)})`,
      `Выложено записью: ${photos.onWall}, только в альбомах: ${photos.offWall}`,
      `Лайков собрано мимо ленты: ${f(photos.offWallLikesShare, 0)}%`,
    );
    if (photos.byOrientation.length > 1) {
      lines.push('', 'форма кадра | штук | медиана лайков',
        ...photos.byOrientation.map((r) => tsv([r.label, r.count, f(r.medianLikes, 0)])));
    }
    const notes = photoFindings(photos);
    if (notes.length) lines.push('', 'Замечания по фотографиям:', ...notes.map((t) => `- ${t}`));
  }

  if (comments?.posts) {
    lines.push(
      '',
      '## Обсуждение',
      `Разобрано веток: ${comments.posts}`
      + (comments.fromVideos ? `, из них под роликами: ${comments.fromVideos}` : ''),
      `Комментариев: ${comments.total}, от людей: ${comments.fromPeople}, `
      + `ответов автора: ${comments.fromAuthor}`,
      `Веток, где автор ответил: ${f(comments.answeredShare, 0)}%`,
      comments.medianReplyHours === null
        ? 'Время до первого ответа посчитать не по чему.'
        : `Первый ответ приходит через ${f(comments.medianReplyHours, 1)} ч`,
      `Комментариев с вопросом: ${f(comments.questionShare, 0)}%`,
      `Вопросов без ответа: ${comments.unanswered.length}`,
    );
    if (comments.topWords.length) {
      lines.push(`О чём пишут: ${comments.topWords.map((w) => `${w.word} (${w.n})`).join(', ')}`);
    }
    if (comments.unanswered.length) {
      lines.push('', 'Вопросы без ответа:',
        ...comments.unanswered.map((q) => `- ${q.where}: ${q.text}`));
    }
  }

  lines.push('', '## Зоны роста');
  findings.forEach((item) => {
    lines.push(`${item.rank}. ${item.title} [${item.severity}] — ${item.evidence}`);
  });

  lines.push('', '## План на 4 недели');
  plan.forEach((stage) => {
    lines.push(`${stage.title} (${stage.metric})`);
    stage.tasks.forEach((task) => lines.push(`  - ${task.text}`));
  });

  lines.push('', '## Цели на 90 дней',
    ...targets.map((t) => `- ${t.label}: ${t.now} → ${t.goal}`));

  if (rivals && rivals.rivals.length) {
    lines.push('', `## На фоне конкурентов (медианы за ${rivals.period_days} дней)`,
      `Сравнивались: ${rivals.rivals.map((r) => r.name).join(', ')}`);
    rivals.rows.forEach((row) => {
      const verdict = row.verdict === 'behind' ? 'отстаём'
        : row.verdict === 'ahead' ? 'впереди'
          : row.verdict === 'even' ? 'наравне' : '';
      lines.push(`- ${row.label}: у нас ${row.mine}${row.unit}, `
        + `у конкурентов ${row.median}${row.unit}, лучший ${row.best}${row.unit}`
        + (verdict ? ` — ${verdict}` : ''));
    });

    const rivalPosts = rivals.rivals.flatMap((r) => r.top_posts.slice(0, 1)
      .map((post) => `--- ${r.name}, ER ${f(post.er ?? 0, 2)}%\n${post.text.slice(0, 400)}`));
    if (rivalPosts.length) {
      lines.push('', '## Лучшие посты конкурентов', ...rivalPosts);
    }
  }

  // ------------------------------------------------ готовые ряды под графики
  // Отдельным разделом и одинаковыми таблицами: модель рисует диаграмму
  // по ним напрямую, не выковыривая числа из прозы выше.
  lines.push('', '## Данные для диаграмм');

  if (m.monthly.length > 1) {
    lines.push('', 'Ряд 1. Стена по месяцам',
      'месяц | постов | просмотров в среднем | ER %',
      ...m.monthly.map((r) => tsv([r.label, r.posts, f(r.avg_views, 0), f(r.avg_er, 2)])));
  }

  if (m.by_type.length) {
    lines.push('', 'Ряд 2. Форматы записей',
      'формат | постов | доля % | ER % | просмотров в среднем',
      ...m.by_type.map((r) => tsv([r.label, r.n, f(r.share, 0), f(r.avg_er, 2), f(r.avg_views, 0)])));
  }

  if (clips?.byMonth.length) {
    lines.push('', 'Ряд 3. Клипы по месяцам',
      'месяц | клипов | медиана просмотров',
      ...clips.byMonth.map((r) => tsv([r.label, r.count, f(r.medianViews, 0)])));
  }

  if (photos?.byMonth.length) {
    lines.push('', 'Ряд 4. Фотографии по месяцам',
      'месяц | снимков | медиана лайков',
      ...photos.byMonth.map((r) => tsv([r.label, r.count, f(r.medianLikes, 0)])));
  }

  const compare: string[] = [];
  if (video?.count) {
    compare.push(tsv(['обычные видео', video.count, f(video.medianViews, 0), f(video.medianComments, 1)]));
  }
  if (clips?.count) {
    compare.push(tsv(['клипы', clips.count, f(clips.medianViews, 0), f(clips.totalComments / clips.count, 1)]));
  }
  if (photos?.count) {
    compare.push(tsv(['фотографии', photos.count, '—', f(photos.medianComments, 1)]));
  }
  if (compare.length > 1) {
    lines.push('', 'Ряд 5. Медиа между собой',
      'формат | штук | медиана просмотров | медиана комментариев', ...compare);
  }

  if (m.top_posts.length) {
    lines.push('', '## Лучшие посты (тексты для разбора)');
    m.top_posts.forEach((post) => {
      lines.push(`--- ER ${f(post.er ?? post.er_aud, 2)}%, ${f(post.views, 0)} просмотров`);
      lines.push(post.text.slice(0, 600));
    });
  }

  if (m.flop_posts.length) {
    lines.push('', '## Слабые посты (для сравнения)');
    m.flop_posts.slice(0, 3).forEach((post) => {
      lines.push(`--- ER ${f(post.er ?? post.er_aud, 2)}%, ${f(post.views, 0)} просмотров`);
      lines.push(post.text.slice(0, 400));
    });
  }

  return lines.join('\n');
}
