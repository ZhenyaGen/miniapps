# Экран запуска

**Раздел:** VK Games → Разработка → Экран запуска  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Экран запуска приложения

Пока игра не проинициализировала соединение с платформой с помощью события

[`VKWebAppInit`](https://dev.vk.ru/ru/bridge/VKWebAppInit), пользователь будет видеть экран запуска. По умолчанию это [квадратная иконка](https://dev.vk.ru/ru/games/settings/general/design#%D0%98%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0%20%D0%B4%D0%BB%D1%8F%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%20%D0%B8%20%D1%81%D0%BD%D0%B8%D0%BF%D0%BF%D0%B5%D1%82%D0%BE%D0%B2) [для каталога](https://dev.vk.ru/ru/games/settings/general/design#%D0%98%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0%20%D0%B4%D0%BB%D1%8F%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0%20%D0%B8%20%D1%81%D0%BD%D0%B8%D0%BF%D0%BF%D0%B5%D1%82%D0%BE%D0%B2) на белом фоне. Вместо статичной картинки вы можете добавить анимацию.

## Создание анимации

Подготовьте векторное изображение в формате [Lottie](https://lottiefiles.com/what-is-lottie). Если у вас есть готовые SVG-файлы, воспользуйтесь [онлайн-конвертером SVG в Lottie](https://lottiefiles.com/svg-to-lottie).

### Требования к изображению

- Максимальный размер файла: 24 Кбайта.
- Размер изображения: 96×96 px.

## Проверка работоспособности анимации

Работа Lottie-анимаций отличается на разных платформах. Мы рекомендуем сверяться с [таблицей](https://airbnb.io/lottie/#/supported-features) [поддерживаемых функций](https://airbnb.io/lottie/#/supported-features) и тестировать экраны загрузки на разных платформах.

### Приложение для Android

Android не поддерживает 3D-анимацию на Lottie-экранах.

Для Android используется библиотека `lottie-android` от [Airbnb](https://github.com/airbnb/lottie-android). Анимации можно проверять с помощью предварительного просмотра на сайте [LottieFiles](https://lottiefiles.com/preview).

### Приложение для iOS

Для iOS используется библиотека `rlottie` от [Samsung](https://github.com/Samsung/rlottie). Анимации можно проверять с помощью предварительного просмотра на сайте [rlottie](https://rlottie.com). На всех платформах RLottie воспроизводится одинаково.

#### Если анимация не воспроизводится

Если на сайте [rlottie](https://rlottie.com) анимация не работает, добавьте `"ddd": 0` в каждый объект в массиве

`layers`.

### Мобильная и десктопная версии сайта

В десктопной версии сайта ВКонтакте используется библиотека `lottie-web` от [Airbnb](https://github.com/airbnb/lottie-web). [Таблица](https://airbnb.io/lottie/#/supported-features) [поддерживаемых функций](https://airbnb.io/lottie/#/supported-features).

## Настройка экрана

1. Откройте [список приложений](https://dev.vk.com/ru/admin/apps-list) и нажмите Настройки. В разделе [Оформление](https://dev.vk.ru/ru/games/settings/general/design) перейдите на вкладку Экран запуска.

2. Укажите HEX-код фонового цвета. Пример: #54C45D.

3. Загрузите изображение — файл в формате Lottie.

4. Поставьте флажок Анимация, если изображение анимированное.

5. Нажмите Сохранить изменения.
