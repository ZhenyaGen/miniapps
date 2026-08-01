# Введение

**Раздел:** VK Bridge → Введение  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Обзор

VK Bridge — это JavaScript-библиотека, которая позволяет [играм](https://dev.vk.ru/ru/games/overview) и [мини-приложениям](https://dev.vk.ru/ru/mini-apps/overview) использовать [API ВКонтакте](https://dev.vk.ru/ru/reference) и API операционной системы на устройстве пользователя.

VK Bridge осуществляет обмен событиями между пользовательскими приложениями и клиентской частью ВКонтакте: десктопной и мобильной версиями сайта, а также мобильными приложениями. Это позволяет приложениям получать доступ к данным пользователя, отправлять уведомления и использовать другие функции платформы ВКонтакте.

Исходный код библиотеки VK Bridge хранится в репозиториях:

- [npm](https://www.npmjs.com/package/@vkontakte/vk-bridge)
- [GitHub](https://github.com/VKCOM/vk-bridge)

## Начало работы

Для начала работы с VK Bridge следуйте инструкциям, представленным в разделе [VK Bridge |](https://dev.vk.ru/ru/bridge/getting-started) [Первые шаги](https://dev.vk.ru/ru/bridge/getting-started). Для тестирования событий библиотеки вы можете использовать [песочницу VK Bridge](https://vk.com/app6909581).

После подключения библиотеки в коде приложения обязательно нужно вызвать событие инициализации [`VKWebAppInit`](https://dev.vk.ru/ru/bridge/VKWebAppInit). Оно информирует платформу ВКонтакте о старте приложения и инициализирует параметры, необходимые для работы библиотеки.

## События VK Bridge

### Служебные

| Событие | Сценарий использования |
|---|---|
| [VKWebAppInit](https://dev.vk.ru/ru/bridge/VKWebAppInit) | Инициализировать VK Bridge. |
| [VKWebAppGetLaunchParams](https://dev.vk.ru/ru/bridge/VKWebAppGetLaunchParams) | Получить параметры запуска приложения. |
| [VKWebAppGetClientVersion](https://dev.vk.ru/ru/bridge/VKWebAppGetClientVersion) | Получить информацию о платформе ВКонтакте, на которой запущено приложение. |
| [VKWebAppGetConfig](https://dev.vk.ru/ru/bridge/VKWebAppGetConfig) | Получить конфигурацию приложения. |
| [VKWebAppUpdateConfig](https://dev.vk.ru/ru/bridge/VKWebAppUpdateConfig) | Получить информацию о смене конфигурации приложения. |
| [VKWebAppCreateHash](https://dev.vk.ru/ru/bridge/VKWebAppCreateHash) | Создать криптографическую подпись для передаваемых данных. |
| [VKWebAppCallAPIMethod](https://dev.vk.ru/ru/bridge/VKWebAppCallAPIMethod) | Вызвать метод API ВКонтакте. |

### Доступы и разрешения

| Событие | Сценарий использования |
|---|---|
| [VKWebAppGetAuthToken](https://dev.vk.ru/ru/bridge/VKWebAppGetAuthToken) | Запросить доступ к данным пользователя. |
| [VKWebAppGetCommunityToken](https://dev.vk.ru/ru/bridge/VKWebAppGetCommunityToken) | Запросить доступ к данным сообщества. |
| [VKWebAppCheckAllowedScopes](https://dev.vk.ru/ru/bridge/VKWebAppCheckAllowedScopes) | Получить список данных, к которым у приложения есть доступ. |
| [VKWebAppGetGrantedPermissions](https://dev.vk.ru/ru/bridge/VKWebAppGetGrantedPermissions) | Получить список разрешений, выданных мобильному приложению ВКонтакте. |

### Внешний вид

| Событие | Сценарий использования |
|---|---|
| [VKWebAppResizeWindow](https://dev.vk.ru/ru/bridge/VKWebAppResizeWindow) | Изменить размер окна приложения. |
| [VKWebAppSetViewSettings](https://dev.vk.ru/ru/bridge/VKWebAppSetViewSettings) | Настроить вид элементов управления приложением: статус-бара, экшн- бара, панели навигации. |

### Навигация

| Событие | Сценарий использования |
|---|---|
| [VKWebAppSetLocation](https://dev.vk.ru/ru/bridge/VKWebAppSetLocation) | Задать значение хеша в адресной строке для навигации внутри приложения. |
| [VKWebAppChangeFragment](https://dev.vk.ru/ru/bridge/VKWebAppChangeFragment) | Изменить значение хеша в адресной строке при навигации внутри приложения. |
| [VKWebAppLocationChanged](https://dev.vk.ru/ru/bridge/VKWebAppLocationChanged) | Сообщить о том, что значение хеша в адресной строке приложения изменилось. |
| [VKWebAppSetSwipeSettings](https://dev.vk.ru/ru/bridge/VKWebAppSetSwipeSettings) | Включить жест «смахнуть назад» (свайп). |
| [VKWebAppOpenApp](https://dev.vk.ru/ru/bridge/VKWebAppOpenApp) | Открыть другое приложение из текущего. |
| [VKWebAppClose](https://dev.vk.ru/ru/bridge/VKWebAppClose) | Закрыть приложение. |
| [VKWebAppSendToClient](https://dev.vk.ru/ru/bridge/VKWebAppSendToClient) | Показать окно с предложением открыть приложение на привязанном к аккаунту мобильном устройстве. |
| [VKWebAppViewHide](https://dev.vk.ru/ru/bridge/VKWebAppViewHide) | Сообщить о том, что пользователь переключился на другое приложение или вернулся на главный экран. |
| [VKWebAppViewRestore](https://dev.vk.ru/ru/bridge/VKWebAppViewRestore) | Сообщить о том, что пользователь снова открыл приложение после переключения. |

| Событие | Сценарий использования |
|---|---|
| [VKWebAppScroll](https://dev.vk.ru/ru/bridge/VKWebAppScroll) | Прокрутить окно приложения по вертикали. |
| [VKWebAppScrollTop](https://dev.vk.ru/ru/bridge/VKWebAppScrollTop) | Получить текущую позицию прокрутки относительно верха родительского окна приложения. |
| [VKWebAppScrollTopStart](https://dev.vk.ru/ru/bridge/VKWebAppScrollTopStart) | Начать отправку событий о прокрутке родительского окна. |
| [VKWebAppScrollTopStop](https://dev.vk.ru/ru/bridge/VKWebAppScrollTopStop) | Остановить отправку событий о прокрутке, начатых событием |
| [`VKWebAppScrollTopStart`](https://dev.vk.ru/ru/bridge/VKWebAppScrollTopStart) | [.](https://dev.vk.ru/ru/bridge/VKWebAppScrollTopStart) |

### Монетизация

#### Реклама

| Событие | Сценарий использования |
|---|---|
| [VKWebAppCheckNativeAds](https://dev.vk.ru/ru/bridge/VKWebAppCheckNativeAds) | Проверить, есть ли на стороне пользователя рекламные материалы, доступные для показа. |
| [VKWebAppShowNativeAds](https://dev.vk.ru/ru/bridge/VKWebAppShowNativeAds) | Показать рекламу. |

#### Баннеры

| Событие | Сценарий использования |
|---|---|
| [VKWebAppShowBannerAd](https://dev.vk.ru/ru/bridge/VKWebAppShowBannerAd) | Показать баннерную рекламу. |
| [VKWebAppCheckBannerAd](https://dev.vk.ru/ru/bridge/VKWebAppCheckBannerAd) | Проверить, была ли показана баннерная реклама. |
| [VKWebAppBannerAdUpdated](https://dev.vk.ru/ru/bridge/VKWebAppBannerAdUpdated) | Получить статус обновления баннерной рекламы. |
| [VKWebAppHideBannerAd](https://dev.vk.ru/ru/bridge/VKWebAppHideBannerAd) | Скрыть баннерную рекламу. |
| [VKWebAppBannerAdClosedByUser](https://dev.vk.ru/ru/bridge/VKWebAppBannerAdClosedByUser) | Сообщить о том, что пользователь закрыл баннер рекламы. |

#### Покупки

| Событие | Сценарий использования |
|---|---|
| [VKWebAppShowOrderBox](https://dev.vk.ru/ru/bridge/VKWebAppShowOrderBox) | Открыть окно покупки товара. |
| [VKWebAppShowSubscriptionBox](https://dev.vk.ru/ru/bridge/VKWebAppShowSubscriptionBox) | Показать окно покупки, отмены или восстановления подписки. |
| [VKWebAppOpenPayForm](https://dev.vk.ru/ru/bridge/VKWebAppOpenPayForm) | Показать платёжное окно VK Pay. |

#### Аналитика

| Событие | Сценарий использования |
|---|---|
| [VKWebAppConversionHit](https://dev.vk.ru/ru/bridge/VKWebAppConversionHit) | Отслеживать конверсионные действия пользователей. |
| [VKWebAppRetargetingPixel](https://dev.vk.ru/ru/bridge/VKWebAppRetargetingPixel) | Добавить пользователя в аудиторию ретаргетинга. |
| [VKWebAppTrackEvent](https://dev.vk.ru/ru/bridge/VKWebAppTrackEvent) | Отправить данные в [MyTracker](https://tracker.my.com/promo). |

### Пользователи и сообщества

#### Пользователи

| Событие | Сценарий использования |
|---|---|
| [VKWebAppGetEmail](https://dev.vk.ru/ru/bridge/VKWebAppGetEmail) | Запросить доступ к адресу электронной почты пользователя. |
| [VKWebAppGetFriends](https://dev.vk.ru/ru/bridge/VKWebAppGetFriends) | Показать список друзей пользователя. |
| [VKWebAppGetGeodata](https://dev.vk.ru/ru/bridge/VKWebAppGetGeodata) | Показать текущее местоположение пользователя. |
| [VKWebAppGetPersonalCard](https://dev.vk.ru/ru/bridge/VKWebAppGetPersonalCard) | Показать карточку с контактными данными пользователя. |
| [VKWebAppGetPhoneNumber](https://dev.vk.ru/ru/bridge/VKWebAppGetPhoneNumber) | Запросить доступ к номеру телефона пользователя. |
| [VKWebAppOpenContacts](https://dev.vk.ru/ru/bridge/VKWebAppOpenContacts) | Запросить доступ к контактам из телефонной книги пользователя. |
| [VKWebAppGetUserInfo](https://dev.vk.ru/ru/bridge/VKWebAppGetUserInfo) | Получить данные из профиля пользователя. |

#### Сообщества

| Событие | Сценарий использования |
|---|---|
| [VKWebAppAddToCommunity](https://dev.vk.ru/ru/bridge/VKWebAppAddToCommunity) | Добавить приложение в сообщество. |
| [VKWebAppAllowMessagesFromGroup](https://dev.vk.ru/ru/bridge/VKWebAppAllowMessagesFromGroup) | Получить разрешение на отправку сообщений от имени сообщества. |
| [VKWebAppGetGroupInfo](https://dev.vk.ru/ru/bridge/VKWebAppGetGroupInfo) | Получить информацию о сообществе. |
| [VKWebAppJoinGroup](https://dev.vk.ru/ru/bridge/VKWebAppJoinGroup) | Предложить пользователю вступить в сообщество. |
| [VKWebAppLeaveGroup](https://dev.vk.ru/ru/bridge/VKWebAppLeaveGroup) | Предложить пользователю выйти из сообщества. |
| [VKWebAppSendPayload](https://dev.vk.ru/ru/bridge/VKWebAppSendPayload) | Отправить событие из приложения, добавленного в сообщество. |

| Событие | Сценарий использования |
|---|---|
| [VKWebAppShowCommunityWidgetPreviewBox](https://dev.vk.ru/ru/bridge/VKWebAppShowCommunityWidgetPreviewBox) | Показать виджет сообщества перед публикацией. |

### Социальные механики и взаимодействие

| Событие | Сценарий использования |
|---|---|
| [VKWebAppAddToFavorites](https://dev.vk.ru/ru/bridge/VKWebAppAddToFavorites) | Добавить приложение в избранное. |
| [VKWebAppAddToHomeScreen](https://dev.vk.ru/ru/bridge/VKWebAppAddToHomeScreen) | Добавить ярлык приложения на главный экран устройства. |
| [VKWebAppAddToHomeScreenInfo](https://dev.vk.ru/ru/bridge/VKWebAppAddToHomeScreenInfo) | Получить информацию о ярлыке приложения. |
| [VKWebAppRecommend](https://dev.vk.ru/ru/bridge/VKWebAppRecommend) | Порекомендовать приложение друзьям. |
| [VKWebAppShare](https://dev.vk.ru/ru/bridge/VKWebAppShare) | Поделиться ссылкой. |
| [VKWebAppShowStoryBox](https://dev.vk.ru/ru/bridge/VKWebAppShowStoryBox) | Открыть редактор историй. |
| [VKWebAppAllowNotifications](https://dev.vk.ru/ru/bridge/VKWebAppAllowNotifications) | Запросить разрешение на отправку уведомлений. |
| [VKWebAppDenyNotifications](https://dev.vk.ru/ru/bridge/VKWebAppDenyNotifications) | Отключить уведомления. |
| [VKWebAppAddToChat](https://dev.vk.ru/ru/bridge/VKWebAppAddToChat) | Отправить [виджет](https://dev.vk.ru/ru/mini-apps/development/integration-into-messenger/overview) приложения в чат. |
| [VKWebAppOpenWallPost](https://dev.vk.ru/ru/bridge/VKWebAppOpenWallPost) | Открыть запись со стены в слое. |
| [VKWebAppShowInviteBox](https://dev.vk.ru/ru/bridge/VKWebAppShowInviteBox) | Пригласить друзей в игру. |
| [VKWebAppShowLeaderBoardBox](https://dev.vk.ru/ru/bridge/VKWebAppShowLeaderBoardBox) | Показать таблицу результатов. |
| [VKWebAppShowRequestBox](https://dev.vk.ru/ru/bridge/VKWebAppShowRequestBox) | Отправить пользователю запрос о помощи в игре. |

### Текст и медиафайлы

| Событие | Сценарий использования |
|---|---|
| [VKWebAppCopyText](https://dev.vk.ru/ru/bridge/VKWebAppCopyText) | Копировать текст в буфер обмена. |
| [VKWebAppDownloadFile](https://dev.vk.ru/ru/bridge/VKWebAppDownloadFile) | Скачать файл на устройство. |
| [VKWebAppOpenCodeReader](https://dev.vk.ru/ru/bridge/VKWebAppOpenCodeReader) | Считать QR-код. |
| [VKWebAppShowSlidesSheet](https://dev.vk.ru/ru/bridge/VKWebAppShowSlidesSheet) | Показать [информационные экраны](https://dev.vk.ru/ru/mini-apps/development/information-screens), которые используются для знакомства с возможностями приложения. |

| Событие | Сценарий использования |
|---|---|
| [VKWebAppShowImages](https://dev.vk.ru/ru/bridge/VKWebAppShowImages) | Открыть нативный экран для просмотра изображений. |
| [VKWebAppTranslate](https://dev.vk.ru/ru/bridge/VKWebAppTranslate) | Перевести текст на другой язык. |

### Хранилище VK Storage

| Событие | Сценарий использования |
|---|---|
| [VKWebAppStorageSet](https://dev.vk.ru/ru/bridge/VKWebAppStorageSet) | Создать пару «ключ — значение». |
| [VKWebAppStorageGet](https://dev.vk.ru/ru/bridge/VKWebAppStorageGet) | Получить значение ключа. |
| [VKWebAppStorageGetKeys](https://dev.vk.ru/ru/bridge/VKWebAppStorageGetKeys) | Получить названия всех переменных. |

### Звонки

| Событие | Сценарий использования |
|---|---|
| [—](https://dev.vk.ru/ru/bridge/call) | Позвонить пользователю. |
| [VKWebAppCallStart](https://dev.vk.ru/ru/bridge/VKWebAppCallStart) | Создать ссылку, по которой к [звонку](https://dev.vk.ru/ru/mini-apps/development/calls-integration) могут подключиться пользователи. |
| [VKWebAppCallJoin](https://dev.vk.ru/ru/bridge/VKWebAppCallJoin) | Подключить пользователя к [звонку](https://dev.vk.ru/ru/mini-apps/development/calls-integration) по ссылке. |
| [VKWebAppCallGetStatus](https://dev.vk.ru/ru/bridge/VKWebAppCallGetStatus) | Получить информацию о состоянии текущего активного [звонка](https://dev.vk.ru/ru/mini-apps/development/calls-integration). |
| [VKWebAppCallLeft](https://dev.vk.ru/ru/bridge/VKWebAppCallLeft) | Сообщить, если пользователь вышел из [звонка](https://dev.vk.ru/ru/mini-apps/development/calls-integration). |
| [VKWebAppCallFinished](https://dev.vk.ru/ru/bridge/VKWebAppCallFinished) | Сообщить, если пользователь, создавший [звонок](https://dev.vk.ru/ru/mini-apps/development/calls-integration), завершил его для всех. |

### Мобильные устройства

#### Аутентификация

События этой группы доступны только для [мини-приложений](https://dev.vk.ru/ru/mini-apps/overview).

| Событие | Сценарий использования |
|---|---|
| [VKWebAppSecureTokenRequestAccess](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenRequestAccess) | Запросить у пользователя разрешение на использование биометрии в качестве способа аутентификации в приложении. |
| [VKWebAppSecureTokenSet](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenSet) | Сохранить в защищённое хранилище произвольную строку, которая будет использоваться как ключ доступа. |

| Событие | Сценарий использования |
|---|---|
| [VKWebAppSecureTokenGet](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenGet) | Запустить проверку биометрии и после её успешного прохождения получить ключ доступа из защищённого хранилища. |
| [VKWebAppSecureTokenGetInfo](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenGetInfo) | Получить информацию о том, доступна ли на устройстве биометрия. |
| [VKWebAppSecureTokenRemove](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenRemove) | Удалить из защищённого хранилища ключ доступа, который был сохранён для аутентификации пользователя с помощью биометрии. |

#### Виброотклик

| Событие | Сценарий использования |
|---|---|
| [VKWebAppTapticImpactOccurred](https://dev.vk.ru/ru/bridge/VKWebAppTapticImpactOccurred) | Вызвать вибрацию при столкновении. |
| [VKWebAppTapticNotificationOccurred](https://dev.vk.ru/ru/bridge/VKWebAppTapticNotificationOccurred) | Вызвать вибрацию после выполнения действия. |
| [VKWebAppTapticSelectionChanged](https://dev.vk.ru/ru/bridge/VKWebAppTapticSelectionChanged) | Вызвать вибрацию при изменении выбора пользователем. |

#### Фонарик

| Событие | Сценарий использования |
|---|---|
| [VKWebAppFlashGetInfo](https://dev.vk.ru/ru/bridge/VKWebAppFlashGetInfo) | Получить информацию о фонарике. |
| [VKWebAppFlashSetLevel](https://dev.vk.ru/ru/bridge/VKWebAppFlashSetLevel) | Задать уровень яркости фонарика. |

#### Датчики

| Событие | Сценарий использования |
|---|---|
| [VKWebAppAccelerometerStart](https://dev.vk.ru/ru/bridge/VKWebAppAccelerometerStart) | Отслеживать данные акселерометра. |
| [VKWebAppAccelerometerStop](https://dev.vk.ru/ru/bridge/VKWebAppAccelerometerStop) | Прекратить отслеживание данных акселерометра. |
| [VKWebAppDeviceMotionStart](https://dev.vk.ru/ru/bridge/VKWebAppDeviceMotionStart) | Отслеживать данные о положении устройства. |
| [VKWebAppDeviceMotionStop](https://dev.vk.ru/ru/bridge/VKWebAppDeviceMotionStop) | Прекратить отслеживание данных о положении устройства. |
| [VKWebAppGyroscopeStart](https://dev.vk.ru/ru/bridge/VKWebAppGyroscopeStart) | Отслеживать данные гироскопа. |
| [VKWebAppGyroscopeStop](https://dev.vk.ru/ru/bridge/VKWebAppGyroscopeStop) | Прекратить отслеживание данных гироскопа. |

## Материалы по теме

- [Использование API ВКонтакте](https://dev.vk.ru/ru/api/overview)
- [Документация React](https://ru.react.dev/learn)
