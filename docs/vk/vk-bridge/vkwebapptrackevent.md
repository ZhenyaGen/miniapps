# VKWebAppTrackEvent

**Раздел:** VK Bridge → VKWebAppTrackEvent  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppTrackEvent` отправляет данные из мини-приложения или игры в [VK Рекламу](https://ads.vk.com). Чтобы данные отправлялись в систему аналитики [MyTracker](https://tracker.my.com/), она должна быть подключена отдельно.

Обратите внимание! Трекинг приложений в системе MyTracker находится в стадии бета- тестирования и доступен только активным клиентам, которые уже используют MyTracker для аналитики приложений на других платформах. Подробнее о подключении MyTracker — в [документации](https://docs.tracker.my.com/ru/tracking/platforms/vk-mini-apps).

## Пример

```js
bridge.send('VKWebAppTrackEvent', {
    event_name: 'game_event',
    custom_user_id: '743784479',
    event_params: {
      level: 5,
      mode: 123
    }
  })
  .then((data) => {
    if (data.result) {
      // Данные отправлены
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
| `event_name` обязательное | `string` | Название события. Событие — это заранее определённое в коде действие, например покупка через приложение или авторизация пользователя в игре. - [События в VK Рекламе](https://ads.vk.com/help/general/network/vkwebapptrackevent) - [События в MyTracker](https://docs.tracker.my.com/ru/tracking/platforms/vk-mini-apps/#events) |
| `custom_user_id` необязательное | `string` | Идентификатор пользователя мини-приложения или игры, например [ID профиля ВКонтакте](https://vk.com/faq18062). |
| `event_params` необязательное | `object` | Параметры события `event_name`. |

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppTrackEventResult` и `VKWebAppTrackEventFailed`.

Подробнее о проверке результатов при вызовах VK Bridge — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

| Поле | Тип | Описание |
|---|---|---|
| `result` | `boolean` | `true`, если данные были отправлены в MyTracker. |

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppTrackEventResult`

Сигнализирует, что данные отправлены в MyTracker. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppTrackEventResult",
    data: {
      result: true
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppTrackEventFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).
