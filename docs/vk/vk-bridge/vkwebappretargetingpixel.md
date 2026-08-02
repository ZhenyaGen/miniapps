# VKWebAppRetargetingPixel

**Раздел:** VK Bridge → VKWebAppRetargetingPixel  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppRetargetingPixel` добавляет пользователя в аудиторию ретаргетинга. Параметры соответствуют параметрам `event` и `audience` при подключении пикселя в [мобильном](https://dev.vk.ru/ru/mini-apps/development/pixel/pixel-placement#%D0%9F%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D0%B9%20%D0%B2%20%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C%D0%BD%D0%BE%D0%BC%20%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B8) [приложении](https://dev.vk.ru/ru/mini-apps/development/pixel/pixel-placement#%D0%9F%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D0%B9%20%D0%B2%20%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C%D0%BD%D0%BE%D0%BC%20%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B8).

## Пример

```js
bridge.send('VKWebAppRetargetingPixel', {
  pixel_code: 'VK-RTRG-447253-dUuM',
  event: 'click-to-button'
  })
  .then((data) => {
    if (data.result) {
      // Пользователь добавлен в аудиторию ретаргетинга
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
| ВКонтакте | Android (с версии клиента 6.1), iOS, Mobile Web, Web |
| Одноклассники | Android, iOS, Mobile Web, Web |

## Параметры

| Поле | Тип | Описание |
|---|---|---|
| `pixel_code` обязательное | `string` | Код пикселя. Например: `VK-RTRG-447253-dUuM`. Код пикселя можно найти в [рекламном кабинете](https://vk.com/ads?act=retargeting&show=pixels). |
| `event` необязательное | `string` | Идентификатор события, пользовательское правило пикселя. См. [возможные значения](https://dev.vk.ru/ru/bridge/VKWebAppConversionHit#%D0%92%D0%BE%D0%B7%D0%BC%D0%BE%D0%B6%D0%BD%D1%8B%D0%B5%20%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%BA%D0%BE%D0%BD%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D1%85%20%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D0%B9). |

| Поле | Тип | Описание |
|---|---|---|
| `target_group_id` необязательное | `integer` | Идентификатор группы ретаргетинга, в которую нужно добавить пользователя. |
| `price_list_id` необязательное | `integer` | Идентификатор прайс-листа. Используется для динамического ретаргетинга продуктов. |
| `products_event` необязательное | `string` | Тип продуктового события. Используется для динамического ретаргетинга продуктов. |
| `products_params` необязательное | `string` | Параметры товара. Используется для динамического ретаргетинга продуктов. |
| Примечание. При создании пикселя в рекламном кабинете можно указывать только | идентификатор мини-приложения (поле Разрешённый Mini App id). Указывать домен или | поддомен не обязательно. |

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppRetargetingPixelResult` и

`VKWebAppRetargetingPixelFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

| Поле | Тип | Описание |
|---|---|---|
| `result` | `boolean` | `true`, пользователь добавлен в аудиторию ретаргетинга. |

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppRetargetingPixelResult`

Сигнализирует, что пользователь добавлен в аудиторию ретаргетинга. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppRetargetingPixelResult",
    data: {
      result: true
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppRetargetingPixelFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Примеры соответствия для Open API

Если вы использовали Opеn API ( `openapi.js`), ваш код на JavaScript по-прежнему будет работать. Но в будущем мы прекратим поддержку Opеn API, поэтому рекомендуем использовать события VK Bridge так, как показано ниже.

VK.Retargeting.Event

#### Open API

```js
VK.Retargeting.Event('purchase');
```

#### VK Bridge

```js
bridge.send('VKWebAppRetargetingPixel', {
  pixel_code: 'VK-Boo-427253-dUuM',
  event: 'purchase'
});
```

VK.Retargeting.Hit

#### Open API

```js
VK.Retargeting.Hit();
```

#### VK Bridge

```js
bridge.send('VKWebAppRetargetingPixel', {
  pixel_code: 'VK-Boo-427253-dUuM'
});
```

VK.Retargeting.Add

#### Open API

```js
VK.Retargeting.Add(8839163);
```

#### VK Bridge

```js
bridge.send('VKWebAppRetargetingPixel', {
  pixel_code: 'VK-Boo-427253-dUuM',
  target_group_id: 8839163
});
```

VK.Retargeting.ProductEvent

#### Open API

```js
VK.Retargeting.ProductEvent(12345 /* PRICE_LIST_ID */, 'view_product', {
  'total_price': 34899
});
```

#### VK Bridge

```js
bridge.send('VKWebAppRetargetingPixel', {
  pixel_code: 'VK-Boo-427253-dUuM',
  price_list_id: 12345,
  products_event: 'view_product',
  products_params: {
    total_price: 34899
  }
});
```
