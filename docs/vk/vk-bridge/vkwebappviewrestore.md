# VKWebAppViewRestore

**Раздел:** VK Bridge → VKWebAppViewRestore  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Мобильное приложение ВКонтакте для Android или iOS отправляет `VKWebAppViewRestore`, когда пользователь возвращается в игру или мини-приложение, после того как ранее переключился из него.

## Пример

#### Как подписаться на событие

```js
bridge.subscribe((e) => {
  if (e.detail.type === 'VKWebAppViewRestore') {
    // Действия при восстановлении
    // экрана игры или мини-приложения
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

`VKWebAppViewRestore` сигнализирует, что пользователь вернулся в мини-приложение или игру, после того как ранее перешёл из него в другое приложение. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppViewRestore",
    data: { }
  }
}
```

## Примечания

- Событие `VKWebAppViewRestore` является сигналом того, что мини-приложение или игра переходят в рабочий режим из фонового. Подробнее — в разделе [Работа VK Bridge в фоновом](https://dev.vk.ru/ru/bridge/background-mode) [режиме](https://dev.vk.ru/ru/bridge/background-mode).
- Если мини-приложение или игра находятся в кеше приложений, платформа ВКонтакте вернёт пользователя на экран, который был активен при переходе из приложения.

## Материалы по теме

- [Работа VK Bridge в фоновом режиме](https://dev.vk.ru/ru/bridge/background-mode)
- [Обработка событий сворачивания и восстановления экрана игры](https://dev.vk.ru/ru/games/how-to/handle-minimize-and-restore-events)
- [Работа кеша мини-приложений](https://dev.vk.ru/ru/mini-apps/development/cache)
- [Работа кеша игр](https://dev.vk.ru/ru/games/development/cache)
- [VKWebAppViewHide](https://dev.vk.ru/ru/bridge/VKWebAppViewHide)
- [VKWebAppChangeFragment](https://dev.vk.ru/ru/bridge/VKWebAppChangeFragment)
