# useRouteNavigator

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Hooks → useRouteNavigator  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Используйте эту функцию, чтобы получить объект [`RouteNavigator`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator), который используется для [навигации по экранам приложения](https://dev.vk.ru/ru/libraries/router/navigation).

## Пример

```ts
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
```

```
export function SomePage() {
  const routeNavigator = useRouteNavigator();
```

```
  return (
    <Button onClick={() => routeNavigator.back()}>Назад</Button>
  );
}
```

## Параметры

Не используются.

## Объявление

```ts
export function useRouteNavigator(): RouteNavigator { ... }
```

## Результат

Объект [`RouteNavigator`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator) [.](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator)

## Особенности использования

Вызовы функции `useRouteNavigator()` должны проходить в рамках компонента

[`RouterProvider`](https://dev.vk.ru/ru/libraries/router/reference/components/RouterProvider) [.](https://dev.vk.ru/ru/libraries/router/reference/components/RouterProvider)

## Материалы по теме

- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
