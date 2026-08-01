/** Бриф для чата с ИИ: весь контекст отчёта текстом, без ключей и без сети. */

import type { Report } from '../App';
import { f } from '../engine/util';

export function buildBrief(report: Report): string {
  const { metrics: m, snapshot, findings, plan, targets } = report;
  const p = snapshot.profile;
  const lines: string[] = [];

  lines.push(
    'Ты — маркетолог, который ведёт страницы во ВКонтакте.',
    'Ниже — метрики страницы и найденные зоны роста. Числа уже посчитаны:',
    'не пересчитывай их и не выдумывай новых. Дай контент-план на месяц',
    'и разбор, что менять в текстах.',
    '',
    `## Страница: ${p.name} (${p.url})`,
    `Тип: ${p.kind === 'group' ? 'сообщество' : 'личная страница'}`,
    `${p.audience_label}: ${f(p.audience, 0)}`,
    `Период: ${m.period.from} — ${m.period.to} (${m.period.days} дней)`,
    '',
    '## Метрики',
    `Постов: ${m.posts_total}, из них своих: ${m.posts_own}`,
    `Частота: ${f(m.per_week)} постов в неделю`,
    `${m.er_basis_label}: ${f(m.er, 2)}% (медиана ${f(m.er_median, 2)}%)`,
    `Просмотров на пост: ${f(m.avg.views, 0)} (${f(m.views_per_audience)}% аудитории)`,
    `Реакций на пост: ${f(m.avg.engagement, 1)} — лайков ${f(m.avg.likes, 1)}, `
    + `комментариев ${f(m.avg.comments, 1)}, репостов ${f(m.avg.reposts, 1)}`,
    `Молчание: ${f(m.silent_days, 0)} дней с последнего поста`,
    `Призыв к действию — в ${f(m.cta_share, 0)}% постов, вопрос — в ${f(m.questions_share, 0)}%`,
    '',
    '## Форматы',
    ...m.by_type.map((t) => `- ${t.label}: ${t.n} постов (${f(t.share, 0)}%), ER ${f(t.avg_er, 2)}%`),
  );

  if (m.best_slots.length) {
    lines.push('', '## Время выхода',
      ...m.best_slots.map((s) => `- лучший слот ${s.label}: ER ${f(s.avg_er, 2)}% (${s.n} постов)`));
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

  if (m.top_posts.length) {
    lines.push('', '## Лучшие посты (тексты для разбора)');
    m.top_posts.forEach((post) => {
      lines.push(`--- ER ${f(post.er ?? post.er_aud, 2)}%, ${f(post.views, 0)} просмотров`);
      lines.push(post.text.slice(0, 600));
    });
  }

  return lines.join('\n');
}
