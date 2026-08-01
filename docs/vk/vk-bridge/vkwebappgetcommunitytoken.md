# VKWebAppGetCommunityToken

**Раздел:** VK Bridge → VKWebAppGetCommunityToken  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppGetCommunityToken` показывает окно с запросом прав доступа у пользователя и получает ключ доступа для работы с API от имени сообщества. Получить ключ доступа сообщества может только его администратор.

Совет. Чтобы получить список идентификаторов администрируемых сообществ, вызовите метод [`groups.get`](https://dev.vk.ru/ru/method/groups.get) с параметром `filter=admin`. Для работы с этим методом необходим [ключ доступа пользователя](https://dev.vk.ru/ru/bridge/VKWebAppGetAuthToken) с правами `scope=groups`.

## Пример

```js
bridge.send("VKWebAppGetCommunityToken", {
   app_id: 6909581,
   group_id: 166562603,
   scope: 'messages'
   })
  .then((data) => {
    if (data.access_token) {
      // Ключ доступа сообщества получен
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
| `app_id` обязательное | `integer` | Идентификатор мини-приложения. |
| `group_id` обязательное | `integer` | Идентификатор сообщества. |
| `scope` обязательное | `string` | Список [прав доступа](https://dev.vk.ru/ru/api/privacy#%D0%9F%D1%80%D0%B0%D0%B2%D0%B0%20%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0), перечисленных через запятую. Возможные значения: - `stories` — доступ к историям. - `photos` — доступ к фотографиям. - `app_widget` — доступ к [виджетам сообществ](https://dev.vk.ru/ru/api/community-apps-widgets/getting-started). - `messages` — доступ к сообщениям сообщества. - `docs` — доступ к документам. - `manage` — доступ к администрированию сообщества. |

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppGetCommunityTokenResult` и

`VKWebAppGetCommunityTokenFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

Возможные ошибки:

- `This action cannot be performed in the background`, если мини-приложение запущено в фоновом режиме.

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

| Поле | Тип | Описание |
|---|---|---|
| `access_token` | `string` | Ключ доступа сообщества. |

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppGetCommunityTokenResult`

Сигнализирует, что ключ доступа сообщества получен. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppGetCommunityTokenResult",
    data: {
      access_token:
"cc9521551d93ddb290b32648a37a006d87438a67f953dd37e564eb6db1ec28f79d05c16e207f0
0a0"
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppGetCommunityTokenFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Песочница

[VKWebAppGetCommunityToken](https://vk.cc/bZfqzK)

## Материалы по теме

- [Ключ доступа сообщества](https://dev.vk.ru/ru/api/access-token/getting-started#%D0%9A%D0%BB%D1%8E%D1%87%20%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0%20%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%B0)
- [`VKWebAppGetAuthToken`](https://dev.vk.ru/ru/bridge/VKWebAppGetAuthToken)
