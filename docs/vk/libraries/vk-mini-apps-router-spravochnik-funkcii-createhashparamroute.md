# createHashParamRouter

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Функции → createHashParamRouter  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Используйте эту функцию, чтобы создать [HashParam-роутер](https://dev.vk.ru/ru/libraries/router) в своём React-приложении.

HashParam-роутер предназначен для игр и мини-приложений, которые запускаются на платформе ВКонтакте: в мобильном приложении ВКонтакте или из десктопной или мобильной версии сайта.

При использовании этого роутера внешние ссылки на экраны приложения должны содержать символ `#` и ключевое слово `path`, например:

```
https://vk.com/app12345/#path=%2Fpersik-screen&param1=value1&param2=value2
```

Используйте этот роутер, если ваше приложение передаёт параметры после символа # в URL.

В качестве параметра функция `createHashParamRouter(...)` принимает массив, элементы которого описывают маршруты — какой экран или окно будут открыты при переходе в приложении по тому или иному URL.

## Пример

```ts
import { RouterProvider, createHashParamRouter } from '@vkontakte/vk-mini-
apps-router';
```

```
// Вызов функции
const router = createHashParamRouter([
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

## Объявление

```ts
export function createHashParamRouter(routes: RouteWithRoot[] |
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

При создании маршрутов не используйте символ `#` и ключевое слово `path` в URL, в них [нет](https://dev.vk.ru/ru/libraries/router/hash-in-links) [необходимости](https://dev.vk.ru/ru/libraries/router/hash-in-links).

## Материалы по теме

- [Установка и подключение](https://dev.vk.ru/ru/libraries/router/setup)
- [Настройка маршрутов](https://dev.vk.ru/ru/libraries/router/setting-routes)
- [Формат внешних и внутренних ссылок](https://dev.vk.ru/ru/libraries/router/hash-in-links)
- [Объект RouteWithRoot](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteWithRoot)
- [Объект RouteWithoutRoot](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteWithoutRoot)
- [Функция createHashRouter](https://dev.vk.ru/ru/libraries/router/reference/functions/createHashRouter)
- [Функция createBrowserRouter](https://dev.vk.ru/ru/libraries/router/reference/functions/createBrowserRouter)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
