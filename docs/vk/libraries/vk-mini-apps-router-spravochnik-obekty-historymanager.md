# HistoryManager

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Объекты → HistoryManager  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Объект `HistoryManager` используется для получения доступа к истории переходов и к текущей позиции в этой истории.

Чтобы получить объект `HistoryManager`, вызовите функцию [`useHistoryManager()`](https://dev.vk.ru/ru/libraries/router/reference/hooks/useHistoryManager) [.](https://dev.vk.ru/ru/libraries/router/reference/hooks/useHistoryManager)

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

## Свойства

Объект не содержит свойств.

## Методы

| Метод | Описание |
|---|---|
| [`getCurrentPosition`](https://dev.vk.ru/ru/libraries/router/reference/objects/HistoryManager/getCurrentPosition) | Возвращает текущее положение в стеке истории. |
| [`getHistory`](https://dev.vk.ru/ru/libraries/router/reference/objects/HistoryManager/getHistory) | Возвращает стек истории. |

## Материалы по теме

- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [Поддержка модальных и всплывающих окон](https://dev.vk.ru/ru/libraries/router/modal-windows)
- [Функция useHistoryManager](https://dev.vk.ru/ru/libraries/router/reference/hooks/useHistoryManager)

- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
