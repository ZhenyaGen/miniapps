# 15. Онбординг

**Раздел:** Мини-приложения → Образовательные материалы → Видеокурс → Модуль 4. Разработка → 15. Онбординг  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

#### Модуль: [4. Разработка](https://dev.vk.ru/ru/mini-apps/learning/course/4-development)

## Урок 15. Онбординг

## Главное в уроке

- Онбординг, или вводный инструктаж, представляет собой ряд информационных экранов (слайдов) с поясняющими текстами и изображениями. Они помогают пользователям быстро ознакомиться с приложением.
- Чтобы показать такие ознакомительные экраны, вызовите событие

[`VKWebAppShowSlidesSheet`](https://dev.vk.ru/bridge/VKWebAppShowSlidesSheet) библиотеки VK Bridge.
- Изображение для слайда кодируется как [base64-строка](https://vk.cc/5mpsES). Пример получения такой строки — в исходном коде нашего приложения «Блюдо дня». Платформа накладывает [ограничения](https://dev.vk.ru/bridge/VKWebAppShowSlidesSheet#%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%20%D1%81%D0%BB%D0%B0%D0%B9%D0%B4%D0%B0) на размер изображений.
- По результатам вызова события `VKWebAppShowSlidesSheet` вы можете понять, какие экраны пользователь посмотрел, а какие пропустил.
- Мы рекомендуем не перегружать пользователей и не показывать более 3-4 ознакомительных экранов подряд. Если нужно больше, разделите их на несколько групп и показывайте в разных разделах приложения.

## Полезные ссылки

- [Клиентская часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-frontend), cмотрите фрагменты кода по #M4L15.
- [Серверная часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-backend)
- [Мини-приложение «Блюдо дня»](https://vk.ru/app51773283)

- [Информационные экраны](https://dev.vk.ru/mini-apps/development/information-screens)
- [Событие VKWebAppShowSlidesSheet](https://dev.vk.ru/bridge/VKWebAppShowSlidesSheet)

[← Предыдущий урок](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/14-maps) [Следующий урок →](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/16-storage)
