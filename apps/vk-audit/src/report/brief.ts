/** Бриф для чата с ИИ: весь контекст отчёта текстом, без ключей и без сети. */

import type { Report } from '../App';
import type { RivalsReport } from '../engine/rivals';
import { f } from '../engine/util';
import { findGaps, MIN_SAMPLE } from './gaps';

/** Строка таблицы для брифа: разделитель — «|», как в markdown. */
const tsv = (cells: Array<string | number>): string => cells.join(' | ');

export function buildBrief(report: Report, rivals?: RivalsReport | null): string {
  const { metrics: m, snapshot, findings, plan, targets } = report;
  const p = snapshot.profile;
  const lines: string[] = [];

  lines.push(
    'Ты — маркетолог, который ведёт страницы во ВКонтакте.',
    'Ниже — разбор ленты страницы: метрики записей, форматы, время выхода',
    'и найденные зоны роста. Все числа уже посчитаны — не пересчитывай их',
    'и не выдумывай новых.',
    '',
    'Что нужно от тебя:',
    '1. Скажи, на чём эта страница держится и что ограничивает её рост.',
    '2. Построй диаграммы по разделу «Данные для диаграмм» — динамику',
    '   по месяцам и сравнение форматов между собой.',
    '3. Дай контент-план на месяц под тот формат, который здесь работает.',
    '4. Разбери тексты лучших и слабых постов: чем они отличаются.',
    '5. Отдельно пройдись по разделу «Чего на странице нет»: что из этого',
    '   стоит завести в первую очередь и что это даст. Если видишь другие',
    '   упущенные форматы или рубрики — предложи их тоже.',
    '',
    `Важно: не делай выводов по форматам, где меньше ${MIN_SAMPLE} записей`,
    'за период — на таком числе медиана это совпадение, а не наблюдение.',
    '',
    `## Страница: ${p.name} (${p.url})`,
    `Тип: ${p.kind === 'group' ? 'сообщество' : 'личная страница'}`,
    `${p.audience_label}: ${f(p.audience, 0)}`,
    `Период: ${m.period.from} — ${m.period.to} (${m.period.days} дней)`,
  );

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

  // ------------------------------------------------- чего нет, а могло бы быть
  // Отсутствие в метрики не попадает: нет опросов — нет и строки про
  // опросы. Поэтому список отдельным разделом, иначе его не увидит
  // ни человек, ни модель.
  const gaps = findGaps({ metrics: m, rivals });
  if (gaps.length) {
    lines.push('', '## Чего на странице нет (и стоит ли заводить)');
    gaps.forEach((gap) => {
      lines.push(`- ${gap.label}. ${gap.detail} Что это дало бы: ${gap.gain}`);
    });
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
