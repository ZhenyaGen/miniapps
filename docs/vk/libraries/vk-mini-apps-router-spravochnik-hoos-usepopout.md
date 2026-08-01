# usePopout

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Hoos → usePopout  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Функция возвращает JSX-объект, который был указан в вызове метода

[`RouteNavigator.showPopout(...)`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/showPopout) и который должен быть показан, как Popout-компонент.

## Пример

```ts
import { usePopout } from '@vkontakte/vk-mini-apps-router';
```

```
// Получаем установленный popout
const routerPopout = usePopout();
```

```
// Передаём popout в компонент.
// Компонент покажет popout, когда это будет необходимо
<SplitLayout popout={routerPopout}>
/* ... */
</SplitLayout>
```

## Параметры

Не используются.

## Объявление

```ts
export function usePopout(): JSX.Element | null
```

## Результат

JSX-компонент, который будет отображен в виде всплывающего окна, либо `null`, если такой компонент не был установлен с помощью вызова метода [`RouteNavigator.showPopout(...)`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/showPopout) [.](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/showPopout)

## Материалы по теме

- [Открытие компонентов](https://dev.vk.ru/ru/libraries/router/modal-windows#%D0%9E%D1%82%D0%BA%D1%80%D1%8B%D1%82%D0%B8%D0%B5%20%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20Popout) [`Popout`](https://dev.vk.ru/ru/libraries/router/modal-windows#%D0%9E%D1%82%D0%BA%D1%80%D1%8B%D1%82%D0%B8%D0%B5%20%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20Popout)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
