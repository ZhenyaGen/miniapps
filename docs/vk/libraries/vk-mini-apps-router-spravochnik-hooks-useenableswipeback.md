# useEnableSwipeBack

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Hooks → useEnableSwipeBack  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Включает использование VKUI-анимации для переходов, которые выполняются с помощью жеста Swipe Back («смахнуть назад») в [мини-приложениях](https://dev.vk.ru/ru/mini-apps/overview), запущенных в мобильном приложении ВКонтакте для iOS.

## Пример

```ts
import { useEnableSwipeBack } from '@vkontakte/vk-mini-apps-router';
```

```
export const Home = () => {
    useEnableSwipeBack(); // Страница будет поддерживать VKUI-анимации при
работе жеста Swipe Back
```

```
    return ( ... );
}
```

## Объявление

```ts
export function useEnableSwipeBack() : void
```

## Параметры

Не используются.

## Результат

Функция не возвращает значений или объектов.

## Особенности использования

- [VKUI](https://dev.vk.ru/ru/libraries/vkui)-анимации работают при переходах между компонентами [`Panel`](https://vkui.io/components/panel) в рамках одного [`View`](https://vkui.io/components/view) [.](https://vkui.io/components/view) Эти анимации работают неправильно, когда активен обработчик жеста Swipe Back, предоставляемый iOS. `useEnableSwipeBack()` переключает приложение на VKUI-обработчик.

Вызывайте `useEnableSwipeBack()` на первых (по логике) страницах. Например, если у вас в приложении есть каталог товаров и карточки отдельных товаров, то `useEnableSwipeBack()` надо вызывать на странице каталога. Это активирует обработку жеста Swipe Back и для остальных экранов, работающих в пределах этого же `View`. При смене `View` вызов надо будет повторить.

Подробности обработки жеста Swipe Back вы можете найти в документации компонента [VKUI](https://vkui.io/components/view) [View](https://vkui.io/components/view).

Если логика работы `useEnableSwipeBack()` вам не подходит, вы можете его не использовать. Реализуйте свою логику с помощью события [`VKWebAppSetSwipeSettings`](https://dev.vk.ru/ru/bridge/VKWebAppSetSwipeSettings) библиотеки [VK](https://dev.vk.ru/ru/bridge/overview) [Bridge](https://dev.vk.ru/ru/bridge/overview).
- Вызовы функции `useEnableSwipeBack()` должны проходить в рамках компонента

[`RouterProvider`](https://dev.vk.ru/ru/libraries/router/reference/components/RouterProvider) [.](https://dev.vk.ru/ru/libraries/router/reference/components/RouterProvider)

## Материалы по теме

- [VKUI View](https://vkui.io/components/view)
- [Событие VKWebAppSetSwipeSettings](https://dev.vk.ru/ru/bridge/VKWebAppSetSwipeSettings)
- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
