# Подключение

**Раздел:** VK Captcha → iOS → Подключение  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Установка и подключение VK ID Captcha SDK iOS

В этой инструкции описано, как установить и подключить VK ID Captcha SDK для платформы iOS, а также как настроить отображение капчи и обработку результатов.

Перед началом работы ознакомьтесь со [сценарием взаимодействия](https://dev.vk.ru/ru/vkcaptcha/iOS/scenario) с VK ID Captcha и требованиями к программному обеспечению.

Затем интегрируйте VK ID Captcha SDK iOS:

1. Установите библиотеку `VKCaptchaSDK`.

2. Подключите библиотеку  `VKCaptchaSDK`  к своему проекту.

3. Отобразите капчу.

4. Добавьте токен успешного прохождения капчи в запрос к API ВКонтакте.

## Требования к программному обеспечению

| Программное обеспечение | Версия |
|---|---|
| iOS | 12 или новее |
| Swift Package Manager | 5.9 или новее |
| Xcode | 16.2 или новее |
| CocoaPods | 1.13 или новее |

## Шаг 1. Установка

Вы можете установить библиотеку `VKCaptchaSDK` с помощью одного из менеджеров зависимостей: Swift Package Manager или CocoaPods.

### Swift Package Manager

1. Добавьте библиотеку `VKCaptchaSDK` в зависимости в ваш `Package.swift`:

```swift
dependencies: [
        .package(url: "https://github.com/VKCOM/vkid-captcha-ios-sdk",
.upToNextMajor(from: "0.1.0"))
  ]
```

2. Скачайте и распакуйте ZIP-архив по ссылке: `https://artifactory-` `external.vkpartner.ru/artifactory/vk-id-captcha/ios/VKCaptchaSDK-0.1.0.zip`.

3. Добавьте в ваш проект распакованный файл `VKCaptchaSDKResources.bundle`.

### CocoaPods

1. Добавьте библиотеку `VKCaptchaSDK` в ваш `Podfile`:

```ruby
source 'https://github.com/VKCOM/vkid-captcha-ios-sdk.git'
pod 'VKCaptchaSDK', '~> 0.1.1'
```

2. Выполните команду, чтобы установить зависимости:

```ruby
pod install --repo-update
```

## Шаг 2. Подключение

После установки библиотеки `VKCaptchaSDK`:

1. Импортируйте библиотеку `VKCaptchaSDK` туда, где будете работать с капчей:

```swift
import VKCaptchaSDK
```

2. Инициализируйте класс `VKCaptchaHandler`  и его экземпляр:

```swift
let configuration = VKCaptchaHandler()
```

## Шаг 3. Отображение капчи

Отобразите всплывающее окно капчи одним из трёх способов:

## • С помощью метода  `handleCaptcha()` (рекомендуется) — класс `VKCaptchaHandler` самостоятельно управляет всей логикой обработки ошибки капчи от API ВКонтакте и отображает окно капчи. Смотрите также пример обработки капчи для `URLSession`. • С помощью метода `getCaptchaViewController()` — класс `VKCaptchaHandler`  возвращает окно капчи. Вам требуется отобразить её самостоятельно — может понадобиться, если нужна своя логика показа капчи. Чтобы получить данные для отображения, воспользуйтесь методом

`handleCaptchaData()`.
- C помощью метода `openCaptcha()`  — окно капчи будет отображено с помощью протокола

`VKCaptchaPresenter`. Чтобы получить данные для отображения, воспользуйтесь методом `handleCaptchaData()`.

Важно! Вызывайте методы `handleCaptcha()`, `getCaptchaViewController()`,

`openCaptcha()` только в потоке `MainThread`.

### handleCaptcha() (рекомендуется)

Метод `handleCaptcha()` проверяет ответ от API ВКонтакте и отображает капчу при необходимости.

Вы можете отобразить капчу одним из следующих способов:

- Воспользуйтесь классом `VKCaptchaNewUIWindowPresenter()` (по умолчанию), если нужно отобразить капчу на новом экране приложения.
- Воспользуйтесь классом `VKCaptchaPresenterDefault()`, если нужно отобразить капчу на том же экране приложения, с которого пользователь инициировал своё действие.
- Создайте свой класс, который поддерживает протокол  `VKCaptchaPresenter` — может понадобиться, если нужна своя логика показа капчи.

Смотрите также пример обработки капчи для `URLSession`.

При использовании `VKCaptchaNewUIWindowPresenter()` капча отобразится на новом экране

`UIWindow`.

Пример кода с `VKCaptchaNewUIWindowPresenter()`

```swift
captchaHandler.handleCaptcha(
 from: data,     // ответ сервера
    responseHeaders: headers,  // заголовки ответа от сервера
 domain: domain,    // домен, для которого выполнен запрос
 with: VKCaptchaNewUIWindowPresenter(), // отображение капчи
 completion: { result in
     switch result {
            case .success(let token):
  // логика работы при наличии токена успешного прохождения капчи
            case .failure(let error):
  // логика работы при ошибке
        }
 }
)
```

При использовании класса `VKCaptchaPresenterDefault()` передайте в нём контроллер, который будет отображать окно капчи.

Пример кода с `VKCaptchaPresenterDefault()`

```swift
let presenter = VKCaptchaPresenterDefault(presentingViewController: self)
captchaHandler.handleCaptcha(
 from: data,     // ответ сервера
    responseHeaders: headers,  // заголовки ответа от сервера
 domain: domain,    // домен, для которого выполнен запрос
 with: presenter,    // отображение капчи
 completion: { result in
     switch result {
            case .success(let token):
  // логика работы при наличии токена успешного прохождения капчи
            case .failure(let error):
  // логика работы при ошибке
        }
 }
)
```

getCaptchaViewController()

Получите окно капчи с помощью метода `getCaptchaViewController()` и отобразите его. Чтобы получить данные для отображения, воспользуйтесь методом `handleCaptchaData()`.

Пример кода с `getCaptchaViewController()`

```swift
let controller = captchaHandler.getCaptchaViewController(
    captchaData: captchaData, // данные для отображения капчи, полученные
методом handleCaptchaData()
   completion: { result in
            switch result {
            case .success(let token):
  // логика работы при наличии токена успешного прохождения капчи
            case .failure(let error):
                logError(.captcha, error.localizedDescription)
  // логика работы при ошибке
         }
})
present(controller, animated: true)
```

openCaptcha()

При использовании этого метода окно капчи будет отображено с помощью протокола

`VKCaptchaPresenter`. Чтобы получить данные для отображения, воспользуйтесь методом `handleCaptchaData()`.

Пример кода с `openCaptcha()`

```swift
let controller = captchaHandler.openCaptcha(
    captchaData: captchaData, // данные для отображения капчи, полученные
методом handleCaptchaData()
   presenter: VKCaptchaNewUIWindowPresenter(), // отображение капчи
    completion: { result in
            switch result {
            case .success(let token):
  // логика работы при наличии токена успешного прохождения капчи
            case .failure(let error):
                logError(.captcha, error.localizedDescription)
  // логика работы при ошибке
         }
})
present(controller, animated: true)
```

Получение данных капчи с помощью  `handleCaptchaData()`

Чтобы получить данные капчи, воспользуйтесь методом  `handleCaptchaData()`.

Пример кода с  `handleCaptchaData()`

```swift
let result = captchaHandler.handleCaptchaData(
  from: data,     // ответ сервера
  responseHeaders: headers,  // заголовки ответа от сервера
 domain: domain,    // домен, для которого выполнен запрос
)
if case .failure(.noCaptcha) = result {
    // логика обработки ответа сервера
} else if case .success(let captchaData) = result {
    // логика отображения капчи с предоставленными данными
} else if case .failure(let error) = result {
    // ошибка анализа ответа сервера
```

## Шаг 4. Добавление токена в запрос к API ВКонтакте

В случае успешного прохождения капчи вы получите токен `VKCaptchaToken`.

Токен может быть двух типов, для каждого из которых есть свой вариант добавления токена в запрос:

- `domain` — метод `addDomainCaptcha()`.
- `default` — метод `addDefaultCaptcha()`.

Чтобы добавить токен в запрос, вызовите  `addCaptchaToken`  с параметром  `VKCaptchaToken`.

Если вы получили ошибку `AddingCaptchaTokenError`, добавить токен не удалось. Проверьте запрос и попробуйте ещё раз.

Пример добавления токенов в запрос для `URLRequest`

```swift
urlRequest.addCaptchaToken(token: token)
```

```swift
extension URLRequest {
    public enum AddingCaptchaTokenError: Error {
        case urlError
    }
```

```
public mutating func addCaptchaToken(token: VKCaptchaToken) throws {
    switch token.type {
    case .domain:
        addDomainCaptcha(token: token.value)
    case .default:
        try addDefaultCaptcha(token: token.value)
    }
}
```

```
    public mutating func addDomainCaptcha(token: String) {
        setValue(token, forHTTPHeaderField:
VKCaptchaConstants.domainCaptchaHeaderName)
    }
```

```
    public mutating func addDefaultCaptcha(token: String) throws {
        guard let url else {
            throw AddingCaptchaTokenError.urlError
        }
        var components = URLComponents(url: url, resolvingAgainstBaseURL:
false)
        components?.queryItems?.append(
            .init(name: VKCaptchaConstants.defaultCaptchaParamName, value:
token)
        )
        self.url = components?.url
    }
}
```

## Пример обработки капчи для `URLSession`

```swift
let urlSession = URLSession()
let captchaHandler = VKCaptchaHandler()
```

```
private func execute(
    _ urlRequest: URLRequest
) {
    let task = self.urlSession.dataTask(
        with: urlRequest
    ) { data, response, error in
        let domain: String
        if #available(iOS 16.0, *) {
            domain = urlRequest.url?.host() ?? ""
        } else {
            domain = urlRequest.url?.host ?? ""
        }
        DispatchQueue.main.async {
            captchaHandler.handleCaptcha(
                from: data, // ответ сервера
                responseHeaders: (response as?
HTTPURLResponse)?.allHeaderFields, // заголовки, полученные в ответе от
сервера
                domain: domain // домен, на котором выполнялся запрос
            ) { result in
                if case .failure(.noCaptcha) = result {
                    // обработка ответа от сервера
                } else if case .success(let captchaToken) = result {
                    var newRequest = urlRequest
                    do{
                        try newRequest.addCaptchaToken(token: captchaToken)
                        // повторное выполнение запроса
                    } catch let error as URLRequest.AddingCaptchaTokenError {
                        // обработка ошибки добавления токена капчи
                    }
                } else if case .failure(let error) = result {
                    // обработка ошибки капчи
                }
            }
        }
    }
    task.resume()
}
```

## Классы, методы, протоколы (справочник)

- `VKCaptchaHandler`  — основной класс для работы:

- `VKCaptchaHandler.handleCaptcha()` — полная обработка капчи: анализ ответа сервера, показ капчи, анализ и отображение результата.
- `VKCaptchaHandler.handleCaptchaData()` — получение данных капчи.
- `VKCaptchaHandler.openCaptcha()` — отображение капчи.
- `VKCaptchaHandler.getCaptchaViewController()` — получение окна капчи.
- `getDomainToken()` — метод получения `domain` токена для определенного домена.
- `VKCaptchaPresenter` — протокол для отображения капчи.
- `VKCaptchaData` — данные для отображения капчи.
- `VKCaptchaType` — тип капчи. Может быть двух типов: `domain`, `default`.
- `VKCaptchaToken` — результат прохождения капчи. Может быть двух типов: `domain`, `default`.
- `VKCaptchaConstants` — константы, необходимые для работы с капчей.
- `CaptchaHandlingError` — ошибки капчи.

VKCaptchaHandler

`VKCaptchaHandler` — основной класс для работы с капчей.

#### Схема класса

```swift
public final class VKCaptchaHandler {
    func handleCaptcha(
        from response: Data?, // ответ сервера
        responseHeaders: [AnyHashable: Any]?, // заголовки ответа от сервера
        domain: String, // домен, для которого выполнен запрос
        with presenter: VKCaptchaPresenter = VKCaptchaNewUIWindowPresenter(),
// отображение капчи
        completion: @escaping (Result<VKCaptchaToken, CaptchaHandlingError>) -
> Void  // логика работы при наличии токена и при отсутствии
    )
```

```
    func handleCaptchaData(
        from response: Data?, // ответ сервера
        responseHeaders: [AnyHashable: Any]?, // заголовки ответа от сервера
        domain: String  // домен, для которого выполнен запрос
    ) -> Result<VKCaptchaData, CaptchaHandlingError> // логика обработки
ответа сервера и отображения капчи
```

```
    func openCaptcha(
        captchaData: VKCaptchaData, // данные для отображения капчи,
полученные методом handleCaptchaData()
        presenter: VKCaptchaPresenter = VKCaptchaNewUIWindowPresenter(), //
отображение капчи
        completion: @escaping (Result<VKCaptchaToken, CaptchaHandlingError>) -
> Void // логика работы
    )
```

```
    func getCaptchaViewController(
        captchaData: VKCaptchaData, // данные для отображения капчи,
полученные методом handleCaptchaData()
        completion: @escaping (Result<VKCaptchaToken, CaptchaHandlingError>) -
> Void // логика работы
    ) -> UIViewController?
```

```
    static func getDomainToken(for domain: String) -> VKCaptchaToken? // метод
получения domain токена для определенного домена.
}
```

VKCaptchaPresenter

`VKCaptchaPresenter` — протокол для отображения капчи. Реализацией протокола `VKCaptchaPresenter` по умолчанию является класс `VKCaptchaNewUIWindowPresenter`.

Также вы можете воспользоваться классом `VKCaptchaPresenterDefault()`, если нужно отобразить капчу на том же экране приложения, с которого пользователь инициировал своё действие, или создать свой класс, который поддерживает протокол  `VKCaptchaPresenter`, если нужна своя логика показа капчи.

## Ошибки

В случае ошибки в поле `error` могут вернуться следующие значения  `CaptchaHandlingError`:

- `failedToCreateCaptchaData` — не удалось сформировать данные для отображения капчи.
- `noCaptcha` — в ответе сервера нет ошибки капчи.
- `captchaError(Error)` — вы можете привести значение во вложенной ошибке `Error` к типу `VKCaptchaResultError`, чтобы получить ошибку прохождения капчи:

- `VKCaptchaResultError.cancel` — пользователь закрыл окно капчи.
- `VKCaptchaResultError.unknown` — неизвестная ошибка.
- Системная ошибка.
