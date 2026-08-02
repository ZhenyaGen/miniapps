# VKWebAppShowCommunityWidgetPreviewBox

**Раздел:** VK Bridge → VKWebAppShowCommunityWidgetPreviewBox  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppShowCommunityWidgetPreviewBox` показывает экран предпросмотра виджета для сообщества.

Важно! Перед установкой виджета пользователь должен добавить плагин в сообщество. Чтобы добавить плагин, используйте событие VK Bridge [`VKWebAppAddToCommunity`](https://dev.vk.ru/ru/bridge/VKWebAppAddToCommunity). Подробнее — в разделе [Виджеты сообществ](https://dev.vk.ru/ru/api/community-apps-widgets/getting-started).

## Пример

```js
bridge.send('VKWebAppShowCommunityWidgetPreviewBox', {
  group_id: 166562603,
  type: 'text',
  code: 'return {
    "title": "Цитата",
    "text": "Текст цитаты"
  };'})
  .then((data) => {
    if (data.result) {
      // Экран предпросмотра показан
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
| ВКонтакте | Android, iOS, Web |
| Одноклассники | – |

## Параметры

| Поле | Тип | Описание |
|---|---|---|
| `group_id` обязательное | `integer` | Идентификатор сообщества. |
| `type` обязательное | `string` | Тип виджета. Возможные значения: - `text` — выводит текст. - `list` — выводит список объектов с описанием и кнопками для действий. - `table` — выводит таблицу с данными. - `tiles` — выводит плитки с изображением и кратким описанием. - `compact_list` — выводит список элементов в компактном виде. - `cover_list` — выводит список изображений (от 1 до 3) с кнопкой для действия, заголовком и описанием. - `match` — выводит текущий результат спортивного матча. - `matches` — выводит список спортивных матчей. - `donation` — выводит прогресс пожертвований. |

Параметры всех поддерживаемых типов виджетов подробно описаны в разделе [Виджеты приложений сообществ](https://dev.vk.ru/ru/reference/objects/app-widget).

| `code` обязательное | `string` Код виджета на языке программирования VKScript. |
|---|---|

Подробная информация о синтаксисе и возможностях этого языка с примерами находится в описании метода [`execute`](https://dev.vk.ru/ru/method/execute#%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80%20%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D0%B0%20code) [.](https://dev.vk.ru/ru/method/execute#%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80%20%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D0%B0%20code)

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppShowCommunityWidgetPreviewBoxResult` и

`VKWebAppShowCommunityWidgetPreviewBoxFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

| Поле | Тип | Описание |
|---|---|---|
| `result` | `boolean` | `true`, если экран предпросмотра показан. |

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppShowCommunityWidgetPreviewBoxResult`

Сигнализирует, что экран предпросмотра показан. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppShowCommunityWidgetPreviewBoxResult",
    data: {
      result: true
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppShowCommunityWidgetPreviewBoxFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Песочница

[VKWebAppShowCommunityWidgetPreviewBox](https://vk.cc/bZfr2S)
