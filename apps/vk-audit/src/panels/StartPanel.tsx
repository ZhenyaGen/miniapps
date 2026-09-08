import { useState } from 'react';
import {
  Avatar, Banner, Button, Div, Footnote, FormItem, Group, Header, HorizontalScroll,
  Input, PanelHeader, Placeholder, SegmentedControl, SimpleCell, Spacing, Tabs,
  TabsItem, Text,
} from '@vkontakte/vkui';

import { APP_NAME, PERIOD_OPTIONS } from '../config';
import { f } from '../engine/util';
import { Footer } from '../components/Footer';
import { GuideView } from '../components/GuideView';
import { FaqView } from '../components/FaqView';
import type { AdminGroup } from '../vk/collect';

type Mode = 'user' | 'group';
type Screen = 'audit' | 'guide' | 'faq';

/**
 * Онбординг: три шага до результата.
 *
 * Требование модерации от 2 сентября 2026 — «добавить онбординг и faq,
 * с помощью которых пользователи могли бы понять, какие инструменты,
 * возможности и результат даст приложение». Держится без хранилища:
 * это не всплывающий тур на первый запуск, а блок над формой, который
 * не мешает тем, кто уже знает, что делать.
 */
const STEPS: Array<[string, string]> = [
  ['🔗', 'Вставьте ссылку на страницу'],
  ['📊', 'Через минуту — отчёт с планом'],
  ['🤖', 'Бриф — в нейросеть за текстами'],
];

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
  /** Загружены ли уже свои сообщества: до первого запроса их нет. */
  adminGroupsState: 'idle' | 'busy' | 'done';
  onLoadAdminGroups: () => void;
  error: string | null;
  periodDays: number;
  onPeriodChange: (days: number) => void;
  onSignIn: () => void;
  onAudit: (target: string) => void;
  onDemo: () => void;
}

export function StartPanel({
  signedIn, insideVK, selfId, adminGroups, adminGroupsState, error, periodDays,
  onPeriodChange, onLoadAdminGroups, onSignIn, onAudit, onDemo,
}: Props) {
  const [screen, setScreen] = useState<Screen>('audit');
  const [mode, setMode] = useState<Mode>('user');
  const [target, setTarget] = useState('');
  const copy = MODES[mode];
  const period = PERIOD_OPTIONS.find((p) => p.days === periodDays) ?? PERIOD_OPTIONS[2];

  return (
    <>
      <PanelHeader>{APP_NAME}</PanelHeader>

      <Div>
        <div className="hero hero--live rise">
          <h1 className="hero__title">Что мешает странице расти</h1>
          <p className="hero__subtitle">
            Метрики, зоны роста и план на четыре недели — по личной
            странице или сообществу
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
          <TabsItem selected={screen === 'faq'} onClick={() => setScreen('faq')}>
            Вопросы
          </TabsItem>
        </Tabs>
      </Group>

      {screen === 'guide' && (
        <>
          <GuideView />
          <Footer />
        </>
      )}

      {screen === 'faq' && (
        <>
          <FaqView />
          <Footer />
        </>
      )}

      {screen === 'audit' && (
        <>
          {error && (
            <Div>
              <Banner mode="tint" title="Не получилось" subtitle={error} />
            </Div>
          )}

          <Group header={<Header subtitle="без регистрации и без оплаты">
            Как это работает
          </Header>}
          >
            <Div>
              <div className="onboard">
                {STEPS.map(([icon, text], i) => (
                  <div key={text} className={`onboard__step rise rise-${i + 1}`}>
                    <span className="onboard__icon">{icon}</span>
                    <span className="onboard__text">{text}</span>
                  </div>
                ))}
              </div>
            </Div>
          </Group>

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

          {mode === 'group' && (
            <Group header={<Header subtitle="где вы администратор, редактор или модератор">
              Ваши сообщества
            </Header>}
            >
              {adminGroups.length > 0 && adminGroups.slice(0, 10).map((group) => (
                <SimpleCell
                  key={group.id}
                  before={<Avatar size={40} src={group.photo} />}
                  subtitle={`${f(group.members, 0)} подписчиков`}
                  onClick={() => onAudit(String(group.id))}
                >
                  {group.name}
                </SimpleCell>
              ))}

              {adminGroupsState !== 'done' && adminGroups.length === 0 && (
                <Div>
                  <Button
                    size="l"
                    stretched
                    mode="secondary"
                    loading={adminGroupsState === 'busy'}
                    onClick={onLoadAdminGroups}
                  >
                    Показать мои сообщества
                  </Button>
                  <Footnote style={{ color: 'var(--vkui--color_text_secondary)', display: 'block', marginTop: 8 }}>
                    Список подтянется из ВКонтакте — тогда сообщество можно
                    выбрать одним нажатием, не копируя ссылку.
                  </Footnote>
                </Div>
              )}

              {adminGroupsState === 'done' && adminGroups.length === 0 && (
                <Div>
                  <Footnote style={{ color: 'var(--vkui--color_text_secondary)', display: 'block' }}>
                    Сообществ, где вы администратор, не нашлось. Ссылку
                    на чужое сообщество можно вставить в поле выше.
                  </Footnote>
                </Div>
              )}
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
