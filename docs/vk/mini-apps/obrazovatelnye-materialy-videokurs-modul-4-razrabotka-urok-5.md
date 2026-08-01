# Урок 5. Основы работы с VK Bridge

**Раздел:** Мини-приложения → Образовательные материалы → Видеокурс → Модуль 4. Разработка → Урок 5. Основы работы с VK Bridge  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

#### Модуль: [4. Разработка](https://dev.vk.ru/ru/mini-apps/learning/course/4-development)

## Урок 5. Основы работы с VK Bridge

## Главное в уроке

- VK Bridge — мост между мини-приложением, которое работает в iframe или WebView, и платформой ВКонтакте на устройстве пользователя.
- Если вы создавали проект на основе [шаблона create-vk-mini-app](https://dev.vk.com/mini-apps/getting-started/create-vk-mini-app), VK Bridge уже включён в ваш проект. Если нет, то подключить его можно с помощью следующих команд:

#### yarn

```
yarn add @vkontakte/vk-bridge
```

#### npm

```
npm install @vkontakte/vk-bridge
```

- В течение 30 секунд после запуска мини-приложения необходимо отправить сообщение инициализации:

```ts
bridge.send('VKWebAppInit');
```

- После инициализации можно вызывать другие события VK Bridge. Одно из них —

[`VKWebAppGetLaunchParams`](https://dev.vk.com/bridge/VKWebAppGetLaunchParams). С помощью него вы получаете значения параметров запуска приложения.
- Полная информация об использовании VK Bridge — на [портале для разработчиков](https://dev.vk.com/bridge/overview).

## Полезные ссылки

- [Клиентская часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-frontend), cмотрите фрагменты кода по #M4L5.
- [Серверная часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-backend)
- [Мини-приложение «Блюдо дня»](https://vk.com/app51773283)
- [Документация библиотеки VK Bridge](https://dev.vk.com/bridge/overview)

[← Предыдущий урок](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/4-modal-windows) [Следующий урок →](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/6-subscribe)
