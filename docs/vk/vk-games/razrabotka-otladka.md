# Отладка

**Раздел:** VK Games → Разработка → Отладка  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Отладка в браузере

У событий VK Bridgе, которые поддерживаются в десктопной версии, в [справочнике](https://dev.vk.ru/ru/bridge/overview) указана платформа Web. Самый простой способ протестировать получение таких событий — включить десктопную версию игр и перехватывать их прямо в браузере.

Откройте игру в браузере, перейдите в инструменты разработчика и на вкладке Консоль (Сonsole) введите код:

```js
window.addEventListener('message', (event) => {
    if (event.data?.type === 'vk-connect') {
        console.log(event);
    }
});
```

Код перехватит сообщения от игры и покажет их содержимое.

## Отладка на мобильных устройствах

### Консоль Eruda

[Eruda](https://www.npmjs.com/package/eruda) — это консоль с инструментами разработчика, позволяющая отладить игры для Android и iOS, которая работает подобно консоли браузера.

Внешний вид консоли Eruda

Консоль Eruda

#### Как включить консоль

Чтобы разработчики могли использовать консоль Eruda для отладки, администраторы игры должны активировать консоль в панели управления. Сделать это может создатель игры, администратор с полным доступом или администратор с частичным доступом с правом «Редактирование».

Подробнее о правах — в разделе [Администраторы](https://dev.vk.ru/ru/games/settings/managers).

1. Откройте [список приложений](https://dev.vk.com/admin/apps-list) и перейдите в настройки вашей игры.

2. Перейдите в разделе [Настройки → Дополнительные](https://dev.vk.ru/ru/games/settings/general/additional) и в блоке Консоль Eruda выберите Включена.

Включение консоли Eruda

Включение консоли Eruda

#### Как использовать консоль

1. Запустите игру.

2. Нажмите •••.

3. В меню выберите Показать консоль. Если консоль уже открыта, в меню отобразится пункт Скрыть консоль.

Включение консоли Eruda

Консоль Eruda

4. Чтобы открыть отладочную консоль прямо внутри игры, нажмите на появившийся значок в правом нижнем углу.

Пример работы консоли можно посмотреть в мини-приложении [Eruda](https://vk.com/app6876702).

### Chrome DevTools

Отладка осуществляется в десктопной версии браузера. Чтобы отладить игру для Android, используйте на Android-устройствах [Сhrome Remote debugging](https://developer.chrome.com/docs/devtools/remote-debugging).

Чтобы игра отображалась в Chrome Developer Tools:

1. Подключите устройство к компьютеру по USB.

2. Выполните [шаг 1](https://vk.cc/cgf8in) и [шаг 2](https://vk.cc/cgf8kx) инструкции по удалённой отладке Android-устройств.

3. Откройте приложение ВКонтакте на Android, перейдите в Настройки → Debug и включите Отладка WebView.

Чтобы пункт Debug отображался в настройках, перейдите в Настройки → О приложении и нажмите на иконку VK 11 раз.

Теперь при отладке по USB открытая на Android-устройстве игра будет отображаться в Сhrome DevTools: `chrome://inspect/#devices`.

## Отладка при помощи vk-bridge-mock

Если под рукой нет Android-устройства, используйте библиотеку [`vk-bridge-mock`](https://www.npmjs.com/package/@vkontakte/vk-bridge-mock), которая позволит эмулировать получение данных при работе на компьютере. При вызове событий библиотеки вам вернутся тестовые данные, которые можно использовать для отладки.

### Использование библиотеки

1. Установите библиотеку:

```bash
npm install @vkontakte/vk-bridge-mock || yarn add @vkontakte/vk-bridge-mock
```

2. В файле `index.js` подключите библиотеку:

```js
import bridge from '@vkontakte/vk-bridge-mock';
```

3. Используйте методы объекта `bridge`:

```js
bridge.subscribe((e) => {
```

```
  if (e.detail.type === 'VKWebAppGetUserInfoResult') {
  // do something
  }
});
```

```
bridge.send('VKWebAppGetUserInfo', {});
```

### Пример возвращаемых тестовых данных

```json
{
  "type": "VKWebAppGetUserInfoResult",
  "data": {
    "id": 743784474,
    "bdate": "21.12.2000",
    "bdate_visibility": 1,
    "city": {
      "id": 2,
      "title": "Санкт-Петербург"
    },
    "country": {
      "id": 1,
      "title": "Россия"
    },
    "photo_200": "https://sun1-91.userapi.com/s/v1/ig2/Dcf-
SWu7nVYDDldq9oQegiC06VqsSa43-HpDxzPjrvFCUUk9nSevY2Uf9xzm0bxvLfgsTOH6XiiW-
zeLcDhPDj_w.jpg?size=200x200&quality=96&crop=26,26,204,204&ava=1",
    "photo_max_orig": "https://sun1-
91.userapi.com/s/v1/ig2/trHNebJQhG4BmLxC8h4hOpDU6bKRy6uJi586wcyFcCj5fzrwYk7Ato
Nab-RSil0Bp9b569VQyGK_skG9e6oK7Ap7.jpg?
size=256x256&quality=96&crop=0,0,256,256&ava=1",
    "sex": 2,
    "photo_100": "https://sun1-
91.userapi.com/s/v1/ig2/M4vtl7tcmeP6ANUgE0vU7JZWuJszbHaN5QcCcK2xD66EIc6SeSA1Ny
FVLTSOt2iLOkFhJSJ4DawEJGOjzKtszMpR.jpg?
size=100x100&quality=96&crop=26,26,204,204&ava=1",
    "first_name": "Персик",
    "last_name": "Рыжий",
    "can_access_closed": true,
    "is_closed": false
  }
}
```

### Изменение тестовых данных

Если вам нужно изменить тестовые данные, чтобы посмотреть, как будет вести себя игра, если пользователь, например, не указал город, данные можно переопределить:

```js
import { response as res } from  '@vkontakte/vk-bridge-mock';
res.VKWebAppGetUserInfo.data = {
  type: 'VKWebAppGetUserInfoResult',
  data: {
    city: {
      id: 1,
      title: 'London'
    },
    country: {
      id: 1,
      title: 'UK'
    },
    photo_200:
'https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg',
    photo_max_orig:
'https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg',
    sex: 0,
    photo_100:
'https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg',
    first_name: 'Friedrich',
    last_name: 'Engels'
  }
}
```

### Поддерживаемые события

Библиотека `vk-bridge-mock` поддерживает работу с событиями:

- [`VKWebAppInit`](https://dev.vk.ru/ru/bridge/VKWebAppInit)
- [`VKWebAppGetAuthToken`](https://dev.vk.ru/ru/bridge/VKWebAppGetAuthToken)
- [`VKWebAppCallAPIMethod`](https://dev.vk.ru/ru/bridge/VKWebAppCallAPIMethod)
- [`VKWebAppGetGeodata`](https://dev.vk.ru/ru/bridge/VKWebAppGetGeodata)
- [`VKWebAppGetUserInfo`](https://dev.vk.ru/ru/bridge/VKWebAppGetUserInfo)
- [`VKWebAppGetPhoneNumber`](https://dev.vk.ru/ru/bridge/VKWebAppGetPhoneNumber)
- [`VKWebAppGetClientVersion`](https://dev.vk.ru/ru/bridge/VKWebAppGetClientVersion)
- [`VKWebAppGetEmail`](https://dev.vk.ru/ru/bridge/VKWebAppGetEmail)

## Тестирование игры

Чтобы проверить новые функции или показать изменения в игре определённым пользователям ВКонтакте, настройте тестовые группы в панели управления. В каждой тестовой группе можно указать ссылку на версию игры, которая будет доступна только участникам этой группы.

Подробнее — в разделе [Тестовые группы](https://dev.vk.ru/ru/games/settings/test-groups).
