# Как сделать платёж

**Раздел:** VK Pay → Платёжное окно → Для разработчиков → Как сделать платёж  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Как совершить платёж

В разделе описано подключение платёжного окна VK Pay и проведение платежей в мини- приложениях.

Чтобы отобразить платёжное окно, используйте события [библиотеки VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9A%D0%B0%D0%BA%20%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20%D0%B1%D0%B8%D0%B1%D0%BB%D0%B8%D0%BE%D1%82%D0%B5%D0%BA%D1%83%20VK%20Bridge). VK Bridge позволяет мини-приложениям взаимодействовать с API ВКонтакте и API операционной системы, установленной на устройстве пользователя.

Перед вызовом платёжного окна подключите VK Bridge и прочитайте об использовании библиотеки и вызове событий в документации [VK Bridge – Первые шаги](https://dev.vk.ru/ru/bridge/getting-started#%D0%9A%D0%B0%D0%BA%20%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20%D0%B1%D0%B8%D0%B1%D0%BB%D0%B8%D0%BE%D1%82%D0%B5%D0%BA%D1%83%20VK%20Bridge).

## Шаг 1. Инициализируйте своё приложение

Чтобы работать с ВКонтакте через VK Bridge, инициализируйте своё приложение: [отправьте событие](https://dev.vk.ru/ru/bridge/VKWebAppInit)

[`VKWebAppInit`](https://dev.vk.ru/ru/bridge/VKWebAppInit) с помощью [метода](https://dev.vk.ru/ru/bridge/getting-started#bridge.send) [`bridge.send`](https://dev.vk.ru/ru/bridge/getting-started#bridge.send) приложению ВКонтакте.

## Шаг 2. Проверьте результат инициализации

Для обработки результата используйте объект `Promise`, который возвращается вызовом

`bridge.send(...)`, или события `VKWebAppInitResult` и `VKWebAppInitFailed`. Подробнее — в [документации](https://dev.vk.ru/ru/bridge/VKWebAppInit#%D0%A0%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82) [`VKWebAppInit`](https://dev.vk.ru/ru/bridge/VKWebAppInit#%D0%A0%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82) [.](https://dev.vk.ru/ru/bridge/VKWebAppInit#%D0%A0%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82)

В случае успешной инициализации приложение ВКонтакте вернёт [объект](https://dev.vk.ru/ru/bridge/VKWebAppInit#%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20Promise) [`Promise`](https://dev.vk.ru/ru/bridge/VKWebAppInit#%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20Promise) или [событие](https://dev.vk.ru/ru/bridge/VKWebAppInit#VKWebAppInitResult)

[`VKWebAppInitResult`](https://dev.vk.ru/ru/bridge/VKWebAppInit#VKWebAppInitResult) с полем `result: true`.

При ошибке инициализации, приложение ВКонтакте вернёт [объект](https://dev.vk.ru/ru/bridge/VKWebAppInit#%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20Promise) [`Promise`](https://dev.vk.ru/ru/bridge/VKWebAppInit#%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20Promise) или [событие](https://dev.vk.ru/ru/bridge/VKWebAppInit#VKWebAppInitResult)

[`VKWebAppInitResult`](https://dev.vk.ru/ru/bridge/VKWebAppInit#VKWebAppInitResult) с информацией [об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA).

## Шаг 3. Отправьте запрос на отображение платёжного окна VK Pay

Чтобы отобразить платёжное окно VK Pay, [отправьте событие](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm) [`VKWebAppOpenPayForm`](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm) с помощью [метода](https://dev.vk.ru/ru/bridge/getting-started#bridge.send) [`bridge.send`](https://dev.vk.ru/ru/bridge/getting-started#bridge.send) приложению ВКонтакте. В событии передайте обязательные [параметры](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm#%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B):

- `app_id` — идентификатор мини-приложения.
- `action` — тип перевода. Всегда `pay-to-service` — перевод в пользу юридического лица.
- `params` — поля платёжной формы VK Pay — зависят от типа перевода `action`. Подробнее — в разделе Параметры платежа.

Важно! Если пользователи получают кешбэк за покупки в вашем магазине, размер и срок зачисления кешбэка нужно передать в момент вызова платёжной формы в объекте

`params.data.cashback`. Вам необходимо рассчитать сумму кешбэка до того, как пользователь совершит платёж.

Пример запроса для открытия платёжного окна с `action: 'pay-to-service'`

```js
bridge.send('VKWebAppOpenPayForm', {
    app_id: 6909581,
    action: 'pay-to-service',
    params: {
      user_id: 743784474,
      description: `Test Payment`
    }})
  .then((data) => {
    if (data.status) {
      // Экран VK Pay показан
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
```

В случае успешного вызова платёжного окна ВКонтакте добавляет к запросу информацию о типе платежа и подпись приложения и отправляет запрос VK Pay. VK Pay проверяет данные кошелька, авторизацию пользователя, подпись приложения и продавца, формирует ссылку на платёжное окно, подписывает ссылку и отображает платёжное окно пользователю по ссылке в iframe.

Если при вызове платёжного окна что-то пойдёт не так, в консоли браузера отобразится [ошибка](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/errors).

## Шаг 4. Проверьте результат вызова платёжного окна

Для обработки результата используйте объект `Promise`, который возвращается вызовом

`bridge.send(...)`, или события `VKWebAppInitResult` и `VKWebAppInitFailed`. Подробнее — в [документации](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm#%D0%A0%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82) [`VKWebAppOpenPayForm`](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm#%D0%A0%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82) [.](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm#%D0%A0%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82)

Приложение ВКонтакте вернёт [объект](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm#%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20Promise) [`Promise`](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm#%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20Promise) или [событие](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm#%D0%A1%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F) [`VKWebAppInitResult`](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm#%D0%A1%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F) со следующими данными:

- `status: true` — информация о результате платежа ( `true` — платёж успешный, `false` — платёж неуспешный). Если пользователь закрыл платёжную форму, не оплачивая покупку, то `status` будет равен `false`.
- `transaction_id` — идентификатор транзакции.
- `amount` — сумма платежа.
- `extra` — дополнительные данные продавца. Содержит данные объекта `params.data`.

При ошибке оплаты приложение ВКонтакте вернёт [объект](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm#%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20Promise) [`Promise`](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm#%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20Promise) или [событие](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm#%D0%A1%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F)

[`VKWebAppInitResult`](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm#%D0%A1%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F) с информацией [об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA).

## Шаг 5. Получите платёжное уведомление о результате оплаты

Если оплата прошла успешна и у вас [подключены уведомления](https://dev.vk.ru/ru/pay/seller/notifications), VK Pay пришлёт информацию о результате транзакции на ваш URL.

[Проверьте подпись уведомления](https://dev.vk.ru/ru/pay/seller/notifications#%D0%A8%D0%B0%D0%B3%202.%20%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D1%8C%D1%82%D0%B5%20%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D1%8C%20%D1%83%D0%B2%D0%B5%D0%B4%D0%BE%D0%BC%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F) с помощью публичного ключа платёжной системы, который вы получили при подключении. Расшифруйте данные уведомления, обработайте и [отправьте API](https://dev.vk.ru/ru/pay/seller/notifications#%D0%A8%D0%B0%D0%B3%204.%20%D0%9E%D1%82%D0%BF%D1%80%D0%B0%D0%B2%D1%8C%D1%82%D0%B5%20%D0%BE%D1%82%D0%B2%D0%B5%D1%82%20%D0%BD%D0%B0%20%D1%83%D0%B2%D0%B5%D0%B4%D0%BE%D0%BC%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5) [системы ответ](https://dev.vk.ru/ru/pay/seller/notifications#%D0%A8%D0%B0%D0%B3%204.%20%D0%9E%D1%82%D0%BF%D1%80%D0%B0%D0%B2%D1%8C%D1%82%D0%B5%20%D0%BE%D1%82%D0%B2%D0%B5%D1%82%20%D0%BD%D0%B0%20%D1%83%D0%B2%D0%B5%D0%B4%D0%BE%D0%BC%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5) с результатом обработки.

Со стороны клиента мини-приложение пришлёт в ваше сообщество ВКонтакте сообщение от лица пользователя, оплатившего покупку. Подробнее — в разделе [Отслеживание статуса платежа](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/payment-status).

Важно! События, которые приходят от мини-приложения и VK Bridge, не гарантируют успешную оплату. Решение о предоставлении товара или услуги нужно принимать только на основании [платёжного уведомления](https://dev.vk.ru/ru/pay/seller/notifications), которое VK Pay пришлёт на ваш URL.

## Параметры платежа

Параметры платежа VK Pay зависят от [типа платежа](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm#%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B) [`action`](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm#%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B). Пример генерации параметров на JavaScript можно найти [здесь](https://gist.github.com/mrsndmn/cd6be6ef477ba16d47c339f3f8a375c6).

### Объект params

| Поле | Тип | Описание |
|---|---|---|
| `amount` необязательное | `integer` / `number` / `string` | Сумма платежа в формате `00.00`. Минимальная сумма — 1 ₽. Поле может быть передано как целое число, число с плавающей точкой (не более двух знаков после запятой, среди них незначащие нули недопустимы) или строка (не более двух знаков после запятой, незначащие нули допустимы). Поле обязательное при фиксированных платежах в пользу юридического лица: значение поля |

`action` — `pay-to-service`. Поле `amount` участвует в формировании

`merchant_data` для [подписи продавца](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/merchant-sign-calculation).

| `description` обязательное | `string` Описание платежа для пользователя — текст, который будет показан в платёжном окне. Формат: строка в кодировке UTF-8, до 50 символов. |
|---|---|
| `action` обязательное | `string` Тип перевода. Всегда `pay-to-service` — перевод в пользу юридического лица. |
| `merchant_id` обязательное | `integer` Ваш идентификатор продавца в платёжной системе VK Pay, который был выдан при подключении к VK Pay вместе с приватным ключом продавца. |
| `version` обязательное | `integer` Версия платёжной системы. Актуальная версия: `2`. |
| `sign` обязательное | `string` Подпись мини-приложения ВКонтакте, которое вызывает платёжное окно. Подробности — в разделе [Как сформировать](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/app-sign-calculation) [подпись приложения](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/app-sign-calculation). |

| Поле | Тип | Описание |
|---|---|---|
| `data` обязательное | `object` | Служебные данные платежа. В этом JSON-объекте вы передаёте обязательные поля для валидации оплаты платёжной системой, и можете передать любое количество произвольных полей, которые хотите видеть в платёжном уведомлении. Описание полей — в разделе Объект `data`. |
| `user_id` необязательное | `integer` | Идентификатор пользователя. Обязателен при платежах пользователю: значение поля `action` всегда `pay-to-service`. |

Пример объекта `params`

```json
{
    "amount": 1.5,
    "data": {
        "currency": "RUB",
        "merchant_data":
"eyJvcmRlcl9pZCI6IjI1NTMxIiwidHMiOiIxNTM5MzI5NzcwIiwiYW1vdW50IjoxLjUsImN1cnJlb
mN5IjoiUlVCIn0=",
        "merchant_sign": "63d5dce9d2c9d29198ba12ba3f8e270e6606a221",
        "order_id": "25531",
        "ts": "1539329770"
     },
    "description": "Test Payment",
    "action": "pay-to-service",
    "merchant_id": 617001,
    "version": 2,
    "sign": "818964335a550e39d9a1dd0d752e60ab"
}
```

### Объект data

`data` — это JSON-объект с набором полей для валидации платежа (например, номер заказа и подпись продавца), а также любыми произвольными полями, которые могут быть нужны продавцу для обработки заказа (например, данными о способе доставки). Остальные поля — в разделе Объект `params`. Содержимое `data` возвращается в [платёжном уведомлении](https://dev.vk.ru/ru/pay/seller/notifications) в поле

`merchant_params`.

Важно! Названия полей внутри `data` должны быть отсортированы по алфавиту.

| Поле | Тип | Описание |
|---|---|---|
| `order_id` обязательное | `integer` / `string` | Идентификатор заказа в вашей системе. Для каждого платёжного окна должен быть уникальным. Повторный запрос с уже обработанным `order_id` будет проигнорирован. Поле `order_id` участвует в формировании |

`merchant_data` для [подписи продавца](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/merchant-sign-calculation).

| `ts` обязательное | `number` Временная отметка формирования запроса. Формат: число, [Unix Timestamp](https://www.unixtimestamp.com/). Время `ts` должно быть меньше времени отправки запроса на отображения платёжного окна, но не более чем на час. Поле `ts` участвует в формировании `merchant_data` для [подписи продавца](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/merchant-sign-calculation). |
|---|---|
| `currency` обязательное | `string` Валюта платежа по [ISO 4217](https://normativ.kontur.ru/document?moduleId=1&documentId=456276). Сейчас поддерживается только `RUB`. Поле `currency` участвует в формировании |
| `merchant_data` | для [подписи продавца](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/merchant-sign-calculation). |
| `merchant_data` обязательное | `string` BASE64-строка для формирования [подписи продавца](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/merchant-sign-calculation). Формируется из JSON-объекта, который включает в себя поля платёжного окна: `amount`, `cashback`, `currency`, |
| `order_id` и `ts`. Других полей в JSON-объекте быть не | должно. |
| `merchant_sign` обязательное | `string` SHA1-подпись продавца. |
| `cashback` необязательное | `object` Данные о кешбэке. Если кешбэка нет, передавать данные не нужно. Описание полей — в разделе Объект `cashback`. Поле `cashback` участвует в формировании |
| `merchant_data` | для [подписи продавца](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/merchant-sign-calculation). |

### Объект cashback

Объект `cashback` содержит данные о кешбэке. Если кешбэка нет, передавать объект не нужно.

Если пользователи получают кешбэк за покупки в вашем магазине, данные о сумме и времени начисления передаются из мини-приложения вместе с другими параметрами платёжного окна и участвуют в [формировании подписи продавца](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/merchant-sign-calculation) [`merchant_sign`](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/merchant-sign-calculation). Распоряжение на списание указанной суммы кешбэка в указанное время формируется в момент транзакции и не может быть изменено за исключением случаев отмены покупки (возврата средств пользователю).

Объект `cashback` входит в объект `params.data`. Остальные поля — в разделе Объект `params`.

| Поле | Тип | Описание |
|---|---|---|
| `pay_time` необязательное | `integer` | Время зачисления кешбэка в [Unix Timestamp](https://www.unixtimestamp.com/). Время должно быть больше или равно времени платежа. |
| `amount_percent` необязательное | `integer` | Размер кешбэка в процентах от суммы платежа, если не передано значение `cashback.amount`. Максимальное значение: `5`. |
| `amount` необязательное | `number` | Размер кешбэка в валюте платежа, если не передано значение |

`cashback.amount_percent`. Максимальный размер — 5% от суммы платежа.
