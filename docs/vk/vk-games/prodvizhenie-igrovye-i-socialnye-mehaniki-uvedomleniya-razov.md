# Разовые

**Раздел:** VK Games → Продвижение → Игровые и социальные механики → Уведомления → Разовые  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Разовые уведомления

Разовые уведомления отправляются пользователю при возникновении какого-либо события в игре. Например, в начале кампании или конкурса среди игроков, выдаче бонусов, достижении цели. Такие уведомления ещё называют ситуативными.

Для отправки разовых уведомлений используется API ВКонтакте. Подробнее об отправке уведомлений в Одноклассниках — в [документации API OK](https://apiok.ru/dev/methods/rest/notifications/).

## Ограничения

## • Уведомления можно использовать в игре только после того, как она прошла модерацию и была [опубликована в каталоге](https://dev.vk.ru/ru/games/catalog/moderation). Неопубликованные игры могут отсылать уведомления только своим администраторам. • Пользователю можно отправить 1 уведомление в час и не более 3 уведомлений в день. • Одному пользователю нельзя отправить подряд 2 уведомления с одинаковым текстом. • Для создания уведомлений [состояние игры](https://dev.vk.ru/ru/games/settings/general/placement#%D0%A1%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BB%D1%8F%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D0%B5%D0%B9) должно быть Включено.

## Разрешение уведомлений

По умолчанию игра может отправлять уведомления пользователям. Если пользователь запретил отправку уведомлений, можно запросить её заново с помощью события VK Bridge.

### Запрос разрешения

Чтобы запросить разрешение пользователя на отправку уведомлений от игры, вызовите событие

[`VKWebAppAllowNotifications`](https://dev.vk.ru/ru/bridge/VKWebAppAllowNotifications) [.](https://dev.vk.ru/ru/bridge/VKWebAppAllowNotifications)

Информация о статусе подключения уведомлений также передаётся при запуске игры в [параметре](https://dev.vk.ru/ru/games/development/parameters) [запуска](https://dev.vk.ru/ru/games/development/parameters) `vk_are_notifications_enabled`. Используйте этот параметр, чтобы определить, нужно ли запрашивать разрешение у пользователя.

У пользователя должны быть включены уведомления от игр и приложений в настройках ВКонтакте. В противном случае пользователь не получит уведомления, даже если у игры есть разрешение на отправку уведомлений.

### Проверка разрешения

Пользователь может управлять уведомлениями из настроек ВКонтакте, поэтому важно проверять возможность отправки, даже если он не отключал или не включал уведомления напрямую из вашей игры. Для этого используйте метод [`apps.isNotificationsAllowed`](https://dev.vk.ru/ru/method/apps.isNotificationsAllowed) с [сервисным ключом](https://dev.vk.ru/ru/games/settings/development/keys#%D0%A1%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BB%D1%8E%D1%87) [доступа](https://dev.vk.ru/ru/games/settings/development/keys#%D0%A1%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BB%D1%8E%D1%87) игры.

Важно! Метод с [сервисным ключом доступа](https://dev.vk.ru/ru/games/settings/development/keys#%D0%A1%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BB%D1%8E%D1%87) можно вызывать только на сервере.

Пример вызова метода [`apps.isNotificationsAllowed`](https://dev.vk.ru/ru/method/apps.isNotificationsAllowed) с помощью POST-запроса.

```bash
curl -X POST 'https://api.vk.ru/method/apps.isNotificationsAllowed' \
  -H 'Authorization: Bearer <КЛЮЧ_ДОСТУПА>' \
  -F 'user_id=<ИДЕНТИФИКАТОР_ПОЛЬЗОВАТЕЛЯ>' \
  -F 'apps_id=<ИДЕНТИФИКАТОР_МИНИ_ПРИЛОЖЕНИЯ>' \
  -F 'v=<ВЕРСИЯ_API>'
```

## Как отправить уведомление

Чтобы отправить разовое уведомление, в серверной части игры выполните API-запрос

[`secure.sendNotification`](https://dev.vk.ru/ru/method/secure.sendNotification). Для отправки запроса используйте [сервисный ключ доступа](https://dev.vk.ru/ru/games/settings/development/keys#%D0%A1%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BB%D1%8E%D1%87) из настроек игры.

Важно! Метод использует [сервисный ключ доступа](https://dev.vk.ru/ru/games/settings/development/keys#%D0%A1%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BB%D1%8E%D1%87) и может быть [вызван](https://dev.vk.ru/ru/api/api-requests#%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80) только на сервере.

[Параметры запроса](https://dev.vk.ru/ru/method/secure.sendNotification) включают текст сообщения и идентификаторы одного или нескольких пользователей, которым уведомление будет отправлено.

С помощью параметра запуска [`vk_ref`](https://dev.vk.ru/ru/games/development/parameters/vk_ref) вы можете отслеживать, откуда была запущена игра и определять конверсию и эффективность уведомлений.

## Материалы по теме

- [Игровые и социальные механики](https://dev.vk.ru/ru/games/promotion/game-mechanics/overview)
- [Личные сообщения от игры](https://dev.vk.ru/ru/games/promotion/game-mechanics/messages)
- [Уведомления неактивным пользователям](https://dev.vk.ru/ru/games/promotion/game-mechanics/notifications/automatic)
- [Уведомления всем пользователям](https://dev.vk.ru/ru/games/promotion/game-mechanics/notifications/mass)
- [Лента активности друзей](https://dev.vk.ru/ru/games/promotion/game-mechanics/feed)
