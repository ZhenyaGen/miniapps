# VKWebAppGetFriends

**Раздел:** VK Bridge → VKWebAppGetFriends  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppGetFriends` показывает окно выбора друзей из списка и получает информацию о них.

## Пример

```js
bridge.send('VKWebAppGetFriends')
  .then((data) => {
    if (data) {
      // Данные о пользователях
      console.log(data.users);
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
| `multi` обязательное | `boolean` | Информация о том, выбрать ли нескольких друзей из списка или одного. Возможные значения: - `false` — выбор одного друга из списка (значение по умолчанию). - `true` — выбор нескольких друзей из списка. |

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppGetFriendsResult` и `VKWebAppGetFriendsFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

Возможные ошибки:

- `This action cannot be performed in the background`, если мини-приложение запущено в фоновом режиме.
- `User denied`, если пользователь закрыл окно выбора друзей.

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующими полями:

**Поле | Тип | Описание**

`users` `array[object]` Массив объектов пользователей. Объект содержит следующие поля:
- `id` ( `integer`) — идентификатор пользователя.
- `first_name` ( `string`) — имя пользователя.
- `last_name` ( `string`) — фамилия пользователя.
- `sex` ( `integer`) — пол пользователя. Возможные значения:
- `1` — женский.
- `2` — мужской.
- `0` — пол не указан.
- `photo_200` ( `string`) — URL квадратной фотографии пользователя с шириной 200 пикселей. Если у пользователя отсутствует фотография, возвращается

`https://vk.com/images/camera_200.png`.

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppGetFriendsResult`

Сигнализирует, что данные о пользователях получены. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppGetFriendsResult",
    data: {
      users: [
        {
          id: 743784479,
          sex: 2,
          last_name: "Хомяк",
          first_name: "Сеня",
          photo_200: "https://sun1-88.userapi.com/s/v1/ig2/ffZYc9qa-E8wPmfGsv-
7erYVc83oWBUPeZjY0KSt7i7mkJ6y5YgwrNVs8K9E8TfCK8PuWXhu3l6O5cyCnlUSUCl3.jpg?
size=200x200&quality=96&crop=26,26,204,204&ava=1"
        },
        {
          id: 743784474,
          sex: 2,
          last_name: "Рыжий",
          first_name: "Персик",
          photo_200: "https://sun1-91.userapi.com/s/v1/ig2/Dcf-
SWu7nVYDDldq9oQegiC06VqsSa43-HpDxzPjrvFCUUk9nSevY2Uf9xzm0bxvLfgsTOH6XiiW-
zeLcDhPDj_w.jpg?size=200x200&quality=96&crop=26,26,204,204&ava=1"
        }
      ]
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppGetFriendsFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Особенности использования

Для работы события вашему приложению не требуется предварительно получать права на доступ к данным профиля пользователя.

Событие `VKWebAppGetFriends` предназначено для разового получения информации о друзьях пользователя. Решение пользователя не сохраняется для последующих вызовов. При повторном вызове события платформа снова покажет диалоговое окно со списком друзей.

## Песочница

[VKWebAppGetFriends](https://vk.cc/bZflVs)

## Материалы по теме

- [API-метод apps.getFriendsList](https://dev.vk.ru/ru/method/apps.getFriendsList)
- [API-методы Friends](https://dev.vk.ru/ru/method/friends)
