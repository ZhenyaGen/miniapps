# VKWebAppSendPayload

**Раздел:** VK Bridge → VKWebAppSendPayload  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppSendPayload` отправляет событие [`app_payload`](https://dev.vk.ru/ru/api/community-events/json-schema#%D0%9F%D1%80%D0%BE%D1%87%D0%B5%D0%B5), которое можно получить через [Bots](https://dev.vk.ru/ru/api/bots-long-poll/getting-started) [Longpoll](https://dev.vk.ru/ru/api/bots-long-poll/getting-started) или [Callback API](https://dev.vk.ru/ru/api/callback/getting-started).

Важно! Перед вызовом события разрешите запуск приложения из сообщества. Подробнее — в разделе [Информация (настройки мини-приложений)](https://dev.vk.ru/ru/mini-apps/settings/general/information#%D0%97%D0%B0%D0%BF%D1%83%D1%81%D0%BA%20%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B8%D0%B7%20%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%B0).

## Пример

```js
bridge.send('VKWebAppSendPayload', {
  group_id: 166562603,
  payload: {
    foo: 'bar'
  }})
  .then((data) => {
    if (data.result) {
      // Событие отправлено
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
| Одноклассники | – |

## Параметры

| Поле | Тип | Описание |
|---|---|---|
| `group_id` обязательное | `integer` | Идентификатор сообщества. |

| Поле | Тип | Описание |
|---|---|---|
| `payload` обязательное | `object` | Полезные данные в формате JSON. |

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppSendPayloadResult` и `VKWebAppSendPayloadFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

| Поле | Тип | Описание |
|---|---|---|
| `result` | `boolean` | `true`, если событие отправлено. |

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppSendPayloadResult`

Сигнализирует, что событие отправлено. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppSendPayloadResult",
    data: {
      result: true
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppSendPayloadFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).
