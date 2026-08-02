# useBlocker

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Hooks → useBlocker  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Функция позволяет предотвратить случайный выход пользователя с текущего экрана.

## Пример

```ts
function ImportantForm() {
  let [value, setValue] = React.useState("");
```

```
// Блокирует переход на другой экран, если данные были введены
let blocker = useBlocker(
  ({ currentLocation, nextLocation }) =>
    value !== "" &&
    currentLocation.pathname !== nextLocation.pathname
);
```

```
return (
  <Form method="post">
    <label>
      Введите данные:
      <input
        name="data"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
    <button type="submit">Сохранить</button>
```

```
      {blocker.state === "blocked" ? (
        <div>
          <p>Вы уверены, что хотите покинуть страницу?</p>
          <button onClick={() => blocker.proceed()}>
            Покинуть
          </button>
          <button onClick={() => blocker.reset()}>
            Остаться
          </button>
        </div>
      ) : null}
    </Form>
  );
}
```

## Объявление

```ts
useBlocker(onLeave: BlockerFunction): Blocker;
```

## Параметры

| Параметр | Тип | Описание |
|---|---|---|
| `onLeave` обязательный | [`BlockerFunction`](https://dev.vk.ru/ru/libraries/router/blocking-navigation) | Функция, которую роутер будет вызывать каждый раз при попытке ухода с текущего экрана, чтобы проверить, не приведёт ли это к потере данных. Подробнее о параметрах этой функции и значении, которое она возвращает, — в разделе [Блокировка навигации](https://dev.vk.ru/ru/libraries/router/blocking-navigation). |

## Результат

`useBlocker` возвращает объект-блокировщик типа `Blocker`, у которого есть два метода и два поля:

**Метод | Тип | Описание**

`proceed()` `function` В состоянии `blocked` можно вызвать `blocker.proceed()`, чтобы дать пользователю уйти с экрана.

`reset()` `function` В состоянии `blocked` можно вызвать `blocker.reset()`, чтобы вернуть блокировщик обратно в `unblocked` и оставить пользователя на текущем экране.

**Поле | Тип | Описание**

`state` `string` Текущее состояние блокировщика:
- `unblocked` — блокировщик бездействует и не препятствует навигации.
- `blocked` — блокировщик предотвращает переход.
- `proceeding` — блокировщик разрешает переход.

`location` `string` Когда блокировщик находится в состоянии `blocked`, он указывает на экран, переход к которому был заблокирован. В состоянии `proceeding` — на экран, к которому осуществится переход после вызова

`blocker.proceed()`.

## Материалы по теме

- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
- [Блокировка навигации](https://dev.vk.ru/ru/libraries/router/blocking-navigation)
- [RouteNavigator.block](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/block)
