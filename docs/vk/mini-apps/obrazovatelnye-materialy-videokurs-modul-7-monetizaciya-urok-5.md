# Урок 5. Продажа виртуальных ценностей_ разовая оплата и подписки

**Раздел:** Мини-приложения → Образовательные материалы → Видеокурс → Модуль 7. Монетизация → Урок 5. Продажа виртуальных ценностей_ разовая оплата и подписки  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

#### Модуль: [7. Монетизация](https://dev.vk.ru/ru/mini-apps/learning/course/7-monetization)

## Урок 5. Продажа виртуальных ценностей: разовая оплата и подписки

## Главное в уроке

- Чтобы добавить разовую оплату:

1. В клиентской части мини-приложения вызовите событие [`VKWebAppShowOrderBox`](https://dev.vk.com/bridge/VKWebAppShowOrderBox) [.](https://dev.vk.com/bridge/VKWebAppShowOrderBox)

2. В серверной мини-приложения части верните информацию о товаре.

3. Выдайте пользователю товар.

4. В серверной части мини-приложения в ответ на платёжное уведомление передайте статус, что товар выдан. ВКонтакте автоматически переведёт голоса со счёта пользователя на счёт вашего приложения.
- Чтобы добавить подписку:

1. В клиентской части мини-приложения вызовите событие [`VKWebAppShowSubscriptionBox`](https://dev.vk.com/bridge/VKWebAppShowSubscriptionBox) [.](https://dev.vk.com/bridge/VKWebAppShowSubscriptionBox)

2. В серверной части верните информацию о подписке.

3. В ответ на платёжное уведомление передайте статус, что подписка создана, отменена или возобновлена.

## Полезные ссылки

- [Клиентская часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-frontend)

## • [Серверная часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-backend), cмотрите фрагменты кода по #M7L5. • [Мини-приложение «Блюдо дня»](https://vk.com/app51773283) • [Платежи виртуальной валютой](https://dev.vk.com/ru/api/payments/overview) • [Обмен данными между ВКонтакте и приложением](https://dev.vk.com/ru/api/payments/vk#%D0%9E%D0%B1%D0%BC%D0%B5%D0%BD%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D0%BC%D0%B8%20%D0%BC%D0%B5%D0%B6%D0%B4%D1%83%20%D0%92%D0%9A%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D0%B5%20%D0%B8%20%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC) • [Платежи за подписки](https://dev.vk.com/ru/api/payments/subscriptions/vk) • [Типы уведомлений](https://dev.vk.com/ru/api/payments/notifications/vk#%D0%A2%D0%B8%D0%BF%D1%8B%20%D1%83%D0%B2%D0%B5%D0%B4%D0%BE%D0%BC%D0%BB%D0%B5%D0%BD%D0%B8%D0%B9) [•](https://dev.vk.ru/ru/mini-apps/learning/course/7-monetization/4-virtual-goods-selling) [Обработка платёжных уведомлений](https://dev.vk.com/ru/api/payments/notifications/vk) [←](https://dev.vk.ru/ru/mini-apps/learning/course/7-monetization/4-virtual-goods-selling) [Предыдущий урок](https://dev.vk.com/ru/api/payments/notifications/vk) [Следующий урок →](https://dev.vk.ru/ru/mini-apps/learning/course/7-monetization/6-digital-and-physical-goods)
