# API-вызовы в игре

**Раздел:** VK Games → Разработка → API-вызовы в игре  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## API-вызовы в играх

Чтобы обмениваться данными с платформой и отправлять запросы, используйте [события](https://dev.vk.ru/ru/bridge/overview) [библиотеки VK Bridge](https://dev.vk.ru/ru/bridge/overview), [методы API ВКонтакте](https://dev.vk.ru/ru/reference) или [API Одноклассников](https://apiok.ru).

API-cерверы ВКонтакте используют адрес `api.vk.ru`. API-серверы Одноклассников —

`api.ok.ru`.

Мы рекомендуем определять адрес сервера динамически.

Чтобы определять адрес во время работы игры, вызовите событие [`VKWebAppGetConfig`](https://dev.vk.ru/ru/bridge/VKWebAppGetConfig). Оно возвращает информацию об используемой платформе и рабочем окружении. Поле `api_host` в данных ответа содержит адрес сервера для API-запросов.

Также мы рекомендуем подписаться на событие [`VKWebAppUpdateConfig`](https://dev.vk.ru/ru/bridge/VKWebAppUpdateConfig). Платформа отправляет его игре при изменении параметров среды. Ответ события также содержит поле `api_host`, в котором указан адрес сервера для API-запросов.

Для вызова некоторых API-методов можно использовать событие [`VKWebAppCallAPIMethod`](https://dev.vk.ru/ru/bridge/VKWebAppCallAPIMethod). Оно отправляет запросы к [API ВКонтакте](https://dev.vk.ru/ru/reference), [API Одноклассников](https://apiok.ru/ext/) или к серверу, который использует ваша игра. Не вызывайте с помощью этого события API-методы, использующие [сервисный ключ доступа](https://dev.vk.ru/ru/api/access-token/getting-started#%D0%A1%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BB%D1%8E%D1%87%20%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0). Передавать и хранить этот ключ в клиентской части приложения небезопасно.

## Материалы по теме

- [Параметры запуска](https://dev.vk.ru/ru/games/development/parameters)
- [Формат API-запросов](https://dev.vk.ru/ru/api/api-requests)
- [VKWebAppGetConfig](https://dev.vk.ru/ru/bridge/VKWebAppGetConfig)
- [VKWebAppUpdateConfig](https://dev.vk.ru/ru/bridge/VKWebAppUpdateConfig)
- [VKWebAppCallAPIMethod](https://dev.vk.ru/ru/bridge/VKWebAppCallAPIMethod)
