# RouterLink

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Компоненты → RouterLink  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`RouterLink` — React-компонент для создания ссылок в вашем приложении с поддержкой переходов по маршрутам, созданным с помощью библиотеки [vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router).

Для создания ссылок с помощью других компонентов, например `<Button>` или `<Link>`, вам нужно написать код обработчика события `onClick`, а также указать атрибут `href` с адресом перехода, который зависит от используемого [типа роутера](https://dev.vk.ru/ru/libraries/router/router-types).

В `RouterLink` вы можете указать адрес для перехода в одном из свойств. Создавать обработчик

`onClick` не нужно. Также не нужно учитывать тип роутера при указании адреса перехода.

## Пример

```ts
import { useEnableSwipeBack, useActiveVkuiLocation, RouterLink,
useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
```

```
// ...
```

```
<InfoRow header="Links">
    <RouterLink to="/persik">My Cat</RouterLink>
    <RouterLink
        to={{ pathname: routes.default_root.default_view.persik_0, hash: "10"
}}
        params={{ emotion: 'sad' }}
    >
        Sad persik
    </RouterLink>
    <RouterLink
        to={{ pathname: "/user/contacts", hash: "10" }}
    >
        Contacts
    </RouterLink>
</InfoRow>
```

## Свойства

| Свойство | Тип | Описание |
|---|---|---|
| `to` обязательное | [`NavigationTarget`](https://dev.vk.ru/ru/libraries/router/navigation#NavigationTarget) | Конечная точка для перехода. Можно указать одним из трёх способов. Подробности — в разделе [NavigationTarget](https://dev.vk.ru/ru/libraries/router/navigation#NavigationTarget). |

| Свойство | Тип | Описание |
|---|---|---|
| `replace` необязательное | `boolean` | Указывает, заменит ли новый адрес текущий в истории переходов ( `true`) или новый адрес будет добавлен в конец истории ( `false`). Значение по умолчанию: `false`. |
| `target` необязательное | `string` | Указывает окно, в котором будет открыт новый URL. Возможные значения — такие же, как в стандартном HTML: - `_blank` - `_parent` - `_self` - `_top` |

Значение по умолчанию: `_self`.

| `onClick` необязательное | `код` Код, который будет выполняться при нажатии на ссылку. Если свойство `to` указывает на какой-либо адрес, то выполнится и переход на этот адрес, и выполнение кода в обработчике `onClick`. |
|---|---|
| `params` необязательное | `object` Объект, поля которого содержат значения [path-](https://dev.vk.ru/ru/libraries/router/parameters#Path-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B) [параметров](https://dev.vk.ru/ru/libraries/router/parameters#Path-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B), указанных в пути. |

Указать path-параметры можно и в `to`. Использование

`params` может быть удобнее при кодировании и понятнее при чтении кода. Подробности — в разделе [Path-](https://dev.vk.ru/ru/libraries/router/parameters#Path-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B) [параметры](https://dev.vk.ru/ru/libraries/router/parameters#Path-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B).

Компонент `RouterLink` также содержит свойства компонента [ `Link]` ([https://vkui.io/components/link](https://vkui.io/components/link)) из библиотеки [VKUI](https://dev.vk.ru/ru/libraries/vkui). Кроме того, он содержит стандартные свойства, используемые в React-компонентах, например `children`, которое предоставляет доступ к вложенным JSX-элементам.

## Материалы по теме

- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
