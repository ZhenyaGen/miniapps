# VKWebAppStorageGetKeys

**Раздел:** VK Bridge → Секция Storage → VKWebAppStorageGetKeys  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppStorageGetKeys` возвращает названия переменных, сохранённых событием [`VKWebAppStorageSet`](https://dev.vk.ru/ru/bridge/VKWebAppStorageSet) [.](https://dev.vk.ru/ru/bridge/VKWebAppStorageSet)

## Пример

```js
bridge.send('VKWebAppStorageGetKeys', {
  count: 20,
  offset: 0
  })
  .then((data) => {
    if (data.keys) {
      // Названия переменных получены
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
| `count` обязательное | `integer` | Количество переменных, названия которых необходимо получить. |
| `offset` обязательное | `integer` | Смещение для возвращения названий переменных относительно начала списка. |

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppStorageGetKeysResult` и `VKWebAppStorageGetKeysFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

| Поле | Тип | Описание |
|---|---|---|
| `keys` | `array[string]` | Названия переменных. |

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppStorageGetKeysResult`

Сигнализирует, что названия переменных получены. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppStorageGetKeysResult",
    data: {
      keys: [
        "example1",
        "example2",
        "example3"
      ]
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppStorageGetKeysFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Песочница

[VKWebAppStorageGetKeys](https://vk.cc/bZfuSa)
