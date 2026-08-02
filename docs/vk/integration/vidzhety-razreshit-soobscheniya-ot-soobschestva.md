# Разрешить сообщения от сообщества

**Раздел:** Интеграция → Виджеты → Разрешить сообщения от сообщества  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Этот виджет позволит клиентам быстро подписаться на уведомления в личных сообщениях от сообщества, не покидая вашего сайта.

Это удобный способ организовать подписку на регулярную рассылку. После получения согласия от пользователя сообщество может отправить ему сообщение без какого-либо ограничения по срокам.

В любой момент пользователь может запретить присылать ему сообщения с помощью кнопки в диалоге с сообществом.

## Подключение виджета

В тег `<head>` на странице вашего сайта добавьте подключение `openapi.js`:

```html
<script src="https://vk.ru/js/api/openapi.js?169" type="text/javascript">
</script>
```

В тело страницы добавьте элемент `<div>`, в котором будет отображаться виджет, задайте ему уникальный `id`, и добавьте в него код инициализации виджета. Например:

```html
<div id="vk_send_message"></div>
<script type="text/javascript">
VK.Widgets.AllowMessagesFromCommunity("vk_send_message", {height: 30},
127864554);
</script>
```

## Дополнительные настройки

Метод `VK.Widgets.AllowMessagesFromCommunity` принимает три параметра:

- `element_id` ( `string`), обязательный параметр — id элемента, который будет являться контейнером для блока с виджетом. В нашем конструкторе по умолчанию используется значение

`vk_send_message`.
- `options` ( `object`) — опции блока с виджетом. Объект, который может содержать поля:

- `height` ( `integer`) — высота блока в пикселях. Возможные значения: `22`, `24`, `30`.
- `group_id` ( `string`) — идентификатор сообщества.

## События

При нажатии на кнопку Получать уведомления виджет передает событие

`widgets.allowMessagesFromCommunity.allowed`. Если пользователь нажимает Запретить уведомления, передается событие и `widgets.allowMessagesFromCommunity.denied`. Вы

можете обрабатывать эти события, используя [Open API](https://dev.vk.ru/ru/api/open-api/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D0%B9). В функцию-обработчик будет передан один параметр — идентификатор пользователя, совершившего действие.

## Пример использования

```html
<script type="text/javascript" src="https://vk.ru/js/api/openapi.js?169">
</script>
    <script type="text/javascript">
      VK.Widgets.AllowMessagesFromCommunity("vk_send_message", {height: 30},
1);
      VK.Observer.subscribe("widgets.allowMessagesFromCommunity.allowed",
function f(userId) {
        console.log(userId);
        console.log("allowed");
      });
      VK.Observer.subscribe("widgets.allowMessagesFromCommunity.denied",
function f(userId) {
        console.log(userId);
        console.log("denied");
      });
    </script>
```

## Код виджета

Чтобы добавить виджет на ваш сайт, просто скопируйте код для вставки на страницу, на которой вы хотите разместить виджет.

`Сообщество`

Выберите сообщество

`Высота кнопки`

24 px

`Код виджета для вставки на сайте` Скопировать

```html
<!-- Put this script tag to the <head> of your page -->
<script type="text/javascript" src="https://vk.ru/js/api/openapi.js?168">
</script>
```

```
<!-- Put this div tag to the place, where the Allow messages from community
block will be -->
<div id="vk_allow_messages_from_community"></div>
<script type="text/javascript">
```

```
VK.Widgets.AllowMessagesFromCommunity("vk_allow_messages_from_community",
{}, 2158488);
</script>
```

Получать уведомления
