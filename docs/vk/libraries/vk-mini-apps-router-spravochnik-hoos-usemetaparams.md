# useMetaParams

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Hoos → useMetaParams  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Используйте эту функцию, чтобы получить параметры, переданные в методах

[`RouteNavigator.push(...)`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/push) и [`RouteNavigator.replace(...)`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/replace) [.](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/replace)

## Пример

```ts
import { useMetaParams } from '@vkontakte/vk-mini-apps-router';
```

```
// Передача параметров в свойстве NavigationOptions.state
routeNavigator.push('/target-screen', {keepSearchParams : true, state:
{emotion: 'fish', value: 10}} )
```

```
// Вызов функции
const params = useMetaParams<{emotion: string, value: number}>();
```

## Объявление

```ts
export function useMetaParams<T extends Object>(): T
```

## Параметры

| Параметр | Тип | Описание |
|---|---|---|
| `T` обязательный | `object` | Объект, который указывает, какие параметры, переданные в вызове метода `push(...)` или `replace(...)`, функция должна вернуть. Подробнее — в разделе [Дополнительные параметры методов](https://dev.vk.ru/ru/libraries/router/parameters#%D0%94%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2%20push()%20%D0%B8%20replace()) [`push()`](https://dev.vk.ru/ru/libraries/router/parameters#%D0%94%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2%20push()%20%D0%B8%20replace()) [и](https://dev.vk.ru/ru/libraries/router/parameters#%D0%94%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2%20push()%20%D0%B8%20replace()) |

[`replace()`](https://dev.vk.ru/ru/libraries/router/parameters#%D0%94%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2%20push()%20%D0%B8%20replace()) [.](https://dev.vk.ru/ru/libraries/router/parameters#%D0%94%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2%20push()%20%D0%B8%20replace())

## Результат

Функция возвращает объект, поля которого будут заполнены значениями параметров, указанными в `T`.

Если параметры не были переданы, функция вернёт `null`.

## Материалы по теме

- [Дополнительные параметры методов](https://dev.vk.ru/ru/libraries/router/parameters#%D0%94%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2%20push()%20%D0%B8%20replace()) [`push()`](https://dev.vk.ru/ru/libraries/router/parameters#%D0%94%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2%20push()%20%D0%B8%20replace()) [и](https://dev.vk.ru/ru/libraries/router/parameters#%D0%94%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2%20push()%20%D0%B8%20replace()) [`replace()`](https://dev.vk.ru/ru/libraries/router/parameters#%D0%94%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2%20push()%20%D0%B8%20replace())
- [useSearchParams](https://dev.vk.ru/ru/libraries/router/reference/hooks/useSearchParams)
- [useParams](https://dev.vk.ru/ru/libraries/router/reference/hooks/useParams)

- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
