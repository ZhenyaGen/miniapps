# VKWebAppCallAPIMethod

**Раздел:** VK Bridge → VKWebAppCallAPIMethod  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

С помощью `VKWebAppCallAPIMethod` вы можете отправлять запросы к [API ВКонтакте](https://dev.vk.ru/ru/reference) и [API](https://apiok.ru/ext/) [Одноклассников](https://apiok.ru/ext/) из клиентской части вашего приложения.

Важно! Не вызывайте с помощью этого события методы с [сервисным ключом доступа](https://dev.vk.ru/ru/api/access-token/getting-started#%D0%A1%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BB%D1%8E%D1%87%20%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0). Этот ключ используется для отправки API-запросов с сервера приложения. Передавать и хранить его в клиентской части приложения небезопасно.

## Пример

```js
bridge.send('VKWebAppCallAPIMethod', {
  method: 'users.get',
  params: {
    user_ids: '743784474,743784479',
    v: '5.199',
    access_token: 'ключ_доступа_пользователя'
  }})
  .then((data) => {
    if (data.response) {
      // Метод API выполнен
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
| `method` обязательное | `string` | Имя вызываемого [метода API](https://dev.vk.ru/ru/method). |
| `params` обязательное | `object` | Параметры метода API. Возможные поля: - `access_token` ( `string`) — ключ доступа пользователя с соответствующими правами, полученный с помощью события |

[`VKWebAppGetAuthToken`](https://dev.vk.ru/ru/bridge/VKWebAppGetAuthToken) [.](https://dev.vk.ru/ru/bridge/VKWebAppGetAuthToken)
- `v` ( `string`) — версия API, используемая для запроса (последняя доступная версия: `5.199`).
- другие обязательные параметры метода API.

`use_local` `boolean` Определяет, к API какой площадки отправляется запрос. Возможные значения:
- `true` — к API площадки, которая использует SDK, например [API](https://apiok.ru/ext/) [Одноклассников](https://apiok.ru/ext/).
- `false` — к [API Вконтакте](https://dev.vk.ru/ru/reference). Значение по умолчанию.

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppCallAPIMethodResult` и `VKWebAppCallAPIMethodFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

| Поле | Тип | Описание |
|---|---|---|
| `response` | `array[object]` | Результат выполнения метода API. Описание структуры объекта |

`response` можно найти на странице соответствующего метода.

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppCallAPIMethodResult`

Сигнализирует, что метод API выполнен. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppCallAPIMethodResult",
    data: {
      response: [
        {
          id: 743784474,
          first_name: "Персик",
          last_name: "Рыжий",
          can_access_closed: true,
          is_closed: false
        },
        {
          id: 743784479,
          first_name: "Сеня",
          last_name: "Хомяк",
          can_access_closed: true,
          is_closed: false
        }
      ]
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppCallAPIMethodFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Песочница

[VKWebAppCallAPIMethod](https://vk.cc/bZfnNu)

## Материалы по теме

- [API-вызовы в мини-приложениях](https://dev.vk.ru/ru/mini-apps/development/api-calls)
- [API-вызовы в играх](https://dev.vk.ru/ru/games/development/api-calls)
