import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button, Div, Footnote, Group, Header, HorizontalScroll, Tabs, TabsItem,
} from '@vkontakte/vkui';

/**
 * Вкладка «Инструкция»: что показывает каждый экран отчёта.
 *
 * Кадры лежат в `public/screens` — половинного размера, те же, что
 * в каталоге. Грузятся лениво: человеку, который пришёл собирать аудит,
 * они не нужны вовсе, и тянуть их вместе с приложением незачем.
 */

interface Step {
  id: string;
  tab: string;
  title: string;
  screen: string;
  lead: string;
  points: Array<[string, string]>;
}

const STEPS: Step[] = [
  {
    id: 'start',
    tab: 'Начало',
    title: 'С чего начать',
    screen: '1-start.png',
    lead: 'Выберите, что проверяете — личную страницу или сообщество — '
      + 'и вставьте ссылку. Подойдёт любая открытая страница, не только своя.',
    points: [
      ['Переключатель сверху', 'меняет подсказки и подпись кнопки. Ошибиться им не страшно: тип страницы приложение определяет по самому адресу'],
      ['«Проверить мою страницу»', 'разбирает вашу без ввода ссылки — кнопка есть внутри ВКонтакте'],
      ['Период', 'за сколько дней считать. Полгода — рабочий срез, месяц берите только чтобы быстро глянуть'],
      ['«Открыть демо-отчёт»', 'показывает все экраны на вымышленном сообществе, вход не нужен'],
    ],
  },
  {
    id: 'summary',
    tab: 'Сводка',
    title: 'Шесть цифр и что чинить первым',
    screen: '2-svodka.png',
    lead: 'Первый экран отчёта: ключевые показатели и четыре главные проблемы.',
    points: [
      ['Подписчиков', 'и какая доля из них видит посты. Ниже 15% охвата базы — плохо'],
      ['ER к просмотрам', 'реакции на 100 просмотров, главный показатель качества. Ниже 1% — плохо'],
      ['Молчит', 'сколько дней с последнего поста и самая длинная пауза за период'],
      ['«Что чинить первым»', 'четыре верхние проблемы. Цвет номера — серьёзность: красный «критично», жёлтый «важно»'],
    ],
  },
  {
    id: 'zones',
    tab: 'Зоны роста',
    title: 'Весь список находок',
    screen: '3-zony-rosta.png',
    lead: 'Каждая находка помечена разделом: упаковка, ритм, аудитория, '
      + 'вовлечённость, форматы, время, тексты, конверсия.',
    points: [
      ['Тапните строку', 'она раскроется: внутри цифра, из-за которой правило сработало, механика и два-три конкретных действия'],
      ['Четырнадцать пунктов', 'обычный результат. Критичных из них три-четыре, остальное — «важно» и «можно позже»'],
      ['Порядок не случайный', 'считается из того, насколько сильно проблема бьёт по росту и насколько дёшево её починить'],
    ],
  },
  {
    id: 'plan',
    tab: 'План',
    title: 'Четыре недели с чек-листом',
    screen: '4-plan.png',
    lead: 'Те же находки, разложенные по неделям и превращённые в задачи.',
    points: [
      ['Первая неделя', 'всегда упаковка: то, что теряет людей, уже дошедших до страницы. Правится за вечер'],
      ['Серым под задачей', 'из какой находки она выросла'],
      ['KPI внизу недели', 'по какому числу поймёте, что неделя закрыта'],
      ['Галочки не сохраняются', 'приложение ничего не запоминает. Нужен план насовсем — скопируйте бриф'],
    ],
  },
  {
    id: 'content',
    tab: 'Контент',
    title: 'Форматы и время',
    screen: '5-kontent.png',
    lead: 'Что заходит и когда вы это публикуете.',
    points: [
      ['Форматы', 'отсортированы по вовлечённости, а не по количеству. Типичная картина: сверху видео с высоким ER, но их два, внизу фото — половина ленты'],
      ['Осторожно с одним постом', 'ER на единственном видео — это совпадение, а не тренд. Смотрите на форматы, где хотя бы пять записей'],
      ['Тепловая карта', 'цвет — вовлечённость, число — сколько постов вышло в этот час. Ищите зелёные клетки с одним постом'],
    ],
  },
  {
    id: 'video',
    tab: 'Ролики',
    title: 'Видео и обсуждение',
    screen: '5-kontent.png',
    lead: 'Отдельная вкладка для страниц, где лента из видео. '
      + 'Собирается по кнопке — это ещё десятки запросов поверх отчёта.',
    points: [
      ['Клипы и видео отдельно', 'ВК раздаёт им охват из разных лент, и складывать в одну медиану их нельзя. Ролики, опубликованные мимо стены, тоже попадают в разбор'],
      ['Два счётчика просмотров', 'у записи и у ролика внутри — они расходятся в разы. Вкладка показывает оба и говорит, во сколько раз'],
      ['Длительность', 'медиана просмотров по длине ролика: видно, какой формат досматривают'],
      ['Вопросы без ответа', 'комментарии со знаком вопроса, где автор не ответил. Самая дешёвая вовлечённость — человек уже написал'],
      ['О чём пишут', 'частые слова из комментариев. Повторяющееся слово — готовая тема для поста'],
    ],
  },
  {
    id: 'rivals',
    tab: 'Конкуренты',
    title: 'Где вы отстаёте на самом деле',
    screen: '6-konkurenty.png',
    lead: 'До пяти страниц, медианы за 90 дней. Вашу страницу приложение '
      + 'пересобирает за тот же срок — иначе сравнение было бы нечестным.',
    points: [
      ['Подбор кандидатов', 'у сообществ — поиском по категории и темам, у личных страниц — из тех, на кого страница подписана. Это подсказка, а не вердикт: список правится руками'],
      ['Личные страницы сравниваются так же', 'вписывайте коллег по нише. Приложение предупредит, если в сравнении окажутся вперемешку профили и сообщества — ВК ранжирует их по-разному'],
      ['«Главное» сверху', 'два-три показателя, где отставание заметнее всего'],
      ['Медианы, а не средние', 'одна страница-гигант не должна утаскивать ориентир вверх'],
      ['Не берите миллионников', 'сравнение с несопоставимой страницей даёт красные проценты и ноль пользы'],
    ],
  },
];

/** Насколько палец должен уехать вбок, чтобы это считалось листанием. */
const SWIPE_DISTANCE = 48;

/**
 * И насколько горизонтальное движение должно перевешивать вертикальное.
 * Без этого страница перестала бы прокручиваться: почти любая прокрутка
 * идёт немного вбок.
 */
const SWIPE_RATIO = 1.6;

export function GuideView() {
  const [index, setIndex] = useState(0);
  // направление последнего перехода — от него зависит, с какой стороны
  // выезжает новый экран
  const [dir, setDir] = useState<'left' | 'right'>('left');
  const touch = useRef<{ x: number; y: number } | null>(null);

  const step = STEPS[index];

  const go = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(STEPS.length - 1, next));
    if (clamped === index) return;
    setDir(clamped > index ? 'left' : 'right');
    setIndex(clamped);
  }, [index]);

  // стрелки на клавиатуре — для тех, кто открыл приложение с компьютера
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, index]);

  const onTouchStart = (e: React.TouchEvent) => {
    const point = e.changedTouches[0];
    touch.current = { x: point.clientX, y: point.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;

    const point = e.changedTouches[0];
    const dx = point.clientX - start.x;
    const dy = point.clientY - start.y;
    if (Math.abs(dx) < SWIPE_DISTANCE) return;
    if (Math.abs(dx) < Math.abs(dy) * SWIPE_RATIO) return;

    go(dx < 0 ? index + 1 : index - 1);
  };

  return (
    <>
      <Group>
        <Tabs layoutFillMode="shrinked" withScrollToSelectedTab scrollBehaviorToSelectedTab="center">
          <HorizontalScroll arrowSize="m">
            {STEPS.map((item, i) => (
              <TabsItem
                key={item.id}
                id={item.id}
                selected={i === index}
                onClick={() => go(i)}
              >
                {item.tab}
              </TabsItem>
            ))}
          </HorizontalScroll>
        </Tabs>
      </Group>

      <Group header={<Header>{step.title}</Header>}>
        <Div
          className={`guide__slide guide__slide--${dir}`}
          key={step.id}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <p className="guide__lead">{step.lead}</p>

          <div className="guide__shot">
            <img
              src={`./screens/${step.screen}`}
              alt={step.title}
              loading="lazy"
              width={540}
              height={960}
            />
          </div>

          <ul className="guide__list">
            {step.points.map(([term, text]) => (
              <li key={term} className="guide__point">
                <b>{term}</b>
                {' — '}
                {text}
              </li>
            ))}
          </ul>
        </Div>

        <Div className="guide__nav">
          <Button
            mode="tertiary"
            size="m"
            disabled={index === 0}
            onClick={() => go(index - 1)}
            aria-label="Предыдущий шаг"
          >
            ←
          </Button>

          <div className="guide__dots" aria-hidden>
            {STEPS.map((item, i) => (
              <span key={item.id} className={`guide__dot${i === index ? ' guide__dot--on' : ''}`} />
            ))}
          </div>

          <Button
            mode="tertiary"
            size="m"
            disabled={index === STEPS.length - 1}
            onClick={() => go(index + 1)}
            aria-label="Следующий шаг"
          >
            →
          </Button>
        </Div>

        <Div style={{ paddingTop: 0 }}>
          <Footnote style={{ color: 'var(--vkui--color_text_tertiary)', textAlign: 'center', display: 'block' }}>
            {`Шаг ${index + 1} из ${STEPS.length} — листайте влево и вправо`}
          </Footnote>
        </Div>
      </Group>
    </>
  );
}
