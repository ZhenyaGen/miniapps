# Установка и подключение

**Раздел:** Библиотеки → vk-mini-apps-router → Установка и подключение  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

[vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router) — библиотека с открытым кодом. Вы можете найти её исходные файлы в репозитории на GitHub: [https://github.com/VKCOM/vk-mini-apps-router](https://github.com/VKCOM/vk-mini-apps-router).

Скачивать исходники и собирать библиотеку необязательно. Воспользуйтесь готовым пакетом. Подробные инструкции — ниже.

## Шаг 1. Включите библиотеку в ваш проект

1. Откройте окно командной строки.

2. Перейдите в папку своего проекта и добавьте к проекту библиотеку vk-mini-apps-router.

Для этого выполните следующие команды:

#### Командная строка

```
cd c:/my-project
```

```
yarn add @vkontakte/vk-mini-apps-router
— или —
npm install @vkontakte/vk-mini-apps-router --save
```

## Шаг 2. Подключите библиотеку и создайте роутер

Библиотека vk-mini-apps-router даёт возможность создавать роутеры разных типов. Они работают сходным образом, но предназначены для разных видов приложений и различаются форматом ссылок на маршруты. Подробности — в разделе [Типы роутеров](https://dev.vk.ru/ru/libraries/router/router-types).

1. Чтобы создать экземпляр [роутера](https://dev.vk.ru/ru/libraries/router), вызовите одну из функций:

- [`createHashRouter(...)`](https://dev.vk.ru/ru/libraries/router/reference/functions/createHashRouter) — создаёт роутер типа [Hash](https://dev.vk.ru/ru/libraries/router/router-types#Hash-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80). Он используется в веб-приложениях, которые запускаются на платформе ВКонтакте.
- [`createHashParamRouter(...)`](https://dev.vk.ru/ru/libraries/router/reference/functions/createHashParamRouter) — создаёт роутер типа [HashParam](https://dev.vk.ru/ru/libraries/router/router-types#HashParam-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80). Он также используется в веб-приложениях, которые запускаются на платформе ВКонтакте, но использует другой формат внешних ссылок по сравнению с роутером Hash.
- [`createBrowserRouter(...)`](https://dev.vk.ru/ru/libraries/router/reference/functions/createBrowserRouter) — создаёт роутер типа [Browser](https://dev.vk.ru/ru/libraries/router/router-types#Browser-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80). Он используется в веб- приложениях, которые запускаются вне платформы ВКонтакте.

Все функции в качестве параметра принимают массив объектов, описывающих маршруты, которые используются вашим приложением. Подробнее — в разделе [Настройка маршрутов](https://dev.vk.ru/ru/libraries/router/setting-routes).

```ts
import { createHashRouter } from '@vkontakte/vk-mini-apps-router';
const router = createHashRouter([ /* описание путей приложения */] );
// или
const router = createHashParamsRouter([ /* описание путей приложения */] );
// или
const router = createBrowserRouter([ /* описание путей приложения */] );
```

2. В коде приложения оберните компонент вашего приложения — `App`  — в [`RouterProvider`](https://dev.vk.ru/ru/libraries/router/reference/components/RouterProvider) и передайте последнему созданный роутер.

```ts
import { RouterProvider } from '@vkontakte/vk-mini-apps-router';
import App from './App';
```

```
<RouterProvider router={router}>
  <App />
</RouterProvider>
```

Ниже — полный пример кода с подключением библиотеки [VKUI](https://dev.vk.ru/ru/libraries/vkui).

```ts
import { RouterProvider, createHashRouter } from '@vkontakte/vk-mini-apps-
router';
import { createRoot } from 'react-dom/client';
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import { App } from './App';
```

```
const router = createHashRouter([
  {
    path: '/',
    panel: 'home_panel',
    view: 'default_view',
  },
]);
```

```
const root = createRoot(
  document.getElementById('root') as HTMLElement
);
```

```
root.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <AppRoot>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </AppRoot>
    </AdaptivityProvider>
  </ConfigProvider>
);
```

## Шаг 3. Используйте роутер для отрисовки страниц

Роутер предоставляет идентификаторы React-компонентов, которые необходимы для отрисовки текущей страницы. Чтобы получить эту информацию, вызовите функцию

[`useActiveVkuiLocation()`](https://dev.vk.ru/ru/libraries/router/reference/hooks/useActiveVkuiLocation). Далее полученные данные передайте JSX-элементам для отрисовки.

```ts
import { useActiveVkuiLocation, useGetPanelForView } from '@vkontakte/vk-mini-
apps-router';
import { Root, View, Panel } from '@vkontakte/vkui';
```

```
export function App() {
  // Получение информации о View и Panel
  const { view: activeView } = useActiveVkuiLocation();
  const activePanel = useGetPanelForView('default_view');
```

```
  return(
    // Передача идентификатора View для отрисовки
    <Root activeView={activeView}>
      // // Получение идентификатора Panel для отрисовки
      <View nav="default_view" activePanel={activePanel}>
        <Panel nav="home_panel"><!-- Содержимое страницы Home --></Panel>
        <Panel nav="persik_panel"><!-- Содержимое страницы Persik --></Panel>
        // Другие компоненты Panel
      </View>
      // Другие компоненты View
    </Root>
  )
}
```

При [навигации в приложении](https://dev.vk.ru/ru/libraries/router/navigation) происходит смена активных компонентов. Библиотека возвращает активные компоненты как результат вызова [`useActiveVkuiLocation()`](https://dev.vk.ru/ru/libraries/router/reference/hooks/useActiveVkuiLocation) и

[`useGetPanelForView()`](https://dev.vk.ru/ru/libraries/router/reference/hooks/useGetPanelForView). При последующей отрисовке именно они будут выведены на экран.

Важно! Вызовы `useActiveVkuiLocation()`, `useGetPanelForView()`, а также других хуков библиотеки, должны проходить в рамках компонента `<RouterProvider>...` `</RouterProvider>`.

## Что дальше

После подключения библиотеки и добавления кода для отрисовки:

- [Настройте маршруты](https://dev.vk.ru/ru/libraries/router/setting-routes), используемые вашим приложением.
- Добавьте код для [навигации по экранам](https://dev.vk.ru/ru/libraries/router/navigation).

- Рассмотрите необходимость обработки ошибки, которая возникнет при [переходе по](https://dev.vk.ru/ru/libraries/router/handling-errors) [несуществующему маршруту](https://dev.vk.ru/ru/libraries/router/handling-errors).

## Материалы по теме

- [Настройка маршрутов](https://dev.vk.ru/ru/libraries/router/setting-routes)
- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [Обработка ошибок](https://dev.vk.ru/ru/libraries/router/handling-errors)
- [Поддержка модальных и всплывающих окон](https://dev.vk.ru/ru/libraries/router/modal-windows)
- [Поддержка анимации](https://dev.vk.ru/ru/libraries/router/animation)
- [Библиотека vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router)
