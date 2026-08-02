# Уведомления

**Раздел:** VK Pay → API платёжной системы → Уведомления  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Платёжное уведомление

С [платёжной системой VK Pay](https://dev.vk.ru/ru/pay/seller/general-description) вы можете получать уведомления о результате проведения транзакции (например, платежа или возврата).

Чтобы получать уведомления, при [подключении к API платёжной системы](https://dev.vk.ru/ru/pay/seller/general-description#%D0%9A%D0%B0%D0%BA%20%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D1%8C) передайте в техническую поддержку URL-адрес, на который хотите получать уведомления. Можно указать сразу несколько адресов.

Чтобы поменять URL-адреса или добавить новые, напишите в техническую поддержку по адресу

`vkpay_solutions@vk.team`.

Уведомление нужно обработать и отправить платёжной системе ответ с результатом обработки: успех или ошибка. Если не ответить, платёжная система проведёт транзакцию, но продолжит присылать уведомления, предполагая, что вы не обработали транзакцию.

Совет. Мы рекомендуем сохранять данные уведомлений на вашей стороне. Они пригодятся для выполнения возвратов по неуспешным транзакциям и для сбора статистики.

Платёжная система может отправлять уведомления из подсетей: `176.112.170.160/29`,

`188.93.57.60/32`, `188.93.57.3/32`, `188.93.57.39/32`, `188.93.57.33/32`, `188.93.57.38/32`, `188.93.57.50/32`.

## Сценарий взаимодействия

1. Получите уведомление.

2. Проверьте подпись уведомления.

3. Обработайте уведомление.

4. Отправьте ответ платёжной системе.

### Шаг 1. Получите уведомление

После проведения платежа платёжная система отправит уведомление о результате транзакции на URL-адрес, который вы указали при подключении к VK Pay.

Уведомление отправляется `POST` -запросом и содержит три поля:

- `data` — данные уведомления в формате JSON, закодированные в BASE64-строку.
- `signature` — подпись уведомления.
- `version` — версия протокола API.

Проверьте подлинность уведомления с помощью публичного ключа и обработайте данные.

#### Пример уведомления

```
data=
ewogICJib2R5IjogewogICAgInRyYW5zYWN0aW9uX2lkIjogIjI5RUQyNENDLURGMDctMTFFNy1BMT
c5LTQ4RDAyMjFDREJFMiIsCiAgICAibm90aWZ5X3R5cGUiOiAiVFJBTlNBQ1RJT05fU1RBVFVTIiwK
ICAgICJhZGRlZCI6ICIxNTEzMDYwNzUxIiwKICAgICJ1c2VyX2luZm8iOiB7CiAgICAgICJ1c2VyX2
lkIjogInRlc3RfdXNlciIKICAgIH0sCiAgICAiaXNzdWVyX2lkIjogIjExMjIzMyIsCiAgICAiYW1v
dW50IjogIjEwLjUiLAogICAgImN1cnJlbmN5IjogIlJVQiIsCiAgICAiZGVzY3JpcHRpb24iOiAi0K
LQtdGB0YLQvtCy0YvQuSDQv9C70LDRgtC10LYiLAogICAgInBheV9tZXRob2QiOiAiY2FyZF9ydWIi
LAogICAgInBheW1lbnRfaW5mbyI6IHsKICAgICAgInBheWVyX2lkIjogIjkxNTQ0MzMwMjIiCiAgIC
B9LAogICAgInBhaWQiOiAiMTUxMzA2MDc1MiIsCiAgICAibWVyY2hhbnRfaWQiOiAxMTMzNDQ1NQog
IH0sCiAgImhlYWRlciI6IHsKICAgICJzdGF0dXMiOiAiT0siLAogICAgInRzIjogIjE1MTMwNjA3NT
IiLAogICAgImNsaWVudF9pZCI6ICIxNzUzNzciCiAgfQp9&signature=igrfduikuswHRxmGSuDke
FdSpQBdkld748tPon9DIgbkzise1FwJjq82a1gVwHzWG2FUpyF0WN%2BB2ocNH46LHXbdM9V%2FZ9g
2QcWy
6TuJHHicuC6c%2Fqxdc0wAEbFXrp2STkPOv67Q4ZC6N1R3y6Y%2FXk%2Brp1iTcIdYbZtWx4qMVWnp
by2Y58lzFXkC1fSidVoXNJFV6gxCqw0qprkAuutBJRx3vRP49EbEee6vPRqMAg1FqGzl%2BRG8NzFi
hT41LjJXyFhFS6DzFbQpnicBaj0rqSeewnsO
JF9U926kYQSAyOiwT5PEH%2Bow1pbr010%2BifhzHfb4b64q884g%3D%3D&version=2-03
```

### Шаг 2. Проверьте подпись уведомления

Платёжная система генерирует подпись уведомления с помощью OpenSSL (алгоритм RSA) с использованием приватного ключа системы.

Подпись платёжного уведомления — это поле `signature`, которое содержит данные поля `data` в формате BASE64-строки, закодированные с помощью алгоритма RSA.

Для проверки подписи используйте публичный ключ, который вы получили при заключении договора с оператором платёжной системы.

#### Пример публичного ключа

```
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAukXD0MX64KKsWuiv2A4/
IEaXknvze019wZtvxYOIgGFjeWGp26CMa627cKpQS8TOT9TJ9OgbWuI+MWTK2dfP
yDzqfuPVHWbnBaM85O3tQ/Tv2mBwkvzP3z1gTZ+mYSuAfZG0H6vLG0GPDj2I79Zj
QSXcLSNWoS+7XNcLgDE5RCdAF+VLlSir+e1n/JWRb3XtIyyrDMF3VzfJsX6DVhxW
4FfhxqjX4JHiMhdDHHiuzMJ3zNaLOzS7ynaQ5OgCfp89ageNMgp1DbLpGbxlXlex
m4/CSuoVEY6NPrpytVAOJhiE0rwtBZPsMTGzXtBXpxv2NyO2Qdh0kjhB+qa3mmln
XwIDAQAB
-----END PUBLIC KEY-----
```

#### Пример проверки подписи уведомления на PHP

```php
$verify_res = openssl_verify($input['data'],
base64_decode($input['signature']), $public_key);
if (!$verify_res) {
    die 'Can\'t verify notification signature';
 }
```

### Шаг 3. Обработайте данные уведомления

Обработайте данные поля `data`.

Здесь приведён пример поля `data`. Список доступных полей зависит от транзакции и платёжного метода.

Пример данных в структуре `data` при платеже

```json
{
  "body": {
    "transaction_id": "29ED24CC-DF07-11E7-A179-48D0221CDBE2",
    "notify_type": "TRANSACTION_STATUS",
    "added": "1513060751",
    "user_info": {
      "user_id": "test_user"
    },
    "issuer_id": "112233",
    "amount": "10.5",
    "currency": "RUB",
    "description": "Тестовый платёж",
    "pay_method": "card_rub",
    "payment_info": {
      "payer_id": "9154433022"
    },
    "paid": "1513060752",
    "merchant_id": 11334455
  },
  "header": {
    "status": "OK",
    "ts": "1513060752",
    "client_id": "175377"
  }
}
```

### Шаг 4. Отправьте ответ на уведомление

Для этого:

1. Сформируйте поле `data` — данные уведомления в формате JSON, закодированные в BASE64- строку. Структура зависит от результата обработки уведомления: успешно или неуспешно.

2. Подпишите уведомление.

3. Отправьте ответ платёжной системе.

#### Пример ответа на уведомление

```json
{
  "version": "2-03",
  "data":
"ewogImJvZHkiOiB7CiAgICAgInRyYW5zYWN0aW9uX2lkIjoiODFDMTBERDYtRjU3NS0zNDg1LUE2Q
UQtRUJGMDc5MDBDRDYyIiwKICAgICAibm90aWZ5X3R5cGUiOiJwYXltZW50X2RlbGl2ZXJlZCIKICA
gICAgfSwKICJoZWFkZXIiOiB7CiAgICAic3RhdHVzIjogIk9LIiwKICAgICJ0cyI6IDE1MTMwNjA3N
TIsCiAgICAiY2xpZW50X2lkIjogIjE3NTM3NyIKICB9Cn0==33324b236d226c8298ea62f976f5bc
457afaca8f",
  "signature": "8afa84aaba70b10896253dc491b55c047cf048bc"
}
```

## Ответ на уведомление

### Структура ответа

Ответ на уведомление в формате JSON должен включать поля:

- `version` — версия протокола. Последняя версия: `2-03`.
- `data` — данные уведомления в формате JSON, закодированные в BASE64-строку.
- `signature` — подпись ответа.

### Формирование поля data при успешной обработке уведомления

Если обработка уведомления успешна, в ответе на уведомление передайте:

- В теле ответа `body` в поле `notify_type` одно из значений: `payment_delivered` — платёж проведён или `payment_declined` — платёж отклонён.
- В заголовке `header` в поле `status` — значение `OK`.

Пример `data` при успешной обработке уведомления

```json
{
 "body": {
     "transaction_id":"81C10DD6-F575-3485-A6AD-EBF07900CD62",
     "notify_type":"payment_delivered"
      },
 "header": {
    "status": "OK",
    "ts": 1513060752,
    "client_id": "175377"
  }
}
```

Поля объекта `body` при успешной обработке уведомления

| Поле | Тип | Описание |
|---|---|---|
| `transaction_id` обязательный | `string` | Идентификатор транзакции. Должен совпадать с |

`transaction_id`, который вы получили в платёжном уведомлении. Формат: UUID по [RFC 4122](https://datatracker.ietf.org/doc/html/rfc4122).

| `notify_type` обязательный | `string` Тип уведомления. Возможные значения: - `payment_delivered` – платёж проведён - `payment_declined` – платёж отклонён. |
|---|---|

Поля заголовка `header` при успешной обработке уведомления

| Поле | Тип | Описание |
|---|---|---|
| `status` обязательный | `string` | Статус обработки уведомления. При успешной обработке — значение |

`OK`.

| `ts` обязательный | `number` Временная отметка формирования запроса. Формат: число, [Unix](https://www.unixtimestamp.com/) [Timestamp](https://www.unixtimestamp.com/). |
|---|---|
| `client_id` обязательный | `number` Идентификатор пользователя в платёжной системе, выдаваемый при подключении. |

### Формирование поля data при ошибке обработки уведомления

Если при обработке уведомления произошла ошибка, в ответе на уведомление передайте:

- в теле ответа `body` в поле `notify_type` — значение `TRANSACTION_STATUS`.
- в заголовке `header`: в поле `error` — код и описание ошибки, в поле `status` — значение `ERROR`. Подробнее – в ошибках обработки уведомления.

Пример `data` при ошибке обработки уведомления

```json
{
 "body": {
     "transaction_id":"81C10DD6-F575-3485-A6AD-EBF07900CD62",
     "notify_type":"TRANSACTION_STATUS"
      },
 "header":{
      "status":"ERROR",
      "ts":1571822085,
      "client_id":"123456",
      "error":{
           "code":"ERR_ARGUMENTS",
           "message":"Описание ошибки"
           }
       }
}
```

Поля объекта `body` при ошибке обработки уведомления

| Поле | Тип | Описание |
|---|---|---|
| `transaction_id` обязательный | `string` | Идентификатор транзакции. Должен совпадать с |

`transaction_id`, который вы получили в платёжном уведомлении. Формат: UUID по [RFC 4122](https://datatracker.ietf.org/doc/html/rfc4122).

| `notify_type` обязательный | `string` Тип уведомления. Содержит значение: `TRANSACTION_STATUS`. |
|---|---|
| `store_info` необязательный | `string` Любые дополнительные параметры, которые вы хотите передать в ответе в формате текста. |

Поля заголовка `header` при ошибке обработки уведомления

| Поле | Тип | Описание |
|---|---|---|
| `status` обязательный | `string` | Статус обработки уведомления. При ошибке обработки — значение |

`ERROR`.

| `ts` обязательный | `number` Временная отметка формирования запроса. Формат: число, [Unix](https://www.unixtimestamp.com/) [Timestamp](https://www.unixtimestamp.com/). |
|---|---|
| `client_id` обязательный | `number` Идентификатор пользователя в системе, выдаваемый при подключении. |
| `error` обязательный | `object` Описание ошибки. В объекте `error` нужно передать два поля: `code`  — код ошибки и `message`  – описание ошибки. Подробнее – в ошибках обработки уведомления. |

### Ошибки обработки уведомления error.code

| Ошибка | Описание | Действия со стороны платёжной | системы |
|---|---|---|---|
| `ERR_SYSTEM` Техническая ошибка на стороне вашего сервиса. | Уведомление будет отправлено повторно. |
| `ERR_ARGUMENTS` Ошибка обработки параметров уведомления. | Отправка уведомлений будет остановлена. |
| `ERR_SIGNATURE` | Ошибка проверки подписи уведомления. | Отправка уведомлений будет | остановлена. |

| Ошибка | Описание | Действия со стороны платёжной | системы |
|---|---|---|---|
| `ERR_DUPLICATE` Уведомление с таким `transaction_id` уже обработано. | Отправка уведомлений будет остановлена. |

### Формирование подписи ответа на уведомление

Подпись ответа на платёжное уведомление — это поле `signature`, которое содержит закодированный с помощью алгоритма криптографического хеширования SHA256 в HEX- представлении результат конкатенации BASE64-строки от поля `data` и приватного ключа продавца.

Чтобы сформировать подпись ответа на уведомление:

1. Сформируйте поле `data`.

2. Закодируйте поле `data`.

3. Сконкатенируйте поле `data` с приватным ключом.

4. Вычислите криптографический хеш SHA256 в HEX-представлении.

Шаг 1. Сформируйте поле `data`

Поле `data` — JSON-объект с заголовком и телом запроса. Структура `data` зависит от результата обработки уведомления: успешно или неуспешно.

Пример `data` при успешной обработке уведомления

```json
{
 "body": {
     "transaction_id":"81C10DD6-F575-3485-A6AD-EBF07900CD62",
     "notify_type":"payment_delivered"
      },
 "header": {
    "status": "OK",
    "ts": 1513060752,
    "client_id": "175377"
  }
}
```

Шаг 2. Закодируйте сформированное поле `data` в BASE64-строку

Пример поля `data`, закодированного в BASE64-строку

```
ewogImJvZHkiOiB7CiAgICAgInRyYW5zYWN0aW9uX2lkIjoiODFDMTBERDYtRjU3NS0zNDg1LUE2QU
QtRUJGMDc5MDBDRDYyIiwKICAgICAibm90aWZ5X3R5cGUiOiJwYXltZW50X2RlbGl2ZXJlZCIKICAg
ICAgfSwKICJoZWFkZXIiOiB7CiAgICAic3RhdHVzIjogIk9LIiwKICAgICJ0cyI6IDE1MTMwNjA3NT
IsCiAgICAiY2xpZW50X2lkIjogIjE3NTM3NyIKICB9Cn0=
```

Шаг 3. Сконкатенируйте полученную на предыдущем шаге BASE64-строку с приватным ключом продавца

Пример конкатенации поля `data` и приватного ключа

```
ewogImJvZHkiOiB7CiAgICAgInRyYW5zYWN0aW9uX2lkIjoiODFDMTBERDYtRjU3NS0zNDg1LUE2QU
QtRUJGMDc5MDBDRDYyIiwKICAgICAibm90aWZ5X3R5cGUiOiJwYXltZW50X2RlbGl2ZXJlZCIKICAg
ICAgfSwKICJoZWFkZXIiOiB7CiAgICAic3RhdHVzIjogIk9LIiwKICAgICJ0cyI6IDE1MTMwNjA3NT
IsCiAgICAiY2xpZW50X2lkIjogIjE3NTM3NyIKICB9Cn0==33324b236d226c8298ea62f976f5bc4
57afaca8f
```

Шаг 4. От полученной после объединения строки вычислите криптографический хеш SHA256 в HEX-представлении

```
8afa84aaba70b10896253dc491b55c047cf048bc
```

Готово! Используйте полученное значение при отправке запроса в параметре `signature`.

#### Пример конечного результата

```json
{
  "version": "2-03",
  "data":
"ewogImJvZHkiOiB7CiAgICAgInRyYW5zYWN0aW9uX2lkIjoiODFDMTBERDYtRjU3NS0zNDg1LUE2Q
UQtRUJGMDc5MDBDRDYyIiwKICAgICAibm90aWZ5X3R5cGUiOiJwYXltZW50X2RlbGl2ZXJlZCIKICA
gICAgfSwKICJoZWFkZXIiOiB7CiAgICAic3RhdHVzIjogIk9LIiwKICAgICJ0cyI6IDE1MTMwNjA3N
TIsCiAgICAiY2xpZW50X2lkIjogIjE3NTM3NyIKICB9Cn0==33324b236d226c8298ea62f976f5bc
457afaca8f",
  "signature": "8afa84aaba70b10896253dc491b55c047cf048bc"
}
```

## Поля объекта `body` в платёжном уведомлении

Поля объекта `body` зависят от транзакции и платёжного метода.

**Поле | Тип | Описание**

`transaction_id` `string` Идентификатор транзакции. Значение этого параметра необходимо передать в ответе на уведомление. Формат: UUID по [RFC 4122](https://datatracker.ietf.org/doc/html/rfc4122).

`notify_type` `string` Возможные значения:
- `payment_delivered` — платёж проведён
- `payment_declined` – платёж отклонён Значение этого поля необходимо передать в ответе на уведомление.

**Поле | Тип | Описание**

`added` `string` Дата и время создания транзакции в формате [Unix Timestamp](https://www.unixtimestamp.com/). Отсчитывается по московскому времени (GMT+3).

`user_info` `object` Дополнительная информация о пользователе. Подробное описание полей — в параметрах `user_info`.

`issuer_id` `string` Идентификатор заказа на вашей стороне.

`txn_id` `string` Идентификатор заказа на стороне платёжной системы.

`keep_uniq` `boolean` Служебный параметр.

`amount` `number` Сумма платежа. Принимает положительное значение при поступлении средств и отрицательное — при списании. Пример:

`21.05`

`currency` `string` Валюта платежа по [ISO 4217](https://normativ.kontur.ru/document?moduleId=1&documentId=456276).

`payee_amount` `number` Сумма зачисления средств, включая комиссию. Пример: `21.05`

`payee_fee_amount` `number` Сумма комиссии получателя платежа. Пример: `21.05`

`payer_amount` `number` Сумма списания средств, включая комиссию. Пример: `-21.05`

`payer_fee_amount` `number` Сумма комиссии отправителя платежа. Пример: `-21.05`

`description` `string` Описание платежа.

`virtual_amount` `number` Сумма в виртуальной или игровой валюте (например, голоса ВКонтакте).

`virtual_currency` `string` Код игровой валюты.

`status` `string` Статус транзакции. Возможные значения:
- `new` — новая транзакция. Запрашивайте статус транзакции с разумным интервалом методом [`POST`](https://dev.vk.ru/ru/pay/seller/transaction-status)

[`/transaction/status`](https://dev.vk.ru/ru/pay/seller/transaction-status) [.](https://dev.vk.ru/ru/pay/seller/transaction-status)
- `rejected` — платёж отклонен, деньги вернулись плательщику.
- `paid` — оплата успешна (статус окончательный), деньги зачислены на счёт получателя.
- `expired` — время жизни платежа в системе истекло, деньги вернулись плательщику. Может возвращаться, если при формировании платежа время жизни была ограничено в параметре `ttl`.
- `held` – платёж захолдирован (для двухстадийных платежей).
- `hold_failed` — не удалось списать сумму платежа, деньги вернулись плательщику (для двухстадийных платежей).

**Поле | Тип | Описание**

- `hold_canceled` — отмена платежа, комиссия не взимается (для двухстадийных платежей).
- `wait` — транзакция отклонена, но причина ещё неизвестна. Запрашивайте статус транзакции с разумным интервалом методом `POST` `/transaction/status`.
- `process` — транзакция ещё обрабатывается. Запрашивайте статус транзакции с разумным интервалом методом `POST`

[`/transaction/status`](https://dev.vk.ru/ru/pay/seller/transaction-status) [.](https://dev.vk.ru/ru/pay/seller/transaction-status)

`expires` `string` Дата и время, когда закончится срок жизни транзакции, в формате [Unix Timestamp](https://www.unixtimestamp.com/). Отсчитывается по московскому времени (GMT+3). Актуально для незавершенных транзакций.

`pay_method` `string` Способ оплаты.

`pay_system_name` `string` Название платёжной системы.

`bind_id` `string` Идентификатор привязки в случае платежа по привязке. Формат: UUID по [RFC 4122](https://datatracker.ietf.org/doc/html/rfc4122).

`payment_info` `object` Информация о платеже на стороне платёжной системы. Подробное описание полей — в параметрах `payment_info`.

`store_info` `object` Дополнительные параметры, переданные вами в ответ на платёжное уведомление.

`merchant_param` `string` Дополнительные параметры, которые вы передали при проведении транзакции.

`paid` `string` Дата и время проведения платежа в формате [Unix Timestamp](https://www.unixtimestamp.com/). Отсчитывается по московскому времени (GMT+3).

`merchant_id` `integer` Идентификатор получателя платежа, который вы получили при [подключении к API платёжной системы](https://dev.vk.ru/ru/pay/seller/general-description#%D0%9A%D0%B0%D0%BA%20%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D1%8C).

`merchant_name` `string` Наименование получателя платежа.

`decline_reason` `string` Причина отклонения платежа. Возможные значения смотрите в разделе об ошибках транзакции.

`refund_for` `string` Идентификатор транзакции возврата. Присутствует при возврате платежа.

`refunds` `string` Информация о возвратах по текущей транзакции.

`gate_response` `string` Содержит `txn_id` — идентификатор транзакции на стороне платёжной системы.

**Поле | Тип | Описание**

`social_auth` `object` Идентификаторы пользователя в социальных сетях. Возможные параметры в формате `string`:
- `vk` — идентификатор пользователя ВКонтакте.
- `ok` – идентификатор пользователя в Одноклассниках.
- `mm` – идентификатор пользователя в соцсети Мой Мир.

### Поля объекта user_info

Объект `user_info` содержит информацию о плательщике. Остальные параметры платёжного уведомления смотрите в разделе Поля объекта `body`.

**Параметр | Тип | Описание**

`user_id` `string` Идентификатор пользователя на вашей стороне (например, email, идентификатор, имя пользователя, номер телефона). Минимальная длина: 1

`buyer_ip` `string` IP-адрес пользователя. Формат: IP версии 4 по [RFC 791](https://datatracker.ietf.org/doc/html/rfc791).

`avatar` `boolean` Наличие аватарки у пользователя: `true` — аватарка есть, `false` – аватарки нет.

`avg_check` `number` Средний чек платежей пользователя в VK Pay в рублях. Пример:  `-21.05`

`avg_card_check` `number` Средний чек пользователя в VK Pay по банковским картам в рублях.

`balance` `number` Остаток средств на счету пользователя в рублях. Пример:  `-21.05`

`birth_date` `string` Дата рождения пользователя. Формат: `ДД.ММ.ГГГГ`.

`cid` `string` `ClientID` — уникальный идентификатор сессии, машины, User-Agent, IP пользователя или их сочетание.

`city` `string` Город пользователя.

`country` `string` Страна пользователя в соответствии c [системой кодов](https://www.iso.org/obp/ui/#search) [Alpha-3 ISO 3166-1](https://www.iso.org/obp/ui/#search). Длина: 3 символа.

`ip_country` `string` Страна пользователя по IP-адресу в соответствии с [системой кодов Alpha-3 ISO 3166-1](https://www.iso.org/obp/ui/#search). Длина: 3 символа.

**Параметр | Тип | Описание**

`friends` `number` Количество друзей ВКонтакте. Формат: целое положительное число.

`games` `string` Название игрового проекта ВКонтакте. Пример: «Весёлая ферма»

`name` `string` Имя пользователя. Пример: `Персик`

`surname` `string` Фамилия.

`patronymic` `string` Отчество.

`nick` `string` Имя персонажа в VK Play.

`payments` `boolean` Наличие платежей у пользователя: `true` — есть, `false`
– нет.

`phone` `number` Номер телефона, включая код страны. Шаблон: `^[0-9]{10,16}$`

`phone_country_code` `string` Страна, определённая по номеру телефона пользователя. Формат: в соответствии с [системой кодов](https://www.iso.org/obp/ui/#search) [Alpha-3 ISO 3166-1](https://www.iso.org/obp/ui/#search). Длина: 3 символа.

`prev_agent` `string` User-Agent последнего входа пользователя.

`prev_ip` `string` IP-адрес последнего входа пользователя. Формат: IP версии 4 по [RFC 791](https://datatracker.ietf.org/doc/html/rfc791).

`reg_agent` `string` User-Agent при регистрации.

`reg_date` `string` Дата регистрации пользователя. Формат: `ДД.ММ.ГГГГ`.

`reg_email` `string` Номер телефона или email, с которым пользователь зарегистрировался.

`reg_ip` `string` IP-адрес регистрации пользователя. Формат: IP версии 4 по [RFC 791](https://datatracker.ietf.org/doc/html/rfc791).

`reg_ip_country` `string` Страна регистрации пользователя, определённая по IP, в соответствии с [системой кодов Alpha-3 ISO 3166-1](https://www.iso.org/obp/ui/#search). Длина: 3 символа.

`reg_time` `string` Время регистрации. Отсчитывается по московскому времени (GMT+3).

**Параметр | Тип | Описание**

Формат: `ЧЧ:ММ:СС`

`sex` `string` Пол пользователя. Возможные значения: `w` - женщина,

`m` - мужчина.

`user_verified` `boolean` Подтверждение авторизации пользователя ( `user_id`) получателем платежа: `true` — подтверждена, `false` – не подтверждена.

`shown_id` `string` Идентификатор пользователя, который будет отображён в платёжной форме. Максимальная длина: 255 символов.

`hwid` `string` Идентификатор устройства пользователя — Hardware ID.

`passport_full` `string` Паспортные данные пользователя: серия, номер, кем и когда выдан.

`reg_address_full` `string` Адреc регистрации пользователя.

`tax_id` `number` Индивидуальный номер налогоплательщика (ИНН).

`beneficiary_id` `string` Идентификатор бенефициара.

`benef_reg_date` `string` Дата регистрации идентификатора бенефициара.

`tax_profile_country` `string` Код страны, указанной в профиле пользователя, в соответствии с [системой кодов Alpha-3 ISO 3166-1](https://www.iso.org/obp/ui/#search). Длина: 3 символа.

`tax_ip_country` `string` Код страны, указанной в профиле пользователя, в соответствии с [системой кодов Alpha-3 ISO 3166-1](https://www.iso.org/obp/ui/#search). Длина: 3 символа.

`tax_phone_country_code` `string` Код страны, определённый по номеру телефона, указанному в профиле пользователя, в соответствии с [системой кодов Alpha-3 ISO 3166-1](https://www.iso.org/obp/ui/#search). Длина: 3 символа.

### Параметры объекта payment_info

Объект `payment_info` содержит данные о платеже на стороне платёжной системы. Остальные параметры платёжного уведомления смотрите в разделе Поля объекта `body`.

| Поле | Тип | Описание |
|---|---|---|
| `sender` | `string` | Данные плательщика. |

| Поле | Тип | Описание |
|---|---|---|
| `recipient` | `string` | Данные получателя. |
| `payer_id` | `string` | Идентификатор пользователя в платёжной системе. |

`date` `string` Дата и время проведения платежа в формате [Unix](https://www.unixtimestamp.com/) [Timestamp](https://www.unixtimestamp.com/). Отсчитывается по московскому времени (GMT+3).

`amount` `number` Сумма платежа в валюте платежа на стороне платёжной системы. Пример:  `-21.05`

`currency` `string` Валюта платежа в платёжной системе по [ISO 4217](https://normativ.kontur.ru/document?moduleId=1&documentId=456276).

`sms_service` `string` Идентификатор услуги для SMS-платежей.

`sms_text` `string` Текст SMS.

`refund_type` `string` [Тип возврата](https://dev.vk.ru/ru/pay/seller/refunds#%D0%A7%D0%B5%D0%BC%20%D0%BE%D1%82%D0%BB%D0%B8%D1%87%D0%B0%D1%8E%D1%82%D1%81%D1%8F%20%D0%BE%D1%82%D0%BC%D0%B5%D0%BD%D0%B0%20%D0%B8%20%D0%B2%D0%BE%D0%B7%D0%B2%D1%80%D0%B0%D1%82%20%D0%BF%D0%BB%D0%B0%D1%82%D0%B5%D0%B6%D0%B0). Приходит в уведомлении при возврате платежа. Возможные значения: `refund` – возврат платежа, `reversal` — отмена платежа.

`chained_transaction_id` `string` Идентификатор цепочечной транзакции.

`refunded_transaction_id` `string` Идентификатор отменённой транзакции. Формат: UUID по [RFC 4122](https://datatracker.ietf.org/doc/html/rfc4122).

`card_payment_amount` `number` Сумма, которая спишется с банковской карты. Пример:  `-21.05`

`bonus_payment_amount` `number` Сумма, которая спишется с бонусного баланса (при наличии). Пример:  `-21.05`

`country` `string` Страна в соответствии с [системой кодов Alpha-3 ISO](https://www.iso.org/obp/ui/#search) [3166-1](https://www.iso.org/obp/ui/#search).

`mit` `boolean` Признак рекуррентного платежа, например автоплатежа, регулярного платежа по подписке. Доступные значения:
- `1` — рекуррентный платёж.
- `0` — нерекуррентный платёж (по умолчанию).

`card_rec_id` `string` Идентификатор рекуррентного платежа. Присутствует, если платёж периодически повторяется.

### Ошибки транзакции

Параметр `decline_reason` в платёжном уведомлении может содержать следующие значения:

| Ошибка | Описание |
|---|---|
| `3DS_USER` | Ошибка 3DS-аутентификации. |
| `ACQUIRER_LIMIT` | Ограничение на стороне эквайера. |
| `ACQUIRER_TECH` | Техническая ошибка на стороне эквайера. |
| `AUTHENTICATION_FAILED` | Аутентификация неуспешна. |
| `CARD_EXPIRED` | Истёк срок действия карты. |
| `CARD_LIMIT` | Платёж по банковской карте отклонён. Обратитесь в банк-эмитент, выпустивший карту. |
| `CARD_LIMIT_3DS` | Платёж по карте отклонён. Данные карты удалены. Обратитесь в банк-эмитент, выпустивший карту. |
| `CARD_LIMIT_AMOUNT` | Превышены дневные лимиты по карте (количество операций, сумма). Обратитесь в банк-эмитент, выпустивший карту. |
| `CARD_LIMIT_CVV` | Платёж по карте отклонён. Требуется 3DS-аутентификация. Обратитесь в банк-эмитент, выпустивший карту. |
| `CARD_LIMIT_ONLINE` | Интернет-платежи по карте запрещены. Обратитесь в банк-эмитент, выпустивший карту. |
| `CARD_LIMIT_ONLINE_3DS` | Интернет-платежи по карте запрещены. Данные карты удалены. Обратитесь в банк-эмитент, выпустивший карту. |
| `CARD_LIMIT_ONLINE_CVV` | Интернет-платежи по карте запрещены. Требуется 3DS- аутентификация. Обратитесь в банк-эмитент, выпустивший карту. |
| `CARD_PARAM` | Некорректно указаны данные карты. Проверьте данные и попробуйте попытку. |
| `CARD_PARAM_PAN` | Некорректно указан номер карты. Проверьте данные карты и повторите попытку. |
| `DUPLICATE_ORDER` | Дублирование запросов. |
| `ERR_RESPONSE_TIMEOUT` | Превышен лимит ожидания ответа от банка-эквайера. Обратитесь в техническую поддержку по адресу `vkpay_solutions@vk.team`. |
| `ERR_VOID_ERROR` | Ошибка отмены транзакции. Обратитесь в техническую поддержку по адресу `vkpay_solutions@vk.team`. |
| `FRAUD` | Подозрительная транзакция. |

| Ошибка | Описание |
|---|---|
| `INPUT` | Ошибки ввода. |
| `ISSUER_NOT_ALLOWED` | Транзакция не разрешена эмитентом. Обратитесь в банк-эмитент, выпустивший карту. |
| `ISSUER_REJECT` | Платёж по карте отклонён. Обратитесь в банк-эмитент, выпустивший карту. |
| `ISSUER_TECH` | Банк-эмитент, выпустивший карту, не отвечает. Пожалуйста, обратитесь в банк. |
| `NOT_ENOUGH_MONEY` | Недостаточно средств для транзакции. Попробуйте воспользоваться другой картой или другим способом оплаты. |
| `ORDER_NOT_FOUND` | Заказ не найден. |
| `REFUND_ORDER_NOT_FOUND` | Заказ не найден. Возможно, отмена уже произведена. Дождитесь смены статуса заказа. |
| `REJECTED_UNKNOWN` | Невозможно совершить платёж. Обратитесь в техническую поддержку по адресу `vkpay_solutions@vk.team`. |
| `SECURITY` | Невозможно совершить платёж. Обратитесь в техническую поддержку по адресу `vkpay_solutions@vk.team`. |
| `SYSTEM` | Не удалось произвести оплату. Убедитесь в правильности ввода данных и повторите попытку. |
| `UNKNOWN` | Невозможно совершить платеж. Обратитесь в техническую поддержку по адресу `vkpay_solutions@vk.team`. |
| `VTERM_DISABLED` | Идентификатор получателя платежа `merchant_id` указан некорректно или заблокирован. Обратитесь в техническую поддержку по адресу `vkpay_solutions@vk.team`. |
