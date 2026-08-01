# useFirstPageCheck

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Hooks → useFirstPageCheck  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Используйте эту функцию, чтобы проверить, является ли текущая страница приложения первой загруженной страницей приложения. Это помогает обработать ситуации, когда пользователь нажимает «Назад», находясь на первой странице.

## Пример

```ts
import { useFirstPageCheck } from '@vkontakte/vk-mini-apps-router';
```

```
// Проверка, является ли страница первой загруженной
const isFirstPage = useFirstPageCheck();
<PanelHeader
  before={<PanelHeaderBack onClick={() => isFirstPage ?
routeNavigator.replace('/') : routeNavigator.back()} />}
>
```

## Объявление

```ts
export function useFirstPageCheck(): boolean
```

## Параметры

Не используются.

## Результат

Функция возвращает `true`, если текущая страница приложения является первой страницей, на которую пользователь перешёл после запуска приложения, и `false` в ином случае.

Используя результат, можно [обработать ситуации](https://dev.vk.ru/ru/libraries/router/navigation#%D0%9D%D0%B0%D0%B2%D0%B8%D0%B3%D0%B0%D1%86%D0%B8%D1%8F%20%D0%BD%D0%B0%D0%B7%D0%B0%D0%B4), когда пользователь нажимает кнопку «Назад», находясь на первой загруженной странице.

## Особенности использования

Вызовы функции `useFirstPageCheck()` должны проходить в рамках компонента

[`RouterProvider`](https://dev.vk.ru/ru/libraries/router/reference/components/RouterProvider) [.](https://dev.vk.ru/ru/libraries/router/reference/components/RouterProvider)

## Материалы по теме

- [Навигация назад](https://dev.vk.ru/ru/libraries/router/navigation#%D0%9D%D0%B0%D0%B2%D0%B8%D0%B3%D0%B0%D1%86%D0%B8%D1%8F%20%D0%BD%D0%B0%D0%B7%D0%B0%D0%B4)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
