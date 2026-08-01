# useLinkClickHandler

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Hooks → useLinkClickHandler  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Для создания ссылок с помощью компонентов `<Button>` или `<Link>` нужно написать код обработчика события `onClick`, который будет выполнять переход по новому адресу. При этом адрес перехода зависит от [типа роутера](https://dev.vk.ru/ru/libraries/router/router-types) в вашем приложении.

Функция `useLinkClickHandler(...)` принимает адрес для перехода и создаёт код, который можно подставить в `onClick` -обработчик и использовать для перехода по указанному адресу.

## Пример

```ts
import { useHref, useLinkCreateHandler } from '@vkontake/vk-mini-apps-router';
```

```
const hrefValue = useHref('/contacts/edit');
const onClickCode = useLinkCreateHandle('/contacts/edit');
```

```
<Link href={hrefValue} onClick={ onClickCode }>Редактировать</Link>
```

## Объявление

```ts
export function useLinkClickHandler<E extends Element = HTMLAnchorElement>(
  to: NavigationTarget,
  {
    target?: HTMLAttributeAnchorTarget;
    replace?: boolean;
    preventScrollReset?: boolean;
    relative?: RelativeRoutingType;
  }
  ): (event: ReactMouseEvent<E, MouseEvent>) => void
```

## Параметры

### Параметры функции

| Параметр | Тип | Описание |
|---|---|---|
| `to` обязательный | [`NavigationTarget`](https://dev.vk.ru/ru/libraries/router/navigation#NavigationTarget) | Конечная точка для перехода. Можно указать одним из трёх способов. Подробности — в разделе [NavigationTarget](https://dev.vk.ru/ru/libraries/router/navigation#NavigationTarget). |
| `свойства` | `object` | Объект, который описывает свойства перехода. |

### Свойства перехода

| Поле | Тип | Описание |
|---|---|---|
| `target` необязательное | `string` | Окно, в котором будет открыт новый URL. Возможные значения — такие же, как в стандартном HTML: - `_blank` - `_parent` - `_self` - `_top` |

Значение по умолчанию: `_self`.

| `replace` необязательное | `boolean` Если `true`, то новый адрес заменит текущий в истории переходов. Если `false`, новый адрес будет добавлен в историю. Значение по умолчанию: `false`. |
|---|---|
| `preventScrollReset` необязательное | `boolean` Если `true`, положение прокрутки экрана не изменится при переходе. Если `false`, прокрутка сбросится в `0`. Значение по умолчанию: `false`. |
| `relative` необязательное | `string` Зарезервировано для использования в будущем. |
| `params` необязательное | `object` Объект, поля которого содержат значения [path-параметров](https://dev.vk.ru/ru/libraries/router/parameters#Path-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B), указанных в пути. |

Указать path-параметры можно и в `to`. Использование

`params` может быть удобнее при кодировании и понятнее при чтении кода. Подробности — в разделе [Path-параметры](https://dev.vk.ru/ru/libraries/router/parameters#Path-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B).

## Результат

`useLinkClickHandler(...)` возвращает функцию-обработчик события `onClick`. Вы можете добавить его в используемый компонент, как показано в примере выше.

## Материалы по теме

- [useHref](https://dev.vk.ru/ru/libraries/router/reference/hooks/useHref)
- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
