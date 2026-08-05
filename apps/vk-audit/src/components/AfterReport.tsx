import { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  Button, Div, Footnote, Group, Header, SimpleCell, Text,
} from '@vkontakte/vkui';

import {
  AUTHOR_MESSAGE_URL, DONATE_URL, FEEDBACK_URL, VK_BOT_GROUP_ID,
} from '../config';

/**
 * Что дальше — сразу после отчёта.
 *
 * Разбор человек прочитал и закрыл; через неделю он не вернётся, даже
 * если понравилось. Поэтому в конце — один вопрос и развилка: тем, кому
 * зашло, предлагаем следить дальше, у остальных спрашиваем, чего
 * не хватило. Продавать подписку тому, кому разбор не понравился,
 * бессмысленно и раздражает.
 *
 * Подписку исполняет бот сообщества: приложение ничего не хранит и
 * хранить не начнёт. Оно только передаёт разрешение на сообщения,
 * а адрес страницы уезжает в поле `key` — бот заведёт подписку сразу,
 * без переписки.
 */

type State = 'ask' | 'yes' | 'no' | 'busy' | 'allowed' | 'denied';

export function AfterReport({ target }: { target: string }) {
  const [state, setState] = useState<State>('ask');
  const botReady = Boolean(VK_BOT_GROUP_ID);

  const subscribe = async () => {
    setState('busy');
    try {
      const data = await bridge.send('VKWebAppAllowMessagesFromGroup', {
        group_id: VK_BOT_GROUP_ID,
        key: target,
      });
      setState(data.result ? 'allowed' : 'denied');
    } catch {
      setState('denied');
    }
  };

  if (state === 'allowed') {
    return (
      <Group header={<Header>Готово</Header>}>
        <Div>
          <Text>
            Первый разбор придёт в личные сообщения в ближайшие минуты,
            дальше — раз в неделю. В письме будет то же, что в отчёте, плюс
            «было → стало» и проверка, сделали ли вы то, что советовали
            в прошлый раз.
          </Text>
          <Footnote style={{ color: 'var(--vkui--color_text_secondary)', display: 'block', marginTop: 10 }}>
            Периодичность меняется словами «неделя», «две недели» или
            «месяц» прямо в переписке. «Стоп» — отключить.
          </Footnote>
        </Div>
      </Group>
    );
  }

  if (state === 'no') {
    return (
      <Group header={<Header>Жаль. Чего не хватило?</Header>}>
        <Div>
          <Footnote style={{ color: 'var(--vkui--color_text_secondary)', display: 'block', marginBottom: 12 }}>
            Отчёт собирают правила, которые написал человек, — значит, их
            можно поправить. Скажите, что оказалось бесполезным или чего
            не нашлось: это самая полезная обратная связь из возможных.
          </Footnote>
          {FEEDBACK_URL && (
            <Button
              size="l"
              stretched
              href={FEEDBACK_URL}
              target="_blank"
              rel="noreferrer"
              style={{ marginBottom: 8 }}
            >
              Написать, что не так
            </Button>
          )}
          <Button
            size="l"
            stretched
            mode="secondary"
            href={AUTHOR_MESSAGE_URL}
            target="_blank"
            rel="noreferrer"
          >
            Или сразу автору в личные
          </Button>
        </Div>
      </Group>
    );
  }

  if (state === 'ask') {
    return (
      <Group header={<Header>Зашло?</Header>}>
        <Div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <Button size="l" stretched onClick={() => setState('yes')}>
            👍 Да, полезно
          </Button>
          <Button size="l" stretched mode="secondary" onClick={() => setState('no')}>
            🤔 Не очень
          </Button>
        </Div>
      </Group>
    );
  }

  // 'yes' | 'busy' | 'denied' — предложение следить дальше
  return (
    <Group header={<Header subtitle="личный ИИ-ассистент по вашей странице">
      Тогда дальше слежу я
    </Header>}
    >
      <Div>
        <Text>
          Раз в неделю пришлю в личные сообщения, что изменилось: где
          выросло, где просело и что делать на этой неделе. Считает тот же
          движок, что и отчёт, — цифры сойдутся. Пересказывает по-человечески
          нейросеть, но выдумывать ей нечего: числа ей дают готовыми.
        </Text>
      </Div>

      <SimpleCell disabled multiline subtitle="сравнение с прошлым разом, а не отчёт заново">
        Было → стало
      </SimpleCell>
      <SimpleCell disabled multiline subtitle="в прошлый раз советовали — сделали или нет">
        Проверка советов
      </SimpleCell>
      <SimpleCell disabled multiline subtitle="ответит по цифрам последнего разбора прямо в переписке">
        Вопросы в личке
      </SimpleCell>

      <Div>
        {botReady ? (
          <>
            <Button
              size="l"
              stretched
              loading={state === 'busy'}
              onClick={subscribe}
            >
              Подписаться на еженедельный отчёт
            </Button>
            {state === 'denied' && (
              <Footnote style={{ color: 'var(--vkui--color_text_negative)', display: 'block', marginTop: 8 }}>
                Без разрешения на сообщения бот писать не сможет. Кнопка
                останется здесь — можно включить позже.
              </Footnote>
            )}
          </>
        ) : (
          <Footnote style={{ color: 'var(--vkui--color_text_secondary)', display: 'block' }}>
            Подписка скоро откроется: бот уже написан, осталось его запустить.
            Чтобы не пропустить — подпишитесь на сообщество, я напишу там.
          </Footnote>
        )}

        <Footnote style={{ color: 'var(--vkui--color_text_secondary)', display: 'block', marginTop: 12 }}>
          Раз в месяц и сухими цифрами — бесплатно и навсегда. Еженедельно,
          с разбором от ассистента и вопросами в переписке — по подписке
          VK Donut: она же оплачивает нейросеть и сервер.
        </Footnote>

        {DONATE_URL && (
          <Button
            size="m"
            stretched
            mode="tertiary"
            href={DONATE_URL}
            target="_blank"
            rel="noreferrer"
            style={{ marginTop: 8 }}
          >
            Что входит в подписку
          </Button>
        )}
      </Div>
    </Group>
  );
}
