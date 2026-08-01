# VKWebAppGetGrantedPermissions

**Раздел:** VK Bridge → VKWebAppGetGrantedPermissions  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppGetGrantedPermissions` позволяет получить список разрешений, выданных мобильному приложению.

Чтобы пользователь мог выдать нужные разрешения на iOS, откройте системные настройки устройства. Для этого добавьте в нужное место своего мини-приложения ссылку:

```html
<a href="app-settings:" target="_blank">
```

## Пример

```js
bridge.send('VKWebAppGetGrantedPermissions')
  .then((data) => {
    if (data.permissions) {
      // Список разрешений получен
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
- С помощью событий `VKWebAppGetGrantedPermissionsResult` и

`VKWebAppGetGrantedPermissionsFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующим полем:

**Поле | Тип | Описание**

`permissions` `array[string]` Список разрешений, выданных мобильному приложению. Возможные значения:
- `camera` — разрешено использовать камеру, чтобы делать фотографии и записывать видео.
- `location` — разрешено запрашивать местоположение устройства.
- `photo` — доступ к фотографиям и видео на мобильном устройстве с iOS.

Пустой результат означает, что никакие разрешения не выданы. Есть ли доступ к фотографиям, можно проверить только на iPhone.

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppGetGrantedPermissionsResult`

сигнализирует, что список разрешений получен. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppGetGrantedPermissionsResult",
    data: {
      "permissions": [
        "camera",
        "location",
        "photo"
      ]
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppGetGrantedPermissionsFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Песочница

[VKWebAppGetGrantedPermissions](https://vk.com/app6909581#VktXZWJBcHBHZXRHcmFudGVkUGVybWlzc2lvbnNAJTdCJTdE)
