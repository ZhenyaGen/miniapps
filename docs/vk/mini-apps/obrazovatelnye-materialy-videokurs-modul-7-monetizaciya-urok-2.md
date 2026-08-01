# Урок 2. Реклама_ подключение в мини-приложении

**Раздел:** Мини-приложения → Образовательные материалы → Видеокурс → Модуль 7. Монетизация → Урок 2. Реклама_ подключение в мини-приложении  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

#### Модуль: [7. Монетизация](https://dev.vk.ru/ru/mini-apps/learning/course/7-monetization)

## Урок 2. Реклама: подключение в мини-приложении

## Главное в уроке

- Чтобы показать рекламу за вознаграждение (rewarded):

1. Проверьте, есть ли на стороне пользователя предзагруженные рекламные материалы с типом rewarded с помощью события [`VKWebAppCheckNativeAds`](https://dev.vk.com/bridge/VKWebAppCheckNativeAds) [.](https://dev.vk.com/bridge/VKWebAppCheckNativeAds)

2. Вызовите событие [`VKWebAppShowNativeAds`](https://dev.vk.com/bridge/VKWebAppShowNativeAds), чтобы показать рекламу.

3. Не забудьте выдать пользователю вознаграждение за просмотр рекламы.
- Чтобы показать рекламу между экранами (interstitial):

1. Проверьте, есть ли на стороне пользователя предзагруженные рекламные материалы с типом interstitial с помощью события [`VKWebAppCheckNativeAds`](https://dev.vk.com/bridge/VKWebAppCheckNativeAds) [.](https://dev.vk.com/bridge/VKWebAppCheckNativeAds)

2. Вызовите событие [`VKWebAppShowNativeAds`](https://dev.vk.com/bridge/VKWebAppShowNativeAds), чтобы показать рекламу.
- Чтобы показать рекламный баннер, вызовите метод [`VKWebAppShowBannerAd`](https://dev.vk.com/bridge/VKWebAppShowBannerAd) и передайте ему параметры: расположение на экране, формат отображения, наличие кнопки закрытия баннера.

## Полезные ссылки

- [Клиентская часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-frontend)
- [Серверная часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-backend)
- [Мини-приложение «Блюдо дня»](https://vk.com/app51773283)
- [Библиотека VK Bridge: первые шаги](https://dev.vk.com/bridge/getting-started)

- [Подключение рекламы в мини-приложениях](https://dev.vk.com/mini-apps/monetization/ad/implementation)
- [Событие проверки наличия рекламы VKWebAppCheckNativeAds](https://dev.vk.com/bridge/VKWebAppCheckNativeAds)
- [Событие показа рекламы VKWebAppShowNativeAds](https://dev.vk.com/bridge/VKWebAppShowNativeAds)
- [Событие показа баннерной рекламы VKWebAppShowBannerAd](https://dev.vk.com/bridge/VKWebAppShowBannerAd)

[← Предыдущий урок](https://dev.vk.ru/ru/mini-apps/learning/course/7-monetization/1-ad-features) [Следующий урок →](https://dev.vk.ru/ru/mini-apps/learning/course/7-monetization/3-virtual-goods)
