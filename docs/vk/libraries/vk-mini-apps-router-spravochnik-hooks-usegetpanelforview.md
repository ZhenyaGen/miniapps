# useGetPanelForView

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Hooks → useGetPanelForView  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Используйте эту функцию, чтобы получить информацию о компоненте [`Panel`](https://vk.cc/coLTeC), который должен отображаться в указанном [`View`](https://vk.cc/coLTdF) при переходе на другой `View`. Эта информация нужна для правильной работы VKUI-анимации при смене `View`.

## Пример

```ts
import { useGetPanelForView } from '@vkontakte/vk-mini-apps-router';
```

```
const defaultActivePanel = useGetPanelForView(DEFAULT_VIEW);
const emptyActivePanel = useGetPanelForView(EMPTY_VIEW);
```

```
<View
nav={DEFAULT_VIEW}
history={history}
activePanel={defaultActivePanel || DEFAULT_VIEW_PANELS.HOME}
onSwipeBack={() => routeNavigator.back()}
>
<View
nav={EMPTY_VIEW}
history={history}
activePanel={emptyActivePanel || EMPTY_VIEW_PANELS.EMPTY}
onSwipeBack={() => routeNavigator.back()}
>
```

#### Другой пример

Пример вызова функции также можно найти в разделе [Установка и подключение — Шаг 3.](https://dev.vk.ru/ru/libraries/router/setup#%D0%A8%D0%B0%D0%B3%203.%20%D0%98%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B9%D1%82%D0%B5%20%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80%20%D0%B4%D0%BB%D1%8F%20%D0%BE%D1%82%D1%80%D0%B8%D1%81%D0%BE%D0%B2%D0%BA%D0%B8%20%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86) [Используйте роутер для отрисовки страниц](https://dev.vk.ru/ru/libraries/router/setup#%D0%A8%D0%B0%D0%B3%203.%20%D0%98%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B9%D1%82%D0%B5%20%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80%20%D0%B4%D0%BB%D1%8F%20%D0%BE%D1%82%D1%80%D0%B8%D1%81%D0%BE%D0%B2%D0%BA%D0%B8%20%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86).

## Объявление

```ts
export function useGetPanelForView(view?: string): string | undefined
```

## Параметры

| Параметр | Тип | Описание |
|---|---|---|
| `view` необязательный | `string` | Идентификатор компонента [`View`](https://vk.cc/coLTdF), для которого нужно получить информацию об отображаемом [`Panel`](https://vk.cc/coLTeC) [.](https://vk.cc/coLTeC) |

**Параметр | Тип | Описание**

Если параметр отсутствует, функция будет использовать ту же информацию об активной панели, которую можно получить, вызвав

`useActiveVkuiLocation()`.

## Результат

Идентификатор компонента [`Panel`](https://vk.cc/coLTeC), который будет использоваться в отрисовке VKUI-анимации при смене `View`.

## Особенности использования

- Вызовы функции `useGetPanelForView()` должны проходить в рамках компонента

[`RouterProvider`](https://dev.vk.ru/ru/libraries/router/reference/components/RouterProvider) [.](https://dev.vk.ru/ru/libraries/router/reference/components/RouterProvider)
- Используйте `useGetPanelForView()` в приложениях, которые сдержат несколько компонентов [`View`](https://vk.cc/coLTdF) в одном компоненте [`Root`](https://vk.cc/coLTaN). Если в приложении один `View` в `Root`, то достаточно использовать информацию о [`Panel`](https://vk.cc/coLTeC), которую вы получаете от

[`useActiveVkuiLocation()`](https://dev.vk.ru/ru/libraries/router/reference/hooks/useActiveVkuiLocation) [.](https://dev.vk.ru/ru/libraries/router/reference/hooks/useActiveVkuiLocation)
- Функция возвращает один компонент `Panel` для одного `View`. Чтобы получить `Panel` для разных `View`, вызовите функцию несколько раз.

## Материалы по теме

- [Установка и подключение](https://dev.vk.ru/ru/libraries/router/setup)
- [useActiveVkuiLocation](https://dev.vk.ru/ru/libraries/router/reference/hooks/useActiveVkuiLocation)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
