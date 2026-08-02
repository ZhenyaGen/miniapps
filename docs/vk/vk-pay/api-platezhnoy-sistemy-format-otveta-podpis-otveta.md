# Подпись ответа

**Раздел:** VK Pay → API платёжной системы → Формат ответа → Подпись ответа  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Как проверить подпись ответа

Платёжная система генерирует подпись [ответа на запрос](https://dev.vk.ru/ru/pay/seller/response) с помощью OpenSSL (алгоритм RSA) с использованием приватного ключа системы.

При обработке ответа нужно проверить подлинность подписи с помощью публичного ключа, который вы получили при заключении договора.

Чтобы проверить подпись ответа:

1. Декодируйте подпись, полученную в ответе в поле `signature`, из формата BASE64 в двоичную строку.

2. Проверьте подпись с помощью данных ответа в поле `data` и публичного ключа. Например, при помощи утилиты OpenSSL:

## Вызов утилиты OpenSSL для проверки подписи

#### Командная строка

```
$ openssl dgst -verify /tmp/rsa.pub -keyform PEM -sha256 -signature /tmp/sign
-binary /tmp/data
```

- `/tmp/rsa.pub` — публичный ключ системы.
- `/tmp/sign` — подпись ответа `signature` в бинарном виде, её нужно декодировать из формата BASE64.
- `/tmp/data` — данные ответа `data` в формате BASE64.

## Пример проверки подписи ответа

#### Пример ответа

```bash
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

#### Пример публичного ключа

```
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv1Q6ogYGK9bNy9MZvx/a
5fYovrdvNLVoFBNMqvBMlcekKx47bpiDR/t00lZqYDEfIwCfA9XSrzmi5Yjio3EV
cjgY0+R0BVXLzdcHuxMMSkqM5JXXaN9WbbblOVS+QyjWIO57slS1fzQ9nEBISvVb
3JSaPKhjY8K2jZ+47GbwIyhT+FpoNF5eC7NApcS95xt4WGsDLNBBFhURtRr+BsgA
nQ4EgwT5ltIpRfHsYn2sSGcKy6slMExQgoXX9McpGPm5TjVsA+n7IXQ4JYLzyklm
gJ3QfQsmT4UtaS/ZT6lRXICvuf7v9eFGmY2u4KVhS4TyBUB7BB/2iCdmda02rxnL
gQIDAQAB
-----END PUBLIC KEY-----
```

#### Результат проверки подписи ответа с помощью утилиты OpenSSL

#### Командная строка

```
$ openssl dgst -verify /tmp/rsa.pub -keyform PEM -sha256 -signature /tmp/sign
-binary /tmp/data
Verified OK
```
