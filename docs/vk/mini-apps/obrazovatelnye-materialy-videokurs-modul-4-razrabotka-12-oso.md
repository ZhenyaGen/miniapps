# 12. Особенности разработки для мобильных устройств

**Раздел:** Мини-приложения → Образовательные материалы → Видеокурс → Модуль 4. Разработка → 12. Особенности разработки для мобильных устройств  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

#### Модуль: [4. Разработка](https://dev.vk.ru/ru/mini-apps/learning/course/4-development)

## Урок 12. Особенности разработки для мобильных устройств

## Главное в уроке

- Большинство пользователей запускают мини-приложения на мобильных устройствах.
- При создании и отладке мини-приложений серверный код работает на компьютере разработчика. Используйте [VK Tunnel](https://dev.vk.ru/libraries/tunnel), чтобы сделать этот сервер доступным в интернете. При отладке не забудьте указать URL, сгенерированный в VK Tunnel, в настройках мини-приложения.

Адрес, генерируемый VK Tunnel, меняется от запуска к запуску. Используйте файл `vk-tunnel-` `config.json`, чтобы в таких случаях автоматически обновлять настройки мини-приложения.
- Для отладки клиентской части можно использовать [консоль Eruda](https://dev.vk.ru/mini-apps/development/debugging). Она подобна инструментам разработчика в десктопных браузерах.
- Чтобы сделать мини-приложения максимально похожими на iOS-приложения, библиотека VKUI реализуют специальную поддержку жеста [Swipe Back](https://vkui.io/components/view) и компонента [`PullToRefresh`](https://vkui.io/components/pull-to-refresh). VK Bridge предоставляет события для поддержки Swipe Back.

## Полезные ссылки

- [Клиентская часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-frontend)
- [Серверная часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-backend)
- [Мини-приложение «Блюдо дня»](https://vk.ru/app51773283)
- [Документация VK Tunnel](https://dev.vk.ru/libraries/tunnel)
- [Отладка на мобильных устройствах](https://dev.vk.ru/mini-apps/development/debugging#%D0%9E%D1%82%D0%BB%D0%B0%D0%B4%D0%BA%D0%B0%20%D0%BD%D0%B0%20%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C%D0%BD%D1%8B%D1%85%20%D1%83%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0%D1%85)

- [Событие VKWebAppSetSwipeSettings](https://dev.vk.ru/bridge/VKWebAppSetSwipeSettings)
- [iOS Swipe Back (документация VKUI)](https://vkui.io/components/view)
- [PullToRefresh (документация VKUI)](https://vkui.io/components/pull-to-refresh)

[← Предыдущий урок](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/11-working-with-vk-api) [Следующий урок →](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/13-notifications)
