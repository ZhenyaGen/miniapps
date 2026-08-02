# Запрос информации о транзакции

**Раздел:** VK Pay → API платёжной системы → Запрос информации о транзакции  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Как запросить информацию о транзакции

С помощью [API платёжной системы](https://dev.vk.ru/ru/pay/seller/general-description) (далее — API системы) вы можете запросить информацию о транзакции при проведении [платежей](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/payment-create) и [возвратов](https://dev.vk.ru/ru/pay/seller/refunds). Для этого:

1. Отправьте запрос к API системы: сформируйте тело запроса, подпишите его и отправьте `POST` - запрос по URL: `https://api.money.mail.ru/money/2-03/transaction/get`.

2. Получите ответ платёжной системы: проверьте его подпись и обработайте данные.

3. Получите платёжное уведомление с результатами проведения транзакциии и ответьте на него: сформируйте тело ответа с данными об успехе или неуспехе обработки уведомления, подпишите ответ и отправьте его платёжной системе.

## Шаг 1. Отправьте запрос на получение информации о транзакции

1. Сформируйте тело запроса с одним из параметров: идентификатор транзакции `transaction_id`, идентификатор транзакции на вашей стороне `issuer_id` или идентификатор транзакции на стороне платёжной системы `txn_id`.

2. [Подпишите запрос](https://dev.vk.ru/ru/pay/seller/request-create/request-sign-creating). При конкатенации на шаге 3 используйте относительный URL запроса: `/money/2-03/transaction/get`.

3. Отправьте `POST` -запрос к API системы по URL: `https://api.money.mail.ru/money/2-` `03/transaction/get`.

### Параметры запроса

В запросе нужно обязательно передать хотя бы один из параметров: `transaction_id`,

`issuer_id`, `txn_id`.

**Параметр | Тип | Описание**

`transaction_id` `string` Идентификатор транзакции (платежа или возврата). Формат: UUID по [RFC 4122](https://datatracker.ietf.org/doc/html/rfc4122).

`issuer_id` `string` Идентификатор транзакции на вашей стороне.

`txn_id` `string` Идентификатор транзакции на стороне платёжной системы.

### Пример body для запроса информации о транзакции

```json
{
  "transaction_id": "8678B2BC-4E57-11EF-9F49-267810E93B89"
}
```

### Пример запроса

#### Командная строка

#### Командная строка

```
$ curl -X POST -d 'version=2-
03&data=eyJib2R5Ijp7InRyYW5zYWN0aW9uX2lkIjoiODY3OEIyQkMtNEU1Ny0xMUVGLTlGNDktMj
Y3ODEwRTkzQjg5In0sImhlYWRlciI6eyJ0cyI6MTcyMjMzMzU1OSwiY2xpZW50X2lkIjozMTAyMDh9
fQ%3D%3D&signature=76e29db9b1e1d43d863aec826bebc422f4166e0d'
https://api.money.mail.ru/money/2-03/transaction/get
```

## Шаг 2. Получите ответ платёжной системы на запрос информации о транзакции

[Проверьте подпись ответа](https://dev.vk.ru/ru/pay/seller/response/sign) и обработайте данные.

При успешной обработке запроса платёжная система вернёт [тело ответа](https://dev.vk.ru/ru/pay/seller/response#%D0%A1%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0%20%D0%B7%D0%B0%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BA%D0%B0%20header%20%D0%BF%D1%80%D0%B8%20%D1%83%D1%81%D0%BF%D0%B5%D1%88%D0%BD%D0%BE%D0%B9%20%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B5%20%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D0%B0).

При [ошибке обработки запроса](https://dev.vk.ru/ru/pay/seller/response#%D0%A1%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0%20%D0%B7%D0%B0%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BA%D0%B0%20header%20%D0%BF%D1%80%D0%B8%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BA%D0%B5%20%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8%20%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D0%B0) платёжная система вернёт заголовок в формате JSON с описанием и кодом ошибки.

### Пример body ответа на запрос информации о транзакции

```json
{
    "amount": "7.00",
    "currency": "RUB",
    "transaction_id": "8678B2BC-4E57-11EF-9F49-267810E93B88",
    "issuer_id": "8419575_vk_id",
    "txn_id": "",
    "user_info": {
      "beneficiary_id": "746905200",
      "buyer_ip": "123.12.123.123",
      "user_id": "220005200",
      "user_verified": true
    },
    "keep_uniq": "1",
    "pay_method": "vkp_card",
    "pay_method_info": {
        "payer_id": "214905200",
        "skin": "VK_WALLET",
        "recipient": {
          "client_id": "3103408"
        },
        "sender": {
          "currency": "rub",
          "amount": "7.00"
        }
      },
    "gate_response": {
        "txn_id": ""
    },
    "description": "Оплата ВКонтакте",
    "merchant_param": {
        "currency": "RUB",
        "amount": "7.00"
    },
    "social_auth": {
        "vk": "119605200"
    }
}
```

### Поля объекта body ответа на запрос информации о транзакции

| Поле | Тип | Описание |
|---|---|---|
| `transaction_id` | `string` | Идентификатор транзакции. Формат: UUID по [RFC 4122](https://datatracker.ietf.org/doc/html/rfc4122). |

`notify_type` `string` Тип уведомления. Содержит значение: `transaction_status`.

`added` `string` Дата и время создания транзакции в формате [Unix Timestamp](https://www.unixtimestamp.com/). Отсчитывается по московскому времени (GMT+3).

`user_info` `object` Информация о пользователе. Подробнее — в описании объекта

`user_info`.

`issuer_id` `string` Идентификатор заказа на вашей стороне.

`txn_id` `string` Идентификатор заказа на стороне платёжной системы.

`keep_uniq` `boolean` Служебное поле.

`amount` `number` Сумма платежа. Принимает положительное значение при поступлении средств и отрицательное — при списании. Пример:  `-21.05`

`currency` `string` Валюта платежа по [ISO 4217](https://normativ.kontur.ru/document?moduleId=1&documentId=456276).

`payee_amount` `number` Сумма зачисления средств, включая комиссию. Пример:  `-21.05`

`payee_fee_amount` `number` Сумма комиссии получателя платежа. Пример:  `-21.05`

`payer_amount` `number` Сумма списания средств, включая комиссию. Пример:  `-21.05`

`payer_fee_amount` `number` Сумма комиссии отправителя платежа. Пример:  `-21.05`

`description` `string` Описание платежа.

| Поле | Тип | Описание |
|---|---|---|
| `virtual_amount` | `number` | Сумма в игровой валюте. Пример:  `-21.05` |
| `virtual_currency` | `string` | Код игровой валюты. |

`status` `string` Статус транзакции. Возможные значения:
- `new` — новая транзакция. Запрашивайте статус транзакции с разумным интервало методом [`POST`](https://dev.vk.ru/ru/pay/seller/transaction-status) [`/transaction/status`](https://dev.vk.ru/ru/pay/seller/transaction-status) [.](https://dev.vk.ru/ru/pay/seller/transaction-status)
- `rejected` — платёж отклонен, деньги вернулись плательщику.
- `paid` — оплата успешна (статус окончательный), деньги зачислены на счёт получателя.
- `expired` — время жизни платежа в системе истекло, деньги вернулись плательщику. Может возвращаться, если при формировании платежа время жизни была ограничено в параметре `ttl`.
- `held` – платёж захолдирован (для двухстадийных платежей).
- `hold_failed` — не удалось списать сумму платежа, деньги вернулись плательщику (для двухстадийных платежей).
- `hold_canceled` — отмена платежа, комиссия не взимается (для двухстадийных платежей).
- `wait` — транзакция отклонена, но причина ещё неизвестна. Запрашивайте статус транзакции с разумным интервалом методом [`POST`](https://dev.vk.ru/ru/pay/seller/transaction-status) [`/transaction/status`](https://dev.vk.ru/ru/pay/seller/transaction-status) [.](https://dev.vk.ru/ru/pay/seller/transaction-status)
- `process` — транзакция ещё обрабатывается. Запрашивайте статус транзакции с разумным интервалом методом [`POST`](https://dev.vk.ru/ru/pay/seller/transaction-status)

[`/transaction/status`](https://dev.vk.ru/ru/pay/seller/transaction-status) [.](https://dev.vk.ru/ru/pay/seller/transaction-status)

`expires` `string` Дата и время, когда закончится срок жизни транзакции, в формате [Unix Timestamp](https://www.unixtimestamp.com/). Отсчитывается по московскому времени (GMT+3). Актуально для незавершенных транзакций.

`pay_method` `string` Способ оплаты.

`pay_system_name` `string` Название платёжной системы.

`bind_id` `string` Идентификатор привязки в случае платежа по привязке. Формат: UUID по [RFC 4122](https://datatracker.ietf.org/doc/html/rfc4122).

`payment_info` `object` Информация о платеже на стороне платёжной системы. Подробнее — в описании объекта `payment_info`.

`store_info` `object` Дополнительные параметры, переданные вами [в ответ на](https://dev.vk.ru/ru/pay/seller/notifications#%D0%A8%D0%B0%D0%B3%204.%20%D0%9E%D1%82%D0%BF%D1%80%D0%B0%D0%B2%D1%8C%D1%82%D0%B5%20%D0%BE%D1%82%D0%B2%D0%B5%D1%82%20%D0%BD%D0%B0%20%D1%83%D0%B2%D0%B5%D0%B4%D0%BE%D0%BC%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5) [платёжное уведомление](https://dev.vk.ru/ru/pay/seller/notifications#%D0%A8%D0%B0%D0%B3%204.%20%D0%9E%D1%82%D0%BF%D1%80%D0%B0%D0%B2%D1%8C%D1%82%D0%B5%20%D0%BE%D1%82%D0%B2%D0%B5%D1%82%20%D0%BD%D0%B0%20%D1%83%D0%B2%D0%B5%D0%B4%D0%BE%D0%BC%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5).

`merchant_param` `string` Дополнительные параметры, которые вы передали при проведении транзакции.

**Поле | Тип | Описание**

`paid` `string` Дата и время проведения платежа в формате [Unix Timestamp](https://www.unixtimestamp.com/). Отсчитывается по московскому времени (GMT+3).

`merchant_id` `integer` Идентификатор получателя платежа.

`merchant_name` `string` Наименование получателя платежа.

`decline_reason` `string` Причина отклонения платежа. Если хотите, чтобы возвращалось это поле, напишите в техническую поддержку по адресу

`vkpay_solutions@vk.team`. Формат: `string` или структура в виде `{code = "Код` `ошибки", descr = "Описание"}`.

`refund_for` `string` Идентификатор транзакции возврата. Присутствует при возврате платежа.

`refunds` `string` Информация о возвратах по текущей транзакции.

`gate_response` `string` Содержит `txn_id` — идентификатор транзакции на стороне платёжной системы.

`social_auth` `object` Идентификаторы пользователя в социальных сетях. Возможные параметры в формате `string`:
- `vk` — идентификатор пользователя ВКонтакте.
- `ok` – идентификатор пользователя в Одноклассниках.
- `mm` – идентификатор пользователя в соцсети Мой Мир.

### Поля объекта user_info

Объект возвращается внутри тела ответа и содержит информацию о плательщике.

**Поле | Тип | Описание**

`user_id` `string` Идентификатор пользователя на вашей стороне (например, email, идентификатор, имя пользователя, номер телефона). Минимальная длина: 1 символ

`buyer_ip` `string` IP-адрес пользователя. Формат: IP версии 4 по [RFC 791](https://datatracker.ietf.org/doc/html/rfc791).

`avatar` `boolean` Наличие аватарки у пользователя: `true` — аватарка есть, `false` – аватарки нет.

`avg_check` `number` Средний чек платежей пользователя в VK Pay в рублях.

`avg_card_check` `number` Средний чек пользователя по банковским картам в VK Pay в рублях.

| Поле | Тип | Описание |
|---|---|---|
| `balance` | `number` | Остаток средств на счету пользователя в рублях. |
| `birth_date` | `string` | Дата рождения пользователя. Формат: `ДД.ММ.ГГГГ`. |

`cid` `string` `ClientID` — уникальный идентификатор сессии, машины, User-Agent, IP пользователя или их сочетание.

`city` `string` Город пользователя.

`country` `string` Страна пользователя в соответствии с [системой кодов](https://www.iso.org/obp/ui/#search) [Alpha-3 ISO 3166-1](https://www.iso.org/obp/ui/#search). Длина: 3 символа.

`ip_country` `string` Страна пользователя по IP-адресу в соответствии с [системой кодов Alpha-3 ISO 3166-1](https://www.iso.org/obp/ui/#search). Длина: 3 символа.

`friends` `number` Количество друзей ВКонтакте. Формат: целое положительное число.

`games` `string` Название игрового проекта ВКонтакте. Пример: «Весёлая ферма»

`name` `string` Имя пользователя. Пример: `Персик`

`surname` `string` Фамилия пользователя.

`patronymic` `string` Отчество пользователя.

`nick` `string` Имя персонажа в VK Play.

`payments` `boolean` Наличие платежей у пользователя: `true` — есть, `false`
– нет.

`phone` `number` Номер телефона, включая код страны. Шаблон: `^[0-9]{10,16}$`

`phone_country_code` `string` Страна, определённая по номеру телефона пользователя. Формат: в соответствии с [системой кодов](https://www.iso.org/obp/ui/#search) [Alpha-3 ISO 3166-1](https://www.iso.org/obp/ui/#search). Длина: 3 символа.

`prev_agent` `string` User-Agent последнего входа пользователя.

`prev_ip` `string` IP-адрес последнего входа пользователя. Формат: IP версии 4 по [RFC 791](https://datatracker.ietf.org/doc/html/rfc791).

| Поле | Тип | Описание |
|---|---|---|
| `reg_agent` | `string` | User-Agent при регистрации. |

`reg_date` `string` Дата регистрации пользователя. Формат: `ДД.ММ.ГГГГ`.

`reg_email` `string` Номер телефона или email, с которым пользователь зарегистрировался.

`reg_ip` `string` IP-адрес регистрации пользователя. Формат: IP версии 4 по [RFC 791](https://datatracker.ietf.org/doc/html/rfc791).

`reg_ip_country` `string` Страна регистрации пользователя, определённая по IP, в соответствии с [системой кодов Alpha-3 ISO 3166-1](https://www.iso.org/obp/ui/#search). Длина: 3 символа.

`reg_time` `string` Время регистрации. Отсчитывается по московскому времени (GMT+3). Формат: `ЧЧ:ММ:СС`

`sex` `string` Пол пользователя. Возможные значения: `w` - женщина,

`m` - мужчина.

`user_verified` `boolean` Подтверждение авторизации пользователя ( `user_id`) с вашей стороны: `true` — подтверждена, `false` – не подтверждена.

`shown_id` `string` Идентификатор пользователя, который будет отображён в платёжной форме. Максимальная длина: 255 символов.

`hwid` `string` Идентификатор устройства пользователя — Hardware ID.

`passport_full` `string` Паспортные данные пользователя: серия, номер, кем и когда выдан.

`reg_address_full` `string` Адреc регистрации пользователя.

`tax_id` `number` Индивидуальный номер налогоплательщика (ИНН).

`beneficiary_id` `string` Идентификатор бенефициара.

`benef_reg_date` `string` Дата регистрации идентификатора бенефициара.

`tax_profile_country` `string` Код страны, указанной в профиле пользователя, в соответствии с [системой кодов Alpha-3 ISO 3166-1](https://www.iso.org/obp/ui/#search). Длина: 3 символа.

**Поле | Тип | Описание**

`tax_ip_country` `string` Код страны, указанной в профиле пользователя, в соответствии с [системой кодов Alpha-3 ISO 3166-1](https://www.iso.org/obp/ui/#search). Длина: 3 символа.

`tax_phone_country_code` `string` Код страны, определённый по номеру телефона, указанному в профиле пользователя, в соответствии с [системой кодов Alpha-3 ISO 3166-1](https://www.iso.org/obp/ui/#search). Длина: 3 символа.

### Поля объекта payment_info

Объект `payment_info` содержит данные о платеже на стороне платёжной системы. Остальные поля смотрите в описании объекта `body`.

| Поле | Тип | Описание |
|---|---|---|
| `sender` | `string` | Данные плательщика. |
| `recipient` | `string` | Данные получателя. |
| `payer_id` | `string` | Идентификатор пользователя в платёжной системе. |

`date` `string` Дата и время проведения платежа в формате [Unix](https://www.unixtimestamp.com/) [Timestamp](https://www.unixtimestamp.com/). Отсчитывается по московскому времени (GMT+3).

`amount` `number` Сумма платежа в валюте платежа на стороне платёжной системы. Пример:  `-21.05`

`currency` `string` Валюта платежа в платёжной системе по [ISO 4217](https://normativ.kontur.ru/document?moduleId=1&documentId=456276).

`sms_service` `string` Идентификатор услуги для SMS-платежей.

`sms_text` `string` Текст SMS.

`refund_type` `string` [Тип возврата](https://dev.vk.ru/ru/pay/seller/refunds#%D0%A7%D0%B5%D0%BC%20%D0%BE%D1%82%D0%BB%D0%B8%D1%87%D0%B0%D1%8E%D1%82%D1%81%D1%8F%20%D0%BE%D1%82%D0%BC%D0%B5%D0%BD%D0%B0%20%D0%B8%20%D0%B2%D0%BE%D0%B7%D0%B2%D1%80%D0%B0%D1%82%20%D0%BF%D0%BB%D0%B0%D1%82%D0%B5%D0%B6%D0%B0). Возвращается в ответе при возврате платежа. Возможные значения: `refund` – возврат платежа, `reversal` — отмена платежа.

`chained_transaction_id` `string` Идентификатор цепочечной транзакции.

`refunded_transaction_id` `string` Идентификатор отменённой транзакции. Формат: UUID по [RFC 4122](https://datatracker.ietf.org/doc/html/rfc4122).

`card_payment_amount` `number` Сумма, которая спишется с банковской карты. Пример:  `-21.05`

**Поле | Тип | Описание**

`bonus_payment_amount` `number` Сумма, которая спишется с бонусного баланса (при наличии). Пример:  `-21.05`

`country` `string` Страна в соответствии с [системой кодов Alpha-3 ISO](https://www.iso.org/obp/ui/#search) [3166-1](https://www.iso.org/obp/ui/#search). Длина: 3 символа.

`mit` `boolean` Признак рекуррентного платежа, например автоплатежа, регулярного платежа по подписке. Доступные значения:
- `1` — рекуррентный платёж.
- `0` — нерекуррентный платёж (по умолчанию).

`card_rec_id` `string` Идентификатор рекуррентного платежа. Присутствует, если платёж периодически повторяется.

`phone_number` `string` Номер телефона. Возвращается для платёжных методов, при использовании которых пользователю необходимо его указать.

## Шаг 3. Ответьте на платёжное уведомление

После проведения транзакции платёжная система вернёт [платёжное уведомление](https://dev.vk.ru/ru/pay/seller/notifications) с результатом. [Проверьте подпись уведомления](https://dev.vk.ru/ru/pay/seller/notifications#%D0%A8%D0%B0%D0%B3%202.%20%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D1%8C%D1%82%D0%B5%20%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D1%8C%20%D1%83%D0%B2%D0%B5%D0%B4%D0%BE%D0%BC%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F) с помощью публичного ключа платёжной системы, который вы получили при подключении. Расшифруйте данные уведомления, обработайте и [отправьте API](https://dev.vk.ru/ru/pay/seller/notifications#%D0%A8%D0%B0%D0%B3%204.%20%D0%9E%D1%82%D0%BF%D1%80%D0%B0%D0%B2%D1%8C%D1%82%D0%B5%20%D0%BE%D1%82%D0%B2%D0%B5%D1%82%20%D0%BD%D0%B0%20%D1%83%D0%B2%D0%B5%D0%B4%D0%BE%D0%BC%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5) [системы ответ](https://dev.vk.ru/ru/pay/seller/notifications#%D0%A8%D0%B0%D0%B3%204.%20%D0%9E%D1%82%D0%BF%D1%80%D0%B0%D0%B2%D1%8C%D1%82%D0%B5%20%D0%BE%D1%82%D0%B2%D0%B5%D1%82%20%D0%BD%D0%B0%20%D1%83%D0%B2%D0%B5%D0%B4%D0%BE%D0%BC%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5) об успешной обработке или об ошибке.

## Ошибки при запросе информации о транзакции

| Ошибка | Описание |
|---|---|
| `ERR_NOT_FOUND` | Транзакция с таким идентификатором не найдена. Проверьте значение идентификатора и повторите запрос. |
| `ERR_RETRY` | Нет данных по этой транзакции. Возможно, система ещё не закончила предварительную обработку данных. Повторите запрос позже. |
| `ERR_REFUND_FAILED` | При проведении возврата возникла ошибка. Попробуйте повторить запрос. |
| `ERR_PAY_METHOD_DISABLED` | Этот метод оплаты отключён или недоступен вам. Обратитесь в техническую поддержку по адресу `vkpay_solutions@vk.team`. |
| `ERR_BUSY` | Система занята. Попробуйте повторить запрос позже. |
