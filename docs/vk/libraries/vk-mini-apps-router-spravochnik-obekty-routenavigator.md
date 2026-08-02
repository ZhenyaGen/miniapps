# RouteNavigator

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Объекты → RouteNavigator  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Объект `RouteNavigator` используется для навигации в приложении: перехода на страницы, открытия и закрытия модальных и всплывающих окон, работы с историей переходов.

Чтобы получить объект `RouteNavigator`, вызовите функцию [`useRouteNavigator()`](https://dev.vk.ru/ru/libraries/router/reference/hooks/useRouteNavigator) [.](https://dev.vk.ru/ru/libraries/router/reference/hooks/useRouteNavigator)

## Пример

```ts
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
```

```
export function SomePage() {
  // Получение объекта RouteNavigator
  const routeNavigator = useRouteNavigator();
```

```
  return (
    // Вызов метода объекта RouteNavigator
    <Button onClick={() => routeNavigator.back()}>Вернуться</Button>
  );
}
```

## Свойства

Объект не содержит свойств.

## Методы

| Метод | Описание |
|---|---|
| [`back`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/back) | Возвращается на предыдущий экран. |
| [`backToFirst`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/backToFirst) | Переходит на экран, который был открыт первым при входе пользователя в приложение. |
| [`block`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/block) | Устанавливает функцию, которая блокирует или разрешает переход с текущего экрана. |
| [`go`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/go) | Делает скачок на указанное количество шагов вперёд или назад по истории переходов. |
| [`hideModal`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/hideModal) | Закрывает модальное окно в приложении. |
| [`hidePopout`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/hidePopout) | Закрывает всплывающее окно в приложении. |

| Метод | Описание |
|---|---|
| [`push`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/push) | Переходит на новый URL в приложении и добавляет запись в историю переходов. |
| [`replace`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/replace) | Переходит на новый URL в приложении и заменяет текущую запись в истории переходов. |
| [`runSync`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/runSync) | Выполняет несколько переходов один за другим, при этом завершает их одновременно. |
| [`showModal`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/showModal) | Открывает модальное окно в приложении. |
| [`showPopout`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/showPopout) | Открывает всплывающее окно в приложении. |

## Материалы по теме

- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [Поддержка модальных и всплывающих окон](https://dev.vk.ru/ru/libraries/router/modal-windows)
- [Объект NavigationOptions](https://dev.vk.ru/ru/libraries/router/reference/objects/NavigationOptions)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
