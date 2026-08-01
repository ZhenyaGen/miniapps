# VKWebAppAllowNotifications

**Раздел:** VK Bridge → VKWebAppAllowNotifications  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Важно! Событие станет доступно пользователям после того, как ваше приложение пройдёт модерацию.

- [Модерация мини-приложений](https://dev.vk.ru/ru/mini-apps/settings/moderation)
- [Модерация игр](https://dev.vk.ru/ru/games/settings/moderation)

`VKWebAppAllowNotifications` показывает окно с запросом разрешения на отправку уведомлений от мини-приложения или игры.

- [Уведомления в мини-приложениях](https://dev.vk.ru/ru/mini-apps/promotion/social-mechanics/notifications/overview)
- [Уведомления в играх](https://dev.vk.ru/ru/games/promotion/game-mechanics/notifications/overview)

Обратите внимание, если пользователь выключил уведомления от игр и мини-приложений в настройках, то он не сможет их получать даже после выдачи разрешения.

## Пример

```js
bridge.send('VKWebAppAllowNotifications')
  .then((data) => {
    if (data.result) {
      // Разрешение на отправку уведомлений мини-приложением или игрой
получено
    } else {
      // Ошибка
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

—

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppAllowNotificationsResult` и

`VKWebAppAllowNotificationsFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

Возможные ошибки:

- `This action cannot be performed in the background`, если мини-приложение или игра запущены в фоновом режиме.
- `User denied`, если пользователь закрыл окно с запросом разрешения на отправку уведомлений от мини-приложения или игры.

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

**Поле | Тип | Описание**

`result` `boolean` `true`, если разрешение на отправку уведомлений мини-приложением или игрой получено.

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppAllowNotificationsResult`

Сигнализирует, что разрешение на отправку уведомлений мини-приложением или игрой получено. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppAllowNotificationsResult",
    data: {
      result: true
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppAllowNotificationsFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Песочница

[VKWebAppAllowNotifications](https://vk.cc/bZfspS)

## Материалы по теме

- [Уведомления в мини-приложениях](https://dev.vk.ru/ru/mini-apps/promotion/social-mechanics/notifications/overview)
- [Уведомления в играх](https://dev.vk.ru/ru/games/promotion/game-mechanics/notifications/overview)
- [VKWebAppDenyNotifications](https://dev.vk.ru/ru/bridge/VKWebAppDenyNotifications)
