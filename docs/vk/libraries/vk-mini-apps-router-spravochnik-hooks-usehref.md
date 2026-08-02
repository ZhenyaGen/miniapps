# useHref

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Hooks → useHref  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Используйте функцию `useHref(...)`, чтобы получить адрес для перехода на экран вашего приложения. Этот адрес соответствует [типу роутера](https://dev.vk.ru/ru/libraries/router/router-types) в вашем приложении и может использоваться для создания внешних ссылок на экран.

| Маршрут | Создаваемая ссылка |
|---|---|
| `/contacts/edit` | [Hash-роутер](https://dev.vk.ru/ru/libraries/router/router-types#Hash-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80):             `/#/contacts/edit` [HashParam-роутер](https://dev.vk.ru/ru/libraries/router/router-types#HashParam-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80):  `/#path=%2Fcontacts%2Fedit` [Browser-роутер](https://dev.vk.ru/ru/libraries/router/router-types#Browser-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80):       `/contacts/edit` |

Созданную ссылку можно применять в атрибуте `href` элементов `<a>` и `<Link>` в вашем приложении. Также, её можно использовать для создания внешней ссылки на экран приложения. Для этого к ней надо добавить адрес приложения, например

`https://vk.com/app12345/#/contacts/edit`.

## Пример

```ts
import { routes } from '../routes';
import { useHref, Link } from '@vkontake/vk-mini-apps-router';
```

```
const pageURL = useHref('/contacts/edit');
const pageWithParamsURL = useHref(
  routes.default_root.default_view.persik_0,
  { params: { emotion: `sad` } }
);
```

```
<Link href={pageURL}>Edit Contacts</Link>
<Link href={pageWithParamsURL}>Persik</Link>
```

## Объявление

```ts
export function useHref(to: NavigationTarget, { relative }: { relative?:
RelativeRoutingType} = {}): string
```

## Параметры

| Параметр | Тип | Описание |
|---|---|---|
| `to` обязательный | [`NavigationTarget`](https://dev.vk.ru/ru/libraries/router/navigation#NavigationTarget) | Конечная точка для перехода. Можно указать одним из трёх способов. Подробности — в разделе [NavigationTarget](https://dev.vk.ru/ru/libraries/router/navigation#NavigationTarget). |
| `relative` необязательный | `object` | Зарезервирован для использования в будущем. |
| `params` необязательный | `object` | Объект, поля которого содержат значения [path-](https://dev.vk.ru/ru/libraries/router/parameters#Path-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B) [параметров](https://dev.vk.ru/ru/libraries/router/parameters#Path-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B), указанных в пути. |

Указать path-параметры можно и в `to`. Использование

`params` может быть удобнее при кодировании и понятнее при чтении кода. Подробности — в разделе [Path-](https://dev.vk.ru/ru/libraries/router/parameters#Path-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B) [параметры](https://dev.vk.ru/ru/libraries/router/parameters#Path-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B).

## Результат

Функция возвращает ссылку для экрана, маршрут которого указан в параметре

`NavigationTarget`.

С помощью библиотеки vk-mini-apps-router вы можете создавать роутеры [разных типов](https://dev.vk.ru/ru/libraries/router/router-type). Функция учитывает тип роутера, который использует ваше приложение, и возвращает ссылку в правильном формате.

## Особенности использования

Вызовы функции `useHref()` должны проходить в рамках компонента [`RouterProvider`](https://dev.vk.ru/ru/libraries/router/reference/components/RouterProvider) [.](https://dev.vk.ru/ru/libraries/router/reference/components/RouterProvider)

## Материалы по теме

- [useLinkClickHandle](https://dev.vk.ru/ru/libraries/router/reference/hooks/useLinkClickHandle)
- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
