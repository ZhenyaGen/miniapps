# useHistoryManager

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Hooks → useHistoryManager  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Используйте эту функцию, чтобы получить объект [HistoryManager](https://dev.vk.ru/ru/libraries/router/reference/objects/HistoryManager), который используется для доступа к истории навигации в приложении.

## Пример

```ts
import { useHistoryManager, useRouteNavigator } from '@vkontakte/vk-mini-apps-
router';
```

```
export function SomePage() {
  const historyManager = useHistoryManager();
  const routeNavigator = useRouteNavigator();
  const currentPosition = historyManager.getCurrentPosition();
```

```
  return (
    <Button onClick={() => routeNavigator.go(-currentPosition)}>
     На первую страницу в стеке
    </Button>
  );
}
```

## Параметры

Не используются.

## Объявление

```ts
export function useHistoryManager(): HistoryManager
```

## Результат

Объект [`HistoryManager`](https://dev.vk.ru/ru/libraries/router/reference/objects/HistoryManager) [.](https://dev.vk.ru/ru/libraries/router/reference/objects/HistoryManager)

## Материалы по теме

- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
- [Объект HistoryManager](https://dev.vk.ru/ru/libraries/router/reference/objects/HistoryManager)
