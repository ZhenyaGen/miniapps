import { useState } from 'react';
import {
  Avatar, Banner, Button, Div, FormItem, Group, Header, Input, PanelHeader,
  Placeholder, SimpleCell, Spacing, Text,
} from '@vkontakte/vkui';

import { f } from '../engine/util';
import { Footer } from '../components/Footer';
import type { AdminGroup } from '../vk/collect';

interface Props {
  signedIn: boolean;
  insideVK: boolean;
  adminGroups: AdminGroup[];
  error: string | null;
  onSignIn: () => void;
  onAudit: (target: string) => void;
  onDemo: () => void;
}

export function StartPanel({
  signedIn, insideVK, adminGroups, error, onSignIn, onAudit, onDemo,
}: Props) {
  const [target, setTarget] = useState('');

  return (
    <>
      <PanelHeader>Аудит страницы ВК</PanelHeader>

      <Div>
        <div className="hero rise">
          <h1 className="hero__title">Что мешает странице расти</h1>
          <p className="hero__subtitle">
            Метрики, зоны роста и план на 4 недели — по любому открытому
            сообществу ВКонтакте
          </p>
        </div>
      </Div>

      {error && (
        <Div>
          <Banner mode="tint" title="Не получилось" subtitle={error} />
        </Div>
      )}

      <Group header={<Header>Что проверяем</Header>}>
        <FormItem
          top="Ссылка на сообщество или страницу"
          bottom="Например, vk.com/vkappsdev — подойдёт любое открытое сообщество, не только своё"
        >
          <Input
            value={target}
            placeholder="vk.com/my_group"
            onChange={(e) => setTarget(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && target.trim()) onAudit(target.trim());
            }}
          />
        </FormItem>
        <Div>
          <Button
            size="l"
            stretched
            disabled={!target.trim()}
            onClick={() => onAudit(target.trim())}
          >
            Собрать аудит
          </Button>
        </Div>
      </Group>

      {!signedIn && (
        <Group header={<Header>Доступ к данным</Header>}>
          <Placeholder
            title="Нужен вход через ВКонтакте"
            action={<Button size="m" onClick={onSignIn}>Войти</Button>}
          >
            {insideVK
              ? 'ВКонтакте спросит разрешение на чтение сообществ и их статистики. '
                + 'Данные никуда не отправляются — весь расчёт идёт в этом окне.'
              : 'Приложение открыто вне ВКонтакте. Вход пойдёт через браузер с '
                + 'возвратом на localhost:8910 — так же, как в десктопной версии.'}
          </Placeholder>
        </Group>
      )}

      {adminGroups.length > 0 && (
        <Group header={<Header>Ваши сообщества</Header>}>
          {adminGroups.slice(0, 10).map((group) => (
            <SimpleCell
              key={group.id}
              before={<Avatar size={40} src={group.photo} />}
              subtitle={`${f(group.members, 0)} подписчиков`}
              onClick={() => onAudit(String(group.id))}
            >
              {group.name}
            </SimpleCell>
          ))}
        </Group>
      )}

      <Group header={<Header>Посмотреть без входа</Header>}>
        <Div>
          <Text style={{ color: 'var(--vkui--color_text_secondary)' }}>
            Демо-режим показывает готовый отчёт на вымышленном сообществе.
            Считает его тот же движок, что и настоящие страницы.
          </Text>
          <Spacing size={12} />
          <Button size="l" stretched mode="secondary" onClick={onDemo}>
            Открыть демо-отчёт
          </Button>
        </Div>
      </Group>

      <Footer />
    </>
  );
}
