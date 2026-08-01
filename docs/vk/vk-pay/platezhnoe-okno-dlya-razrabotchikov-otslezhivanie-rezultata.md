# Отслеживание результата платежа

**Раздел:** VK Pay → Платёжное окно → Для разработчиков → Отслеживание результата платежа  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

После того как пользователь закроет платёжную форму, мы сообщим вам о результате платежа:

- В случае успешного платежа система VK Pay пришлёт платёжное уведомление на URL, который вы передали в техническую поддержку [при подключении](https://dev.vk.ru/ru/pay/seller/general-description#%D0%9A%D0%B0%D0%BA%20%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D1%8C). Вам нужно [проверить подпись](https://dev.vk.ru/ru/pay/seller/notifications#%D0%A8%D0%B0%D0%B3%202.%20%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D1%8C%D1%82%D0%B5%20%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D1%8C%20%D1%83%D0%B2%D0%B5%D0%B4%D0%BE%D0%BC%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F) [уведомления](https://dev.vk.ru/ru/pay/seller/notifications#%D0%A8%D0%B0%D0%B3%202.%20%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D1%8C%D1%82%D0%B5%20%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D1%8C%20%D1%83%D0%B2%D0%B5%D0%B4%D0%BE%D0%BC%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F), расшифровать и обработать данные уведомления и [отправить ответ](https://dev.vk.ru/ru/pay/seller/notifications#%D0%A8%D0%B0%D0%B3%204.%20%D0%9E%D1%82%D0%BF%D1%80%D0%B0%D0%B2%D1%8C%D1%82%D0%B5%20%D0%BE%D1%82%D0%B2%D0%B5%D1%82%20%D0%BD%D0%B0%20%D1%83%D0%B2%D0%B5%D0%B4%D0%BE%D0%BC%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5) с результатом обработки.
- В случае успешного платежа мини-приложение пришлёт в ваше сообщество ВКонтакте сообщение от пользователя, оплатившего покупку, с результатом платежа. С помощью [Callback](https://dev.vk.ru/ru/api/callback/getting-started) [API ВКонтакте](https://dev.vk.ru/ru/api/callback/getting-started) вы можете подписаться на специальное событие `vkpay_transaction`, чтобы отслеживать такие сообщения от пользователей в вашем сообществе.
- Независимо от результата оплаты VK Bridge пришлёт [объект](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm#%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20Promise) [`Promise`](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm#%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20Promise) или [событие](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm#%D0%A1%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F)

[`VKWebAppInitResult`](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm#%D0%A1%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F) со следующими данными:

- `status` — информация о статусе платежа. Возможные значения: `true` — платёж успешный, `false` — платёж неуспешный или пользователь закрыл платёжную форму, не оплатив покупку.
- `transaction_id` — идентификатор транзакции.
- `amount` – сумма платежа.
- `extra` – дополнительные данные продавца. Содержит данные [объекта](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/payment-create#%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20data) [`params.data`](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/payment-create#%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20data) [.](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/payment-create#%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20data)

Важно! События, которые приходят от мини-приложения и VK Bridge, не гарантируют успешную оплату. Решение о предоставлении товара или услуги нужно принимать только на основании [платёжного уведомления](https://dev.vk.ru/ru/pay/seller/notifications), которое VK Pay пришлёт на ваш URL.
