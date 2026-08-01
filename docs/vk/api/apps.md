# apps

**Раздел:** apps  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Apps

[`addSnippet`](https://dev.vk.ru/ru/method/apps.addSnippet) Метод добавляет новый сниппет в коллекцию сниппетов [мини-](https://dev.vk.ru/ru/mini-apps/development/snippets) [приложения](https://dev.vk.ru/ru/mini-apps/development/snippets) или [игры](https://dev.vk.ru/ru/games/promotion/game-mechanics/snippets).

[`addUsersToTestingGroup`](https://dev.vk.ru/ru/method/apps.addUsersToTestingGroup) Метод добавляет указанных пользователей в группу тестировщиков мини-приложения.

[`deleteAppRequests`](https://dev.vk.ru/ru/method/apps.deleteAppRequests) Удаляет все уведомления о запросах, отправленных из текущего приложения.

[`deleteSnippet`](https://dev.vk.ru/ru/method/apps.deleteSnippet) Метод удаляет сниппет [мини-приложения](https://dev.vk.ru/ru/mini-apps/development/snippets) или [игры](https://dev.vk.ru/ru/games/promotion/game-mechanics/snippets).

[`get`](https://dev.vk.ru/ru/method/apps.get) Метод возвращает данные о приложениях.

[`getCatalog`](https://dev.vk.ru/ru/method/apps.getCatalog) Возвращает список приложений, доступных для пользователей сайта через каталог приложений.

[`getFriendsList`](https://dev.vk.ru/ru/method/apps.getFriendsList) Создает список друзей, который будет использоваться при отправке пользователем приглашений в приложение и игровых запросов.

[`getLeaderboard`](https://dev.vk.ru/ru/method/apps.getLeaderboard) Возвращает рейтинг пользователей в игре.

[`getMiniAppPolicies`](https://dev.vk.ru/ru/method/apps.getMiniAppPolicies) Метод получает ссылки, указанные в разделе [пользовательское](https://dev.vk.ru/ru/mini-apps/settings/general/legal-docs) [соглашение и политика конфиденциальности](https://dev.vk.ru/ru/mini-apps/settings/general/legal-docs) мини-приложения.

[`getScopes`](https://dev.vk.ru/ru/method/apps.getScopes) Метод получает права доступа.

Есть два вида доступов:

## • Базовые — фамилия и имя, фото профиля, пол и дата рождения — доступны сразу после создания приложения в [Сервисе](https://id.vk.com/about/business/go/) [авторизации VK ID](https://id.vk.com/about/business/go/). • Расширенные — доступны после [подтверждения профиля](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/create-application#Kak-podtverdit-profil-biznesa) [бизнеса в сервисе VK Бизнес ID](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/create-application#Kak-podtverdit-profil-biznesa). Если профиль бизнеса уже подтверждён, появится доступ к номеру телефона пользователя. Чтобы метод возвращал другие [расширеннные права доступа](https://dev.vk.ru/ru/reference/access-rights#%D0%9F%D1%80%D0%B0%D0%B2%D0%B0%20%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0%20%D0%B4%D0%BB%D1%8F%20%D1%82%D0%BE%D0%BA%D0%B5%D0%BD%D0%B0%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F), запросите их через обращение в техническую поддержку. Для этого напишите на почту [devsupport@corp.vk.com](mailto:devsupport@corp.vk.com). Получение расширенных доступов рассматривается в индивидуальном порядке.

[`getScore`](https://dev.vk.ru/ru/method/apps.getScore) Метод возвращает количество очков пользователя в этой игре.

[`getSnippets`](https://dev.vk.ru/ru/method/apps.getSnippets) Метод возвращает информацию о сниппетах [мини-приложения](https://dev.vk.ru/ru/mini-apps/development/snippets) или [игры](https://dev.vk.ru/ru/games/promotion/game-mechanics/snippets), созданных с помощью [`apps.addSnippet`](https://dev.vk.ru/ru/method/apps.addSnippet) [.](https://dev.vk.ru/ru/method/apps.addSnippet)

[`getTestingGroups`](https://dev.vk.ru/ru/method/apps.getTestingGroups) Метод возвращает группы тестировщиков мини-приложения.

[`isNotificationsAllowed`](https://dev.vk.ru/ru/method/apps.isNotificationsAllowed) Метод проверяет, разрешил ли пользователь присылать ему [уведомления](https://dev.vk.ru/ru/mini-apps/promotion/social-mechanics/notifications/overview) в мини-приложении.

[`promoHasActiveGift`](https://dev.vk.ru/ru/method/apps.promoHasActiveGift) Проверить есть ли у пользователя подарок в игре.

[`promoUseGift`](https://dev.vk.ru/ru/method/apps.promoUseGift) Метод отмечает подарок, полученный пользователем в промоакции, как использованный.

[`removeTestingGroup`](https://dev.vk.ru/ru/method/apps.removeTestingGroup) Метод удаляет указанную группу тестировщиков мини- приложения.

| [`removeUsersFromTestingGr`](https://dev.vk.ru/ru/method/apps.removeUsersFromTestingGroups) [`oups`](https://dev.vk.ru/ru/method/apps.removeUsersFromTestingGroups) | Метод удаляет указанных пользователей из групп тестировщиков мини-приложения. |
|---|---|
| [`sendRequest`](https://dev.vk.ru/ru/method/apps.sendRequest) | Позволяет отправить запрос другому пользователю в приложении, использующем авторизацию ВКонтакте. |
| [`updateMetaForTestingGrou`](https://dev.vk.ru/ru/method/apps.updateMetaForTestingGroup) [`p`](https://dev.vk.ru/ru/method/apps.updateMetaForTestingGroup) | Метод создает новую или обновляет существующую группу тестировщиков мини-приложения. |
