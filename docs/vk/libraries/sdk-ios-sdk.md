# iOS SDK

**Раздел:** Библиотеки → SDK → iOS SDK  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Начало работы — iOS

Ваша аудитория — это 20 миллионов активных пользователей ВКонтакте, которые предпочитают iOS, ежемесячно.

Вы можете создать совершенно новый продукт или добавить возможности ВКонтакте в уже существующее приложение, чтобы повысить активность пользователей.

SDK поможет быстро интегрировать API ВКонтакте в приложение для iOS.

SDK упрощает использование API ВКонтакте в iOS-приложениях. Пользователи смогут пройти авторизацию без ввода логина и пароля. После этого вы сможете сразу начать использовать методы API.

## Документация

- [Знакомство с API](https://dev.vk.ru/ru/api/getting-started) — если вы ранее не имели дела с API ВКонтакте, перед началом работы мы рекомендуем узнать об основных принципах его использования.
- iOS SDK — руководство по использованию iOS SDK для API ВКонтакте.
- [Игровая платформа](https://dev.vk.ru/ru/games/overview) — руководство по созданию игр для ВКонтакте.

## Возможности SDK

### Авторизация через официальное приложение ВКонтакте

Предложите пользователю использовать уже существующий аккаунт — это гораздо проще, чем заполнять форму регистрации, а все необходимые данные вы сможете получить из его профиля в ВК.

### Публикация контента

Реализуйте возможность делиться с друзьями ВКонтакте интересными событиями, фотографиями, видео — и ваш продукт не останется незамеченным.

### Доступ к социальному графу

Работайте со связями и предпочтениями ваших клиентов. Анализируя список друзей и сообществ, вы можете индивидуально оценить потребности пользователя.

#### А еще?

Аудио, видео, администрирование сообществ, лента новостей, месседжинг — практически все, что доступно в полной версии ВКонтакте, можно реализовать средствами нашего API и используя SDK.

Страница проекта и исходный код на GitHub: [https://github.com/VKCOM/vk-ios-sdk](https://github.com/VKCOM/vk-ios-sdk)

Поддерживаются версии iOS 8.0 и выше.

## Подготовка к использованию

Перед началом работы с VK SDK необходимо создать Standalone-приложение. Сохраните ваш ID приложения (в документации ему соответствует параметр `APP_ID`) и заполните поле «App Bundle для iOS».

### Настройка URL-схемы в iOS приложении

Для настройки авторизации через VK App необходимо настроить URL-схему вашего приложения. URL-схема должна иметь вид `_vk_+_APP_ID_` (например, `vk1234567`).

Подробную информацию о том, как это сделать, вы можете найти здесь:

- [App Programming Guide for iOS](https://developer.apple.com/library/ios/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/Inter-AppCommunication/Inter-AppCommunication.html#//apple_ref/doc/uid/TP40007072-CH6-SW10)
- [Twitter Developers Documentation](https://dev.twitter.com/cards/mobile/url-schemes)

## Изменения для iOS 9

В iOS 9 произошли изменения, связанные с общей политикой безопасности приложений и использованием незащищенных подключений. Если вы планируете использовать в своем приложении `scope = nohttps`, вам необходимо изменить настройки безопасности следующим образом (файл `Info.plist`):

```objc
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSExceptionDomains</key>
    <dict>
        <key>vk.com</key>
        <dict>
            <key>NSExceptionRequiresForwardSecrecy</key>
            <false/>
            <key>NSIncludesSubdomains</key>
            <true/>
            <key>NSExceptionAllowsInsecureHTTPLoads</key>
            <true/>
        </dict>
    </dict>
</dict>
```

Мы не рекомендуем использовать `scope=nohttps`.

Также для работы в iOS 9 вам необходимо добавить схемы, которые будут использоваться для

`canOpenUrl`. Добавьте в `Info.plist` ' следующее:

```objc
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>vk</string>
    <string>vk-share</string>
    <string>vkauthorize</string>
</array>
```

## Подключение в приложении

### Установка в CocoaPods

CocoaPods — это менеджер зависимостей для Objective-C, автоматизирующий и упрощающий процесс использования сторонних библиотек, таких как VK SDK. Более подробную информацию вы можете найти в руководстве [Getting Started](https://cocoapods.org/).

Добавьте в ваш Podfile следующее:

```objc
platform :ios, '8.0'
pod "VK-ios-sdk"
```

Затем импортируйте главный заголовочный файл:

```objc
#import <VKSdk.h>`
```

### Установка в [Carthage](https://github.com/Carthage/Carthage)

Только для iOS 8 и выше.

Добавьте в ваш Cartfile следующее:

```objc
github "VKCOM/vk-ios-sdk" >= 1.3.8
```

Инструкции по сборке Carthage вы можете найти [здесь](https://github.com/Carthage/Carthage#if-youre-building-for-ios).

Затем импортируйте главный заголовочный файл:

```objc
#import <VKSdkFramework/VKSdkFramework.h>
```

### Установка с использованием фреймворка

Если вы работаете с iOS 8 и выше, вы можете использовать Framework Target для SDK. Добавьте

`VK-ios-sdk.xcodeproj` в ваш проект в качестве подпроекта. Откройте ваш проект в XCode, затем перейдите на вкладку General → Найдите раздел Embedded Binaries → Нажмите Add items (значок плюс) → Выберите `VKSdkFramework.framework` из проекта `VK-ios-sdk`, и, наконец, импортируйте главный заголовочный файл:

```objc
#import <VKSdkFramework/VKSdkFramework.h>
```

Исходный код на [GitHub](https://github.com/VKCOM/vk-ios-sdk).

## Работа с SDK

### Инициализация SDK

1. Поместите этот код в метод делегата приложения:

```objc
//iOS 9 workflow
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:
(NSDictionary<NSString *,id> *)options {
    [VKSdk processOpenURL:url
fromApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]];
    return YES;
}
```

```
//iOS 8 and lower
-(BOOL)application:(UIApplication *)application openURL:(NSURL *)url
sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
    [VKSdk processOpenURL:url fromApplication:sourceApplication];
    return YES;
}
```

Обратите внимание: если вы уже используете Facebook SDK, и один из этих методов возвращает `[FBSDKDelegate...]`, вы можете решить эту проблему следующим образом:

```objc
-(BOOL)application:(UIApplication *)application openURL:(NSURL *)url
sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
[[FBSDKApplicationDelegate sharedInstance] application:application
openURL:url sourceApplication:sourceApplication annotation:annotation];
    [VKSdk processOpenURL:url fromApplication:sourceApplication];
    return YES;
}
```

2. Инициализируйте SDK с помощью своего `APP_ID` для любого делегата:

```objc
[VKSdk initializeWithDelegate:delegate andAppId:YOUR_APP_ID];
```

[Описание методов делегата](https://vkcom.github.io/vk-ios-sdk/Protocols/VKSdkDelegate.html)

Начиная с версии 1.3, доступны два типа делегатов: `common delegate` и `UI delegate`. Вы можете зарегистрировать столько common делегатов, сколько необходимо, но UI делегат должен быть единственным. После инициализации SDK вы можете регистрировать делегатов по отдельности:

#### Objective C

```objc
[sdkInstance registerDelegate:delegate];
[sdkInstance setUiDelegate:uiDelegate];
```

или

```objc
[[VKSdk initializeWithAppId:APP_ID] registerDelegate:delegate];
```

Вы можете найти полное описание протоколов `VKSdkDelegate` и `VKSdkUIDelegate` [здесь](https://cocoadocs.org/docsets/VK-ios-sdk/1.3.17/) или [здесь](https://vkcom.github.io/vk-ios-sdk/index.html)

3. Вам необходимо проверить, доступна ли предыдущая сессия, для этого используйте вызов асинхронного метода `wakeUpSession:completeBlock`:

```objc
NSArray *SCOPE = @[@"friends", @"email"];
```

```
[VKSdk wakeUpSession:SCOPE completeBlock:^(VKAuthorizationState state,
NSError *error) {
    if (state == VKAuthorizationAuthorized) {
        // Authorized and ready to go
    } else if (error) {
        // Some error happend, but you may try later
    }
}];
```

Полный список доступных `scope` вы можете найти на [этой странице](https://dev.vk.ru/ru/api/privacy#%D0%9F%D1%80%D0%B0%D0%B2%D0%B0%20%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0).

Проверьте значение параметра `VKAuthorizationState`. Вы можете получить одно из следующих состояний:

## • `VKAuthorizationInitialized` — означает, что SDK готов к работе, и вы можете авторизовать пользователя с помощью метода `+authorize:`. Возможно, старая сессия истекла и мы уничтожили ее. Это не ошибка. • `VKAuthorizationAuthorized` — означает, что с предыдущей сессией все в порядке и вы можете продолжить работу с данными пользователя. • `VKAuthorizationError` — означает, что во время проверки произошла ошибка. Возможно, слишком плохое качество соединения с Интернетом. Нужно повторить попытку позже.

```objc
[VKSdk wakeUpSession:SCOPE completeBlock:^(VKAuthorizationState state, NSError
*err) {
       if (state == VKAuthorizationAuthorized) {
           // authorized
         } else {
           // auth needed
         }
}];
```

## Авторизация пользователя

Если у пользователя установлено приложение ВКонтакте, то авторизация пройдет через него без ввода логина и пароля. Иначе откроется веб-интерфейс.

Для авторизации можно использовать метод

```objc
[VKSdk authorize:scope];
```

За авторизацию отвечает делегат:

```objc
- (void)vkSdkAccessAuthorizationFinishedWithResult:(VKAuthorizationResult
*)result
```

В случае успеха будет получен токен для работы с API:

```objc
if (result.token) {
// Пользователь успешно авторизован
} else if (result.error) {
// Пользователь отменил авторизацию или произошла ошибка
}
```

## Вызов методов API

Для доступа к API можно использовать как встроенные в SDK методы, так и свою библиотеку после получения ключа доступа.

### Подготовка запросов

1. Простой запрос.

```objc
VKRequest * audioReq = [[VKApi users] get];
```

2. Запрос с параметрами

```
VKRequest * audioReq = [[VKApi audio] get:@{VK_API_OWNER_ID : @"896232"}];
```

3. Запрос с заданным максимальным числом попыток.

```objc
VKRequest * postReq = [[VKApi wall] post:@{VK_API_MESSAGE : @"Test"}];
postReq.attempts = 10;
//or infinite
//postReq.attempts = 0;
```

Будет предпринято до 10 попыток, пока не выполнится успешно, или не будет возвращена API error.

4. Вызов метода ВК API.

```objc
VKRequest * getWall = [VKRequest requestWithMethod:@"wall.get"
andParameters:@{VK_API_OWNER_ID : @"-1"} andHttpMethod:@"GET"];
```

5. Загрузка фото на стену пользователя.

```
VKRequest * request = [VKApi uploadWallPhotoRequest:[UIImage
imageNamed:@"my_photo"] parameters:[VKImageParameters pngImage]
userId:0 groupId:0];
```

### Отправка запроса

```objc
[audioReq executeWithResultBlock:^(VKResponse * response) {
       NSLog(@"Json result: %@", response.json);
} errorBlock:^(NSError * error) {
       if (error.code != VK_API_ERROR) {
             [error.vkError.request repeat];
       }
      else {
             NSLog(@"VK error: %@", error);
       }
}];
```

### Обработка ошибок

Ошибки `NSError`, возвращаемые SDK, могут быть двух видов: ошибки сети и внутренние ошибки SDK (например, запрос отменён). Категория `NSError+VKError` дополняет класс `NSError` свойством `vkError`, которое можно проанализировать на предмет произошедшей ошибки.

При проверке ошибок следует сначала проверить `code` на совпадение с глобальной константой

`VK_API_ERROR`. Если это так, то необходимо обрабатывать поле `vkError`, которое содержит описание ошибки VK API. В противном случае вы имеете дело с сетевой ошибкой.

Некоторые ошибки SDK может обработать сам (ошибка капчи, ошибка валидации). Для этого у делегата будут вызваны соответствующие методы.

Пример обработки в делегате ошибки, для которой требуется ввод капчи:

```objc
- (void)vkSdkNeedCaptchaEnter:(VKError *)captchaError
{
    VKCaptchaViewController *vc = [VKCaptchaViewController
captchaControllerWithError:captchaError];
    [vc presentIn:self];
}
```

### Пакетная обработка запросов

SDK предусматривает возможность выполнения нескольких методов в один запрос.

1. Подготавливаются необходимые запросы:

```objc
VKRequest * request1 = [[VKApi audio] get];
 request1.completeBlock = ^(VKResponse*) { ... };
```

```
VKRequest * request2 = [[VKApi users] get:@{VK_USER_IDS : @[@(1), @(6492),
@(1708231)]}];
request2.completeBlock = ^(VKResponse*) { ... };
```

2. Необходимые запросы объединяются в один.

```objc
VKBatchRequest * batch = [[VKBatchRequest alloc] initWithRequests:request1,
request2, nil];
```

3. Запрос загружается стандартным путём.

```objc
[batch executeWithResultBlock:^(NSArray *responses) {
        NSLog(@"Responses: %@", responses);
 } errorBlock:^(NSError *error) {
        NSLog(@"Error: %@", error);
 }];
```

4. Для каждого метода результат будет возвращён в `completeBlock`, а `batch` будет содержать `VKResponse` для каждого метода в порядке их добавления.

## Публикация записей

SDK позволяет опубликовать запись на стене пользователя ВКонтакте двумя способами: с помощью диалога Share и прямым вызовом метода [`wall.post`](https://dev.vk.ru/ru/method/wall.post) [.](https://dev.vk.ru/ru/method/wall.post)

### Работа с диалогом Share

SDK позволяет создать удобный диалог, чтобы поделиться текстом или фотографиями из приложения напрямую в VK.

1. Создайте экземпляр контроллера диалога обычным способом.

```objc
VKShareDialogController * shareDialog = [VKShareDialogController new];
```

2. Добавьте текстовую информацию в диалог. Обратите внимание, что пользователи смогут её изменять.

#### Objective C

```objc
shareDialog.text = @"This post created using #vksdk #ios";
```

3. Прикрепите изображения, ранее загруженные в VK. Если вы хотите, чтобы пользователь загрузил новое изображение, используйте свойство uploadImages.

```objc
shareDialog.vkImages =
@[@"-10889156_348122347",@"7840938_319411365",@"-60479154_333497085"];
```

4. Прикрепите ссылку на нужную страницу

```objc
shareDialog.shareLink = [[VKShareLink alloc] initWithTitle:@"Super puper
link, but nobody knows" link:[NSURL
URLWithString:@"https://vk.com/dev/ios_sdk"]];
```

5. Добавьте блок, отслеживающий завершение диалога.

```objc
[shareDialog setCompletionHandler:^(VKShareDialogControllerResult result) {
    [self dismissViewControllerAnimated:YES completion:nil];
}];
```

6. Презентуйте контроллер диалога в вашем контроллере.

```objc
[self presentViewController:shareDialog animated:YES completion:nil];
```

### Работа с UIActivityViewController

SDK содержит специальный класс для работы с `UIActivityViewController` — `VKActivity`.

1. Подготовьте информацию, которой пользователь должен поделиться: `UIImage`, `NSString` и `NSURL`.

```objc
NSArray *items = @[[UIImage imageNamed:@"apple"], @"Check out information
about VK SDK" , [NSURL URLWithString:@"https://vk.com/dev/ios_sdk"]];
```

2. Подготовьте `UIActivityViewController` с новым экземпляром `VKActivity`.

```objc
UIActivityViewController *activityViewController =
[[UIActivityViewController alloc]
 initWithActivityItems:items
 applicationActivities:@[ [VKActivity new] ] ];
```

3. Установите дополнительные необходимые свойства для `activityViewController`.

#### Objective C

```objc
[activityViewController setValue:@"VK SDK" forKey:@"subject"];
```

4. Установите обработчик завершения для `activityViewController`, если требуется.

```objc
[activityViewController setCompletionHandler:nil];
```

5. Если используется iOS 8 или выше, и если пользователь использует iPad, необходимо отобразить контроллер во всплывающем окне ( `popover`), иначе получите системную ошибку.

```objc
if (VK_SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO(@"8.0") &&
UIUserInterfaceIdiomPad == [[UIDevice currentDevice] userInterfaceIdiom]) {
   UIPopoverPresentationController *popover =
activityViewController.popoverPresentationController;
   popover.sourceView = self.view;
   popover.sourceRect = [tableView rectForRowAtIndexPath:indexPath];
   }
```

6. Презентуйте контроллер обычным способом.

```objc
[self presentViewController:activityViewController animated:YES
completion:nil];
```

### Работа с wall.post

Вы можете опубликовать запись через обычный вызов [`wall.post`](https://dev.vk.ru/ru/method/wall.post) [.](https://dev.vk.ru/ru/method/wall.post)

Пример кода для загрузки фотографии на сервер ВКонтакте и публикации записи на стене пользователя с этой фотографией:

```objc
VKRequest *photoRequest = [VKApi uploadWallPhotoRequest:[UIImage
imageNamed:@"sliced_truffles"] parameters:[VKImageParameters pngImage]
userId:user.id.integerValue groupId:0];
[photoRequest executeWithResultBlock: ^(VKResponse *response) {
NSLog(@"Photo: %@", response.json);
VKPhoto *photoInfo = [(VKPhotoArray *)response.parsedModel objectAtIndex:0];
VKRequest *post = [­[VKApi wall] post:@{ VK_API_ATTACHMENTS : [NSString
stringWithFormat:@"photo%@_%@", photoInfo.owner_id, photoInfo.id]}];
[post executeWithResultBlock: ^(VKResponse *response) {
NSLog(@"Result: %@", response);
} errorBlock: ^(NSError *error) {
NSLog(@"Error: %@", error);
}];
} errorBlock: ^(NSError *error) {
NSLog(@"Error: %@", error);
}];
```
