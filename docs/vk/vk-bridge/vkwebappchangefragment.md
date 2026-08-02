# VKWebAppChangeFragment

**Раздел:** VK Bridge → VKWebAppChangeFragment  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Платформа ВКонтакте отправляет мини-приложению или игре событие

`VKWebAppChangeFragment`, чтобы сообщить о смене значения после символа `#` в текущем URL мини-приложения или игры. Это может происходить, когда пользователь меняет адресную строку в браузере, в результате вызова события [`VKWebAppSetLocation`](https://dev.vk.ru/ru/bridge/VKWebAppSetLocation) и в других случаях.

ВКонтакте также отправляет это сообщение на Android и iOS, когда восстанавливает мини- приложение или игру из кеша.

- [Работа кеша мини-приложений](https://dev.vk.ru/ru/mini-apps/development/cache)
- [Работа кеша игр](https://dev.vk.ru/ru/games/development/cache)

## Пример

```js
bridge.subscribe((e) => {
  if (e.detail.type === 'VKWebAppChangeFragment') {
    // Обработка изменений в URL
  }
});
```

## Совместимость

| Площадки | Платформы |
|---|---|
| ВКонтакте | Android, iOS, Mobile Web, Web |
| Одноклассники | – |

## Параметры

—

## Обработка события

Символы после `#` в URL часто используются для навигации и передачи параметров. Используйте сообщение `VKWebAppChangeFragment`, чтобы ваше приложение могло обработать изменения.

При работе на Android и iOS платформа ВКонтакте сохраняет в кеше навигационное состояние последних открытых приложений. При восстановлении приложения из кеша платформа сначала отправит приложению `VKWebAppChangeFragment`, а потом — [`VKWebAppViewRestore`](https://dev.vk.ru/ru/bridge/VKWebAppViewRestore). Это позволяет приложению открыть нужный экран, пока восстановленный из кеша экран ещё не отобразился полностью.

## Результат

`VKWebAppChangeFragment` сигнализирует, что часть URL после символа `#` была изменена. В качестве ответа платформа возвращает объект со следующим полем:

| Поле | Тип | Описание |
|---|---|---|
| `location` | `string` | Строка после символа `#` в URL. Например, если текущий URL приложения |

`vk.com/app6909581#new-value`, то `location` будет содержать `new-` `value`.

В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppChangeFragment",
    data: {
      location: "new-value"
    }
  }
}
```

## Пример обработки события

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Материалы по теме

- [Работа кеша мини-приложений](https://dev.vk.ru/ru/mini-apps/development/cache)
- [Работа кеша игр](https://dev.vk.ru/ru/games/development/cache)
- [VKWebAppSetLocation](https://dev.vk.ru/ru/bridge/VKWebAppSetLocation)
- [VKWebAppViewRestore](https://dev.vk.ru/ru/bridge/VKWebAppViewRestore)
- [Обработка событий-результатов](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0)
