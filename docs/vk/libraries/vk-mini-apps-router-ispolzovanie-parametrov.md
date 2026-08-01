# Использование параметров

**Раздел:** Библиотеки → vk-mini-apps-router → Использование параметров  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Поддержка модальных и всплывающих окон

## Общая информация

С помощью библиотеки [vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router) вы можете создавать маршруты для отображения модальных окон, карточек и компонентов `Popout`.

Модальные окна и карточки можно выводить с изменением текущего URL [мини-приложения](https://dev.vk.ru/ru/mini-apps/overview) или без него. Компоненты `Popout` всегда выводятся без изменения URL.

Вне зависимости от того, менялся URL или нет, библиотека позволяет закрывать модальные и всплывающие окна по нажатию на кнопку возврата в браузере или на устройстве.

Переход вперёд по истории возможен, только если модальное окно было показано со сменой URL.

## Отображение модальных окон

При использовании компонентов библиотеки [VKUI](https://dev.vk.ru/ru/libraries/vkui) модальные страницы и карточки выводятся внутри компонента [`ModalRoot`](https://vkui.io/components/modal-root). Посмотрите пример ниже.

```ts
const App = () => {
  const routeNavigator = useRouteNavigator();
  const { modal: activeModal } = useActiveVkuiLocation();
  const modals = (
    <ModalRoot
      activeModal={activeModal}
      onClose={() => routeNavigator.hideModal()}>
      <ModalСard id='persik_modal'>...</ModalCard> // Карточка
      <ModalPage id='user_modal'>...</ModalPage> // Модальное окно
    </ModalRoot>
  );
```

```
  // Подключение модального окна
  return <SplitLayout modal={modals}>...</SplitLayout>;
};
```

Модальные окна нужно подключить в приложении с помощью свойства `modal` компонента

[`SplitLayout`](https://vkui.io/components/split-layout). Это показано в конце примера выше.

## Открытие модальных окон

Открытие модального окна может проходить с изменением текущего URL приложения или без него.

Отдельный URL для модального окна необходим, когда вам надо поделиться ссылкой на страницу, содержащую модальное окно, например показать карточку товара поверх каталога.

Пример модального окна, которое не требует отдельного URL, — предупреждение или сообщение, которое ваше приложение выводит поверх текущей страницы.

### C изменением URL

Если открытие модального окна должно приводить к изменению URL, то при настройке маршрутов вам необходимо:

1. Указать маршрут, включающий модальное окно. Для этого используйте свойство `modal` в параметрах маршрута.

2. Указать модальное окно внутри компонента [`ModalRoot`](https://vkui.io/components/modal-root) [.](https://vkui.io/components/modal-root)

```ts
// Добавление модального окна в маршрут
const routes: RouteWithRoot[] = [
  {
    path: `/user-card`,
    modal: 'user_modal', // Указание на модальное окно
    panel: 'home_panel',
    view: 'default_view',
    root: 'default_root',
  }
]
```

```
// Добавление модального окна в ModalRoot
<ModalRoot
  activeModal={activeModal}
  onClose={() => routeNavigator.hideModal()}>
  <ModalPage id='user_modal'>...</ModalPage>
</ModalRoot>
```

Чтобы показать модальное окно на экране, [перейдите по его URL с помощью](https://dev.vk.ru/ru/libraries/router/navigation)

[`RouteNavigator.push(url)`](https://dev.vk.ru/ru/libraries/router/navigation) [.](https://dev.vk.ru/ru/libraries/router/navigation)

### Без изменения URL

Если отображение модального окна не требует изменения URL, то вам не надо регистрировать такое окно в списке маршрутов. Достаточно указать его в компоненте [`ModalRoot`](https://vkui.io/components/modal-root) [.](https://vkui.io/components/modal-root)

```ts
// Добавление модального окна в ModalRoot
<ModalRoot
  activeModal={activeModal}
  onClose={() => routeNavigator.hideModal()}>
  <ModalPage id='modal_id'>...</ModalPage>
</ModalRoot>
```

Для отображения окна не нужно [использовать методы навигации](https://dev.vk.ru/ru/libraries/router/navigation) внутри приложения. Вместо этого вызовите метод [`RouteNavigator.showModal('modal_id')`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/showModal), в котором укажите идентификатор

окна.

## Закрытие модальных окон

Для закрытия модального окно используйте метод [`RouteNavigator.hideModal()`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/hideModal). Вызовите его, например, в обработчике события `onClose` каждого модального окна или компонента

[`ModalRoot`](https://vkui.io/components/modal-root) (посмотрите на пример выше).

Метод можно использовать для модальных окон, которые открывались как с изменением истории перехода, так и без изменения истории.

## Открытие компонентов `Popout`

Компоненты `Popout`, такие как [`Snackbar`](https://vkui.io/components/snackbar) [,](https://vkui.io/components/snackbar) [`ActionSheet`](https://vkui.io/components/action-sheet) или [`Alert`](https://vkui.io/components/alert), обычно информируют о временных состояниях, уведомляют о произошедшем событии или запрашивают у пользователя подтверждение. Для их отображения не нужно менять текущий URL приложения.

Для отображения компонента `Popout`:

1. Укажите его в поле `popout` компонента [`SplitLayout`](https://vkui.io/components/split-layout). Можно обернуть в `SplitLayout` всё приложение или каждую страницу, на которой есть модальное окно или компонент `Popout`.

2. Передайте JSX-элемент вашего компонента `Popout` в метод [`RouteNavigator.showPopout(renderedJSXElement)`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/showPopout) [.](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/showPopout)

Для получения компонента `Popout`, открытого через роутер, используйте функцию [`usePopout()`](https://dev.vk.ru/ru/libraries/router/reference/hooks/usePopout) [.](https://dev.vk.ru/ru/libraries/router/reference/hooks/usePopout)

Закрыть `Popout` программно можно, вызвав метод [`RouteNavigator.hidePopout()`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/hidePopout) [.](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/hidePopout)

Пример ниже демонстрирует работу с `Popout`, а также с объектами, методами и функциями, предоставляемыми библиотекой vk-mini-apps-router.

```ts
App.tsx:
import { SplitLayout, SplitCol } from '@vkontakte/vkui';
import { usePopout } from '@vkontakte/vk-mini-apps-router';
```

```
function App() {
  // Получение Popout-компонента
  const routerPopout = usePopout();
  return (
    // Указываем Popout-компонент, который будет использоваться
    <SplitLayout popout={routerPopout}>
      <SplitCol>/* Разные Root, View, Panel */</SplitCol>
    </SplitLayout>
  );
}
```

```
Persik.tsx:
import { Button, Alert } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
export const Persik = () => {
  const routeNavigator = useRouteNavigator();
  const popup =
    // Формируем Popout-компонент
    <Alert
      actions={[
        {
          title: 'Забрать',
          autoClose: true,
          mode: 'destructive',
          // Задержать открытие другой страницы с помощью setTimeout, чтобы
завершилась анимация закрытия Alert
          action: () => setTimeout(() => routeNavigator.push('/persik/sad', {
keepSearchParams: true }), 100),
        },
      ]}
      // Скрываем Popout
      onClose={() => routeNavigator.hidePopout()}
      header="Еда Персика"
      text="Забрать у Персика еду?"
    />;
```

```
  return (
    // Вызываем метод showPopout()
    <Button onClick={() => routeNavigator.showPopout(popup)}>Открыть
Popout</Button>
  );
};
```

#### Особенности использования

- Методы `showPopout(...)` и `hidePopout()` не приводят непосредственно к показу или скрытию всплывающего элемента. Они меняют внутренний указатель библиотеки vk-mini-apps- router на такой компонент.

Чтобы отображение всплывающих окон работало правильно, необходимо получить указатель на всплывающий элемент с помощью функции `usePopout(...)` и передать его в компоненты библиотеки VKUI, которые отвечают за отображение.
- Нажатие на кнопку «Назад» в браузере или на мобильном устройстве приводит к закрытию Popout-компонента, который был открыт методами библиотеки vk-mini-apps-router.
- При открытии всплывающего окна роутер добавляет в историю переходов запись об открытии этого окна. Если всплывающее окно открывается поверх другого всплывающего окна, то роутер заменит запись в истории, а не добавит новую.

## Материалы по теме

- [Настройка маршрутов](https://dev.vk.ru/ru/libraries/router/setting-routes)

- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [RouteNavigator.showModal](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/showModal)
- [RouteNavigator.hideModal](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/hideModal)
- [RouteNavigator.showPopout](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/showPopout)
- [usePopout](https://dev.vk.ru/ru/libraries/router/reference/hoooks/usePopout)
- [RouteNavigator.hidePopout](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/hidePopout)
- [Библиотека vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router)
