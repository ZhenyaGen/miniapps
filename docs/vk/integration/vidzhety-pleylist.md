# Плейлист

**Раздел:** Интеграция → Виджеты → Плейлист  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

С помощью этого виджета вы сможете легко и быстро добавить на свой сайт альбом любимой группы, рассказать о собственной новой пластинке или поделиться свежей подборкой музыки.

Виджет добавляет на страницу сайта блок с плейлистом пользователя или сообщества ВКонтакте. Первые пять композиций можно прослушать, не покидая вашего сайта, полный список доступен по ссылке на vk.ru. Пользователь может добавить весь плейлист или отдельные песни в свой список аудио, а также поделиться им с друзьями или сообществом.

## Подключение виджета

Чтобы добавить на свой сайт виджет плейлиста, выполните эти шаги:

Шаг 1. В тег `<head>` на странице вашего сайта добавьте подключение `openapi.js`:

```html
<script src="https://vk.ru/js/api/openapi.js?169" type="text/javascript">
</script>
```

Шаг 2. В тело страницы добавьте элемент `<div>`, в котором будет отображаться виджет, задайте ему уникальный `id`, и добавьте в него код инициализации виджета. Например:

```html
<div id="my_playlist"></div>
<script type="text/javascript">
  VK.Widgets.Playlist('my_playlist', -2000002200, 2200, 'becc04fc11973e4b92');
</script>
```

Если на вашем сайте уже используется [Open API](https://dev.vk.ru/ru/api/open-api/getting-started), добавить виджет ещё проще. Достаточно просто добавить инициализацию виджета.

## Дополнительные настройки

Метод для создания виджета `VK.Widgets.Playlist` принимает параметры:

- `element_id` ( `string`), обязательный параметр — id элемента, который будет являться контейнером кнопки для связи. В нашем конструкторе по умолчанию используется значение

`vk_playlist_ + {owner_id} + {playlist_id}`.
- `owner_id` ( `integer`), обязательный параметр — идентификатор владельца плейлиста.
- `playlist_id` ( `integer`), обязательный параметр — идентификатор плейлиста.
- `hash` ( `string`), обязательный параметр — служебный параметр. Получить `hash` можно только в конструкторе виджета
- `options` ( `object`) — опции блока с виджетом. Объект, который может содержать поля:

- `width` ( `integer`) — ширина блока в пикселях. По умолчанию блок растягивается на всю ширину страницы.

## Пример использования

```html
<script type="text/javascript" src="//vk.ru/js/api/openapi.js?143"></script>
<span class="wk_comment"> VK Widget </span>
<div id="vk_playlist_-2000002200_2200"></div>
<script type="text/javascript">
    VK.Widgets.Playlist('vk_playlist_-2000002200_2200', -2000002200, 2200,
'becc04fc11973e4b92', {width: 200});
</script>
```

## Код виджета

Чтобы добавить виджет на ваш сайт, просто скопируйте код для вставки на страницу, на которой вы хотите разместить виджет.

`Ссылка на плейлист`

https://vk.ru/music/playlist/-147845620_5_c09c1c34cdf7190efb

`Ширина`

100%

`Код виджета для вставки на сайте` Скопировать

```html
<!-- Put this script tag to the <head> of your page -->
<script
  type="text/javascript"
  src="https://vk.ru/js/api/openapi.js?168"
  charset="windows-1251"
></script>
```

```
<!-- Put this script tag to the place, where the Playlist block will be -->
<div id='vk_playlist_-147845620_5'></div>
<script type="text/javascript">
   VK.Widgets.Playlist('vk_playlist_-147845620_5', -147845620, 5,
'c09c1c34cdf7190efb');
</script>
```

### [Сег…](https://vk.ru/music/playlist/-147845620_5_c09c1c34cdf7190efb)

[VK Музы](https://vk.ru/music/playlist/-147845620_5_c09c1c34cdf7190efb)

[107 94…](https://vk.ru/music/playlist/-147845620_5_c09c1c34cdf7190efb) [Слуш](https://vk.ru/music/playlist/-147845620_5_c09c1c34cdf7190efb)

#### [Добав](https://vk.ru/music/playlist/-147845620_5_c09c1c34cdf7190efb)

[AL…](https://vk.ru/artist/almary) [— Нежны…](https://vk.ru/audio-2001473633_152473633) 2:35
