# Подключение

**Раздел:** VK ID Captcha → Web → Подключение  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Установка и подключение VK ID Captcha SDK для веб

В инструкции описано, как установить и подключить VK ID Captcha SDK для веб-платформы, а также автоматически настроить отображение капчи и обработку результатов с помощью обработчика. Подробнее об ошибке — в статье [Ошибка с Captcha](https://dev.vk.ru/ru//api/captcha-error).

Перед началом работы ознакомьтесь со [сценарием взаимодействия](https://dev.vk.ru/ru/vkcaptcha/web/scenario) с VK ID Captcha SDK Web и требованиями к программному обеспечению.

Затем интегрируйте VK ID Captcha SDK Web одним из двух способов: с помощью пакетного менеджера (рекомендуется) или скрипта-загрузчика.

## Поддерживаемые версии браузеров

| Браузер | Версия |
|---|---|
| Google Chrome | 63 или новее |
| iOS Google Chrome | 12 или новее |
| Mozilla Firefox | 55 или новее |
| Microsoft Edge | 79 или новее |
| Opera | 50 или новее |
| Safari | 12 или новее |
| Samsung Internet | 8.2 или новее |

## С помощью пакетного менеджера

### Шаг 1. Установка

1. Для установки npm-пакета нужно настроить реестр npm-пакетов для `@vkid`:

#### Командная строка

```
npm install @vkid/captcha
```

2. Чтобы подключить VK ID Captcha SDK Web, установите npm-пакет `@vkid/captcha` через один из пакетных менеджеров:

- npm

#### Командная строка

```
npm i @vkid/captcha
```

- yarn

#### Командная строка

```
yarn add @vkid/captcha
```

- pnpm

#### Командная строка

```
pnpm add @vkid/captcha
```

### Шаг 2. Интеграция обработчика для пакетного менеджера

После подключения VK ID Captcha SDK Web интегрируйте обработчик ошибки капчи в обработчик ответа Web API.

Ниже приведены примеры интеграции с автоматическим и ручным созданием виджета капчи.

#### Интеграция обработчика с автосозданием виджета капчи

```js
import { checkCaptchaError, CheckCaptchaType } from "@vkid/captcha";
```

```
function api(url: string, bodyParams: { [key: string]: any }) {
  fetch(url, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyParams),
  }).then(async (response) => {
    const responseResult = await response.json();
```

```
// Вызов обработчика ошибки капчи
const { captchaType, captchaWidget } = checkCaptchaError({
  responseHeaders: response.headers,
  url: response.url,
  responseError: responseResult.error,
  withWidget: true,
});
```

```
    // Известная ошибка капчи
    if (captchaType && captchaType !== CheckCaptchaType.UNKNOWN) {
      try {
        const successToken = await captchaWidget.show({
          container: document.body,
          view: 'popup',
        });
        // Повторный POST-запрос к API ВКонтакте, в который надо добавить
success_token: <Полученное значение токена>
        api(url, {
          ...bodyParams,
          success_token: successToken,
        });
```

```
      } catch (error) {
        if (error === 'close') {
          // Обработка закрытия капчи в случае неуспешного прохождения или
закрытия капчи пользователем
        } else {
          // Обработка внутренней ошибки капчи
        }
      }
    }
```

```
    // Неизвестная ошибка капчи
    if (captchaType === CheckCaptchaType.UNKNOWN) {
      //  Ваша реализация обработки неизвестной ошибки (VK ID Captcha SDK не
обрабатывает такие ошибки)
    }
  });
}
```

#### Интеграция обработчика с ручным созданием виджета капчи

```js
import { CaptchaWidget, checkCaptchaError, CheckCaptchaType } from
"@vkid/captcha";
```

```
function api(url: string, bodyParams: { [key: string]: any }) {
  fetch(url, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyParams),
  }).then(async (response) => {
    const responseResult = await response.json();
```

```
// Вызов обработчика ошибки капчи
const { captchaType } = checkCaptchaError({
  responseHeaders: response.headers,
  url: response.url,
  responseError: responseResult.error,
  withWidget: false,
});
```

```
// Известная ошибка капчи
if (captchaType && captchaType !== CheckCaptchaType.UNKNOWN) {
  try {
    const captchaWidget = new CaptchaWidget();
    const successToken = await captchaWidget.show({
      container: document.body,
      captchaType: captchaType,
      view: 'popup',
    });
```

```
        // Повторный POST-запрос к API ВКонтакте, в который надо добавить
success_token: <Полученное значение токена>
        api(url, {
          ...bodyParams,
          success_token: successToken,
        });
      } catch (error) {
        if (error === 'close') {
          // Обработка закрытия капчи в случае неуспешного прохождения или
закрытия капчи пользователем
        } else {
          // Обработка внутренней ошибки капчи
        }
      }
    }
```

```
    // Неизвестная ошибка капчи
    if (captchaType === CheckCaptchaType.UNKNOWN) {
      // Ваша реализация обработки неизвестной ошибки (VK ID Captcha SDK не
обрабатывает такие ошибки)
    }
  });
}
```

## С помощью скрипта-загрузчика

### Шаг 1. Установка и инициализация

1. Чтобы установить VK ID Captcha SDK Web, добавьте скрипт-загрузчик в код вашего приложения:

```js
<script src="https://static.vk.ru/captchaSDK/loader/1/umd/index.js">
</script>
```

`1` — версия скрипта.

После установки VK ID Captcha SDK Web будет доступен в объекте `window.vkidCaptcha`, где

`vkidCaptcha` — промис.

2. Инициализируйте VK ID Captcha SDK Web:

```js
const { CaptchaWidget } = await window.vkidCaptcha;
```

### Шаг 2. Интеграция обработчика для скрипта-загрузчика

После подключения VK ID Captcha SDK Web интегрируйте обработчик ошибки капчи в обработчик ответа Web API.

Ниже приведены примеры интеграции с автоматическим и ручным созданием виджета капчи.

#### Интеграция обработчика с автосозданием виджета капчи

```js
function api(url: string, bodyParams: { [key: string]: any }) {
  fetch(url, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyParams),
  }).then(async (response) => {
    const responseResult = await response.json();
```

```
const { checkCaptchaError } = await window.vkidCaptcha;
```

```
// Вызов обработчика ошибки капчи
const { captchaType, captchaWidget } = checkCaptchaError({
  responseHeaders: response.headers,
  url: response.url,
  responseError: responseResult.error,
  withWidget: true,
});
```

```
// Известная ошибка капчи
if (captchaType && captchaType !== 'unknown') {
  try {
    const successToken = await captchaWidget.show({
      container: document.body,
      view: 'popup',
    });
```

```
        // Повторный POST-запрос к API ВКонтакте, в который надо добавить
success_token: <Полученное значение токена>
        api(url, {
          ...bodyParams,
          success_token: successToken,
        });
      } catch (error) {
        if (error === 'close') {
          // Обработка закрытия капчи в случае неуспешного прохождения или
закрытия капчи пользователем
        } else {
          // Обработка внутренней ошибки капчи
        }
      }
    }
```

```
    // Неизвестная ошибка капчи
    if (captchaType === 'unknown') {
      //  Ваша реализация обработки неизвестной ошибки (VK ID Captcha SDK не
обрабатывает такие ошибки)
    }
  });
}
```

#### Интеграция обработчика с ручным созданием виджета капчи

```js
function api(url: string, bodyParams: { [key: string]: any }) {
  fetch(url, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyParams),
  }).then(async (response) => {
    const responseResult = await response.json();
```

```
const { CaptchaWidget, checkCaptchaError } = await window.vkidCaptcha;
```

```
// Вызов обработчика ошибки капчи
const { captchaType } = checkCaptchaError({
  responseHeaders: response.headers,
  url: response.url,
  responseError: responseResult.error,
  withWidget: false,
});
```

```
// Известная ошибка капчи
if (captchaType && captchaType !== 'unknown') {
  try {
    const captchaWidget = new CaptchaWidget();
    const successToken = await captchaWidget.show({
      container: document.body,
      captchaType: captchaType,
      view: 'popup',
    });
```

```
        // Повторный POST-запрос к API ВКонтакте, в который надо добавить
success_token: <Полученное значение токена>
        api(url, {
          ...bodyParams,
          success_token: successToken,
        });
      } catch (error) {
        if (error === 'close') {
          // Обработка закрытия капчи в случае неуспешного прохождения или
закрытия капчи пользователем
        } else {
          // Обработка внутренней ошибки капчи
        }
      }
    }
```

```
    // Неизвестная ошибка капчи
    if (captchaType === 'unknown') {
      // Ваша реализация обработки неизвестной ошибки (VK ID Captcha SDK не
обрабатывает такие ошибки)
    }
  });
}
```

## Методы VK ID Captcha SDK при автообработке

- Проверить ответ на наличие ошибок капчи — `checkCaptchaError()`.
- Отображение капчи – `captchaWidget.show()`.

- Закрытие капчи – `captchaWidget.close()`.

checkCaptchaError()

Функция для проверки ответа API на наличие ошибки капчи. Возвращает результат проверки:

- Тип капчи  `captchaType`, если проверка выявила ошибку капчи.
- Виджет капчи  `captchaWidget`, если тип капчи известен VK ID Captcha SDK Web.

Если пользователь успешно прошёл капчу, VK ID Captcha SDK пришлёт callback-уведомление

`onClose()` и, в зависимости от типа отображения капчи `view`, выполнит одно из действий:

- Закроет капчу, если она отображена в виде всплывающего окна ( `view = popup`).
- Оставит капчу на странице, если она отображена в виде блока ( `view = block`).

Если вы хотите закрывать окно капчи вручную, используйте метод `captchaWidget.close()`.

#### Параметры запроса

| Параметр Тип данных | Описание |
|---|---|
| `responseHeaders` обязательный | `Headers` Заголовки запроса API. |
| `url` обязательный | `string` URL запроса API. |
| `responseError` обязательный | `object` Данные ошибки, которые вы получили в ответе на запрос к API ВКонтакте. Подробнее — в `responseError`. |
| `withWidget` необязательный | `boolean` Флаг создания виджета капчи. Доступные значения: - `true` – необходимо создать и вернуть инстанс виджета капчи. - `false` – инстанс капчи создавать не нужно. |

Параметр `responseError`

В параметре нужно передавать данные ошибки, которые вы получили в ответе на запрос к API ВКонтакте.

#### Тип данных параметра

```json
{
  error_code: number | null;
  redirect_uri?: string;
}
```

Если ошибка, которую вы получили в ответе на запрос к API, не соответствует полученному типу, то вам необходимо самостоятельно определить, что это за ошибка.

Если полученный ответ — это ошибка капчи, вам нужно привести её к виду:

```json
{
  error_code: responseData.errorType === 'captcha' ? 14 : null,
  redirect_uri: responseData.redirect_uri,
}
```

#### Параметры ответа

| Параметр | Тип данных | Описание |
|---|---|---|
| `captchaType` `CheckCaptchaType` или | Тип капчи. | Возможные значения `CheckCaptchaType`: - `type_1`, `type_2` — известные типы капчи. - `unknown` — неизвестный тип капчи. Вам необходимо самостоятельно отобразить капчу. Для данного типа `captchaWidget` не возвращается. |

`null`

| `captchaUrl` `string` или | URL капчи. Возвращается только для типов |
|---|---|

`captchaType`: `type_1` ' и `type_2`.

`undefined`

`captchaWidget` `CaptchaWidget` Виджет капчи.

captchaWidget.show()

Метод для отображения капчи. Возвращает промис с результатом прохождения капчи:

- Токен `success_token`, если пользователь успешно прошёл капчу.
- Ошибку `error` = `close`, если пользователь закрыл окно капчи.

Если пользователь успешно прошёл капчу, VK ID Captcha SDK пришлёт callback-уведомление

`onClose()` и, в зависимости от типа отображения капчи `view`, выполнит одно из действий:

- Закроет капчу, если она отображена в виде всплывающего окна ( `view = popup`).
- Оставит капчу на странице, если она отображена в виде блока ( `view = block`).

Если вы хотите закрывать окно капчи вручную, используйте метод `captchaWidget.close()`.

#### Схема запроса

```json
{
  container: HTMLElement; // HTML-элемент, в который будет вставлен виджет
  view: 'popup' | 'block'; // Режим отображения
  autofocus: true | false; // Флаг автофокуса капчи при её отображении.
Используется, только если view: `block`
  scheme?: 'light' | 'dark'; // Цветовая схема виджета
  lang?: string; // Локализация
  onClose?: () => {} // Callback-уведомление, срабатывает при автоматическом
закрытии виджета
}
```

#### Параметры запроса

| Параметр | Тип данных | Описание |
|---|---|---|
| `container` обязательный | `HTMLElement` | HTML-элемент, в который будет вставлен виджет. |
| `view` обязательный | `string` | Внешний вид капчи: - `popup` — всплывающее окно. - `block` — блок (доступно только для `captchaType =` `type_1`). |
| `autofocus` необязательный | `boolean` | Флаг, который отвечает за автофокусировку капчи. Используется, только если `view` присвоено значение `block`. Если флаг включён, фокус на странице будет перемещён на веб- элемент с капчей. Если флаг выключен, фокус на странице останется на том же месте, где и был до появления капчи. Доступные значения: - `true` — автофокус включён (по умолчанию). - `false` — автофокус выключен. |
| `scheme` необязательный | `string` | Цветовая схема виджета: - `light` — светлая. - `dark` — тёмная. По умолчанию соответствует схеме страницы или приложения, куда интегрирована капча. |
| `lang` необязательный | `string` | Язык локализации. Если не передать значение, оно будет определено на сервере. Доступные значения: - `ru` – русский. - `uk` – украинский. - `en` – английский. - `es` – испанский. - `de` – немецкий. - `pl` – польский. - `fr` – французский. - `uz` – узбекский. - `tr` – турецкий. - `kk` – казахский. - `be` – белорусский. |

Пример: `ru`

| `onClose` необязательный | `() => void` Callback-уведомление о закрытии капчи, вызывается после закрытия капчи. |
|---|---|

#### Схема ответа

```js
promise resolve <token>
promise reject <error>
```

#### Параметры ответа

| Параметр | Тип данных | Описание |
|---|---|---|
| `token` | `string` | Токен успешного прохождения капчи `success_token`. |
| `error` | `string` | Ошибка `сlose`, если пользователь закрыл капчу. |

captchaWidget.close()

Метод для ручного закрытия капчи. В ответе ничего не возвращается.

#### Пример вызова метода

```js
captchaWidget.close();
```
