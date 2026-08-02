# Работа с API Одноклассников

**Раздел:** Одноклассники → Разработка → Работа с API Одноклассников  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Формат запроса к API Одноклассников и способ авторизации зависят от контекста работы:

- От имени пользователя. Запросы отправляются из клиентского приложения через VK Bridge.
- От имени приложения. Запросы отправляются напрямую в REST API и подписываются параметром

`sig`.

## Вызовы API на стороне клиента

Для вызовов API Одноклассников от имени пользователя используйте [VK Bridge](https://dev.vk.ru/ru/bridge/overview) в клиентском приложении:

1. Получите ключ доступа пользователя при помощи события `VKWebAppGetAuthToken`.

2. Чтобы выполнить запрос к API Одноклассников, используйте событие `VKWebAppCallAPIMethod`.

### Запрос ключа доступа

Чтобы получить ключ доступа пользователя в Одноклассниках, используйте событие

[`VKWebAppGetAuthToken`](https://dev.vk.ru/ru/bridge/VKWebAppGetAuthToken) с параметром `append_local=true`. Ключ доступа вернётся в поле `local_access_token`:

```js
bridge.send('VKWebAppGetAuthToken', {
  app_id: 1234567,
  scope: 'friends',
  append_local: true
  })
  .then( (data) => {
    if (data.local_access_token) {
      // Ключ доступа пользователя ОК получен
    }
  })
  .catch( (error) => {
    // Ошибка
    console.log(error);
  });
```

### Выполнение запроса

С помощью [`VKWebAppCallAPIMethod`](https://dev.vk.ru/ru/bridge/VKWebAppCallAPIMethod) вы можете отправлять запросы к API Одноклассников из клиентской части вашего приложения. Для этого необходимо добавить параметр

`use_local=true` и передать ключ доступа пользователя в Одноклассниках в параметре `access_token`:

```js
bridge.send('VKWebAppCallAPIMethod', {
  use_local: true
  method: 'users.getInfo',
  params: {
    uids: 123456789,
    fields: "first_name,last_name"
    access_token: 'ключ_доступа_пользователя_OK'
  }})
  .then((data) => {
    if (data.response) {
      // Метод API выполнен
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
```

## Вызовы API на стороне сервера

Для вызовов API Одноклассников от имени приложения:

1. В панели управления приложением получите публичный и защищённый ключи.

2. Вычислите подпись на основе параметров запроса и защищённого ключа.

### Синтаксис запросов

Для обращения к [API Одноклассников](https://apiok.ru/dev/methods/rest/) используются HTTP-запросы `GET` или `POST`. Любой метод API Одноклассников можно вызывать одним из двух равнозначных способов, указав:

- Имя метода в параметре `method`:

```
https://api.ok.ru/fb.do?method=<имя_метода>&application_key=
<публичный_ключ>&format=json&params1=value1&params2=value2&sig=
<подпись_запроса>
```

- Группу и имя метода в пути URL:

```
https://api.ok.ru/api/<группа_метода>/<имя_метода>?application_key=
<публичный_ключ>&format=json&params1=value1&params2=value2&sig=
<подпись_запроса>
```

### Общие параметры

Параметры, которые необходимы для выполнения запроса:

**Параметр | Описание**

`application_key` Публичный ключ приложения из панели управления.
- [Настройки игр](https://dev.vk.ru/ru/games/settings/development/keys#%D0%9F%D1%83%D0%B1%D0%BB%D0%B8%D1%87%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BB%D1%8E%D1%87)
- [Настройки мини-приложений](https://dev.vk.ru/ru/mini-apps/settings/development/keys#%D0%9F%D1%83%D0%B1%D0%BB%D0%B8%D1%87%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BB%D1%8E%D1%87)

`application_secret_key` Защищённый ключ приложения из панели управления.
- [Настройки игр](https://dev.vk.ru/ru/games/settings/development/keys#%D0%97%D0%B0%D1%89%D0%B8%D1%89%D1%91%D0%BD%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BB%D1%8E%D1%87)
- [Настройки мини-приложений](https://dev.vk.ru/ru/mini-apps/settings/development/keys#%D0%97%D0%B0%D1%89%D0%B8%D1%89%D1%91%D0%BD%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BB%D1%8E%D1%87)

`sig` Подпись запроса. Подпись необходимо сформировать из защищённого ключа приложения и параметров метода.
- Вычисление подписи запроса

`format` Формат ответа. Всегда используйте `json`.

### Вычисление подписи запроса

Чтобы вызвать метод от имени приложения, вычислите подпись запроса — значение параметра

`sig`. Для вычисления подписи используются публичный и защищённый ключ из панели управления приложением, а также все параметры запроса.

Важно! Если вы измените любой параметр в запросе, значение `sig` необходимо пересчитать заново.

Пример. Вычисление подписи запроса для метода [`users.getInfo`](https://apiok.ru/dev/methods/rest/users/users.getInfo) с параметрами:

- `uids=123456789`
- `fields=first_name,last_name`

Чтобы вычислить подпись запроса:

1. Отсортируйте имена всех параметров запроса по алфавиту:

```
application_key=<публичный_ключ>
```

```
fields=first_name,last_name
```

```
format=json
```

```
method=users.getInfo
```

```
uids=123456789
```

2. Сформируйте строку, записав пары `ключ=значение` в алфавитном порядке, без разделителей.

```
application_key=
<публичный_ключ>fields=first_name,last_nameformat=jsonmethod=users.getInfou
ids=123456789
```

3. Добавьте в конец строки защищённый ключ `application_secret_key`:

```
application_key=
<публичный_ключ>fields=first_name,last_nameformat=jsonmethod=users.getInfou
ids=123456789<защищенный_ключ>
```

4. Чтобы получить значение подписи запроса `sig`, вычислите MD5 от строки из п. 3 и запишите результат как 32‑символьное шестнадцатеричное значение. Полученное значение передавайте в запросе в параметре `sig`:

```
https://api.ok.ru/fb.do?method=users.getInfo&application_key=
<публичный_ключ>&format=json&uids=123456789&fields=first_name,last_name&sig
=<подпись_запроса>
```

### Примеры

В примерах показаны вычисление подписи запроса и вызов метода [`users.getInfo`](https://apiok.ru/dev/methods/rest/users/users.getInfo) с параметрами:

```json
{
    uids: '123456789',
    fields: 'first_name,last_name'
}
```

#### Вызов метода в Node.js

```js
const crypto = require('node:crypto');
```

```
const OK_API_URL = 'https://api.ok.ru/fb.do';
```

```
const APP_CONFIG = {
    applicationKey: process.env.OK_APPLICATION_KEY,
    applicationSecretKey: process.env.OK_APPLICATION_SECRET_KEY
};
```

```
/**
 * Создаёт подпись запроса к API Одноклассников.
 *
 * 1. Сортирует параметры по имени.
 * 2. Склеивает их в строку key=value.
 * 3. Добавляет к строке защищённый ключ приложения.
 * 4. Вычисляет MD5.
 */
function generateSignature(params, secretKey) {
    const paramString = Object.keys(params)
        .sort()
        .map(key => `${key}=${params[key]}`)
        .join('');
```

```
    return crypto
        .createHash('md5')
        .update(paramString + secretKey)
        .digest('hex');
}
```

```
async function callOkApi(method, customParams = {}) {
    const params = {
        ...customParams,
        application_key: APP_CONFIG.applicationKey,
        method
    };
```

```
params.sig = generateSignature(
    params,
    APP_CONFIG.applicationSecretKey
);
```

```
const response = await fetch(OK_API_URL, {
    method: 'POST',
    body: new URLSearchParams(params)
});
```

```
if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
}
```

```
const data = await response.json();
```

```
if (data.error_code) {
    throw new Error(
        `Ошибка OK API #${data.error_code}: ${data.error_msg}`
    );
}
```

```
    return data;
}
const params = {
    uids: '123456789',
    fields: 'first_name,last_name'
}
callOkApi('users.getInfo', params)
    .then(data => console.log(data))
    .catch(error => console.error(error.message));
```

#### Вызов метода на Go

```go
package main
```

```
import (
    "crypto/md5"
    "encoding/hex"
    "fmt"
    "io"
    "net/http"
    "net/url"
    "sort"
    "strings"
)
```

```
const okAPIURL = "https://api.ok.ru/fb.do"
```

```
var appConfig = struct {
    ApplicationKey       string
    ApplicationSecretKey string
}{
    ApplicationKey:       os.Getenv("OK_APPLICATION_KEY"),
    ApplicationSecretKey: os.Getenv("OK_APPLICATION_SECRET_KEY"),
}
```

```
// generateSignature создаёт подпись запроса к API Одноклассников.
//
// 1. Сортирует параметры по имени.
// 2. Склеивает их в строку key=value.
// 3. Добавляет к строке защищённый ключ приложения.
// 4. Вычисляет MD5.
func generateSignature(params map[string]string, secretKey string) string {
    keys := make([]string, 0, len(params))
```

```
for key := range params {
    keys = append(keys, key)
}
```

```
sort.Strings(keys)
```

```
var builder strings.Builder
```

```
for _, key := range keys {
    builder.WriteString(key)
    builder.WriteByte('=')
    builder.WriteString(params[key])
}
```

```
builder.WriteString(secretKey)
```

```
hash := md5.Sum([]byte(builder.String()))
```

```
    return hex.EncodeToString(hash[:])
}
```

```
func callOkAPI(method string, customParams map[string]string) ([]byte, error)
{
    params := make(map[string]string, len(customParams)+3)
```

```
for key, value := range customParams {
    params[key] = value
}
```

```
params["application_key"] = appConfig.ApplicationKey
params["method"] = method
params["sig"] = generateSignature(
    params,
    appConfig.ApplicationSecretKey,
)
```

```
form := url.Values{}
```

```
for key, value := range params {
    form.Set(key, value)
}
```

```
    response, err := http.PostForm(okAPIURL, form)
    if err != nil {
        return nil, fmt.Errorf("не удалось выполнить запрос к OK API: %w",
err)
    }
    defer response.Body.Close()
```

```
body, err := io.ReadAll(response.Body)
if err != nil {
    return nil, fmt.Errorf("не удалось прочитать ответ OK API: %w", err)
}
```

```
if response.StatusCode < 200 || response.StatusCode >= 300 {
    return nil, fmt.Errorf(
        "OK API вернул HTTP %d: %s",
        response.StatusCode,
        body,
    )
}
```

```
    return body, nil
}
```

```
func main() {
    params := map[string]string{
        "uids":   "123456789",
        "fields": "first_name,last_name",
    }
```

```
data, err := callOkAPI("users.getInfo", params)
if err != nil {
    fmt.Println(err)
    return
}
```

```
    fmt.Println(string(data))
}
```

## Материалы по теме

- [Справочник API Одноклассников](https://apiok.ru/dev/methods/rest/)
- [Ключи доступа (настройки игр)](https://dev.vk.ru/ru/games/settings/development/keys)
- [Ключи доступа (настройки мини-приложений)](https://dev.vk.ru/ru/mini-apps/settings/development/keys)
- [Библиотека VK Bridge](https://dev.vk.ru/ru/bridge/overview)
- [`VKWebAppCallAPIMethod`](https://dev.vk.ru/ru/bridge/VKWebAppCallAPIMethod)
- [`VKWebAppGetAuthToken`](https://dev.vk.ru/ru/bridge/VKWebAppGetAuthToken)
