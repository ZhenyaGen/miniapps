# VKWebAppDenyNotifications

**Раздел:** VK Bridge → VKWebAppDenyNotifications  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Важно! Событие станет доступно пользователям после того, как ваше приложение пройдёт модерацию.

- [Модерация мини-приложений](https://dev.vk.ru/ru/mini-apps/settings/moderation)
- [Модерация игр](https://dev.vk.ru/ru/games/settings/moderation)

`VKWebAppDenyNotifications` отключает уведомления от мини-приложения или игры.

- [Уведомления в мини-приложениях](https://dev.vk.ru/ru/mini-apps/promotion/social-mechanics/notifications/overview)
- [Уведомления в играх](https://dev.vk.ru/ru/games/promotion/game-mechanics/notifications/overview)

## Пример

```js
bridge.send('VKWebAppDenyNotifications')
  .then((data) => {
    if (data.result) {
      // Уведомления от мини-приложения или игры отключены
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

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`;
- С помощью событий `VKWebAppDenyNotificationsResult` и

`VKWebAppDenyNotificationsFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

| Поле | Тип | Описание |
|---|---|---|
| `result` | `boolean` | `true`, если уведомления отключены от мини-приложения или игры. |

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppDenyNotificationsResult`

Сигнализирует, что уведомления отключены от мини-приложения или игры. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppDenyNotificationsResult",
    data: {
      result: true
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppDenyNotificationsFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Песочница

[VKWebAppDenyNotifications](https://vk.cc/bZft1F)

## Материалы по теме

- [Уведомления в мини-приложениях](https://dev.vk.ru/ru/mini-apps/promotion/social-mechanics/notifications/overview)
- [Уведомления в играх](https://dev.vk.ru/ru/games/promotion/game-mechanics/notifications/overview)
- [VKWebAppAllowNotifications](https://dev.vk.ru/ru/bridge/VKWebAppAllowNotifications)
