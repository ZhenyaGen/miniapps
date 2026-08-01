# RouteNavigator.back

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Объекты → RouteNavigator.back  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Выполняет один или несколько шагов назад по истории переходов и вызывает отрисовку приложения, соответствующую предыдущим шагам.

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
    <Button onClick={() => routeNavigator.back()}>Назад</Button>
  );
}
```

## Объявление

```ts
back(to?: number): Promise<void>;
```

## Параметры

| Параметр | Тип | Описание |
|---|---|---|
| `to` необязательный | `number` | Количество шагов назад, которые нужно выполнить. Значение по умолчанию: `1`. |

## Результат

Объект `Promise`, который разрешается при успешном выполнении перехода. Работает в служебных целях. Использовать этот объект в своём коде, как правило, нет необходимости.

## Особенности использования

Метод использует историю переходов в браузере. Если параметр `to` указывает слишком большое количество шагов для возврата, то вполне возможно, что пользователь выйдет из приложения. Если количество шагов больше числа записей в истории, то пользователь окажется на первой записи.

## Материалы по теме

- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [RouteNavigator.backToFirst](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/backToFirst)
- [RouteNavigator.go](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/go)
- [RouteNavigator.push](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/push)
- [Объект RouteNavigator](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
