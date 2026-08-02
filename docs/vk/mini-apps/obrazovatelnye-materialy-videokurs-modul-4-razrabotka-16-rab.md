# 16. Работа с VK Storage

**Раздел:** Мини-приложения → Образовательные материалы → Видеокурс → Модуль 4. Разработка → 16. Работа с VK Storage  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

#### Модуль: [4. Разработка](https://dev.vk.ru/ru/mini-apps/learning/course/4-development)

## Урок 16. Работа с VK Storage

## Главное в уроке

- VK Storage — аналог [LocalStorage Web API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API). Использование LocalStorage Web API в мини- приложениях затруднено, если мини-приложение размещено на хостинге ВКонтакте, поскольку в этом случае адрес сервера мини-приложения меняется от сборки к сборке.

Преимущество VK Storage в том, что хранимые данные привязаны к пользователю, а не к устройству или домену сервера. Доступ к ним можно получить даже при смене домена.
- Для работы с хранимыми данными используйте события [`VKWebAppStorageGet`](https://dev.vk.ru/bridge/VKWebAppStorageGet) [,](https://dev.vk.ru/bridge/VKWebAppStorageGet)

[`VKWebAppStorageSet`](https://dev.vk.ru/bridge/VKWebAppStorageSet) [,](https://dev.vk.ru/bridge/VKWebAppStorageSet) [`VKWebAppStorageGetKeys`](https://dev.vk.ru/bridge/VKWebAppStorageGetKeys) [.](https://dev.vk.ru/bridge/VKWebAppStorageGetKeys)
- С помощью VK Storage можно хранить до 1 000 пар `ключ=значение`.

## Полезные ссылки

- [Клиентская часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-frontend), cмотрите фрагменты кода по #M4L16.
- [Серверная часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-backend)
- [Мини-приложение «Блюдо дня»](https://vk.ru/app51773283)
- [Событие VKWebAppStorageGet](https://dev.vk.ru/bridge/VKWebAppStorageGet)
- [Событие VKWebAppStorageSet](https://dev.vk.ru/bridge/VKWebAppStorageSet)
- [Событие VKWebAppStorageGetKeys](https://dev.vk.ru/bridge/VKWebAppStorageGetKeys)

[← Предыдущий урок](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/15-onboarding) [Следующий урок →](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/17-sharing)
