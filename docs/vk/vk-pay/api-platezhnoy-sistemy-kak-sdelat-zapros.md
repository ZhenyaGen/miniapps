# Как сделать запрос

**Раздел:** VK Pay → API платёжной системы → Как сделать запрос  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Все запросы к API системы нужно отправлять по базовому адресу:

`https://api.money.mail.ru/money/2-03/`, где `2-03` — версия API.

К адресу нужно добавить метод, который вы хотите выполнить. Например, для запроса информации о платеже нужно добавить к пути `/transaction/get`. Адрес конечной точки в этом случае: `https://api.money.mail.ru/money/2-03/transaction/get`.

Данные запроса нужно отправлять `POST` -запросом, MIME-тип:

`application/x-www-form-urlencoded`.

Перед отправкой запроса спецсимволы нужно кодировать с помощью [URL Encode](https://www.urlencoder.org/) — согласно стандарту [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986).

Кодировка строк запроса — UTF-8.

## Как отправить запрос

1. Сформируйте тело запроса.

2. [Подпишите запрос](https://dev.vk.ru/ru/pay/seller/request-create/request-sign-creating).

3. Закодируйте спецсимволы в запросе с помощью [URL Encode](https://www.urlencoder.org/).

4. Отправьте запрос.

#### Пример запроса

#### Командная строка

```
$ curl -k -v --data
"data=eyJib2R5Ijp7InRyYW5zYWN0aW9uX2lkIjoiNUI1RkVGOTYtQ0NGRi0xMUVCLUIyQzktRjNG
QjIyMUNEQkUyIn0sImhlYWRlciI6eyJ0cyI6MTcyMTY2Mzc1MiwiY2xpZW50X2lkIjoxOTY2Njl9fQ
%3D%3D&signature=1658b9a8c0e8c86d4e9785e44901a8d30ff59d37&version=2-03"
"https://api.money.mail.ru/money/2-03/transaction/get"
```

## Основные параметры запроса

В теле запроса нужно передать следующие обязательные поля:

- `data` — JSON-объект, закодированный в BASE64-строку без разделителей, содержит:

- `header` — заголовок запроса с параметрами.
- `body` — структура данных запроса. Параметры структуры зависят от запроса.
- `signature` — [подпись запроса](https://dev.vk.ru/ru/pay/seller/request-create/request-sign-creating), сформированная с помощью приватного ключа доступа.

Заголовок `header`

| Параметр | Тип | Описание |
|---|---|---|
| `ts` обязательный | `number` | Временная отметка формирования запроса в формате [Unix Timestamp](https://www.unixtimestamp.com/). Пример: `1714137378` |
| `client_id` обязательный | `number` | Идентификатор продавца в платёжной системе, который выдали вам при [подключении](https://dev.vk.ru/ru/pay/seller/general-description#%D0%9A%D0%B0%D0%BA%20%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D1%8C). Пример: `134028` |

#### Пример тела запроса в формате JSON

```json
{
    "version": "2-03",
    "data": {
       "body": {
          "transaction_id": "5B5FEF96-CCFF-11EB-B2C9-F3FB221CDBE2"
       },
       "header": {
       "ts": 1721663752,
       "client_id": 196669
       }
    },
    "signature":"1658b9a8c0e8c86d4e9785e44901a8d30ff59d37"
}
```
