# Формат ответа

**Раздел:** VK Pay → API платёжной системы → Формат ответа  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

[Платёжная система](https://dev.vk.ru/ru/pay/seller/general-description) возвращает ответ в формате JSON. Кодировка строк ответа — UTF–8.

При получении ответа необходимо [проверить](https://dev.vk.ru/ru/pay/seller/response/sign) его подпись. Данные ответа зависят от [запроса](https://dev.vk.ru/ru/pay/seller/general-description).

В случае ошибки запроса платёжная система вернёт в ответе [код и описание ошибки](https://dev.vk.ru/ru/pay/seller/request-create/errors).

#### Пример ответа

```json
{
  "version":"2-03-
73","data":"eyJoZWFkZXIiOnsic3RhdHVzIjoiRVJST1IiLCJ0cyI6IjE3MjE2NjM3NTUiLCJlcn
JvciI6eyJjb2RlIjoiRVJSX05PVF9GT1VORCIsIm1lc3NhZ2UiOiLQl9Cw0L/RgNC+0YjQtdC90L3Q
sNGPINGC0YDQsNC90LfQsNC60YbQuNGPINC90LUg0L3QsNC50LTQtdC90LAiLCJlcnJvcl9pZCI6Ik
UxMDlCMjc4LTQ4NDItMTFFRi05MkU5LUI3NjgyQTAzQTM2RiJ9fX0=","signature":"chlRZXQWl
oj9ubiKmrxX120+diWRtyS9RxekeVMCJrhdciWe0TD4QAZpfA7R9cCN+GpJLsTDhqBiBpRjXePXOxI
JT+fuHICSZiAf6B27KGKsFkgk7aT+YDdaov6IVD1hoHHwY9++vJNi236nbIYRMhYgA6/RiXWCyXcPi
i8b1SS3eNW/9Nd3CLgFgO5lKZZA0EELnBXAwpRNFxmoLqE1eiSP38aEJhAvZZVn+QAaKx6rsRuc+ht
0awQf+62NEb6rXYwtd3YDM0U+ArFPH3v6Y8U25ZEBLd4gat/pu7F741B4VngZCtQrBd6r17xS/64+V
+dDaLsOnJaLxWQZ1rObkQ=="
}
```

## Основные поля ответа

| Поле | Описание |
|---|---|
| `version` | Актуальная версия API системы, включая минорные изменения. Например, если вы в запросе указали версию `2-03`, в ответе вернётся `2-03-72`. |

`data` Данные ответа в формате JSON, закодированные в BASE64-строку без разделителей. Содержат структуру с полями:
- `header` — заголовок ответа. Структура `header` зависит от результата запроса: успешно или неуспешно. Если статус ответа – `ERROR`, содержит данные об ошибке.
- `body` — набор полей, которые зависят от запроса. Может возвращаться пустым.

`signature` Подпись ответа — формируется на основе объекта `data` по аналогии [с подписью](https://dev.vk.ru/ru/pay/seller/request-sign-creating) [запроса](https://dev.vk.ru/ru/pay/seller/request-sign-creating). При получении ответа подпись необходимо [проверить](https://dev.vk.ru/ru/pay/seller/response/sign).

## Структура заголовка `header` при успешной обработке запроса

При успешной обработке запроса заголовок `header` будет содержать поле `status` со значением

`OK`.

| Поле | Тип | Описание |
|---|---|---|
| `status` | `string` | Результат запроса. В случае успеха принимает значение `OK`. |

`ts` `number` Временная отметка формирования запроса. Формат: число, [Unix Timestamp](https://www.unixtimestamp.com/). Пример: `1714137378`

Пример JSON поля `header`

```json
"header": {
    "ts": 1721663752,
    "status": "OK"
  }
```

## Структура заголовка `header` при ошибке обработки запроса

При ошибке обработки запроса заголовок `header` будет содержать поле `status` со значением

`ERROR` и объект `error` с кодом и описанием ошибки.

| Поле | Тип | Описание |
|---|---|---|
| `status` | `string` | Результат запроса. В случае успеха принимает значения: `ERROR`. |

`ts` `number` Временная отметка формирования ответа в формате [Unix Timestamp](https://www.unixtimestamp.com/). Пример: `1721663755`

`error` `object` [Код и описание ошибки](https://dev.vk.ru/ru/pay/seller/request-create/errors) при ошибке запроса. Ошибка может быть общей или специфичной для этого запроса. Содержит поля:
- `code` — код ошибки. Тип: `string`
- `error_id` – идентификатор ошибки. Тип: `string`
- `message` — описание ошибки. Тип: `string` В случае ошибки в нескольких переданных параметрах `message` может содержать структуру со списком этих параметров в виде пары

`ключ:значение`, где `ключ` – название некорректно переданного параметра в XPath-формате, `значение` – описание ошибки для этого параметра.

Пример JSON поля `header`

```json
"header": {
    "status": "ERROR",
    "ts": "1721663755",
    "error": {
      "code": "ERR_NOT_FOUND",
      "message": "Запрошенная транзакция не найдена",
      "error_id": "E109B278-4842-11EF-92E9-B7682A03A36F"
    }
  }
```
