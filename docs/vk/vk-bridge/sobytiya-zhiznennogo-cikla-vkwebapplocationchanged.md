# VKWebAppLocationChanged

**Раздел:** VK Bridge → События жизненного цикла → VKWebAppLocationChanged  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppLocationChanged` отправляется платформой при изменении значения хеша после символа `#` через событие [`VKWebAppSetLocation`](https://dev.vk.ru/ru/bridge/VKWebAppSetLocation) [.](https://dev.vk.ru/ru/bridge/VKWebAppSetLocation)

## Пример

```js
bridge.subscribe((e) => {
  if (e.detail.type === 'VKWebAppLocationChanged') {
    // Логика мини-приложения
  }
});
```

## Совместимость

| Площадки | Платформы |
|---|---|
| ВКонтакте | Mobile Web, Web |
| Одноклассники | – |

## Параметры

—

## Результат

`VKWebAppLocationChanged` сигнализирует, что хеш изменён. В качестве ответа платформа возвращает объект со следующим полем:

| Поле | Тип | Описание |
|---|---|---|
| `location` | `string` | Хеш — строка после символа `#` в URL вида `vk.com/app6909581#`. |

В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppLocationChanged",
    data: {
      location: "fragment"
    }
  }
}
```

## Пример обработки события

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).
