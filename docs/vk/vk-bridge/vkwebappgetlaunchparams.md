# VKWebAppGetLaunchParams

**Раздел:** VK Bridge → VKWebAppGetLaunchParams  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppGetLaunchParams` получает актуальные значения параметров запуска игры или мини- приложения.

- [Параметры запуска мини-приложений](https://dev.vk.ru/ru/mini-apps/development/launch-params)
- [Параметры запуска игр](https://dev.vk.ru/ru/games/development/parameters)
- [Параметры запуска в Одноклассниках](https://dev.vk.ru/ru/ok/development/launch-parameters)

Во время работы приложения некоторые параметры могут поменяться и будут отличаться от значений, которые были переданы при запуске приложения. Например, пользователь во время работы с приложением разрешил ему отправлять уведомления. В таком случае после вызова события `VKWebAppGetLaunchParams` параметр `vk_are_notifications_enabled` будет содержать значение `1` — отправка уведомлений разрешена.

## Пример

```js
bridge.send('VKWebAppGetLaunchParams')
  .then((data) => {
    if (data.vk_app_id) {
      // Параметры запуска получены
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

- Используя объект ``, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppGetLaunchParamsResult` и

`VKWebAppGetLaunchParamsFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект с параметрами запуска игры или мини-приложения.

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppGetLaunchParamsResult`

Сигнализирует, что параметры запуска получены. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppGetLaunchParamsResult",
    data: {
      sign: "Hb67aIL4cElWINenspCpKu3tUgacikw541NCXX8zWL4",
      vk_access_token_settings: "",
      vk_app_id: 8142709,
      vk_are_notifications_enabled: 0,
      vk_is_app_user: 1,
      vk_is_favorite: 0,
      vk_language: "ru",
      vk_platform: "desktop_web",
      vk_ref: "other",
      vk_ts: 1664886146,
      vk_user_id: 82156740
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppGetLaunchParamsFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Материалы по теме

- [Параметры запуска мини-приложений](https://dev.vk.ru/ru/mini-apps/development/launch-params)
- [Параметры запуска игр](https://dev.vk.ru/ru/games/development/parameters)
- [Параметры запуска в Одноклассниках](https://dev.vk.ru/ru/ok/development/launch-parameters)
