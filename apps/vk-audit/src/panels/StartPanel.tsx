import { useState } from 'react';
import {
  Avatar, Banner, Button, Div, FormItem, Group, Header, Input, PanelHeader,
  Placeholder, SegmentedControl, SimpleCell, Spacing, Text,
} from '@vkontakte/vkui';

import { f } from '../engine/util';
import { Footer } from '../components/Footer';
import type { AdminGroup } from '../vk/collect';

type Mode = 'user' | 'group';

/**
 * Подписи под выбранный тип страницы.
 *
 * Тип — только подсказка для человека: что именно разбирать, приложение
 * всё равно определяет по ответу `utils.resolveScreenName`. Ошибиться
 * кнопкой не страшно — отчёт соберётся по тому, что на самом деле лежит
 * по адресу.
 */
const MODES: Record<Mode, {
  placeholder: string;
  top: string;
  bottom: string;
  submit: string;
}> = {
  user: {
    placeholder: 'vk.com/ea_tyurin',
    top: 'Ссылка на страницу человека',
    bottom: 'Или короткое имя: ea_tyurin. Подойдёт любая открытая страница — '
      + 'своя, коллеги или автора, у которого хочется подсмотреть, что работает.',
    submit: 'Проверить личную страницу',
  },
  group: {
    placeholder: 'vk.com/my_group',
    top: 'Ссылка на сообщество',
    bottom: 'Например, vk.com/vkappsdev — подойдёт любое открытое сообщество, '
      + 'не только своё.',
    submit: 'Проверить сообщество',
  },
};

interface Props {
  signedIn: boolean;
  insideVK: boolean;
  selfId: number | null;
  adminGroups: AdminGroup[];
  error: string | null;
  onSignIn: () => void;
  onAudit: (target: string) => void;
  onDemo: () => void;
}

export function StartPanel({
  signedIn, insideVK, selfId, adminGroups, error, onSignIn, onAudit, onDemo,
}: Props) {
  const [mode, setMode] = useState<Mode>('user');
  const [target, setTarget] = useState('');
  const copy = MODES[mode];

  return (
    <>
      <PanelHeader>Аудит страницы ВК</PanelHeader>

      <Div>
        <div className="hero rise">
          <h1 className="hero__title">Что мешает странице расти</h1>
          <p className="hero__subtitle">
            Метрики, зоны роста и план на 4 недели — по личной странице
            или сообществу ВКонтакте
          </p>
        </div>
      </Div>

      {error && (
        <Div>
          <Banner mode="tint" title="Не получилось" subtitle={error} />
        </Div>
      )}

      <Group header={<Header>Что проверяем</Header>}>
        <Div>
          <SegmentedControl
            value={mode}
            onChange={(value) => setMode(value as Mode)}
            options={[
              { label: 'Личная страница', value: 'user', 'aria-label': 'Личная страница' },
              { label: 'Сообщество', value: 'group', 'aria-label': 'Сообщество' },
            ]}
          />
        </Div>

        {mode === 'user' && selfId !== null && (
          <Div style={{ paddingTop: 0 }}>
            <Button size="l" stretched onClick={() => onAudit(`id${selfId}`)}>
              Проверить мою страницу
            </Button>
          </Div>
        )}

        <FormItem top={copy.top} bottom={copy.bottom}>
          <Input
            value={target}
            placeholder={copy.placeholder}
            onChange={(e) => setTarget(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && target.trim()) onAudit(target.trim());
            }}
          />
        </FormItem>
        <Div style={{ paddingTop: 0 }}>
          <Button
            size="l"
            stretched
            mode={mode === 'user' && selfId !== null ? 'secondary' : 'primary'}
            disabled={!target.trim()}
            onClick={() => onAudit(target.trim())}
          >
            {copy.submit}
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

      {mode === 'group' && adminGroups.length > 0 && (
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
