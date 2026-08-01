# VKWebAppHideBannerAd

**Раздел:** VK Bridge → VKWebAppHideBannerAd  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppHideBannerAd` скрывает баннерную рекламу в игре или мини-приложении, открытую событием [`VKWebAppShowBannerAd`](https://dev.vk.ru/ru/bridge/VKWebAppShowBannerAd) [.](https://dev.vk.ru/ru/bridge/VKWebAppShowBannerAd)

- [Баннерная реклама в играх](https://dev.vk.ru/ru/games/monetization/ad/banners)
- [Баннерная реклама в мини-приложениях](https://dev.vk.ru/ru/mini-apps/monetization/ad/banners)

## Пример

```js
bridge.send('VKWebAppHideBannerAd')
  .then((data) => {
    if (data.result) {
      // Баннерная реклама скрыта
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
```

## Совместимость

| Площадки | Платформы |
|---|---|
| ВКонтакте | Android, iOS, Mobile Web, Web |
| Одноклассники | Android, iOS, Mobile Web, Web |

## Параметры

—

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppHideBannerAdResult` и `VKWebAppHideBannerAdFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект с информацией о скрываемом баннере:

**Поле | Тип | Описание**

`result` `boolean` `true`, если баннерная реклама скрыта, `false` — в ином случае.

`banner_width` `integer` Ширина скрываемого баннера в пикселях.

`banner_height` `integer` Высота скрываемого баннера в пикселях.

`banner_location` `string` Расположение скрываемого баннера по вертикали.

Возможные значения:
- `top` — баннер был прижат к верху экрана приложения.
- `bottom` — баннер был прижат к низу экрана приложения.

`banner_align` `string` Расположение скрываемого баннера по горизонтали.

Используется при следующих условиях:
- Поле `layout_type` равно `overlay`.
— и —
- Игра запущена в десктопной версии сайта.
— или — Игра запущена на мобильном устройстве, которое работает в горизонтальной ориентации.

Возможные значения:
- `left` — баннер был прижат к левому краю экрана.
- `right` — баннер был прижат к правому краю экрана.
- `center` — баннер был расположен по центру экрана.

Если значение `layout_type` равно `resize`, параметр не возвращается.

`orientation` `string` Ориентация скрываемого баннера.

Используется только для игр, работающих в десктопной версии сайта.

Возможные значения:
- `vertical` — баннер был вытянут по вертикали. Изображение расположено сверху.
- `horizontal` — баннер был вытянут по горизонтали. Изображение расположено слева.

`layout_type` `string` Тип фона баннера.

Возможные значения:
- `resize` — экран игры или мини-приложения был уменьшен на размер баннера.

**Поле | Тип | Описание**

- `overlay` — баннер был расположен поверх экрана игры или мини-приложения.

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppHideBannerAdResult`

Сигнализирует, что баннерная реклама скрыта. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppHideBannerAdResult",
    data: {
      "result" : true,
      "banner_width": 100,
      "banner_height": 64,
      "banner_location": "bottom",
      "banner_align": "left",
      "orientation": "horizontal",
      "layout_type": "overlay"
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppHideBannerAdFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой, или если баннерная реклама не нашлась.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Материалы по теме

- [Баннерная реклама в мини-приложении](https://dev.vk.ru/ru/mini-apps/monetization/ad/banners)
- [Как добавить баннерную рекламу в мини-приложение](https://dev.vk.ru/ru/mini-apps/monetization/ad/implementation#%D0%91%D0%B0%D0%BD%D0%BD%D0%B5%D1%80%D0%BD%D0%B0%D1%8F%20%D1%80%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D0%B0)
- [Баннерная реклама в игре](https://dev.vk.ru/ru/games/monetization/ad/banners)

- [Как добавить баннерную рекламу в игру](https://dev.vk.ru/ru/games/monetization/ad/implementation#%D0%91%D0%B0%D0%BD%D0%BD%D0%B5%D1%80%D0%BD%D0%B0%D1%8F%20%D1%80%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D0%B0)
- [VKWebAppShowBannerAd](https://dev.vk.ru/ru/bridge/VKWebAppShowBannerAd)
