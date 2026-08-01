import { Group, Header, MiniInfoCell, Placeholder, SimpleCell } from '@vkontakte/vkui';

import type { Metrics } from '../engine/types';
import { f, withSign } from '../engine/util';

export function AudienceView({ metrics: m }: { metrics: Metrics }) {
  const gs = m.group_stats;
  const reach = m.reach;

  if (!gs && !reach) {
    return (
      <Group>
        <Placeholder title="Внутренняя статистика недоступна">
          Охваты, демографию и подписки-отписки ВКонтакте отдаёт только
          администратору сообщества. Всё остальное в отчёте посчитано
          по публичным данным постов.
        </Placeholder>
      </Group>
    );
  }

  return (
    <>
      {reach && (
        <Group header={<Header subtitle={`по ${reach.posts} постам`}>Охваты постов</Header>}>
          <SimpleCell indicator={f(reach.avg_total, 0)}>Средний охват</SimpleCell>
          <SimpleCell indicator={f(reach.avg_subscribers, 0)}>Из них подписчики</SimpleCell>
          <SimpleCell indicator={`${f(reach.viral_share, 0)}%`}>Виральный охват</SimpleCell>
          <SimpleCell indicator={`${f(reach.coverage, 0)}%`}>Охват своей базы</SimpleCell>
          <SimpleCell indicator={String(reach.joins)}>Подписок с постов</SimpleCell>
          <SimpleCell indicator={String(reach.hides)}>Скрытий записей</SimpleCell>
          {Boolean(reach.link_clicks) && (
            <SimpleCell indicator={String(reach.link_clicks)}>Переходов по ссылкам</SimpleCell>
          )}
        </Group>
      )}

      {gs && (
        <>
          <Group header={<Header>Подписки и отписки</Header>}>
            <SimpleCell indicator={String(gs.subscribed)}>Подписалось</SimpleCell>
            <SimpleCell indicator={String(gs.unsubscribed)}>Отписалось</SimpleCell>
            <SimpleCell indicator={withSign(gs.net)}>Чистый прирост</SimpleCell>
            <SimpleCell indicator={`${f(gs.churn, 0)}%`}>Отток от прироста</SimpleCell>
            <SimpleCell indicator={f(gs.avg_reach, 0)}>Средний охват в день</SimpleCell>
            <SimpleCell indicator={f(gs.avg_visitors, 0)}>Посетителей в день</SimpleCell>
          </Group>

          {gs.sex_age.length > 0 && (
            <Group header={<Header>Пол и возраст</Header>}>
              {gs.sex_age.map(([label, count]) => (
                <MiniInfoCell key={label} textWrap="full">{`${label} — ${f(count, 0)}`}</MiniInfoCell>
              ))}
            </Group>
          )}

          {gs.cities.length > 0 && (
            <Group header={<Header>Города</Header>}>
              {gs.cities.map(([name, count]) => (
                <MiniInfoCell key={name} textWrap="full">{`${name} — ${f(count, 0)}`}</MiniInfoCell>
              ))}
            </Group>
          )}
        </>
      )}
    </>
  );
}
