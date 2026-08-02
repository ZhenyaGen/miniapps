# VKWebAppSetLocation

**Раздел:** VK Bridge → VKWebAppSetLocation  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppSetLocation`  устанавливает новое значение хеша — строки после символа `#` в URL мини-приложения или игры вида `https://vk.com/app123#some-value`. Это значение используется для навигации внутри приложений и передачи параметров. Для обработки изменений в хеше используйте событие [`VKWebAppChangeFragment`](https://dev.vk.ru/ru/bridge/VKWebAppChangeFragment) [.](https://dev.vk.ru/ru/bridge/VKWebAppChangeFragment)

## Пример

```js
bridge.send('VKWebAppSetLocation', {
  location: 'fragment'
  })
  .then((data) => {
    if (data.width) {
      // Новое значение хеша установлено
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
| Одноклассники | Android, Mobile Web, Web |

## Параметры

| Поле | Тип | Описание |
|---|---|---|
| `location` обязательное | `string` | Новое значение хеша. Символ `#` в поле указывать не нужно. |

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppSetLocationResult` и `VKWebAppSetLocationFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`.

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppSetLocationResult`

Сигнализирует, что новое значение хеша установлено. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppSetLocationResult",
    data: { }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppSetLocationFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Песочница

[VKWebAppSetLocation](https://vk.cc/bZfgkh)

## Материалы по теме

- [VKWebAppChangeFragment](https://dev.vk.ru/ru/bridge/VKWebAppChangeFragment)
