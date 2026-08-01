# Урок 4. Модальные окна

**Раздел:** Мини-приложения → Образовательные материалы → Видеокурс → Модуль 4. Разработка → Урок 4. Модальные окна  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

#### Модуль: [4. Разработка](https://dev.vk.ru/ru/mini-apps/learning/course/4-development)

## Урок 4. Модальные окна

## Главное в уроке

- Модальные окна блокируют доступ к другим экранам приложения до тех пор, пока они открыты. Всплывающие окна похожи на модальные, но используются для отображения информации другого характера.
- Для создания модального окна:

- Используйте компонент `ModalRoot` библиотеки VKUI. В нём определите один или несколько компонентов `ModalPage`, каждый из которых соответствует одному модальному окну.

```ts
export const AppModalRoot = () => {
  ...
  return (
    <ModalRoot activeModal={activeModal} onClose={onClose}>
      <ModalPage id={EModal.DISH} onClose={onClose}>
        <DishModal onClose={onClose} />
      </ModalPage>
    </ModalRoot>
  );
};
```

Вместо `ModalPage` можно использовать `ModalCard`.
- Передайте созданный компонент в `SplitLayout`:

```ts
export const App = () => {
  <SplitLayout modal={<AppModalRoot />}>
    // ...
```

[← Предыдущий урок](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/3-navigation) [Следующий урок →](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/5-bridge)

```
  </SplitLayout>
}
```

- Для модального окна можно определить маршрут. В этом случае оно будет показываться при переходе по этому маршруту. Модальное окно можно показать и без определения маршрута. Используйте для этого метод [`RouteNavigator.showModal(...)`](https://dev.vk.com/libraries/router/reference/objects/RouteNavigator/showModal). Чтобы скрыть модальное окно, вызовите [`RouteNavigator.hideModal()`](https://dev.vk.com/libraries/router/reference/objects/RouteNavigator/hideModal) [.](https://dev.vk.com/libraries/router/reference/objects/RouteNavigator/hideModal)
- Для создания всплывающих окон используйте компоненты `Alert`, `ActionSheet`,

`ScreenSpinner` или `PopoutWrapper` библиотеки VKUI.

```ts
const OrderCancelPopout = ({ handleBackButton }: Props) => {
  ...
  return (
    <Alert header="Прервать оформление заказа?" text="Данные будут утеряны"
/>
  );
};
```

Используйте хук [`usePopout()`](https://dev.vk.com/libraries/router/reference/hooks/usePopout), чтобы получить установленный popout, и передайте его в

`SplitLayout`:

```ts
function App() {
  const routerPopout = usePopout();
  ...
  return (
    <SplitLayout popout={routerPopout} ...>...</SplitLayout>
  );
};
```

- Чтобы показать всплывающее окно, вызовите [`RouteNavigator.showPopout(...)`](https://dev.vk.com/libraries/router/reference/objects/RouteNavigator/showPopout). Чтобы скрыть модальное окно, вызовите [`RouteNavigator.hidePopout()`](https://dev.vk.com/libraries/router/reference/objects/RouteNavigator/hidePopout). Всплывающее окно также скрывается при нажатии кнопки «Назад» в браузере или на мобильном устройстве.

## Полезные ссылки

- [Клиентская часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-frontend), cмотрите фрагменты кода по #M4L4.
- [Серверная часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-backend)
- [Мини-приложение «Блюдо дня»](https://vk.com/app51773283)

- [Поддержка модальных и всплывающих окон](https://dev.vk.com/libraries/router/modal-windows)
- [Документация библиотеки vk-mini-apps-router](https://dev.vk.com/libraries/router)
