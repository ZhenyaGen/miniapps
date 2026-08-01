# Блокировка навигации

**Раздел:** Библиотеки → vk-mini-apps-router → Блокировка навигации  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

В некоторых случаях приложению может быть необходимо удержать пользователя на экране. Например, не разрешать пользователю уйти с экрана, если он не сохранил введённые данные, или запрещать выход, если он отправил данные на сервер и пытается покинуть экран до получения ответа об окончании загрузки.

## Как заблокировать переход

Чтобы заблокировать переход, вы можете использовать:

- Метод [`block(...)`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/block) объекта [`RouteNavigator`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator). Вызовите этот метод при активации экрана, переход с которого нужно заблокировать.

```ts
const blockerFunction: BlockerFunction = ({ historyAction, nextLocation }) =>
{
   var result = historyAction === "POP";
   if (! result)
      console.log("Для выхода заполните требуемые поля.");
    return result;
};
```

```
const unblocker = routeNavigator.block(blockerFunction);
```

- Функцию [`useBlocker`](https://dev.vk.ru/ru/libraries/router/reference/hooks/useBlocker), которая позволяет предотвратить случайный выход пользователя с текущего экрана.

```ts
const blockerFunction: BlockerFunction = ({
 currentLocation,
 nextLocation
}) => {
 return currentLocation.pathname !== nextLocation.pathname
}
```

```
function Component() {
 let blocker = useBlocker(blockerFunction);
```

```
 return (
   <button onClick={() => blocker.proceed()}>
     Перейти
   </button>
   <button onClick={() => blocker.reset()}>
     Остаться
   </button>
 );
}
```

## Функция BlockerFunction

Роутер будет вызывать функцию при попытке перехода c экрана. Функция должна проверять условия для выхода и возвращать `false`, если переход возможен, или `true`, если переход заблокирован. При необходимости функция может также информировать пользователя об ошибке и выполнять необходимые действия при блокировке, например переводить фокус на текстовое поле, которое требует ввода данныx.

Функция типа `BlockerFunction` использует следующие параметры:

**Параметр | Тип | Описание**

`historyAction` `string` Вид перехода. Возможно одно из следующих значений:
- `PUSH` — переход на новую страницу и добавление адреса в историю переходов. Это значение передаётся, когда переход выполняется с помощью метода [`RouteNavigator.push(...)`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/push) [.](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/push)
- `REPLACE` — переход на новую страницу с заменой текущего адреса в истории переходов. Это значение передаётся, когда переход выполняется с помощью метода

[`RouteNavigator.replace(...)`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/replace) [.](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/replace)
- `POP` — переход по истории изменений. Это значение передаётся, когда переход выполняется с помощью методов, работающих с историей переходов: [`RouteNavigator.back()`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/back) [,](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/back)

[`RouteNavigator.backToFirst()`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/backToFirst) [,](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/backToFirst) [`RouteNavigator.go(...)`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/go) [,](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/go) а также при попытке перехода с помощью кнопок «Назад» и «Вперёд» в браузере.

`nextLocation` `string` Путь для перехода в том виде, в каком он был [объявлен в](https://dev.vk.ru/ru/libraries/router/setting-routes) [маршруте](https://dev.vk.ru/ru/libraries/router/setting-routes), например `/user/edit/contacts`.

`currentLocation` `string` Текущее положение в навигации.

## Особенности использования

Блокировка работает только внутри приложения. Причём она не зависит от того, выполняется ли переход с помощью методов объекта [`RouteNavigator`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator) или, например, с помощью кнопки Назад.

Переходы на внешние адреса не блокируются.

## Резюме

**Функция | Особенности**

[useBlocker](https://dev.vk.ru/ru/libraries/router/reference/hooks/useBlocker)
- Ставится один раз и уничтожается вместе с компонентом, где он вызван.
- Удобно использовать для подтверждения выхода со страницы.

**Функция | Особенности**

- Может использоваться только в react-компоненте и другом хуке.
- Возвращает объект-блокировщик.

[`RouteNavigator.block`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/block)
- Может использоваться где угодно.
- При использовании в компоненте необходимо оборачивать в

`useEffect`.
- Когда таких функций несколько, навигация не будет работать, если хотя бы одна из функций запрещает переход.
- Возвращает функцию для снятия блокировки.

## Рекомендации

- Не злоупотребляйте блокировкой навигации, используйте её только в исключительных случаях.
- Мы не рекомендуем использовать более одной блокирующей функции на экране.

При использовании нескольких таких функций навигация не будет работать, если хотя бы одна из функций запрещает переход.

## Материалы по теме

- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [RouteNavigator.block](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/block)
- [useBlocker](https://dev.vk.ru/ru/libraries/router/reference/hooks/useBlocker)
- [Библиотека vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router)
