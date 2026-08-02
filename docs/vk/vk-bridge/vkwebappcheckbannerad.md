# VKWebAppCheckBannerAd

**Раздел:** VK Bridge → VKWebAppCheckBannerAd  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppCheckBannerAd` проверяет, что баннерная реклама, открытая событием [`VKWebAppShowBannerAd`](https://dev.vk.ru/ru/bridge/VKWebAppShowBannerAd), показана в игре или мини-приложении.

- [Баннерная реклама в играх](https://dev.vk.ru/ru/games/monetization/ad/banners)
- [Баннерная реклама в мини-приложениях](https://dev.vk.ru/ru/mini-apps/monetization/ad/banners)

## Пример

```js
bridge.send('VKWebAppCheckBannerAd')
  .then((data) => {
    if (data.result) {
      // Баннерная реклама отображается в данный момент
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
- С помощью событий `VKWebAppCheckBannerAdResult` и `VKWebAppCheckBannerAdFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующими полями:

**Поле | Тип | Описание**

`result` `boolean` `true`, если баннерная реклама показана. `false` — в ином случае.

`banner_width` `integer` Ширина отображённого баннера в пикселях.

`banner_height` `integer` Высота отображённого баннера в пикселях.

`banner_location` `string` Расположение отображённого баннера по вертикали.

Возможные значения:
- `top` — баннер прижат к верху экрана приложения.
- `bottom` — баннер прижат к низу экрана приложения.

`banner_align` `string` Расположение отображённого баннера по горизонтали.

Используется при следующих условиях:
- Поле `layout_type` равно `overlay`.
— и —
- Игра запущена в десктопной версии сайта.
— или — Игра запущена на мобильном устройстве, которое работает в горизонтальной ориентации.

Возможные значения:
- `left` — баннер прижат к левому краю экрана.
- `right` — баннер прижат к правому краю экрана.
- `center` — баннер расположен по центру экрана.

Если значение `layout_type` равно `resize`, параметр не возвращается.

`height_type` `string` Компактность баннера. Используется в играх с горизонтальной ориентацией в мобильном приложении и мобильной версии сайта.

Возможные значения:
- `regular` — стандартный по высоте баннер.
- `compact` — баннер с уменьшенной высотой.

`orientation` `string` Ориентация отображённого баннера.

Используется только для игр, работающих в десктопной версии сайта.

Возможные значения:
- `vertical` — баннер вытянут по вертикали. Изображение расположено сверху.

**Поле | Тип | Описание**

- `horizontal` — баннер вытянут по горизонтали. Изображение расположено слева.

`layout_type` `string` Тип фона отображённого баннера.

Возможные значения:
- `resize` — экран игры или мини-приложения уменьшен на размер баннера.
- `overlay` — баннер расположен поверх экрана игры или мини- приложения.

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppCheckBannerAdResult`

Сигнализирует, что баннерная реклама показана. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppCheckBannerAdResult",
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

`VKWebAppCheckBannerAdFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Материалы по теме

- [Баннерная реклама в мини-приложении](https://dev.vk.ru/ru/mini-apps/monetization/ad/banners)
- [Как добавить баннерную рекламу в мини-приложение](https://dev.vk.ru/ru/mini-apps/monetization/ad/implementation#%D0%91%D0%B0%D0%BD%D0%BD%D0%B5%D1%80%D0%BD%D0%B0%D1%8F%20%D1%80%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D0%B0)
- [Баннерная реклама в игре](https://dev.vk.ru/ru/games/monetization/ad/banners)
- [Как добавить баннерную рекламу в игру](https://dev.vk.ru/ru/games/monetization/ad/implementation#%D0%91%D0%B0%D0%BD%D0%BD%D0%B5%D1%80%D0%BD%D0%B0%D1%8F%20%D1%80%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D0%B0)
- [VKWebAppShowBannerAd](https://dev.vk.ru/ru/bridge/VKWebAppShowBannerAd)
