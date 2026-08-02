# createBrowserRouter

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Функции → createBrowserRouter  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Используйте эту функцию, чтобы создать [Browser-роутер](https://dev.vk.ru/ru/libraries/router/router-types#Browser-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80) в своём React-приложении. Роутер предназначен для веб-приложений, которые используют библиотеку [VKUI](https://dev.vk.ru/ru/libraries/vkui) и запускаются вне ВКонтакте.

При использовании этого роутера в приложении внешние ссылки на экраны приложения не должны содержать символ `#`, например:

```
https://my-server.com/persik-screen
```

В качестве параметра функция принимает массив, элементы которого описывают маршруты — какой экран или окно будут открыты при переходе в приложении по тому или иному URL.

## Пример

```ts
import { RouterProvider, createBrowserRouter } from '@vkontakte/vk-mini-apps-
router';
```

```
// Вызов функции
const router = createBrowserRouter([
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
// Передача созданного роутера в компонент
<RouterProvider router={router}>
    <App />
</RouterProvider>
```

## Объявление

```ts
export function createBrowserRouter(routes: RouteWithRoot[] |
RouteWithoutRoot[]): RemixRouter
```

## Параметры

| Параметр | Тип | Описание |
|---|---|---|
| `routes` обязательный | [`RouteWithRoot[]`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteWithRoot) или | Массив объектов, описывающих маршруты. |
| [`RouteWithoutRoot[]`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteWithoutRoot) | Если в приложении несколько компонентов [`Root`](https://vkui.io/components/root) и | используется [ `Epic` ]([https://vkui.io/components/epic](https://vkui.io/components/epic), массив должен состоять из объектов [`RouteWithRoot`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteWithRoot) [.](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteWithRoot) |

В ином случае элементы массива — объекты

[`RouteWithoutRoot`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteWithoutRoot) [.](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteWithoutRoot)

## Результат

Объект [`RemixRouter`](https://github.com/remix-run/react-router/tree/main/packages/router). Определён в библиотеке [`@remix-run/react-router`](https://github.com/remix-run/react-router) [.](https://github.com/remix-run/react-router)

## Особенности использования

При указании маршрутов не используйте символ `#` в URL.

## Материалы по теме

- [Установка и подключение](https://dev.vk.ru/ru/libraries/router/setup)
- [Настройка маршрутов](https://dev.vk.ru/ru/libraries/router/setting-routes)
- [Объект RouteWithRoot](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteWithRoot)
- [Объект RouteWithoutRoot](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteWithoutRoot)
- [Функция createHashRouter](https://dev.vk.ru/ru/libraries/router/reference/functions/createHashRouter)
- [Функция createHashParamRouter](https://dev.vk.ru/ru/libraries/router/reference/functions/createHashParamRouter)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
