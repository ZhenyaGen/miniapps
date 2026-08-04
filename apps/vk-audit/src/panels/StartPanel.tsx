import { useState } from 'react';
import {
  Avatar, Banner, Button, Div, FormItem, Group, Header, HorizontalScroll, Input,
  PanelHeader, Placeholder, SegmentedControl, SimpleCell, Spacing, Tabs, TabsItem, Text,
} from '@vkontakte/vkui';

import { PERIOD_OPTIONS } from '../config';
import { f } from '../engine/util';
import { Footer } from '../components/Footer';
import { GuideView } from '../components/GuideView';
import type { AdminGroup } from '../vk/collect';

type Mode = 'user' | 'group';
type Screen = 'audit' | 'guide';

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
  periodDays: number;
  onPeriodChange: (days: number) => void;
  onSignIn: () => void;
  onAudit: (target: string) => void;
  onDemo: () => void;
}

export function StartPanel({
  signedIn, insideVK, selfId, adminGroups, error, periodDays,
  onPeriodChange, onSignIn, onAudit, onDemo,
}: Props) {
  const [screen, setScreen] = useState<Screen>('audit');
  const [mode, setMode] = useState<Mode>('user');
  const [target, setTarget] = useState('');
  const copy = MODES[mode];
  const period = PERIOD_OPTIONS.find((p) => p.days === periodDays) ?? PERIOD_OPTIONS[2];

  return (
    <>
      <PanelHeader>Аудит страницы ВК</PanelHeader>

      <Div>
        <div className="hero hero--live rise">
          <h1 className="hero__title">Что мешает странице расти</h1>
          <p className="hero__subtitle">
            Метрики, зоны роста и план на 4 недели — по личной странице
            или сообществу ВКонтакте
          </p>
        </div>
      </Div>

      <Group>
        <Tabs layoutFillMode="auto">
          <TabsItem selected={screen === 'audit'} onClick={() => setScreen('audit')}>
            Аудит
          </TabsItem>
          <TabsItem selected={screen === 'guide'} onClick={() => setScreen('guide')}>
            Инструкция
          </TabsItem>
        </Tabs>
      </Group>

      {screen === 'guide' ? (
        <>
          <GuideView />
          <Footer />
        </>
      ) : (
        <>
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

            <FormItem
              top="За какой период считать"
              bottom={insideVK
                ? `${period.hint}. При первом сборе ВКонтакте спросит доступ `
                  + 'к записям и статистике — без него отчёт не посчитать. '
                  + 'Данные остаются в этом окне.'
                : period.hint}
            >
              <HorizontalScroll>
                <div className="chips chips--nowrap">
                  {PERIOD_OPTIONS.map((option) => (
                    <button
                      key={option.days}
                      type="button"
                      className={`chip${option.days === periodDays ? ' chip--on' : ''}`}
                      onClick={() => onPeriodChange(option.days)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </HorizontalScroll>
            </FormItem>

            {/* кнопка появляется вместе с адресом: серая неактивная кнопка
                под пустым полем ничего не сообщает, а место занимает */}
            {target.trim() && (
              <Div style={{ paddingTop: 0 }}>
                <Button
                  size="l"
                  stretched
                  className="rise"
                  onClick={() => onAudit(target.trim())}
                >
                  {copy.submit}
                </Button>
              </Div>
            )}
          </Group>

          {/*
            Внутри ВКонтакте отдельного входа нет: человек уже опознан
            параметрами запуска, а доступ к данным спрашивается в момент
            сбора — правила платформы, пункт 1.2.2. Экран входа остаётся
            только снаружи, где параметров запуска не существует.
          */}
          {!signedIn && !insideVK && (
            <Group header={<Header>Доступ к данным</Header>}>
              <Placeholder
                title="Нужен вход через ВКонтакте"
                action={<Button size="m" onClick={onSignIn}>Войти</Button>}
              >
                Приложение открыто вне ВКонтакте. Вход пойдёт через браузер
                с возвратом на localhost:8910 — так же, как в десктопной версии.
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

          <Group header={<Header>Пример отчёта</Header>}>
            <Div>
              <Text style={{ color: 'var(--vkui--color_text_secondary)' }}>
                Демо-режим показывает готовый отчёт на вымышленном сообществе —
                без обращений к ВКонтакте и без доступа к данным.
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
      )}
    </>
  );
}
