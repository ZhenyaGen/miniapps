# VKWebAppCallGetStatus

**Раздел:** VK Bridge → VKWebAppCallGetStatus  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppCallGetStatus` используется при [интеграции звонков](https://dev.vk.ru/ru/mini-apps/development/calls-integration) в мини-приложение. Событие получает информацию о состоянии текущего активного звонка.

## Пример

```js
bridge.send('VKWebAppCallGetStatus')
  .then((data) => {
    if (data.result) {
      // Информация о состоянии активного звонка получена
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

—

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppCallGetStatusResult` и `VKWebAppCallGetStatusFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

**Поле | Тип | Описание**

`is_active` `bool` Состояние звонка. Возможные значения:
- `true` — звонок активен.
- `false` — звонок завершён.

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppCallGetStatusResult`

Сигнализирует, что статус звонка получен. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppCallGetStatusResult",
    "data": {
        "is_active": true,
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppCallGetStatusFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Материалы по теме

- [Интеграция звонков](https://dev.vk.ru/ru/mini-apps/development/calls-integration)
- [VKWebAppCallFinished](https://dev.vk.ru/ru/bridge/VKWebAppCallFinished)
- [VKWebAppCallLeft](https://dev.vk.ru/ru/bridge/VKWebAppCallLeft)
