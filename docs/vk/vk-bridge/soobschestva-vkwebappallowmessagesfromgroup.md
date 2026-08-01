# VKWebAppAllowMessagesFromGroup

**Раздел:** VK Bridge → Сообщества → VKWebAppAllowMessagesFromGroup  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Важно! Событие станет доступно пользователям после того, как ваше приложение пройдёт модерацию.

- [Модерация мини-приложений](https://dev.vk.ru/ru/mini-apps/settings/moderation)
- [Модерация игр](https://dev.vk.ru/ru/games/settings/moderation)

`VKWebAppAllowMessagesFromGroup` показывает окно с запросом прав доступа на отправку сообщений от имени сообщества.

## Пример

```js
bridge.send('VKWebAppAllowMessagesFromGroup', {
  group_id: 166562603,
  key: 'dBuBKe1kFcdemzB'
  })
  .then((data) => {
    if (data.result) {
      // Пользователь разрешил отправку сообщений от имени сообщества
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
| ВКонтакте | Android, iOS, Mobile Web, Web |
| Одноклассники | Android, iOS, Mobile Web, Web |

## Параметры

| Поле | Тип | Описание |
|---|---|---|
| `group_id` обязательное | `integer` | Идентификатор сообщества. |
| `key` необязательное | `string` | Произвольная строка. Этот параметр можно использовать для идентификации пользователя. |

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppAllowMessagesFromGroupResult` и

`VKWebAppAllowMessagesFromGroupFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

Возможные ошибки:

- `User denied`, если пользователь запретил отправку сообщений от имени сообщества.

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

**Поле | Тип | Описание**

`result` `boolean` `true`, если пользователь разрешил отправку сообщений от имени сообщества.

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppAllowMessagesFromGroupResult`

Сигнализирует, что пользователь разрешил отправку сообщений от имени сообщества. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppAllowMessagesFromGroupResult",
    data: {
      result: true
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppAllowMessagesFromGroupFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Песочница

[VKWebAppAllowMessagesFromGroup](https://vk.cc/bZfqcr)

## Материалы по теме

- [Игровые и социальные механики — Личные сообщения от игры](https://dev.vk.ru/ru/games/promotion/game-mechanics/messages)
