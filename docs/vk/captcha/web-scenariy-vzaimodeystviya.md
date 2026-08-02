# Сценарий взаимодействия

**Раздел:** VK Captcha → web → Сценарий взаимодействия  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

В статье описаны схема и порядок взаимодействия вашего веб-приложения с VK ID Captcha SDK Web и API ВКонтакте.

Как установить и подключить VK ID Captcha SDK для веб-платформы, смотрите в [инструкции](https://dev.vk.ru/ru/vkcaptcha/web/autointegration).

## Схема взаимодействия

## Порядок взаимодействия

1. Веб-приложение [устанавливает и подключает](https://dev.vk.ru/ru/vkcaptcha/web/autointegration#%D0%A8%D0%B0%D0%B3%201.%20%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0) VK ID Captcha SDK Web.

2. Веб-приложение [интегрирует обработчик ошибки капчи](https://dev.vk.ru/ru/vkcaptcha/web/autointegration#%D0%A8%D0%B0%D0%B3%202.%20%D0%98%D0%BD%D1%82%D0%B5%D0%B3%D1%80%D0%B0%D1%86%D0%B8%D1%8F%20%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA%D0%B0%20%D0%B4%D0%BB%D1%8F%20%D0%BF%D0%B0%D0%BA%D0%B5%D1%82%D0%BD%D0%BE%D0%B3%D0%BE%20%D0%BC%D0%B5%D0%BD%D0%B5%D0%B4%D0%B6%D0%B5%D1%80%D0%B0) в обработчик ответа Web API.

3. Запрос к API ВКонтакте.

4. API ВКонтакте возвращает веб-приложению [ошибку капчи](https://dev.vk.ru/ru/api/captcha-error) с кодом `error_code: 14`, сообщением `error_msg: "Captcha needed"` и ссылкой для инициализации сессии капчи в поле `redirect_uri`.

5. Веб-приложение отправляет в VK ID Captcha SDK Web запрос на отображение капчи с помощью метода [`captchaWidget.show()`](https://dev.vk.ru/ru/vkcaptcha/web/autointegration#captchaWidget.show()) [.](https://dev.vk.ru/ru/vkcaptcha/web/autointegration#captchaWidget.show())

6. VK ID Captcha SDK Web отправляет в Captcha iframe запрос на отображение капчи.

7. Пользователь проходит капчу.

8. API ВКонтакте анализирует действия пользователя. В зависимости от результата возможны варианты:

## • Успешный сценарий: пользователь — человек, прошёл капчу.

1. API ВКонтакте формирует токен успешного прохождения капчи `success_token` и передаёт его в Captcha iframe.

2. Captcha iframe передаёт `success_token` в VK ID Captcha SDK Web.

3. В зависимости от типа отображения капчи `view`, Captcha iframe выполняет одно из действий:

- Закрывает капчу, если она отображена в виде всплывающего окна ( `view = popup`).
- Оставляет капчу на странице, если она отображена в виде блока ( `view = block`). Вы можете настроить закрытие капчи вручную с помощью метода

[`captchaWidget.close()`](https://dev.vk.ru/ru/vkcaptcha/web/autointegration#captchaWidget.close()) [.](https://dev.vk.ru/ru/vkcaptcha/web/autointegration#captchaWidget.close())

4. VK ID Captcha SDK Web возвращает вашему веб-приложению промис с `success_token`.

## 5. Веб-приложение отправляет API ВКонтакте повторный запрос (шаг 1), в ответ на который вернулась ошибка капчи. В запросе нужно передать `success_token` со полученным значением токена. • Неуспешный сценарий: пользователь — бот.

1. API ВКонтакте передаёт в Captcha iframe ошибку.

## 2. Пользователь блокируется. Повторный показ капчи возможен только в рамках новой сессии. • Неуспешный сценарий: пользователь закрыл окно с капчей.

1. API ВКонтакте возвращает в Captcha iframe ошибку.

2. Captcha iframe возвращает в VK ID Captcha SDK Web ошибку.

3. VK ID Captcha SDK Web возвращает промис с ошибкой `error = close`.

9. Веб-приложение отображает пользователю результат прохождения капчи.
