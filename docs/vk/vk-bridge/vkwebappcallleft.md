# VKWebAppCallLeft

**Раздел:** VK Bridge → VKWebAppCallLeft  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppCallLeft` используется при [интеграции звонков](https://dev.vk.ru/ru/mini-apps/development/calls-integration) в мини-приложение. Событие отправляется платформой, если пользователь вышел из звонка.

## Пример

```js
bridge.subscribe((e) => {
  if (e.detail.type === 'VKWebAppCallLeft') {
    // Логика мини-приложения
  }
});
```

## Совместимость

| Площадки | Платформы |
|---|---|
| ВКонтакте | Android, iOS, Web |
| Одноклассники | – |

## Параметры

—

## Результат

`VKWebAppCallLeft` сигнализирует, что пользователь покинул звонок. В качестве ответа платформа возвращает объект со следующим полем:

**Поле | Тип | Описание**

`reason` `string` Сообщение о причине, по которой пользователь вышел из звонка. Сейчас возвращается только значение `general` — неопределённая причина.

В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    "type": "VKWebAppCallLeft",
    "data": {
      "reason": "general"
    }
  }
}
```

## Пример обработки события

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Материалы по теме

- [VKWebAppCallFinished](https://dev.vk.ru/ru/bridge/VKWebAppCallFinished)
- [Интеграция звонков](https://dev.vk.ru/ru/mini-apps/development/calls-integration)
