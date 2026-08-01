# Java SDK

**Раздел:** Библиотеки → SDK → Java SDK  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Android SDK

## Начало работы

Ваша аудитория — это 59 миллионов активных пользователей ВКонтакте, которые предпочитают Android, ежемесячно.

Вы можете создать совершенно новый продукт или добавить возможности ВКонтакте в уже существующее приложение, чтобы повысить активность пользователей.

SDK поможет быстро интегрировать API ВКонтакте в приложение для Android.

SDK упрощает использование API ВКонтакте в Android-приложениях. Пользователи смогут пройти авторизацию без ввода логина и пароля. После этого вы сможете сразу начать использовать методы API.

Страница проекта и исходный код на GitHub: [`https://github.com/VKCOM/vk-android-sdk`](https://github.com/VKCOM/vk-android-sdk)

Поддерживаются версии Android `5.0` и выше.

## Документация

- [Знакомство с API](https://dev.vk.ru/ru/api/getting-started) — если вы ранее не работали с API ВКонтакте, перед началом работы мы рекомендуем узнать об основных принципах его использования.
- Android SDK — руководство по использованию Android SDK для API ВКонтакте.

## Возможности SDK

### Авторизация через официальное приложение ВКонтакте

Предложите пользователю использовать уже существующий аккаунт — это гораздо проще, чем заполнять форму регистрации, а все необходимые данные вы сможете получить из его профиля в ВК.

### Публикация контента

Реализуйте возможность делиться с друзьями ВКонтакте интересными событиями, фотографиями, видео — и ваш продукт не останется незамеченным.

### Доступ к социальному графу

Работайте со связями и предпочтениями ваших клиентов. Анализируя список друзей и сообществ, вы можете индивидуально оценить потребности пользователя.

#### А еще?

Аудио, видео, администрирование сообществ, лента новостей, месседжинг — практически все, что доступно в полной версии ВКонтакте, можно реализовать средствами нашего API и используя SDK.

## Примеры использования

## Подготовка к использованию

Перед началом работы с VK SDK необходимо создать Standalone-приложение.

Сохраните ID вашего приложения и заполните поля «Название пакета для Android», «Main Activity для Android», «Отпечаток сертификата для Android».

### Отпечаток сертификата

Для получения отпечатка вашего сертификата можно воспользоваться одним из следующих способов:

Получение отпечатка с помощью `keytool`

Необходимо определить местоположение хранилища для приложения. Хранилище ключей для отладки ( `debug`) обычно находится в одной из этих директорий:

```
~/.android/ для OS X и Linux
```

```
C:\Documents and Settings\<user>\.android\ для Windows XP,
```

```
C:\Users\<user>\.android\ для Windows Vista, Windows 7 и Windows 8.
```

Хранилище для release версии обычно создаётся разработчиком, поэтому вы должны сами создать или вспомнить его расположение.

После того как вы определили местоположение вашего хранилища, используйте утилиту `keytool` (поставляемую совместно с Java SDK). Получите список ключей следующей командой:

```
keytool -exportcert -alias androiddebugkey -keystore path-to-debug-or-
production-keystore -list -v
```

Вы должны увидеть нечто вроде:

```
Certificate fingerprint: SHA1:
DA:39:A3:EE:5E:6B:4B:0D:32:55:BF:EF:95:60:18:90:AF:D8:07:09
```

Удалив все двоеточия, вы получите отпечаток своего ключа.

#### Получение отпечатка с помощью SDK

Если вы уже добавили SDK в свой проект, можно использовать следующую функцию в любой Activity вашего приложения.

```
String[] fingerprints = VKUtils.getCertificateFingerprint(this,
this.getPackageName());
```

Как правило, `fingerprints` содержит одну строку, которая будет отпечатком вашего сертификата (в зависимости от того, каким сертификатом было подписано приложение).

#### Получение отпечатка через Android Studio

Нажмите в правом меню на вкладку Gradle (или двойное нажатие Shift и впишите Gradle). Откройте папку root вашего проекта, далее откройте Tasks и затем android. Запустите задачу

`signingReport`. Найдите ваш отпечаток SHA1 на вкладке Run.

В настройках приложения можно добавить несколько отпечатков, например, `debug` и

`release`.

## Подключение в приложении

Мы отдаём предпочтение Android Studio, поэтому ориентируемся, в первую очередь, на него.

### Подключение как артефакт Maven

[android-sdk-core](https://search.maven.org/search?q=g:%22com.vk%22%20AND%20a:%22android-sdk-core%22) on Maven. Вы можете добавить следующие зависимости в ваш файл project/build.gradle:

- android-sdk-core: базовая функциональность (обязательно).
- android-sdk-api: сгенерированные модели и методы.
- androidsdk: устаревшая копия android-sdk-core (будет удалена).
- androidsdkapi: устаревшая копия android-sdk-api (будет удалена).

К примеру, ваш скрипт app/build.gradle будет содержать следующие зависимости:

#### maven

```
dependencies {
    implementation 'com.vk:android-sdk-core:4.1.0',
    implementation 'com.vk:android-sdk-api:4.1.0'
}
```

Старые версии SDK вы можете найти [здесь](https://github.com/VKCOM/vk-android-sdk/releases/tag/1.6.7).

## Работа с SDK

### Инициализация SDK

1. Добавьте разрешение в `AndroidManifest.xml`

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

2. Добавьте это в файл ресурсов (например `strings.xml`)

```xml
<integer name="com_vk_sdk_AppId">your_app_id</integer>
```

### Авторизация пользователя

Если у пользователя установлено приложение ВКонтакте, то авторизация пройдет через него без ввода логина и пароля.

Используйте метод VK.login

```kotlin
VK.login(activity, arrayListOf(VKScope.WALL, VKScope.PHOTOS))
```

Переопределите `onActivityResult`:

```kotlin
override fun onActivityResult(requestCode: Int, resultCode: Int, data:
Intent?) {
val callback = object: VKAuthCallback {
override fun onLogin(token: VKAccessToken) {
// User passed authorization
}
override fun onActivityResult(requestCode: Int, resultCode: Int, data:
Intent?) {
        val callback = object: VKAuthCallback {
            override fun onLogin(token: VKAccessToken) {
                // User passed authorization
            }
```

```
            override fun onLoginFailed(errorCode: Int) {
                // User didn't pass authorization
            }
        }
        if (data == null || !VK.onActivityResult(requestCode, resultCode,
data, callback)) {
            super.onActivityResult(requestCode, resultCode, data)
        }
    }
```

Если у пользователя не установлено приложение ВКонтакте, то SDK будет использовать авторизацию через новую `Activity` при помощи `OAuth`.

### Обработка авторизации токена

Создайте экземпляр `VKTokenExpiredHandler`:

```kotlin
class SampleApplication: Application() {
    override fun onCreate() {
        super.onCreate()
        VK.addTokenExpiredHandler(tokenTracker)
    }
```

```
    private val tokenTracker = object: VKTokenExpiredHandler {
        override fun onTokenExpired() {
            // token expired
        }
    }
}
```

## Вызов методов API

Для доступа к API можно использовать как встроенные в SDK методы, так и свою библиотеку после получения ключа доступа.

Выполняйте запросы с VK.execute:

```kotlin
VK.execute(UsersGet(), object: VKApiCallback<List<UsersUserXtrCounters>> {
    override fun success(result: List<UsersUserXtrCounters>) {
    }
    override fun fail(error: VKApiExecutionException) {
    }
})
```

Если вы используете RxJava в вашем проекте, вы можете сделать что-то вроде этого:

```kotlin
Observable.fromCallable {
    VK.executeSync(VKUsersRequest())
}
    .subscribeOn(Schedulers.single())
    .observeOn(AndroidSchedulers.mainThread())
    .subscribe({
        // response here
    }, {
        // throwable here
    })
```

Если вам нужен более сложный запрос, вам нужно переопределить ApiCommand. Этот подход позволит вам осуществлять множество запросов сразу.

```kotlin
class VKUsersCommand(private val uids: IntArray = intArrayOf()):
ApiCommand<List<VKUser>>() {
    override fun onExecute(manager: VKApiManager): List<VKUser> {
```

```
    if (uids.isEmpty()) {
        // if no uids, send user's data
        val call = VKMethodCall.Builder()
                .method("users.get")
                .args("fields", "photo_200")
                .version(manager.config.version)
                .build()
        return manager.execute(call, ResponseApiParser())
    } else {
        val result = ArrayList<VKUser>()
        val chunks = uids.toList().chunked(CHUNK_LIMIT)
        for (chunk in chunks) {
            val call = VKMethodCall.Builder()
                    .method("users.get")
                    .args("user_ids", chunk.joinToString(","))
                    .args("fields", "photo_200")
                    .version(manager.config.version)
                    .build()
            result.addAll(manager.execute(call, ResponseApiParser()))
        }
        return result
    }
}
```

```
companion object {
    const val CHUNK_LIMIT = 900
}
```

```
    private class ResponseApiParser : VKApiResponseParser<List<VKUser>> {
        override fun parse(response: String): List<VKUser> {
            try {
                val ja = JSONObject(response).getJSONArray("response")
                val r = ArrayList<VKUser>(ja.length())
                for (i in 0 until ja.length()) {
                    val user = VKUser.parse(ja.getJSONObject(i))
                    r.add(user)
                }
                return r
            } catch (ex: JSONException) {
                throw VKApiIllegalResponseException(ex)
            }
        }
    }
}
```

`VKUsersCommand` поддерживает разделение на куски для работы с лимитами API. В этом основное отличие `VKUsersRequest` от `VKUsersCommand`.

Также вы можете проверить [`VKWallPostCommand`](https://github.com/VKCOM/vk-android-sdk/blob/master/samples/app/src/main/java/com/vk/sdk/sample/requests/VKWallPostCommand.kt). Это пример сложного API-запроса с загрузкой файла.

### Подготовка запросов

1. Простой запрос.

```
VKRequest request = VKApi.users().get();
```

2. Запрос с параметрами.

```
VKRequest request =
VKApi.users().get(VKParameters.from(VKApiConst.USER_IDS, "1,2"));
```

3. Вариант с http загрузкой (если при авторизации в `scope` был передан `VK_PER_NOHTTPS`).

```
VKRequest request =
VKApi.users().get(VKParameters.from(VKApiConst.USER_IDS, "1,2"));
request.secure = NO;
```

4. Запрос с количеством повторений.

```
VKRequest request =
VKApi.wall().post(VKParameters.from(VKApiConst.OWNER_ID, "-60479154",
VKApiConst.MESSAGE, "Привет, друзья!"));
request.attempts = 10;
//or infinite
//postReq.attempts = 0;
```

Будет выполнено 10 запросов, пока не произойдет успех, или не будет возвращен API error.

1. Загрузка произвольного [метода API](https://dev.vk.ru/ru/method) (нужно иметь в виду полученный [`scope`](https://dev.vk.ru/ru/api/privacy#%D0%9F%D1%80%D0%B0%D0%B2%D0%B0%20%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0)).

```
VKRequest request = new VKRequest("friends.get",
VKParameters.from(VKApiConst.FIELDS, "sex,bdate,city"));
```

2. [Загрузка фото](https://dev.vk.ru/ru/api/upload/overview) на сервера VK.

```
final Bitmap photo = getPhoto();
VKRequest request = VKApi.uploadWallPhotoRequest(new VKUploadImage(photo,
VKImageParameters.jpgImage(0.9f)), 0, 60479154);
```

### Отправка запроса

```
request.executeWithListener(new VKRequestListener() {
@Override
public void onComplete(VKResponse response) {
//Do complete stuff
}
@Override
public void onError(VKError error) {
//Do error stuff
}
@Override
public void attemptFailed(VKRequest request, int attemptNumber, int
totalAttempts) {
//I don't really believe in progress
}
});
```

### Пакетная обработка запросов

SDK предусматривает возможность выполнения нескольких методов в один запрос.

1. Подготавливаются необходимые запросы:

```
VKRequest request1 = VKApi.uploadWallPhotoRequest(new VKUploadImage(photo1,
VKImageParameters.jpgImage(0.9f)), 0, 60479154);
VKRequest request2 = VKApi.uploadWallPhotoRequest(new VKUploadImage(photo2,
VKImageParameters.jpgImage(0.5f)), 0, 60479154);
VKRequest request3 = VKApi.uploadWallPhotoRequest(new VKUploadImage(photo3,
VKImageParameters.jpgImage(0.1f)), 0, 60479154);
VKRequest request4 = VKApi.uploadWallPhotoRequest(new VKUploadImage(photo4,
VKImageParameters.pngImage()), 0, 60479154);
```

2. Необходимые запросы объединяются в один.

```
VKBatchRequest batch = new VKBatchRequest(request1, request2, request3,
request4);
```

3. Запрос загружается стандартным путём.

```
batch.executeWithListener(new VKBatchRequestListener() {
@Override
public void onComplete(VKResponse[] responses) {
super.onComplete(responses);
String[] photos = new String[responses.length];
for (int i = 0; i < responses.length; i++) {
VKPhoto photoModel = ((VKPhotoArray) responses[i].parsedModel).get(0);
photos[i] = String.format("photo%s_%s", photoModel.owner_id,
photoModel.id);
}
makePost(VKStringJoiner.join(photos, ","));
}
```

```
@Override
public void onError(VKError error) {
showError(error);
}
});
```
