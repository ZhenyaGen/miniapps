# 13. Уведомления

**Раздел:** Мини-приложения → Образовательные материалы → Видеокурс → Модуль 4. Разработка → 13. Уведомления  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

#### Модуль: [4. Разработка](https://dev.vk.ru/ru/mini-apps/learning/course/4-development)

## Урок 13. Уведомления

## Главное в уроке

- Уведомления — важный механизм взаимодействия с аудиторией. Используйте уведомления, чтобы привлечь пользователей в приложение и сообщить об изменениях. Отправлять уведомления могут только мини-приложения, опубликованные в каталоге.
- Вы можете использовать [уведомления разных типов](https://dev.vk.ru/mini-apps/promotion/social-mechanics/notifications/overview): массовые, автоматические или разовые. Например, для сообщения пользователям о выполнении заказа лучше всего подходят разовые уведомления.
- Существуют лимиты на отправку уведомлений. При их превышении пользователь не увидит уведомления.
- По умолчанию уведомления отключены. Чтобы запросить разрешение на отправку уведомлений, вызовите событие [`VKWebAppAllowNotifications`](https://dev.vk.ru/bridge/VKWebAppAllowNotifications) [.](https://dev.vk.ru/bridge/VKWebAppAllowNotifications)

```js
bridge.send('VKWebAppAllowNotifications')
  .then((data) => {
    if (data.result) {
      // Разрешение получено
    }
  })
  .catch((error) => { /* … */ });
};
```

Пользователь также может разрешить или запретить мини-приложению отправлять ему уведомления в меню этого мини-приложения.

- Чтобы узнать, есть ли у мини-приложения разрешение на отправку уведомлений пользователю, который запустил это мини-приложение, проверьте параметр запуска

[`vk_are_notifications_enabled`](https://dev.vk.ru/ru/mini-apps/development/launch-params#%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B) либо выполните API-запрос [`apps.isNotificationsAllowed`](https://dev.vk.ru/method/apps.isNotificationsAllowed) [.](https://dev.vk.ru/method/apps.isNotificationsAllowed) [•](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/12-mobile-devices) Чтобы отправить разовое уведомление, выполните запрос [`notifications.sendMessage`](https://dev.vk.ru/method/notifications.sendMessage) [из](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/14-maps) серверной части мини-приложения. Для отправки запроса используйте [сервисный ключ доступа](https://dev.vk.ru/ru/mini-apps/settings/development/keys#%D0%A1%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BB%D1%8E%D1%87) из настроек вашего мини-приложения.

[← Предыдущий урок](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/12-mobile-devices) [Следующий урок](https://dev.vk.ru/method/notifications.sendMessage) [→](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/14-maps)

## Полезные ссылки

- [Клиентская часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-frontend)
- [Серверная часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-backend)
- [Мини-приложение «Блюдо дня»](https://vk.ru/app51773283)
- [Уведомления](https://dev.vk.ru/mini-apps/promotion/social-mechanics/notifications/overview)
- [Параметры запуска — vk_are_notifications_enabled](https://dev.vk.ru/mini-apps/development/launch-params#vk_are_notifications_enabled)
- [API-запрос](https://dev.vk.ru/method/apps.isNotificationsAllowed) [`apps.isNotificationsAllowed`](https://dev.vk.ru/method/apps.isNotificationsAllowed)
- [API-запрос](https://dev.vk.ru/method/notifications.sendMessage) [`notifications.sendMessage`](https://dev.vk.ru/method/notifications.sendMessage)
