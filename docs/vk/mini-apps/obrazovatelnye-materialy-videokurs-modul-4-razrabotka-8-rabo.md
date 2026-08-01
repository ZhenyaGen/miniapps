# 8. Работа с внешним API

**Раздел:** Мини-приложения → Образовательные материалы → Видеокурс → Модуль 4. Разработка → 8. Работа с внешним API  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

#### Модуль: [4. Разработка](https://dev.vk.ru/ru/mini-apps/learning/course/4-development)

## Урок 8. Работа с внешним API

## Главное в уроке

- Для взаимодействия с сервером мини-приложения в клиентской части удобно использовать какую-либо библиотеку. В нашем примере это [Axios](https://axios-http.com).

Для установки выполните одну из следующих команд в зависимости от того, какой менеджер пакетов вы используете:

#### yarn

```
yarn add axios
```

#### npm

```
npm install axios --save
```

- При создании объекта `axios` вы можете указать адрес сервера, к которому будут отправляться запросы, а также заголовки, общие для отправляемых запросов. Для указания базового URL для запросов удобно использовать переменные окружения.
- Для отправки HTTP-запросов мы создали специальную функцию `makeRequest`. Её код вы можете найти в репозитории, который содержит исходники для урока.
- Сетевое взаимодействие всегда строится асинхронно. Поэтому при работе с запросами вам придётся использовать ключевые слова [`async`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/async_function), [`await`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/await) и объекты [`Promise`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise) [.](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- Для хранения данных мы используем простой подход — объект `State`, который хранит состояние компонента. Для работы с ним используется [`useState`](https://react.dev/reference/react/useState) [.](https://react.dev/reference/react/useState)

- В нашем примере мы пользуемся индикатором загрузки данных.
- Для перехвата и обработки ошибок, которые могут возникнуть при выполнении запросов, мы используем конструкцию `try...catch...finally`. Хорошая практика при возникновении ошибки — сохранять информацию о ней и отображать её пользователю с советом о том, что делать далее, например обновить страницу или перезапустить приложение.

## Полезные ссылки [← Предыдущий урок](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/7-vkui-adaptivity) [Следующий урок →](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/9-request-auth)

- [Клиентская часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-frontend), cмотрите фрагменты кода по #M4L8.
- [Серверная часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-backend)
- [Мини-приложение «Блюдо дня»](https://vk.com/app51773283)
- [Сайт Axios](https://axios-http.com)
