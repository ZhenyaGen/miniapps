# RouteNavigator.backToFirst

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Объекты → RouteNavigator.backToFirst  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Переходит назад по истории навигации на первую страницу приложения, которую открыл пользователь. Вызывает отрисовку этой страницы.

## Пример

```ts
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
```

```
export function SomePage() {
  const routeNavigator = useRouteNavigator();
```

```
  return (
    // Вызов метода
    <Button onClick={() => routeNavigator.backToFirst()}>На первую
страницу</Button>
  );
}
```

## Объявление

```ts
backToFirst(): Promise<void>;
```

## Параметры

Не используются.

## Результат

Объект `Promise`, который разрешается при успешном выполнении перехода. Работает в служебных целях. Использовать этот объект в своём коде, как правило, нет необходимости.

## Материалы по теме

- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [RouteNavigator.back](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/back)
- [RouteNavigator.go](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/go)
- [RouteNavigator.runSync](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/runSync)
- [RouteNavigator.push](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/push)
- [Объект RouteNavigator](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
