# VKWebAppShowNativeAds

**Раздел:** VK Bridge → VKWebAppShowNativeAds  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppShowNativeAds` показывает рекламу пользователям в играх и мини-приложениях. Параметры вызова задают вид желаемой рекламы.

Если на стороне пользователя нет рекламных материалов желаемого типа, то [VK Bridge](https://dev.vk.ru/ru/bridge/overview) запрашивает материалы и показывает рекламу после её получения.

- [Реклама в мини-приложениях](https://dev.vk.ru/ru/mini-apps/monetization/ad/overview)
- [Реклама в играх](https://dev.vk.ru/ru/games/monetization/ad/overview)

## Пример

```js
bridge.send('VKWebAppShowNativeAds', {
  ad_format: 'interstitial' /* Тип рекламы */
  })
  .then( (data) => {
    if (data.result) {
      // Реклама была показана
    } else {
      // Ошибка
    }
  })
  .catch((error) => { console.log(error); });
```

#### Другие примеры

- [Реклама за вознаграждение](https://dev.vk.ru/ru/games/monetization/ad/implementation#%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80%20%D0%BF%D0%BE%D0%BA%D0%B0%D0%B7%D0%B0%20%D1%80%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D1%8B%20%D0%B7%D0%B0%20%D0%B2%D0%BE%D0%B7%D0%BD%D0%B0%D0%B3%D1%80%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5)
- [Реклама между экранами](https://dev.vk.ru/ru/games/monetization/ad/implementation#%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80%20%D0%BF%D0%BE%D0%BA%D0%B0%D0%B7%D0%B0%20%D1%80%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D1%8B%20%D0%BC%D0%B5%D0%B6%D0%B4%D1%83%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%D0%BC%D0%B8)

## Совместимость

| Площадки | Платформы |
|---|---|
| ВКонтакте | Android, iOS, Mobile Web, Web |
| Одноклассники | Android, iOS, Mobile Web, Web |

## Параметры

В качестве параметров события `VKWebAppShowNativeAds` передайте в [`bridge.send(...)`](https://dev.vk.ru/ru/bridge/getting-started#%D0%92%D1%8B%D0%B7%D0%BE%D0%B2%20%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F) объект со следующими полями:

**Параметр | Тип | Описание**

`ad_format` `string` [Вид](https://dev.vk.ru/ru/games/monetization/ad/overview#%D0%92%D0%B8%D0%B4%D1%8B%20%D1%80%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D1%8B%20%D0%B2%20%D0%B8%D0%B3%D1%80%D0%B0%D1%85) рекламы для показа. Возможные значения:
- `reward` — [реклама за вознаграждение](https://dev.vk.ru/ru/games/monetization/ad/overview#%D0%A0%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D0%B0%20%D0%B7%D0%B0%20%D0%B2%D0%BE%D0%B7%D0%BD%D0%B0%D0%B3%D1%80%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5).
- `interstitial` — [реклама между экранами](https://dev.vk.ru/ru/games/monetization/ad/overview#%D0%A0%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D0%B0%20%D0%BC%D0%B5%D0%B6%D0%B4%D1%83%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%D0%BC%D0%B8).

`use_waterfall` `boolean` Применим только при `ad_format: 'reward'`. Сообщает, можно ли использовать рекламные материалы вида `interstitial` в случае отсутствия материалов вида `reward`. Значение по умолчанию: `true`.

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppShowNativeAdsResult` и `VKWebAppShowNativeAdsFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, то управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

| Поле | Тип | Описание |
|---|---|---|
| `result` | `boolean` | `true`, если реклама была показана, или `false` в ином случае. |

Если при обращении к платформе произошла ошибка, то управление передаётся в метод `catch`. Это происходит, например, если было задано некорректное значение в параметре `ad_format`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0), общий для всех методов VK Bridge.

### События

`VKWebAppShowNativeAdsResult`

Сигнализирует, что параметры вызова были корректны и что библиотека VK Bridge пытается отобразить рекламу пользователю.

В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail:
  {
    type: "VKWebAppShowNativeAdsResult",
    data:{
      result : true,
      request_id: 5
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppShowNativeAdsFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой, например при использовании некорректных значений параметров запроса. В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0), общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Примечания

- Перед показом рекламы VK Bridge проверяет, есть ли предзагруженные рекламные материалы указанного типа. Если такие материалы есть, VK Bridge показывает их. Если предзагруженных материалов нет, то библиотека отправляет запрос на их загрузку и показывает полученный контент.

В общем случае это может приводить к задержке при показе. Чтобы избежать её, используйте [предзагрузку рекламных материалов](https://dev.vk.ru/ru/games/monetization/ad/implementation).

Запрос не гарантирует, что материалы будут загружены. Сбои в сети или проблемы на стороне рекламной платформы могут привести к тому, что контент не будет получен.
- Сразу после успешного показа рекламы VK Bridge отправляет запрос на предзагрузку следующей порции рекламных материалов.

## Песочница

- Игры: [VKWebAppShowNativeAds](https://vk.cc/bZfCRH)
- Мини-приложения: [VKWebAppShowNativeAds](https://vk.com/app6909581#VktXZWJBcHBTaG93TmF0aXZlQWRzQCU3QiUyMmFkX2Zvcm1hdCUyMiUzQSUyMnByZWxvYWRlciUyMiU3RA)

## Материалы по теме

- [Подробнее о работе с VK Bridge](https://dev.vk.ru/ru/bridge/getting-started)
- [Реклама в играх](https://dev.vk.ru/ru/games/monetization/ad/overview)
- [Реклама в мини-приложениях](https://dev.vk.ru/ru/mini-apps/monetization/ad/overview)
- [VKWebAppCheckNativeAds](https://dev.vk.ru/ru/bridge/VKWebAppCheckNativeAds)
