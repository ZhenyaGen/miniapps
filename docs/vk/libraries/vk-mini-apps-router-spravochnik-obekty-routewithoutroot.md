# RouteWithoutRoot

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Объекты → RouteWithoutRoot  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Объект `RouteWithoutRoot` описывает маршрут в React-приложении, созданном с помощью библиотеки [VKUI](https://dev.vk.ru/ru/libraries/vkui). Маршрут определяет, какой экран или окно должно быть отображено при передаче приложению того или иного URL.

Важно! Используйте объект `RouteWithoutRoot` в приложении, которое использует только один компонент [`Root`](https://vkui.io/components/root) [.](https://vkui.io/components/root)

Если в вашем приложении несколько `Root`, для указания маршрутов используйте объект

[`RouteWithRoot`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteWithRoot) [.](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteWithRoot)

## Пример

```ts
import { RouterProvider, createHashRouter } from '@vkontakte/vk-mini-apps-
router';
```

```
// Указание маршрутов с помощью RouteWithoutRoot
const router = createHashRouter([
  {
    path: '/',
    panel: 'home_panel',
    view: 'default_view',
  },
  {
    path: '/contacts',
    panel: 'contacts_panel',
    view: 'contacts_view',
  }
]);
```

```
<RouterProvider router={router}>
    <App />
</RouterProvider>
```

#### Другие примеры

Примеры использования объекта `RouteWithoutRoot` можно найти в разделах [Настройка](https://dev.vk.ru/ru/libraries/router/setting-routes) [маршрутов](https://dev.vk.ru/ru/libraries/router/setting-routes) и [Поддержка модальных и всплывающих окон](https://dev.vk.ru/ru/libraries/router/modal-windows).

## Объявление

```ts
interface CommonRouteObject {
  path: string;
}
```

```
export interface PanelWithoutRoot extends CommonRouteObject {
  view: string;
  panel: string;
}
```

```
export interface ModalWithoutRoot extends PanelWithoutRoot {
  modal: string;
}
```

```
export type RouteWithoutRoot = PanelWithoutRoot | ModalWithoutRoot;
```

## Свойства

| Свойство | Тип | Описание |
|---|---|---|
| `path` обязательное | `string` | URL маршрута. |

Не указывайте символ `#` и слово `path` в URL, в них [нет](https://dev.vk.ru/ru/libraries/router/hash-in-links) [необходимости](https://dev.vk.ru/ru/libraries/router/hash-in-links).

Если указать `path: '*'`, роутер будет использовать этот маршрут при всякой попытке перехода по адресу, для которого маршрут не задан. Другими словами, вы можете использовать `path: '*'` для обработки ошибки 404 Not Found. Подробности — в разделе [Обработка](https://dev.vk.ru/ru/libraries/router/handling-errors) [ошибок](https://dev.vk.ru/ru/libraries/router/handling-errors).

| `view` обязательное | `string` Идентификатор компонента [`View`](https://vkui.io/components/view), который будет использоваться при переходе в приложении по URL, указанному в `path`. |
|---|---|
| `panel` обязательное | `string` Идентификатор компонента [`Panel`](https://vkui.io/components/panel), который будет использоваться при переходе в приложении по URL, указанному в `path`. |
| `modal` необязательное | `string` Идентификатор компонента [`ModalPage`](https://vkui.io/components/modal-page) или [`ModalCard`](https://vkui.io/components/modal-card), который будет использоваться при переходе в приложении по URL, указанному в `path`. |

## Материалы по теме

- [Настройка маршрутов](https://dev.vk.ru/ru/libraries/router/setting-routes)
- [Поддержка модальных и всплывающих окон](https://dev.vk.ru/ru/libraries/router/modal-windows)
- [Объект RouteWithRoot](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteWithRoot)
- [Формат внешних и внутренних ссылок](https://dev.vk.ru/ru/libraries/router/hash-in-links)

- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
