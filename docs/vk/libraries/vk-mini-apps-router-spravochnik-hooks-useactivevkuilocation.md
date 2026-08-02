# useActiveVkuiLocation

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Hooks → useActiveVkuiLocation  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Используйте эту функцию, чтобы получить информацию об активных компонентах для отрисовки вашего приложения.

## Пример

```ts
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
```

```
export function App() {
  // Получаем активные View и Panel
  const { view: activeView, panel: activePanel } = useActiveVkuiLocation();
```

```
  return(
    // Указываем View и Panel для отрисовки
    <Root activeView={activeView}>
      <View nav="default_view" activePanel={activePanel}>
        <Panel nav="home_panel">...</Panel>
        <Panel nav="persik_panel">...</Panel>
      </View>
    </Root>
  )
}
```

#### Другие примеры

Примеры вызова функции также можно найти в следующих разделах:

- [Установка и подключение — Шаг 3. Используйте роутер для отрисовки страниц](https://dev.vk.ru/ru/libraries/router/setup#%D0%A8%D0%B0%D0%B3%203.%20%D0%98%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B9%D1%82%D0%B5%20%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80%20%D0%B4%D0%BB%D1%8F%20%D0%BE%D1%82%D1%80%D0%B8%D1%81%D0%BE%D0%B2%D0%BA%D0%B8%20%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86)
- [Навигация в приложении — Как работает переход?](https://dev.vk.ru/ru/libraries/router/navigation/#%D0%9A%D0%B0%D0%BA%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D0%B5%D1%82%20%D0%BF%D0%B5%D1%80%D0%B5%D1%85%D0%BE%D0%B4?)
- [Поддержка анимации](https://dev.vk.ru/ru/libraries/router/animation)

## Объявление

```ts
export function useActiveVkuiLocation(): ActiveVkuiLocationObject
```

## Параметры

Не используются.

## Результат

Функция возвращает объект `ActiveVkuiLocationObject`, содержащий информацию о компонентах, которые должны быть отображены в приложении в текущий момент.

```ts
interface ActiveVkuiLocationObject {
  root?: string;
  view?: string;
  panel?: string;
  tab?: string;
  modal?: string;
  hasOverlay: boolean;
  panelsHistory: string[];
}
```

Возвращаемый объект содержит следующие свойства:

| Свойство | Тип | Описание |
|---|---|---|
| `root`, `view`, `panel`, `modal`, `tab` | `string` | Идентификаторы компонентов [`Root`](https://vkui.io/components/root), [`View`](https://vkui.io/components/view) [,](https://vkui.io/components/view) [`Panel`](https://vkui.io/components/panel), [`ModalPage`](https://vkui.io/components/modal-page) или [`ModalCard`](https://vkui.io/components/modal-card) [,](https://vkui.io/components/modal-card) [`Tabs`](https://vkui.io/components/tabs), которые указаны в маршруте и должны быть видны в приложении в момент вызова. |

Свойства могут содержать `undefined` в следующих случаях:
- Компоненты не указаны в маршруте. Например, если в маршруте не указан `modal`, то свойство `modal` будет равно

`undefined`.
- Переданный маршрут не был определён в приложении (ошибка 404).
- Свойство `tab` может быть пустым, если на странице нет компонентов `Tab` или ни один из них не был выбран.

`hasOverlay` `boolean` Открыто ли в приложении модальное или всплывающее окно ( `true`) или нет ( `false`).

`panelsHistory` `string[]` История переходов по панелям текущего `View`. Каждый элемент массива — идентификатор компонента `Panel`.

Если свойство `view` равно `undefined`, свойство содержит пустой массив.

Пример использования свойства `panelsHistory` смотрите в разделе [Поддержка анимации](https://dev.vk.ru/ru/libraries/router/animation).

## Особенности использования

- Вызовы функции `useActiveVkuiLocation()` должны проходить в рамках компонента

[`RouterProvider`](https://dev.vk.ru/ru/libraries/router/reference/components/RouterProvider) [.](https://dev.vk.ru/ru/libraries/router/reference/components/RouterProvider)
- Если ваше приложение использует несколько `View` в рамках одного компонента `Root`, то для определения `Panel` мы рекомендуем использовать функцию [`useGetPanelForView()`](https://dev.vk.ru/ru/libraries/router/reference/hooks/useGetPanelForView), a не

`useActiveVKuiLocation()`.

## Материалы по теме

- [Установка и подключение](https://dev.vk.ru/ru/libraries/router/setup)
- [Настройка маршрутов](https://dev.vk.ru/ru/libraries/router/setting-routes)
- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [Поддержка модальных и всплывающих окон](https://dev.vk.ru/ru/libraries/router/modal-windows)
- [useGetPanelForView](https://dev.vk.ru/ru/libraries/router/reference/hooks/useGetPanelForView)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
