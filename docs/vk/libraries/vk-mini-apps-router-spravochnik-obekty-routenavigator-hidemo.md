# RouteNavigator.hideModal

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Объекты → RouteNavigator.hideModal  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Скрывает открытое модальное окно.

## Пример

```ts
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
```

```
<ModalRoot
  activeModal={activeModal}
  onClose={() => routeNavigator.hideModal()}
>
  <PersikModal nav='persik_modal'></PersikModal>
  <UserModal nav='user_modal'></UserModal>
</ModalRoot>
```

## Объявление

```ts
hideModal(pushPanel?: boolean, options?: {replace: boolean}): Promise<void>;
```

## Параметры

### Параметры функции

| Параметр | Тип | Описание |
|---|---|---|
| `pushPanel` необязательный | `boolean` | Определяет действие при закрытии окна. |

Если параметр равен `false`, то роутер делает шаг назад по истории переходов.

Если параметр равен `true`, роутер делает шаг вперёд, на панель, указанную в маршруте модального окна. Эта функциональность работает, если для модального окна был [определён маршрут](https://dev.vk.ru/ru/libraries/router/setting-routes).

Значение по умолчанию: `false`.

`options` `object` Объект, который описывает свойства перехода.

### Свойства перехода

| Поле | Тип | Описание |
|---|---|---|
| `replace` необязательный | `boolean` | Если параметр равен `true`, модальное окно закрывается без добавления записи в `history`. При этом должно выполняться одно из условий: - `pushPanel` = `true`. - Запись с модальным окном первая в истории переходов. Например, если в приложение перешли по прямой ссылке. |

Если параметр равен `false`, модальное окно закрывается с добавлением записи в `history`.

Значение по умолчанию `false`.

## Результат

Объект `Promise`, который разрешается, если модальное окно было скрыто успешно. Работает в служебных целях. Использовать этот объект в своём коде, как правило, нет необходимости.

## Материалы по теме

- [Поддержка модальных и всплывающих окон](https://dev.vk.ru/ru/libraries/router/modal-windows)
- [RouteNavigator.showModal](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/showModal)
- [RouteNavigator.hidePopout](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/hidePopout)
- [Объект RouteNavigator](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
