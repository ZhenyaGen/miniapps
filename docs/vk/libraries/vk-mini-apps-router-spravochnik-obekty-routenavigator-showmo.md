# RouteNavigator.showModal

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Объекты → RouteNavigator.showModal  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Открывает модальное окно, указанное параметрами.

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
    <Button onClick={() =>
routeNavigator.showModal(`modal_contacts`)}>Контакты</Button>
  );
}
```

## Объявление

```ts
showModal(id: string, options?: { state?: Object }): Promise<void>;
```

## Параметры

| Параметр | Тип | Описание |
|---|---|---|
| `id` обязательный | `string` | Идентификатор модального окна, которое нужно открыть. |
| `options` | `object` | Объект, который описывает свойства перехода. |

### Свойства перехода

| Поле | Тип | Описание |
|---|---|---|
| `state` необязательный | `object` | Значение или объект, который будет передан при переходе на новую страницу. Подробности использования — в разделе [Передача](https://dev.vk.ru/ru/libraries/router/navigation#%D0%9F%D0%B5%D1%80%D0%B5%D0%B4%D0%B0%D1%87%D0%B0%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D0%BE%D0%B2) [параметров](https://dev.vk.ru/ru/libraries/router/navigation#%D0%9F%D0%B5%D1%80%D0%B5%D0%B4%D0%B0%D1%87%D0%B0%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D0%BE%D0%B2). |

## Результат

Объект `Promise`, который разрешается, если модальное окно было открыто успешно. Работает в служебных целях. Использовать этот объект в своём коде, как правило, нет необходимости.

## Особенности использования

- Модальные и всплывающие окна, открытые в момент вызова метода `showModal`, будут скрыты.
- Метод не меняет текущий URL приложения, но добавляет в историю переходов запись об открытии модального окна.

Если модальное окно открывается поверх другого модального окна, метод заменяет запись в истории, а не добавляет новую.

## Материалы по теме

- [Поддержка модальных и всплывающих окон](https://dev.vk.ru/ru/libraries/router/modal-windows)
- [RouteNavigator.hideModal](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/hideModal)
- [RouteNavigator.showPopout](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/showPopout)
- [Объект RouteNavigator](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
