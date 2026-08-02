# VKWebAppSetViewSettings

**Раздел:** VK Bridge → VKWebAppSetViewSettings  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppSetViewSettings` устанавливает тему для значков в статус-баре и цвет статус-бара.

## Пример

```js
bridge.send('VKWebAppSetViewSettings', {
  status_bar_style: 'dark',
  action_bar_color: '#ffffff'
  })
  .then((data) => {
    if (data.result) {
      // Тема и цвет установлены
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
| ВКонтакте | Android, iOS |
| Одноклассники | Android, iOS |

## Параметры

| Поле | Тип | Описание |
|---|---|---|
| `status_bar_style` обязательное | `string` | Тема для значков статус-бара. Возможные значения: - `light` — светлая. - `dark` — тёмная. |
| `action_bar_color` необязательное | `string` | Цвет экшен-бара в формате HEX-кода. Например: `#00ffff`. Используйте значение  `none` для задания прозрачного цвета. |

Поле работает только на Android.

| Поле | Тип | Описание |
|---|---|---|
| `navigation_bar_color` необязательное | `string` | Цвет навигационного бара в формате HEX-кода. Например: |

`#00ffff`.

Поле работает только на Android.

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppSetViewSettingsResult` и

`VKWebAppSetViewSettingsFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

| Поле | Тип | Описание |
|---|---|---|
| `result` | `boolean` | `true`, если тема и цвет установлены. |

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppSetViewSettingsResult`

Сигнализирует, что тема и цвет установлены. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppSetViewSettingsResult",
    data: {
      result: true
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppSetViewSettingsFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).
