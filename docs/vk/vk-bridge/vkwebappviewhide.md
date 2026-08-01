# VKWebAppViewHide

**Раздел:** VK Bridge → VKWebAppViewHide  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Мобильное приложение ВКонтакте для Android или iOS отправляет `VKWebAppViewHide`, когда пользователь сворачивает мини-приложение или игру или переходит в другое приложение на мобильном устройстве.

## Пример

#### Как подписаться на событие

```js
bridge.subscribe((e) => {
  if (e.detail.type === 'VKWebAppViewHide') {
    // Действия при переключении
    // из игры или мини-приложения
  }
});
```

#### Как обработать событие

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

Пример обработки также можно найти в разделе [Обработка событий сворачивания и](https://dev.vk.ru/ru/games/how-to/handle-minimize-and-restore-events) [восстановления экрана игры](https://dev.vk.ru/ru/games/how-to/handle-minimize-and-restore-events).

## Совместимость

| Площадки | Платформы |
|---|---|
| ВКонтакте | Android, iOS |
| Одноклассники | – |

## Параметры

—

## Результат

`VKWebAppViewHide` сигнализирует, что игра или мини-приложение стало невидимо пользователю: он переключился в другое приложение или вернулся на главный экран. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppViewHide",
    data: { }
  }
}
```

## Примечание

Событие `VKWebAppViewHide` является сигналом того, что мини-приложение или игра переходят в фоновый режим. В этом режиме платформа не обрабатывает вызовы событий VK Bridge, а также не отправляет события мини-приложению или игре. Подробнее — в разделе [Работа VK Bridge в](https://dev.vk.ru/ru/bridge/background-mode) [фоновом режиме](https://dev.vk.ru/ru/bridge/background-mode).

## Материалы по теме

- [Работа VK Bridge в фоновом режиме](https://dev.vk.ru/ru/bridge/background-mode)
- [Обработка событий сворачивания и восстановления экрана игры](https://dev.vk.ru/ru/games/how-to/handle-minimize-and-restore-events)
- [Работа кеша мини-приложений](https://dev.vk.ru/ru/mini-apps/development/cache)
- [Работа кеша игр](https://dev.vk.ru/ru/games/development/cache)
- [VKWebAppViewRestore](https://dev.vk.ru/ru/bridge/VKWebAppViewRestore)
