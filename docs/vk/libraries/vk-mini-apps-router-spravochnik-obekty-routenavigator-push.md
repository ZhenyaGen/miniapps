# RouteNavigator.push

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Объекты → RouteNavigator.push  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Выполняет переход на новый URL в приложении и добавляет этот URL в историю переходов. Вызывает отрисовку компонентов, соответствующих новому URL.

## Пример

```ts
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
```

```
export function SomePage() {
  const persikPanel = routes.default_root.default_view.persik_0;
```

```
return (
  <Button
    onClick={() =>
      routeNavigator.push(
        '/emotion-panel/:emotion',
        {emotion: 'fish' },
        { keepSearchParams: true }
      )
    }
  >
    Персик хочет кушать
  </Button>
```

```
<Button
  onClick={() =>
    routeNavigator.push('/path', {keepSearchParams:true })
  }
>
  Персик хочет кушать
</Button>
```

```
    <Button
      onClick={() =>
        routeNavigator.push({search: {fish: 'beluga'}}, hash: '12'});
      }
    >
      Остаться на странице и изменить hash и search
    </Button>
    <Button
      onClick={() =>
        routeNavigator.push(
          {
            pathname: persikPanel,
            hash: '12'
          },
          {
            emotion: 'sad'
          },
          {
            keepSearchParams: true
          }
        );
      }
    >
     Персик хочет кушать
    </Button>
}
```

## Параметры

### Вариант 1

```ts
push(to: string | Page | {pathname?: string | Page, hash?: string, search?:
URLSearchParams | Record<string, string> | string}, options?:
NavigationOptions): Promise<void>
```

| Параметр | Тип | Описание |
|---|---|---|
| `to` обязательный | [`NavigationTarget`](https://dev.vk.ru/ru/libraries/router/navigation#NavigationTarget) | Конечная точка для перехода. Можно указать одним из трёх способов. Подробности — в разделе [NavigationTarget](https://dev.vk.ru/ru/libraries/router/navigation#NavigationTarget). |
| `options` необязательный | [`NavigationOptions`](https://dev.vk.ru/ru/libraries/router/reference/objects/NavigationOptions) | Вспомогательный параметр, используемый при навигации. |
| Если установить в параметре `{keepSearchParams:` | `true}`, то [роутер](https://dev.vk.ru/ru/libraries/router) сохранит query-параметры из текущего | URL при переходе на новый адрес. |

C помощью свойства `{state: {...}}` можно передавать параметры при переходе. Подробности — в разделе [Передача параметров — Дополнительные](https://dev.vk.ru/ru/libraries/router/parameters#%D0%94%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2%20push()%20%D0%B8%20replace()) [параметры методов](https://dev.vk.ru/ru/libraries/router/parameters#%D0%94%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2%20push()%20%D0%B8%20replace()) [`push()`](https://dev.vk.ru/ru/libraries/router/parameters#%D0%94%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2%20push()%20%D0%B8%20replace()) [и](https://dev.vk.ru/ru/libraries/router/parameters#%D0%94%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2%20push()%20%D0%B8%20replace()) [`replace()`](https://dev.vk.ru/ru/libraries/router/parameters#%D0%94%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2%20push()%20%D0%B8%20replace()) [.](https://dev.vk.ru/ru/libraries/router/parameters#%D0%94%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2%20push()%20%D0%B8%20replace())

### Вариант 2

```ts
push<T extends string>(to: PageWithParams<T> | {pathname: PageWithParams<T> |
string, hash?: string, search?: URLSearchParams | Record<string, string> |
string}, params: Params<T>, options?: NavigationOptions): Promise<void>
```

| Параметр | Тип | Описание |
|---|---|---|
| `T` необязательный | `object` | Объект, который может использоваться для типизации параметров `to` и `params`. |
| `to` обязательный | [`NavigationTarget`](https://dev.vk.ru/ru/libraries/router/navigation#NavigationTarget) | Конечная точка для перехода. Можно указать одним из трёх способов. Подробности — в разделе [NavigationTarget](https://dev.vk.ru/ru/libraries/router/navigation#NavigationTarget). |
| `params` обязательный | `object` | Объект, поля которого содержат значения [path-](https://dev.vk.ru/ru/libraries/router/parameters#Path-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B) [параметров](https://dev.vk.ru/ru/libraries/router/parameters#Path-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B), указанных в пути. |

Указать path-параметры можно и в `to`. Использование

`params` может быть удобнее при кодировании и понятнее при чтении кода. Подробности — в разделе [Path-параметры](https://dev.vk.ru/ru/libraries/router/parameters#Path-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B).

| `options` необязательный | [`NavigationOptions`](https://dev.vk.ru/ru/libraries/router/reference/objects/NavigationOptions) Вспомогательный параметр, используемый при навигации. Значение такое же, как в Варианте 1. |
|---|---|

## Результат

Объект `Promise`, который разрешается при успешном выполнении перехода. Работает в служебных целях. Использовать этот объект в своём коде, как правило, нет необходимости.

## Материалы по теме

- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [Использование параметров](https://dev.vk.ru/ru/libraries/router/parameters)
- [RouteNavigator.replace](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/replace)
- [RouteNavigator.back](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/back)
- [RouteNavigator.backToFirst](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/backToFirst)
- [RouteNavigator.go](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/go)
- [Объект RouteNavigator](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator)
- [Формат внешних и внутренних ссылок](https://dev.vk.ru/ru/libraries/router/hash-in-links)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
