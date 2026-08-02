import type { CSSProperties } from 'react';
import { Div, Footnote, Group, Header, SimpleCell, Text } from '@vkontakte/vkui';

import type { Metrics, Post } from '../engine/types';
import { f } from '../engine/util';
import { Heatmap } from './Heatmap';

function Bar({ value, max, color = 'var(--accent-blue)' }: {
  value: number;
  max: number;
  color?: string;
}) {
  const width = max ? Math.max((value / max) * 100, 2) : 0;
  return (
    <div className="bar-track">
      <div
        className="bar"
        style={{ width: `${width}%`, '--bar-color': color } as CSSProperties}
      />
    </div>
  );
}

function PostRow({ post, erBasis }: { post: Post; erBasis: Metrics['er_basis'] }) {
  const er = erBasis === 'views' ? post.er : post.er_aud;
  return (
    <SimpleCell
      multiline
      href={post.url}
      target="_blank"
      rel="noreferrer"
      subtitle={`${post.date_label} · ${f(post.views, 0)} просмотров · `
        + `${post.likes}❤ ${post.comments}💬 ${post.reposts}↗`}
      indicator={er === null ? '—' : `${f(er, 2)}%`}
    >
      {post.excerpt}
    </SimpleCell>
  );
}

export function ContentView({ metrics: m }: { metrics: Metrics }) {
  const maxTypeEr = Math.max(...m.by_type.map((t) => t.avg_er), 0);
  const maxLenEr = Math.max(...m.by_length.map((b) => b.avg_er), 0);

  return (
    <>
      <Group header={<Header subtitle="Отсортировано по вовлечённости">Форматы</Header>}>
        {m.by_type.map((row, i) => (
          <SimpleCell
            key={row.type}
            multiline
            subtitle={`${row.n} постов · ${f(row.share, 0)}% ленты · ${f(row.avg_views, 0)} просмотров`}
            indicator={`${f(row.avg_er, 2)}%`}
            after={undefined}
          >
            <div>
              <Text>{row.label}</Text>
              <div style={{ marginTop: 6 }}>
                <Bar
                  value={row.avg_er}
                  max={maxTypeEr}
                  color={i === 0 ? 'var(--accent-green)' : 'var(--accent-blue)'}
                />
              </div>
            </div>
          </SimpleCell>
        ))}
      </Group>

      <Group header={<Header>Когда выходят посты</Header>}>
        <Div><Heatmap grid={m.heatmap} /></Div>
        {m.best_slots.length > 0 && (
          <SimpleCell multiline subtitle={m.best_slots.map((s) => `${s.label} — ER ${f(s.avg_er, 2)}%`).join('\n')}>
            Лучшие слоты
          </SimpleCell>
        )}
        {m.worst_slots.length > 0 && (
          <SimpleCell multiline subtitle={m.worst_slots.map((s) => `${s.label} — ER ${f(s.avg_er, 2)}%`).join('\n')}>
            Слабые слоты
          </SimpleCell>
        )}
      </Group>

      {m.by_length.length > 0 && (
        <Group header={<Header>Длина текста</Header>}>
          {m.by_length.map((row) => (
            <SimpleCell key={row.label} multiline subtitle={`${row.n} постов`} indicator={`${f(row.avg_er, 2)}%`}>
              <div>
                <Text>{`${row.label} знаков`}</Text>
                <div style={{ marginTop: 6 }}>
                  <Bar value={row.avg_er} max={maxLenEr} color="var(--accent-violet)" />
                </div>
              </div>
            </SimpleCell>
          ))}
        </Group>
      )}

      {m.monthly.length > 1 && (
        <Group header={<Header>Помесячно</Header>}>
          {m.monthly.map((row) => (
            <SimpleCell
              key={row.key}
              subtitle={`${row.posts} постов · ${f(row.avg_views, 0)} просмотров в среднем`}
              indicator={`${f(row.avg_er, 2)}%`}
            >
              {row.label}
            </SimpleCell>
          ))}
        </Group>
      )}

      {m.top_posts.length > 0 && (
        <Group header={<Header>Топ постов</Header>}>
          {m.top_posts.map((post) => <PostRow key={post.id} post={post} erBasis={m.er_basis} />)}
        </Group>
      )}

      {m.flop_posts.length > 0 && (
        <Group header={<Header>Слабые посты</Header>}>
          {m.flop_posts.map((post) => <PostRow key={post.id} post={post} erBasis={m.er_basis} />)}
        </Group>
      )}

      <Group header={<Header>Приёмы в текстах</Header>}>
        <SimpleCell indicator={`${f(m.cta_share, 0)}%`}>Призыв к действию</SimpleCell>
        <SimpleCell indicator={`${f(m.questions_share, 0)}%`}>Вопрос в тексте</SimpleCell>
        <SimpleCell indicator={`${f(m.links_share, 0)}%`}>Ссылка в посте</SimpleCell>
        <SimpleCell indicator={`${f(m.hashtags.share_with, 0)}%`}>Хэштеги</SimpleCell>
        <SimpleCell indicator={`${f(m.reposts_share, 0)}%`}>Репосты чужого</SimpleCell>
        <Div>
          <Footnote style={{ color: 'var(--vkui--color_text_secondary)' }}>
            {`Средняя длина поста — ${f(m.avg.len, 0)} знаков, тегов на пост — ${f(m.tags_per_post, 1)}.`}
          </Footnote>
        </Div>
      </Group>
    </>
  );
}
