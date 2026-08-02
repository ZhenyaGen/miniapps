# VKWebAppShowImages

**Раздел:** VK Bridge → Общие события → VKWebAppShowImages  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppShowImages` открывает нативный экран для просмотра изображений.

## Пример

```js
bridge.send('VKWebAppShowImages',{
  images: [
    'https://pp.userapi.com/c639229/v639229113/31b31/KLVUrSZwAM4.jpg',
    'https://pp.userapi.com/c639229/v639229113/31b94/mWQwkgDjav0.jpg',
    'https://pp.userapi.com/c639229/v639229113/31b3a/Lw2it6bdISc.jpg'
  ]
  })
  .then((data) => {
    if (data.result) {
      // Нативный экран открыт
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
| Одноклассники | Android, iOS, Mobile Web |

## Параметры

| Поле | Тип | Описание |
|---|---|---|
| `images` обязательное | `array[string]` | Массив строк, содержащих URL-адреса изображений. |

**Поле | Тип | Описание**

`start_index` `integer` Индекс элемента массива `images`, с которого нужно начать отображение (положительное число, включая `0`). Индексация начинается с `0`.

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppShowImagesResult` и `VKWebAppShowImagesFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

| Поле | Тип | Описание |
|---|---|---|
| `result` | `boolean` | `true`, если нативный экран открыт. |

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppShowImagesResult`

Сигнализирует, что нативный экран открыт. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppShowImagesResult",
    data: {
      result: true
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppShowImagesFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).
