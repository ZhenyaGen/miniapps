# VKWebAppOpenContacts

**Раздел:** VK Bridge → VKWebAppOpenContacts  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppOpenContacts` запрашивает доступ к телефонной книге на устройстве, открывает окно выбора контакта из телефонной книги и получает данные контакта.

## Пример

```js
bridge.send('VKWebAppOpenContacts')
  .then((data) => {
    if (data.phone) {
      // Данные контакта получены
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

—

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppOpenContactsResult` и `VKWebAppOpenContactsFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

Возможные ошибки:

- `This action cannot be performed in the background`, если приложение запущено в фоновом режиме.

- `User denied`, если пользователь закрыл телефонную книгу.

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующими полями:

| Поле | Тип | Описание |
|---|---|---|
| `phone` | `string` | Номер телефона в формате, в котором он хранится в телефонной книге. |
| `first_name` | `string` | Имя пользователя, указанное в телефонной книге. |
| `last_name` | `string` | Фамилия пользователя, указанная в телефонной книге. |

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppOpenContactsResult`

Сигнализирует, что данные контакта получены. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppOpenContactsResult",
    data: {
      phone: "79217770099",
      first_name: "Персик",
      last_name: "Рыжий"
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppOpenContactsFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Материалы по теме

- [VKWebAppGetPhoneNumber](https://dev.vk.ru/ru/bridge/VKWebAppGetPhoneNumber)
- [VKWebAppGetFriends](https://dev.vk.ru/ru/bridge/VKWebAppGetFriends)
