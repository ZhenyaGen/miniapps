# VKWebAppStorageGet

**Раздел:** VK Bridge → VKWebAppStorageGet  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppStorageGet` возвращает значения переменных, названия которых переданы в параметре `keys`. Чтобы задать значения переменных, используйте событие

[`VKWebAppStorageSet`](https://dev.vk.ru/ru/bridge/VKWebAppStorageSet) [.](https://dev.vk.ru/ru/bridge/VKWebAppStorageSet)

## Пример

```js
bridge.send('VKWebAppStorageGet', {
  keys: [
    'example1',
    'example2',
    'example3'
  ]})
  .then((data) => {
    if (data.keys) {
      // Значения получены
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
| `keys` обязательное | `array[string]` | Массив названий переменных, значения которых нужно получить. Допустимые символы названия переменной: `[a-zA-` `Z_\-0-9]`. |

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppStorageGetResult` и `VKWebAppStorageGetFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

**Поле | Тип | Описание**

`keys` `array[object]` Информация о переменных и их значениях. Поля объекта массива:
- `key` ( `string`) — название переменной.
- `value` ( `string`) — значение переменной.

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppStorageGetResult`

Сигнализирует, что значения получены. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppStorageGetResult",
    data: {
      keys: [
        {
          key: "example1",
          value: "example_value1"
        },
        {
          key: "example2",
          value: "example_value2"
        },
        {
          key: "example3",
          value: "example_value3"
        }
      ]
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppStorageGetFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Песочница

[VKWebAppStorageGet](https://vk.cc/bZfuwL)
