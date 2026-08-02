# Для разработчиков

**Раздел:** VK Pay → Платёжное окно → Для разработчиков  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Платёжное окно для разработчиков

С точки зрения разработчика платёжная форма — это URL с параметрами продавца и [мини-](https://dev.vk.ru/ru/mini-apps/getting-started#%D0%9E%20%D0%BC%D0%B8%D0%BD%D0%B8-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%D1%85) [приложения](https://dev.vk.ru/ru/mini-apps/getting-started#%D0%9E%20%D0%BC%D0%B8%D0%BD%D0%B8-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%D1%85). Ваша задача — правильно сформировать этот URL с помощью событий [VK Bridge](https://dev.vk.ru/ru/bridge/getting-started) для VK Mini Apps и отследить результат действий пользователя, связав его с бизнес-логикой магазина.

## Поддерживаемые платформы

Android, Mobile Web, Web

## Сценарий взаимодействия с платёжным окном

#### Участники:

- Пользователь — физическое лицо, которое оплачивает ваши услуги или товары через платёжное окно.
- [Мини-приложение](https://dev.vk.ru/ru/mini-apps/getting-started#%D0%9E%20%D0%BC%D0%B8%D0%BD%D0%B8-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%D1%85) — веб-приложение, которое запускается из пользовательского интерфейса ВКонтакте.
- [VK Bridge](https://dev.vk.ru/ru/bridge/overview) — библиотека, которая позволяет приложениям использовать API ВКонтакте и API операционной системы, которая установлена на устройстве пользователя.
- [API ВКонтакте](https://dev.vk.ru/ru/api/overview) — интерфейс, который позволяет получать информацию из [базы данных vk.com](https://vk.com/feed) с помощью HTTP-запросов к специальному серверу.
- [Платёжная система VK Pay](https://money.mail.ru/help/agents/) — РНКО "ВК Платёжные решения" ООО, система мгновенных платежей, позволяющая пользователям оплачивать услуги и товары через платёжное окно.

#### Порядок взаимодействия:

1. Пользователь решает купить товар или услугу и нажимает Оплатить.

2. Вы [инициализируете](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/payment-create#%D0%A8%D0%B0%D0%B3%201.%20%D0%98%D0%BD%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D0%B8%D0%B7%D0%B8%D1%80%D1%83%D0%B9%D1%82%D0%B5%20%D1%81%D0%B2%D0%BE%D1%91%20%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5) ваше мини-приложение — отправляете [событие](https://dev.vk.ru/ru/bridge/VKWebAppInit) [`VKWebAppInit`](https://dev.vk.ru/ru/bridge/VKWebAppInit) приложению ВКонтакте через VK Bridge.

3. В ответ VK Bridge [возвращает](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/payment-create#%D0%A8%D0%B0%D0%B3%202.%20%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D1%8C%D1%82%D0%B5%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%20%D0%B8%D0%BD%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8) одно из двух событий: [`VKWebAppInitResult`](https://dev.vk.ru/ru/bridge/VKWebAppInit#VKWebAppInitResult) (приложение инициализировано) или [`VKWebAppInitFailed`](https://dev.vk.ru/ru/bridge/VKWebAppInit#VKWebAppInitFailed) (ошибка при взаимодействии с платформой).

4. В случае успешной инициализации мини-приложение отправляет VK Bridge [событие](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm) [`VKWebAppOpenPayForm`](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm) для [отображения платёжного окна VK Pay](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/payment-create#%D0%A8%D0%B0%D0%B3%203.%20%D0%9E%D1%82%D0%BF%D1%80%D0%B0%D0%B2%D1%8C%D1%82%D0%B5%20%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%20%D0%BD%D0%B0%20%D0%BE%D1%82%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BB%D0%B0%D1%82%D1%91%D0%B6%D0%BD%D0%BE%D0%B3%D0%BE%20%D0%BE%D0%BA%D0%BD%D0%B0%20VK%C2%A0Pay).

5. VK Bridge отправляет ВКонтакте запрос отобразить платёжное окно.

6. ВКонтакте валидирует запрос, добавляет подпись приложения и информацию о типе платежа.

7. ВКонтакте отправляет запрос ссылки на платёжное окно в VK Pay.

8. Платёжная система VK Pay проверяет данные кошелька, авторизацию пользователя, подпись приложения и продавца, формирует ссылку на платёжное окно и подписывает её.

9. VK Pay отображает платёжное окно пользователю по ссылке в iframe.

10. Пользователь производит оплату.

11. VK Bridge [отправляет событие](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/payment-create#%D0%A8%D0%B0%D0%B3%204.%20%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D1%8C%D1%82%D0%B5%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%20%D0%B2%D1%8B%D0%B7%D0%BE%D0%B2%D0%B0%20%D0%BF%D0%BB%D0%B0%D1%82%D1%91%D0%B6%D0%BD%D0%BE%D0%B3%D0%BE%20%D0%BE%D0%BA%D0%BD%D0%B0) продавцу о результате оплаты [`VKWebAppOpenPayFormResult`](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm#VKWebAppOpenPayFormResult) [.](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm#VKWebAppOpenPayFormResult)
