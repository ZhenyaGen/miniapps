# Типы роутеров

**Раздел:** Библиотеки → vk-mini-apps-router → Типы роутеров  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

С помощью библиотеки [vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router) вы можете создать роутеры нескольких типов, каждый из которых предназначен для разных типов веб-приложений, созданных с помощью библиотеки VKUI:

- Hash-роутер
- HashParam-роутер
- Browser-роутер

Эти роутеры предоставляют одинаковую функциональность и используют в своей работе одинаковые функции и объекты. Разница между ними — в формате URL-адресов, которые соответствуют тому или иному маршруту.

Для создания роутеров используются разные функции библиотеки vk-mini-apps-router.

## Hash-роутер

Hash-роутер предназначен для мини-приложений и игр, которые запускаются из десктопной или мобильной версии сайта ВКонтакте или из мобильного приложения ВКонтакте для Android или iOS.

Если приложение использует этот роутер, внешние ссылки на экраны приложения должны содержать символ `#`, например:

```
https://vk.com/app12345/#/contacts-screen
```

Чтобы создать роутер этого типа, используйте функцию [`createHashRouter()`](https://dev.vk.ru/ru/libraries/router/reference/functions/createHashRouter) [.](https://dev.vk.ru/ru/libraries/router/reference/functions/createHashRouter)

## HashParam-роутер

Этот роутер подобен Hash-роутеру и является его развитием. Он также предназначен для мини- приложений и игр, которые запускаются на платформе ВКонтакте. Однако внешние ссылки на экраны приложения должны содержать символ `#` и ключевое слово `path`, например:

```
https://vk.com/app12345/#path=%2Fcontacts-screen
```

Эта функциональность позволяет мини-приложениям и играм передавать дополнительные параметры в адресной строке, например:

```
https://vk.com/app12345/#path=%2Fcontacts-screen&param1=value1
либо
https://vk.com/app12345/#param1=value1&path=%2Fcontacts-screen
```

Обратите внимание, что для специальных символов используется URL-кодировка. `%2F` соответствует символу `/`.

Чтобы создать роутер этого типа, используйте функцию [`createHashParamRouter()`](https://dev.vk.ru/ru/libraries/router/reference/functions/createHashParamRouter) [.](https://dev.vk.ru/ru/libraries/router/reference/functions/createHashParamRouter)

## Browser-роутер

Этот роутер предназначен для веб-приложений, которые используют библиотеку [VKUI](https://dev.vk.ru/ru/libraries/vkui), но запускаются вне ВКонтакте.

Если ваше приложение использует этот роутер, внешние ссылки на экраны приложения не должны содержать символ `#` или слово `path`, например:

```
https://my-app.com/contacts-screen
```

Внутренние ссылки тоже не используют `#` и `path`.

Чтобы создать роутер этого типа, вызовите функцию [`createBrowserRouter()`](https://dev.vk.ru/ru/libraries/router/reference/functions/createBrowserRouter) [.](https://dev.vk.ru/ru/libraries/router/reference/functions/createBrowserRouter)

## Формат ссылок

Повторим: при использовании разных видов роутеров различаются внешние ссылки на экраны приложения, а также URL, которые указываются в компонентах, предоставленных библиотеками, отличными от vk-mini-apps-router. Подробное описание и примеры — в разделе [Формат внутренних и](https://dev.vk.ru/ru/libraries/router/hash-in-links) [внешних ссылок](https://dev.vk.ru/ru/libraries/router/hash-in-links).

Когда вы встречаете в документации пример ссылки, помните, что вам может потребоваться изменить её в зависимости от вида роутера, который использует ваше приложение.

Раздел [Формат внутренних и внешних ссылок](https://dev.vk.ru/ru/libraries/router/hash-in-links) также описывает [унифицированный подход](https://dev.vk.ru/ru/libraries/router/hash-in-links#%D0%A3%D0%BD%D0%B8%D1%84%D0%B8%D1%86%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B9%20%D0%BF%D0%BE%D0%B4%D1%85%D0%BE%D0%B4) к созданию ссылок, при котором маршруты не зависят от типа используемого роутера.

## Материалы по теме

- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [Формат внутренних и внешних ссылок](https://dev.vk.ru/ru/libraries/router/hash-in-links)
- [Использование параметров](https://dev.vk.ru/ru/libraries/router/parameters)
- [Библиотека vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router)
