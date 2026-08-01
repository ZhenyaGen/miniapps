# VK Bridge: события

96 событий, для каждого — отдельная страница с параметрами, примером вызова, форматом ответа и совместимостью по платформам.

| Событие | Назначение |
|---|---|
| [`VKWebAppAccelerometerStart`](vkwebappaccelerometerstart.md) | VKWebAppAccelerometerStart включает отслеживание и приём данных акселерометра, установленного на мобильном устройстве. |
| [`VKWebAppAccelerometerStop`](vkwebappaccelerometerstop.md) | VKWebAppAccelerometerStop прекращает отслеживание данных акселерометра. |
| [`VKWebAppAddToChat`](vkwebappaddtochat.md) | VKWebAppAddToChat добавляет виджет мини-приложения в чат. |
| [`VKWebAppAddToCommunity`](vkwebappaddtocommunity.md) | VKWebAppAddToCommunity вызывает окно выбора сообщества и устанавливает в него приложение: мини-приложение или плагин. |
| [`VKWebAppAddToFavorites`](vkwebappaddtofavorites.md) | VKWebAppAddToFavorites показывает окно с предложением добавить мини-приложение или игру в избранное. |
| [`VKWebAppAddToHomeScreen`](vkwebappaddtohomescreen.md) | VKWebAppAddToHomeScreen показывает окно с предложением добавить ярлык мини-приложения или игры на экран устройства. Чтобы убедиться, что ярлык ещё не был добавлен,… |
| [`VKWebAppAddToHomeScreenInfo`](vkwebappaddtohomescreeninfo.md) | VKWebAppRecommend вызывает модальное окно с предложением порекомендовать мини- приложение друзьям и отправляет уведомления, если пользователь нажал Рекомендовать. |
| [`VKWebAppAllowMessagesFromGroup`](soobschestva-vkwebappallowmessagesfromgroup.md) | VKWebAppAllowMessagesFromGroup показывает окно с запросом прав доступа на отправку сообщений от имени сообщества. |
| [`VKWebAppAllowNotifications`](vkwebappallownotifications.md) | VKWebAppAllowNotifications показывает окно с запросом разрешения на отправку уведомлений от мини-приложения или игры. |
| [`VKWebAppBannerAdClosedByUser`](vkwebappbanneradclosedbyuser.md) | VKWebAppBannerAdClosedByUser отправляется платформой, если пользователь закрыл баннер рекламы в игре или мини-приложении, нажав кнопку на баннере. |
| [`VKWebAppBannerAdUpdated`](vkwebappbanneradupdated.md) | VKWebAppBannerAdUpdated отправляется платформой, если в игре или мини-приложении обновилась баннерная реклама. |
| [`VKWebAppCallAPIMethod`](vkwebappcallapimethod.md) | С помощью VKWebAppCallAPIMethod вы можете отправлять запросы к API ВКонтакте и API Одноклассников из клиентской части вашего приложения. |
| [`VKWebAppCallFinished`](vkwebappcallfinished.md) | VKWebAppCallFinished используется при интеграции звонков в мини-приложение. Отправляется платформой, если пользователь, создавший звонок, завершил его. |
| [`VKWebAppCallGetStatus`](vkwebappcallgetstatus.md) | VKWebAppCallGetStatus используется при интеграции звонков в мини-приложение. Событие получает информацию о состоянии текущего активного звонка. |
| [`VKWebAppCallJoin`](vkwebappcalljoin.md) | VKWebAppCallJoin используется при интеграции звонков в мини-приложение. Событие подключает пользователя к звонку по ссылке. Перед подключением пользователь видит окно с… |
| [`VKWebAppCallLeft`](vkwebappcallleft.md) | VKWebAppCallLeft используется при интеграции звонков в мини-приложение. Событие отправляется платформой, если пользователь вышел из звонка. |
| [`VKWebAppCallStart`](vkwebappcallstart.md) | VKWebAppCallStart используется при интеграции звонков в мини-приложение. Событие создаёт ссылку, по которой к звонку могут присоединяться пользователи, запустившие… |
| [`VKWebAppChangeFragment`](vkwebappchangefragment.md) | Платформа ВКонтакте отправляет мини-приложению или игре событие |
| [`VKWebAppCheckAllowedScopes`](vkwebappcheckallowedscopes.md) | С помощью события VKWebAppCheckAllowedScopes вы можете проверить, есть ли у мини- приложения или игры, в которых вы вызываете событие, доступ к тем или иным данным… |
| [`VKWebAppCheckBannerAd`](vkwebappcheckbannerad.md) | VKWebAppCheckBannerAd проверяет, что баннерная реклама, открытая событием VKWebAppShowBannerAd, показана в игре или мини-приложении. |
| [`VKWebAppCheckNativeAds`](vkwebappchecknativeads.md) | VKWebAppCheckNativeAds проверяет, есть ли на стороне пользователя рекламные материалы, доступные для показа в играх или мини-приложениях. |
| [`VKWebAppClose`](vkwebappclose.md) | VKWebAppClose закрывает мини-приложение или игру. Если закрываемое мини-приложение или игра были запущены с помощью события VKWebAppOpenApp, при успешном закрытии в… |
| [`VKWebAppConversionHit`](vkwebappconversionhit.md) | VKWebAppConversionHit отслеживает конверсионные действия пользователей в мини- приложении. Под отслеживанием понимается, что событие конверсионного действия… |
| [`VKWebAppCopyText`](vkwebappcopytext.md) | VKWebAppCopyText копирует переданный текст в буфер обмена. |
| [`VKWebAppCreateHash`](vkwebappcreatehash.md) | VKWebAppCreateHash создаёт криптографическую подпись для данных с помощью защищённого ключа доступа из настроек мини-приложения или игры. Этот ключ известен… |
| [`VKWebAppDenyNotifications`](vkwebappdenynotifications.md) | VKWebAppDenyNotifications отключает уведомления от мини-приложения или игры. |
| [`VKWebAppDeviceMotionStart`](vkwebappdevicemotionstart.md) | VKWebAppDeviceMotionStart включает отслеживание и приём данных о положении мобильного устройства в пространстве. |
| [`VKWebAppDeviceMotionStop`](vkwebappdevicemotionstop.md) | VKWebAppDeviceMotionStop прекращает отслеживание данных о положении мобильного устройства в пространстве. |
| [`VKWebAppDownloadFile`](vkwebappdownloadfile.md) | VKWebAppDownloadFile позволяет скачать файл на устройство. |
| [`VKWebAppFlashGetInfo`](vkwebappflashgetinfo.md) | VKWebAppFlashGetInfo получает информацию о фонарике на устройстве. |
| [`VKWebAppFlashSetLevel`](upravlenie-fonarikom-vkwebappflashsetlevel.md) | VKWebAppFlashSetLevel устанавливает уровень яркости фонарика на устройстве. |
| [`VKWebAppGetAuthToken`](vkwebappgetauthtoken.md) | VKWebAppGetAuthToken отображает запрос на доступ к данным пользователя для мини- приложения или игры. |
| [`VKWebAppGetClientVersion`](vkwebappgetclientversion.md) | VKWebAppGetClientVersion возвращает информацию о клиенте, на котором запущена ваша игра или мини-приложение. |
| [`VKWebAppGetCommunityToken`](vkwebappgetcommunitytoken.md) | VKWebAppGetCommunityToken показывает окно с запросом прав доступа у пользователя и получает ключ доступа для работы с API от имени сообщества. Получить ключ доступа… |
| [`VKWebAppGetConfig`](vkwebappgetconfig.md) | VKWebAppGetConfig получает информацию о конфигурации мини-приложения или игры, а также информацию о родительском приложении, в котором открыто мини-приложение или игра. |
| [`VKWebAppGetEmail`](vkwebappgetemail.md) | VKWebAppGetEmail показывает окно с запросом доступа к адресу электронной почты пользователя и в случае одобрения возвращает этот адрес. |
| [`VKWebAppGetFriends`](vkwebappgetfriends.md) | VKWebAppGetFriends показывает окно выбора друзей из списка и получает информацию о них. |
| [`VKWebAppGetGeodata`](polzovateli-vkwebappgetgeodata.md) | VKWebAppGetGeodata возвращает информацию о местоположении пользователя. |
| [`VKWebAppGetGrantedPermissions`](vkwebappgetgrantedpermissions.md) | VKWebAppGetGrantedPermissions позволяет получить список разрешений, выданных мобильному приложению. |
| [`VKWebAppGetGroupInfo`](vkwebappgetgroupinfo.md) | С помощью события VKWebAppGetGroupInfo вы можете получить данные об одном или нескольких сообществах. |
| [`VKWebAppGetLaunchParams`](vkwebappgetlaunchparams.md) | VKWebAppGetLaunchParams получает актуальные значения параметров запуска игры или мини- приложения. |
| [`VKWebAppGetPersonalCard`](vkwebappgetpersonalcard.md) | VKWebAppGetPersonalCard вызывает карточку контактов пользователя с полями, которые вы запросили. Мобильное приложение показывает экран с запросом доступа к выбранным… |
| [`VKWebAppGetPhoneNumber`](vkwebappgetphonenumber.md) | VKWebAppGetPhoneNumber показывает окно с запросом доступа к номеру телефона пользователя. |
| [`VKWebAppGetUserInfo`](vkwebappgetuserinfo.md) | VKWebAppGetUserInfo получает данные о пользователе из его профиля ВКонтакте или в Одноклассниках. |
| [`VKWebAppGyroscopeStart`](vkwebappgyroscopestart.md) | VKWebAppGyroscopeStart включает отслеживание и приём данных гироскопа, установленного на мобильном устройстве. |
| [`VKWebAppGyroscopeStop`](vkwebappgyroscopestop.md) | VKWebAppGyroscopeStop прекращает отслеживание данных гироскопа. |
| [`VKWebAppHideBannerAd`](vkwebapphidebannerad.md) | VKWebAppHideBannerAd скрывает баннерную рекламу в игре или мини-приложении, открытую событием VKWebAppShowBannerAd . |
| [`VKWebAppInit`](vkwebappinit.md) | VKWebAppInit — первое событие, которое ваше приложение должно отправить приложению для начала работы с VK Bridge. Если это событие не вызвать, ваше мини-приложение или… |
| [`VKWebAppJoinGroup`](soobschestva-vkwebappjoingroup.md) | VKWebAppJoinGroup показывает окно с предложением вступить в сообщество. |
| [`VKWebAppLeaveGroup`](vkwebappleavegroup.md) | VKWebAppLeaveGroup показывает окно с предложением отписаться от сообщества. |
| [`VKWebAppLocationChanged`](sobytiya-zhiznennogo-cikla-vkwebapplocationchanged.md) | VKWebAppLocationChanged отправляется платформой при изменении значения хеша после символа # через событие VKWebAppSetLocation . |
| [`VKWebAppOpenApp`](vkwebappopenapp.md) | VKWebAppOpenApp открывает другое приложение из текущего мини-приложения или игры. |
| [`VKWebAppOpenCodeReader`](obschie-sobytiya-vkwebappopencodereader.md) | VKWebAppOpenCodeReader открывает камеру для считывания QR- или штрихкода и получает результат сканирования. |
| [`VKWebAppOpenContacts`](vkwebappopencontacts.md) | VKWebAppOpenContacts запрашивает доступ к телефонной книге на устройстве, открывает окно выбора контакта из телефонной книги и получает данные контакта. |
| [`VKWebAppOpenPayForm`](vkwebappopenpayform.md) | VKWebAppOpenPayForm показывает экран VK Pay для совершения платежа. |
| [`VKWebAppOpenWallPost`](obschie-sobytiya-vkwebappopenwallpost.md) | VKWebAppOpenWallPost открывает в отдельном окне (поверх мини-приложения или игры) запись, опубликованную на стене пользователя или сообщества. |
| [`VKWebAppRecommend`](vkwebapprecommend.md) | VKWebAppRecommend вызывает модальное окно с предложением порекомендовать мини- приложение друзьям и отправляет уведомления, если пользователь нажал Рекомендовать. |
| [`VKWebAppResizeWindow`](interfeys-i-navigaciya-vkwebappresizewindow.md) | VKWebAppResizeWindow изменяет ширину и высоту элемента iframe. |
| [`VKWebAppRetargetingPixel`](vkwebappretargetingpixel.md) | VKWebAppRetargetingPixel добавляет пользователя в аудиторию ретаргетинга. Параметры соответствуют параметрам event и audience при подключении пикселя в мобильном… |
| [`VKWebAppScroll`](vkwebappscroll.md) | VKWebAppScroll прокручивает окно браузера по вертикали. |
| [`VKWebAppScrollTop`](vkwebappscrolltop.md) | VKWebAppScrollTop возвращает текущую позицию прокрутки от верха родительского окна мини- приложения. |
| [`VKWebAppScrollTopStart`](vkwebappscrolltopstart.md) | VKWebAppScrollTopStart начинает отправлять события о прокрутке родительского окна в мини- приложение. Чтобы остановить отправку событий, вызовите событие… |
| [`VKWebAppScrollTopStop`](vkwebappscrolltopstop.md) | VKWebAppScrollTopStop останавливает отправку событий, начатых событием VKWebAppScrollTopStart, из родительского окна в мини-приложение. |
| [`VKWebAppSecureTokenGet`](vkwebappsecuretokenget.md) | VKWebAppSecureTokenGet запускает проверку биометрии и после её успешного прохождения возвращает ключ доступа из защищённого хранилища. Ключ доступа устанавливается с… |
| [`VKWebAppSecureTokenGetInfo`](autentifikaciya-vkwebappsecuretokengetinfo.md) | VKWebAppSecureTokenGetInfo возвращает информацию о том, доступно ли на устройстве использование биометрии: изображения лица или отпечатка пальца. |
| [`VKWebAppSecureTokenRemove`](vkwebappsecuretokenremove.md) | VKWebAppSecureTokenRemove удаляет ключ доступа, который был сохранён для аутентификации пользователя с помощью биометрии, из защищённого хранилища. |
| [`VKWebAppSecureTokenRequestAccess`](vkwebappsecuretokenrequestaccess.md) | VKWebAppSecureTokenRequestAccess запрашивает у пользователя разрешение на использование биометрии в качестве способа аутентификации пользователя в мини-приложении.… |
| [`VKWebAppSecureTokenSet`](vkwebappsecuretokenset.md) | VKWebAppSecureTokenSet сохраняет произвольную строку в защищённое хранилище на устройстве пользователя. Получить строку из хранилища можно с помощью события |
| [`VKWebAppSendPayload`](vkwebappsendpayload.md) | VKWebAppSendPayload отправляет событие app_payload, которое можно получить через Bots Longpoll или Callback API. |
| [`VKWebAppSendToClient`](vkwebappsendtoclient.md) | VKWebAppSendToClient показывает окно с предложением открыть мини-приложение или игру на привязанном к аккаунту мобильном устройстве. |
| [`VKWebAppSetLocation`](vkwebappsetlocation.md) | VKWebAppSetLocation устанавливает новое значение хеша — строки после символа # в URL мини-приложения или игры вида https://vk.com/app123#some-value. Это значение… |
| [`VKWebAppSetSwipeSettings`](vkwebappsetswipesettings.md) | VKWebAppSetSwipeSettings настраивает в мобильном приложении стандартное поведение жеста «смахнуть назад» (Swipe Back), как в браузере. |
| [`VKWebAppSetViewSettings`](vkwebappsetviewsettings.md) | VKWebAppSetViewSettings устанавливает тему для значков в статус-баре и цвет статус-бара. |
| [`VKWebAppShare`](vkwebappshare.md) | VKWebAppShare показывает окно с предложением поделиться записью с указанной ссылкой в личном сообщении или истории (только в приложении для Android). |
| [`VKWebAppShowBannerAd`](vkwebappshowbannerad.md) | VKWebAppShowBannerAd отображает баннерную рекламу в игре или мини-приложении. |
| [`VKWebAppShowCommunityWidgetPreviewBox`](vkwebappshowcommunitywidgetpreviewbox.md) | VKWebAppShowCommunityWidgetPreviewBox показывает экран предпросмотра виджета для сообщества. |
| [`VKWebAppShowImages`](obschie-sobytiya-vkwebappshowimages.md) | VKWebAppShowImages открывает нативный экран для просмотра изображений. |
| [`VKWebAppShowInviteBox`](igry-vkwebappshowinvitebox.md) | VKWebAppShowInviteBox открывает диалоговое окно приглашения друзей в игру. |
| [`VKWebAppShowLeaderBoardBox`](vkwebappshowleaderboardbox.md) | VKWebAppShowLeaderBoardBox открывает диалоговое окно, которое показывает результаты пользователя в игре относительно его друзей или всех пользователей. |
| [`VKWebAppShowNativeAds`](vkwebappshownativeads.md) | VKWebAppShowNativeAds показывает рекламу пользователям в играх и мини-приложениях. Параметры вызова задают вид желаемой рекламы. |
| [`VKWebAppShowOrderBox`](vkwebappshoworderbox.md) | VKWebAppShowOrderBox открывает окно покупки виртуальной ценности в мини-приложении или игре. |
| [`VKWebAppShowRequestBox`](vkwebappshowrequestbox.md) | VKWebAppShowRequestBox открывает диалоговое окно для отправки запроса о помощи в игре какому-либо пользователю. |
| [`VKWebAppShowSlidesSheet`](vkwebappshowslidessheet.md) | VKWebAppShowSlidesSheet показывает информационные экраны (слайды), которые используются для онбординга пользователя и знакомства с новыми возможностями мини- приложения… |
| [`VKWebAppShowStoryBox`](vkwebappshowstorybox.md) | VKWebAppShowStoryBox открывает редактор историй. Параметры события задают элементы, которые появятся в редакторе при открытии. Пользователь может изменить их, удалить и… |
| [`VKWebAppShowSubscriptionBox`](platezhi-vkwebappshowsubscriptionbox.md) | VKWebAppShowSubscriptionBox открывает диалоговое окно покупки подписки, отказа от неё или восстановления подписки в игре или мини-приложении. Выполняемое действие и… |
| [`VKWebAppStorageGet`](vkwebappstorageget.md) | VKWebAppStorageGet возвращает значения переменных, названия которых переданы в параметре keys. Чтобы задать значения переменных, используйте событие |
| [`VKWebAppStorageGetKeys`](sekciya-storage-vkwebappstoragegetkeys.md) | VKWebAppStorageGetKeys возвращает названия переменных, сохранённых событием VKWebAppStorageSet . |
| [`VKWebAppStorageSet`](vkwebappstorageset.md) | VKWebAppStorageSet задаёт значение переменной, название которой передано в метод, и помещает её в хранилище VK Storage. Пары «ключ — значение» могут храниться бессрочно… |
| [`VKWebAppTapticImpactOccurred`](vkwebapptapticimpactoccurred.md) | VKWebAppTapticImpactOccurred вызывает вибрацию мобильного устройства. В iOS вызывает impactOccurred в Taptic Engine. |
| [`VKWebAppTapticNotificationOccurred`](vibrootklik-taptic-engine-vkwebapptapticnotificationoccurred.md) | VKWebAppTapticNotificationOccurred передаёт генератору виброотклика информацию о том, что задача или действие: |
| [`VKWebAppTapticSelectionChanged`](vibrootklik-taptic-engine-vkwebapptapticselectionchanged.md) | VKWebAppTapticSelectionChanged сообщает генератору виброотклика, что пользователь изменил выбор. В ответ генератор может воспроизвести соответствующие тактильные отклики. |
| [`VKWebAppTrackEvent`](vkwebapptrackevent.md) | VKWebAppTrackEvent отправляет данные из мини-приложения или игры в VK Рекламу. Чтобы данные отправлялись в систему аналитики MyTracker, она должна быть подключена… |
| [`VKWebAppTranslate`](obschie-sobytiya-vkwebapptranslate.md) | Используйте VKWebAppTranslate для перевода текстов на другой язык. |
| [`VKWebAppUpdateConfig`](vkwebappupdateconfig.md) | VKWebAppUpdateConfig отправляется платформой, когда изменяется конфигурация мини- приложения или игры. |
| [`VKWebAppViewHide`](vkwebappviewhide.md) | Мобильное приложение ВКонтакте для Android или iOS отправляет VKWebAppViewHide, когда пользователь сворачивает мини-приложение или игру или переходит в другое приложение… |
| [`VKWebAppViewRestore`](vkwebappviewrestore.md) | Мобильное приложение ВКонтакте для Android или iOS отправляет VKWebAppViewRestore, когда пользователь возвращается в игру или мини-приложение, после того как ранее… |

Остальные страницы раздела (быстрый старт, работа в фоне, обработка результатов) — см. [README базы знаний](../README.md#vk-bridge).
