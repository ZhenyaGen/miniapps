# groups

**Раздел:** groups  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Groups

[`addAddress`](https://dev.vk.ru/ru/method/groups.addAddress) Позволяет добавить адрес в сообщество. Список адресов может быть получен методом [`groups.getAddresses`](https://dev.vk.ru/ru/method/groups.getAddresses) [.](https://dev.vk.ru/ru/method/groups.getAddresses)

Для того, чтобы воспользоваться этим методом, вы должны быть администратором сообщества.

[`addCallbackServer`](https://dev.vk.ru/ru/method/groups.addCallbackServer) Добавляет сервер для [Callback API](https://dev.vk.ru/ru/api/callback/getting-started) в сообщество.

[`approveRequest`](https://dev.vk.ru/ru/method/groups.approveRequest) Позволяет одобрить заявку в группу от пользователя.

[`ban`](https://dev.vk.ru/ru/method/groups.ban) Добавляет пользователя или группу в черный список сообщества.

[`deleteAddress`](https://dev.vk.ru/ru/method/groups.deleteAddress) Удаляет адрес сообщества.

[`deleteCallbackServer`](https://dev.vk.ru/ru/method/groups.deleteCallbackServer) Удаляет сервер для [Callback API](https://dev.vk.ru/ru/api/callback/getting-started) из сообщества.

[`disableOnline`](https://dev.vk.ru/ru/method/groups.disableOnline) Выключает статус «онлайн» в сообществе.

[`editAddress`](https://dev.vk.ru/ru/method/groups.editAddress) Метод редактирует адрес в сообществе. Чтобы получить список адресов, вызовите метод [`groups.getAddresses`](https://dev.vk.ru/ru/method/groups.getAddresses) [.](https://dev.vk.ru/ru/method/groups.getAddresses)

[`editCallbackServer`](https://dev.vk.ru/ru/method/groups.editCallbackServer) Редактирует данные сервера для [Callback API](https://dev.vk.ru/ru/api/callback/getting-started) в сообществе.

[`editManager`](https://dev.vk.ru/ru/method/groups.editManager) Позволяет назначить/разжаловать руководителя в сообществе или изменить уровень его полномочий.

[`enableOnline`](https://dev.vk.ru/ru/method/groups.enableOnline) Включает статус «онлайн» в сообществе.

[`get`](https://dev.vk.ru/ru/method/groups.get) Возвращает список сообществ указанного пользователя.

[`getAddresses`](https://dev.vk.ru/ru/method/groups.getAddresses) Метод возвращает адрес указанного сообщества.

[`getBanned`](https://dev.vk.ru/ru/method/groups.getBanned) Возвращает список забаненных пользователей и сообществ в сообществе.

[`getById`](https://dev.vk.ru/ru/method/groups.getById) Возвращает информацию о заданном сообществе или о нескольких сообществах.

| [`getCallbackConfirmationCo`](https://dev.vk.ru/ru/method/groups.getCallbackConfirmationCode) [`de`](https://dev.vk.ru/ru/method/groups.getCallbackConfirmationCode) | Позволяет получить строку, необходимую для подтверждения адреса сервера в [Callback API](https://dev.vk.ru/ru/api/callback/getting-started). |
|---|---|
| [`getCallbackServers`](https://dev.vk.ru/ru/method/groups.getCallbackServers) | Получает информацию о серверах для [Callback API](https://dev.vk.ru/ru/api/callback/getting-started) в сообществе. |
| [`getCallbackSettings`](https://dev.vk.ru/ru/method/groups.getCallbackSettings) | Позволяет получить настройки уведомлений [Callback API](https://dev.vk.ru/ru/api/callback/getting-started) для сообщества. |
| [`getCatalogInfo`](https://dev.vk.ru/ru/method/groups.getCatalogInfo) | Возвращает список категорий для каталога сообществ. |
| [`getInvitedUsers`](https://dev.vk.ru/ru/method/groups.getInvitedUsers) | Возвращает список пользователей, которые были приглашены в группу. |
| [`getInvites`](https://dev.vk.ru/ru/method/groups.getInvites) | Данный метод возвращает список приглашений в сообщества и встречи текущего пользователя. |
| [`getLongPollServer`](https://dev.vk.ru/ru/method/groups.getLongPollServer) | Возвращает данные для подключения к [Bots Longpoll API](https://dev.vk.ru/ru/api/bots-long-poll/getting-started). |
| [`getLongPollSettings`](https://dev.vk.ru/ru/method/groups.getLongPollSettings) | Получает настройки Bots Longpoll API для сообщества. |
| [`getMembers`](https://dev.vk.ru/ru/method/groups.getMembers) | Возвращает список участников сообщества. |
| [`getOnlineStatus`](https://dev.vk.ru/ru/method/groups.getOnlineStatus) | Получает информацию о статусе «онлайн» в сообществе. |
| [`getRequests`](https://dev.vk.ru/ru/method/groups.getRequests) | Возвращает список заявок на вступление в сообщество. |
| [`getTagList`](https://dev.vk.ru/ru/method/groups.getTagList) | Возвращает список тегов сообщества |
| [`getTokenPermissions`](https://dev.vk.ru/ru/method/groups.getTokenPermissions) | Возвращает настройки прав для ключа доступа сообщества. |
| [`invite`](https://dev.vk.ru/ru/method/groups.invite) | Позволяет приглашать друзей в группу. |
| [`isMember`](https://dev.vk.ru/ru/method/groups.isMember) | Возвращает информацию о том, является ли пользователь участником сообщества. |
| [`removeUser`](https://dev.vk.ru/ru/method/groups.removeUser) | Позволяет исключить пользователя из группы или отклонить заявку на вступление. |
| [`search`](https://dev.vk.ru/ru/method/groups.search) | Осуществляет поиск сообществ по заданной подстроке. |
| [`setCallbackSettings`](https://dev.vk.ru/ru/method/groups.setCallbackSettings) | Позволяет задать настройки уведомлений о событиях в [Callback](https://dev.vk.ru/ru/api/callback/getting-started) [API](https://dev.vk.ru/ru/api/callback/getting-started). |
| [`setLongPollSettings`](https://dev.vk.ru/ru/method/groups.setLongPollSettings) | Задаёт настройки для Bots Long Poll API в сообществе. |
| [`setSettings`](https://dev.vk.ru/ru/method/groups.setSettings) | Устанавливает настройки сообщества |
| [`setUserNote`](https://dev.vk.ru/ru/method/groups.setUserNote) | Позволяет создать или отредактировать заметку о пользователе в рамках переписки пользователя с сообществом |
| [`tagAdd`](https://dev.vk.ru/ru/method/groups.tagAdd) | Позволяет добавить новый тег в сообщество. |
| [`tagBind`](https://dev.vk.ru/ru/method/groups.tagBind) | Позволяет «привязывать» и «отвязывать» теги сообщества к беседам. |
| [`tagDelete`](https://dev.vk.ru/ru/method/groups.tagDelete) | Позволяет удалить тег сообщества. |
| [`tagUpdate`](https://dev.vk.ru/ru/method/groups.tagUpdate) | Позволяет переименовать существующий тег. |
| [`toggleMarket`](https://dev.vk.ru/ru/method/groups.toggleMarket) | Переключает функционал раздела «Товаров» в выбранной группе. |
| [`unban`](https://dev.vk.ru/ru/method/groups.unban) | Убирает пользователя или группу из черного списка сообщества. |
