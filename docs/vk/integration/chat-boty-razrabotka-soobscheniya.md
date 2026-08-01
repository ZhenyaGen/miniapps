# Сообщения

**Раздел:** Интеграция → Чат-боты → Разработка → Сообщения  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Сообщения от бота

Чат-бот общается с пользователями с помощью [сообщений сообщества](https://dev.vk.ru/ru/api/community-messages/getting-started). Вы можете отправлять в сообщениях любые вложения, будь то фотографии, аудиозаписи или видео, документы, аудиосообщения, ссылки.

Сообщения отправляются с помощью запросов к [API ВКонтакте](https://dev.vk.ru/ru/api/api-requests).

## Отправка сообщения

Для отправки сообщения используйте метод [`messages.send`](https://dev.vk.ru/ru/method/messages.send). Обратите внимание, что с ключом доступа сообщества можно совершать до 20 запросов в секунду. Вы можете сократить число запросов к API, если группировать сообщения с одинаковым текстом (параметр `message`) для разных получателей — для этого перечислите идентификаторы получателей (до 100) в параметре

`user_ids`. Кроме того, вы можете группировать вызовы любых методов API, включая [`messages.send`](https://dev.vk.ru/ru/method/messages.send), с помощью [`execute`](https://dev.vk.ru/ru/method/execute) — до 25 вызовов в одном запросе.

Используйте параметр `random_id` ( `int32`), чтобы избежать повторной отправки сообщения одному и тому же получателю. Этот параметр должен быть всегда уникальным, поэтому используйте большие случайные числа.

В ответе метод вернёт вашему серверу id отправленного сообщения или ошибку. Если вы используете Callback API, в случае удачной отправки будет сгенерировано событие

`message_reply`.

Если вы хотите обращаться к разным методам API, будет удобнее использовать одну общую функцию для вызова любого метода.

### Пример на PHP

```php
define('VK_API_VERSION', '5.199'); //Используемая версия API
define('VK_API_ENDPOINT', "https://api.vk.ru/method/");
```

```
//Функция для вызова произвольного метода API
function _vkApi_call($method, $params = array()) {
  $params['access_token'] = VK_API_ACCESS_TOKEN;
  $params['v'] = VK_API_VERSION;
  $url = VK_API_ENDPOINT.$method.'?'.http_build_query($params);
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $json = curl_exec($curl);
  curl_close($curl);
  $response = json_decode($json, true);
  return $response['response'];
}
//Функция для вызова messages.send
function vkApi_messagesSend($peer_id, $message, $attachments = array()) {
  return _vkApi_call('messages.send', array(
    'peer_id'        => $peer_id,
    'message'     => $message,
    'attachment' => implode(',', $attachments)
  ));
}
```

```
vkApi_messagesSend(494075, 'Hello world!');
```

[Скрипт полностью на GitHub](https://github.com/VKCOM/bot-example-php/blob/master/www/api/vk_api.php)

## Работа с `conversation_message_id`

Параметр `conversation_message_id` позволяет взаимодействовать боту с сообщениями без использования общего id сообщения, который может отсутствовать в некоторых случаях. С помощью метода [`messages.getByConversationMessageId`](https://dev.vk.ru/ru/method/messages.getByConversationMessageId) можно получить информацию о сообщении по `conversation_message_id`. У бота должен быть доступ к переписке.

Обратите внимание бот имеет доступ к следующим сообщениям:

- Находящиеся в личном диалоге с ботом;
- Являющиеся исходящими сообщениями бота;
- Написанными после того, как бот вступил в беседу и появился доступ к сообщениям. Доступ к сообщениям есть в случаях, когда:

- Бота упомянули в сообщении;
- Сообщение начинается с " `/` ";
- Боту выдали права на просмотр всех сообщений.

Обратите внимание! В некоторых методах параметр `conversation_message_id` называется

`cmid`.

## Редактирование исходящего сообщения

Для редактирования сообщения воспользуйтесь методом [`messages.edit`](https://dev.vk.ru/ru/method/messages.edit), передав в параметре

`conversation_message_id` идентификатор сообщения. Необходимый идентификатор сообщения можно заранее получить, вызвав метод [`messages.send`](https://dev.vk.ru/ru/method/messages.send) с параметром `peer_ids` и версией API не ниже 5.124.

## Удаление сообщения

Для удаления сообщения вызовите метод [`messages.delete`](https://dev.vk.ru/ru/method/messages.delete) с параметрами `peer_id`, `cmids` и

`delete_for_all`.

## Закрепление сообщения

Метод [`messages.pin`](https://dev.vk.ru/ru/method/messages.pin) позволяет закрепить сообщение в беседе. Для закрепления нужного сообщения воспользуйтесь параметром `conversation_message_id`.

## Пересылка сообщения

С помощью метода [`messages.send`](https://dev.vk.ru/ru/method/messages.send) бот может пересылать сообщения или отвечать на сообщения в рамках чата. Для этого передайте JSON-объект в параметре `forward`. Описание объекта можно найти в документации к методу [`messages.send`](https://dev.vk.ru/ru/method/messages.send) [.](https://dev.vk.ru/ru/method/messages.send)

## Вложения

Метод [`messages.send`](https://dev.vk.ru/ru/method/messages.send) принимает параметр `attachment` — чтобы отправить картинку, аудиозапись или любое другое вложение, нужно указать его тип и строковый ID (ID владельца + "_" + ID объекта). Например: `photo-123456_654231`.

Вы можете использовать публичные объекты, которые уже были загружены ВКонтакте (прислать фотографию со стены своего сообщества или видеозапись из поиска), или загрузить новое вложение.

### Загрузка фотографии

Есть несколько способов загрузки изображений. Если Вы хотите отправить одно и то же изображение сразу многим собеседникам, например, если делаете рассылку, используйте один из следующих способов:

- Предварительно загрузите изображение в публичный альбом того же сообщества, и используйте в

`attachment` идентификатор этой фотографии.
- Загрузите изображение с помощью [`photos.getMessagesUploadServer`](https://dev.vk.ru/ru/method/photos.getMessagesUploadServer) без указания `peer_id`, а затем действуйте [по этой схеме](https://dev.vk.ru/ru/api/upload/photo-in-message) — изображение будет загружено в скрытый альбом группы.

Если вы не планируете рассылку и хотите загрузить и отправить изображение определенному пользователю — используйте метод с идентификатором получателя, а затем действуйте [по этой](https://dev.vk.ru/ru/api/upload/photo-in-message) [схеме](https://dev.vk.ru/ru/api/upload/photo-in-message).

Обратите внимание, что после загрузки `owner_id` фотографии будет равен переданному `peer_id`, это правильное поведение. Для таких загрузок нет лимита, Вы можете загружать подобным способом фотографии для неограниченного числа пользователей.

Стоит иметь в виду, что каждый раз при указании в `attachment` фотографии не из сообщества, изображение загружается повторно от имени сообщества. Для таких загрузок существует лимит, стоит рассчитывать не более чем на 7 тысяч загрузок в сутки.

```php
function vkApi_photosGetMessagesUploadServer($peer_id) {
  return _vkApi_call('photos.getMessagesUploadServer', array(
    'peer_id' => $peer_id,
  ));
}
```

```
function vkApi_photosSaveMessagesPhoto($photo, $server, $hash) {
  return _vkApi_call('photos.saveMessagesPhoto', array(
    'photo'  => $photo,
    'server' => $server,
    'hash'   => $hash,
  ));
}
```

```
function vkApi_upload($url, $file_name) {
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_POSTFIELDS, array('file' => new
CURLfile($file_name)));
  $json = curl_exec($curl);
  curl_close($curl);
  return json_decode($json, true);
}
```

```
// Загрузка фотографии в сообщение от бота
function uploadPhoto($user_id, $file_name) {
  $upload_server_response = vkApi_photosGetMessagesUploadServer($user_id);
  $upload_response = vkApi_upload($upload_server_response['upload_url'],
$file_name);
  $save_response = vkApi_photosSaveMessagesPhoto($upload_response['photo'],
$upload_response['server'], $upload_response['hash']);
  return array_pop($save_response);
}
```

```
$photo = uploadPhoto(494075, 'cats.jpg');
```

[Скрипт полностью на GitHub](https://github.com/VKCOM/bot-example-php/blob/master/www/bot/bot.php)

### Загрузка документа

Чтобы загрузить новый документ для отправки, используйте метод

[`docs.getMessagesUploadServer`](https://dev.vk.ru/ru/method/docs.getMessagesUploadServer) с `id` получателя в параметре `peer_id`, а затем действуйте [по](https://dev.vk.ru/ru/api/upload/document-in-profile) [этой схеме](https://dev.vk.ru/ru/api/upload/document-in-profile).

Обратите внимание, что после загрузки `owner_id` документа будет равен переданному `peer_id`. Такое поведение правильное, это нужно для того, чтобы Ваш бот мог загружать новые документы для неограниченного числа пользователей.

#### Пример на PHP

```php
function vkApi_docsGetMessagesUploadServer($peer_id, $type) {
  return _vkApi_call('docs.getMessagesUploadServer', array(
    'peer_id' => $peer_id,
    'type'    => $type,
  ));
}
function vkApi_docsSave($file, $title) {
  return _vkApi_call('docs.save', array(
    'file'  => $file,
    'title' => $title,
  ));
}
```

```
// Загрузка голосового сообщения от бота
function uploadVoiceMessage($user_id, $file_name) {
  $upload_server_response = vkApi_docsGetMessagesUploadServer($user_id,
'audio_message');
  $upload_response = vkApi_upload($upload_server_response['upload_url'],
$file_name);
  $save_response = vkApi_docsSave($upload_response['file'], 'Voice message');
  return array_pop($save_response);
}
```

```
$voice_message = uploadVoiceMessage(494075, 'voice_msg.ogg');
```

[Скрипт полностью на Github](https://github.com/VKCOM/bot-example-php/blob/master/www/bot/bot.php)

## Сообщения с пользовательским контентом

При отправке сообщений, содержащих пользовательский контент, необходимо передавать его источник. Им может быть: фотография из альбома, запись, комментарий, сообщение и т. д. Наличие источника позволит избежать блокировок, если пользователи будут отправлять запрещённые [правилами платформы](https://vk.com/terms) материалы, и может быть полезно любым ботам, пересылающим пользовательский контент. Например, ботам, позволяющим людям общаться между собой, или дейтинг-ботам с анкетами, в которых можно добавлять фотографии, указывать информацию о себе и т. д., особенно в тех случаях, когда её видят другие пользователи чат-бота. Информацию об источнике контента нужно передавать в методе [`messages.send`](https://dev.vk.ru/ru/method/messages.send), в поле `content_source`.

content_source

Объект, описывающий источник пользовательского контента для чат-ботов. Если источником является другое сообщение (например, сообщение от пользователя боту):

```json
{
    "type": "message",
    "owner_id": 0000, // от чьего имени указан peer_id. т.е. вы можете
использовать контент из сообщения другой группы.
    "peer_id": 0000, // id диалога
    "conversation_message_id": 0000, // id сообщения в беседе. Не путать с
message.id профиля
}
```

Если источником является любой другой контент на платформе (комментарий, пост, фотография и тд.):

```json
{
    "type": "url",
    "url": "https://vk.com/…"
}
```

## Шаблоны сообщений

Боты могут отправлять специальные сообщения, используя шаблоны. Такие сообщения отличаются от обычных как по внешнему виду, так и по функциональности. На данный момент поддерживается один шаблон — карусель.

### Карусели

Карусель — это шаблон сообщения, который содержит несколько элементов, элементы карусели можно скролить горизонтально.

Элемент карусели может состоять из заголовка, подзаголовка, картинки и кнопок. Нажатие на каждый из элементов карусели может сопровождаться выполнением действия: например, по нажатию на элемент карусели можно открыть ссылку.

Структурно, все элементы карусели должны быть одинаковыми, при этом первый элемент определяет структуру остальных. Например, если первый элемент карусели содержит заголовок, подзаголовок и 3 кнопки — все остальные элементы должны быть такой же структуры.

### Отправка каруселей

Чтобы отправить от имени бота сообщение с каруселью, нужно вызвать метод API [`messages.send`](https://dev.vk.ru/ru/method/messages.send) (отправить карусель можно с любой версии API), передав в параметр `template` объект следующего вида:

```json
{
    "type": "carousel",
    "elements": [
        element1,
        element2,
        element3
    ]
}
```

Нужно учитывать, что параметр `message` (текст сообщения) обязателен для сообщений с каруселью. Массив `elements` содержит список элементов карусели.

`title` `string` Заголовок, максимум 80 символов.

`description` `string` Подзаголовок, максимум 80 символов.

`photo_id` `string` ID изображения, которое надо прикрепить.

- Пропорции изображения: 13/8;
- Минимальный размер: 221х136;
- Загрузка изображений для карусели происходит также, как и загрузка изображений ботами в сообщениях.

`buttons` `array` Массив с кнопками — можно передать любые кнопки, которые описаны в разделе [Клавиатура](https://dev.vk.ru/ru/api/bots/development/keyboard#%D0%A1%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85). Один элемент карусели может содержать не больше 3-х кнопок.

`action` `object` Объект, описывающий действие, которое необходимо выполнить при нажатии на элемент карусели. Поддерживается два действия:

- `open_link` — открыть ссылку из поля "link".
- `open_photo` — открыть фото текущего элемента карусели.

#### Пример действий элемента карусели

```json
{"type": "open_link",  "link": "https://vk.com"}
{"type": "open_photo"}
```

В объекте элемента карусели обязательно должны присутствовать:

- Поле `buttons`;
- Поле `photo_id` или поле `title`;
- Поле `description`, если указан `title`.

Остальные поля необязательные.

#### Пример элемента карусели

```json
{
        "title": "Title",
        "description": "Description",
        "action": {
                "type": "open_link",
                "link": "https://vk.com"
        },
        "photo_id": "-109837093_457242809",
        "buttons": [{
                "action": {
                        "type": "text",
                        "label": "Label"
                }
        }]
}
```

Максимальное количество элементов в карусели — `10`, минимальное — `1`.

Пример объекта `template`

```json
{
    "type": "carousel",
    "elements": [{
            "photo_id": "-109837093_457242811",
            "action": {
                "type": "open_photo"
            },
            "buttons": [{
                "action": {
                    "type": "text",
                    "label": "Текст кнопки 🌚",
                    "payload": "{}"
                }
            }]
        },
        {
            "photo_id": "-109837093_457242811",
            "action": {
                "type": "open_photo"
            },
            "buttons": [{
                "action": {
                    "type": "text",
                    "label": "Текст кнопки 2",
                    "payload": "{}"
                }
            }]
        },
        {
            "photo_id": "-109837093_457242811",
            "action": {
                "type": "open_photo"
            },
            "buttons": [{
                "action": {
                    "type": "text",
                    "label": "Текст кнопки 3",
                    "payload": "{}"
                }
            }]
        }
    ]
}
```

### Обратная совместимость

Карусели, как и все новые возможности платформы, могут быть недоступны пользователю, например, если он использует старую версию приложения ВКонтакте. При отправке лучше проверить, доступна ли пользователю новая функциональность, и если нет — отправить информацию в обычном сообщении. Подробнее о том как получить информацию о доступных пользователю функциях читайте в разделе [Информация о доступных пользователю функциях](https://dev.vk.ru/ru/api/bots/getting-started#%D0%98%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D1%8F%20%D0%BE%20%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%BD%D1%8B%D1%85%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8E%20%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8F%D1%85).
