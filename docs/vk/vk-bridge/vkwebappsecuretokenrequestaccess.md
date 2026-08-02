# VKWebAppSecureTokenRequestAccess

**Раздел:** VK Bridge → VKWebAppSecureTokenRequestAccess  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppSecureTokenRequestAccess` запрашивает у пользователя разрешение на использование биометрии в качестве способа [аутентификации пользователя в мини-приложении](https://dev.vk.ru/ru/mini-apps/development/biometrics-authentication). Пользователю будет показан запрос на использование биометрии: отпечатка пальца или лица.

## Пример

```js
bridge.send('VKWebAppSecureTokenRequestAccess')
  .then((data) => {
    if (data.result) {
      // Разрешение на использование биометрии получено
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
| Одноклассники | iOS |

## Параметры

—

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppSecureTokenRequestAccessResult` и

`VKWebAppSecureTokenRequestAccessFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

**Поле | Тип | Описание**

`result` `boolean` `true`, если разрешение на использование биометрии для аутентификации было получено.

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppSecureTokenRequestAccessResult`

Сигнализирует, что разрешение на использование биометрии для аутентификации было получено. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppSecureTokenRequestAccessResult",
    data: {
      result: true
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppSecureTokenRequestAccessFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой, или о том, что биометрия недоступна на устройстве.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Рекомендации

- Отправляйте событие `VKWebAppSecureTokenRequestAccess`, прежде чем сохранять ключ доступа с помощью события [`VKWebAppSecureTokenSet`](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenSet) [.](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenSet)
- Чтобы проверить, доступна ли биометрия на устройстве и запрашивалось ли разрешение пользователя для аутентификации по биометрии в мини-приложении, используйте событие

[`VKWebAppSecureTokenGetInfo`](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenGetInfo) [.](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenGetInfo)

## Материалы по теме

- [Аутентификация с помощью биометрии](https://dev.vk.ru/ru/mini-apps/development/biometrics-authentication)
- [`VKWebAppSecureTokenSet`](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenSet)
- [`VKWebAppSecureTokenGet`](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenGet)
