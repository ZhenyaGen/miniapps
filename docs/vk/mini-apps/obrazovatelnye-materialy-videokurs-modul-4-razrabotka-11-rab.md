# 11. Работа с API ВКонтакте в клиентской части приложения

**Раздел:** Мини-приложения → Образовательные материалы → Видеокурс → Модуль 4. Разработка → 11. Работа с API ВКонтакте в клиентской части приложения  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

#### Модуль: [4. Разработка](https://dev.vk.ru/ru/mini-apps/learning/course/4-development)

## Урок 11. Работа с API ВКонтакте в клиентской части приложения

## Главное в уроке

- API ВКонтакте поддерживает GET- и POST-запросы. URL запросов имеет следующий вид:

`https://{адрес-сервера}/method.{имя-метода}?{параметры}`

- `{адрес-сервера}` — `api.vk.ru`. Этот адрес можно получить динамически, вызвав событие [`VKWebAppGetConfig`](https://dev.vk.ru/bridge/VKWebAppGetConfig) [.](https://dev.vk.ru/bridge/VKWebAppGetConfig)
- `{имя-метода}` — название API-запроса для вызова, например `friends.get`. Названия можно найти в разделе [API](https://dev.vk.ru/reference) портала для разработчиков.
- `{параметры}` — URL-параметры. Обязательными являются два параметра:

- `v` — указывает версию API, например `v=5.199`.
- Ключ доступа для вызова API передавайте в HTTP-заголовке:

- `Authorization: Bearer <КЛЮЧ_ДОСТУПА>`
- Чтобы получить ключ доступа, вызовите событие [`VKWebAppGetAuthToken`](https://dev.vk.ru/bridge/VKWebAppGetAuthToken) библиотеки VK Bridge. В вызове укажите права доступа, которые получит ключ.

```ts
export const getAccessToken = async () => {
  try {
    const data = await bridge.send('VKWebAppGetAuthToken',
                        {
                          app_id: Number(import.meta.env.VITE_APP_ID),
                          scope: 'friends',
                        });
    return data.access_token;
  } catch (error) {
    console.log('Ошибка получения ключа доступа:', error);
```

[← Предыдущий урок](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/10-odr) [Следующий урок →](https://dev.vk.ru/ru/mini-apps/learning/course/4-development/12-mobile-devices)

```
};
```

- Чтобы отправить API-запрос, вы можете вызвать событие [`VKWebAppCallAPIMethod`](https://dev.vk.ru/bridge/VKWebAppCallAPIMethod) библиотеки VK Bridge.

```ts
export const vkApiFetch = async (method: string,params?: { [key: string]:
unknown }) => {
```

```
  const accessToken = await getAccessToken();
  try {
    return await bridge.send("VKWebAppCallAPIMethod", {
        method: method,
        params: {
            v: "5.199",
            access_token: accessToken ?? "",
            ...params,
        },
    });
  } catch (e) {
      return Promise.reject(e);
  }
};
```

## Полезные ссылки

- [Клиентская часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-frontend), cмотрите фрагменты кода по #M4L11.
- [Серверная часть (исходный код)](https://github.com/VKCOM/vk-mini-apps-course-backend)
- [Мини-приложение «Блюдо дня»](https://vk.ru/app51773283)
- [Документация API ВКонтакте](https://dev.vk.ru/reference)
- [Формат запросов](https://dev.vk.ru/api/api-requests)
- [API-вызовы в мини-приложениях](https://dev.vk.ru/mini-apps/development/api-calls)
- [Событие VKWebAppGetAuthToken](https://dev.vk.ru/bridge/VKWebAppGetAuthToken)
- [Событие VKWebAppCallAPIMethod](https://dev.vk.ru/bridge/VKWebAppCallAPIMethod)
