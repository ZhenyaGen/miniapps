# Сценарий взаимодействия

**Раздел:** VK Captcha → Android → Сценарий взаимодействия  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Сценарий взаимодействия для ручной обработки капчи

Ниже описаны сценарии взаимодействия между мобильным приложением на платформе Android и VK ID Captcha SDK, если вы используете [ручную обработку с помощью listener-интерфейсов](https://dev.vk.ru/ru/vkcaptcha/Android/integration_manual).

Обработка зависит от типа ошибки, которая пришла от API ВКонтакте:

- Ошибка с кодом `14`.
- Заголовки `X-Challenge` и `X-Challenge-Url`.

Как установить и подключить VK ID Captcha SDK Android, смотрите в [инструкции](https://dev.vk.ru/ru/vkcaptcha/Android/integration).

Подробнее о методах и интерфейсах — в [справочнике VK ID SDK Android](https://dev.vk.ru/ru/vkcaptcha/Android/guide).

## Обработка ошибки с кодом `14`

Если пользователь в мобильном приложении слишком часто вызывает какое-то событие, API ВКонтакте может вернуть вашему мобильному приложению [ошибку капчи](https://dev.vk.ru/ru/api/captcha-error#%D0%9E%D1%88%D0%B8%D0%B1%D0%BA%D0%B0%20%D1%81%20redirect_uri) с кодом `"error_code":` `14`, сообщением `"error_msg": "Captcha needed"` и ссылкой для инициализации сессии капчи в поле `redirect_uri`.

#### Схема взаимодействия

#### Порядок взаимодействия

1. Мобильное приложение отправляет запрос к API ВКонтакте.

2. API ВКонтакте возвращает мобильному приложению ошибку капчи с кодом `"error_code": 14`, сообщением `"error_msg": "Captcha needed"` и ссылкой для инициализации сессии капчи в поле `redirect_uri`.

3. Мобильное приложение получает из поля `redirect_uri` ссылку на инициализацию сессии капчи.

4. Мобильное приложение начинает отслеживать результат прохождения капчи с помощью интерфейса [`VKCaptchaResultListener`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResultListener) [.](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResultListener)

5. Мобильное приложение отправляет в VK ID Captcha SDK Android запрос на отображение капчи методом [VKCaptcha.openCaptcha(domain, redirectUri, listener)](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptcha.openCaptcha()).

6. VK ID Captcha SDK Android отправляет в Captcha WebView запрос на отображение капчи.

7. Пользователь проходит капчу.

8. API ВКонтакте анализирует действия пользователя. В зависимости от результата возможны варианты:

## • Успешный сценарий: пользователь — человек, прошёл капчу.

1. API ВКонтакте формирует токен успешного прохождения капчи `success_token` и передаёт его в Captcha WebView.

2. Captcha WebView передаёт `success_token` в VK ID Captcha SDK Android.

3. VK ID Captcha SDK Android закрывает окно капчи методом [`VKCaptcha.closeCaptcha()`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptcha.closeCaptcha()) [.](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptcha.closeCaptcha())

4. VK ID Captcha SDK Android передаёт `success_token` в событии `onResult()` в listener- интерфейсе [`VKCaptchaResultListener`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResultListener), возвращая `VKCaptchaResult.Success(val` `token: String)`.

5. Мобильное приложение отправляет API ВКонтакте повторный запрос, в ответ на который вернулась ошибка капчи (шаг 1), с токеном успешного прохождения капчи `success_token`.

## 6. API ВКонтакте выполняет запрос. • Неуспешный сценарий: пользователь — бот.

1. API ВКонтакте возвращает в Captcha WebView ошибку.

2. В Captcha WebView отображается экран неуспешного прохождения капчи.

3. Пользователь закрывает окно с капчей.

## 4. VK ID Captcha SDK Android возвращает в мобильное приложение событие [`VKCaptchaError.Cancelled`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaError) в listener-интерфейсе [`VKCaptchaResultListener`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResultListener) [.](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResultListener) Пользователь может пройти капчу ещё раз или обратиться в Поддержку. • Неуспешный сценарий: пользователь или бот закрыл окно с капчей.

1. API ВКонтакте возвращает в Captcha WebView ошибку.

2. Captcha WebView уведомляет VK ID Captcha SDK Android о закрытии окна.

## 3. VK ID Captcha SDK Android возвращает в мобильное приложение событие [`VKCaptchaError.Cancelled`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaError) в listener-интерфейсе [`VKCaptchaResultListener`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResultListener) [.](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResultListener) • Неуспешный сценарий: ошибка.

1. API ВКонтакте возвращает в Captcha WebView результат.

2. Captcha WebView уведомляет VK ID Captcha SDK Android об ошибке.

3. VK ID Captcha SDK Android возвращает ошибку [`VKCaptchaResult.Error(val error:`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResult) [`VKCaptchaError?)`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResult) в listener-интерфейсе [`VKCaptchaResultListener`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResultListener) [.](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResultListener)

9. Мобильное приложение отображает пользователю результат прохождения капчи.

## Обработка заголовков `X-Challenge` и `X-Challenge-Url`

В ответ на ваш запрос API ВКонтакте может вернуть вашему мобильному приложению заголовки

`X-Challenge` и `X-Challenge-Url`.

#### Схема взаимодействия

#### Порядок взаимодействия

1. Мобильное приложение отправляет запрос к API ВКонтакте.

2. API ВКонтакте возвращает мобильному приложению заголовки `X-Challenge` и `X-Challenge-` `Url: /challenge.html`.

3. Мобильное приложение начинает отслеживать результат прохождения капчи с помощью интерфейса `VKCaptchaResultListener`.

4. Мобильное приложение отправляет запрос к VK ID Captcha SDK Android методом [`VKCaptcha.getToken()`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptcha.getToken()) для получения токена с указанием домена.

5. VK ID Captcha SDK проверяет наличие токена для переданного домена. Дальнейший сценарий зависит от наличия токена:

## • Токен для этого домена уже есть

1. VK ID Captcha SDK Android передаёт токен вашему мобильному приложению.

2. Мобильное приложение добавляет полученный токен в заголовок `X-Challenge-` `Solution`.

3. Мобильное приложение отправляет API ВКонтакте повторный запрос, в ответ на который вернулась ошибка (шаг 1), с токеном прохождения капчи.

## 4. API ВКонтакте выполняет запрос. • Токена для этого домена ещё нет

1. VK ID Captcha SDK Android возвращает пустое значение в мобильное приложение.

2. Мобильное приложение отправляет в VK ID Captcha SDK Android запрос на отображение капчи методом [`VKCaptcha.openCaptcha(domain, challengeUrl, listener)`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptcha.openCaptcha()). В методе передаётся listener-интерфейс [`VKChallengeResultListener`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResultListener) [.](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResultListener)

3. VK ID Captcha SDK Android открывает Captcha WebView c URL, полученным от мобильного приложения.

4. Пользователь проходит капчу.

5. API ВКонтакте анализирует действия пользователя. В зависимости от результата возможны варианты:

## • Успешный сценарий: пользователь — человек, прошёл капчу.

1. API ВКонтакте формирует токен успешного прохождения капчи `success_token` и передаёт его в Captcha WebView.

2. Captcha WebView передаёт `success_token` в VK ID Captcha SDK Android.

3. VK ID Captcha SDK Android закрывает окно капчи методом [`VKCaptcha.closeCaptcha()`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptcha.closeCaptcha()) [.](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptcha.closeCaptcha())

4. VK ID Captcha SDK Android передаёт `success_token` в событии `VKCaptchaResult.Success(val token: success_token)` в listener-интерфейсе [`VKCaptchaResultListener`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResultListener) [.](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResultListener)

5. Мобильное приложение добавляет токен в заголовок `X-Challenge-Solution:` `<значение_токена>`.

6. Мобильное приложение отправляет API ВКонтакте повторный запрос, в ответ на который вернулась ошибка капчи (шаг 1), с токеном успешного прохождения капчи

`success_token`.

## 7. API ВКонтакте выполняет запрос. • Неуспешный сценарий: пользователь — бот.

1. API ВКонтакте возвращает в Captcha WebView ошибку.

2. В Captcha WebView отображается экран неуспешного прохождения капчи. Пользователь закрывает окно с капчей.

## 3. VK ID Captcha SDK Android возвращает в мобильное приложение событие [`VKCaptchaError.Cancelled`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaError) в listener-интерфейсе [`VKCaptchaResultListener`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResultListener) [.](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResultListener) Пользователь может пройти капчу ещё раз или обратиться в Поддержку. • Неуспешный сценарий: пользователь или бот закрыл окно с капчей.

1. API ВКонтакте возвращает в Captcha WebView результат.

2. Captcha WebView уведомляет VK ID Captcha SDK Android о закрытии окна.

## 3. VK ID Captcha SDK Android возвращает в мобильное приложение событие [`VKCaptchaError.Cancelled`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaError) в listener-интерфейсе [`VKCaptchaResultListener`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResultListener) [.](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResultListener) • Неуспешный сценарий: ошибка.

1. API ВКонтакте возвращает в Captcha WebView результат.

2. Captcha WebView уведомляет VK ID Captcha SDK Android об ошибке.

3. VK ID Captcha SDK Android возвращает ошибку [`VKCaptchaResult.Error(val`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResult) [`error: VKCaptchaError?)`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResult) в listener-интерфейсе [`VKCaptchaResultListener`](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResultListener) [.](https://dev.vk.ru/ru/vkcaptcha/Android/guide#VKCaptchaResultListener)

6. Мобильное приложение отображает пользователю результат прохождения капчи.
