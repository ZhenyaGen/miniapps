# VKWebAppCheckNativeAds

**Раздел:** VK Bridge → VKWebAppCheckNativeAds  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppCheckNativeAds` проверяет, есть ли на стороне пользователя рекламные материалы, доступные для показа в играх или мини-приложениях.

- [Реклама в играх](https://dev.vk.ru/ru/games/monetization/ad/overview)
- [Реклама в мини-приложениях](https://dev.vk.ru/ru/mini-apps/monetization/ad/overview)

Если на стороне пользователя нет предзагруженных рекламных материалов, [VK Bridge](https://dev.vk.ru/ru/bridge/overview) отправит запрос на их загрузку. Если рекламные материалы уже есть, новые не загрузятся.

## Пример

```js
bridge.send('VKWebAppCheckNativeAds', {
  ad_format: 'reward' /* Тип рекламы */
  })
  .then((data) => {
    if (data.result) {
      // Предзагруженные материалы есть
    } else {
      // Материалов нет
    }
  })
  .catch((error) => { console.log(error); });
```

#### Другие примеры

- [Реклама за вознаграждение в игре](https://dev.vk.ru/ru/games/monetization/ad/implementation#%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80%20%D0%BF%D0%BE%D0%BA%D0%B0%D0%B7%D0%B0%20%D1%80%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D1%8B%20%D0%B7%D0%B0%20%D0%B2%D0%BE%D0%B7%D0%BD%D0%B0%D0%B3%D1%80%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5)
- [Реклама за вознаграждение в мини-приложении](https://dev.vk.ru/ru/mini-apps/monetization/ad/implementation#%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80%20%D0%BF%D0%BE%D0%BA%D0%B0%D0%B7%D0%B0%20%D1%80%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D1%8B%20%D0%B7%D0%B0%20%D0%B2%D0%BE%D0%B7%D0%BD%D0%B0%D0%B3%D1%80%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5)

## Совместимость

| Площадки | Платформы |
|---|---|
| ВКонтакте | Android, iOS, Mobile Web, Web |
| Одноклассники | Android, iOS, Mobile Web, Web |

## Параметры

В качестве параметров события `VKWebAppCheckNativeAds` передайте в [`bridge.send(...)`](https://dev.vk.ru/ru/bridge/getting-started#%D0%92%D1%8B%D0%B7%D0%BE%D0%B2%20%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F) объект со следующими полями:

| Поле | Тип | Описание |
|---|---|---|
| `ad_format` обязательное | `string` | [Вид](https://dev.vk.ru/ru/games/monetization/ad/overview#%D0%92%D0%B8%D0%B4%D1%8B%20%D1%80%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D1%8B%20%D0%B2%20%D0%B8%D0%B3%D1%80%D0%B0%D1%85) запрашиваемых рекламных материалов. Возможные значения: - `reward` — [реклама за вознаграждение](https://dev.vk.ru/ru/games/monetization/ad/overview#%D0%A0%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D0%B0%20%D0%B7%D0%B0%20%D0%B2%D0%BE%D0%B7%D0%BD%D0%B0%D0%B3%D1%80%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5). - `interstitial` — [реклама между экранами](https://dev.vk.ru/ru/games/monetization/ad/overview#%D0%A0%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D0%B0%20%D0%BC%D0%B5%D0%B6%D0%B4%D1%83%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%D0%BC%D0%B8). |
| `use_waterfall` необязательное | `boolean` | Применимо только при `ad_format: 'reward'`. Сообщает, можно ли использовать рекламные материалы вида `interstitial` в случае отсутствия материалов вида `reward`. Значение по умолчанию: `true`. |

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppCheckNativeAdsResult` и `VKWebAppCheckNativeAdsFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

**Поле | Тип | Описание**

`result` `boolean` `true`, если предзагруженные рекламные материалы запрашиваемого вида есть.

`false` — в ином случае. Примечание: если материалов нет, то VK Bridge отправляет запрос на их получение. `false` вернётся, если эта загрузка не удалась.

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. Это происходит, например, если было задано некорректное значение в параметре `ad_format`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0), общий для всех событий VK Bridge.

### События

`VKWebAppCheckNativeAdsResult`

Сигнализирует, что параметры вызова были корректны и что библиотека VK Bridge пытается определить наличие загруженных рекламных материалов требуемого вида. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail:
  {
    type: "VKWebAppCheckNativeAdsResult",
    data:{
      result : true,
      request_id: 5
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppCheckNativeAdsFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой. Например, такая ошибка происходит при использовании некорректных значений параметров запроса.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Примечания

- Использование `VKWebAppCheckNativeAds` особенно важно для показа [рекламы за](https://dev.vk.ru/ru/games/monetization/ad/overview#%D0%A0%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D0%B0%20%D0%B7%D0%B0%20%D0%B2%D0%BE%D0%B7%D0%BD%D0%B0%D0%B3%D1%80%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5) [вознаграждение](https://dev.vk.ru/ru/games/monetization/ad/overview#%D0%A0%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D0%B0%20%D0%B7%D0%B0%20%D0%B2%D0%BE%D0%B7%D0%BD%D0%B0%D0%B3%D1%80%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5). Согласно нашим требованиям, игра или мини-приложение должны получить согласие пользователя на просмотр рекламы такого вида. `VKWebAppCheckNativeAds` позволяет понять, можно ли выводить на экран запрос на просмотр или нет.
- Отправка запроса на получение рекламных материалов не гарантирует, что они будут загружены. Медленное интернет-соединение, сбои в сети, проблемы на стороне рекламной платформы могут привести к тому, что контент не будет получен.

Чтобы обойти эти проблемы, вы можете вызывать `VKWebAppCheckNativeAds` периодически в своём коде, например по таймеру.

## Песочница

[VKWebAppCheckNativeAds](https://vk.cc/c3ZzRg)

## Материалы по теме

- [Подробнее о работе с VK Bridge](https://dev.vk.ru/ru/bridge/getting-started)
- [Реклама в играх](https://dev.vk.ru/ru/games/monetization/ad/overview)
- [Реклама в мини-приложениях](https://dev.vk.ru/ru/mini-apps/monetization/ad/overview)
- [VKWebAppShowNativeAds](https://dev.vk.ru/ru/bridge/VKWebAppShowNativeAds)
