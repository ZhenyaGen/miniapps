# База знаний: разработка мини-приложений ВКонтакте

Полная выгрузка документации [dev.vk.ru](https://dev.vk.ru) — **499 страниц** в Markdown: VK Bridge, VK Mini Apps, VKUI, API ВКонтакте, VK Games, VK Pay, интеграция, правила площадки и видеокурс по разработке.

Исходники — PDF-экспорт страниц документации; при конвертации сохранены заголовки, таблицы, примеры кода и ссылки на оригинальные страницы `dev.vk.ru`.

## С чего начать

- [Первые шаги — создание и подключение мини-приложения](mini-apps/nachalo-raboty-pervye-shagi.md)
- [VK Bridge: быстрый старт](vk-bridge/bystryy-start.md)
- [VK Bridge: обзор всех событий](vk-bridge/vvedenie.md)
- [Пакет `@vkontakte/create-vk-mini-app`](mini-apps/nachalo-raboty-paket-vk-mini-app.md)
- [VKUI — библиотека компонентов](libraries/vkui.md)
- [Ключи доступа и права](api/klyuchi-dostupa-obschie-svedeniya.md)
- [Формат запросов к API ВКонтакте](api/format-zaprosov.md)
- [Параметры запуска приложения](api/parametry-zapuska-prilozheniya.md)
- [Подпись параметров запуска (проверка на сервере)](mini-apps/razrabotka-zapusk-podpis-parametrov-zapuska.md)
- [Справочник всех событий VK Bridge](vk-bridge/EVENTS.md)

## Разделы

| Раздел | Страниц | Что внутри |
|---|---|---|
| [Мини-приложения](#mini-apps) | 89 | Платформа VK Mini Apps целиком: первые шаги, параметры запуска, настройки приложения, каталог, монетизация, уведомления, аналитика и полный видеокурс. |
| [VK Bridge](#vk-bridge) | 100 | JavaScript-мост между мини-приложением и клиентом ВКонтакте: все события `VKWebApp*`, их параметры, ответы и совместимость с платформами. |
| [Библиотеки и SDK](#libraries) | 58 | VKUI, `vk-mini-apps-router`, VK QR, серверные SDK (PHP, Java, Android, iOS) и другие open-source библиотеки ВКонтакте. |
| [API ВКонтакте](#api) | 47 | REST API ВКонтакте: формат запросов, ключи доступа, права, обработка ошибок и справочник методов по секциям. |
| [Интеграция](#integration) | 45 | Подключение приложения к платформе: авторизация, подпись параметров запуска, вебхуки, сервер приложения. |
| [VK Pay](#vk-pay) | 21 | Платежи и подписки: VK Pay, внутренняя валюта, обработка заказов на стороне сервера. |
| [VK Games](#vk-games) | 80 | Игры на платформе: запуск, экономика, реклама, лидерборды, продвижение и требования площадки. |
| [Одноклассники](#odnoklassniki) | 10 | Запуск и адаптация мини-приложений в Одноклассниках. |
| [VK Captcha](#captcha) | 13 | Защита от ботов: VK Captcha и VK ID Captcha. |
| [VK ID](#vk-id) | 1 | Авторизация от VK (VK ID). |
| [VK Testers](#vk-testers) | 10 | Тестирование приложений через VK Testers. |
| [Маски](#masks) | 10 | Разработка и публикация масок. |
| [Истории](#stories) | 1 | Истории и стикеры. |
| [VK Карты](#vk-maps) | 2 | VK Карты. |
| [Правила и модерация](#rules) | 9 | Правила платформы, модерация, оферты и юридические требования. |
| [Прочее](#misc) | 3 | Материалы, не попавшие в другие разделы. |

---

<a id="mini-apps"></a>

## Мини-приложения

Платформа VK Mini Apps целиком: первые шаги, параметры запуска, настройки приложения, каталог, монетизация, уведомления, аналитика и полный видеокурс.

### Мини-приложения

- [Обзор](mini-apps/obzor.md)
- [Разработка_ Библиотека VK Bridge](mini-apps/razrabotka-biblioteka-vk-bridge.md)

### О приложениях

- [Переход на LongID](mini-apps/perehod-na-longid.md)
- [Типы приложений ВКонтакте](mini-apps/tipy-prilozheniy-vkontakte.md)

### Мини-приложения → Начало работы

- [Пакет vk-mini-app](mini-apps/nachalo-raboty-paket-vk-mini-app.md)
- [Первые шаги](mini-apps/nachalo-raboty-pervye-shagi.md)
- [Советы по созданию и продвижению](mini-apps/nachalo-raboty-sovety-po-sozdaniyu-i-prodvizheniyu.md)

### Мини-приложения → Поддержка разработчиков

- [Q&A-сессии](mini-apps/podderzhka-razrabotchikov-q-a-sessii.md)
- [Обзор](mini-apps/podderzhka-razrabotchikov-obzor.md)
- [Образовательные курсы в Lerna](mini-apps/podderzhka-razrabotchikov-obrazovatelnye-kursy-v-lerna.md)

### Мини-приложения → Разработка

- [Управление группами тестировщиков](mini-apps/razrabotka-upravlenie-gruppami-testirovschikov.md)
- [Установка ПО](mini-apps/razrabotka-ustanovka-po.md)

### Мини-приложения → Начало работы → Примеры проектов

- [Все примеры](mini-apps/nachalo-raboty-primery-proektov-vse-primery.md)
- [Пример «Магазин»](mini-apps/nachalo-raboty-primery-proektov-primer-magazin.md)

### Мини-приложения → Образовательные материалы → Видеокурс

- [Модуль 1. Знакомство](mini-apps/obrazovatelnye-materialy-videokurs-modul-1-znakomstvo.md)
- [Модуль 2. Выбор идеи](mini-apps/obrazovatelnye-materialy-videokurs-modul-2-vybor-idei.md)
- [Модуль 3. Дизайн](mini-apps/obrazovatelnye-materialy-videokurs-modul-3-dizayn.md)
- [Модуль 4. Разработка](mini-apps/obrazovatelnye-materialy-videokurs-modul-4-razrabotka.md)
- [Модуль 5. Тестирование](mini-apps/obrazovatelnye-materialy-videokurs-modul-5-testirovanie.md)
- [Модуль 5. Тестирование_ Урок 1. Планирование тестирования_ выявление приоритетов](mini-apps/obrazovatelnye-materialy-videokurs-modul-5-testirovanie-urok-5.md)
- [Модуль 6. Модерация](mini-apps/obrazovatelnye-materialy-videokurs-modul-6-moderaciya.md)
- [Модуль 6. Модерация_ Урок 5. Ответы на вопросы](mini-apps/obrazovatelnye-materialy-videokurs-modul-6-moderaciya-urok-5.md)
- [Модуль 7. Монетизация](mini-apps/obrazovatelnye-materialy-videokurs-modul-7-monetizaciya.md)
- [Модуль 8. Продвижение](mini-apps/obrazovatelnye-materialy-videokurs-modul-8-prodvizhenie.md)
- [Разработка мини-приложений ВКонтакте](mini-apps/obrazovatelnye-materialy-videokurs-razrabotka-mini-prilozhen.md)

### Мини-приложения → Разработка → Запуск

- [Использование iframe и WebView](mini-apps/razrabotka-zapusk-ispolzovanie-iframe-i-webview.md)
- [Подпись параметров запуска](mini-apps/razrabotka-zapusk-podpis-parametrov-zapuska.md)
- [Работа кеша приложений](mini-apps/razrabotka-zapusk-rabota-kesha-prilozheniy.md)
- [Экран запуска приложения](mini-apps/razrabotka-zapusk-ekran-zapuska-prilozheniya.md)

### Мини-приложения → Разработка → Параметры запуска

- [vk_ref](mini-apps/razrabotka-parametry-zapuska-vk-ref.md)

### Мини-приложений → Образовательные материалы → Видеокурс → Модуль 3. Дизайн

- [Урок 6. Дизайн-поддержка](mini-apps/obrazovatelnye-materialy-videokurs-modul-3-dizayn-urok-6-diz.md)

### Мини-приложений → Образовательные материалы → Видеокурс → Модуль 8. Продвижение

- [Урок 6. Главное в продвижении мини-приложений](mini-apps/obrazovatelnye-materialy-videokurs-modul-8-prodvizhenie-urok.md)

### Мини-приложения → Образовательные материалы → Видеокурс → Модуль 1. Знакомство

- [Урок 1. Платформа VK Mini Apps](mini-apps/obrazovatelnye-materialy-videokurs-modul-1-znakomstvo-urok-1.md)
- [Урок 2. Процесс создания мини-приложения](mini-apps/obrazovatelnye-materialy-videokurs-modul-1-znakomstvo-urok-2.md)
- [Урок 3. Формируем команду для создания мини-приложений](mini-apps/obrazovatelnye-materialy-videokurs-modul-1-znakomstvo-urok-3.md)

### Мини-приложения → Образовательные материалы → Видеокурс → Модуль 2. Выбор идеи

- [Урок 1. Виды мини-приложений](mini-apps/obrazovatelnye-materialy-videokurs-modul-2-vybor-idei-urok-1.md)
- [Урок 2. Социальные механики](mini-apps/obrazovatelnye-materialy-videokurs-modul-2-vybor-idei-urok-2.md)
- [Урок 3. Поиск идеи мини-приложения](mini-apps/obrazovatelnye-materialy-videokurs-modul-2-vybor-idei-urok-3.md)
- [Урок 4. Анализ рынка](mini-apps/obrazovatelnye-materialy-videokurs-modul-2-vybor-idei-urok-4.md)
- [Урок 5. Тестирование идей](mini-apps/obrazovatelnye-materialy-videokurs-modul-2-vybor-idei-urok-5.md)

### Мини-приложения → Образовательные материалы → Видеокурс → Модуль 3. Дизайн

- [Урок 1. Этапы создания дизайна мини-приложения](mini-apps/obrazovatelnye-materialy-videokurs-modul-3-dizayn-urok-1-eta.md)
- [Урок 2. Построение пути пользователя](mini-apps/obrazovatelnye-materialy-videokurs-modul-3-dizayn-urok-2-pos.md)
- [Урок 3. Создание прототипа](mini-apps/obrazovatelnye-materialy-videokurs-modul-3-dizayn-urok-3-soz.md)
- [Урок 4. Дизайн UI мини-приложения](mini-apps/obrazovatelnye-materialy-videokurs-modul-3-dizayn-urok-4-diz.md)
- [Урок 5. Аналитика и исследования](mini-apps/obrazovatelnye-materialy-videokurs-modul-3-dizayn-urok-5-ana.md)

### Мини-приложения → Образовательные материалы → Видеокурс → Модуль 4. Разработка

- [10. ODR](mini-apps/obrazovatelnye-materialy-videokurs-modul-4-razrabotka-10-odr.md)
- [11. Работа с API ВКонтакте в клиентской части приложения](mini-apps/obrazovatelnye-materialy-videokurs-modul-4-razrabotka-11-rab.md)
- [12. Особенности разработки для мобильных устройств](mini-apps/obrazovatelnye-materialy-videokurs-modul-4-razrabotka-12-oso.md)
- [13. Уведомления](mini-apps/obrazovatelnye-materialy-videokurs-modul-4-razrabotka-13-uve.md)
- [15. Онбординг](mini-apps/obrazovatelnye-materialy-videokurs-modul-4-razrabotka-15-onb.md)
- [16. Работа с VK Storage](mini-apps/obrazovatelnye-materialy-videokurs-modul-4-razrabotka-16-rab.md)
- [18. Счётчики и бейджи](mini-apps/obrazovatelnye-materialy-videokurs-modul-4-razrabotka-18-sch.md)
- [19. Эффективная работа с API ВКонтакте](mini-apps/obrazovatelnye-materialy-videokurs-modul-4-razrabotka-19-eff.md)
- [20. Заключение](mini-apps/obrazovatelnye-materialy-videokurs-modul-4-razrabotka-20-zak.md)
- [7. Вёрстка под vk.com и m.vk.com](mini-apps/obrazovatelnye-materialy-videokurs-modul-4-razrabotka-7-vers.md)
- [8. Работа с внешним API](mini-apps/obrazovatelnye-materialy-videokurs-modul-4-razrabotka-8-rabo.md)
- [9. Авторизация запросов к серверу мини-приложения](mini-apps/obrazovatelnye-materialy-videokurs-modul-4-razrabotka-9-avto.md)
- [Урок 1. Создание и регистрация мини-приложения](mini-apps/obrazovatelnye-materialy-videokurs-modul-4-razrabotka-urok-1.md)
- [Урок 2. Знакомство с VKUI](mini-apps/obrazovatelnye-materialy-videokurs-modul-4-razrabotka-urok-2.md)
- [Урок 3. Роутинг](mini-apps/obrazovatelnye-materialy-videokurs-modul-4-razrabotka-urok-3.md)
- [Урок 4. Модальные окна](mini-apps/obrazovatelnye-materialy-videokurs-modul-4-razrabotka-urok-4.md)
- [Урок 5. Основы работы с VK Bridge](mini-apps/obrazovatelnye-materialy-videokurs-modul-4-razrabotka-urok-5.md)
- [Урок 6. Подписка на события VK Bridge и их особенности](mini-apps/obrazovatelnye-materialy-videokurs-modul-4-razrabotka-urok-6.md)

### Мини-приложения → Образовательные материалы → Видеокурс → Модуль 5. Тестирование

- [10. Безопасность мини-приложений](mini-apps/obrazovatelnye-materialy-videokurs-modul-5-testirovanie-10-b.md)
- [11. Тестирование новых версий мини-приложений](mini-apps/obrazovatelnye-materialy-videokurs-modul-5-testirovanie-11-t.md)
- [7. Тестирование ODR в VK Mini Apps](mini-apps/obrazovatelnye-materialy-videokurs-modul-5-testirovanie-7-te.md)
- [9. Тестирование на локальном хосте](mini-apps/obrazovatelnye-materialy-videokurs-modul-5-testirovanie-9-te.md)
- [Урок 2. Планирование тестирования_ определение сценариев](mini-apps/obrazovatelnye-materialy-videokurs-modul-5-testirovanie-urok.md)
- [Урок 3. Тестирование требований](mini-apps/obrazovatelnye-materialy-videokurs-modul-5-testirovanie-urok-2.md)
- [Урок 4. Инструменты тестирования и отладки](mini-apps/obrazovatelnye-materialy-videokurs-modul-5-testirovanie-urok-3.md)
- [Урок 5. Нагрузочное тестирование](mini-apps/obrazovatelnye-materialy-videokurs-modul-5-testirovanie-urok-4.md)

### Мини-приложения → Образовательные материалы → Видеокурс → Модуль 6. Модерация

- [Урок 2. Подготовка к модерации в каталог](mini-apps/obrazovatelnye-materialy-videokurs-modul-6-moderaciya-urok-2.md)
- [Урок 3. Правила публикации в каталоге](mini-apps/obrazovatelnye-materialy-videokurs-modul-6-moderaciya-urok-3.md)
- [Урок 4. Процесс модерации](mini-apps/obrazovatelnye-materialy-videokurs-modul-6-moderaciya-urok-4.md)

### Мини-приложения → Образовательные материалы → Видеокурс → Модуль 7. Монетизация

- [Урок 1. Реклама_ особенности и правила использования](mini-apps/obrazovatelnye-materialy-videokurs-modul-7-monetizaciya-urok.md)
- [Урок 2. Реклама_ подключение в мини-приложении](mini-apps/obrazovatelnye-materialy-videokurs-modul-7-monetizaciya-urok-2.md)
- [Урок 3. Продажа виртуальных ценностей за голоса](mini-apps/obrazovatelnye-materialy-videokurs-modul-7-monetizaciya-urok-3.md)
- [Урок 4. Продажа виртуальных ценностей_ реализация взаимодействия](mini-apps/obrazovatelnye-materialy-videokurs-modul-7-monetizaciya-urok-4.md)
- [Урок 5. Продажа виртуальных ценностей_ разовая оплата и подписки](mini-apps/obrazovatelnye-materialy-videokurs-modul-7-monetizaciya-urok-5.md)
- [Урок 6. Продажа цифровых и физических товаров_ особенности и правила](mini-apps/obrazovatelnye-materialy-videokurs-modul-7-monetizaciya-urok-6.md)
- [Урок 7. Продажа цифровых и физических товаров_ реализация](mini-apps/obrazovatelnye-materialy-videokurs-modul-7-monetizaciya-urok-7.md)
- [Урок 8. Вывод средств из мини-приложения](mini-apps/obrazovatelnye-materialy-videokurs-modul-7-monetizaciya-urok-8.md)
- [Урок 9. Заключение](mini-apps/obrazovatelnye-materialy-videokurs-modul-7-monetizaciya-urok-9.md)

### Мини-приложения → Образовательные материалы → Видеокурс → Модуль 8. Продвижение

- [Урок 1. Эффективные коммуникации с аудиторией](mini-apps/obrazovatelnye-materialy-videokurs-modul-8-prodvizhenie-urok-2.md)
- [Урок 2. Как бесплатно привлечь новую аудиторию](mini-apps/obrazovatelnye-materialy-videokurs-modul-8-prodvizhenie-urok-3.md)
- [Урок 3. Как удержать активную аудиторию](mini-apps/obrazovatelnye-materialy-videokurs-modul-8-prodvizhenie-urok-4.md)
- [Урок 4. Принципы запуска рекламной кампании](mini-apps/obrazovatelnye-materialy-videokurs-modul-8-prodvizhenie-urok-5.md)
- [Урок 5. Что нужно сделать до запуска продвижения](mini-apps/obrazovatelnye-materialy-videokurs-modul-8-prodvizhenie-urok-6.md)

### Мини-приложения → Разработка → Запуск → Параметры запуска

- [Значения параметра vk_ref](mini-apps/razrabotka-zapusk-parametry-zapuska-znacheniya-parametra-vk.md)

---

<a id="vk-bridge"></a>

## VK Bridge

JavaScript-мост между мини-приложением и клиентом ВКонтакте: все события `VKWebApp*`, их параметры, ответы и совместимость с платформами.

### VK Bridge

- [VKWebAppAccelerometerStart](vk-bridge/vkwebappaccelerometerstart.md)
- [VKWebAppAccelerometerStop](vk-bridge/vkwebappaccelerometerstop.md)
- [VKWebAppAddToChat](vk-bridge/vkwebappaddtochat.md)
- [VKWebAppAddToCommunity](vk-bridge/vkwebappaddtocommunity.md)
- [VKWebAppAddToFavorites](vk-bridge/vkwebappaddtofavorites.md)
- [VKWebAppAddToHomeScreen](vk-bridge/vkwebappaddtohomescreen.md)
- [VKWebAppAddToHomeScreenInfo](vk-bridge/vkwebappaddtohomescreeninfo.md)
- [VKWebAppAllowNotifications](vk-bridge/vkwebappallownotifications.md)
- [VKWebAppBannerAdClosedByUser](vk-bridge/vkwebappbanneradclosedbyuser.md)
- [VKWebAppBannerAdUpdated](vk-bridge/vkwebappbanneradupdated.md)
- [VKWebAppCallAPIMethod](vk-bridge/vkwebappcallapimethod.md)
- [VKWebAppCallFinished](vk-bridge/vkwebappcallfinished.md)
- [VKWebAppCallGetStatus](vk-bridge/vkwebappcallgetstatus.md)
- [VKWebAppCallJoin](vk-bridge/vkwebappcalljoin.md)
- [VKWebAppCallLeft](vk-bridge/vkwebappcallleft.md)
- [VKWebAppCallStart](vk-bridge/vkwebappcallstart.md)
- [VKWebAppChangeFragment](vk-bridge/vkwebappchangefragment.md)
- [VKWebAppCheckAllowedScopes](vk-bridge/vkwebappcheckallowedscopes.md)
- [VKWebAppCheckBannerAd](vk-bridge/vkwebappcheckbannerad.md)
- [VKWebAppCheckNativeAds](vk-bridge/vkwebappchecknativeads.md)
- [VKWebAppClose](vk-bridge/vkwebappclose.md)
- [VKWebAppConversionHit](vk-bridge/vkwebappconversionhit.md)
- [VKWebAppCopyText](vk-bridge/vkwebappcopytext.md)
- [VKWebAppCreateHash](vk-bridge/vkwebappcreatehash.md)
- [VKWebAppDenyNotifications](vk-bridge/vkwebappdenynotifications.md)
- [VKWebAppDeviceMotionStart](vk-bridge/vkwebappdevicemotionstart.md)
- [VKWebAppDeviceMotionStop](vk-bridge/vkwebappdevicemotionstop.md)
- [VKWebAppDownloadFile](vk-bridge/vkwebappdownloadfile.md)
- [VKWebAppFlashGetInfo](vk-bridge/vkwebappflashgetinfo.md)
- [VKWebAppGetAuthToken](vk-bridge/vkwebappgetauthtoken.md)
- [VKWebAppGetClientVersion](vk-bridge/vkwebappgetclientversion.md)
- [VKWebAppGetCommunityToken](vk-bridge/vkwebappgetcommunitytoken.md)
- [VKWebAppGetConfig](vk-bridge/vkwebappgetconfig.md)
- [VKWebAppGetEmail](vk-bridge/vkwebappgetemail.md)
- [VKWebAppGetFriends](vk-bridge/vkwebappgetfriends.md)
- [VKWebAppGetGrantedPermissions](vk-bridge/vkwebappgetgrantedpermissions.md)
- [VKWebAppGetGroupInfo](vk-bridge/vkwebappgetgroupinfo.md)
- [VKWebAppGetLaunchParams](vk-bridge/vkwebappgetlaunchparams.md)
- [VKWebAppGetPersonalCard](vk-bridge/vkwebappgetpersonalcard.md)
- [VKWebAppGetPhoneNumber](vk-bridge/vkwebappgetphonenumber.md)
- [VKWebAppGetUserInfo](vk-bridge/vkwebappgetuserinfo.md)
- [VKWebAppGyroscopeStart](vk-bridge/vkwebappgyroscopestart.md)
- [VKWebAppGyroscopeStop](vk-bridge/vkwebappgyroscopestop.md)
- [VKWebAppHideBannerAd](vk-bridge/vkwebapphidebannerad.md)
- [VKWebAppInit](vk-bridge/vkwebappinit.md)
- [VKWebAppLeaveGroup](vk-bridge/vkwebappleavegroup.md)
- [VKWebAppOpenApp](vk-bridge/vkwebappopenapp.md)
- [VKWebAppOpenContacts](vk-bridge/vkwebappopencontacts.md)
- [VKWebAppOpenPayForm](vk-bridge/vkwebappopenpayform.md)
- [VKWebAppRecommend](vk-bridge/vkwebapprecommend.md)
- [VKWebAppRetargetingPixel](vk-bridge/vkwebappretargetingpixel.md)
- [VKWebAppScroll](vk-bridge/vkwebappscroll.md)
- [VKWebAppScrollTop](vk-bridge/vkwebappscrolltop.md)
- [VKWebAppScrollTopStart](vk-bridge/vkwebappscrolltopstart.md)
- [VKWebAppScrollTopStop](vk-bridge/vkwebappscrolltopstop.md)
- [VKWebAppSecureTokenGet](vk-bridge/vkwebappsecuretokenget.md)
- [VKWebAppSecureTokenRemove](vk-bridge/vkwebappsecuretokenremove.md)
- [VKWebAppSecureTokenRequestAccess](vk-bridge/vkwebappsecuretokenrequestaccess.md)
- [VKWebAppSecureTokenSet](vk-bridge/vkwebappsecuretokenset.md)
- [VKWebAppSendPayload](vk-bridge/vkwebappsendpayload.md)
- [VKWebAppSendToClient](vk-bridge/vkwebappsendtoclient.md)
- [VKWebAppSetLocation](vk-bridge/vkwebappsetlocation.md)
- [VKWebAppSetSwipeSettings](vk-bridge/vkwebappsetswipesettings.md)
- [VKWebAppSetViewSettings](vk-bridge/vkwebappsetviewsettings.md)
- [VKWebAppShare](vk-bridge/vkwebappshare.md)
- [VKWebAppShowBannerAd](vk-bridge/vkwebappshowbannerad.md)
- [VKWebAppShowCommunityWidgetPreviewBox](vk-bridge/vkwebappshowcommunitywidgetpreviewbox.md)
- [VKWebAppShowLeaderBoardBox](vk-bridge/vkwebappshowleaderboardbox.md)
- [VKWebAppShowNativeAds](vk-bridge/vkwebappshownativeads.md)
- [VKWebAppShowOrderBox](vk-bridge/vkwebappshoworderbox.md)
- [VKWebAppShowRequestBox](vk-bridge/vkwebappshowrequestbox.md)
- [VKWebAppShowSlidesSheet](vk-bridge/vkwebappshowslidessheet.md)
- [VKWebAppShowStoryBox](vk-bridge/vkwebappshowstorybox.md)
- [VKWebAppStorageGet](vk-bridge/vkwebappstorageget.md)
- [VKWebAppStorageSet](vk-bridge/vkwebappstorageset.md)
- [VKWebAppTapticImpactOccurred](vk-bridge/vkwebapptapticimpactoccurred.md)
- [VKWebAppTrackEvent](vk-bridge/vkwebapptrackevent.md)
- [VKWebAppUpdateConfig](vk-bridge/vkwebappupdateconfig.md)
- [VKWebAppViewHide](vk-bridge/vkwebappviewhide.md)
- [VKWebAppViewRestore](vk-bridge/vkwebappviewrestore.md)
- [Быстрый старт](vk-bridge/bystryy-start.md)
- [Введение](vk-bridge/vvedenie.md)
- [Позвонить пользователю](vk-bridge/pozvonit-polzovatelyu.md)
- [Работа VK Bridge в фоновом режиме](vk-bridge/rabota-vk-bridge-v-fonovom-rezhime.md)

### VK Bridge → Аутентификация

- [VKWebAppSecureTokenGetInfo](vk-bridge/autentifikaciya-vkwebappsecuretokengetinfo.md)

### VK Bridge → Виброотклик (Taptic Engine)

- [VKWebAppTapticNotificationOccurred](vk-bridge/vibrootklik-taptic-engine-vkwebapptapticnotificationoccurred.md)
- [VKWebAppTapticSelectionChanged](vk-bridge/vibrootklik-taptic-engine-vkwebapptapticselectionchanged.md)

### VK Bridge → Игры

- [VKWebAppShowInviteBox](vk-bridge/igry-vkwebappshowinvitebox.md)

### VK Bridge → Интерфейс и навигация

- [VKWebAppResizeWindow](vk-bridge/interfeys-i-navigaciya-vkwebappresizewindow.md)

### VK Bridge → Общие события

- [VKWebAppOpenCodeReader](vk-bridge/obschie-sobytiya-vkwebappopencodereader.md)
- [VKWebAppOpenWallPost](vk-bridge/obschie-sobytiya-vkwebappopenwallpost.md)
- [VKWebAppShowImages](vk-bridge/obschie-sobytiya-vkwebappshowimages.md)
- [VKWebAppTranslate](vk-bridge/obschie-sobytiya-vkwebapptranslate.md)

### VK Bridge → Платежи

- [VKWebAppShowSubscriptionBox](vk-bridge/platezhi-vkwebappshowsubscriptionbox.md)

### VK Bridge → Пользователи

- [VKWebAppGetGeodata](vk-bridge/polzovateli-vkwebappgetgeodata.md)

### VK Bridge → Секция Storage

- [VKWebAppStorageGetKeys](vk-bridge/sekciya-storage-vkwebappstoragegetkeys.md)

### VK Bridge → События жизненного цикла

- [VKWebAppLocationChanged](vk-bridge/sobytiya-zhiznennogo-cikla-vkwebapplocationchanged.md)

### VK Bridge → Сообщества

- [VKWebAppAllowMessagesFromGroup](vk-bridge/soobschestva-vkwebappallowmessagesfromgroup.md)
- [VKWebAppJoinGroup](vk-bridge/soobschestva-vkwebappjoingroup.md)

### VK Bridge → Управление фонариком

- [VKWebAppFlashSetLevel](vk-bridge/upravlenie-fonarikom-vkwebappflashsetlevel.md)

---

<a id="libraries"></a>

## Библиотеки и SDK

VKUI, `vk-mini-apps-router`, VK QR, серверные SDK (PHP, Java, Android, iOS) и другие open-source библиотеки ВКонтакте.

### Библиотеки

- [VK QR](libraries/vk-qr.md)
- [vk-mini-apps-router](libraries/vk-mini-apps-router.md)
- [VKUI](libraries/vkui.md)
- [Работа с open-source библиотеками ВКонтакте](libraries/rabota-s-open-source-bibliotekami-vkontakte.md)
- [Утилита VK Tunnel](libraries/utilita-vk-tunnel.md)

### Библиотеки → SDK

- [Android SDK](libraries/sdk-android-sdk.md)
- [iOS SDK](libraries/sdk-ios-sdk.md)
- [Java SDK](libraries/sdk-java-sdk.md)
- [PHP SDK](libraries/sdk-php-sdk.md)
- [Обзор SDK](libraries/sdk-obzor-sdk.md)

### Библиотеки → vk-mini-apps-router

- [Блокировка навигации](libraries/vk-mini-apps-router-blokirovka-navigacii.md)
- [Использование параметров](libraries/vk-mini-apps-router-ispolzovanie-parametrov.md)
- [История навигации](libraries/vk-mini-apps-router-istoriya-navigacii.md)
- [Навигация в приложении](libraries/vk-mini-apps-router-navigaciya-v-prilozhenii.md)
- [Настройка маршрутов](libraries/vk-mini-apps-router-nastroyka-marshrutov.md)
- [Обработка ошибок](libraries/vk-mini-apps-router-obrabotka-oshibok.md)
- [Поддержка анимации](libraries/vk-mini-apps-router-podderzhka-animacii.md)
- [Поддержка модальных и всплывающих окон](libraries/vk-mini-apps-router-podderzhka-modalnyh-i-vsplyvayuschih-oko.md)
- [Справочник](libraries/vk-mini-apps-router-spravochnik.md)
- [Типы роутеров](libraries/vk-mini-apps-router-tipy-routerov.md)
- [Установка и подключение](libraries/vk-mini-apps-router-ustanovka-i-podklyuchenie.md)
- [Формат внешних и внутренних ссылок](libraries/vk-mini-apps-router-format-vneshnih-i-vnutrennih-ssylok.md)

### Библиотеки → vk-mini-apps-router → Справочник → Hooks

- [useActiveVkuiLocation](libraries/vk-mini-apps-router-spravochnik-hooks-useactivevkuilocation.md)
- [useBlocker](libraries/vk-mini-apps-router-spravochnik-hooks-useblocker.md)
- [useEnableSwipeBack](libraries/vk-mini-apps-router-spravochnik-hooks-useenableswipeback.md)
- [useFirstPageCheck](libraries/vk-mini-apps-router-spravochnik-hooks-usefirstpagecheck.md)
- [useGetPanelForView](libraries/vk-mini-apps-router-spravochnik-hooks-usegetpanelforview.md)
- [useHistoryManager](libraries/vk-mini-apps-router-spravochnik-hooks-usehistorymanager.md)
- [useHref](libraries/vk-mini-apps-router-spravochnik-hooks-usehref.md)
- [useLinkClickHandler](libraries/vk-mini-apps-router-spravochnik-hooks-uselinkclickhandler.md)
- [useParams](libraries/vk-mini-apps-router-spravochnik-hooks-useparams.md)
- [useRouteNavigator](libraries/vk-mini-apps-router-spravochnik-hooks-useroutenavigator.md)
- [useSearchParams](libraries/vk-mini-apps-router-spravochnik-hooks-usesearchparams.md)

### Библиотеки → vk-mini-apps-router → Справочник → Hoos

- [useMetaParams](libraries/vk-mini-apps-router-spravochnik-hoos-usemetaparams.md)
- [usePopout](libraries/vk-mini-apps-router-spravochnik-hoos-usepopout.md)

### Библиотеки → vk-mini-apps-router → Справочник → Компоненты

- [RouterLink](libraries/vk-mini-apps-router-spravochnik-komponenty-routerlink.md)
- [RouterProvider](libraries/vk-mini-apps-router-spravochnik-komponenty-routerprovider.md)

### Библиотеки → vk-mini-apps-router → Справочник → Объекты

- [HistoryManager](libraries/vk-mini-apps-router-spravochnik-obekty-historymanager.md)
- [HistoryManager.getCurrentPosition](libraries/vk-mini-apps-router-spravochnik-obekty-historymanager-getcur.md)
- [HistoryManager.getHistory](libraries/vk-mini-apps-router-spravochnik-obekty-historymanager-gethis.md)
- [NavigationOptions](libraries/vk-mini-apps-router-spravochnik-obekty-navigationoptions.md)
- [RouteNavigator](libraries/vk-mini-apps-router-spravochnik-obekty-routenavigator.md)
- [RouteNavigator.back](libraries/vk-mini-apps-router-spravochnik-obekty-routenavigator-back.md)
- [RouteNavigator.backToFirst](libraries/vk-mini-apps-router-spravochnik-obekty-routenavigator-backto.md)
- [RouteNavigator.go](libraries/vk-mini-apps-router-spravochnik-obekty-routenavigator-go.md)
- [RouteNavigator.hideModal](libraries/vk-mini-apps-router-spravochnik-obekty-routenavigator-hidemo.md)
- [RouteNavigator.hidePopout](libraries/vk-mini-apps-router-spravochnik-obekty-routenavigator-hidepo.md)
- [RouteNavigator.push](libraries/vk-mini-apps-router-spravochnik-obekty-routenavigator-push.md)
- [RouteNavigator.replace](libraries/vk-mini-apps-router-spravochnik-obekty-routenavigator-replac.md)
- [RouteNavigator.runSync](libraries/vk-mini-apps-router-spravochnik-obekty-routenavigator-runsyn.md)
- [RouteNavigator.showModal](libraries/vk-mini-apps-router-spravochnik-obekty-routenavigator-showmo.md)
- [RouteNavigator.showPopout](libraries/vk-mini-apps-router-spravochnik-obekty-routenavigator-showpo.md)
- [RouteWithoutRoot](libraries/vk-mini-apps-router-spravochnik-obekty-routewithoutroot.md)
- [RouteWithRoot](libraries/vk-mini-apps-router-spravochnik-obekty-routewithroot.md)

### Библиотеки → vk-mini-apps-router → Справочник → Функции

- [createBrowserRouter](libraries/vk-mini-apps-router-spravochnik-funkcii-createbrowserrouter.md)
- [createHashParamRouter](libraries/vk-mini-apps-router-spravochnik-funkcii-createhashparamroute.md)
- [createHashRouter](libraries/vk-mini-apps-router-spravochnik-funkcii-createhashrouter.md)

### Библиотеки → vk-mini-apps-router → Справочник → Объекты → RouteNavigator

- [RouteNavigator.block](libraries/vk-mini-apps-router-spravochnik-obekty-routenavigator-routen.md)

---

<a id="api"></a>

## API ВКонтакте

REST API ВКонтакте: формат запросов, ключи доступа, права, обработка ошибок и справочник методов по секциям.

### API ВКонтакте

- [account.getAppPermissions](api/account-getapppermissions.md)
- [ads](api/ads.md)
- [apps](api/apps.md)
- [appWidgets](api/appwidgets.md)
- [board](api/board.md)
- [bugtracker](api/bugtracker.md)
- [crowdCustomer](api/crowdcustomer.md)
- [database](api/database.md)
- [docs](api/docs.md)
- [donut](api/donut.md)
- [friends](api/friends.md)
- [gifts](api/gifts.md)
- [groups](api/groups.md)
- [likes](api/likes.md)
- [loyaltyTeen](api/loyaltyteen.md)
- [market](api/market.md)
- [messages](api/messages.md)
- [notifications](api/notifications.md)
- [orders](api/orders.md)
- [pages](api/pages.md)
- [photos](api/photos.md)
- [podcasts](api/podcasts.md)
- [polls](api/polls.md)
- [prettyCards](api/prettycards.md)
- [search](api/search.md)
- [stats](api/stats.md)
- [status](api/status.md)
- [storage](api/storage.md)
- [store](api/store.md)
- [stories](api/stories.md)
- [translations](api/translations.md)
- [Описание методов API](api/opisanie-metodov-api.md)

### Использование API

- [Быстрый старт](api/bystryy-start.md)
- [Обзор](api/obzor.md)
- [Параметры запуска приложения](api/parametry-zapuska-prilozheniya.md)
- [Формат запросов](api/format-zaprosov.md)

### API ВКонтакте → Истории

- [API историй](api/istorii-api-istoriy.md)

### API ВКонтакте → Реклама

- [Рекламный API](api/reklama-reklamnyy-api.md)

### API ВКонтакте → Товары

- [API для товаров](api/tovary-api-dlya-tovarov.md)

### Использование API → Ключи доступа

- [Ключ доступа пользователя](api/klyuchi-dostupa-klyuch-dostupa-polzovatelya.md)
- [Ключ доступа сообщества](api/klyuchi-dostupa-klyuch-dostupa-soobschestva.md)
- [Общие сведения](api/klyuchi-dostupa-obschie-svedeniya.md)
- [Права доступа и приватность](api/klyuchi-dostupa-prava-dostupa-i-privatnost.md)
- [Сервисный ключ доступа](api/klyuchi-dostupa-servisnyy-klyuch-dostupa.md)

### Использование API → Обработка ошибок

- [Валидация действия](api/obrabotka-oshibok-validaciya-deystviya.md)
- [Ошибка с Captcha](api/obrabotka-oshibok-oshibka-s-captcha.md)
- [Подтверждение действия пользователем](api/obrabotka-oshibok-podtverzhdenie-deystviya-polzovatelem.md)

---

<a id="integration"></a>

## Интеграция

Подключение приложения к платформе: авторизация, подпись параметров запуска, вебхуки, сервер приложения.

### Интеграция → Виджеты

- [Видео](integration/vidzhety-video.md)
- [Виджет для сообществ](integration/vidzhety-vidzhet-dlya-soobschestv.md)
- [Все виджеты](integration/vidzhety-vse-vidzhety.md)
- [Запись на стене](integration/vidzhety-zapis-na-stene.md)
- [Комментарии](integration/vidzhety-kommentarii.md)
- [Напишите нам](integration/vidzhety-napishite-nam.md)
- [Нравится](integration/vidzhety-nravitsya.md)
- [Опрос](integration/vidzhety-opros.md)
- [Плейлист](integration/vidzhety-pleylist.md)
- [Подписаться на автора](integration/vidzhety-podpisatsya-na-avtora.md)
- [Приложение](integration/vidzhety-prilozhenie.md)
- [Публикация ссылок](integration/vidzhety-publikaciya-ssylok.md)
- [Разрешить сообщения от сообщества](integration/vidzhety-razreshit-soobscheniya-ot-soobschestva.md)
- [Рекомендации](integration/vidzhety-rekomendacii.md)
- [Сообщения сообщества](integration/vidzhety-soobscheniya-soobschestva.md)
- [Статья](integration/vidzhety-statya.md)
- [Эпизод подкаста](integration/vidzhety-epizod-podkasta.md)

### Интеграция → Платежи виртуальной валютой

- [Обзор](integration/platezhi-virtualnoy-valyutoy-obzor.md)
- [Обработка платёжных уведомлений в Одноклассниках](integration/platezhi-virtualnoy-valyutoy-obrabotka-platezhnyh-uvedomleni.md)
- [Обработка платёжных уведомлений ВКонтакте](integration/platezhi-virtualnoy-valyutoy-obrabotka-platezhnyh-uvedomleni-2.md)
- [Продажа виртуальных товаров в Одноклассниках](integration/platezhi-virtualnoy-valyutoy-prodazha-virtualnyh-tovarov-v-o.md)
- [Продажа виртуальных товаров ВКонтакте](integration/platezhi-virtualnoy-valyutoy-prodazha-virtualnyh-tovarov-vko.md)
- [Тестирование платежей](integration/platezhi-virtualnoy-valyutoy-testirovanie-platezhey.md)

### Интеграция → Платежи голосами ВКонтакте

- [Изменение статуса заказа](integration/platezhi-golosami-vkontakte-izmenenie-statusa-zakaza.md)
- [Изменение статуса подписки](integration/platezhi-golosami-vkontakte-izmenenie-statusa-podpiski.md)

### Интеграция → Платежи

- [VK Донат API](integration/platezhi-vk-donat-api.md)

### Интеграция → Публикации

- [Публикации](integration/publikacii-publikacii.md)

### Интеграция → Сообщества и пользователи

- [Bots Long Poll API](integration/soobschestva-i-polzovateli-bots-long-poll-api.md)
- [Callback API](integration/soobschestva-i-polzovateli-callback-api.md)
- [Open API](integration/soobschestva-i-polzovateli-open-api.md)
- [User Long Poll API](integration/soobschestva-i-polzovateli-user-long-poll-api.md)
- [Виджеты сообществ](integration/soobschestva-i-polzovateli-vidzhety-soobschestv.md)
- [События в сообществах](integration/soobschestva-i-polzovateli-sobytiya-v-soobschestvah.md)
- [События пользователей и сообществ](integration/soobschestva-i-polzovateli-sobytiya-polzovateley-i-soobsches.md)
- [Сообщение _Deprecated version_](integration/soobschestva-i-polzovateli-soobschenie-deprecated-version.md)
- [Сообщения сообществ](integration/soobschestva-i-polzovateli-soobscheniya-soobschestv.md)

### Интеграция → Чат-боты

- [Боты для сообществ](integration/chat-boty-boty-dlya-soobschestv.md)
- [Быстрый старт](integration/chat-boty-bystryy-start.md)

### Интеграция → Платежи виртуальной валютой → Платежи ВКонтакте

- [Продажа подписок](integration/platezhi-virtualnoy-valyutoy-platezhi-vkontakte-prodazha-pod.md)

### Интеграция → Платежи виртуальной валютой → Платежи в Одноклассниках

- [Продажа подписок](integration/platezhi-virtualnoy-valyutoy-platezhi-v-odnoklassnikah-proda.md)

### Интеграция → Платежи голосами ВКонтакте → Платёжные уведомления

- [Получение информации о товаре](integration/platezhi-golosami-vkontakte-platezhnye-uvedomleniya-poluchen.md)

### Интеграция → Платежи → Платёжный API

- [Получение информации о подписке](integration/platezhi-platezhnyy-api-poluchenie-informacii-o-podpiske.md)

### Интеграция → Публикации → Загрузка файлов

- [Обзор](integration/publikacii-zagruzka-faylov-obzor.md)

### Интеграция → Чат-боты → Разработка

- [Клавиатура](integration/chat-boty-razrabotka-klaviatura.md)
- [Сообщения](integration/chat-boty-razrabotka-soobscheniya.md)

---

<a id="vk-pay"></a>

## VK Pay

Платежи и подписки: VK Pay, внутренняя валюта, обработка заказов на стороне сервера.

### VK Pay

- [Как подключить](vk-pay/kak-podklyuchit.md)
- [О VK Pay](vk-pay/o-vk-pay.md)

### VK Pay → API платёжной системы

- [Запрос информации о транзакции](vk-pay/api-platezhnoy-sistemy-zapros-informacii-o-tranzakcii.md)
- [Как сделать запрос](vk-pay/api-platezhnoy-sistemy-kak-sdelat-zapros.md)
- [Общее описание](vk-pay/api-platezhnoy-sistemy-obschee-opisanie.md)
- [Отмена и возврат платежа](vk-pay/api-platezhnoy-sistemy-otmena-i-vozvrat-platezha.md)
- [Проверка статуса транзакции](vk-pay/api-platezhnoy-sistemy-proverka-statusa-tranzakcii.md)
- [Уведомления](vk-pay/api-platezhnoy-sistemy-uvedomleniya.md)
- [Формат ответа](vk-pay/api-platezhnoy-sistemy-format-otveta.md)

### VK Pay → Платёжное окно

- [Для плательщиков](vk-pay/platezhnoe-okno-dlya-platelschikov.md)
- [Для разработчиков](vk-pay/platezhnoe-okno-dlya-razrabotchikov.md)
- [Общее описание](vk-pay/platezhnoe-okno-obschee-opisanie.md)

### VK Pay → API платёжной системы → Как сделать запрос

- [Ошибки запроса](vk-pay/api-platezhnoy-sistemy-kak-sdelat-zapros-oshibki-zaprosa.md)
- [Подпись запроса](vk-pay/api-platezhnoy-sistemy-kak-sdelat-zapros-podpis-zaprosa.md)

### VK Pay → API платёжной системы → Формат ответа

- [Подпись ответа](vk-pay/api-platezhnoy-sistemy-format-otveta-podpis-otveta.md)

### VK Pay → Платёжное окно → Для разработчиков

- [Как сделать платёж](vk-pay/platezhnoe-okno-dlya-razrabotchikov-kak-sdelat-platezh.md)
- [Обработка ошибок](vk-pay/platezhnoe-okno-dlya-razrabotchikov-obrabotka-oshibok.md)
- [Отслеживание результата платежа](vk-pay/platezhnoe-okno-dlya-razrabotchikov-otslezhivanie-rezultata.md)
- [Подпись приложения](vk-pay/platezhnoe-okno-dlya-razrabotchikov-podpis-prilozheniya.md)
- [Подпись продавца](vk-pay/platezhnoe-okno-dlya-razrabotchikov-podpis-prodavca.md)
- [Тестирование платёжного окна](vk-pay/platezhnoe-okno-dlya-razrabotchikov-testirovanie-platezhnogo.md)

---

<a id="vk-games"></a>

## VK Games

Игры на платформе: запуск, экономика, реклама, лидерборды, продвижение и требования площадки.

### VK Games

- [Библиотека VK Bridge](vk-games/biblioteka-vk-bridge.md)
- [Запуск игры](vk-games/zapusk-igry.md)
- [Игровая платформа](vk-games/igrovaya-platforma.md)
- [Первые шаги](vk-games/pervye-shagi.md)
- [Преимущества для разработчиков и издателей](vk-games/preimuschestva-dlya-razrabotchikov-i-izdateley.md)
- [Советы по созданию и продвижению](vk-games/sovety-po-sozdaniyu-i-prodvizheniyu.md)
- [Техническая поддержка и ресурсы](vk-games/tehnicheskaya-podderzhka-i-resursy.md)
- [Частые вопросы](vk-games/chastye-voprosy.md)

### VK Games → Архив

- [Изменения в играх от 8 августа 2024 года](vk-games/arhiv-izmeneniya-v-igrah-ot-8-avgusta-2024-goda.md)
- [Права доступа](vk-games/arhiv-prava-dostupa.md)
- [Устаревшие параметры запуска](vk-games/arhiv-ustarevshie-parametry-zapuska.md)

### VK Games → Каталоги

- [Как попасть в каталоги ВКонтакте и Одноклассников](vk-games/katalogi-kak-popast-v-katalogi-vkontakte-i-odnoklassnikov.md)
- [Обзор](vk-games/katalogi-obzor.md)

### VK Games → Монетизация

- [Продажа игровых товаров](vk-games/monetizaciya-prodazha-igrovyh-tovarov.md)

### VK Games → Настройки

- [Где используются настройки в интерфейсе ВКонтакте](vk-games/nastroyki-gde-ispolzuyutsya-nastroyki-v-interfeyse-vkontakte.md)

### VK Games → Панель управления

- [Администраторы](vk-games/panel-upravleniya-administratory.md)
- [Доступ к приложению](vk-games/panel-upravleniya-dostup-k-prilozheniyu.md)
- [Модерация](vk-games/panel-upravleniya-moderaciya.md)
- [Монетизация](vk-games/panel-upravleniya-monetizaciya.md)
- [Обзор](vk-games/panel-upravleniya-obzor.md)
- [События приложения](vk-games/panel-upravleniya-sobytiya-prilozheniya.md)
- [Тестовые группы](vk-games/panel-upravleniya-testovye-gruppy.md)
- [Фичеринг](vk-games/panel-upravleniya-fichering.md)

### VK Games → Продвижение

- [Подборки в мобильной версии сайта ВКонтакте](vk-games/prodvizhenie-podborki-v-mobilnoy-versii-sayta-vkontakte.md)
- [Подборки игр в десктопной версии сайта ВКонтакте](vk-games/prodvizhenie-podborki-igr-v-desktopnoy-versii-sayta-vkontakt.md)
- [Подборки игр в каталоге ВКонтакте](vk-games/prodvizhenie-podborki-igr-v-kataloge-vkontakte.md)
- [Подборки игр в мобильном приложении ВКонтакте для iOS](vk-games/prodvizhenie-podborki-igr-v-mobilnom-prilozhenii-vkontakte-d.md)
- [Рекламные объявления](vk-games/prodvizhenie-reklamnye-obyavleniya.md)

### VK Games → Разработка

- [API-вызовы в игре](vk-games/razrabotka-api-vyzovy-v-igre.md)
- [Обработка событий сворачивания и восстановления экрана игры](vk-games/razrabotka-obrabotka-sobytiy-svorachivaniya-i-vosstanovleniy.md)
- [Отладка](vk-games/razrabotka-otladka.md)
- [Параметры запуска](vk-games/razrabotka-parametry-zapuska.md)
- [Подпись параметров запуска](vk-games/razrabotka-podpis-parametrov-zapuska.md)
- [Работа кеша приложений](vk-games/razrabotka-rabota-kesha-prilozheniy.md)
- [Управление группами тестировщиков](vk-games/razrabotka-upravlenie-gruppami-testirovschikov.md)
- [Экран запуска](vk-games/razrabotka-ekran-zapuska.md)

### VK Games → Монетизация → Вывод средств

- [Зарубежные авторы](vk-games/monetizaciya-vyvod-sredstv-zarubezhnye-avtory.md)
- [Обзор](vk-games/monetizaciya-vyvod-sredstv-obzor.md)
- [Самозанятые — Россия](vk-games/monetizaciya-vyvod-sredstv-samozanyatye-rossiya.md)
- [Юрлица и ИП — Россия](vk-games/monetizaciya-vyvod-sredstv-yurlica-i-ip-rossiya.md)

### VK Games → Монетизация → Реклама в играх

- [Баннерная реклама](vk-games/monetizaciya-reklama-v-igrah-bannernaya-reklama.md)
- [Добавление рекламы в код игры](vk-games/monetizaciya-reklama-v-igrah-dobavlenie-reklamy-v-kod-igry.md)
- [Обзор](vk-games/monetizaciya-reklama-v-igrah-obzor.md)
- [Правила показа рекламы](vk-games/monetizaciya-reklama-v-igrah-pravila-pokaza-reklamy.md)

### VK Games → Панель управления → Настройки

- [Дополнительные](vk-games/panel-upravleniya-nastroyki-dopolnitelnye.md)
- [Другие площадки](vk-games/panel-upravleniya-nastroyki-drugie-ploschadki.md)
- [Информация](vk-games/panel-upravleniya-nastroyki-informaciya.md)
- [Отображение](vk-games/panel-upravleniya-nastroyki-otobrazhenie.md)
- [Оформление](vk-games/panel-upravleniya-nastroyki-oformlenie.md)
- [Помощь](vk-games/panel-upravleniya-nastroyki-pomosch.md)
- [Правовые документы](vk-games/panel-upravleniya-nastroyki-pravovye-dokumenty.md)
- [Размещение](vk-games/panel-upravleniya-nastroyki-razmeschenie.md)

### VK Games → Панель управления → Платежи

- [Вывод](vk-games/panel-upravleniya-platezhi-vyvod.md)
- [Подключение](vk-games/panel-upravleniya-platezhi-podklyuchenie.md)
- [Транзакции](vk-games/panel-upravleniya-platezhi-tranzakcii.md)

### VK Games → Панель управления → Разработка

- [Ключи доступа](vk-games/panel-upravleniya-razrabotka-klyuchi-dostupa.md)
- [Хранимые процедуры](vk-games/panel-upravleniya-razrabotka-hranimye-procedury.md)

### VK Games → Панель управления → Соц. механики

- [Миссии](vk-games/panel-upravleniya-soc-mehaniki-missii.md)
- [Уведомления](vk-games/panel-upravleniya-soc-mehaniki-uvedomleniya.md)

### VK Games → Панель управления → Статистика

- [Аудитория](vk-games/panel-upravleniya-statistika-auditoriya.md)
- [Запросы к API](vk-games/panel-upravleniya-statistika-zaprosy-k-api.md)
- [Платежи](vk-games/panel-upravleniya-statistika-platezhi.md)
- [Рейтинг популярности](vk-games/panel-upravleniya-statistika-reyting-populyarnosti.md)
- [Рекламная монетизация](vk-games/panel-upravleniya-statistika-reklamnaya-monetizaciya.md)

### VK Games → Продвижение → Игровые и социальные механики

- [Добавление на главный экран устройства](vk-games/prodvizhenie-igrovye-i-socialnye-mehaniki-dobavlenie-na-glav.md)
- [Лента активности друзей](vk-games/prodvizhenie-igrovye-i-socialnye-mehaniki-lenta-aktivnosti-d.md)
- [Миссии](vk-games/prodvizhenie-igrovye-i-socialnye-mehaniki-missii.md)
- [Обзор](vk-games/prodvizhenie-igrovye-i-socialnye-mehaniki-obzor.md)
- [Официальное сообщество для игры и мини‑приложения](vk-games/prodvizhenie-igrovye-i-socialnye-mehaniki-oficialnoe-soobsch.md)
- [Сниппеты игр](vk-games/prodvizhenie-igrovye-i-socialnye-mehaniki-snippety-igr.md)
- [Таблица результатов](vk-games/prodvizhenie-igrovye-i-socialnye-mehaniki-tablica-rezultatov.md)
- [Уведомления](vk-games/prodvizhenie-igrovye-i-socialnye-mehaniki-uvedomleniya.md)

### VK Games → Продвижение → Подборки

- [Подборки в мобильном приложении ВКонтакте для Android](vk-games/prodvizhenie-podborki-podborki-v-mobilnom-prilozhenii-vkonta.md)

### VK Games → Разработка → Параметры запуска

- [vk_ref](vk-games/razrabotka-parametry-zapuska-vk-ref.md)

### VK Games → Разработка → ХХостинг статики

- [Добавление файлов на хостинг из автоматических сборок](vk-games/razrabotka-hhosting-statiki-dobavlenie-faylov-na-hosting-iz.md)

### VK Games → Разработка → Хостинг статики

- [Обзор](vk-games/razrabotka-hosting-statiki-obzor.md)
- [Файл vk-hosting-config.json](vk-games/razrabotka-hosting-statiki-fayl-vk-hosting-config-json.md)

### VK Games → Продвижение → Игровые и социальные механики → Уведомления

- [Всем пользователям](vk-games/prodvizhenie-igrovye-i-socialnye-mehaniki-uvedomleniya-vsem.md)
- [Неактивным пользователям](vk-games/prodvizhenie-igrovye-i-socialnye-mehaniki-uvedomleniya-neakt.md)
- [Разовые](vk-games/prodvizhenie-igrovye-i-socialnye-mehaniki-uvedomleniya-razov.md)

---

<a id="odnoklassniki"></a>

## Одноклассники

Запуск и адаптация мини-приложений в Одноклассниках.

### Одноклассники

- [Администрирование приложений](odnoklassniki/administrirovanie-prilozheniy.md)
- [Приложения в Одноклассниках](odnoklassniki/prilozheniya-v-odnoklassnikah.md)
- [Продвижение игр в Одноклассниках](odnoklassniki/prodvizhenie-igr-v-odnoklassnikah.md)
- [Публикация в Одноклассниках](odnoklassniki/publikaciya-v-odnoklassnikah.md)

### Одноклассники → Продвижение

- [Другие способы продвижения игр](odnoklassniki/prodvizhenie-drugie-sposoby-prodvizheniya-igr.md)
- [Как подать заявку](odnoklassniki/prodvizhenie-kak-podat-zayavku.md)
- [Фичеринг игр в Одноклассниках](odnoklassniki/prodvizhenie-fichering-igr-v-odnoklassnikah.md)

### Одноклассники → Разработка

- [Cобытия VK Bridge в Одноклассниках](odnoklassniki/razrabotka-cobytiya-vk-bridge-v-odnoklassnikah.md)
- [Параметры запуска](odnoklassniki/razrabotka-parametry-zapuska.md)
- [Работа с API Одноклассников](odnoklassniki/razrabotka-rabota-s-api-odnoklassnikov.md)

---

<a id="captcha"></a>

## VK Captcha

Защита от ботов: VK Captcha и VK ID Captcha.

### VK Captcha

- [О VK ID Captcha](captcha/o-vk-id-captcha.md)

### VK ID Captcha

- [Server-to-server](captcha/server-to-server.md)

### VK Captcha → Android

- [Общее описание](captcha/android-obschee-opisanie.md)
- [Подключение VK Captcha Android](captcha/android-podklyuchenie-vk-captcha-android.md)
- [Ручная обработка капчи](captcha/android-ruchnaya-obrabotka-kapchi.md)
- [Справочник SDK](captcha/android-spravochnik-sdk.md)
- [Сценарий взаимодействия](captcha/android-scenariy-vzaimodeystviya.md)

### VK Captcha → iOS

- [Общее описание](captcha/ios-obschee-opisanie.md)
- [Подключение](captcha/ios-podklyuchenie.md)
- [Сценарий взаимодействия](captcha/ios-scenariy-vzaimodeystviya.md)

### VK Captcha → web

- [Сценарий взаимодействия](captcha/web-scenariy-vzaimodeystviya.md)

### VK ID Captcha → Web

- [Общее описание](captcha/web-obschee-opisanie.md)
- [Подключение](captcha/web-podklyuchenie.md)

---

<a id="vk-id"></a>

## VK ID

Авторизация от VK (VK ID).

- [Авторизация от VK](vk-id/avtorizaciya-ot-vk.md)

---

<a id="vk-testers"></a>

## VK Testers

Тестирование приложений через VK Testers.

### VK Testers

- [Как протестировать продукт](vk-testers/kak-protestirovat-produkt.md)

### VK Testers → Открытый API

- [Загрузка и публикация тестовых сборок](vk-testers/otkrytyy-api-zagruzka-i-publikaciya-testovyh-sborok.md)
- [Ключи доступа](vk-testers/otkrytyy-api-klyuchi-dostupa.md)
- [Обзор](vk-testers/otkrytyy-api-obzor.md)
- [Публикация обновлений продуктов](vk-testers/otkrytyy-api-publikaciya-obnovleniy-produktov.md)

### VK Testers → Устройство платформы

- [Компания](vk-testers/ustroystvo-platformy-kompaniya.md)
- [Обзор](vk-testers/ustroystvo-platformy-obzor.md)
- [Продукт](vk-testers/ustroystvo-platformy-produkt.md)
- [Сотрудники](vk-testers/ustroystvo-platformy-sotrudniki.md)
- [Участники VK Testers](vk-testers/ustroystvo-platformy-uchastniki-vk-testers.md)

---

<a id="masks"></a>

## Маски

Разработка и публикация масок.

### Маски

- [Первые шаги](masks/pervye-shagi.md)
- [Платформа](masks/platforma.md)
- [Примеры](masks/primery.md)

### Маски → Подготовка

- [Инструменты](masks/podgotovka-instrumenty.md)
- [Просмотр маски](masks/podgotovka-prosmotr-maski.md)
- [Экспорт 3D-модели](masks/podgotovka-eksport-3d-modeli.md)

### Маски → Продвинутые возможности

- [Встроенные ресурсы](masks/prodvinutye-vozmozhnosti-vstroennye-resursy.md)
- [Дерево сцены](masks/prodvinutye-vozmozhnosti-derevo-sceny.md)
- [Обзор возможностей](masks/prodvinutye-vozmozhnosti-obzor-vozmozhnostey.md)

### Маски → Создание

- [Конфигурационный файл](masks/sozdanie-konfiguracionnyy-fayl.md)

---

<a id="stories"></a>

## Истории

Истории и стикеры.

- [Стикеры в историях](stories/stikery-v-istoriyah.md)

---

<a id="vk-maps"></a>

## VK Карты

VK Карты.

- [Использование API VK Карт](vk-maps/obschaya-informaciya-ispolzovanie-api-vk-kart.md)
- [О VK Картах](vk-maps/obschaya-informaciya-o-vk-kartah.md)

---

<a id="rules"></a>

## Правила и модерация

Правила платформы, модерация, оферты и юридические требования.

- [Одобренные способы оплаты](rules/odobrennye-sposoby-oplaty.md)
- [Оферта на оказание услуг по привлечению пользователей к Сайту](rules/oferta-na-okazanie-uslug-po-privlecheniyu-polzovateley-k-say.md)
- [Оферта на оказание услуг по размещению рекламы](rules/oferta-na-okazanie-uslug-po-razmescheniyu-reklamy.md)
- [Правила для ботов](rules/pravila-dlya-botov.md)
- [Правила платформы](rules/pravila-platformy.md)
- [Правила размещения приложений-магазинов](rules/pravila-razmescheniya-prilozheniy-magazinov.md)
- [Правила размещения сервисов на платформе VK Mini Apps](rules/pravila-razmescheniya-servisov-na-platforme-vk-mini-apps.md)
- [Типовая политика конфиденциальности](rules/tipovaya-politika-konfidencialnosti.md)
- [Типовое пользовательское соглашение](rules/tipovoe-polzovatelskoe-soglashenie.md)

---

<a id="misc"></a>

## Прочее

Материалы, не попавшие в другие разделы.

- [VK для разработчиков](misc/vk-dlya-razrabotchikov.md)
- [Документация](misc/dokumentaciya.md)
- [Поддержка](misc/podderzhka.md)
