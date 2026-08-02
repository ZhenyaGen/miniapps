# VKWebAppCallFinished

**Раздел:** VK Bridge → VKWebAppCallFinished  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppCallFinished` используется при [интеграции звонков](https://dev.vk.ru/ru/mini-apps/development/calls-integration) в мини-приложение. Отправляется платформой, если пользователь, создавший звонок, завершил его.

## Пример

```js
bridge.subscribe((e) => {
  if (e.detail.type === 'VKWebAppCallFinished') {
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

`VKWebAppCallFinished` сигнализирует, что пользователь, начавший звонок, завершил его для всех. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    "type": "VKWebAppCallFinished",
    "data": {}
  }
}
```

## Пример обработки события

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Рекомендации

После того как мини-приложение получит событие `VKWebAppCallFinished` от платформы, вам нужно передать эту информацию в серверную часть вашего мини-приложения и больше не отправлять пользователям ссылку на завершившийся звонок.

## Материалы по теме

- [VKWebAppCallLeft](https://dev.vk.ru/ru/bridge/VKWebAppCallLeft)
- [Интеграция звонков](https://dev.vk.ru/ru/mini-apps/development/calls-integration)
