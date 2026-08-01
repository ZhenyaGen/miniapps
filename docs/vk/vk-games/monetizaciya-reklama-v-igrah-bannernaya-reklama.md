# Баннерная реклама

**Раздел:** VK Games → Монетизация → Реклама в играх → Баннерная реклама  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Вы можете добавить баннерную рекламу в свою игру, чтобы получать доход от показа рекламных объявлений. Баннеры размещаются в нижней или верхней части экрана, не перекрывая игровой процесс и не отвлекая игрока от основной активности. Размер баннера автоматически подстраивается под ориентацию и размеры экрана, а также под выбранную тему.

Баннерная реклама доступна на всех платформах: в мобильных приложениях для Android и iOS, в мобильной и десктопной версиях сайтов ВКонтакте и Одноклассники.

Материалы для баннеров поступают из рекламной сети VK. Разработчик игры не может влиять на то, какие материалы будут показаны. Разработчик также не может повлиять на то, показать или скрыть какие-либо компоненты баннера.

## Как добавить рекламные баннеры

Чтобы отобразить или скрыть рекламные баннеры, а также узнать информацию об их состоянии, используйте события библиотеки [VK Bridge](https://dev.vk.ru/ru/bridge/overview):

- [`VKWebAppShowBannerAd`](https://dev.vk.ru/ru/bridge/VKWebAppShowBannerAd) — отобразить баннерную рекламу в игре.
- [`VKWebAppCheckBannerAd`](https://dev.vk.ru/ru/bridge/VKWebAppCheckBannerAd) — проверить, показана ли баннерная реклама, открытая событием [`VKWebAppShowBannerAd`](https://dev.vk.ru/ru/bridge/VKWebAppShowBannerAd) [.](https://dev.vk.ru/ru/bridge/VKWebAppShowBannerAd)
- [`VKWebAppHideBannerAd`](https://dev.vk.ru/ru/bridge/VKWebAppHideBannerAd) — скрыть рекламу в игре.
- [`VKWebAppBannerAdUpdated`](https://dev.vk.ru/ru/bridge/VKWebAppBannerAdUpdated) — подпишитесь, чтобы получить информацию об обновлении баннерной рекламы.
- [`VKWebAppBannerAdClosedByUser`](https://dev.vk.ru/ru/bridge/VKWebAppBannerAdClosedByUser) — подпишитесь, чтобы знать, когда пользователь закрыл рекламу через кнопку закрытия в баннере.

Важно! Если игра доступна на разных платформах, при разработке проверьте отображение баннеров для каждой из них.

## Как получить выплаты

Подробнее о монетизации — в разделе [Вывод средств](https://dev.vk.ru/ru/games/monetization/withdrawal/overview).

## Примеры отображения

Внешний вид баннеров зависит от типа устройства, темы оформления и ориентации экрана. На рекламном баннере отображается:

- Изображение.
- Значок рекламной сети.
- Возрастные ограничения.
- Заголовок, описание и ссылка на сайт рекламодателя.
- Кнопка для управления рекламой.
- Кнопка для перехода на сайт рекламодателя.

Некоторые из компонентов могут отсутствовать, если они не настроены в параметрах рекламного объявления.

Чтобы настроить отображение рекламных баннеров в игре, используйте [`VKWebAppShowBannerAd`](https://dev.vk.ru/ru/bridge/VKWebAppShowBannerAd) [.](https://dev.vk.ru/ru/bridge/VKWebAppShowBannerAd) Ниже собраны примеры отображения баннеров, а в таблицах указаны параметры VK Bridge, которые нужно передать.

### Десктопная версия сайта

| Вид баннера | Параметры VK Bridge |
|---|---|
| Рекламный баннер в верхней части экрана на всю ширину | `banner_location: 'top'` |
| Рекламный баннер в нижней части экрана на всю ширину | `banner_location: 'bottom'` |

Горизонтальный рекламный баннер слева `layout_type: 'overlay'` `banner_align: 'left'` `orientation: 'horizontal'`

Вертикальный рекламный баннер справа `layout_type: 'overlay'` `banner_align: 'right'` `orientation: 'vertical'`

### Мобильное приложение

| Вид баннера | Параметры VK Bridge |
|---|---|
| Рекламный баннер сверху по ширине экрана (тёмная тема) | `banner_location: 'top'` |

Рекламный баннер снизу по ширине экрана (тёмная тема) `banner_location:` `'bottom'`

| Рекламный баннер справа в горизонтальной ориентации устройства | `layout_type: 'resize'` `orientation:` `'vertical'` |
|---|---|

| Вид баннера | Параметры VK Bridge |
|---|---|
| Рекламный баннер стандартного размера в горизонтальной ориентации устройства | `banner_location: 'top'` `height_type: 'regular'` |
| Рекламный баннер уменьшенной высоты в горизонтальной ориентации устройства | `banner_location: 'top'` `height_type: 'compact'` |

## Материалы по теме

- [Баннерная реклама в мини-приложениях](https://dev.vk.ru/ru/mini-apps/monetization/ad/banners)
- [`VKWebAppShowBannerAd`](https://dev.vk.ru/ru/bridge/VKWebAppShowBannerAd)
- [`VKWebAppCheckBannerAd`](https://dev.vk.ru/ru/bridge/VKWebAppCheckBannerAd)
- [`VKWebAppBannerAdUpdated`](https://dev.vk.ru/ru/bridge/VKWebAppBannerAdUpdated)
- [`VKWebAppHideBannerAd`](https://dev.vk.ru/ru/bridge/VKWebAppHideBannerAd)
- [`VKWebAppBannerAdClosedByUser`](https://dev.vk.ru/ru/bridge/VKWebAppBannerAdClosedByUser)
- [Вывод средств](https://dev.vk.ru/ru/games/monetization/withdrawal/overview)
