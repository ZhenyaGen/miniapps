# messages

**Раздел:** messages  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Messages

Методы для работы с личными сообщениями.

Важно! Методы `messages` можно вызвать с ключом доступа пользователя, полученным в Standalone-приложении через [`Implicit Flow`](https://dev.vk.ru/ru/api/access-token/implicit-flow-user) с правом доступа `messages`, если вы запрашивали его ранее. Для новых приложений это право не выдаётся.

Для моментального получения входящих сообщений используйте [LongPoll сервер](https://dev.vk.ru/ru/api/user-long-poll/getting-started).

Информация об ограничении Messages API находится в [Roadmap](https://dev.vk.ru/ru/reference/roadmap#%D0%9E%D0%B3%D1%80%D0%B0%D0%BD%D0%B8%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%20Messages%20API).

Обратите внимание: методы для работы со звонками перенесены в новую секцию [calls](https://dev.vk.ru/ru/method/calls). Старые методы звонков из секции messages были помечены устаревшими и могут быть удалены в будущих версиях API.

[`addChatUser`](https://dev.vk.ru/ru/method/messages.addChatUser) Добавляет в мультидиалог нового пользователя.

[`allowMessagesFromGroup`](https://dev.vk.ru/ru/method/messages.allowMessagesFromGroup) Позволяет разрешить отправку сообщений от сообщества текущему пользователю.

[`createChat`](https://dev.vk.ru/ru/method/messages.createChat) Создаёт чат с несколькими участниками.

[`delete`](https://dev.vk.ru/ru/method/messages.delete) Удаляет сообщение.

[`deleteChatPhoto`](https://dev.vk.ru/ru/method/messages.deleteChatPhoto) Позволяет удалить фотографию мультидиалога.

[`deleteConversation`](https://dev.vk.ru/ru/method/messages.deleteConversation) Удаляет беседу.

[`deleteReaction`](https://dev.vk.ru/ru/method/messages.deleteReaction) Удаление ранее поставленной реакции

[`denyMessagesFromGroup`](https://dev.vk.ru/ru/method/messages.denyMessagesFromGroup) Позволяет запретить отправку сообщений от сообщества текущему пользователю.

[`edit`](https://dev.vk.ru/ru/method/messages.edit) Редактирует сообщение.

[`editChat`](https://dev.vk.ru/ru/method/messages.editChat) Изменяет название беседы.

[`forceCallFinish`](https://dev.vk.ru/ru/method/messages.forceCallFinish) Метод используется для принудительного завершения звонка

| [`getByConversationMessageI`](https://dev.vk.ru/ru/method/messages.getByConversationMessageId) [`d`](https://dev.vk.ru/ru/method/messages.getByConversationMessageId) | Возвращает сообщения по conversation_message_id. |
|---|---|
| [`getById`](https://dev.vk.ru/ru/method/messages.getById) | Возвращает сообщения по их идентификаторам. |
| [`getChat`](https://dev.vk.ru/ru/method/messages.getChat) | Возвращает информацию о беседе. |
| [`getChatPreview`](https://dev.vk.ru/ru/method/messages.getChatPreview) | Получает данные для превью чата с приглашением по ссылке. |
| [`getConversationMembers`](https://dev.vk.ru/ru/method/messages.getConversationMembers) | Метод получает список участников беседы. |
| [`getConversations`](https://dev.vk.ru/ru/method/messages.getConversations) | Возвращает список бесед пользователя. |
| [`getConversationsById`](https://dev.vk.ru/ru/method/messages.getConversationsById) | Позволяет получить беседу по её идентификатору. |
| [`getHistory`](https://dev.vk.ru/ru/method/messages.getHistory) | Возвращает историю сообщений для указанного диалога. |
| [`getHistoryAttachments`](https://dev.vk.ru/ru/method/messages.getHistoryAttachments) | Возвращает материалы диалога или беседы. |
| [`getImportantMessages`](https://dev.vk.ru/ru/method/messages.getImportantMessages) | Возвращает список важных сообщений пользователя. |
| [`getInviteLink`](https://dev.vk.ru/ru/method/messages.getInviteLink) | Получает ссылку для приглашения пользователя в беседу. |
| [`getLastActivity`](https://dev.vk.ru/ru/method/messages.getLastActivity) | Метод получает текущий статус и дату последней активности пользователя. |
| [`getLongPollHistory`](https://dev.vk.ru/ru/method/messages.getLongPollHistory) | Возвращает обновления в личных сообщениях пользователя. |
| [`getLongPollServer`](https://dev.vk.ru/ru/method/messages.getLongPollServer) | Возвращает данные, необходимые для [подключения к Long Poll](https://dev.vk.ru/ru/api/user-long-poll/getting-started) [серверу](https://dev.vk.ru/ru/api/user-long-poll/getting-started). |
| [`getMessagesReactions`](https://dev.vk.ru/ru/method/messages.getMessagesReactions) | Получить актуальные счётчики реакций на сообщения |
| [`getReactedPeers`](https://dev.vk.ru/ru/method/messages.getReactedPeers) | Получить список пользователей и сообществ, которые поставили реакцию на сообщение |
| [`getReactionsAssets`](https://dev.vk.ru/ru/method/messages.getReactionsAssets) | Получение ассетов реакций |
| [`isMessagesFromGroupAllow`](https://dev.vk.ru/ru/method/messages.isMessagesFromGroupAllowed) [`ed`](https://dev.vk.ru/ru/method/messages.isMessagesFromGroupAllowed) | Возвращает информацию о том, разрешена ли отправка сообщений от сообщества пользователю. |
| [`joinChatByInviteLink`](https://dev.vk.ru/ru/method/messages.joinChatByInviteLink) | Позволяет присоединиться к чату по ссылке-приглашению. |
| [`markAsAnsweredConversati`](https://dev.vk.ru/ru/method/messages.markAsAnsweredConversation) [`on`](https://dev.vk.ru/ru/method/messages.markAsAnsweredConversation) | Помечает беседу как отвеченную либо снимает отметку. |
| [`markAsImportant`](https://dev.vk.ru/ru/method/messages.markAsImportant) | Помечает сообщения как важные либо снимает отметку. |
| [`markAsImportantConversati`](https://dev.vk.ru/ru/method/messages.markAsImportantConversation) [`on`](https://dev.vk.ru/ru/method/messages.markAsImportantConversation) | Помечает беседу как важную либо снимает отметку. |
| [`markAsRead`](https://dev.vk.ru/ru/method/messages.markAsRead) | Метод помечает сообщения как прочитанные. |
| [`markReactionsAsRead`](https://dev.vk.ru/ru/method/messages.markReactionsAsRead) | Отмечает прочитанными все реакции на сообщениях с заданными cmids |
| [`pin`](https://dev.vk.ru/ru/method/messages.pin) | Закрепляет сообщение. |
| [`removeChatUser`](https://dev.vk.ru/ru/method/messages.removeChatUser) | Исключает из мультидиалога пользователя, если текущий пользователь или сообщество является администратором беседы либо текущий пользователь пригласил исключаемого пользователя. |
| [`restore`](https://dev.vk.ru/ru/method/messages.restore) | Восстанавливает удаленное сообщение. |
| [`search`](https://dev.vk.ru/ru/method/messages.search) | Возвращает список найденных личных сообщений текущего пользователя по введенной строке поиска. |
| [`searchConversations`](https://dev.vk.ru/ru/method/messages.searchConversations) | Позволяет искать диалоги. |
| [`send`](https://dev.vk.ru/ru/method/messages.send) | Метод отправляет сообщение. |
| [`sendMessageEventAnswer`](https://dev.vk.ru/ru/method/messages.sendMessageEventAnswer) | Отправляет событие с действием, которое произойдет при нажатии на callback-кнопку. |
| [`sendReaction`](https://dev.vk.ru/ru/method/messages.sendReaction) | Метод установки реакции на сообщение |
| [`setActivity`](https://dev.vk.ru/ru/method/messages.setActivity) | Изменяет статус набора текста пользователем в диалоге. |
| [`setChatPhoto`](https://dev.vk.ru/ru/method/messages.setChatPhoto) | Метод сохраняет обложку беседы после её успешной [загрузки на](https://dev.vk.ru/ru/api/upload/main-photo-in-chat) [сервер](https://dev.vk.ru/ru/api/upload/main-photo-in-chat). |
| [`startCall`](https://dev.vk.ru/ru/method/messages.startCall) | Старт нового звонка от имени пользователя или от сообщества |
| [`unpin`](https://dev.vk.ru/ru/method/messages.unpin) | Открепляет сообщение. |
