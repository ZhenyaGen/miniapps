# RouteWithRoot

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Объекты → RouteWithRoot  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Объект `RouteWithRoot` описывает маршрут в React-приложении, созданном с помощью библиотеки [VKUI](https://dev.vk.ru/ru/libraries/vkui). Маршрут определяет, какой экран или окно должно быть отображено при передаче приложению того или иного URL.

Важно. Используйте объект `RouteWithRoot` в приложении, которое содержит несколько компонентов [`Root`](https://vkui.io/components/root) и использует компонент [`Epic`](https://vkui.io/components/epic) [.](https://vkui.io/components/epic)

Если в вашем приложении только один `Root`, для указания маршрутов используйте объект

[`RouteWithoutRoot`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteWithoutRoot) [.](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteWithoutRoot)

## Пример

```ts
import { RouterProvider, createHashRouter } from '@vkontakte/vk-mini-apps-
router';
```

```
// Указание маршрутов с помощью RouteWithRoot
const router = createHashRouter([
  {
    path: '/',
    root: 'home_root',
    panel: 'home_panel',
    view: 'default_view',
  },
  {
    path: '/contacts',
    root: 'properties_root',
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

Примеры использования объекта `RouteWithRoot` можно найти в разделах [Настройка маршрутов](https://dev.vk.ru/ru/libraries/router/setting-routes) и [Поддержка модальных и всплывающих окон](https://dev.vk.ru/ru/libraries/router/modal-windows).

## Объявление

```ts
interface CommonRouteObject {
  path: string;
}
```

```
export interface PanelWithRoot extends CommonRouteObject {
  root: string;
  view: string;
  panel: string;
  tab?: string;
}
```

```
export interface ModalWithRoot extends PanelWithRoot {
  modal: string;
}
```

```
export type RouteWithRoot = PanelWithRoot | ModalWithRoot;
```

## Свойства

| Свойство | Тип | Описание |
|---|---|---|
| `path` обязательное | `string` | URL маршрута. |

Не указывайте символ `#` и слово `path` в URL, в них [нет](https://dev.vk.ru/ru/libraries/router/hash-in-links) [необходимости](https://dev.vk.ru/ru/libraries/router/hash-in-links).

Если указать `path: '*'`, роутер будет использовать этот маршрут при всякой попытке перехода по адресу, для которого маршрут не задан. Другими словами, вы можете использовать `path: '*'` для обработки ошибки 404 Not Found. Подробности — в разделе [Обработка](https://dev.vk.ru/ru/libraries/router/handling-errors) [ошибок](https://dev.vk.ru/ru/libraries/router/handling-errors).

| `root` обязательное | `string` Идентификатор компонента [`Root`](https://vkui.io/components/root), который будет использоваться при переходе в приложении по URL, указанному в `path`. |
|---|---|
| `view` обязательное | `string` Идентификатор компонента [`View`](https://vkui.io/components/view), который будет использоваться при переходе в приложении по URL, указанному в `path`. |
| `panel` обязательное | `string` Идентификатор компонента [`Panel`](https://vkui.io/components/panel), который будет использоваться при переходе в приложении по URL, указанному в `path`. |
| `modal` необязательное | `string` Идентификатор компонента [`ModalPage`](https://vkui.io/components/modal-page) или [`ModalCard`](https://vkui.io/components/modal-card), который будет использоваться при переходе в приложении по URL, указанному в `path`. |
| `tab` необязательное | `string` Идентификатор компонента [`Tabs`](https://vkui.io/components/tabs), который будет использоваться при переходе в приложении по URL, указанному в `path`. |

## Материалы по теме

- [Настройка маршрутов](https://dev.vk.ru/ru/libraries/router/setting-routes)
- [Поддержка модальных и всплывающих окон](https://dev.vk.ru/ru/libraries/router/modal-windows)
- [Объект RouteWithoutRoot](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteWithoutRoot)
- [Формат внешних и внутренних ссылок](https://dev.vk.ru/ru/libraries/router/hash-in-links)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
