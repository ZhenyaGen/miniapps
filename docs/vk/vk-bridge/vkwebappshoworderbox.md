# VKWebAppShowOrderBox

**Раздел:** VK Bridge → VKWebAppShowOrderBox  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppShowOrderBox` открывает окно покупки виртуальной ценности в мини-приложении или игре.

Примечание. Чтобы протестировать платежи, добавьте тестировщиков в разделе Платежи панели управления. На счету каждого тестировщика должен быть как минимум 1 голос. При оплате голоса не будут списаны со счетов тестировщиков.

- [Платежи в панели управления играми](https://dev.vk.ru/ru/games/settings/payments/setting-up)
- [Платежи в панели управления мини-приложениями](https://dev.vk.ru/ru/mini-apps/settings/payments/setting-up)
- [Платежи виртуальной валютой](https://dev.vk.ru/ru/api/payments/overview)

## Пример

```js
bridge.send('VKWebAppShowOrderBox', {
  type: 'item',
  item: 'item_id_123456'
  })
  .then((data) => {
    if (data.success) {
      // Списание голосов прошло успешно
  }})
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
```

## Совместимость

| Площадки | Платформы |
|---|---|
| ВКонтакте | Android, Mobile Web, Web |
| Одноклассники | Android, iOS, Mobile Web, Web |

## Параметры

| Поле | Тип | Описание |
|---|---|---|
| `type` обязательное | `string` | Тип виртуальной ценности. Всегда имеет значение `item`. |
| `item` обязательное | `string` | Название виртуальной ценности. Будет передано в уведомлении на получение информации о виртуальной ценности. Длина строки: 64 символа. |

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppShowOrderBoxResult` и `VKWebAppShowOrderBoxFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

Возможные ошибки:

- `This action cannot be performed in the background`, если мини-приложение или игра запущены в фоновом режиме.

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

| Поле | Тип | Описание |
|---|---|---|
| `success` | `boolean` | Возвращает значение `true`, если списание прошло успешно. |

`order_id` `string` Идентификатор заказа в [cистеме платежей](https://dev.vk.ru/ru/api/payments/notifications/order-status-change). Возвращается, если `status` = `true`.

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppShowOrderBoxResult`

Сигнализирует, что списание голосов прошло успешно. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppShowOrderBoxResult",
    data: {
      success: true,
      order_id: "235379722919"
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppShowOrderBoxFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Песочница игр

[VKWebAppShowOrderBox](https://vk.cc/bZfCRH)

## Материалы по теме

- [Мини-приложения — Панель управления | Платежи](https://dev.vk.ru/ru/mini-apps/settings/payments/setting-up)
- [Игры — Панель управления | Платежи](https://dev.vk.ru/ru/games/settings/payments/setting-up)
- [Продажа игровых товаров](https://dev.vk.ru/ru/games/monetization/digital-goods)
- [Продажа товаров в мини-приложениях](https://dev.vk.ru/ru/mini-apps/monetization/payments)
- [Платежи виртуальной валютой](https://dev.vk.ru/ru/api/payments/overview)
