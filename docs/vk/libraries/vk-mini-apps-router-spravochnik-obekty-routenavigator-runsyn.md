# RouteNavigator.runSync

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Объекты → RouteNavigator.runSync  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Последовательно вызывает методы объекта [`RouteNavigator`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator) с гарантией, что все вызовы будут завершены одновременно.

Важно! Не запускайте несколько экземпляров `runSync` одновременно. Это может привести к race condition – состоянию, когда несколько процессов пытаются одновременно получить доступ к одному и тому же ресурсу и результат становится непредсказуемым.

Чтобы избежать ошибок, не используйте метод `runSync` с другими переходами в навигации.

## Пример

```ts
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
```

```
export function SomePage() {
  const routeNavigator = useRouteNavigator();
```

```
// Задаём массив вызовов
const foo = [
  () => routeNavigator.back(-2),
  () => routeNavigator.replace('/'),
  () => routeNavigator.push('/persik')
]);
```

```
  return (
    // Вызов метода
    <Button onClick={() => routeNavigator.runSync(foo) }>Сложный
переход</Button>
  );
}
```

## Объявление

```ts
runSync(actions: VoidFunction[]): Promise<void>;
```

## Параметры

| Параметр | Тип | Описание |
|---|---|---|
| `action` обязательный | `VoidFunction[]` | Массив функций, каждая из которых вызывает метод объекта |

[`RouteNavigator`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator) [.](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator)

Важно! Каждая из функций должна вызывать только один метод.

## Результат

Объект `Promise`, который разрешается при успешном выполнении перехода. Работает в служебных целях. Использовать этот объект в своём коде, как правило, нет необходимости.

## Материалы по теме

- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [RouteNavigator.backToFirst](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/backToFirst)
- [RouteNavigator.go](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/go)
- [Объект RouteNavigator](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
