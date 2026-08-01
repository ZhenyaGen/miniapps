# Справочник SDK

**Раздел:** VK Captcha → Android → Справочник SDK  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Справочник VK ID Captcha SDK Android

VK ID Captcha SDK для платформы Android содержит следующие классы, методы и интерфейсы:

- `VKCaptcha` — singleton-класс, главная точка входа для отображения окна капчи, содержит:

- `VKCaptcha.getToken()` – метод, который возвращает токен успешного прохождения капчи.
- `VKCaptcha.openCaptcha()` – метод для отображения окна капчи.
- `VKCaptcha.closeCaptcha()` — метод для закрытия капчи.
- `VKCaptchaResultListener` — listener-интерфейс для отслеживания результата прохождения капчи.
- `VKCaptchaResult` — sealed-класс, который описывает результат прохождения капчи.
- `VKCaptchaError` — sealed-класс, который описывает ошибку прохождения капчи.

`VKCaptcha`

`VKCaptcha` — singleton-класс, главная точка входа для отображения окна капчи. Содержит методы для открытия и закрытия капчи.

```kotlin
object VKCaptcha {
    fun openCaptcha() // открывает экран капчи
    fun closeCaptcha() // закрывает экран капчи
    fun getToken() // возвращает результат — токен успешного прохождения капчи
}
```

VKCaptcha.getToken()

Метод для получения токена прохождения капчи. Мобильное приложение должно вызывать этот метод перед каждым запросом к серверу, при котором пользователю нужно пройти капчу.

После успешного прохождения капчи метод возвращает токен, который вам нужно добавить к API- запросу в заголовке `X-Challenge-Solution`.

Если токена нет, метод возвращает `null`. Подробнее — в [сценарии взаимодействия](https://dev.vk.ru/ru/vkcaptcha/Android/scenario#%D0%9F%D0%BE%D1%80%D1%8F%D0%B4%D0%BE%D0%BA%20%D0%B2%D0%B7%D0%B0%D0%B8%D0%BC%D0%BE%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D1%8F).

```kotlin
object VKCaptcha {
  fun getToken(domain: String): String? // возвращает токен успешного
прохождения капчи
}
```

VKCaptcha.openCaptcha()

Метод для отображения окна капчи.

- `url` – URL, который вы получили из поля `redirect_uri` при обработке [ошибки капчи с кодом](https://dev.vk.ru/ru/api/captcha-error#%D0%9E%D1%88%D0%B8%D0%B1%D0%BA%D0%B0%20%D1%81%20redirect_uri) [`14`](https://dev.vk.ru/ru/api/captcha-error#%D0%9E%D1%88%D0%B8%D0%B1%D0%BA%D0%B0%20%D1%81%20redirect_uri) или при объединении `X-Challenge-Url` с доменом — при обработке заголовков.
- `listener` — интерфейс для отслеживания результата прохождения капчи `VKCaptchaResultListener`.
- `domain` – домен, при запросе к которому пришла капча.

```kotlin
VKCaptcha.openCaptcha(domain, url, listener)
```

VKCaptcha.closeCaptcha()

Метод для закрытия капчи.

```kotlin
VKCaptcha.closeCaptcha()
```

`VKCaptchaResultListener`

Listener-интерфейс для отслеживания результата прохождения капчи. Содержит метод

`onResult(result: VKCaptchaResult)`.

Если пользователь отменит прохождение капчи, внутри `onResult()` вернётся событие

`VKCaptchaError.Cancelled`.

```kotlin
interface VKCaptchaResultListener {
    fun onResult(result: VKCaptchaResult) // результат прохождения капчи
}
```

`VKCaptchaResult`

Sealed-класс, который описывает результат прохождения капчи.

```kotlin
public sealed class VKCaptchaResult {
    /** Успешное прохождение капчи */
    public class Success internal constructor(
        public val token: String, //  success_token успешного прохождения
капчи
        public val domain: String?, // домен, при запросе к которому пришла
капча
    ) : VKCaptchaResult()
   /** Ошибка прохождения капчи */
    public class Error internal constructor(
        public val error: VKCaptchaError, // ошибка прохождения капчи
(например, сетевая ошибка)
        public val domain: String?, // домен, при запросе к которому пришла
капча
    ) : VKCaptchaResult()
}
```

`VKCaptchaError`

Sealed-класс, который описывает ошибку прохождения капчи. Содержит стек-трейс — последовательность вызовов методов, которая привела к ошибке, и описание:

- Поле `message` — сообщение об ошибке.
- Поле `error` — стек-трейс ошибки: описание исключения, которое вызвало ошибку, или `null`, если причина ошибки не связана с исключением.

#### Пример кода в случае ошибки прохождения капчи

```kotlin
public sealed class VKCaptchaError(
    public val message: String, //сообщение об ошибке
    public val error: Throwable?,
) {
    /** Сетевые ошибки */
    public class NetworkError internal constructor(
        message: String,
        error: Throwable? = null
    ) : VKCaptchaError(message, error)
```

```
/** Ошибки в параметрах методов VK ID Captcha SDK*/
public class IllegalArgumentError internal constructor(
    message: String
) : VKCaptchaError(message, IllegalArgumentException(message))
```

```
    /** Если капча была закрыта до попытки её прохождения */
    public class Cancelled internal constructor() : VKCaptchaError("You've
cancelled the captcha flow", null)
}
```
