# Ключ доступа пользователя

**Раздел:** Использование API → Ключи доступа → Ключ доступа пользователя  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Ключ доступа (токен) пользователя используется для вызова методов VK API от имени определённого пользователя. Он определяет, какие права доступа пользователь предоставил приложению.

Способ получения ключа доступа зависит от типа приложения, из которого выполняется запрос к VK API:

| Способ получения | Для каких приложений | Где использовать |
|---|---|---|
| Событие | Игра или мини-приложение | Клиентская часть игры или мини-приложения |

`VKWebAppGetAuthToken`

| Сервис авторизации VK ID Любое приложение или сайт (Standalone-приложение) | Клиентская или серверная часть приложения |
|---|---|

## Особенности работы

- Срок действия ключа доступа пользователя — 1 час.
- Ключ доступа, полученный через событие `VKWebAppGetAuthToken`, предназначен для вызовов API из клиентской части игры или мини‑приложения.
- Для серверных запросов от имени пользователя используйте ключ, полученный через сервис авторизации VK ID.

## Права доступа

- Права доступа определяют, с какими разделами данных VK может работать ключ доступа. Например, для получения номера телефона пользователя нужен ключ с правами `phone`. Подробнее — в разделе [Права доступа и приватность](https://dev.vk.ru/ru/api/privacy#%D0%9F%D1%80%D0%B0%D0%B2%D0%B0%20%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0%20%D0%B4%D0%BB%D1%8F%20%D0%BA%D0%BB%D1%8E%D1%87%D0%B0%20%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F).
- При получении ключа доступа через сервис авторизации VK ID базовые права доступны сразу после создания приложения. Для получения расширенных прав требуется подтверждение профиля бизнеса.

Часть расширенных прав, например доступ к отдельным пользовательским данным VK ID, может предоставляться после индивидуального согласования. Для запроса таких прав напишите на [devsupport@corp.vk.com](mailto:devsupport@corp.vk.com).

## Получить ключ

### Событие VK Bridge

Если вы запрашиваете ключ доступа пользователя для мини-приложения или игры VK, используйте событие `VKWebAppGetAuthToken` библиотеки VK Bridge.

Подробнее — в документации события [`VKWebAppGetAuthToken`](https://dev.vk.ru/ru/bridge/VKWebAppGetAuthToken) [.](https://dev.vk.ru/ru/bridge/VKWebAppGetAuthToken)

### Сервис авторизации VK ID

Если вы запрашиваете ключ доступа пользователя для работы вашего сервиса или сайта, используйте [сервис авторизации VK ID](https://id.vk.com/about/business/go/).

Вы можете получить ключ одним из способов:

## • C помощью библиотеки VK ID SDK

Шаги получения ключа зависят от типа вашего приложения: [Web](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/web/install), [Android](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/android/install), [iOS](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/ios/install).

## — или — • Без SDK, используя HTTP-запрос

Шаги получения ключа зависят от типа вашего приложения: [Web](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/web/auth-without-sdk), [Android](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/android/auth-without-sdk), [iOS](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/ios/auth-without-sdk).

Мы рекомендуем использовать SDK-библиотеку. Она включает готовый код для отрисовки формы ввода имени пользователя и пароля, а также даёт возможность использовать вход по [One Tap](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/intro/main#Vhod-po-One-Tap).

Если не используете SDK, форму ввода понадобится реализовать самостоятельно, а вход по One Tap будет недоступен. При создании формы необходимо соблюдать [требования VK к](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/guidelines/design-rules) [дизайну кнопки](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/guidelines/design-rules).

При запросе ключа доступа учитывайте права, включённые в настройках приложения в VK ID:

- Базовые — имя, фамилия, фото профиля, пол, дата рождения, почта.
- Расширенные — номер телефона.

Базовые права доступны сразу после создания приложения в сервисе авторизации VK ID. Для получения расширенных прав требуется подтверждение профиля бизнеса. Подробнее о создании приложения и настройке доступов — в [документации VK ID](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/create-application).

## Отозвать ключ доступа пользователя

Если вы создавали ключ доступа пользователя в сервисе авторизации VK ID, вы можете отозвать выданные разрешения. Подробнее — в [документации VK ID](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/api-description#Otzyv-razreshenij-dostupov-polzovatelya-dlya-prilozheniya).

## Материалы по теме

- [Справочник методов API VK ID](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/api-description)
