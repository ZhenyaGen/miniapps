# Урок 6. Подписка на события VK Bridge и их особенности

**Раздел:** Мини-приложения → Образовательные материалы → Видеокурс → Модуль 4. Разработка → Урок 6. Подписка на события VK Bridge и их особенности  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

#### Модуль: [4. Разработка](https://dev.vk.ru/ru/mini-apps/learning/course/4-development)

## Урок 6. Подписка на события VK Bridge и их особенности

## Главное в уроке

- Чтобы получать нотификации от платформы VK Mini Apps, подпишитесь на события VK Bridge.
- Чтобы подписаться, создайте обработчик `bridge.subscribe()`.

Этот обработчик вызывается для всех событий VK Bridge, поэтому в его коде надо проверить тип входящего события и только потом выполнить необходимые действия.
- В VKUI версии 6.0 и выше отсутствует встроенная поддержка VK Bridge. Её надо добавлять самостоятельно.
- Большинство событий VK Bridge работают на всех доступных платформах, но некоторые могут не поддерживаться. Например, события для работы с виброоткликом недоступны, когда мини- приложение работает в десктопной версии сайта.
- Чтобы проверить, доступно ли какое-либо событие или нет, используйте метод

`bridge.supportsAsync(...)`:

```ts
bridge.supportsAsync("VKWebAppGetFriends").then( res => {
    if (res) {
        // Событие VKWebAppGetFriends поддерживается
        // ...
    }
});
```

Ранее для проверки использовался `bridge.supports(...)`, но сейчас он устарел и может возвращать неактуальную информацию.

- Чтобы получить информацию о пользователе, который работает с мини-приложением, используйте событие [`VKWebAppGetUserInfo`](https://dev.vk.com/bridge/VKWebAppGetUserInfo) [.](https://dev.vk.com/bridge/VKWebAppGetUserInfo)

## [Полезные ссылки](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/5-bridge) [← Предыдущий урок](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/5-bridge) [Следующий урок →](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/7-vkui-adaptivity)

- [Клиентская часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-frontend), cмотрите фрагменты кода по #M4L6.
- [Серверная часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-backend)
- [Мини-приложение «Блюдо дня»](https://vk.com/app51773283)
- [Документация библиотеки VK Bridge](https://dev.vk.com/bridge/overview)
- [Вызов событий VK Bridge](https://dev.vk.com/bridge/getting-started#%D0%92%D1%8B%D0%B7%D0%BE%D0%B2%20%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F)
