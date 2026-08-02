# Урок 7. Продажа цифровых и физических товаров_ реализация

**Раздел:** Мини-приложения → Образовательные материалы → Видеокурс → Модуль 7. Монетизация → Урок 7. Продажа цифровых и физических товаров_ реализация  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

#### Модуль: [7. Монетизация](https://dev.vk.ru/ru/mini-apps/learning/course/7-monetization)

## Урок 7. Продажа цифровых и физических товаров: реализация

## Главное в уроке

- В работе платёжных форм участвуют четыре стороны:

- Клиентская часть мини-приложения.
- Серверная часть мини-приложения.
- VK Pay — приложение-кошелёк, размещённое ВКонтакте.
- DMR — Деньги@Mail.Ru, платёжная система. С 16 февраля 2024 года платёжный сервис сменил название и называется РНКО «ВК Платёжные решения» (ООО).
- Чтобы подключить VK Pay:

1. [Заключите договор](https://vk.com/landings/vkpay_form), после этого вы получите доступы к оплате.

2. Вызовите платежное окно VK Pay с помощью события [`VKWebAppOpenPayForm`](https://dev.vk.com/bridge/VKWebAppOpenPayForm), а данные для параметра `params` сформируйте в серверной части приложения:

- Сформируйте данные для подписи `merchant_data` и подпись продавца `merchant_sign`.
- Сформируйте подпись приложения `sign` и соедините строку с защищённым ключом вашего приложения.
- Полученную строку нужно вернуть в клиентскую часть мини-приложения, чтобы с этими данными был вызван метод [`VKWebAppOpenPayForm`](https://dev.vk.com/bridge/VKWebAppOpenPayForm) [.](https://dev.vk.com/bridge/VKWebAppOpenPayForm)

3. Подпишитесь на событие [`VKWebAppOpenPayFormResult`](https://dev.vk.com/ru/bridge/VKWebAppOpenPayForm#VKWebAppOpenPayFormResult) в клиентской части мини- приложения и покажите пользователю результат оплаты.

4. Дождитесь серверного платёжного уведомления, которое придёт на Сallback URL, указанный в административной панели сервиса Деньги@Mail.Ru.

5. Проверьте подпись приложения из платёжного уведомления на сервере.

6. Отдайте корректный ответ на запрос в Callback API.

[7.](https://dev.vk.ru/ru/mini-apps/learning/course/7-monetization/6-digital-and-physical-goods) Измените статус заказа в базе данных на «Оплачен».

[← Предыдущий урок](https://dev.vk.ru/ru/mini-apps/learning/course/7-monetization/6-digital-and-physical-goods) [Следующий урок →](https://dev.vk.ru/ru/mini-apps/learning/course/7-monetization/8-withdrawal)

## Полезные ссылки

- [Клиентская часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-frontend)
- [Серверная часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-backend), cмотрите фрагменты кода по #M5L7.
- [Мини-приложение «Блюдо дня»](https://vk.com/app51773283)
- [Прием оплаты в VK Pay](https://dev.vk.com/ru/pay/getting-started)
- [Событие VKWebAppOpenPayForm](https://dev.vk.com/ru/bridge/VKWebAppOpenPayForm)
- [API продавца для работы с платежами](https://dev.vk.com/ru/pay/seller/general-description)
- [VK Pay для юридических лиц и индивидуальных предпринимателей](https://vk.com/@pay-vk-pay-for-business)
- [Приём оплаты](https://vk.com/@pay-priem-oplaty)
