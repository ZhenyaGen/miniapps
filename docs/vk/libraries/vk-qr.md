# VK QR

**Раздел:** Библиотеки → VK QR  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Чтобы размещать ссылки на мини-приложение в офлайне, используйте QR-коды. Это поможет сделать VK QR — библиотека для генерации QR-кодов.

NPM: [`vk-qr`](https://www.npmjs.com/package/@vkontakte/vk-qr)

## Внешний вид QR-кода

## Работа с библиотекой

1. Перейдите к папке проекта мини-приложения:

```bash
cd <ПУТЬ_К_МИНИ_ПРИЛОЖЕНИЮ>
```

2. Установите библиотеку:

```bash
yarn add @vkontakte/vk-qr || npm install @vkontakte/vk-qr
```

3. Инициализируйте библиотеку:

```js
import * as qr from '@vkontakte/vk-qr';
```

4. Вызовите событие `createQR` объекта `qr`.

```js
const qrSvg = qr.createQR(text, qrSize, className, options);
```

## Платформы

Android, iOS, Mobile Web, Web

## Параметры

| Параметр | Тип | Описание |
|---|---|---|
| `text` | `string` | Строка для преобразования в QR-код. |
| `qrSize` | `integer` | Размер кода в пикселях. |
| `className` | `string` | Класс родительского SVG-элемента QR-кода. |

`options` `object` Объект пользовательских настроек, которые вы хотите применить к сгенерированному QR-коду.

Параметры объекта:
- `isShowLogo` ( `bool`) — Отображение логотипа ВКонтакте. Возможные значения:
- `false` — QR-код без логотипа,
- `true` — QR-код с логотипом.
- `isShowBackground` ( `bool`) — Отображение фона. Возможные значения:
- `false` — без фона,
- `true` — с фоном.
- `backgroundColor` ( `string`) — цвет фона QR-кода в кодировке HEX. Цвет фона задаётся, если параметр `isShowBackground` имеет значение

`true`.
- `foregroundColor` ( `string`) — цвет QR-кода в кодировке HEX.
- `logoColor` ( `string`) — цвет фона логотипа ВКонтакте в кодировке HEX. Цвет фона задаётся, если параметр `isShowLogo` имеет значение

`true`. Значение по умолчанию: `"#4680c2"`.

## Пример использования

```js
let text = 'https://vk.com/persik_ryzhiy';
```

```
let options = {};
```

```
options.isShowLogo = true;
options.isShowBackground = true;
options.backgroundColor = "#bbebf0";
```

```
const qrSvg = qr.createQR(text, 256, "qr-code-class", options);
```

```
document.body.innerHTML = qrSvg;
```

[Примеры использования](https://vk.com/vkapps_qr)

Чтобы считать QR-код программно, используйте в мини-приложении событие [VKWebAppOpenCodeReader](https://dev.vk.ru/ru/bridge/VKWebAppOpenCodeReader).

## Результат

Событие `createQR` возвращает строку SVG.
