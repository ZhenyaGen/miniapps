import type { ReactNode } from 'react';
import {
  Div, Footnote, Group, Header, Placeholder, SimpleCell,
} from '@vkontakte/vkui';

import type { Metrics } from '../engine/types';
import { f, withSign } from '../engine/util';
import { plural } from './plural';

/**
 * Пояснение под блоком — маленьким серым.
 *
 * Здесь они нужны чаще, чем где-либо ещё: числа внутренней статистики
 * ВКонтакте считаются не так, как ждёшь, и без подписи выглядят дико —
 * «754 812 человек старше 45» у страницы с тремя тысячами подписчиков.
 */
function Note({ children }: { children: ReactNode }) {
  return (
    <Div style={{ paddingTop: 0 }}>
      <Footnote style={{ color: 'var(--vkui--color_text_secondary)' }}>{children}</Footnote>
    </Div>
  );
}

/**
 * Доля строки в наборе.
 *
 * Абсолютные числа демографии сложены по дням и потому огромны, а доли
 * складываются честно: они и есть ответ на вопрос «кто нас смотрит».
 */
function shares(rows: Array<[string, number]>): Array<[string, number, number]> {
  const total = rows.reduce((sum, [, n]) => sum + n, 0);
  return rows.map(([label, n]) => [label, n, total ? (n / total) * 100 : 0]);
}

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

  const sexAge = gs ? shares(gs.sex_age) : [];
  const cities = gs ? shares(gs.cities) : [];
  const days = gs?.days.length ?? 0;

  return (
    <>
      {reach && (
        <Group header={<Header subtitle={`по ${reach.posts} ${plural(reach.posts, 'посту', 'постам', 'постам')}`}>
          Охваты постов
        </Header>}
        >
          <SimpleCell indicator={f(reach.avg_total, 0)}>Средний охват</SimpleCell>
          <SimpleCell indicator={f(reach.avg_subscribers, 0)}>Из них подписчики</SimpleCell>
          <SimpleCell indicator={`${f(reach.viral_share, 0)}%`}>Виральный охват</SimpleCell>
          <SimpleCell indicator={`${f(reach.coverage, 0)}%`}>Охват своей базы</SimpleCell>
          <SimpleCell indicator={String(reach.joins)}>Подписок с постов</SimpleCell>
          <SimpleCell indicator={String(reach.hides)}>Скрытий записей</SimpleCell>
          {Boolean(reach.link_clicks) && (
            <SimpleCell indicator={String(reach.link_clicks)}>Переходов по ссылкам</SimpleCell>
          )}
          <Note>
            Охват — сколько человек увидели запись. Виральный — те, кто
            не подписан: их привели репосты и рекомендации. «Охват своей
            базы» — какая доля подписчиков вообще увидела запись; ниже 15%
            значит, что лента почти не показывает страницу своим же.
          </Note>
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
            <Note>
              Всё за выбранный период. «Отток от прироста» — сколько
              отписавшихся приходится на сотню подписавшихся: выше 50%
              значит, что половину новых людей страница теряет обратно.
            </Note>
          </Group>

          {sexAge.length > 0 && (
            <Group header={<Header subtitle="доля просмотров, а не число людей">
              Кто смотрит: пол и возраст
            </Header>}
            >
              {sexAge.map(([label, count, share]) => (
                <SimpleCell key={label} multiline indicator={`${f(share, 0)}%`}>
                  <div>
                    <div>{label}</div>
                    <div style={{ marginTop: 6 }}>
                      <div className="bar-track">
                        <div className="bar" style={{ width: `${Math.max(share, 2)}%` }} />
                      </div>
                    </div>
                    <Footnote style={{ color: 'var(--vkui--color_text_tertiary)', marginTop: 4, display: 'block' }}>
                      {`${f(count, 0)} просмотров за период`}
                    </Footnote>
                  </div>
                </SimpleCell>
              ))}
              <Note>
                <b>Это не количество людей.</b>
                {' ВКонтакте отдаёт демографию охвата по дням, и здесь они '}
                {`сложены за ${days} ${plural(days, 'день', 'дня', 'дней')} периода: `}
                {'один и тот же человек '}
                считается заново каждый день, когда видел записи. Поэтому
                абсолютные числа выходят больше, чем подписчиков, — смотреть
                надо на доли: они и показывают, кто вас читает.
              </Note>
            </Group>
          )}

          {cities.length > 0 && (
            <Group header={<Header subtitle="доля посещений страницы">Откуда заходят</Header>}>
              {cities.map(([name, count, share]) => (
                <SimpleCell
                  key={name}
                  indicator={`${f(share, 0)}%`}
                  subtitle={`${f(count, 0)} посещений за период`}
                >
                  {name}
                </SimpleCell>
              ))}
              <Note>
                Считаются заходы на саму страницу, а не просмотры записей
                в ленте, и тоже сложены по дням: один человек попадает сюда
                столько раз, сколько раз заходил. Полезны доли — по ним
                видно, под какой город и часовой пояс писать.
              </Note>
            </Group>
          )}
        </>
      )}
    </>
  );
}
