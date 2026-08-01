# VKWebAppAddToCommunity

**Раздел:** VK Bridge → VKWebAppAddToCommunity  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppAddToCommunity` вызывает окно выбора сообщества и устанавливает в него приложение: мини-приложение или плагин.

- [Создание мини-приложений](https://dev.vk.ru/ru/mini-apps/getting-started)
- [Плагины для сообществ](https://dev.vk.ru/ru/mini-apps/development/community-apps)

Перед вызовом события из приложения включите [Запуск приложения из сообщества](https://dev.vk.ru/ru/mini-apps/settings/general/information#%D0%97%D0%B0%D0%BF%D1%83%D1%81%D0%BA%20%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B8%D0%B7%20%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%B0).

## Пример

```js
bridge.send('VKWebAppAddToCommunity')
  .then((data) => {
    if (data.group_id) {
      // Приложение установлено в сообщество
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

| Поле | Тип | Описание |
|---|---|---|
| `hide_success_modal` необязательное | `boolean` | Указывает, нужно ли скрывать модальное окно об успешном добавлении приложения в сообщество. - `true` — скрывать модальное окно. - `false` — показывать модальное окно. |

Используется только в десктопной версии. На других платформах модальное окно не отображается.

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppAddToCommunityResult` и `VKWebAppAddToCommunityFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

Возможные ошибки:

- `This action cannot be performed in the background`, если приложение запущено в фоновом режиме.
- `User denied`, если пользователь закрывает окно выбора сообщества.

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

| Поле | Тип | Описание |
|---|---|---|
| `group_id` | `string` | Идентификатор сообщества, в котором установлено приложение. |

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppAddToCommunityResult`

Сигнализирует, что приложение установлено в сообщество. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppAddToCommunityResult",
    data: {
      group_id: "166562603"
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppAddToCommunityFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Песочница

[VKWebAppAddToCommunity](https://vk.cc/bZfqOq)

## Материалы по теме

- [Настройки мини-приложения](https://dev.vk.ru/ru/mini-apps/settings/overview)
- [Плагины для сообществ](https://dev.vk.ru/ru/mini-apps/development/community-apps)
