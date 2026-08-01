# PHP SDK

**Раздел:** Библиотеки → SDK → PHP SDK  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Страница проекта на Github: [`https://github.com/VKCOM/vk-php-sdk`](https://github.com/VKCOM/vk-php-sdk) [.](https://github.com/VKCOM/vk-php-sdk)

PHP SDK — это PHP-библиотека для взаимодействия с API ВКонтакте, включая авторизацию `OAuth` `2.1` и вызов методов API.

Эта библиотека создана на основе [JSON-схемы](https://github.com/VKCOM/vk-api-schema) API ВКонтакте. Используется версия API version 5.199.

## Требования

PHP 7.1 или более новый.

## Подключение в приложении

Для установки PHP SDK используйте команду в Composer:

```php
composer require vkcom/vk-php-sdk
```

### Инициализация

Создайте объект `VKApiClient` с помощью кода:

```php
$vk = new VKApiClient();
```

Также вы можете инициализировать `VKApiClient` с другой версией API или другим языком, например:

```php
$vk = new VKApiClient('5.199');
$vk = new VKApiClient('5.199', VKLanguage::ENGLISH);
```

## Авторизация

SDK предоставляет возможность авторизации на основе протокола `OAuth 2.1`. Пожалуйста, ознакомьтесь с полной [документацией](https://dev.vk.ru/ru/api/access-token/getting-started) перед началом работы.

### Authorization Code Flow

`OAuth 2.1` Authorization Code Flow позволяет обращаться к методам API в серверной части вашего приложения.

Эта схема состоит из двух шагов — получение `code` и обмен `code` на ключ доступа. В первую очередь вы должны получить `code` для пользователя или сообщества:

- [Инструкция для авторизации пользователя](https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/api-description#Zapros-koda-podtverzhdeniya-i-rabota-s-formoj-razresheniya-dostupov-polzovatelya)

- [Инструкция для авторизации сообщества](https://id.vk.com/about/business/go/docs/ru/vkid/latest/oauth/oauth-vkontakte/authcode-flow-community)

Чтобы перенаправить пользователя на страницу авторизации, используйте следующий код:

#### Для ключа доступа пользователя

```php
use VK\OAuth\User\DTO\AuthorizeUrlParams;
use VK\OAuth\User\DTO\TokensParams;
use VK\OAuth\User\User;
require 'vendor/autoload.php';
$clientId = 1234567;
$clientSecret = 'secret';
$redirectUri = 'https://domain.tld';
$state = 'abc';
// @see https://datatracker.ietf.org/doc/html/rfc7636#section-4.1
$verifier = 'very_very_very_very_very_very_big_random_string';
$auth = new User();
$authParams = (new AuthorizeUrlParams(
$clientId,
$verifier,
$redirectUri,
$state,
))->setScope(Scopes::EMAIL, Scopes::PHONE);
$authUrl = $auth->getAuthorizeUrl($authParams);
```

#### Для ключа доступа сообщества

```php
use VK\OAuth\Group\Display;
use VK\OAuth\Group\DTO\AccessTokenParams;
use VK\OAuth\Group\DTO\AuthorizeUrlParams;
use VK\OAuth\Group\Group;
use VK\OAuth\ResponseType;
```

```
require 'vendor/autoload.php';
```

```
$clientId = 1234567;
$clientSecret = 'secret';
$redirectUri = 'https://domain.tld';
$state = 'abc';
```

```
$auth = new Group();
```

```
$authParams = new AuthorizeUrlParams(
ResponseType::CODE,
$clientId,
$redirectUri,
Display::PAGE,
$state,
);
```

```
$authUrl = $auth->getAuthorizeUrl($authParams);
```

Ключ доступа пользователя и ключ доступа сообщества используют разные значения в массиве

[`scope`](https://dev.vk.ru/ru/api/privacy#%D0%9F%D1%80%D0%B0%D0%B2%D0%B0%20%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0) [.](https://dev.vk.ru/ru/api/privacy#%D0%9F%D1%80%D0%B0%D0%B2%D0%B0%20%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0)

После успешной авторизации браузер перенаправит пользователя на указанный `redirect_uri`.

`code`, `device_id` и `state` будут переданы на указанный вами адрес:

[https://example.com?code=CODE&device_id=DEVICE_ID&state=STATE](https://example.com?code=CODE&device_id=DEVICE_ID&state=STATE)

Затем используйте этот метод для получения ключа доступа пользователя:

```php
use VK\OAuth\User\DTO\TokensParams;
use VK\OAuth\User\User;
```

```
require 'vendor/autoload.php';
```

```
$redirectUri = 'https://domain.tld';
```

```
$state = 'abc';
// @see https://datatracker.ietf.org/doc/html/rfc7636#section-4.1
$verifier = 'very_very_very_very_very_very_big_random_string';
$auth = new User();
```

```
$query = parse_url($url, PHP_URL_QUERY);
if (empty($query)) {
echo "err empty query in url\n";
exit(1);
}
```

```
parse_str($query, $q);
```

```
if (empty($q'code')) {
echo "err not found parameter code in url\n";
exit(1);
}
```

```
if (empty($q'device_id')) {
echo "err not found parameter device_id in url\n";
exit(1);
}
```

```
if (empty($q'state')) {
echo "err not found parameter state in url\n";
exit(1);
}
```

```
if ($q'state' !== $state) {
echo "err invalid state value in url, expect {$state}: {$q'state'}\n";
exit(1);
}
```

```
$tokenParams = new TokensParams($clientId, $verifier, $redirectUri, $q'code',
$q'device_id');
$tokens = $auth->getTokens($tokenParams);
```

`redirect_uri`, `state` и `verifier` должны совпадать с теми, которые использовались на первом шаге.

Или используйте метод для получения ключа доступа сообщества:

```php
use VK\OAuth\Group\DTO\AccessTokenParams;
use VK\OAuth\Group\Group;
require 'vendor/autoload.php';
$clientId = 1234567;
$clientSecret = 'secret';
$redirectUri = 'https://domain.tld';
$state = 'abc';
$auth = new Group();
$query = parse_url($url, PHP_URL_QUERY);
if (empty($query)) {
echo "err empty query in url\n";
exit(1);
}
parse_str($query, $q);
if (empty($q'code')) {
echo "err not found parameter code in url\n";
exit(1);
}
if ($q'state' !== $state) {
echo "err invalid state value in url, expect {$state}: {$q'state'}\n";
exit(1);
}
$tokenParams = new AccessTokenParams($clientId, $clientSecret, $redirectUri,
$q'code');
$tokens = $auth->getAccessToken($tokenParams);
```

`redirect_uri` и `state` должны совпадать с теми, которые использовались на первом шаге.

### Implicit flow

В отличие от Authorization Code Flow, эта схема позволяет получить ключ доступа с ограниченным сроком действия.

Подробнее о получении ключа доступа сообщества — в статье [Implicit Flow для получения Access](https://id.vk.com/about/business/go/docs/ru/vkid/latest/oauth/oauth-vkontakte/implicit-flow-community) [token сообщества](https://id.vk.com/about/business/go/docs/ru/vkid/latest/oauth/oauth-vkontakte/implicit-flow-community).

С 25 июня 2024 года способ получения ключа доступа пользователя (access token) изменился. Подробнее — в разделе [Сервис авторизации VK ID](https://dev.vk.ru/ru/api/access-token/user-token#%D0%A1%D0%B5%D1%80%D0%B2%D0%B8%D1%81%20%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8%20VK%20ID).

#### Ключ доступа сообщества

```php
require_once "vendor/autoload.php";
```

```
use VK\OAuth\Group\Display;
use VK\OAuth\Group\DTO\AuthorizeUrlParams;
use VK\OAuth\Group\Group;
use VK\OAuth\Group\Scopes;
use VK\OAuth\ResponseType;
```

```
$client_id = 1234567;
$redirect_uri = 'https://example.com/vk';
$display = Display::PAGE;
$scopes = [Scopes::MESSAGES];
$state = 'secret_state_code';
$groups_ids = [1, 2];
```

```
$auth = new Group();
```

```
$authParams = new AuthorizeUrlParams(
  ResponseType::TOKEN,
  $client_id,
  $redirect_uri,
  $display,
  $state,
);
$authParams->setScopes($scopes);
$authParams->setGroupIds($groups_ids);
```

```
$browser_url = $auth->getAuthorizeUrl($authParams);
```

После успешной авторизации браузер перенаправит пользователя на указанный `redirect_uri`. Ключ доступа будет передан как фрагмент на указанный вами адрес:

Для ключа доступа сообщества:

```
https://example.com#access_token_XXXXXX=533bacf01e11f55b536a565b57531ad114461a
e8736d6506a3&expires_in=86400&state=secret_state_code
```

- `expires_in` — срок действия ключа доступа в секундах.
- `state` — строка, переданная в запросе авторизации.
- `access_token_XXXXXX` — ключ доступа сообщества, где XXXXXX — идентификатор сообщества.

## Запросы к API

[Список всех методов API](https://dev.vk.ru/ru/method).

### Пример запроса

Пример вызова метода [`users.get`](https://dev.vk.ru/ru/method/users.get) [:](https://dev.vk.ru/ru/method/users.get)

```php
$vk = new VKApiClient();
$response = $vk->users()->get($access_token, array(
    'user_ids' => array(1, 210700286),
    'fields' => array('city', 'photo'),
));
```

### Загрузка фото в личное сообщение

Пожалуйста, прочитайте полное руководство перед началом работы.

Вызовите [`photos.getMessagesUploadServer`](https://dev.vk.ru/ru/method/photos.getMessagesUploadServer), чтобы получить адрес для загрузки файла:

```php
$vk = new VKApiClient();
$address = $vk->photos()->getMessagesUploadServer('{access_token}');
```

Затем используйте метод `upload()`, чтобы отправить файлы на полученный `upload_url`:

```php
$vk = new VKApiClient();
$photo = $vk->getRequest()->upload($address['upload_url'], 'photo',
'photo.jpg');
```

В ответе вы получите JSON-объект с полями `server`, `photo`, `hash`. Чтобы сохранить фотографию, вызовите метод [`photos.saveMessagesPhoto`](https://dev.vk.ru/ru/method/photos.saveMessagesPhoto) с этими тремя параметрами:

```php
$vk = new VKApiClient();
$response_save_photo = $vk->photos()->saveMessagesPhoto($access_token, array(
    'server' => $photo['server'],
    'photo' => $photo['photo'],
    'hash' => $photo['hash'],
));
```

### Загрузка видео

Пожалуйста, прочитайте полное руководство перед началом работы.

Вызовите метод [`video.save`](https://dev.vk.ru/ru/method/video.save), чтобы получить адрес для загрузки файла:

```php
$vk = new VKApiClient();
$address = $vk->video()->save($access_token, array(
    'name' => 'My video',
));
```

Затем используйте метод `upload()`, чтобы отправить файл на полученный `upload_url`:

```php
$vk = new VKApiClient();
$video = $vk->getRequest()->upload($address['upload_url'], 'video_file',
'video.mp4');
```

Некоторое время после загрузки видео находится в процессе обработки.

## События в сообществах

### Long Poll

Включите Bots Long Poll API в вашем сообществе и укажите события, которые нужно отслеживать, с помощью этого метода:

```php
$vk = new VKApiClient();
$vk->groups()->setLongPollSettings($access_token, array(
  'group_id' => 159895463,
  'enabled' => 1,
  'message_new' => 1,
  'wall_post_new' => 1,
));
```

Переопределите методы из `VKCallbackApiHandler`, чтобы отслеживать события:

```php
class CallbackApiMyHandler extends VKCallbackApiHandler {
     public function messageNew($group_id, $secret, $object) {
        echo 'New message: ' . $object['message']['text'];
     }
    public function wallPostNew($object) {
        echo 'New wall post: ' . $object['text'];
    }
}
```

Чтобы начать отслеживание событий в Long Poll, создайте экземпляр класса

`CallbackApiMyHandler`, класа `VKCallbackApiLongPollExecutor`, и вызовите метод `listen()`:

```php
$vk = new VKApiClient();
$access_token = 'asdj4iht2i4ntokqngoiqn3ripogqr';
$group_id = 159895463;
$wait = 25;
```

```
$handler = new CallbackApiMyHandler();
$executor = new VKCallbackApiLongPollExecutor($vk, $access_token, $group_id,
$handler, $wait);
$executor->listen();
```

Параметр `wait` соответствует периоду «ожидания» запроса.

В вызове функции `listen()` вы также можете задать номер события, начиная с которого нужно получать обновления. Значение по умолчанию — номер последнего события.

Пример:

```php
$vk = new VKApiClient();
$access_token = 'asdj4iht2i4ntokqngoiqn3ripogqr';
$group_id = 159895463;
$ts = 12;
$wait = 25;
```

```
$executor = new VKCallbackApiLongPollExecutor($vk, $access_token, $group_id,
$handler, $wait);
$executor->listen($ts);
```

### Callback API

Подробную информацию о Callback API вы можете найти на этой [странице](https://dev.vk.ru/ru/api/callback/getting-started).

Вам нужно настроить Callback API в разделе Управление → Дополнительно → Работа с API вашей группы или публичной страницы.

В первую очередь вам необходимо подтвердить адрес сервера. ВКонтакте отправляет запрос на ваш сервер с типом события `confirmation`, в ответ на которое необходимо вернуть контрольную строку (код подтверждения). На все другие типы уведомлений ваш сервер должен отвечать строкой `"ok"`.

Пример:

```php
use VK\CallbackApi\Server\VKCallbackApiServerHandler;
```

```
class ServerHandler extends VKCallbackApiServerHandler {
const SECRET = 'ab12aba';
const GROUP_ID = 123999;
const CONFIRMATION_TOKEN = 'e67anm1';
```

```
function confirmation(int $group_id, ?string $secret) {
if ($secret === static::SECRET && $group_id === static::GROUP_ID) {
echo static::CONFIRMATION_TOKEN;
}
}
```

```
public function messageNew(int $group_id, ?string $secret, array $object) {
echo 'ok';
}
}
```

```
$handler = new ServerHandler();
$data = json_decode(file_get_contents('php://input'));
$handler->parse($data);
```

Чтобы обрабатывать события, переопределите методы из класса `VKCallbackApiServerHandler`.

Обработчик события `confirmation` содержит два аргумента: идентификатор сообщества и секретный ключ. Вам необходимо переопределить его.
