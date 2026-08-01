# VKWebAppStorageSet

**Раздел:** VK Bridge → VKWebAppStorageSet  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppStorageSet` задаёт значение переменной, название которой передано в метод, и помещает её в хранилище VK Storage. Пары «ключ — значение» могут храниться бессрочно и не привязаны к устройству или браузеру пользователя.

- Чтобы получить переменные и их значения, используйте события [`VKWebAppStorageGet`](https://dev.vk.ru/ru/bridge/VKWebAppStorageGet) и

[`VKWebAppStorageGetKeys`](https://dev.vk.ru/ru/bridge/VKWebAppStorageGetKeys) [.](https://dev.vk.ru/ru/bridge/VKWebAppStorageGetKeys)
- Чтобы удалить переменную из хранилища, передайте пустое значение при вызове метода

`VKWebAppStorageSet`.

## Ограничения

Для сохранения быстродействия приложения введено ограничение: можно создать не более 1 000 переменных и совершить не более 1 000 вызовов в час на каждого пользователя.

## Преимущества использования

- Переменные хранятся бессрочно.
- Разработчику не нужно писать дополнительный код в серверной части игры или мини- приложения, чтобы хранить небольшие порции данных между сессиями.
- В отличие от [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API), переменные привязаны к идентификатору пользователя `user_id`, а не к устройству и браузеру.
- Не теряются данные при обновлении хостинга статики.

При использовании хостинга статики URL приложения будет динамическим и домен будет изменяться после каждого развёртывания. Значения в [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) привязаны к домену, на котором находился пользователь. Поэтому мы не рекомендуем использовать localStorage для долгосрочного хранения данных.

- [Хостинг статики для мини-приложений](https://dev.vk.ru/ru/mini-apps/development/hosting/overview)
- [Хостинг статики для игр](https://dev.vk.ru/ru/games/development/hosting/overview)

## Пример

```js
bridge.send('VKWebAppStorageSet', {
   key: 'example',
   value: 'example_value'
  })
  .then((data) => {
    if (data.result) {
      // Значение переменной задано
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
| Одноклассники | Android |

## Параметры

| Поле | Тип | Описание |
|---|---|---|
| `key` обязательное | `string` | Название переменной. Допустимые символы названия переменной: |

`[a-zA-Z_\-0-9]`. Максимальная длина названия переменной: 100 символов.

| `value` необязательное | `string` Значение переменной. Сохраняются только первые 4096 символов, для сериализованной строки — 2236 символов. |
|---|---|
| Чтобы удалить переменную, не передавайте параметр или передайте | пустую строку. |

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppStorageSetResult` и `VKWebAppStorageSetFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

| Поле | Тип | Описание |
|---|---|---|
| `result` | `boolean` | `true`, если значение переменной задано. |

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий

VK Bridge.

### События

`VKWebAppStorageSetResult`

Сигнализирует, что значение переменной задано. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppStorageSetResult",
    data: {
      result: true
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppStorageSetFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

При превышении лимитов будут переданы следующие ошибки:

- Превышен лимит на количество сохранённых переменных в час — `"103: Out of limits: you` `can store only 5000 global keys and 1000 keys for a user"`.
- Превышен лимит на количество запросов в час — `"9: Flood control: too many requests` `in one hour"`.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Песочница

[VKWebAppStorageSet](https://vk.cc/bZfuKd)

## Материалы по теме

- [Хостинг статики для мини-приложений](https://dev.vk.ru/ru/mini-apps/development/hosting/overview)
- [Хостинг статики для игр](https://dev.vk.ru/ru/games/development/hosting/overview)
- [Событие VKWebAppStorageGet](https://dev.vk.ru/ru/bridge/VKWebAppStorageGet)
- [Событие VKWebAppStorageGetKeys](https://dev.vk.ru/ru/bridge/VKWebAppStorageGetKeys)
