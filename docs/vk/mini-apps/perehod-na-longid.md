# Переход на LongID

**Раздел:** О приложениях → Переход на LongID  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

С каждым днём аудитория ВКонтакте растёт. Вместе с ней увеличивается количество сообществ, [игр](https://dev.vk.ru/ru/games/getting-started), [чат-ботов](https://dev.vk.ru/ru/api/bots/getting-started), [мини-приложений](https://dev.vk.ru/ru/mini-apps/getting-started) и других сервисов. Поэтому мы оптимизируем систему хранения значений идентификаторов: это обеспечит стабильную работу сервисов для растущего числа пользователей.

Мы готовимся к переходу на LongID — станем хранить идентификаторы пользователей и других необходимых значений в диапазоне `Int64` вместо `Int32`. Поэтому уже сейчас рекомендуем при разработке приложений использовать `Int64` для хранения значений.

Со стороны ВКонтакте это потребовало изменения структур хранения данных, скриптов, приложений и алгоритмов. В этой статье мы подробно расскажем об изменениях и действиях, которые вам нужно выполнить, чтобы перевести проекты на новую инфраструктуру.

## Что это значит

Сейчас для хранения идентификаторов, таких как `user_id`, `owner_id` или `group_id`, мы используем значения в формате `Int32`. У инфраструктуры `Int32` есть техническое ограничение на максимальное количество идентификаторов, которые можно присваивать, например, пользователям или сообществам, поэтому переход на `Int64` необходим.

Рекомендуем разработчикам сервисов, использующих интеграцию со ВКонтакте (игры, мини- приложения, Standalone-приложения), подготовиться и заранее настроить поддержку работы с новыми идентификаторами.

### Отличия типов данных

Напомним, чем отличаются типы данных.

| Тип | Описание |
|---|---|
| `Int32` | 32-битное целое число со знаком. Тип имеет минимальное значение –2 147 483 648 и максимальное значение 2 147 483 647 (включительно). |
| `Uint32` | 32-битное целое число без знака. Тип имеет минимальное значение 0 и максимальное значение 4 294 967 295 (включительно). |
| `Int64` или  `Long` | Хранит целое число от –9 223 372 036 854 775 808 до 9 223 372 036 854 775 807 и занимает 8 байт. |
| `Uint64` | 64-битное целое число без знака. Тип имеет минимальное значение 0 и максимальное значение (2⁶⁴) – 1 (включительно). |
| Для совместимости с типом `Number` в JavaScript новый тип данных для идентификаторов | будет находиться в диапазоне от –2⁵³ + 1 до 2⁵³ – 1. |

### Сущности, которых коснутся изменения

Ниже в таблице мы перечислили сущности, которые затрагивает переход на LongID. Названия полей, которые затронут изменения, привели в качестве примеров, они могут отличаться для разных объектов.

| Сущность | Примеры полей | Примеры использования |
|---|---|---|
| Профиль пользователя `user_id` `uid` | [`users.getSubscriptions`](https://dev.vk.ru/ru/method/users.getSubscriptions) | [`VKWebAppShowRequestBox`](https://dev.vk.ru/ru/bridge/VKWebAppShowRequestBox) |
| Профиль сообщества | `group_id` | [`VKWebAppGetGroupInfo`](https://dev.vk.ru/ru/bridge/VKWebAppGetGroupInfo) |
| Идентификатор диалога пользователя | `peer_id` | [`messages.getConversationsById`](https://dev.vk.ru/ru/method/messages.getConversationsById) |
| Владелец контента `owner_id` `author_id` | [`wall.post`](https://dev.vk.ru/ru/method/wall.post) | [Объект приложения](https://dev.vk.ru/ru/reference/objects/app#author_id) |
| Списки идентификаторов `owner_ids` `author_ids` `user_ids` | [`users.get`](https://dev.vk.ru/ru/method/users.get) |

Кроме указанных выше сущностей, идентификаторы с новым типом могут встречаться:

- Во внутренней структуре объектов. Например, в ответе метода [`users.get`](https://dev.vk.ru/ru/method/users.get) поле `id` может быть в диапазоне `Int64`.

```json
{
 "response":[
    {
       "id":743784474,
       "first_name":"Персик",
       "last_name":"Рыжий",
       "can_access_closed":true,
       "is_closed":false
    }
 ]
}
```

- В составных идентификаторах. Например, идентификаторы вложений формируются как `<type>` `<owner_id>_<item_id>`, где:

- `<type>` — тип вложения.
- `<owner_id>` — идентификатор пользователя.
- `<item_id>` — идентификатор сущности, принадлежащей автору.

После перехода `<owner_id>` может содержать значение в диапазоне `Int64`. Это нужно иметь в виду при закладывании длины строки идентификаторов. Формально изменения будут и в идентификаторах контента, например вложений.

### Диапазоны значений идентификаторов

#### Идентификатор диалога пользователя

Сейчас в качестве идентификатора диалога пользователя `peer_id` используются следующие диапазоны значений.

1. От 1 до 1 900 000 000 (1,9e9) — переписка с пользователем.

2. От – 1e9 до – 1 — переписка с сообществом.

3. От 2e9 + 1 до 2e9 + 1e8 — переписка в групповой беседе. Формируется как 2e9 +  `chat_id`, где `chat_id` — локальный идентификатор чата именно для этого пользователя.

После перехода на Long ID добавятся новые диапазоны значений для идентификаторов пользователей, и корректными станут значения из диапазонов от 1 до 1,9е9 – 1 и от 200e9 до 100е10 – 1. Чтобы проверить, принадлежит ли `peer_id` к идентификаторам пользователей, нужно выполнить следующую проверку:

```js
(peer_id >= 1 && peer_id < 1.9e9) || (peer_id >= 200e9 && peer_id < 100e10)
```

При проверке принадлежности `peer_id` к диапазону чатов нужно будет проверять как нижнюю, так и верхнюю границу:

```js
peer_id > 2e9 && peer_id < 2e9+1e8
```

## Что нужно сделать

Мы описали, какие изменения произойдут и как они затронут ваши сервисы. Изучите разделы, которые относятся к вашим приложениям, и внесите изменения.

### Бэкенд

- Если вы используете типизированные языки (например Go, C, Rust) на бэкенде и такие параметры, как идентификаторы пользователей, групп или владельцев объектов ( `user_id`,

`group_id`, `owner_id`, `chat_id`, `peer_id`) храните в `Int32` или `Uint32`, вам необходимо перейти на использование типов `Int64`, `Uint64` или `Long`.

Например, в Java нужно заменить `Integer` на `Long`. До перехода имеем такой код:

```java
public DocsAddQuery add(UserActor actor, Integer ownerId, Integer docId) {
    return new DocsAddQuery(getClient(), actor, ownerId, docId);
}
```

После перехода:

```java
public DocsAddQuery add(UserActor actor, Long ownerId, Integer docId) {
    return new DocsAddQuery(getClient(), actor, ownerId, docId);
}
```

- При использовании нетипизированных языков вам необходимо проверить размерность типов данных. Целочисленные типы должны быть совместимы с `Int64` — способны безопасно

хранить значения от –2⁵³ – 1 до 2⁵³ – 1. Это может зависеть от используемой вами операционной системы, настроек окружения или настроек интерпретатора.

Например, в случае PHP необходимо использовать 64-битную версию пакета. Определить, какая версия установлена у вас, можно следующей командой:

```bash
php -r 'echo (PHP_INT_SIZE===8)?"64 bit ":"32 bit";'
```

- Обратите внимание на используемые вами инструменты сериализации и десериализации данных.

Например, если вы используете Protobuf для обмена данными, вам нужно убедиться, что для структур, использующих значения идентификаторов `user_id`, `group_id`, `owner_id`,

`user_ids` и других, используются типы, совместимые с `Int64`.

Если вы используете битовые операции, разделение диапазонов и подобные операции над идентификаторами, вам стоит либо отказаться от них, либо проверить их работоспособность при идентификаторах размерностью `Int64`.

#### Пример 1

Для разделения идентификаторов пользователей в разных социальных сетях используется сдвиг диапазона:

- Диапазон от 1 до 1e9 (1 000 000 000) — пользователи ВКонтакте.
- Диапазон от 1e9 (1 000 000 000) до 2e9 (2 000 000 000) — пользователи другой социальной сети.

В данном примере при переходе на LongID идентификаторы, возвращаемые ВКонтакте, могут быть больше миллиарда, что приведёт к нарушению диапазонов и неправильной работе кода.

#### Пример 2

Для разделения идентификаторов пользователей разных социальных сетей используются битовые сдвиги.

Как и в предыдущем примере, при переходе на LongID новые идентификаторы не будут соответствовать диапазонам сдвига.

### Фронтенд

Вам не нужно делать дополнительных изменений в клиентской части вашего приложения, если вы не манипулируете идентификаторами пользователей или сообществ ( `user_id`, `group_id`,

`owner_id` / `author_id`).

Тип данных `Number` в JavaScript безопасно вмещает новые диапазоны идентификаторов.

Если вы используете битовые операции, разделение диапазонов и подобные операции над идентификаторами, вам стоит либо отказаться от них, либо проверить их работоспособность при идентификаторах размерностью `Int64`.

#### Пример 1

Для разделения идентификаторов пользователей в разных социальных сетях используется сдвиг диапазона. После получения значения от бэкенда проверяется принадлежность к социальной сети:

- Диапазон от 1 до 1e9 (1 000 000 000) — пользователи ВКонтакте.
- Диапазон от 1e9 (1 000 000 000) до 2e9 (2 000 000 000) — пользователи другой социальной сети.

В данном примере при переходе на LongID идентификаторы, возвращаемые ВКонтакте, могут быть больше миллиарда, что приведёт к нарушению диапазонов и неправильной работе кода.

#### Пример 2

Для разделения идентификаторов пользователей разных социальных сетей используются битовые сдвиги.

Как и в предыдущем примере, при переходе на LongID новые идентификаторы не будут соответствовать диапазонам сдвига.

### Параметры запуска

В параметрах запуска (данные о пользователе и источнике запуска), которые содержат в себе идентификаторы пользователей или сообществ, могут возвращаться значения, превышающие диапазон `Int32`, но не превышающие формат `Number` в JavaScript (от –2⁵³ + 1 до 2⁵³ – 1).

Подготовьте код в клиентской и серверной частях вашего приложения к этим изменениям.

#### Игры

Переход затрагивает следующие [параметры запуска](https://dev.vk.ru/ru/games/development/parameters) в играх:

- `group_id`
- `user_id`
- `viewer_id`

#### Пример

```
https://vkcom.github.io/vk-direct-games-example/?
api_url=https://api.vk.ru/api.php&api_id=7170524&api_settings=136195230&viewer
_id=LONG_ID&viewer_type=0&sid=<sid>&secret=<secret>&access_token=
<access_token>&user_id=LONG_ID&is_app_user=1&language=0&parent_language=0&is_s
ecure=1&stats_hash=
<stats_hash>&is_favorite=1&group_id=LONG_ID&ads_app_id=7170524_4cc9e217e87be84
d3b&access_token_settings=friends,photos,audio&referrer=apps_games_catalog_rec
ent&lc_name=97aef660&platform=web&is_widescreen=0&whitelist_scopes=,friends,ph
otos,video,stories,pages,status,notes,wall,docs,groups,stats,market,ads,notifi
cations,notify&group_whitelist_scopes=stories,photos,app_widget,messages,wall,
docs,manage&auth_key=<auth_key>&timestamp=1686040791&sign=
<sign>sign_keys=access_token,access_token_settings,ads_app_id,api_id,api_setti
ngs,api_url,auth_key,group_id,group_whitelist_scopes,is_app_user,is_favorite,i
s_secure,is_widescreen,language,lc_name,parent_language,platform,referrer,secr
et,sid,stats_hash,timestamp,user_id,viewer_id,viewer_type,whitelist_scopes&has
h=
```

В данном примере в параметрах запуска `user_id`, `viewer_id` и `group_id` может возвращаться значение в диапазоне `Int64`.

#### Мини-приложения

Переход затрагивает следующие [параметры запуска](https://dev.vk.ru/ru/mini-apps/development/launch-params) в мини-приложениях:

- `vk_user_id`
- `vk_group_id`
- `vk_profile_id`

#### Пример

```
https://prod-app51585301-06d5961ed106.pages-ac.vk-apps.com/index.html?
vk_access_token_settings=&vk_app_id=6736218&vk_are_notifications_enabled=0&vk_
is_app_user=0&vk_is_favorite=0&vk_language=ru&vk_platform=desktop_web&vk_ref=c
atalog_new&vk_ts=1686043767&vk_user_id=LONG_ID&vk_profile_id=LONG_ID&sign=
<sign>
```

В данном примере в параметрах запуска `vk_user_id` и `vk_profile_id` может возвращаться значение в диапазоне `Int64`.

### VK Bridge

Для перехода на LongID обновлять библиотеку [VK Bridge](https://dev.vk.ru/ru/bridge/overview) не нужно. Но обратите внимание, что события библиотеки смогут принимать в качестве параметров и возвращать в ответах идентификаторы в диапазоне `Int64`.

#### События

Ниже мы собрали список событий, которые могут принимать и возвращать значения идентификаторов с типом `Int64` после перехода на LongID.

- [VKWebAppGetUserInfo](https://dev.vk.ru/ru/bridge/VKWebAppGetUserInfo)
- [VKWebAppShowRequestBox](https://dev.vk.ru/ru/bridge/VKWebAppShowRequestBox)
- [VKWebAppShowInviteBox](https://dev.vk.ru/ru/bridge/VKWebAppShowInviteBox)
- [VKWebAppGetFriends](https://dev.vk.ru/ru/bridge/VKWebAppGetFriends)
- [VKWebAppOpenWallPost](https://dev.vk.ru/ru/bridge/VKWebAppOpenWallPost)
- [VKWebAppShowStoryBoxHandler](https://dev.vk.ru/ru/bridge/VKWebAppShowStoryBoxHandler)
- [VKWebAppAllowNotifications](https://dev.vk.ru/ru/bridge/VKWebAppAllowNotifications)
- [VKWebAppGetCommunityToken](https://dev.vk.ru/ru/bridge/VKWebAppGetCommunityToken)
- [VKWebAppGetGroupInfo](https://dev.vk.ru/ru/bridge/VKWebAppGetGroupInfo)
- [VKWebAppLeaveGroup](https://dev.vk.ru/ru/bridge/VKWebAppLeaveGroup)
- [VKWebAppAllowMessagesFromGroup](https://dev.vk.ru/ru/bridge/VKWebAppAllowMessagesFromGroup)
- [VKWebAppJoinGroup](https://dev.vk.ru/ru/bridge/VKWebAppJoinGroup)
- [VKWebAppRetargetingPixel](https://dev.vk.ru/ru/bridge/VKWebAppRetargetingPixel)
- [VKWebAppSendPayload](https://dev.vk.ru/ru/bridge/VKWebAppSendPayload)
- [VKWebAppSendToClient](https://dev.vk.ru/ru/bridge/VKWebAppSendToClient)
- [VKWebAppShowCommunityWidgetPreviewBox](https://dev.vk.ru/ru/bridge/VKWebAppShowCommunityWidgetPreviewBox)

Посмотрим на примере нескольких событий.

#### Пример 1

Вызов события [`VKWebAppGetUserInfo`](https://dev.vk.ru/ru/bridge/VKWebAppGetUserInfo) [:](https://dev.vk.ru/ru/bridge/VKWebAppGetUserInfo)

```js
bridge.send('VKWebAppGetUserInfo', {
  user_id: 743784474
  })
  .then((data) => {
    if (data.id) {
      // Данные пользователя получены
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
```

В данном примере событие принимает параметры `user_id` или `user_ids`. При переходе на LongID их типы становятся `Int64` для поля `user_id` и `Int64[]` (массив `Int64`) для поля

`user_ids`.

До перехода максимальное значение, которое можно передать в поле `user_id`, ограничивается 2³¹ – 1. После перехода максимальное значение будет 2⁵³ – 1.

В ответе возвращается объект или список объектов пользователя:

```json
{
  "detail": {
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
}
```

Поле `id` в объекте пользователя является идентификатором пользователя и после перехода может принимать значения в диапазоне `Int64`. До перехода значение может быть только в диапазоне `Int32`.

#### Пример 2

В событии [`VKWebAppGetGroupInfo`](https://dev.vk.ru/ru/bridge/VKWebAppGetGroupInfo) параметры `group_id` / `group_ids` будут принимать значения из диапазона `Int64`.

В ответе в объектах групп поле `id` будет принимать значения из диапазона `Int64`.

#### Пример 3

В ответе события [`VKWebAppShowInviteBox`](https://dev.vk.ru/ru/bridge/VKWebAppShowInviteBox) есть поле `notSentIds`, в которое после перехода могут приходить идентификаторы из диапазона `Int64`.

### Базы данных

- Если вы используете реляционные базы данных для хранения идентификаторов пользователей или сообществ, то вам необходимо убедиться, что типы данных могут хранить диапазон значений `Int64`. Если вы используете типы данных, которые не могут хранить такой диапазон значений, вам нужно сменить тип данных.

Вы можете руководствоваться [таблицей для MySQL](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html) или аналогичной таблицей для используемой вами СУБД.
- Если вы используете key-value хранилища или документоориентированные базы данных, вам также стоит убедиться, что они готовы к хранению данных с идентификаторами `Int64`.

#### Пример

Выполним команду `ALTER TABLE` для всех полей `user_id`, `owner_id`, `group_id` и подобных, в которые записываются идентификаторы. Меняем тип с `INT` на `BIGINT` в реляционных базах данных (по типу MySQL, PostreSQL).

```
ALTER TABLE table_name MODIFY COLUMN user_id BIGINT;
```

### VK ID SDK

Для Standalone-приложений необходимо:

- Если вы используете [Android VK ID SDK](https://dev.vk.ru/ru/vkid), обновить [SDK](https://dev.vk.ru/ru/sdk/overview) до версии 0.105-24413 или более поздней. [Android VK SDK](https://dev.vk.ru/ru/sdk/android) обновится автоматически.
- Если вы используете [Android VK SDK](https://dev.vk.ru/ru/sdk/android), обновить [SDK](https://dev.vk.ru/ru/sdk/overview) до версии 4.0.1 или более поздней.

Если вы используете [iOS VK ID SDK](https://dev.vk.ru/ru/vkid) или [iOS VK SDK](https://dev.vk.ru/ru/sdk/ios), обновление [SDK](https://dev.vk.ru/ru/sdk/overview) не требуется.

### VK API

API-операции будут возвращать идентификаторы в новых диапазонах для всех поддерживаемых [версий API](https://dev.vk.com/reference/versions). Полный список изменившихся сущностей можно посмотреть в JSON-схеме API: [github.com/VKCOM/vk-api-schema](https://github.com/VKCOM/vk-api-schema).

Параметры, включая такие как, `user_id`, `owner_id`, `receiver_id`, `peer_id`, `author_id`,

`community_id`, `creator_id`, `creator`, `editor_id`, `group_id`, `member_id`, `photo_owner_id`, `sender_id`, `voter_id`, `friend_id`, будут помечены специальным образом:

```
"format": "int64",
"entity": "owner" ("profiles", "groups" или "peer")
```

Промаркированы будут как входящие параметры для запроса, так и параметры в ответах.

Обратите внимание. Кроме базовых параметров, перечисленных выше, есть составные параметры, которые включают значения в диапазоне `Int64`. Они также будут размечены специальным образом.

Каждый такой идентификатор — это строка вида `[<type>]<owner_id>_<item_id>[_<hash>]`, где:

- `owner_id` — значение идентификатора автора поста в диапазоне `Int64`.
- `item_id` — идентификатор сущности, принадлежащей автору.
- `type` — необязательный префикс, характеризующий тип сущности (например, photo, audio), если его нельзя явно определить по семантике названия поля.
- `hash` или иные постфиксы — необязательные и специфичны для определённых ситуаций (например, разрешение просмотра сущности пользователю без прав на неё).

Определение этой сущности будет выглядеть следующим образом:

```json
{
  "type": "string",
  "format": "value_object",
  "properties": {
    "owner_id": {
      "type": "integer",
      "format": "int64",
      "entity": "owner",
      "required": true
    },
    "item_id": {
      "type": "integer",
      "required": true
    },
    "hash": {
      "type": "string"
    }
  }
}
```

При обработке и хранении подобных идентификаторов стоит учитывать, что их длина в символах будет увеличиваться, равно как и семантическое представление отдельных элементов.

Например, в методе [`wall.getById`](https://dev.vk.ru/ru/method/wall.getById) параметр `posts` представляет из себя массив составных идентификаторов, разделённых запятыми.

#### Процесс перехода

Если вы убедились, что сервис корректно работает с новыми диапазонами значений `Int64`, вам необходимо дополнительно посылать заголовок `X-Owner: long`.

В противном случае, чтобы сохранить частичную работоспособность старых клиентов, методы API будут возвращать вместо реальных идентификаторов пользователей или групп в диапазоне `Int64` профили-заглушки там, где это возможно:

- `651622024` — для пользователей.
- `- 204255825` — для групп.

Если профили-заглушки вернуть невозможно, то будет отправлена ошибка: `35;Client update` `needed`.

Начиная с версии API `5.500` переходное поведение будет исключено и значения всегда будут отдаваться в диапазоне `Int64` без всякой подмены и необходимости отправки дополнительных заголовков.

### PHP SDK

Если вы используете наш PHP SDK ([github.com/VKCOM/vk-php-sdk](https://github.com/VKCOM/vk-php-sdk)), в коде бэкенда ничего менять не нужно. Но не забывайте, что базы данных и прочие хранилища нужно будет подготовить к переходу.

### Java SDK

Для Java SDK ([github.com/VKCOM/vk-java-sdk](https://github.com/VKCOM/vk-java-sdk)) в июле 2023 года мы выпустим обновление, поддерживающее идентификаторы в диапазоне `Int64`. Вам нужно будет перейти на новую версию библиотеки.

### Open API

Обновление [Open API](https://dev.vk.ru/ru/api/open-api/getting-started) не требуется, но вам нужно быть готовыми, что идентификаторы пользователей и сообществ [будут возвращаться](https://dev.vk.ru/ru/api/open-api/getting-started#%D0%A4%D0%BE%D1%80%D0%BC%D0%B0%D1%82%20%D0%BE%D1%82%D0%B2%D0%B5%D1%82%D0%B0) в диапазоне `Int64`.

#### Пример

При авторизации пользователя через методы `VK.Auth.login` в ответе содержатся поля `mid` и объект `user`. Поле `mid` может принимать значения в диапазоне `Int64`.

### Xd_connection и Mobile SDK

Если вы используете данные SDK в ваших проектах, то мы настоятельно рекомендуем вам перейти на VK Bridge, так как они не поддерживаются на данный момент.

С точки зрения перехода на LongID обновления данных SDK не требуется, но вам также нужно быть готовыми, что идентификаторы пользователей, сообществ и владельцев объектов будут в диапазоне `Int64`.

#### Пример 1

При вызове:

```js
VK.callMethod('showAllowMessagesFromCommunityBox', group_id);
```

Поле `group_id` может принимать значение `Int64`.

#### Пример 2

При вызове:

```js
VK.callMethod('showInviteBox');
```

В ответе придёт поле `notSentIds`, в котором будет список `id` в диапазоне `Int64`.

## Как протестировать сервис

Протестировать сервисы вы сможете с помощью специальных ботов, идентификаторы которых будут находиться в диапазоне `Int64`. Сейчас мы прорабатываем автоматическое получение ботов.

Следите за обновлениями о переходе на LongID в [сообществе VK Mini Apps](https://vk.com/vkappsdev) и на текущей странице.

## Что будет, если не подготовиться к переходу на LongID

Мы настоятельно рекомендуем вам подготовить ваши сервисы к переходу на LongID. В противном случае вы можете столкнуться с трудно определяемыми ошибками и путаницей в пользователях.

## Если остались вопросы

Если у вас остались вопросы о переходе на LongID, вы можете отправить их [cообщением](https://vk.me/vkappsdev) [сообществу VK Mini Apps](https://vk.me/vkappsdev).
