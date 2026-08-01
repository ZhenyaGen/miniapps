# Cобытия VK Bridge в Одноклассниках

**Раздел:** Одноклассники → Разработка → Cобытия VK Bridge в Одноклассниках  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## События VK Bridge

На странице представлены события, которые поддерживаются в Одноклассниках. Некоторые события имеют отличия при работе ВКонтакте и в Одноклассниках. Мы указали это в таблице. Учитывайте это при разработке приложений.

## Служебные

| Событие | Платформы | Особенности |
|---|---|---|
| [VKWebAppInit](https://dev.vk.ru/ru/bridge/VKWebAppInit) Инициализировать VK Bridge. | Android | iOS Mobile Web Web |
| [VKWebAppGetLaunchParams](https://dev.vk.ru/ru/bridge/VKWebAppGetLaunchParams) Получить параметры запуска приложения. | Android iOS Mobile Web Web | В параметре `vk_platform` передаётся платформа, на которой запущено приложение: - `desktop_web_ok` — десктопная версия сайта. - `mobile_android_ok` — приложение для Android. - `mobile_iphone_ok` — приложение для iOS. - `mobile_web_ok` — мобильный браузер. |
| [VKWebAppGetClientVersion](https://dev.vk.ru/ru/bridge/VKWebAppGetClientVersion) Получить информацию о платформе ВКонтакте, на которой запущено приложение. | Android iOS Mobile Web Web | В поле `platform` возвращается: - `web-ok` — если приложение запущено в десктопной версии сайта. - `android` — если приложение запущено в мобильном клиенте для Android. - `ios` — если приложение запущено в мобильном клиенте для iOS. - `mobile-web-ok` — если приложение запущено в мобильном браузере. |
| [VKWebAppCallAPIMethod](https://dev.vk.ru/ru/bridge/VKWebAppCallAPIMethod) Вызвать метод API ВКонтакте. | Android iOS Mobile Web Web | Параметр `use_local` определяет, к какому API отправляется запрос. Возможные значения: - `true` — к API площадки, которая использует SDK, например [API](https://apiok.ru/ext/) [Одноклассников](https://apiok.ru/ext/). - `false` — к [API Вконтакте](https://dev.vk.ru/ru/reference). Значение по умолчанию. |

## Доступы и разрешения

| Событие | Платформы | Особенности |
|---|---|---|
| [VKWebAppGetAuthToken](https://dev.vk.ru/ru/bridge/VKWebAppGetAuthToken) Запросить доступ к данным пользователя. | Android iOS Mobile Web Web | Параметр `append_local` казывает, для какой площадки нужно получить ключ. Возможные значения: - `true` — получить ключ для площадки, которая использует SDK (например, Одноклассники). - `false` — получить ключ для ВКонтакте. Значение по умолчанию. |

Ключ доступа вернётся в ответе в поле

`local_access_token`.

| [VKWebAppCheckAllowedScopes](https://dev.vk.ru/ru/bridge/VKWebAppCheckAllowedScopes) Получить список данных, к которым у приложения есть доступ. | iOS Mobile Web Web |
|---|---|
| [VKWebAppGetGrantedPermissions](https://dev.vk.ru/ru/bridge/VKWebAppGetGrantedPermissions) Получить список разрешений, выданных мобильному приложению Одноклассники. | Android iOS |

## Внешний вид

| Событие | Платформы | Особенности |
|---|---|---|
| [VKWebAppResizeWindow](https://dev.vk.ru/ru/bridge/VKWebAppResizeWindow) Изменить размер окна приложения. | Web |
| [VKWebAppSetViewSettings](https://dev.vk.ru/ru/bridge/VKWebAppSetViewSettings) Настроить вид элементов управления приложением: статус-бара, экшен-бара, панели навигации. | Android | iOS |

## Навигация

| Событие | Платформы | Особенности |
|---|---|---|
| [VKWebAppSetLocation](https://dev.vk.ru/ru/bridge/VKWebAppSetLocation) Задать значение хеша в адресной строке для навигации внутри приложения. | Android | Mobile Web Web |
| [VKWebAppSetSwipeSettings](https://dev.vk.ru/ru/bridge/VKWebAppSetSwipeSettings) Включить жест «смахнуть назад» (свайп). | iOS |
| [VKWebAppOpenApp](https://dev.vk.ru/ru/bridge/VKWebAppOpenApp) Открыть другое приложение из текущего. | Mobile Web Web | Параметр `app_is_local` определяет, приложение какой площадки должно быть открыто. Возможные значения: - `true` — открыть приложение |

**Событие | Платформы | Особенности**

площадки, которая использует SDK (например, Одноклассники).
- `false` — открыть мини-приложение ВКонтакте. Значение по умолчанию.

| [VKWebAppClose](https://dev.vk.ru/ru/bridge/VKWebAppClose) Закрыть приложение. | Android iOS Mobile Web Web |
|---|---|
| [VKWebAppScroll](https://dev.vk.ru/ru/bridge/VKWebAppScroll) Прокрутить окно приложения по вертикали. | Mobile Web Web |
| [VKWebAppScrollTop](https://dev.vk.ru/ru/bridge/VKWebAppScrollTop) Получить текущую позицию прокрутки относительно верха родительского окна приложения. | Web |
| [VKWebAppScrollTopStart](https://dev.vk.ru/ru/bridge/VKWebAppScrollTopStart) Начать отправку событий о прокрутке родительского окна. | Web |
| [VKWebAppScrollTopStop](https://dev.vk.ru/ru/bridge/VKWebAppScrollTopStop) Остановить отправку событий о прокрутке, начатых событием. | Web |

[`VKWebAppScrollTopStart`](https://dev.vk.ru/ru/bridge/VKWebAppScrollTopStart)

## Монетизация

### Реклама

| Событие | Платформы | Особенности |
|---|---|---|
| [VKWebAppCheckNativeAds](https://dev.vk.ru/ru/bridge/VKWebAppCheckNativeAds) Проверить, есть ли на стороне пользователя рекламные материалы, доступные для показа. | Android | iOS Mobile Web Web |
| [VKWebAppShowNativeAds](https://dev.vk.ru/ru/bridge/VKWebAppShowNativeAds) Показать рекламу. | Android | iOS Mobile Web Web |

### Баннеры

| Событие | Платформы | Особенности |
|---|---|---|
| [VKWebAppShowBannerAd](https://dev.vk.ru/ru/bridge/VKWebAppShowBannerAd) Показать баннерную рекламу. | Android | iOS Mobile Web Web |
| [VKWebAppCheckBannerAd](https://dev.vk.ru/ru/bridge/VKWebAppCheckBannerAd) Проверить, была ли показана баннерная реклама. | Android | iOS Mobile Web Web |
| [VKWebAppBannerAdUpdated](https://dev.vk.ru/ru/bridge/VKWebAppBannerAdUpdated) Получить статус обновления баннерной рекламы. | Android | iOS Mobile Web Web |
| [VKWebAppHideBannerAd](https://dev.vk.ru/ru/bridge/VKWebAppHideBannerAd) Скрыть баннерную рекламу. | Android | iOS Mobile Web Web |
| [VKWebAppBannerAdClosedByUser](https://dev.vk.ru/ru/bridge/VKWebAppBannerAdClosedByUser) Сообщить, что пользователь закрыл баннер рекламы. | Android | iOS Mobile Web Web |

## Покупки

| Событие | Платформы | Особенности |
|---|---|---|
| [VKWebAppShowOrderBox](https://dev.vk.ru/ru/bridge/VKWebAppShowOrderBox) Открыть окно покупки товара. | Android | iOS Mobile Web Web |
| [VKWebAppShowSubscriptionBox](https://dev.vk.ru/ru/bridge/VKWebAppShowSubscriptionBox) Показать окно покупки, отмены или восстановления подписки. | Android | iOS Mobile Web Web |

## Аналитика

| Событие | Платформы | Особенности |
|---|---|---|
| [VKWebAppRetargetingPixel](https://dev.vk.ru/ru/bridge/VKWebAppRetargetingPixel) Добавить пользователя в аудиторию ретаргетинга. | Android | iOS |

**Событие | Платформы | Особенности**

Mobile Web Web

| [VKWebAppTrackEvent](https://dev.vk.ru/ru/bridge/VKWebAppTrackEvent) Отправить данные в [MyTracker](https://tracker.my.com/promo). | Android iOS Mobile Web Web |
|---|---|

## Пользователи

| Событие | Платформы | Особенности |
|---|---|---|
| [VKWebAppGetEmail](https://dev.vk.ru/ru/bridge/VKWebAppGetEmail) Запросить доступ к адресу электронной почты пользователя. | iOS | Mobile Web Web |
| [VKWebAppGetFriends](https://dev.vk.ru/ru/bridge/VKWebAppGetFriends) Показать список друзей пользователя. | Android | iOS Mobile Web Web |
| [VKWebAppGetPhoneNumber](https://dev.vk.ru/ru/bridge/VKWebAppGetPhoneNumber) Запросить доступ к номеру телефона пользователя. | iOS | Mobile Web Web |
| [VKWebAppOpenContacts](https://dev.vk.ru/ru/bridge/VKWebAppOpenContacts) Запросить доступ к контактам из телефонной книги пользователя. | Android | iOS |
| [VKWebAppGetUserInfo](https://dev.vk.ru/ru/bridge/VKWebAppGetUserInfo) Получить данные из профиля пользователя. | Android iOS Mobile Web Web | Параметр `use_local` определяет, с какой площадки нужно получить данные. Возможные значения: - `true` — с площадки, которая использует SDK, например Одноклассники. - `false` — ВКонтакте. Значение по умолчанию. |

## Сообщества

| Событие | Платформы | Особенности |
|---|---|---|
| [VKWebAppAddToCommunity](https://dev.vk.ru/ru/bridge/VKWebAppAddToCommunity) Добавить приложение в сообщество. | Android | iOS Mobile Web Web |

| Событие | Платформы | Особенности |
|---|---|---|
| [VKWebAppAllowMessagesFromGroup](https://dev.vk.ru/ru/bridge/VKWebAppAllowMessagesFromGroup) Получить разрешение на отправку сообщений от имени сообщества. | Android | iOS Mobile Web Web |
| [VKWebAppGetGroupInfo](https://dev.vk.ru/ru/bridge/VKWebAppGetGroupInfo) Получить информацию о сообществе. | Android | iOS Mobile Web Web |
| [VKWebAppJoinGroup](https://dev.vk.ru/ru/bridge/VKWebAppJoinGroup) Предложить пользователю вступить в сообщество. | Android | iOS Mobile Web Web |
| [VKWebAppLeaveGroup](https://dev.vk.ru/ru/bridge/VKWebAppLeaveGroup) Предложить пользователю выйти из сообщества. | Android | iOS Mobile Web Web |

## Социальные механики и взаимодействие

| Событие | Платформы | Особенности |
|---|---|---|
| [VKWebAppShare](https://dev.vk.ru/ru/bridge/VKWebAppShare) Поделиться ссылкой. | Android iOS Mobile Web Web | - В вебе и мобильном браузере можно поделиться только записью на стене. - На Android и iOS: на стене, на стене сообщества, в личных сообщениях, дополнить текстом и отправить в ленту, отправить в приложение или скопировать ссылку |
| [VKWebAppShowStoryBox](https://dev.vk.ru/ru/bridge/VKWebAppShowStoryBox) Открыть редактор историй. | Android iOS Mobile Web Web | - Для поля `background_type` поддерживается только значение `image`. - Для `blob` поддерживаются значения `JPEG`, |

`PNG`, `SVG`.
- В объекте `attachment` у параметра `type` поддерживается только значение `url`

| [VKWebAppOpenWallPost](https://dev.vk.ru/ru/bridge/VKWebAppOpenWallPost) Открыть запись со стены в слое. | iOS Mobile Web Web |
|---|---|

Если запись опубликована пользователем, то в

`owner_id` нужно указать идентификатор пользователя. Если запись опубликована в группе, то нужно указать значение `0`

| [VKWebAppShowInviteBox](https://dev.vk.ru/ru/bridge/VKWebAppShowInviteBox) Пригласить друзей в игру. | Android iOS Mobile Web Web |
|---|---|

Для игр, запущенных в десктопной и мобильной версии сайта Одноклассники, необходимо обязательно передавать параметр `message`

| Событие | Платформы | Особенности |
|---|---|---|
| [VKWebAppShowRequestBox](https://dev.vk.ru/ru/bridge/VKWebAppShowRequestBox) Отправить пользователю запрос о помощи в игре. | iOS | Mobile Web Web |
| [VKWebAppAllowNotifications](https://dev.vk.ru/ru/bridge/VKWebAppAllowNotifications) Запросить разрешение на отправку уведомлений. | Android | iOS Mobile Web Web |
| [VKWebAppDenyNotifications](https://dev.vk.ru/ru/bridge/VKWebAppDenyNotifications) Отключить уведомления. | Android | iOS Mobile Web Web |

## Текст и медиафайлы

| Событие | Платформы | Особенности |
|---|---|---|
| [VKWebAppCopyText](https://dev.vk.ru/ru/bridge/VKWebAppCopyText) Копировать текст в буфер обмена. | Android | iOS Mobile Web Web |
| [VKWebAppDownloadFile](https://dev.vk.ru/ru/bridge/VKWebAppDownloadFile) Скачать файл на устройство. | Android |
| [VKWebAppOpenCodeReader](https://dev.vk.ru/ru/bridge/VKWebAppOpenCodeReader) Считать QR-код. | Android | iOS |
| [VKWebAppShowImages](https://dev.vk.ru/ru/bridge/VKWebAppShowImages) Открыть нативный экран для просмотра изображений. | Android | iOS Mobile Web |
| [VKWebAppTranslate](https://dev.vk.ru/ru/bridge/VKWebAppTranslate) Перевести текст на другой язык. | Android | iOS Mobile Web Web |

## Хранилище VK Storage

| Событие | Платформы | Особенности |
|---|---|---|
| [VKWebAppStorageSet](https://dev.vk.ru/ru/bridge/VKWebAppStorageSet) Создать пару «ключ — значение». | Android |

| Событие | Платформы | Особенности |
|---|---|---|
| [VKWebAppStorageGet](https://dev.vk.ru/ru/bridge/VKWebAppStorageGet) Получить значение ключа. | Android |
| [VKWebAppStorageGetKeys](https://dev.vk.ru/ru/bridge/VKWebAppStorageGetKeys) Получить названия всех переменных. | Android |

## Аутентификация

События этой группы доступны только для [мини-приложений](https://dev.vk.ru/ru/mini-apps/overview).

| Событие | Платформы | Особенности |
|---|---|---|
| [VKWebAppSecureTokenRequestAccess](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenRequestAccess) Запросить у пользователя разрешение на использование биометрии в качестве способа аутентификации в приложении. | iOS |
| [VKWebAppSecureTokenSet](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenSet) Сохранить в защищённое хранилище произвольную строку, которая будет использоваться как ключ доступа. | iOS |
| [VKWebAppSecureTokenGet](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenGet) Запустить проверку биометрии и после её успешного прохождения получить ключ доступа из защищённого хранилища. | iOS |
| [VKWebAppSecureTokenGetInfo](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenGetInfo) Получить информацию о том, доступна ли на устройстве биометрия. | iOS |
| [VKWebAppSecureTokenRemove](https://dev.vk.ru/ru/bridge/VKWebAppSecureTokenRemove) Удалить из защищённого хранилища ключ доступа, который был сохранён для аутентификации пользователя с помощью биометрии. | iOS |

## Мобильные устройства

### Виброотклик

| Событие | Платформы | Особенности |
|---|---|---|
| [VKWebAppTapticImpactOccurred](https://dev.vk.ru/ru/bridge/VKWebAppTapticImpactOccurred) Вызвать вибрацию при столкновении. | iOS |
| [VKWebAppTapticNotificationOccurred](https://dev.vk.ru/ru/bridge/VKWebAppTapticNotificationOccurred) Вызвать вибрацию после выполнения действия. | iOS |
| [VKWebAppTapticSelectionChanged](https://dev.vk.ru/ru/bridge/VKWebAppTapticSelectionChanged) Вызвать вибрацию при изменении выбора пользователем. | iOS |

### Фонарик

| Событие | Платформы | Особенности |
|---|---|---|
| [VKWebAppFlashGetInfo](https://dev.vk.ru/ru/bridge/VKWebAppFlashGetInfo) Получить информацию о фонарике. | Android | iOS |
| [VKWebAppFlashSetLevel](https://dev.vk.ru/ru/bridge/VKWebAppFlashSetLevel) Задать уровень яркости фонарика. | Android | iOS |

### Датчики

| Событие | Платформы | Особенности |
|---|---|---|
| [VKWebAppAccelerometerStart](https://dev.vk.ru/ru/bridge/VKWebAppAccelerometerStart) Отслеживать данные акселерометра. | Android | iOS |
| [VKWebAppAccelerometerStop](https://dev.vk.ru/ru/bridge/VKWebAppAccelerometerStop) Прекратить отслеживание данных акселерометра. | Android | iOS |
| [VKWebAppDeviceMotionStart](https://dev.vk.ru/ru/bridge/VKWebAppDeviceMotionStart) Отслеживать данные о положении устройства. | Android | iOS |
| [VKWebAppDeviceMotionStop](https://dev.vk.ru/ru/bridge/VKWebAppDeviceMotionStop) Прекратить отслеживание данных о положении устройства. | Android | iOS |
| [VKWebAppGyroscopeStart](https://dev.vk.ru/ru/bridge/VKWebAppGyroscopeStart) Отслеживать данные гироскопа. | Android | iOS |
| [VKWebAppGyroscopeStop](https://dev.vk.ru/ru/bridge/VKWebAppGyroscopeStop) Прекратить отслеживание данных гироскопа. | Android | iOS |

## Материалы по теме

- [Библиотека VK Bridge | Первые шаги](https://dev.vk.ru/ru/bridge/getting-started)
- [Параметры запуска в Одноклассниках](https://dev.vk.ru/ru/ok/development/launch-parameters)
