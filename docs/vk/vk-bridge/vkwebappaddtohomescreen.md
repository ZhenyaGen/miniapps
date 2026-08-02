# VKWebAppAddToHomeScreen

**Раздел:** VK Bridge → VKWebAppAddToHomeScreen  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppAddToHomeScreen` показывает окно с предложением добавить ярлык мини-приложения или игры на экран устройства. Чтобы убедиться, что ярлык ещё не был добавлен, вызовите событие

[`VKWebAppAddToHomeScreenInfo`](https://dev.vk.ru/ru/bridge/VKWebAppAddToHomeScreenInfo) [.](https://dev.vk.ru/ru/bridge/VKWebAppAddToHomeScreenInfo)

## Пример

```js
bridge.send('VKWebAppAddToHomeScreen')
  .then((data) => {
    if (data.result) {
      // Ярлык мини-приложения или игры добавлен на экран устройства
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
```

## Совместимость

| Площадки | Платформы |
|---|---|
| ВКонтакте | Android |
| Одноклассники | – |

## Параметры

—

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppAddToHomeScreenResult` и

`VKWebAppAddToHomeScreenFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

Возможные ошибки:

- `This action cannot be performed in the background`, если мини-приложение или игра запущены в фоновом режиме.
- `User denied`, если пользователь запретил доступ.

### Объект Promise

Если вызов к платформе прошёл успешно, управление будет передано в `then` -обработчик объекта

`Promise`. В качестве ответа платформа возвращает объект со следующим полем:

**Поле | Тип | Описание**

`result` `boolean` `true`, если ярлык мини-приложения или игры добавлен на главный экран устройства.

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppAddToHomeScreenResult`

Сигнализирует, что ярлык мини-приложения или игры добавлен на главный экран устройства. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppAddToHomeScreenResult",
    data: {
      result: true
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppAddToHomeScreenFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Смотри раздел [Обработка событий-результатов](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Материалы по теме

- [Добавление игры на главный экран Android-устройства](https://dev.vk.ru/ru/games/promotion/game-mechanics/add-to-home-screen)
- [VKWebAppAddToHomeScreenInfo](https://dev.vk.ru/ru/bridge/VKWebAppAddToHomeScreenInfo)
