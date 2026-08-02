# VKWebAppSecureTokenSet

**Раздел:** VK Bridge → VKWebAppSecureTokenSet  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppSecureTokenSet` сохраняет произвольную строку в защищённое хранилище на устройстве пользователя. Получить строку из хранилища можно с помощью события

[`VKWebAppSecureTokenGet`](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenGet) [.](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenGet)

Сохранённое значение используется в качестве ключа доступа к данным приложения после успешной [аутентификации пользователя по биометрии](https://dev.vk.ru/ru/mini-apps/development/biometrics-authentication).

## Пример

```js
bridge.send('VKWebAppSecureTokenSet', {
  token: 'le93@1YpW73&1'
  })
  .then((data) => {
    if (data.result) {
      // Произвольная строка сохранена в качестве ключа доступа
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

| Поле | Тип | Описание |
|---|---|---|
| `token` обязательное | `string` | Произвольная строка, которую необходимо сохранить в качестве ключа доступа. Если у вас несколько мини-приложений, то строка должна быть уникальна для каждого из них. |

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppSecureTokenSetResult` и `VKWebAppSecureTokenSetFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

| Поле | Тип | Описание |
|---|---|---|
| `result` | `boolean` | `true`, если произвольная строка была сохранена в качестве ключа доступа. |

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppSecureTokenSetResult`

Сигнализирует, что произвольная строка была сохранена в качестве ключа доступа. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppSecureTokenSetResult",
    data: {
      result: true
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppSecureTokenSetFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой, или о том, что биометрия недоступна на устройстве.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Рекомендации

- Чтобы сохранение и получение ключа работало корректно, сначала разрешите вход в мини- приложение c помощью биометрии, используя событие [`VKWebAppSecureTokenRequestAccess`](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenRequestAccess) [.](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenRequestAccess)
- Чтобы получить сохранённую строку, используйте событие [`VKWebAppSecureTokenGet`](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenGet) [.](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenGet)

## Материалы по теме

- [Аутентификация с помощью биометрии](https://dev.vk.ru/ru/mini-apps/development/biometrics-authentication)
- [`VKWebAppSecureTokenGet`](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenGet)
- [`VKWebAppSecureTokenRequestAccess`](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenRequestAccess)
