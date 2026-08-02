# VKWebAppUpdateConfig

**Раздел:** VK Bridge → VKWebAppUpdateConfig  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppUpdateConfig` отправляется платформой, когда изменяется конфигурация мини- приложения или игры.

Платформа отправляет событие `VKWebAppUpdateConfig`:

- Сразу после выполнения события [`VKWebAppInit`](https://dev.vk.ru/ru/bridge/VKWebAppInit) [.](https://dev.vk.ru/ru/bridge/VKWebAppInit)
- При показе модального вью-контроллера.
- При появлении, исчезновении или изменении размеров клавиатуры.
- При изменении фрейма экрана, в том числе ориентации.
- При изменении цветовой схемы.

Совет. Чтобы определить цветовую схему до получения данных от платформы, используйте свойство [`prefers-color-scheme`](https://developer.mozilla.org/ru/docs/Web/CSS/@media/prefers-color-scheme) [.](https://developer.mozilla.org/ru/docs/Web/CSS/@media/prefers-color-scheme)

## Пример

```js
bridge.subscribe((e) => {
  if (e.detail.type === 'VKWebAppUpdateConfig') {
    // Логика мини-приложения
  }
});
```

## Совместимость

| Площадки | Платформы |
|---|---|
| ВКонтакте | Android, iOS, Mobile Web, Web |
| Одноклассники | – |

## Параметры

—

## Результат

`VKWebAppUpdateConfig` сигнализирует, что информация получена. В качестве ответа платформа возвращает объект со следующими полями:

**Поле | Тип | Платформа | Значение**

`adaptivity` `string` Android, iOS Адаптивная вёрстка. Возможные значения:
- `auto` — автоматически выбирать вёрстку в зависимости от размера экрана.
- `adaptive` – всегда использовать адаптивную вёрстку.
- `force_mobile` – всегда использовать вёрстку для мобильных устройств.

| `api_host` `string` Mobile Web, Web | API-хост для вызовов, не использующих VK Bridge: `api.vk.ru`. |
|---|---|

`app` `string` Android, iOS Тип мобильного клиента. Возможные значения:
- `vkclient` — приложение «ВКонтакте».
- `vkme` — приложение «VK Мессенджер».
- `ok` — приложение «Одноклассники».

| `app_id` `string` Android, iOS, Mobile Web, Web | Идентификатор приложения, которому соответствует нативное мобильное приложение ВКонтакте. |
|---|---|
| `appearance` `string` Android, iOS, Mobile Web, Web | Тема мини-приложения или игры. Возможные значения: - `light` — светлая тема. - `dark` — тёмная тема. |

`back_button` `string` Android, iOS Отображение кнопки выхода из приложения на главном экране. Возможные значения:
- `back` — «Назад».
- `close` — «Закрыть».
- `none` – не показывать кнопку.

`insets` `object` Android, iOS Величина отступов, которые необходимо выдержать от края экрана до контента. Поля объекта:
- `right` — отступ справа.
- `top` — отступ сверху.
- `left` — отступ слева.
- `bottom` – отступ снизу. Если показана клавиатура, её высота будет указана в параметре `bottom`.

| Поле | Тип | Платформа | Значение |
|---|---|---|---|
| `integration` `string` Android, iOS, Mobile Web, Web | Тип встраивания мини-приложения или игры. Возможные значения: - `fullscreen` – на весь экран. - `content` – встроено в контентную зону, например режим Split View в мобильном приложении или вторая колонка на сайте vk.com. - `popup` — всплывающее модальное окно. - `popup_fullscreen` — всплывающее окно на весь экран. |

`idfv` `string` iOS Идентификатор для приложений от одного разработчика на устройстве iOS. Подробнее – в [документации Apple](https://developer.apple.com/documentation/uikit/uidevice/identifierforvendor).

`is_layer` `boolean` Web Поле приходит, если мини-приложение или игра открыты в слое.

| `scheme` `string` Android, iOS, Mobile Web, Web | Цветовая схема мини-приложения или игры. Возможные значения: - `space_gray` — тёмная схема мобильного приложения и мобильной версии сайта. - `bright_light` — светлая схема мобильного приложения и мобильной версии сайта. - `vkcom_light` — светлая схема десктопной версии сайта. - `vkcom_dark` — тёмная схема десктопной версии сайта. Совет. Чтобы определить цветовую схему до получения данных от платформы, используйте свойство [`prefers-color-scheme`](https://developer.mozilla.org/ru/docs/Web/CSS/@media/prefers-color-scheme) [.](https://developer.mozilla.org/ru/docs/Web/CSS/@media/prefers-color-scheme) |
|---|---|
| `start_time` | `integer` Android, iOS Время и дата открытия модального экрана ([Unix](https://www.unixtimestamp.com/) [Timestamp](https://www.unixtimestamp.com/)). Передаётся только при открытии модального экрана. |
| `viewport_height` `integer` Mobile Web, Web | Высота видимой области родительского окна. |
| `viewport_width` `integer` Mobile Web, Web | Ширина видимой области родительского окна. |
| `avail_height` `integer` Mobile Web, Web | Высота доступной области родительского окна. |
| `avail_width` `integer` Mobile Web, Web | Ширина доступной области родительского окна. |

В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppUpdateConfig",
    data: {
      "app" : "vkclient",
      "app_id" : "6703670",
      "appearance" : "light",
      "insets" : {
          "top" : 0,
          "left" : 0,
          "right" : 0,
          "bottom" : 0
      },
      "scheme": "client_light",
      "start_time" : 1565272434.911599
    }
  }
}
```

## Пример обработки события

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).
