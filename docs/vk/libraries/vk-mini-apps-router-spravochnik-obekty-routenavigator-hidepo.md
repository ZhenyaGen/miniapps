# RouteNavigator.hidePopout

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Объекты → RouteNavigator.hidePopout  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Сбрасывает внутренний указатель роутера на всплывающее окно, что приводит к закрытию всплывающего окна, если оно отображается.

## Пример

```ts
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
```

```
const routeNavigator = useRouteNavigator();
```

```
const popup =
    <Alert
      actions={[
        {
          title: 'Забрать',
          mode: 'destructive',
        },
      ]}
      onClose={() => routeNavigator.hidePopout() /* Вызов метода */}
      header="Еда персика"
      text="Забрать у Персика еду?"
    />;
}
```

## Объявление

```ts
hidePopout(): Promise<void>;
```

## Параметры

Не используются.

## Результат

Объект `Promise`, который разрешается, если модальное окно было скрыто успешно. Работает в служебных целях. Использовать этот объект в своём коде, как правило, нет необходимости.

## Материалы по теме

- [Открытие компонентов Popout](https://dev.vk.ru/ru/libraries/router/modal-windows#%D0%9E%D1%82%D0%BA%D1%80%D1%8B%D1%82%D0%B8%D0%B5%20%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20Popout)

- [RouteNavigator.showPopout](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/showPopout)
- [usePopout](https://dev.vk.ru/ru/libraries/router/reference/hooks/usePopout)
- [RouteNavigator.hideModal](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/hideModal)
- [Объект RouteNavigator](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
