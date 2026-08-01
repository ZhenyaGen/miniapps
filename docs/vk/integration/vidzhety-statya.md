# Статья

**Раздел:** Интеграция → Виджеты → Статья  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

С помощью этого виджета вы сможете разместить на своём сайте статьи, созданные ВКонтакте. Разные материалы, оформленные в едином стиле, станут украшением сайта. Это могут быть варианты развлекательных программ, отзывы клиентов, условия сотрудничества — всё, что необходимо для ваших задач.

Чтобы открыть статью, посетителям не придётся покидать ваш ресурс. Загрузка такого материала займёт всего мгновение — зачастую это значительно быстрее, чем переход на новую страницу.

## Подключение виджета

Чтобы добавить на свой сайт виджет, выполните эти шаги:

Шаг 1. В тег `<head>` на странице вашего сайта добавьте подключение `openapi.js`:

```html
<script src="https://vk.ru/js/api/openapi.js?169" type="text/javascript">
</script>
```

В тело страницы добавьте элемент `<div>`, в котором будут отображаться комментарии, задайте ему уникальный id, и добавьте в него код инициализации виджета. Например:

```html
<div id="my_article"></div>
<script type="text/javascript">
    VK.Widgets.Article('my_article', '@thevyshka-perezhivaem-stress-
pravilno');
</script>
```

Если на вашем сайте уже используется [Open API](https://dev.vk.ru/ru/api/open-api/getting-started), добавить виджет ещё проще. Достаточно просто добавить инициализацию виджета.

## Дополнительные настройки

Метод для создания виджета `VK.Widgets.Article` принимает два параметра:

- `element_id` ( `string`), обязательный параметр — id элемента, который будет являться контейнером кнопки для связи. В нашем конструкторе по умолчанию используется значение

`"vk_article_" + {owner_id} + {article_id}`.
- `article_url` ( `string`), обязательный параметр — адрес статьи.

## Пример использования

```html
<script type="text/javascript" src="//vk.ru/js/api/openapi.js?157"></script>
<span class="wk_comment"> VK Widget </span>
<div id="vk_article_-66036248_15"></div>
```

```
<script type="text/javascript">
    VK.Widgets.Article('vk_article_-66036248_15', '@thevyshka-perezhivaem-
stress-pravilno');
</script>
```

## Код виджета

Чтобы добавить виджет на ваш сайт, просто скопируйте код для вставки на страницу, на которой вы хотите разместить виджет.

`Ссылка на статью`

https://vk.ru/@tassagency-mayakovskiy

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
<!-- Put this script tag to the place, where the Article block will be -->
<div id="vk_article_-26284064_15959"></div>
<script type="text/javascript">
  VK.Widgets.Article("vk_article_-26284064_15959", "@tassagency-
mayakovskiy");
</script>
```
