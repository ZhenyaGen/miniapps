# История навигации

**Раздел:** Библиотеки → vk-mini-apps-router → История навигации  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Для отслеживания историй переходов используйте объект [`HistoryManager`](https://dev.vk.ru/ru/libraries/router/reference/objects/HistoryManager) из библиотеки [vk-](https://dev.vk.ru/ru/libraries/router) [mini-apps-router](https://dev.vk.ru/ru/libraries/router). Он содержит методы для доступа к истории переходов и к текущей позиции в этой истории.

| Метод | Описание |
|---|---|
| [`getCurrentPosition`](https://dev.vk.ru/ru/libraries/router/reference/objects/HistoryManager/getCurrentPosition) | Возвращает текущее положение в стеке истории. |
| [`getHistory`](https://dev.vk.ru/ru/libraries/router/reference/objects/HistoryManager/getHistory) | Возвращает стек истории — `ViewNavigationRecord`. |

## Пример

Чтобы получить объект `HistoryManager`, вызовите функцию [`useHistoryManager()`](https://dev.vk.ru/ru/libraries/router/reference/hooks/useHistoryManager) [.](https://dev.vk.ru/ru/libraries/router/reference/hooks/useHistoryManager)

```ts
import { useHistoryManager, useRouteNavigator } from '@vkontakte/vk-mini-apps-
router';
```

```
export function SomePage() {
  const historyManager = useHistoryManager();
  const routeNavigator = useRouteNavigator();
  const currentPosition = historyManager.getCurrentPosition();
  const historyStack = historyManager.getHistory();
  return (
    ...
  );
}
```

## ViewNavigationRecord

История переходов состоит из записей `ViewNavigationRecord`. Объект

`ViewNavigationRecord` содержит следующие свойства:

| Свойство | Тип | Описание |
|---|---|---|
| `position` | `number` | Номер записи. |
| `locationKey` | `string` | Уникальный идентификатор перехода. |
| `path` | `string` | Путь записи. |

| Свойство | Тип | Описание |
|---|---|---|
| `state` | `object` | Состояние роутера. |
| `params` | `object` | Хранит query-параметры. |
| `view` | `string` | Текущий `view`. |
| `panel` | `string` | Текущий `panel`. |
| `root` необязательное | `string` | Текущий `root`. |
| `tab` необязательное | `string` | Текущий `tab`. |
| `modal` необязательное | `string` | Текущий `modal`. |
| `popout` необязательное | `string` | Текущий `popout`. |

## Материалы по теме

- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [Объект HistoryManager](https://dev.vk.ru/ru/libraries/router/reference/objects/HistoryManager)
- [Метод HistoryManager.getCurrentPosition](https://dev.vk.ru/ru/libraries/router/reference/objects/HistoryManager/getCurrentPosition)
- [Метод HistoryManager.getHistory](https://dev.vk.ru/ru/libraries/router/reference/objects/HistoryManager/getHistory)
- [Использование параметров](https://dev.vk.ru/ru/libraries/router/parameters)
- [Объект RouteNavigator](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator)
- [Библиотека vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router)
