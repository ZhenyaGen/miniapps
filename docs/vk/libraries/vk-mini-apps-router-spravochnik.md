# Справочник

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Этот раздел содержит описание React-компонентов, функций и объектов, предоставляемых библиотекой [vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router).

## Компоненты

| Компонент | Описание |
|---|---|
| [RouterLink](https://dev.vk.ru/ru/libraries/router/reference/components/RouterLink) | Компонент для удобного создания ссылок на экраны вашего React-приложения. |
| [RouterProvider](https://dev.vk.ru/ru/libraries/router/reference/components/RouterProvider) | Компонент-обёртка для вашего React-приложения. Необходим для использования функций и объектов библиотеки во вложенных компонентах. |

## Функции

| Функция | Описание |
|---|---|
| [createBrowserRouter](https://dev.vk.ru/ru/libraries/router/reference/functions/createBrowserRouter) | Используется для создания экземпляра [Browser-роутера](https://dev.vk.ru/ru/libraries/router/router-types#Browser-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80) и указания маршрутов. |
| [createHashParamRouter](https://dev.vk.ru/ru/libraries/router/reference/functions/createHashParamRouter) | Используется для создания экземпляра [HashParam-роутера](https://dev.vk.ru/ru/libraries/router/router-types#HashParam-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80) и указания маршрутов. |
| [createHashRouter](https://dev.vk.ru/ru/libraries/router/reference/functions/createHashRouter) | Используется для создания экземпляра [Hash-роутера](https://dev.vk.ru/ru/libraries/router/router-types#Hash-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80) и указания маршрутов. |

## Hooks

| Hook | Описание |
|---|---|
| [useActiveVkuiLocation](https://dev.vk.ru/ru/libraries/router/reference/hooks/useActiveVkuiLocation) | Используется для получения React-компонентов, которые должны быть отображены на экране для текущего URL приложения. |
| [useEnableSwipeBack](https://dev.vk.ru/ru/libraries/router/reference/hooks/useEnableSwipeBack) | Используется для включения поддержки жеста Swipe Back в мини- приложениях, запущенных в мобильном приложении ВКонтакте для iOS. |
| [useFirstPageCheck](https://dev.vk.ru/ru/libraries/router/reference/hooks/useFirstPageCheck) | Используется для проверки, находится ли пользователь на странице, на которую он зашёл первой при работе с приложением в текущую сессию. |
| [useGetPanelForView](https://dev.vk.ru/ru/libraries/router/reference/hooks/useGetPanelForView) | Используется для получения информации о компоненте `Panel` указанного |

`View`.

| Hook | Описание |
|---|---|
| [useHref](https://dev.vk.ru/ru/libraries/router/reference/hooks/useHref) | Создаёт ссылку для открытия экрана приложения. Формат зависит от [типа](https://dev.vk.ru/ru/libraries/router/router-types) [роутера](https://dev.vk.ru/ru/libraries/router/router-types), используемого в приложении. |
| [useLinkClickHandler](https://dev.vk.ru/ru/libraries/router/reference/hooks/useLinkClickHandler) | Создаёт код для обработчика `onClick` -сообщения для перехода по указанному адресу. |
| [useMetaParams](https://dev.vk.ru/ru/libraries/router/reference/hooks/useMetaParams) | Возвращает данные, которые были переданы с помощью [специального](https://dev.vk.ru/ru/libraries/router/parameters#%D0%94%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2%20push()%20%D0%B8%20replace()) [параметра](https://dev.vk.ru/ru/libraries/router/parameters#%D0%94%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2%20push()%20%D0%B8%20replace()) методов [`RouteNavigator.push(...)`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/push) и |
| [`RouteNavigator.replace(...)`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/replace) | [.](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/replace) |
| [useParams](https://dev.vk.ru/ru/libraries/router/reference/hooks/useParams) | Возвращает значение параметров, которые указаны как часть URL, например `/user/:id/edit/:contacts`. |
| [usePopout](https://dev.vk.ru/ru/libraries/router/reference/hooks/usePopout) | Возвращает JSX-объект, который будет отображён как [Popout-компонент](https://dev.vk.ru/ru/libraries/router/modal-windows#%D0%9E%D1%82%D0%BA%D1%80%D1%8B%D1%82%D0%B8%D0%B5%20%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20Popout). |
| [useRouteNavigator](https://dev.vk.ru/ru/libraries/router/reference/hooks/useRouteNavigator) | Возвращает объект [`RouteNavigator`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator), который используется для навигации в приложении. |
| [useSearchParams](https://dev.vk.ru/ru/libraries/router/reference/hooks/useSearchParams) | Возвращает значение параметров, которые указаны в URL после символа |

`?`, например `/contacts/edit?param1=value1`.

## Объекты

| Функция | Описание |
|---|---|
| [NavigationOptions](https://dev.vk.ru/ru/libraries/router/reference/objects/NavigationOptions) | Вспомогательный объект, используемый при навигации в приложении с помощью методов [RouteNavigator](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator). |
| [RouteNavigator](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator) | Используется для навигации в приложении: переходов по страницам, открытия модальный и всплывающих окон, изменения истории переходов. |
| [RouteWithoutRoot](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteWithoutRoot) | Применяется для указания маршрутов в приложениях, которые используют только один VKUI-компонент [`Root`](https://vkui.io/components/root) [.](https://vkui.io/components/root) |
| [RouteWithRoot](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteWithRoot) | Применяется для указания маршрутов в приложениях, которые используют несколько VKUI-компонентов [`Root`](https://vkui.io/components/root) [.](https://vkui.io/components/root) |

## Материалы по теме

- [Библиотека vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router)
