# VKWebAppSecureTokenRemove

**Раздел:** VK Bridge → VKWebAppSecureTokenRemove  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppSecureTokenRemove` удаляет ключ доступа, который был сохранён для [аутентификации](https://dev.vk.ru/ru/mini-apps/development/biometrics-authentication) [пользователя с помощью биометрии](https://dev.vk.ru/ru/mini-apps/development/biometrics-authentication), из защищённого хранилища.

## Пример

```js
bridge.send('VKWebAppSecureTokenRemove')
  .then((data) => {
    if (data.result) {
      // Ключ доступа удалён из защищённого хранилища
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
- С помощью событий `VKWebAppSecureTokenRemoveResult` и

`VKWebAppSecureTokenRemoveFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

| Поле | Тип | Описание |
|---|---|---|
| `result` | `boolean` | `true`, если ключ доступа был удалён из защищённого хранилища. |

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppSecureTokenRemoveResult`

Сигнализирует, что ключ доступа был удалён из защищённого хранилища. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppSecureTokenRemoveResult",
    data: {
      result: true
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppSecureTokenRemoveFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой, или о том, что биометрия недоступна на устройстве.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Рекомендации

- Чтобы сохранение и получение ключа работало корректно, сначала разрешите вход в мини- приложение c помощью биометрии, используя событие [`VKWebAppSecureTokenRequestAccess`](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenRequestAccess) [.](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenRequestAccess)
- Чтобы сохранить произвольную строку в качестве ключа доступа, используйте событие

[`VKWebAppSecureTokenSet`](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenSet) [.](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenSet)

## Материалы по теме

- [Авторизация с помощью биометрии](https://dev.vk.ru/ru/mini-apps/development/biometrics-authentication)
- [`VKWebAppSecureTokenSet`](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenSet)
- [`VKWebAppSecureTokenRequestAccess`](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenRequestAccess)
