# RouteNavigator.go

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Объекты → RouteNavigator.go  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Перемещается по истории переходов на указанное количество шагов и вызывает отрисовку приложения, соответствующую новому URL.

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
    <Button onClick={() => routeNavigator.go(-2)}>На два шага назад</Button>
  );
}
```

## Объявление

```ts
go(to?: number): Promise<void>;
```

## Параметры

| Параметр | Тип | Описание |
|---|---|---|
| `to` обязательный | `number` | Количество шагов для перемещения по истории переходов. Положительное число означает перемещение вперёд, отрицательное — назад. |

`0` — текущий URL приложения не меняется.

## Результат

Объект `Promise`, который разрешается при успешном выполнении перехода. Работает в служебных целях. Использовать этот объект в своём коде, как правило, нет необходимости.

## Особенности использования

Метод использует историю переходов в браузере.

Если параметр `to` указывает слишком большое количество шагов для возврата, то вполне возможно, что пользователь выйдет из приложения. Если количество шагов возврата больше числа записей в истории, пользователь окажется на первой записи.

Если количество шагов вперёд больше числа доступных записей в истории, пользователь окажется на последней записи.

## Материалы по теме

- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [RouteNavigator.back](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/back)
- [RouteNavigator.backToFirst](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/backToFirst)
- [RouteNavigator.push](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/push)
- [Объект RouteNavigator](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
