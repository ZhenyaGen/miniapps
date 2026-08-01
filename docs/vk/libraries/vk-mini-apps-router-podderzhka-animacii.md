# Поддержка анимации

**Раздел:** Библиотеки → vk-mini-apps-router → Поддержка анимации  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Ключевая особенность библиотеки [vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router) — поддержка компонентов, предоставляемых библиотекой VKUI, и обеспечение надёжной анимации этих компонентов.

Компонент [`View`](https://vkui.io/components/view) в библиотеке VKUI позволяет плавно переходить между панелями [с помощью](https://vkui.io/components/view) [жеста Swipe Back](https://vkui.io/components/view). Для этой функциональности необходима информация об истории переходов. Чтобы её получить, вызовите функцию [`useActiveVkuiLocation()`](https://dev.vk.ru/ru/libraries/router/reference/hooks/useActiveVkuiLocation). Она вернёт массив

`panelsHistory` с нужными данными. Пример использования — ниже.

```ts
import { Root, View, Panel } from '@vkontakte/vkui';
import { useRouteNavigator, useActiveVkuiLocation } from '@vkontakte/vk-mini-
apps-router';
```

```
function App() {
  const {
    view: activeView,
    panel: activePanel,
    panelsHistory, // Получение данных об истории переходов
  } = useActiveVkuiLocation();
```

```
const routeNavigator = useRouteNavigator();
```

```
  return (
    <Root activeView={activeView}>
      <View
        nav="default_view"
        history={panelsHistory} // Передача данных истории переходов
        activePanel={activePanel}
        onSwipeBack={() => routeNavigator.back()}
      >
        <Panel nav="home_panel">Содержимое страницы</Panel>
        <Panel nav="persik_panel">Содержимое страницы</Panel>
      </View>
    </Root>
  );
}
```

## Материалы по теме

- [Использование для отрисовки страниц](https://dev.vk.ru/ru/libraries/router/setup#%D0%A8%D0%B0%D0%B3%203.%20%D0%98%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B9%D1%82%D0%B5%20%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80%20%D0%B4%D0%BB%D1%8F%20%D0%BE%D1%82%D1%80%D0%B8%D1%81%D0%BE%D0%B2%D0%BA%D0%B8%20%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86)
- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)

- [useActiveVkuiLocation](https://dev.vk.ru/ru/libraries/router/reference/hooks/useActiveVkuiLocation)
- [useGetPanelForView](https://dev.vk.ru/ru/libraries/router/reference/hooks/useGetPanelForView)
- [Библиотека vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router)
