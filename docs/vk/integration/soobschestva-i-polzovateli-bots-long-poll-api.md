# Bots Long Poll API

**Раздел:** Интеграция → Сообщества и пользователи → Bots Long Poll API  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Bots Long Poll API позволяет работать с событиями из вашего сообщества в режиме реального времени. В отличие от [Callback API](https://dev.vk.ru/ru/api/callback/getting-started), очередь из событий хранится на стороне ВКонтакте — мы не будем присылать отдельное уведомление для каждого события. В противоположность [User Long](https://dev.vk.ru/ru/api/user-long-poll/getting-started) [Poll](https://dev.vk.ru/ru/api/user-long-poll/getting-started), Bots Long Poll API работает с событиями сообщества, а не пользователя.

Чтобы использовать Bots Long Poll API:

1. Откройте vk.com и перейдите в сообщество, в котором вы являетесь администратором.

2. В меню справа выберите Управление и затем Дополнительно → Работа с API.

3. Откройте вкладку Long Poll API и выберите Включено.

## Подключение

Перед подключением к Long Poll серверу необходимо получить данные сессии ( `server`, `key`, `ts`) методом [`groups.getLongPollServer`](https://dev.vk.ru/ru/method/groups.getLongPollServer) [.](https://dev.vk.ru/ru/method/groups.getLongPollServer)

Затем составьте запрос такого вида:

```
{$server}?act=a_check&key={$key}&ts={$ts}&wait=25
```

В нём используются следующие параметры:

- `key` — секретный ключ сессии;
- `server` — адрес сервера;
- `ts` — номер последнего события, начиная с которого нужно получать данные;
- `wait` — время ожидания (так как некоторые прокси-серверы обрывают соединение после 30 секунд, мы рекомендуем указывать  `wait` = `25`). Максимальное значение — `90`.

Для первого запроса в рамках сессии значения для параметров `server`, `key` и `ts` необходимо получить методом [`groups.getLongPollServer`](https://dev.vk.ru/ru/method/groups.getLongPollServer). В последующих запросах используйте те же

`server` и `key` и новое значение `ts`, которое придет вам в ответе от Long Poll сервера.

В сообществе в разделе Управление → Дополнительно → Работа с API → Bots Long Poll API → Типы событий отметьте те события, которые вы хотите отслеживать. Полный список событий вы найдёте [на этой странице](https://dev.vk.ru/ru/api/community-events/json-schema).

### Настройка через API

Вы можете управлять настройками Bots Long Poll API в вашем сообществе не только в веб- интерфейсе, но и с помощью методов API:

- [`groups.getLongPollServer`](https://dev.vk.ru/ru/method/groups.getLongPollServer) — получает адрес для подключения к Long Poll серверу ВКонтакте;
- [`groups.getLongPollSettings`](https://dev.vk.ru/ru/method/groups.getLongPollSettings) — получает настройки событий Bots Long Poll API;
- [`groups.setLongPollSettings`](https://dev.vk.ru/ru/method/groups.setLongPollSettings) — устанавливает настройки событий Bots Long Poll API.

## Формат данных

Когда произойдет новое событие или истечет время ожидания, сервер вернет Вам ответ в формате JSON:

```json
{
  "ts": "4",
  "updates": [
    {
      "type": "wall_post_new",
      "event_id": "c68dfb983247fea8ac98ea0ea59717df71d8064f",
      "v": "5.199",
      "object": {
        "id": 28,
        "from_id": -123456,
        "owner_id": -123456,
        "date": 1519631591,
        "marked_as_ads": 0,
        "post_type": "post",
        "text": "Post text",
        "can_edit": 1,
        "created_by": 564321,
        "can_delete": 1,
        "comments": {
          "count": 0
        }
      },
      "group_id": 123456
    }
  ]
}
```

JSON-объект в ответе содержит два поля:

- `ts` ( `string`) — номер последнего события. Используйте его в следующем запросе.
- `updates` ( `array`) — массив, элементы которого содержат представление новых событий.

После получения любого ответа для продолжения связи нужно отправить запрос с новым `ts`, полученным в последнем ответе.

### Типы событий

Событие в массиве `updates` представляет собой JSON, имеющий следующую структуру:

```json
{
  "type": <тип события>,
  "event_id": <идентификатор события>,
  "v": <версия API, для которой сформировано событие>,
  "object": <объект, инициировавший событие>,
  "group_id": <ID сообщества, в котором произошло событие>
}
```

Например:

```json
{
  "type": "group_join",
  "event_id": "c68dfb983247fea8ac98ea0ea59717df71d8064f",
  "v": "5.199",
  "object": {
    "user_id": 1,
    "join_type": "approved"
  },
  "group_id": 1
}
```

Структура событий в Bots Long Poll API идентична событиям в Callback API. Полный список событий вы найдёте [на этой странице](https://dev.vk.ru/ru/api/community-events/json-schema).

### Ошибки

В ответ на запрос сервер может вернуть одну из ошибок:

```json
{
  "failed": 1,
  "ts": 30
}
```

```json
{
  "failed": 2
}
```

```json
{
  "failed": 3
}
```

- `"failed":1` — история событий устарела или была частично утеряна, приложение может получать события далее, используя новое значение `ts` из ответа.
- `"failed":2` — истекло время действия ключа, нужно заново получить `key` методом [`groups.getLongPollServer`](https://dev.vk.ru/ru/method/groups.getLongPollServer) [.](https://dev.vk.ru/ru/method/groups.getLongPollServer)
- `"failed":3` — информация утрачена, нужно запросить новые `key` и `ts` методом [`groups.getLongPollServer`](https://dev.vk.ru/ru/method/groups.getLongPollServer) [.](https://dev.vk.ru/ru/method/groups.getLongPollServer)

Обратите внимание: объекты в сообщении об ошибке могут содержать поля, не описанные в документации. Их необходимо игнорировать и не обрабатывать.

## Поддержка в SDK

Вы можете работать с Bots Long Poll API средствами наших SDK:

- [Java SDK,](https://dev.vk.ru/ru/sdk/java)
- [PHP SDK](https://dev.vk.ru/ru/sdk/php),
- [Node.js SDK](https://github.com/Naltox/node-vk-sdk) (неофициальный).
