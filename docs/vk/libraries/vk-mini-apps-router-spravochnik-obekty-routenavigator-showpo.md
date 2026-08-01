# RouteNavigator.showPopout

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Объекты → RouteNavigator.showPopout  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Указывает JSX-объект, который будет использован как всплывающий компонент.

## Пример

```ts
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
```

```
export const  TestPopout = () => {
    const routeNavigator = useRouteNavigator();
    return (
        <Alert actions = {[
            {
              title: 'Отмена',
              autoClose: true,
              mode: 'cancel',
            },
            {
              title: 'Да',
              autoClose: true,
              mode: 'destructive',
              action: () => console.log('Кнопка нажата.'), // Можно убрать,
если некрасиво
            },
          ]}
          actionsLayout = "horizontal"
          onClose = { () => routeNavigator.hidePopout() }
          header = "..."
          text = "..." />
    );
}
```

```
const popout = TestPopout();
<Button stretched size="l" mode="secondary" onClick={() =>
routeNavigator.showPopout(popout)}>Открыть</Button>
```

## Объявление

```ts
showPopout(popout: JSX.Element): Promise<void>;
```

## Параметры

| Параметр | Тип | Описание |
|---|---|---|
| `popout` обязательный | `JSX.Element` | JSX-элемент, который будет использован как всплывающий компонент. Вы можете использовать любой подходящий для этой цели компонент библиотеки [VKUI](https://dev.vk.ru/ru/libraries/vkui), например, [`ActionSheet`](https://vkui.io/components/action-sheet) [,](https://vkui.io/components/action-sheet) |

[`Alert`](https://vkui.io/components/alert) [,](https://vkui.io/components/alert) [`ScreenSpinner`](https://vkui.io/components/spinner) или [`Snackbar`](https://vkui.io/components/snackbar) [.](https://vkui.io/components/snackbar)

## Результат

Объект `Promise`, который разрешается, если всплывающее окно было успешно открыто. Работает в служебных целях. Использовать этот объект в своём коде, как правило, нет необходимости.

## Особенности использования

- Метод `showPopout` не отображает всплывающее окно. Он только сообщает движку, какой React-компонент будет использован для показа.

Чтобы получить установленный таким образом компонент, используйте функцию

[`usePopout()`](https://dev.vk.ru/ru/libraries/router/reference/hooks/usePopout) [.](https://dev.vk.ru/ru/libraries/router/reference/hooks/usePopout)
- Вызов метода `showPopout` не приводит к смене текущего URL приложения.

- Если в момент вызова метода открыто другое всплывающее окно, оно будет заменено тем, которое вы указали в параметрах метода `showPopout`.
- Нажатие на кнопку «Назад» в браузере или на мобильном устройстве приводит к закрытию Popout-компонента, который был открыт с помощью `showPopout`.

## Материалы по теме

- [Открытие компонентов Popout](https://dev.vk.ru/ru/libraries/router/modal-windows#%D0%9E%D1%82%D0%BA%D1%80%D1%8B%D1%82%D0%B8%D0%B5%20%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%BE%D0%B2%20Popout)
- [RouteNavigator.hidePopout](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/hidePopout)
- [usePopout](https://dev.vk.ru/ru/libraries/router/reference/hooks/usePopout)
- [RouteNavigator.showModal](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/showModal)
- [Объект RouteNavigator](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
