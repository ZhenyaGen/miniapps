import { useState } from 'react';
import {
  Accordion, Button, Div, Footnote, Group, Header, SimpleCell, Text,
} from '@vkontakte/vkui';

import { AI_CHAT_NAME, AI_CHAT_URL } from '../config';

/**
 * Разбор нейросетью — пошагово.
 *
 * Отказ модерации 2 сентября 2026: «Как мы понимаем, ваша идея в том,
 * что пользователь должен скопировать бриф, вставить его в нейросеть
 * и получить какой-то результат? Здесь было бы хорошо поработать над UX,
 * потому что сейчас это плохо считывается».
 *
 * И это правда. Раньше здесь стояли две кнопки и абзац мелким шрифтом:
 * человек, который слово «бриф» видит впервые, не понимал ни что
 * скопируется, ни куда это вставлять, ни что вернётся. Теперь —
 * три пронумерованных шага, список того, что именно уедет в буфер,
 * и пример ответа нейросети, свёрнутый до нажатия.
 */

interface Props {
  /** Копирует бриф в буфер; `true` — получилось. */
  onCopy: () => Promise<boolean>;
}

/** Что уедет в буфер — по разделам, теми же словами, что в самом брифе. */
const CONTENTS: Array<[string, string]> = [
  ['Метрики ленты', 'охват, вовлечённость, частота, молчание'],
  ['Форматы и время', 'что заходит и в какие часы вы это публикуете'],
  ['Зоны роста', 'все находки с цифрами, из-за которых правило сработало'],
  ['Чего на странице нет', 'опросы, закреп, призывы — и что это дало бы'],
  ['План на четыре недели', 'задачи по неделям с показателем на выходе'],
  ['Ряды под диаграммы', 'готовые таблицы: по ним нейросеть строит графики'],
  ['Тексты лучших и слабых постов', 'чтобы было что сравнивать'],
];

/**
 * Пример ответа. Не настоящий разбор чьей-то страницы — образец жанра:
 * человеку надо понять, что вернётся текст с выводами и планом,
 * а не таблица и не отказ.
 */
const EXAMPLE = `Страница держится на фотопостах: их 53% ленты, но ER
у них 1,49% — ниже, чем у видео (3,70%). Видео при этом всего одно.
Вывод: формат, который работает, вы почти не используете.

Главное ограничение — частота. 1,5 поста в неделю против нормы 3–5:
алгоритм не получает регулярного сигнала, и охват падает от месяца
к месяцу (799 → 474 просмотра на пост).

Контент-план на месяц:
• неделя 1 — упаковка: аватар, описание, закреп. Один пост-знакомство.
• неделя 2 — два видео по 30–60 секунд на темы из комментариев…`;

export function BriefCard({ onCopy }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (await onCopy()) setCopied(true);
  };

  return (
    <Group header={<Header subtitle="три шага, ключ и регистрация не нужны">
      Разобрать отчёт нейросетью
    </Header>}
    >
      <Div style={{ paddingBottom: 4 }}>
        <Text>
          Приложение считает цифры, но не пишет текстов. Нейросеть наоборот:
          пишет хорошо, а считать не умеет и склонна выдумывать. Поэтому
          цифры мы отдаём ей готовыми — вместе с прямым запретом их менять.
        </Text>
      </Div>

      <SimpleCell
        multiline
        before={<div className="step-num">1</div>}
        subtitle="весь отчёт текстом уедет в буфер обмена"
      >
        Скопировать бриф
      </SimpleCell>
      <Div style={{ paddingTop: 0, paddingBottom: 8 }}>
        <Button
          size="l"
          stretched
          mode={copied ? 'secondary' : 'primary'}
          onClick={copy}
        >
          {copied ? '✓ Скопировано — шаг 2' : '📋 Скопировать бриф'}
        </Button>
      </Div>

      <SimpleCell
        multiline
        before={<div className="step-num">2</div>}
        subtitle={`Откроется ${AI_CHAT_NAME} — подойдёт любая нейросеть, `
          + 'которая принимает длинный текст'}
      >
        Открыть чат
      </SimpleCell>
      <Div style={{ paddingTop: 0, paddingBottom: 8 }}>
        <Button
          size="l"
          stretched
          appearance="positive"
          mode={copied ? 'primary' : 'secondary'}
          href={AI_CHAT_URL}
          target="_blank"
          rel="noreferrer"
          // копируем в том же нажатии: вкладку браузер разрешает открыть
          // только синхронно, поэтому ссылку не подменяем на window.open
          onClick={copy}
        >
          {`🤖 Открыть ${AI_CHAT_NAME}`}
        </Button>
      </Div>

      <SimpleCell
        multiline
        before={<div className="step-num">3</div>}
        subtitle="и отправить. Задание нейросети уже вписано в начало брифа —
          дописывать ничего не нужно"
      >
        Вставить в поле ввода
      </SimpleCell>

      <Accordion>
        <Accordion.Summary multiline subtitle="семь разделов, всё из этого отчёта">
          Что именно скопируется
        </Accordion.Summary>
        <Accordion.Content>
          <Div style={{ paddingTop: 0 }}>
            <ul className="guide__list">
              {CONTENTS.map(([title, detail]) => (
                <li key={title} className="guide__point">
                  <b>{title}</b>
                  {` — ${detail}`}
                </li>
              ))}
            </ul>
            <Footnote style={{ color: 'var(--vkui--color_text_secondary)', display: 'block' }}>
              Ключ доступа, ваши личные данные и что-либо ещё в бриф
              не попадает — только числа этого отчёта и тексты ваших
              же постов.
            </Footnote>
          </Div>
        </Accordion.Content>
      </Accordion>

      <Accordion>
        <Accordion.Summary multiline subtitle="пример: так выглядит ответ">
          Что вернёт нейросеть
        </Accordion.Summary>
        <Accordion.Content>
          <Div style={{ paddingTop: 0 }}>
            <div className="example">{EXAMPLE}</div>
            <Footnote style={{ color: 'var(--vkui--color_text_secondary)', display: 'block', marginTop: 10 }}>
              Это образец на вымышленных данных, а не разбор вашей страницы.
              Дальше с нейросетью можно разговаривать: попросить переписать
              слабый пост, предложить темы или нарисовать графики по рядам
              из конца брифа.
            </Footnote>
          </Div>
        </Accordion.Content>
      </Accordion>
    </Group>
  );
}
