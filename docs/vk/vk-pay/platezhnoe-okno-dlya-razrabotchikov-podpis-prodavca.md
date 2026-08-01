# Подпись продавца

**Раздел:** VK Pay → Платёжное окно → Для разработчиков → Подпись продавца  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Как сформировать подпись продавца

Подпись продавца `merchant_sign` передаётся как параметр внутри [JSON-объекта](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/payment-create#%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20data) [`data`](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/payment-create#%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20data) и гарантирует, что платёжное окно было сформировано с ведома продавца и он готов к получению платежа с указанной суммой и номером заказа, а также к начислению кешбэка в указанное время и в указанном размере.

`merchant_sign` — это SHA256-хеш от конкатенации строк `merchant_data` и `merchant_private_key`, где:

- `merchant_private_key` — приватный ключ продавца, который вы получаете после заключения договора с платёжной системой;
- `merchant_data` — BASE64-строка от JSON-объекта, который включает в себя параметры платёжного окна.

```
$merchant_sign = sha256($merchant_data.$merchant_private_key)
```

Чтобы сформировать подпись продавца:

1. Сформируйте объект `merchant_data`.

2. Закодируйте поле `data`.

3. Сконкатенируйте поле `data` с приватным ключом.

4. Вычислите криптографический хеш SHA256 в HEX-представлении.

## Шаг 1. Сформируйте JSON-объект `merchant_data`

JSON-объект `merchant_data` включает в себя [параметры платёжного окна](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/payment-create#%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20%D0%BF%D0%BB%D0%B0%D1%82%D0%B5%D0%B6%D0%B0): `amount`, `cashback`,

`currency`, `order_id` и `ts`. Других параметров в `merchant_data` быть не должно.

Пример JSON-объект `merchant_data`

```json
{
  "order_id": "1554384451.84747666",
  "cashback": {
    "pay_time": 1554384571,
    "amount_percent": "30"
  },
  "ts": 1554384451,
  "amount": "1",
  "currency": "RUB"
}
```

## Шаг 2. Закодируйте сформированный объект поле `merchant_data` в BASE64-строку

Пример поля `merchant_data`, закодированного в BASE64-строку

```
eyJvcmRlcl9pZCI6IjE1NTQzODQ0NTEuODQ3NDc2NjYiLCJjYXNoYmFjayI6eyJwYXlfdGltZSI6MT
U1NDM4NDU3MSwiYW1vdW50X3BlcmNlbnQiOiIzMCJ9LCJ0cyI6MTU1NDM4NDQ1MSwiYW1vdW50Ijoi
MSIsImN1cnJlbmN5IjoiUlVCIn0=
```

## Шаг 3. Сконкатенируйте полученную на предыдущем шаге BASE64-строку с приватным ключом продавца

Приватный ключ продавца `merchant_private_key`: 627fdbfa24232a5b62f9c295baa93f7db9752873.

Пример конкатенации поля `data` и приватного ключа

```
eyJvcmRlcl9pZCI6IjE1NTQzODQ0NTEuODQ3NDc2NjYiLCJjYXNoYmFjayI6eyJwYXlfdGltZSI6MT
U1NDM4NDU3MSwiYW1vdW50X3BlcmNlbnQiOiIzMCJ9LCJ0cyI6MTU1NDM4NDQ1MSwiYW1vdW50Ijoi
MSIsImN1cnJlbmN5IjoiUlVCIn0=627fdbfa24232a5b62f9c295baa93f7db9752873
```

## Шаг 4. От полученной после объединения строки вычислите криптографический хеш SHA256 в HEX-представлении

```
86ebbd9e89f81e62db6e724707ace59b27fc4756
```

Готово! Используйте полученное значение [при отправке запроса](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/payment-create#%D0%A8%D0%B0%D0%B3%203.%20%D0%9E%D1%82%D0%BF%D1%80%D0%B0%D0%B2%D1%8C%D1%82%D0%B5%20%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%20%D0%BD%D0%B0%20%D0%BE%D1%82%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BB%D0%B0%D1%82%D1%91%D0%B6%D0%BD%D0%BE%D0%B3%D0%BE%20%D0%BE%D0%BA%D0%BD%D0%B0%20VK%C2%A0Pay) в параметре

[`params.data.merchant_sign`](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/payment-create#%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20data) [.](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/payment-create#%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20data)
