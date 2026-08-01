# VKWebAppCallJoin

**Раздел:** VK Bridge → VKWebAppCallJoin  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppCallJoin` используется при [интеграции звонков](https://dev.vk.ru/ru/mini-apps/development/calls-integration) в мини-приложение. Событие подключает пользователя к звонку по ссылке. Перед подключением пользователь видит окно с возможностью присоединиться к звонку.

## Пример

```js
bridge.send('VKWebAppCallJoin', {
  join_link: 'hg0IXLVD7txQyFKMTLt2Zy4P6HmuXxcKGcfF0A8GznU'
  })
  .then((data) => {
    if (data.result) {
      // Пользователь присоединился к звонку
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
| ВКонтакте | Android, iOS, Web |
| Одноклассники | – |

## Параметры

| Поле | Тип | Описание |
|---|---|---|
| `join_link` обязательное | `string` | Ссылка для подключения к звонку. Ссылку на звонок возвращает событие [`VKWebAppCallStart`](https://dev.vk.ru/ru/bridge/VKWebAppCallStart) [.](https://dev.vk.ru/ru/bridge/VKWebAppCallStart) |

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.

- С помощью событий `VKWebAppCallJoinResult` и `VKWebAppCallJoinFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

| Поле | Тип | Описание |
|---|---|---|
| `result` | `boolean` | `true`, если пользователь присоединился к звонку. |

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppCallJoinResult`

Сигнализирует, что метод API выполнен. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppCallJoinResult",
    data: {
      result: true
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppCallJoinFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

- Если пользователь уже находится в звонке, возвращается ошибка c кодом `13:Сustom error`.
- Если пользователь не предоставил необходимые доступы ВКонтакте, возвращается код ошибки

`11 Access denied`.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Материалы по теме

- [Интеграция звонков](https://dev.vk.ru/ru/mini-apps/development/calls-integration)
- [VKWebAppCallStart](https://dev.vk.ru/ru/bridge/VKWebAppCallStart)
