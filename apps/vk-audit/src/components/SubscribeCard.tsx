import { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { Button, Div, Footnote, Group, Header, Text } from '@vkontakte/vkui';

import { VK_BOT_GROUP_ID } from '../config';

type State = 'idle' | 'busy' | 'allowed' | 'denied';

/**
 * Подписка на разборы в личные сообщения.
 *
 * Адрес страницы уезжает в поле `key`: бот получит его вместе с событием
 * `message_allow` и заведёт подписку сразу, без переписки.
 */
export function SubscribeCard({ target, period }: { target: string; period: string }) {
  const [state, setState] = useState<State>('idle');

  if (!VK_BOT_GROUP_ID) return null;

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

  return (
    <Group header={<Header>Следить за страницей</Header>}>
      <Div>
        {state === 'allowed' ? (
          <Text>
            Готово. Бот пришлёт разбор в личные сообщения — что изменилось,
            где просело и что делать дальше. Периодичность меняется словами
            «неделя» или «месяц» прямо в переписке.
          </Text>
        ) : (
          <>
            <Text>
              {`Бот будет присылать разбор этой страницы в личные сообщения ${period} — `}
              с той же математикой, что и в отчёте, плюс сравнение с прошлым разом.
            </Text>
            {state === 'denied' && (
              <Footnote style={{ color: 'var(--vkui--color_text_negative)', display: 'block', marginTop: 8 }}>
                Без разрешения на сообщения бот писать не сможет. Можно включить
                позже — кнопка останется здесь.
              </Footnote>
            )}
            <Button
              size="l"
              stretched
              loading={state === 'busy'}
              onClick={subscribe}
              style={{ marginTop: 12 }}
            >
              Получать разборы в личные
            </Button>
          </>
        )}
      </Div>
    </Group>
  );
}
