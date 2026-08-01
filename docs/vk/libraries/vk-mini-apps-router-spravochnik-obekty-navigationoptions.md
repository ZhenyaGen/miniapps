# NavigationOptions

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Объекты → NavigationOptions  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`NavigationOptions` — вспомогательный объект, который используется методами объекта [`RouteNavigator`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator) при переходе по страницам приложения.

## Объявление

```ts
export interface NavigationOptions {
  keepSearchParams?: boolean;
}
```

## Свойства

Объект содержит только следующие свойства.

| Свойство | Тип | Описание |
|---|---|---|
| `keepSearchParams` необязательное | `boolean` | Указывает, должны ли [методы навигации](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator#%D0%9C%D0%B5%D1%82%D0%BE%D0%B4%D1%8B) сохранять query- параметры при переходе. - Если `keepSearchParams: true`, то [роутер](https://dev.vk.ru/ru/libraries/router) сохранит параметры вида `...?param1=value1` при переходе на новую страницу. - Если `keepSearchParams: false`, то query-параметры будут сброшены. |

Значение по умолчанию: `false`.

| `state` необязательное | `any` Значение или объект, который будет передан при переходе на новую страницу. Подробности использования — в разделе [Передача параметров](https://dev.vk.ru/ru/libraries/router/navigation#%D0%9F%D0%B5%D1%80%D0%B5%D0%B4%D0%B0%D1%87%D0%B0%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D0%BE%D0%B2). |
|---|---|

## Материалы по теме

- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [Использование параметров](https://dev.vk.ru/ru/libraries/router/parameters)
- [RouteNavigator.push](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/push)
- [RouteNavigator.replace](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/replace)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
