# HistoryManager.getCurrentPosition

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Объекты → HistoryManager.getCurrentPosition  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Возвращает текущее положение в стеке истории.

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

## Объявление

```ts
getCurrentPosition(): number;
```

## Параметры

Не используются.

## Результат

Текущее положение в стеке истории.

## Материалы по теме

- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [История навигации](https://dev.vk.ru/ru/libraries/router/navigation_history)
- [Объект HistoryManager](https://dev.vk.ru/ru/libraries/router/reference/objects/HistoryManager)
- [Метод HistoryManager.getHistory](https://dev.vk.ru/ru/libraries/router/reference/objects/HistoryManager/getHistory)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
