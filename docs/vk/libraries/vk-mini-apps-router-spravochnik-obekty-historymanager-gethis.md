# HistoryManager.getHistory

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Объекты → HistoryManager.getHistory  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Возвращает стек истории.

## Пример

```ts
import React from 'react';
import { useHistoryManager, useRouteNavigator } from '@vkontakte/vk-mini-apps-
router';
import { Group, Header, Cell, Button, Div } from '@vkontakte/vkui';
```

```
export function SomePage() {
  const historyManager = useHistoryManager();
  const routeNavigator = useRouteNavigator();
  const history = historyManager.getHistory();
```

```
  return (
    <Group header={<Header>История навигации</Header>}>
      {history.map((record) => (
        <Div key={record.locationKey}>
          <Div>{`Путь: ${record.path}`}</Div>
          <Div>{`Позиция: ${record.position}`}</Div>
        </Div>
      ))}
    </Group>
  );
}
```

## Объявление

```ts
getHistory(): ViewNavigationRecord[];
```

## Параметры

Не используются.

## Результат

Стек записей [`ViewNavigationRecord[]`](https://dev.vk.ru/ru/libraries/router/navigation_history#ViewNavigationRecord) [.](https://dev.vk.ru/ru/libraries/router/navigation_history#ViewNavigationRecord)

## Материалы по теме

- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [История навигации](https://dev.vk.ru/ru/libraries/router/navigation_history)
- [Объект HistoryManager](https://dev.vk.ru/ru/libraries/router/reference/objects/HistoryManager)
- [Метод HistoryManager.getCurrentPosition](https://dev.vk.ru/ru/libraries/router/reference/objects/HistoryManager/getCurrentPosition)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
