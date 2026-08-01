# Подключение VK Captcha Android

**Раздел:** VK Captcha → Android → Подключение VK Captcha Android  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Подключение и автообработка капчи

В инструкции описано, как установить и подключить VK ID Captcha SDK для Android-приложения, а также как настроить отображение капчи и обработку результатов с помощью интерсептора:

1. Подключение репозитория.

2. Установление зависимостей.

3. Отображение и обработка капчи.

## Требования

Платформа Android, уровень API – `21` или новее:  `android:minSdkVersion="21"`.

## Шаг 1. Подключение репозитория

Для интеграции используйте maven-репозиторий:

#### Groovy

```
maven {
  url("https://artifactory-external.vkpartner.ru/artifactory/vkid-sdk-
android/")
}
```

## Шаг 2. Установление зависимостей

Подключите зависимости VK ID Captcha SDK Android. Текущая версия `${sdkVersion} = 0.0.5`.

#### Groovy

```
dependencies {
   implementation "com.vk.id.captcha:vkid-captcha:${sdkVersion}"
}
```

В `Android Manifest` вашего приложения переопределите `authority` провайдера, который инициализирует SDK.

```xml
<application>
        <provider
            android:name="com.vk.id.captcha.init.SdkInitContentProvider"
            android:authorities="your.unique.authority"
            android:exported="false"
            tools:replace="authorities" />
    </application>
```

## Шаг 3. Отображение и обработка капчи

После подключения VK ID Captcha SDK Android интегрируйте капчу одним из способов:

- С помощью интерсептора — рекомендуется, если вы используете [`OkHttp`](https://square.github.io/okhttp/) [.](https://square.github.io/okhttp/)
- [С помощью listener-интерфейсов](https://dev.vk.ru/ru/vkcaptcha/Android/integration_manual) — запасной вариант, если вы не используете `OkHttp`.

Независимо от способа интеграции (интерсептор или listener-интерфейс), обработка капчи включает два типа ошибок, которые может вернуть API ВКонтакте:

- [ошибка капчи](https://dev.vk.ru/ru/api/captcha-error#%D0%9E%D1%88%D0%B8%D0%B1%D0%BA%D0%B0%20%D1%81%20redirect_uri) [`14`](https://dev.vk.ru/ru/api/captcha-error#%D0%9E%D1%88%D0%B8%D0%B1%D0%BA%D0%B0%20%D1%81%20redirect_uri) — содержит `"error_code": 14`,   `"error_msg": "Captcha needed"` и ссылку для инициализации сессии капчи в поле `redirect_uri`.
- заголовки `X-Challenge-Solution` и `X-Challenge-Url`   — содержат ссылку для инициализации сессии капчи.

### C помощью интерсепторов (рекомендуется)

Этот способ интеграции подходит, если вы используете [`OkHttp`](https://square.github.io/okhttp/). Добавьте интерсептор, который реализован в VK ID Captcha SDK Android:

```kotlin
OkHttpClient.Builder()
    ...
    .addInterceptor(
        CaptchaHandlingInterceptor(
            domains = setOf("api.vk.ru") // Список доменов, для которых должна
обрабатываться ошибка капчи (опционально). По умолчанию обрабатываются все
домены
        )
    )
    ...
    .build()
```

Если этот интерсептор вам не походит, вы можете [реализовать свой](https://dev.vk.ru/ru/vkcaptcha/Android/integration_manual#%D0%A1%D0%B0%D0%BC%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F%20%D0%B8%D0%BD%D1%82%D0%B5%D0%B3%D1%80%D0%B0%D1%86%D0%B8%D1%8F%20%D1%81%20%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E%20%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D1%81%D0%B5%D0%BF%D1%82%D0%BE%D1%80%D0%BE%D0%B2).
