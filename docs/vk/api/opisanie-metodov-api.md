# Описание методов API

**Раздел:** Описание методов API  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Методы

Account

[`getAppPermissions`](https://dev.vk.ru/ru/method/account.getAppPermissions) Метод получает настройки пользователя вашего [приложения](https://vk.com/apps?act=manage).

Ads

[`addOfficeUsers`](https://dev.vk.ru/ru/method/ads.addOfficeUsers) Добавляет администраторов и/или наблюдателей в рекламный кабинет.

[`checkLink`](https://dev.vk.ru/ru/method/ads.checkLink) Проверяет ссылку на рекламируемый объект.

[`createAds`](https://dev.vk.ru/ru/method/ads.createAds) Создает рекламные объявления.

[`createCampaigns`](https://dev.vk.ru/ru/method/ads.createCampaigns) Создает рекламные кампании.

[`createClients`](https://dev.vk.ru/ru/method/ads.createClients) Метод создаёт клиентов рекламного агентства. Доступен только для рекламных агентств.

[`createLookalikeRequest`](https://dev.vk.ru/ru/method/ads.createLookalikeRequest) Создаёт запрос на поиск похожей аудитории.

[`createTargetGroup`](https://dev.vk.ru/ru/method/ads.createTargetGroup) Создаёт аудиторию для ретаргетинга рекламных объявлений на пользователей, которые посетили сайт рекламодателя (просмотрели информации о товаре, зарегистрировались и т.д.).

[`createTargetPixel`](https://dev.vk.ru/ru/method/ads.createTargetPixel) Создаёт пиксель ретаргетинга.

[`deleteAds`](https://dev.vk.ru/ru/method/ads.deleteAds) Архивирует рекламные объявления.

[`deleteCampaigns`](https://dev.vk.ru/ru/method/ads.deleteCampaigns) Архивирует рекламные кампании.

[`deleteClients`](https://dev.vk.ru/ru/method/ads.deleteClients) Архивирует клиентов рекламного агентства.

[`deleteTargetGroup`](https://dev.vk.ru/ru/method/ads.deleteTargetGroup) Удаляет аудиторию ретаргетинга.

[`deleteTargetPixel`](https://dev.vk.ru/ru/method/ads.deleteTargetPixel) Удаляет пиксель ретаргетинга.

[`getAccounts`](https://dev.vk.ru/ru/method/ads.getAccounts) Возвращает список рекламных кабинетов.

[`getAds`](https://dev.vk.ru/ru/method/ads.getAds) Возвращает список рекламных объявлений.

[`getAdsLayout`](https://dev.vk.ru/ru/method/ads.getAdsLayout) Возвращает описания внешнего вида рекламных объявлений.

[`getAdsTargeting`](https://dev.vk.ru/ru/method/ads.getAdsTargeting) Возвращает параметры таргетинга рекламных объявлений

[`getBudget`](https://dev.vk.ru/ru/method/ads.getBudget) Возвращает текущий бюджет рекламного кабинета.

[`getCampaigns`](https://dev.vk.ru/ru/method/ads.getCampaigns) Возвращает список кампаний рекламного кабинета.

[`getCategories`](https://dev.vk.ru/ru/method/ads.getCategories) Позволяет получить возможные тематики рекламных объявлений.

[`getClients`](https://dev.vk.ru/ru/method/ads.getClients) Метод возвращает список клиентов рекламного агентства. Доступен только для рекламных агентств.

[`getDemographics`](https://dev.vk.ru/ru/method/ads.getDemographics) Возвращает демографическую статистику по рекламным объявлениям или кампаниям.

[`getFloodStats`](https://dev.vk.ru/ru/method/ads.getFloodStats) Возвращает информацию о текущем состоянии счетчика — количество оставшихся запусков методов и время до следующего обнуления счетчика в секундах.

[`getLookalikeRequests`](https://dev.vk.ru/ru/method/ads.getLookalikeRequests) Возвращает список запросов на поиск похожей аудитории.

[`getMusicians`](https://dev.vk.ru/ru/method/ads.getMusicians) Возвращает информацию о музыкантах, на слушателей которых доступно таргетирование.

[`getMusiciansByIds`](https://dev.vk.ru/ru/method/ads.getMusiciansByIds) Возвращает информацию о музыкантах на слушателей, для которых доступно таргетирование.

[`getOfficeUsers`](https://dev.vk.ru/ru/method/ads.getOfficeUsers) Возвращает список администраторов и наблюдателей рекламного кабинета.

[`getPostsReach`](https://dev.vk.ru/ru/method/ads.getPostsReach) Возвращает подробную статистику по охвату рекламных записей из объявлений и кампаний для продвижения записей сообщества.

[`getRejectionReason`](https://dev.vk.ru/ru/method/ads.getRejectionReason) Возвращает причину, по которой указанному объявлению было отказано в прохождении премодерации.

[`getStatistics`](https://dev.vk.ru/ru/method/ads.getStatistics) Возвращает статистику показателей эффективности по рекламным объявлениям, кампаниям, клиентам или всему кабинету.

[`getSuggestions`](https://dev.vk.ru/ru/method/ads.getSuggestions) Возвращает набор подсказок для различных параметров таргетинга.

[`getTargetGroups`](https://dev.vk.ru/ru/method/ads.getTargetGroups) Возвращает список аудиторий ретаргетинга.

[`getTargetPixels`](https://dev.vk.ru/ru/method/ads.getTargetPixels) Возвращает список пикселей ретаргетинга.

[`getTargetingStats`](https://dev.vk.ru/ru/method/ads.getTargetingStats) Возвращает размер целевой аудитории таргетинга, а также рекомендованные значения CPC и CPM.

[`getUploadURL`](https://dev.vk.ru/ru/method/ads.getUploadURL) Возвращает URL-адрес для загрузки фотографии рекламного объявления.

Подробности о загрузке изображений для объявлений смотрите на [отдельной странице](https://dev.vk.ru/ru/method/ads/upload-photo-ads).

[`getVideoUploadURL`](https://dev.vk.ru/ru/method/ads.getVideoUploadURL) Возвращает URL-адрес для загрузки видеозаписи рекламного объявления.

Подробности о загрузке видеозаписей для объявлений смотрите на [отдельной странице](https://dev.vk.ru/ru/method/ads/upload-video-ads).

[`importTargetContacts`](https://dev.vk.ru/ru/method/ads.importTargetContacts) Импортирует список контактов рекламодателя для учета зарегистрированных во ВКонтакте пользователей в аудитории ретаргетинга.

[`removeOfficeUsers`](https://dev.vk.ru/ru/method/ads.removeOfficeUsers) Удаляет администраторов и/или наблюдателей из рекламного кабинета.

[`removeTargetContacts`](https://dev.vk.ru/ru/method/ads.removeTargetContacts) Принимает запрос на исключение контактов рекламодателя из аудитории ретаргетинга.

[`saveLookalikeRequestResult`](https://dev.vk.ru/ru/method/ads.saveLookalikeRequestResult) Сохраняет результат поиска похожей аудитории.

[`shareTargetGroup`](https://dev.vk.ru/ru/method/ads.shareTargetGroup) Предоставляет доступ к аудитории ретаргетинга другому рекламному кабинету. В результате выполнения метода возвращается идентификатор аудитории для указанного кабинета.

[`updateAds`](https://dev.vk.ru/ru/method/ads.updateAds) Редактирует рекламные объявления.

[`updateCampaigns`](https://dev.vk.ru/ru/method/ads.updateCampaigns) Редактирует рекламные кампании.

[`updateClients`](https://dev.vk.ru/ru/method/ads.updateClients) Метод редактирует клиентов рекламного агентства. Доступен только для рекламных агентств.

[`updateOfficeUsers`](https://dev.vk.ru/ru/method/ads.updateOfficeUsers) Добавляет или редактирует администраторов и/или наблюдателей в рекламный кабинет.

[`updateTargetGroup`](https://dev.vk.ru/ru/method/ads.updateTargetGroup) Редактирует аудиторию ретаргетинга.

[`updateTargetPixel`](https://dev.vk.ru/ru/method/ads.updateTargetPixel) Редактирует пиксель ретаргетинга.

AppWidgets

[`getAppImageUploadServer`](https://dev.vk.ru/ru/method/appWidgets.getAppImageUploadServer) Позволяет получить адрес для загрузки фотографии в коллекцию приложения для виджетов приложений сообществ. Подробнее — в разделе [Изображения в виджете](https://dev.vk.com/ru/api/community-apps-widgets/getting-started#%D0%98%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B2%20%D0%B2%D0%B8%D0%B4%D0%B6%D0%B5%D1%82%D0%B5).

[`getAppImages`](https://dev.vk.ru/ru/method/appWidgets.getAppImages) Позволяет получить коллекцию изображений, загруженных для приложения, в [виджетах приложений сообществ](https://dev.vk.ru/ru/api/community-apps-widgets/getting-started).

| [`getGroupImageUploadServ`](https://dev.vk.ru/ru/method/appWidgets.getGroupImageUploadServer) [`er`](https://dev.vk.ru/ru/method/appWidgets.getGroupImageUploadServer) | Позволяет получить адрес для загрузки фотографии в коллекцию сообщества для виджетов приложений сообществ. Подробнее — в разделе [Изображения в виджете](https://dev.vk.com/ru/api/community-apps-widgets/getting-started#%D0%98%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B2%20%D0%B2%D0%B8%D0%B4%D0%B6%D0%B5%D1%82%D0%B5). |
|---|---|
| [`getGroupImages`](https://dev.vk.ru/ru/method/appWidgets.getGroupImages) | Позволяет получить коллекцию изображений, загруженных для приложения, в [виджетах приложений сообществ](https://dev.vk.ru/ru/api/community-apps-widgets/getting-started). |
| [`getImagesById`](https://dev.vk.ru/ru/method/appWidgets.getImagesById) | Позволяет получить изображение для [виджетов приложений](https://dev.vk.ru/ru/api/community-apps-widgets/getting-started) [сообществ](https://dev.vk.ru/ru/api/community-apps-widgets/getting-started) по его идентификатору. |
| [`saveAppImage`](https://dev.vk.ru/ru/method/appWidgets.saveAppImage) | Позволяет сохранить изображение в коллекцию приложения для виджетов приложений сообществ после загрузки на сервер. Подробнее — в разделе [Изображения в виджете](https://dev.vk.ru/ru/api/community-apps-widgets/getting-started#%D0%98%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B2%20%D0%B2%D0%B8%D0%B4%D0%B6%D0%B5%D1%82%D0%B5). |
| [`saveGroupImage`](https://dev.vk.ru/ru/method/appWidgets.saveGroupImage) | Позволяет сохранить изображение в коллекцию сообщества для виджетов приложений сообществ после загрузки на сервер. Подробнее — в разделе [Изображения в виджете](https://dev.vk.ru/ru/api/community-apps-widgets/getting-started#%D0%98%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B2%20%D0%B2%D0%B8%D0%B4%D0%B6%D0%B5%D1%82%D0%B5). |
| [`update`](https://dev.vk.ru/ru/method/appWidgets.update) | Позволяет обновить [виджет приложения сообщества](https://dev.vk.ru/ru/api/community-apps-widgets/getting-started). |

Apps

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

Board

[`addTopic`](https://dev.vk.ru/ru/method/board.addTopic) Создает новую тему в списке обсуждений группы.

[`createComment`](https://dev.vk.ru/ru/method/board.createComment) Добавляет новый комментарий в обсуждении.

[`deleteComment`](https://dev.vk.ru/ru/method/board.deleteComment) Удаляет сообщение темы в обсуждениях сообщества.

[`editComment`](https://dev.vk.ru/ru/method/board.editComment) Редактирует одно из сообщений в обсуждении сообщества.

[`getComments`](https://dev.vk.ru/ru/method/board.getComments) Возвращает список сообщений в указанной теме.

[`getTopics`](https://dev.vk.ru/ru/method/board.getTopics) Возвращает список тем в обсуждениях указанной группы.

[`restoreComment`](https://dev.vk.ru/ru/method/board.restoreComment) Метод восстанавливает в сообществе удалённое из обсуждения сообщение.

Bugtracker

| [`addCompanyGroupsMembe`](https://dev.vk.ru/ru/method/bugtracker.addCompanyGroupsMembers) [`rs`](https://dev.vk.ru/ru/method/bugtracker.addCompanyGroupsMembers) | Добавляет [сотрудников](https://dev.vk.ru/ru/vk-testers/employees) в группы доступа [компании](https://dev.vk.ru/ru/vk-testers/company). |
|---|---|
| [`addCompanyMembers`](https://dev.vk.ru/ru/method/bugtracker.addCompanyMembers) | Добавляет [сотрудников](https://dev.vk.ru/ru/vk-testers/employees) в [компанию](https://dev.vk.ru/ru/vk-testers/company). |
| [`changeBugreportStatus`](https://dev.vk.ru/ru/method/bugtracker.changeBugreportStatus) | Изменяет статус отчёта в соответствии с правилами смены статусов. |
| [`createComment`](https://dev.vk.ru/ru/method/bugtracker.createComment) | Оставляет комментарий к отчёту. |
| [`getBugreportById`](https://dev.vk.ru/ru/method/bugtracker.getBugreportById) | Возвращает информацию об отчёте. |
| [`getCompanyGroupMember`](https://dev.vk.ru/ru/method/bugtracker.getCompanyGroupMembers) [`s`](https://dev.vk.ru/ru/method/bugtracker.getCompanyGroupMembers) | Возвращает список [сотрудников](https://dev.vk.ru/ru/vk-testers/employees) из группы доступа [компании](https://dev.vk.ru/ru/vk-testers/company). |
| [`getCompanyMembers`](https://dev.vk.ru/ru/method/bugtracker.getCompanyMembers) | Возвращает список [сотрудников](https://dev.vk.ru/ru/vk-testers/employees) [компании](https://dev.vk.ru/ru/vk-testers/company). |
| [`getDownloadVersionUrl`](https://dev.vk.ru/ru/method/bugtracker.getDownloadVersionUrl) | Возвращает одноразовую ссылку для скачивания сборки, прикреплённой к указанной версии приложения в [продукте](https://dev.vk.ru/ru/vk-tersters/product). |
| [`getProductBuildUploadServ`](https://dev.vk.ru/ru/method/bugtracker.getProductBuildUploadServer) [`er`](https://dev.vk.ru/ru/method/bugtracker.getProductBuildUploadServer) | Получает ссылку для загрузки сборки приложения в [продукт](https://dev.vk.ru/ru/vk-testers/product). |
| [`removeCompanyGroupMe`](https://dev.vk.ru/ru/method/bugtracker.removeCompanyGroupMember) [`mber`](https://dev.vk.ru/ru/method/bugtracker.removeCompanyGroupMember) | Исключает [сотрудника](https://dev.vk.ru/ru/vk-testers/employees) из группы доступа [компании](https://dev.vk.ru/ru/vk-testers/company). |
| [`removeCompanyMember`](https://dev.vk.ru/ru/method/bugtracker.removeCompanyMember) | Удаляет [сотрудника](https://dev.vk.ru/ru/vk-testers/employees) из [компании](https://dev.vk.ru/ru/vk-testers/company) и из всех групп доступа в этой компании. |
| [`saveProductVersion`](https://dev.vk.ru/ru/method/bugtracker.saveProductVersion) | Метод создаёт версию или сохраняет изменения версии [продукта](https://dev.vk.ru/ru/vk-testers/product). |
| [`setCompanyMemberRole`](https://dev.vk.ru/ru/method/bugtracker.setCompanyMemberRole) | Изменяет [уровень доступа сотрудника](https://dev.vk.ru/ru/vk-testers/employees#%D0%A3%D1%80%D0%BE%D0%B2%D0%BD%D0%B8%20%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0%20%D1%81%D0%BE%D1%82%D1%80%D1%83%D0%B4%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2) в [компании](https://dev.vk.ru/ru/vk-testers/company). |
| [`setProductIsOver`](https://dev.vk.ru/ru/method/bugtracker.setProductIsOver) | Отключает или включает приём отчётов в [продукте](https://dev.vk.ru/ru/vk-testers/product). |

Calls

[`forceFinish`](https://dev.vk.ru/ru/method/calls.forceFinish) Принудительно завершить звонок

[`start`](https://dev.vk.ru/ru/method/calls.start) Создать новый звонок от имени пользователя или сообщества

CrowdCustomer

[`createTaskJob`](https://dev.vk.ru/ru/method/crowdCustomer.createTaskJob) Создание задания на разметку

[`getTaskResults`](https://dev.vk.ru/ru/method/crowdCustomer.getTaskResults) Получение результатов разметки задачи

Database

[`getCities`](https://dev.vk.ru/ru/method/database.getCities) Возвращает список городов.

[`getCitiesById`](https://dev.vk.ru/ru/method/database.getCitiesById) Возвращает информацию о городах и регионах по их идентификаторам.

[`getRegions`](https://dev.vk.ru/ru/method/database.getRegions) Возвращает список регионов.

Docs

[`get`](https://dev.vk.ru/ru/method/docs.get) Возвращает расширенную информацию о документах пользователя или сообщества.

[`getById`](https://dev.vk.ru/ru/method/docs.getById) Возвращает информацию о документах по их идентификаторам.

[`getMessagesUploadServer`](https://dev.vk.ru/ru/method/docs.getMessagesUploadServer) Метод получает адрес сервера для [загрузки файла](https://dev.vk.ru/ru/api/upload/document-in-profile) в личное сообщение.

[`getWallUploadServer`](https://dev.vk.ru/ru/method/docs.getWallUploadServer) Метод получает адрес сервера для [загрузки документа](https://dev.vk.ru/ru/api/upload/document-in-profile) в папку Отправленные для последующей отправки документа на стену или личным сообщением.

[`save`](https://dev.vk.ru/ru/method/docs.save) Метод сохраняет файл после его успешной [загрузки на сервер](https://dev.vk.ru/ru/api/upload/document-in-profile).

Donut

[`getFriends`](https://dev.vk.ru/ru/method/donut.getFriends) Возвращает список донов, которые подписаны на определенные сообщества, из числа друзей пользователя.

[`getSubscription`](https://dev.vk.ru/ru/method/donut.getSubscription) Возвращает информацию о подписке VK Donut.

[`getSubscriptions`](https://dev.vk.ru/ru/method/donut.getSubscriptions) Возвращает информацию о подписках пользователя.

[`isDon`](https://dev.vk.ru/ru/method/donut.isDon) Возвращает информацию о том, подписан ли пользователь на платный контент (является доном).

Friends

[`areFriends`](https://dev.vk.ru/ru/method/friends.areFriends) Метод возвращает информацию о том, добавлен ли текущий пользователь в друзья указанных пользователей.

[`get`](https://dev.vk.ru/ru/method/friends.get) Возвращает список идентификаторов друзей пользователя или расширенную информацию о друзьях пользователя (при использовании параметра `fields`).

[`getAppUsers`](https://dev.vk.ru/ru/method/friends.getAppUsers) Возвращает список идентификаторов друзей текущего пользователя, которые установили приложение. В список попадут только те пользователи, которые не ограничили видимость своей активности в мини-приложениях в настройках приватности.

[`getLists`](https://dev.vk.ru/ru/method/friends.getLists) Возвращает список меток друзей пользователя.

[`getMutual`](https://dev.vk.ru/ru/method/friends.getMutual) Возвращает список идентификаторов общих друзей между парой пользователей.

[`getOnline`](https://dev.vk.ru/ru/method/friends.getOnline) Возвращает список идентификаторов друзей пользователя, находящихся на сайте.

[`getRecent`](https://dev.vk.ru/ru/method/friends.getRecent) Возвращает список идентификаторов недавно добавленных друзей текущего пользователя.

[`getRequests`](https://dev.vk.ru/ru/method/friends.getRequests) Возвращает информацию о полученных или отправленных заявках на добавление в друзья для текущего пользователя.

[`getSuggestions`](https://dev.vk.ru/ru/method/friends.getSuggestions) Возвращает список профилей пользователей, которые могут быть друзьями текущего пользователя.

[`search`](https://dev.vk.ru/ru/method/friends.search) Позволяет искать по списку друзей пользователей.

Gifts

[`get`](https://dev.vk.ru/ru/method/gifts.get) Возвращает список полученных подарков пользователя.

Groups

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

LeadForms

[`create`](https://dev.vk.ru/ru/method/leadForms.create) Создаёт форму сбора заявок.

[`delete`](https://dev.vk.ru/ru/method/leadForms.delete) Удаляет форму сбора заявок.

[`get`](https://dev.vk.ru/ru/method/leadForms.get) Возвращает информацию о форме сбора заявок.

[`getLeads`](https://dev.vk.ru/ru/method/leadForms.getLeads) Возвращает заявки формы.

[`getUploadURL`](https://dev.vk.ru/ru/method/leadForms.getUploadURL) Возвращает URL для загрузки обложки для формы.

[`list`](https://dev.vk.ru/ru/method/leadForms.list) Возвращает список форм сообщества.

[`update`](https://dev.vk.ru/ru/method/leadForms.update) Обновляет форму сбора заявок.

Likes

[`getList`](https://dev.vk.ru/ru/method/likes.getList) Метод получает список идентификаторов пользователей, которые поставили у заданного объекта отметку «Нравится».

[`isLiked`](https://dev.vk.ru/ru/method/likes.isLiked) Проверяет, находится ли объект в списке Мне нравится заданного пользователя.

LoyaltyTeen

[`hasAccount`](https://dev.vk.ru/ru/method/loyaltyTeen.hasAccount)

[`partnerCompleteAchieveme`](https://dev.vk.ru/ru/method/loyaltyTeen.partnerCompleteAchievement) [`nt`](https://dev.vk.ru/ru/method/loyaltyTeen.partnerCompleteAchievement)

[`partnerCompleteTask`](https://dev.vk.ru/ru/method/loyaltyTeen.partnerCompleteTask)

[`partnerCreateAccount`](https://dev.vk.ru/ru/method/loyaltyTeen.partnerCreateAccount)

[`partnerGetAchievements`](https://dev.vk.ru/ru/method/loyaltyTeen.partnerGetAchievements)

[`partnerGetBalance`](https://dev.vk.ru/ru/method/loyaltyTeen.partnerGetBalance)

[`partnerGetOffers`](https://dev.vk.ru/ru/method/loyaltyTeen.partnerGetOffers)

[`partnerHasAccount`](https://dev.vk.ru/ru/method/loyaltyTeen.partnerHasAccount)

[`sumsubCallback`](https://dev.vk.ru/ru/method/loyaltyTeen.sumsubCallback)

Market

[`add`](https://dev.vk.ru/ru/method/market.add) Метод добавляет новый товар.

[`addAlbum`](https://dev.vk.ru/ru/method/market.addAlbum) Метод добавляет новую подборку с товарами в сообщество.

[`addProperty`](https://dev.vk.ru/ru/method/market.addProperty) Добавляет новое свойство, которое может быть задано для товаров сообщества (например, «цвет», «размер» и т.д.).

[`addPropertyVariant`](https://dev.vk.ru/ru/method/market.addPropertyVariant) Добавляет вариант свойства. Всего у свойства может быть 50 вариантов.

[`addToAlbum`](https://dev.vk.ru/ru/method/market.addToAlbum) Добавляет товар в одну или несколько выбранных подборок.

[`createComment`](https://dev.vk.ru/ru/method/market.createComment) Создаёт новый комментарий к товару.

[`delete`](https://dev.vk.ru/ru/method/market.delete) Удаляет товар.

[`deleteAlbum`](https://dev.vk.ru/ru/method/market.deleteAlbum) Метод удаляет подборку с товарами.

[`deleteComment`](https://dev.vk.ru/ru/method/market.deleteComment) Удаляет комментарий к товару.

[`deleteProperty`](https://dev.vk.ru/ru/method/market.deleteProperty) Удаляет свойство товара.

[`deletePropertyVariant`](https://dev.vk.ru/ru/method/market.deletePropertyVariant) Удаляет вариант свойства.

[`edit`](https://dev.vk.ru/ru/method/market.edit) Метод редактирует информацию о товаре.

[`editAlbum`](https://dev.vk.ru/ru/method/market.editAlbum) Метод редактирует подборку с товарами в сообществе.

[`editComment`](https://dev.vk.ru/ru/method/market.editComment) Изменяет текст комментария к товару.

[`editOrder`](https://dev.vk.ru/ru/method/market.editOrder) Редактирует заказ.

[`editProperty`](https://dev.vk.ru/ru/method/market.editProperty) Редактирует свойство товара.

[`editPropertyVariant`](https://dev.vk.ru/ru/method/market.editPropertyVariant) Редактирует вариант свойства.

[`get`](https://dev.vk.ru/ru/method/market.get) Возвращает список товаров в сообществе.

[`getAlbumById`](https://dev.vk.ru/ru/method/market.getAlbumById) Возвращает данные подборки с товарами.

[`getAlbums`](https://dev.vk.ru/ru/method/market.getAlbums) Возвращает список подборок с товарами.

[`getById`](https://dev.vk.ru/ru/method/market.getById) Возвращает информацию о товарах по идентификаторам.

[`getCategories`](https://dev.vk.ru/ru/method/market.getCategories) Возвращает список категорий для товаров.

[`getComments`](https://dev.vk.ru/ru/method/market.getComments) Возвращает список комментариев к товару.

[`getGroupOrders`](https://dev.vk.ru/ru/method/market.getGroupOrders) Возвращает заказы сообщества.

[`getOrderById`](https://dev.vk.ru/ru/method/market.getOrderById) Возвращает заказ по идентификатору.

[`getOrderItems`](https://dev.vk.ru/ru/method/market.getOrderItems) Возвращает товары в заказе.

[`getOrders`](https://dev.vk.ru/ru/method/market.getOrders) Возвращает заказы.

| [`getProductPhotoUploadSer`](https://dev.vk.ru/ru/method/market.getProductPhotoUploadServer) [`ver`](https://dev.vk.ru/ru/method/market.getProductPhotoUploadServer) | Возвращает адрес для [загрузки изображений товаров в](https://dev.vk.ru/ru/api/upload/photo-in-market) [сообщество](https://dev.vk.ru/ru/api/upload/photo-in-market). |
|---|---|
| [`getProperties`](https://dev.vk.ru/ru/method/market.getProperties) | Возвращает список свойств для указанного сообщества. |
| [`groupItems`](https://dev.vk.ru/ru/method/market.groupItems) | Объединяет товары в группу товаров. |
| [`removeFromAlbum`](https://dev.vk.ru/ru/method/market.removeFromAlbum) | Удаляет товар из одной или нескольких выбранных подборок. |
| [`reorderAlbums`](https://dev.vk.ru/ru/method/market.reorderAlbums) | Изменяет положение подборки с товарами в списке. |
| [`reorderItems`](https://dev.vk.ru/ru/method/market.reorderItems) | Изменяет положение товара в подборке. |
| [`report`](https://dev.vk.ru/ru/method/market.report) | Позволяет отправить жалобу на товар. |
| [`reportComment`](https://dev.vk.ru/ru/method/market.reportComment) | Позволяет оставить жалобу на комментарий к товару. |
| [`restore`](https://dev.vk.ru/ru/method/market.restore) | Восстанавливает удаленный товар. |
| [`restoreComment`](https://dev.vk.ru/ru/method/market.restoreComment) | Восстанавливает удаленный комментарий к товару. |
| [`saveProductPhoto`](https://dev.vk.ru/ru/method/market.saveProductPhoto) | Подготавливает изображение, загруженное с помощью |

[`market.getProductPhotoUploadServer`](https://dev.vk.ru/ru/method/market.getProductPhotoUploadServer), для добавления к товару сообщества.

[`saveProductPhotoBulk`](https://dev.vk.ru/ru/method/market.saveProductPhotoBulk)

[`search`](https://dev.vk.ru/ru/method/market.search) Метод получает товары из каталога сообщества.

[`searchItems`](https://dev.vk.ru/ru/method/market.searchItems)

[`searchItemsBasic`](https://dev.vk.ru/ru/method/market.searchItemsBasic) Получение товаров по поисковому запросу для вкладки бизнес групп

[`ungroupItems`](https://dev.vk.ru/ru/method/market.ungroupItems) Разделяет группу товаров на несколько товаров.

Messages

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

Newsfeed

[`get`](https://dev.vk.ru/ru/method/newsfeed.get) 27 августа 2025 года мы отключили фильтр `friend` и источник `list`

[Подробнее](https://vk.com/@vkappsdev-obnovlyaem-rabotu-metodov-api-wallpost-walledit-i-newsfeed)

Возвращает данные, необходимые для показа списка новостей для текущего пользователя.

[`getBanned`](https://dev.vk.ru/ru/method/newsfeed.getBanned) Возвращает список пользователей и групп, которые текущий пользователь скрыл из ленты новостей.

[`getComments`](https://dev.vk.ru/ru/method/newsfeed.getComments) С 27 августа 2025 года метод не работает

Удалите его из кода, чтобы избежать ошибок. [Подробнее](https://vk.com/@vkappsdev-obnovlyaem-rabotu-metodov-api-wallpost-walledit-i-newsfeed)

Возвращает данные, необходимые для показа раздела комментариев в новостях пользователя.

[`getMentions`](https://dev.vk.ru/ru/method/newsfeed.getMentions) Возвращает список записей пользователей на своих стенах, в которых упоминается указанный пользователь.

[`getRecommended`](https://dev.vk.ru/ru/method/newsfeed.getRecommended) С 27 августа 2025 гогда метод не работает

Удалите его из кода, чтобы избежать ошибок. [Подробнее](https://vk.com/@vkappsdev-obnovlyaem-rabotu-metodov-api-wallpost-walledit-i-newsfeed)

Получает список новостей, рекомендованных пользователю.

[`getSuggestedSources`](https://dev.vk.ru/ru/method/newsfeed.getSuggestedSources) Возвращает сообщества и пользователей, на которые текущему пользователю рекомендуется подписаться.

[`search`](https://dev.vk.ru/ru/method/newsfeed.search) Возвращает результаты поиска по статусам. Новости возвращаются в порядке от более новых к более старым.

Notifications

[`get`](https://dev.vk.ru/ru/method/notifications.get) Возвращает список оповещений об ответах других пользователей на записи текущего пользователя.

[`sendMessage`](https://dev.vk.ru/ru/method/notifications.sendMessage) Метод отправляет [уведомление](https://dev.vk.ru/ru/mini-apps/promotion/social-mechanics/notifications/overview) пользователю мини-приложения.

Orders

[`cancelSubscription`](https://dev.vk.ru/ru/method/orders.cancelSubscription) Отменяет подписку.

[`changeState`](https://dev.vk.ru/ru/method/orders.changeState) Изменяет состояние заказа.

[`get`](https://dev.vk.ru/ru/method/orders.get) Возвращает список заказов.

[`getAmount`](https://dev.vk.ru/ru/method/orders.getAmount) Возвращает стоимость голосов в валюте пользователя.

[`getById`](https://dev.vk.ru/ru/method/orders.getById) Возвращает информацию об отдельном заказе.

[`getUserSubscriptionById`](https://dev.vk.ru/ru/method/orders.getUserSubscriptionById) Получает информацию о подписке по её идентификатору.

[`getUserSubscriptions`](https://dev.vk.ru/ru/method/orders.getUserSubscriptions) Получает список активных подписок пользователя.

Pages

[`clearCache`](https://dev.vk.ru/ru/method/pages.clearCache) Позволяет очистить кеш отдельных внешних страниц, которые могут быть прикреплены к записям ВКонтакте. После очистки кеша при последующем прикреплении ссылки к записи, данные о странице будут обновлены.

[`get`](https://dev.vk.ru/ru/method/pages.get) Возвращает информацию о вики-странице.

[`getHistory`](https://dev.vk.ru/ru/method/pages.getHistory) Возвращает список всех старых версий вики-страницы.

[`getTitles`](https://dev.vk.ru/ru/method/pages.getTitles) Возвращает список вики-страниц в группе.

[`getVersion`](https://dev.vk.ru/ru/method/pages.getVersion) Возвращает текст одной из старых версий страницы.

[`parseWiki`](https://dev.vk.ru/ru/method/pages.parseWiki) Метод получает HTML-представление вики-разметки.

[`save`](https://dev.vk.ru/ru/method/pages.save) Сохраняет текст вики-страницы.

[`saveAccess`](https://dev.vk.ru/ru/method/pages.saveAccess) Сохраняет новые настройки доступа на чтение и редактирование вики-страницы.

Photos

[`copy`](https://dev.vk.ru/ru/method/photos.copy) Позволяет скопировать фотографию в альбом "Сохраненные фотографии"

[`createAlbum`](https://dev.vk.ru/ru/method/photos.createAlbum) Создает пустой альбом для фотографий.

[`createComment`](https://dev.vk.ru/ru/method/photos.createComment) Создает новый комментарий к фотографии.

[`delete`](https://dev.vk.ru/ru/method/photos.delete) Удаление фотографии на сайте.

[`deleteAlbum`](https://dev.vk.ru/ru/method/photos.deleteAlbum) Удаляет указанный альбом для фотографий у текущего пользователя

[`deleteComment`](https://dev.vk.ru/ru/method/photos.deleteComment) Удаляет комментарий к фотографии.

[`edit`](https://dev.vk.ru/ru/method/photos.edit) Редактирует описание или геометку у фотографии.

[`editAlbum`](https://dev.vk.ru/ru/method/photos.editAlbum) Редактирует данные альбома для фотографий.

[`editComment`](https://dev.vk.ru/ru/method/photos.editComment) Изменяет текст комментария к фотографии.

[`get`](https://dev.vk.ru/ru/method/photos.get) Возвращает список фотографий в альбоме.

[`getAlbums`](https://dev.vk.ru/ru/method/photos.getAlbums) Возвращает список фотоальбомов пользователя или сообщества.

[`getAlbumsCount`](https://dev.vk.ru/ru/method/photos.getAlbumsCount) Возвращает количество доступных альбомов пользователя или сообщества.

[`getAll`](https://dev.vk.ru/ru/method/photos.getAll) Возвращает все фотографии пользователя или сообщества в антихронологическом порядке.

[`getAllComments`](https://dev.vk.ru/ru/method/photos.getAllComments) Возвращает отсортированный в антихронологическом порядке список всех комментариев к конкретному альбому или ко всем альбомам пользователя.

[`getById`](https://dev.vk.ru/ru/method/photos.getById) Возвращает информацию о фотографиях по их идентификаторам.

[`getChatUploadServer`](https://dev.vk.ru/ru/method/photos.getChatUploadServer) Метод получает адрес сервера для [загрузки обложки чата](https://dev.vk.ru/ru/api/upload/main-photo-in-chat).

[`getComments`](https://dev.vk.ru/ru/method/photos.getComments) Возвращает список комментариев к фотографии.

| [`getMarketAlbumUploadServ`](https://dev.vk.ru/ru/method/photos.getMarketAlbumUploadServer) [`er`](https://dev.vk.ru/ru/method/photos.getMarketAlbumUploadServer) | Метод получает адрес сервера для [загрузки фотографии подборки](https://dev.vk.ru/ru/api/upload/main-photo-in-market) [товаров](https://dev.vk.ru/ru/api/upload/main-photo-in-market) в сообществе. |
|---|---|
| [`getMessagesUploadServer`](https://dev.vk.ru/ru/method/photos.getMessagesUploadServer) | Метод получает адрес сервера для [загрузки фотографии в личное](https://dev.vk.ru/ru/api/upload/photo-in-message) [сообщение](https://dev.vk.ru/ru/api/upload/photo-in-message) пользователя или в сообщение сообщества. |
| [`getOwnerCoverPhotoUploa`](https://dev.vk.ru/ru/method/photos.getOwnerCoverPhotoUploadServer) [`dServer`](https://dev.vk.ru/ru/method/photos.getOwnerCoverPhotoUploadServer) | Метод получает адрес сервера для [загрузки обложки](https://dev.vk.ru/ru/api/upload/main-photo-in-group) сообщества. |
| [`getOwnerPhotoUploadServ`](https://dev.vk.ru/ru/method/photos.getOwnerPhotoUploadServer) [`er`](https://dev.vk.ru/ru/method/photos.getOwnerPhotoUploadServer) | Метод получает адрес сервера для [загрузки главной фотографии](https://dev.vk.ru/ru/api/upload/main-photo-in-profile) на страницу пользователя или сообщества. |
| [`getUploadServer`](https://dev.vk.ru/ru/method/photos.getUploadServer) | Метод получает адрес сервера для [загрузки фотографий в альбом](https://dev.vk.ru/ru/api/upload/album-photos) пользователя или сообщества. |
| [`getUserPhotos`](https://dev.vk.ru/ru/method/photos.getUserPhotos) | Возвращает список фотографий, на которых отмечен пользователь |
| [`getWallUploadServer`](https://dev.vk.ru/ru/method/photos.getWallUploadServer) | Метод получает адрес сервера для [загрузки фотографии на стену](https://dev.vk.ru/ru/api/upload/wall-photo) пользователя или сообщества. |
| [`makeCover`](https://dev.vk.ru/ru/method/photos.makeCover) | Делает фотографию обложкой альбома. |
| [`move`](https://dev.vk.ru/ru/method/photos.move) | Переносит фотографию из одного альбома в другой. |
| [`reorderAlbums`](https://dev.vk.ru/ru/method/photos.reorderAlbums) | Меняет порядок альбома в списке альбомов пользователя. |
| [`reorderPhotos`](https://dev.vk.ru/ru/method/photos.reorderPhotos) | Меняет порядок фотографии в списке фотографий альбома пользователя. |
| [`report`](https://dev.vk.ru/ru/method/photos.report) | Позволяет пожаловаться на фотографию. |
| [`reportComment`](https://dev.vk.ru/ru/method/photos.reportComment) | Позволяет пожаловаться на комментарий к фотографии. |
| [`restore`](https://dev.vk.ru/ru/method/photos.restore) | Восстанавливает удаленную фотографию. |
| [`restoreComment`](https://dev.vk.ru/ru/method/photos.restoreComment) | Восстанавливает удаленный комментарий к фотографии. |
| [`save`](https://dev.vk.ru/ru/method/photos.save) | Метод сохраняет фотографии в альбом после их успешной [загрузки на сервер](https://dev.vk.ru/ru/api/upload/album-photos). |
| [`saveMarketAlbumPhoto`](https://dev.vk.ru/ru/method/photos.saveMarketAlbumPhoto) | Метод сохраняет фотографию подборки товаров сообщества после её успешной [загрузки на сервер](https://dev.vk.ru/ru/api/upload/main-photo-in-market). |
| [`saveMessagesPhoto`](https://dev.vk.ru/ru/method/photos.saveMessagesPhoto) | Метод сохраняет фотографию в личном сообщении после её успешной [загрузки на сервер](https://dev.vk.ru/ru/api/upload/photo-in-message). |
| [`saveOwnerCoverPhoto`](https://dev.vk.ru/ru/method/photos.saveOwnerCoverPhoto) | Метод сохраняет обложку сообщества или профиля пользователя после её успешной [загрузки на сервер](https://dev.vk.ru/ru/api/upload/main-photo-in-group). |
| [`saveOwnerPhoto`](https://dev.vk.ru/ru/method/photos.saveOwnerPhoto) | Метод сохраняет главную фотографию после её успешной [загрузки на сервер](https://dev.vk.ru/ru/api/upload/main-photo-in-profile). |
| [`saveWallPhoto`](https://dev.vk.ru/ru/method/photos.saveWallPhoto) | Метод сохраняет фотографии на стене после их успешной [загрузки на сервер](https://dev.vk.ru/ru/api/upload/wall-photo). |
| [`search`](https://dev.vk.ru/ru/method/photos.search) | Осуществляет поиск изображений по местоположению или описанию. |

Podcasts

[`searchPodcast`](https://dev.vk.ru/ru/method/podcasts.searchPodcast)

Polls

[`create`](https://dev.vk.ru/ru/method/polls.create) Позволяет создавать опросы, которые впоследствии можно прикреплять к записям на странице пользователя или сообщества.

[`edit`](https://dev.vk.ru/ru/method/polls.edit) Позволяет редактировать созданные опросы.

[`getBackgrounds`](https://dev.vk.ru/ru/method/polls.getBackgrounds) Возвращает варианты фонового изображения для опросов.

[`getById`](https://dev.vk.ru/ru/method/polls.getById) Возвращает детальную информацию об опросе по его идентификатору.

[`getPhotoUploadServer`](https://dev.vk.ru/ru/method/polls.getPhotoUploadServer) Возвращает адрес сервера для загрузки фоновой фотографии в опрос.

[`getVoters`](https://dev.vk.ru/ru/method/polls.getVoters) Получает список идентификаторов пользователей, которые выбрали определенные варианты ответа в опросе.

[`savePhoto`](https://dev.vk.ru/ru/method/polls.savePhoto) Сохраняет фотографию, загруженную в опрос.

PrettyCards

[`create`](https://dev.vk.ru/ru/method/prettyCards.create) Метод создаёт карточку карусели.

Созданную карточку необходимо вручную добавить в карусель.

[`delete`](https://dev.vk.ru/ru/method/prettyCards.delete) Удаляет карточку.

[`edit`](https://dev.vk.ru/ru/method/prettyCards.edit) Редактирует карточку карусели.

[`get`](https://dev.vk.ru/ru/method/prettyCards.get) Возвращает неиспользованные карточки владельца.

[`getById`](https://dev.vk.ru/ru/method/prettyCards.getById) Возвращает информацию о карточке.

[`getUploadURL`](https://dev.vk.ru/ru/method/prettyCards.getUploadURL) Возвращает URL для загрузки фотографии для карточки.

Search

[`getHints`](https://dev.vk.ru/ru/method/search.getHints) Метод позволяет получить результаты быстрого поиска по произвольной подстроке.

Secure

[`addAppEvent`](https://dev.vk.ru/ru/method/secure.addAppEvent) Добавляет информацию о достижениях пользователя в игре.

[`checkToken`](https://dev.vk.ru/ru/method/secure.checkToken) Метод проверяет, что ключ доступа пользователя ( `access_token`) выдан именно тому приложению, которому выдан переданный сервисный ключ доступа. Подходит для проверки ключа доступа iFrame и Standalone-приложений.

[`getAppBalance`](https://dev.vk.ru/ru/method/secure.getAppBalance) Возвращает платежный баланс (счет) приложения в сотых долях голоса.

[`getTransactionsHistory`](https://dev.vk.ru/ru/method/secure.getTransactionsHistory) Выводит историю транзакций по переводу голосов между пользователями и приложением.

[`getUserLevel`](https://dev.vk.ru/ru/method/secure.getUserLevel) Возвращает ранее выставленный игровой уровень одного или нескольких пользователей в приложении.

[`giveEventSticker`](https://dev.vk.ru/ru/method/secure.giveEventSticker) Выдает пользователю стикер и открывает игровое достижение.

[`sendNotification`](https://dev.vk.ru/ru/method/secure.sendNotification) Отправляет уведомление одному или нескольким пользователям.

[`setCounter`](https://dev.vk.ru/ru/method/secure.setCounter) Устанавливает счетчик, который выводится пользователю жирным шрифтом в левом меню.

Stats

[`get`](https://dev.vk.ru/ru/method/stats.get) Возвращает статистику сообщества или приложения.

[`getPostReach`](https://dev.vk.ru/ru/method/stats.getPostReach) Возвращает статистику для записи на стене.

[`trackVisitor`](https://dev.vk.ru/ru/method/stats.trackVisitor) Добавляет данные о текущем сеансе в статистику посещаемости приложения.

Status

[`get`](https://dev.vk.ru/ru/method/status.get) Получить текст статуса пользователя или сообщества.

Storage

[`get`](https://dev.vk.ru/ru/method/storage.get) Возвращает значение переменной, название которой передано в параметре `key`.

[`getKeys`](https://dev.vk.ru/ru/method/storage.getKeys) Возвращает названия всех переменных.

[`set`](https://dev.vk.ru/ru/method/storage.set) Метод задаёт значение переменной, название которой передано. Переменные хранятся бессрочно. Может быть создано не более 1 000 переменных для каждого пользователя. Не более 1 000 вызовов в час на каждого пользователя.

Store

[`addStickersToFavorite`](https://dev.vk.ru/ru/method/store.addStickersToFavorite) Добавляет стикер в избранные.

[`getFavoriteStickers`](https://dev.vk.ru/ru/method/store.getFavoriteStickers) Возвращает список избранных стикеров.

[`getProducts`](https://dev.vk.ru/ru/method/store.getProducts) Возвращает список продуктов.

[`getStickersKeywords`](https://dev.vk.ru/ru/method/store.getStickersKeywords) Возвращает список ключевых слов для стикеров.

[`removeStickersFromFavorite`](https://dev.vk.ru/ru/method/store.removeStickersFromFavorite) Удаляет стикер из избранных.

Stories

[`banOwner`](https://dev.vk.ru/ru/method/stories.banOwner) Позволяет скрыть из ленты новостей истории от выбранных источников.

[`delete`](https://dev.vk.ru/ru/method/stories.delete) Удаляет историю.

[`get`](https://dev.vk.ru/ru/method/stories.get) Возвращает истории, доступные для текущего пользователя.

[`getBanned`](https://dev.vk.ru/ru/method/stories.getBanned) Возвращает список источников историй, скрытых из ленты текущего пользователя.

[`getById`](https://dev.vk.ru/ru/method/stories.getById) Возвращает информацию об истории по её идентификатору.

[`getPhotoUploadServer`](https://dev.vk.ru/ru/method/stories.getPhotoUploadServer) Метод получает адрес сервера для [загрузки изображения в](https://dev.vk.ru/ru/api/upload/story-in-profile) [историю](https://dev.vk.ru/ru/api/upload/story-in-profile).

[`getReplies`](https://dev.vk.ru/ru/method/stories.getReplies) Позволяет получить ответы на историю.

[`getStats`](https://dev.vk.ru/ru/method/stories.getStats) Возвращает статистику истории.

[`getVideoUploadServer`](https://dev.vk.ru/ru/method/stories.getVideoUploadServer) Метод получает адрес сервера для [загрузки изображения в](https://dev.vk.ru/ru/api/upload/story-in-profile) [историю](https://dev.vk.ru/ru/api/upload/story-in-profile).

[`getViewers`](https://dev.vk.ru/ru/method/stories.getViewers) Возвращает список пользователей, просмотревших историю.

[`hideAllReplies`](https://dev.vk.ru/ru/method/stories.hideAllReplies) Скрывает все ответы автора за последние сутки на истории текущего пользователя.

[`hideReply`](https://dev.vk.ru/ru/method/stories.hideReply) Скрывает ответ на историю.

[`save`](https://dev.vk.ru/ru/method/stories.save) Метод сохраняет историю в профиле после её успешной [загрузки](https://dev.vk.ru/ru/api/upload/story-in-profile) [на сервер](https://dev.vk.ru/ru/api/upload/story-in-profile).

[`search`](https://dev.vk.ru/ru/method/stories.search) Возвращает результаты поиска по историям.

[`sendInteraction`](https://dev.vk.ru/ru/method/stories.sendInteraction) Отправляет фидбек на историю.

[`unbanOwner`](https://dev.vk.ru/ru/method/stories.unbanOwner) Позволяет вернуть пользователя или сообщество в список отображаемых историй в ленте.

Translations

[`translate`](https://dev.vk.ru/ru/method/translations.translate) Метод позволяет выполнить перевод переданных строк текста.

UserLinking

[`b2bGet`](https://dev.vk.ru/ru/method/userLinking.b2bGet) Метод для получения дополнительных сведений по Access Token

Users

[`get`](https://dev.vk.ru/ru/method/users.get) Метод позволяет получить информацию о пользователях.

[`getFollowers`](https://dev.vk.ru/ru/method/users.getFollowers) Возвращает список идентификаторов пользователей, которые являются подписчиками пользователя.

[`getSubscriptions`](https://dev.vk.ru/ru/method/users.getSubscriptions)

[`search`](https://dev.vk.ru/ru/method/users.search) Возвращает список пользователей в соответствии с заданным критерием поиска.

Utils

[`checkLink`](https://dev.vk.ru/ru/method/utils.checkLink) Возвращает информацию о том, является ли внешняя ссылка заблокированной на сайте ВКонтакте.

[`deleteFromLastShortened`](https://dev.vk.ru/ru/method/utils.deleteFromLastShortened) Удаляет сокращенную ссылку из списка пользователя.

[`getLastShortenedLinks`](https://dev.vk.ru/ru/method/utils.getLastShortenedLinks) Получает список сокращённых ссылок для текущего пользователя.

[`getLinkStats`](https://dev.vk.ru/ru/method/utils.getLinkStats) Возвращает статистику переходов по [сокращённой](https://dev.vk.ru/ru/utils.getShortLink) ссылке.

[`getServerTime`](https://dev.vk.ru/ru/method/utils.getServerTime) Возвращает текущее время на сервере ВКонтакте в `unixtime`.

[`getShortLink`](https://dev.vk.ru/ru/method/utils.getShortLink) Позволяет получить URL, сокращённый с помощью vk.cc.

[`resolveScreenName`](https://dev.vk.ru/ru/method/utils.resolveScreenName) Определяет тип объекта (пользователь, сообщество, приложение) и его идентификатор по короткому имени `screen_name`.

Video

[`add`](https://dev.vk.ru/ru/method/video.add) Метод добавляет видеозапись в список видеозаписей пользователя.

[`addAlbum`](https://dev.vk.ru/ru/method/video.addAlbum) Создает пустой альбом видеозаписей.

[`addToAlbum`](https://dev.vk.ru/ru/method/video.addToAlbum) Позволяет добавить видеозапись в альбом.

[`createComment`](https://dev.vk.ru/ru/method/video.createComment) Cоздает новый комментарий к видеозаписи.

[`delete`](https://dev.vk.ru/ru/method/video.delete) Удаляет видеозапись со страницы пользователя.

[`deleteAlbum`](https://dev.vk.ru/ru/method/video.deleteAlbum) Удаляет альбом видеозаписей.

[`deleteComment`](https://dev.vk.ru/ru/method/video.deleteComment) Удаляет комментарий к видеозаписи.

[`edit`](https://dev.vk.ru/ru/method/video.edit) Метод редактирует данные видеозаписи.

[`editAlbum`](https://dev.vk.ru/ru/method/video.editAlbum) Редактирует альбом с видео.

[`editComment`](https://dev.vk.ru/ru/method/video.editComment) Изменяет текст комментария к видеозаписи.

[`get`](https://dev.vk.ru/ru/method/video.get) Метод возвращает информацию о видеозаписях.

[`getAlbumById`](https://dev.vk.ru/ru/method/video.getAlbumById) Позволяет получить информацию об альбоме с видео.

[`getAlbums`](https://dev.vk.ru/ru/method/video.getAlbums) Возвращает список альбомов видеозаписей пользователя или сообщества.

[`getAlbumsByVideo`](https://dev.vk.ru/ru/method/video.getAlbumsByVideo) Метод возвращает список альбомов, в которых находится видеозапись.

[`getComments`](https://dev.vk.ru/ru/method/video.getComments) Возвращает список комментариев к видеозаписи.

[`getLongPollServer`](https://dev.vk.ru/ru/method/video.getLongPollServer) Позволяет получать данные о новых событиях трансляции в режиме реального времени.

[`getOembed`](https://dev.vk.ru/ru/method/video.getOembed) Метод возвращает код для встраивания видео в `iframe`.

[`getPublicSectionFeed`](https://dev.vk.ru/ru/method/video.getPublicSectionFeed) Метод позволяет получать ссылку на выбранный тематический фид.

[`getThumbUploadUrl`](https://dev.vk.ru/ru/method/video.getThumbUploadUrl)

[`removeFromAlbum`](https://dev.vk.ru/ru/method/video.removeFromAlbum) Позволяет убрать видеозапись из альбома.

[`reorderAlbums`](https://dev.vk.ru/ru/method/video.reorderAlbums) Позволяет изменить порядок альбомов с видео.

[`reorderVideos`](https://dev.vk.ru/ru/method/video.reorderVideos) Позволяет переместить видеозапись в альбоме.

[`report`](https://dev.vk.ru/ru/method/video.report) Позволяет пожаловаться на видеозапись.

[`reportComment`](https://dev.vk.ru/ru/method/video.reportComment) Позволяет пожаловаться на комментарий к видеозаписи.

[`restore`](https://dev.vk.ru/ru/method/video.restore) Восстанавливает удаленную видеозапись.

[`restoreComment`](https://dev.vk.ru/ru/method/video.restoreComment) Восстанавливает удаленный комментарий к видеозаписи.

[`save`](https://dev.vk.ru/ru/method/video.save) Метод получает адрес сервера, на который необходимо [загрузить](https://dev.vk.ru/ru/api/upload/video-in-profile) видео, а также данные этого видео.

Примечание. Приложение может вызвать этот метод не более 5 000 раз в сутки.

[`saveUploadedThumb`](https://dev.vk.ru/ru/method/video.saveUploadedThumb)

[`search`](https://dev.vk.ru/ru/method/video.search) Метод получает список видеозаписей в соответствии с заданными критериями поиска.

[`startStreaming`](https://dev.vk.ru/ru/method/video.startStreaming) Получает RTMP-адрес для трансляции видео.

[`stopStreaming`](https://dev.vk.ru/ru/method/video.stopStreaming) Завершает трансляцию.

Wall

[`closeComments`](https://dev.vk.ru/ru/method/wall.closeComments) Выключает комментирование записи.

[`createComment`](https://dev.vk.ru/ru/method/wall.createComment) Добавляет комментарий к записи на стене.

[`delete`](https://dev.vk.ru/ru/method/wall.delete) Удаляет запись со стены.

[`deleteComment`](https://dev.vk.ru/ru/method/wall.deleteComment) Удаляет комментарий к записи на стене.

[`edit`](https://dev.vk.ru/ru/method/wall.edit) После обновления методов 4 июня 2026 года изображения нестандартных размеров в карусели кадрируются автоматически. Чтобы задать свои значения, используйте параметр `photo_attachments_crop`.

[Подробнее](https://vk.com/@vkappsdev-obnovlenie-raboty-metodov-wallpost-i-walledit-kadrirovanie-i)

Редактирует запись на стене.

[`editAdsStealth`](https://dev.vk.ru/ru/method/wall.editAdsStealth) Позволяет отредактировать скрытую запись.

[`editComment`](https://dev.vk.ru/ru/method/wall.editComment) Редактирует комментарий на стене.

[`get`](https://dev.vk.ru/ru/method/wall.get) Возвращает список записей со стены пользователя или сообщества.

[`getById`](https://dev.vk.ru/ru/method/wall.getById) Возвращает список записей со стен пользователей или сообществ по их идентификаторам.

[`getComment`](https://dev.vk.ru/ru/method/wall.getComment) Получает информацию о комментарии на стене.

[`getComments`](https://dev.vk.ru/ru/method/wall.getComments) Возвращает список комментариев к записи на стене.

[`getReposts`](https://dev.vk.ru/ru/method/wall.getReposts) Позволяет получать список репостов заданной записи.

[`openComments`](https://dev.vk.ru/ru/method/wall.openComments) Включает комментирование записи.

[`parseAttachedLink`](https://dev.vk.ru/ru/method/wall.parseAttachedLink) Принимает на вход ссылки и возвращает дополнительную информацию, которая может быть использована для создания сниппетов при публикации ссылки на стене пользователя и других ресурсах.

[`pin`](https://dev.vk.ru/ru/method/wall.pin) Закрепляет запись на стене (запись будет отображаться выше остальных).

[`post`](https://dev.vk.ru/ru/method/wall.post) После обновления методов 4 июня 2026 года изображения нестандартных размеров в карусели кадрируются автоматически. Чтобы задать свои значения, используйте параметр `photo_attachments_crop`.

[Подробнее](https://vk.com/@vkappsdev-obnovlenie-raboty-metodov-wallpost-i-walledit-kadrirovanie-i)

Метод позволяет:

- Создать запись на стене.
- Предложить запись на стене публичной страницы.
- Опубликовать существующую отложенную запись.

[`postAdsStealth`](https://dev.vk.ru/ru/method/wall.postAdsStealth) Позволяет создать скрытую запись, которая не попадает на стену сообщества и в дальнейшем может быть использована для создания рекламного объявления типа «Запись в сообществе».

[`reportComment`](https://dev.vk.ru/ru/method/wall.reportComment) Позволяет пожаловаться на комментарий к записи.

[`reportPost`](https://dev.vk.ru/ru/method/wall.reportPost) Позволяет пожаловаться на запись.

[`repost`](https://dev.vk.ru/ru/method/wall.repost) Метод позволяет сделать репост — скопировать запись на стену пользователя или сообщества.

[`restore`](https://dev.vk.ru/ru/method/wall.restore) Восстанавливает удалённую запись на стене пользователя или сообщества.

[`restoreComment`](https://dev.vk.ru/ru/method/wall.restoreComment) Восстанавливает удаленный комментарий к записи на стене.

[`search`](https://dev.vk.ru/ru/method/wall.search) Позволяет искать записи на стене в соответствии с заданными критериями.

[`unpin`](https://dev.vk.ru/ru/method/wall.unpin) Отменяет закрепление записи на стене.

Widgets

[`getComments`](https://dev.vk.ru/ru/method/widgets.getComments) Получает список комментариев к странице, оставленных через [Виджет комментариев](https://dev.vk.ru/ru/widgets/comments).

[`getPages`](https://dev.vk.ru/ru/method/widgets.getPages) Получает список страниц приложения/сайта, на которых установлен [Виджет комментариев](https://dev.vk.ru/ru/widgets/comments) или [«Мне нравится»](https://dev.vk.ru/ru/widgets/like).
