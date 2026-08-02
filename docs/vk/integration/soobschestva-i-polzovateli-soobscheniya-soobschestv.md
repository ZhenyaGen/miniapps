# Сообщения сообществ

**Раздел:** Интеграция → Сообщества и пользователи → Сообщения сообществ  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Сообщения сообществ — сервис для прямого диалога между пользователем и сообществом ВКонтакте.

- Вашим клиентам не придётся искать форму обратной связи, проходить регистрацию, отвечать через email — никаких лишних действий.
- Вместе с сообщением вы получаете все необходимые данные о его авторе, можете автоматически обрабатывать типовые заявки и мгновенно отвечать на сообщения с помощью бота.

Сообщения сообществ работают в полной и мобильной версиях ВКонтакте, а также во всех официальных приложениях: с вашей компанией можно связаться на любой платформе. Подробнее о сообщениях сообществ — в статье [Полезные настройки для сообщений в сообществе](https://vk.com/@business-poleznye-nastroiki-dlya-soobschenii-v-soobschestve).

## API для сообщений сообществ

В этом руководстве рассказывается о том, как использовать API для работы с сообщениями сообществ.

## Ключ доступа

Для работы с API от имени сообщества необходимо получить специальный ключ доступа. Вы можете сделать это двумя способами — в интерфейсе управления сообществом или программно, с помощью специального запроса к нашему серверу.

Ключ доступа — это строка, включающая латинские буквы и цифры. Её необходимо передавать в заголовке `Authorization` в формате `Bearer <ключ_доступа>`, обращаясь к методам API от имени сообщества.

## Получение ключа доступа в настройках сообщества

1. Откройте vk.com и перейдите в сообщество, в котором вы являетесь администратором.

2. В меню справа выберите Управление и затем Дополнительно → Работа с API.

3. Нажмите Создать ключ. Отметьте необходимые права доступа и подтвердите свой выбор.

Вы можете создать несколько ключей с разными правами доступа. Ключи нельзя размещать публично — узнав его, третье лицо может обращаться к API ВКонтакте от имени вашего сообщества. Если ключ был скомпрометирован, необходимо удалить его из списка — после этого он станет недействителен.

## Получение ключа доступа на oauth.vk.ru

Мы предлагаем два способа авторизации, основанных на протоколе OAuth 2.0. Используйте этот подход, если необходимо работать со многими сообществами пользователя, например, при разработке мобильного приложения.

Для работы с API с серверной стороны используйте [Authorization Code Flow](https://id.vk.com/about/business/go/docs/ru/vkid/latest/oauth/oauth-vkontakte/authcode-flow-community).

Для работы с API со стороны клиента используйте [Implicit Flow](https://id.vk.com/about/business/go/docs/ru/vkid/latest/oauth/oauth-vkontakte/implicit-flow-community).

## Работа с сообщениями

В API сообщений сообществ используются те же методы, что и для работы с личными сообщениями пользователя. Если раньше вы уже имели дело с сообщениями в API ВКонтакте, схема работы будет вам знакома. Стоит, однако, учитывать некоторые особенности:

## • необходимо проставлять статус прочитанности сообщения при общении с клиентом; • если ответ получен пользователем, его необходимо помечать как прочитанный; • в беседах сообществ доступны специальные метки: Важные, Неотвеченные, Непрочитанные.

Чтобы вы могли отправлять пользователю сообщения от имени сообщества, пользователь должен разрешить их получение. Если пользователь написал сообщение сообществу первым, это приравнивается к согласию на получение ответных сообщений (без ограничений по времени, если пользователь не запретил сообщения вручную). Чтобы запросить у пользователя разрешение на отправку сообщений, используйте:

- Событие [`VKWebAppAllowMessagesFromGroup`](https://dev.vk.ru/ru/bridge/VKWebAppAllowMessagesFromGroup) библиотеки [VK Bridge](https://dev.vk.ru/ru/bridge/overview).
- Метод [`messages.allowMessagesFromGroup`](https://dev.vk.ru/ru/method/messages.allowMessagesFromGroup) в Standalone-приложениях.
- Виджет [Разрешить писать сообществу](https://dev.vk.ru/ru/widgets/allow-messages-from-community) на внешнем сайте.

В [Callback API](https://dev.vk.ru/ru/api/callback/getting-started) и [Bots Longpoll API](https://dev.vk.ru/ru/api/bots-long-poll/getting-started) события `message_allow` и `message_deny` помогут отслеживать факт разрешения и запрета сообщений от сообщества.

Внимание! Через API нельзя получить список всех пользователей, разрешивших сообщения сообществу. Необходимо хранить и синхронизировать этот список на своей стороне.

## Доступные инструменты и методы

## • [Long Poll сервер](https://dev.vk.ru/ru/api/user-long-poll/getting-started) — синхронизация обновлений; • [Callback API](https://dev.vk.ru/ru/api/callback/getting-started) — мгновенные оповещения о новых сообщениях и других действиях пользователей в сообществе. • [`messages.getConversations`](https://dev.vk.ru/ru/method/messages.getConversations) — метод для получения списка бесед; • [`messages.markAsRead`](https://dev.vk.ru/ru/method/messages.markAsRead) — метод для присвоения сообщению метки Прочитано; • [`messages.markAsImportantConversation`](https://dev.vk.ru/ru/method/messages.markAsImportantConversation) [,](https://dev.vk.ru/ru/method/messages.markAsImportantConversation) [`messages.markAsAnsweredConversation`](https://dev.vk.ru/ru/method/messages.markAsAnsweredConversation) — методы для присвоения меток беседам; • [`messages.send`](https://dev.vk.ru/ru/method/messages.send) — метод для отправки нового сообщения; • [`messages.delete`](https://dev.vk.ru/ru/method/messages.delete) [,](https://dev.vk.ru/ru/method/messages.delete) [`messages.deleteConversation`](https://dev.vk.ru/ru/method/messages.deleteConversation) [,](https://dev.vk.ru/ru/method/messages.deleteConversation) [`messages.restore`](https://dev.vk.ru/ru/method/messages.restore) — методы для удаления и восстановления сообщений и бесед; • [`messages.search`](https://dev.vk.ru/ru/method/messages.search) — метод для поиска по сообщениям; • [`messages.allowMessagesFromGroup`](https://dev.vk.ru/ru/method/messages.allowMessagesFromGroup) [,](https://dev.vk.ru/ru/method/messages.allowMessagesFromGroup) [`messages.denyMessagesFromGroup`](https://dev.vk.ru/ru/method/messages.denyMessagesFromGroup) — методы для подписки на сообщения сообщества и запрета на получение сообщений; • [`docs.getWallUploadServer`](https://dev.vk.ru/ru/method/docs.getWallUploadServer) — метод для загрузки документа на стену. • [`groups.getCallbackConfirmationCode`](https://dev.vk.ru/ru/method/groups.getCallbackConfirmationCode) [,](https://dev.vk.ru/ru/method/groups.getCallbackConfirmationCode) [`groups.getCallbackServerSettings`](https://dev.vk.ru/ru/method/groups.getCallbackServerSettings) [,](https://dev.vk.ru/ru/method/groups.getCallbackServerSettings) [`groups.getCallbackSettings`](https://dev.vk.ru/ru/method/groups.getCallbackSettings) [,](https://dev.vk.ru/ru/method/groups.getCallbackSettings) [`groups.setCallbackSettings`](https://dev.vk.ru/ru/method/groups.setCallbackSettings) — методы для работы с настройками Callback API.

## Получение списка бесед

Метод [`messages.getConversations`](https://dev.vk.ru/ru/method/messages.getConversations) [.](https://dev.vk.ru/ru/method/messages.getConversations)

Параметр `start_message_id` используется для защиты от смещения из-за новых сообщений при подгрузке старых бесед. При первом вызове не передавайте `start_message_id`, запомните значение `id` у сообщения в первой беседе и используйте его в качестве `start_message_id` в последующих вызовах при подгрузке бесед.

## Получение новых бесед

Метод [`messages.getConversations`](https://dev.vk.ru/ru/method/messages.getConversations) [.](https://dev.vk.ru/ru/method/messages.getConversations)

Передавайте значения параметров:

- `start_message_id` — значение `id` сообщения в первой беседе.
- `count` — максимальное количество новых бесед.
- `offset` — отрицательное значение.

## Получение истории сообщений в беседе

Метод [`messages.getHistory`](https://dev.vk.ru/ru/method/messages.getHistory) [.](https://dev.vk.ru/ru/method/messages.getHistory)

Чтобы получить историю конкретной беседы, используйте параметр `peer_id`. Параметр

`start_message_id` используется для защиты от смещения из-за новых сообщений при подгрузке истории. При первом вызове не передавайте `start_message_id`, запомните значение `id` первого сообщения из ответа и используйте его в качестве `start_message_id` в последующих вызовах.

## Получение новых сообщений с помощью Callback API

[Callback API](https://dev.vk.ru/ru/api/callback/getting-started) позволяет мгновенно получать информацию о новых сообщениях в адрес сообщества.

Для работы с Callback API вам потребуется серверный скрипт для обработки уведомлений. Настройте оповещения, следуя [документации](https://dev.vk.ru/ru/api/callback/getting-started), среди типов событий выберите Получение нового сообщения ( `message_new`).

ВКонтакте будет отправлять на ваш сервер оповещение о каждом новом сообщении с [объектом](https://dev.vk.ru/ru/reference/objects/message) [личного сообщения](https://dev.vk.ru/ru/reference/objects/message) в формате:

```json
{
  "type": "message_new",
  "object": "..."
}
```

В уведомлении содержится исчерпывающая информация о сообщении — вы можете сразу ответить на него, используя метод [`messages.send`](https://dev.vk.ru/ru/method/messages.send) [.](https://dev.vk.ru/ru/method/messages.send)

## Передача произвольного параметра с помощью ссылки vk.me

vk.me — это сервис коротких URL, который перенаправляет пользователей в указанную беседу. Ссылка имеет формат [http://vk.me/{group_name}](http://vk.me/%7Bgroup_name%7D), где `group_name` — идентификатор сообщества. К примеру, vk.me/apiclub.

Вы можете не только создать красивую ссылку на беседу с сообществом, но и передать в такой ссылке произвольные параметры `ref` и `ref_source`, которые вернутся в объекте сообщения в

[событии](https://dev.vk.ru/ru/api/community-events/json-schema) `message_new` [Callback API](https://dev.vk.ru/ru/api/callback/getting-started) или [Bots Long Poll API](https://dev.vk.ru/ru/api/bots-long-poll/getting-started), в случае если пользователь начнёт или продолжит беседу по ссылке вида vk.me.

Это полезно для отслеживания эффективности ссылок, размещенных в разных каналах, или привязки пользователя к сеансу или аккаунту во внешнем приложении. В зависимости от переданного параметра можно варьировать ответы бота в сообществе.

Ссылка vk.me с дополнительными параметрами выглядит следующим образом:

```
vk.me/{group_name}?ref={ref}&ref_source={ref_source}
```

Также сработает ссылка вида:

```
vk.com/write-{group_id}?ref={ref}&ref_source={ref_source}
```

## Отправка изображений

Чтобы отправить изображение в сообщении, используйте параметр `attachments` в методе

[`messages.send`](https://dev.vk.ru/ru/method/messages.send). Вы можете использовать изображение, которое уже есть на сайте ВКонтакте, либо [загрузить новое](https://dev.vk.ru/ru/api/upload/photo-in-message).

Для загрузки фотографий и документов в сообщения сообщества используйте, соответственно, методы [`photos.getMessagesUploadServer`](https://dev.vk.ru/ru/method/photos.getMessagesUploadServer) и [`docs.getMessagesUploadServer`](https://dev.vk.ru/ru/method/docs.getMessagesUploadServer). Это позволит загружать вложения для неограниченного числа собеседников.
