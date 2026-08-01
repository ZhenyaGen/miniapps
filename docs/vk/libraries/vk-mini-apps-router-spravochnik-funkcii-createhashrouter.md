# createHashRouter

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Функции → createHashRouter  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Используйте эту функцию, чтобы создать [Hash-роутер](https://dev.vk.ru/ru/libraries/router/router-types#Hash-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80) в своём React-приложении.

Hash-роутер предназначен для игр и мини-приложений, которые запускаются на платформе ВКонтакте: в мобильном приложении ВКонтакте или из десктопной или мобильной версии сайта. При использовании этого роутера внешние ссылки на экраны приложения должны содержать символ `#`, например:

```
https://vk.com/app12345/#/persik-screen
```

В качестве параметра функция принимает массив, элементы которого описывают маршруты — какой экран или окно будут открыты при переходе в приложении по тому или иному URL.

## Пример

```ts
import { RouterProvider, createHashRouter } from '@vkontakte/vk-mini-apps-
router';
```

```
// Вызов функции
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
// Передача созданного роутера в компонент
<RouterProvider router={router}>
    <App />
</RouterProvider>
```

Обратите внимание, что в поле `path` символ `#` не указывается.

#### Другие примеры

Примеры использования функции можно также найти в разделах [Установка и подключение](https://dev.vk.ru/ru/libraries/router/setup) и [Настройка маршрутов](https://dev.vk.ru/ru/libraries/router/setting-routes).

## Объявление

```ts
export function createHashRouter(routes: RouteWithRoot[] |
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

При создании маршрутов не используйте символ `#` в URL, в нём [нет необходимости](https://dev.vk.ru/ru/libraries/router/hash-in-links).

## Материалы по теме

- [Установка и подключение](https://dev.vk.ru/ru/libraries/router/setup)
- [Настройка маршрутов](https://dev.vk.ru/ru/libraries/router/setting-routes)
- [Формат внешних и внутренних ссылок](https://dev.vk.ru/ru/libraries/router/hash-in-links)
- [Объект RouteWithRoot](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteWithRoot)
- [Объект RouteWithoutRoot](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteWithoutRoot)
- [Функция createHashParamRouter](https://dev.vk.ru/ru/libraries/router/reference/functions/createHashParamRouter)
- [Функция createBrowserRouter](https://dev.vk.ru/ru/libraries/router/reference/functions/createBrowserRouter)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
