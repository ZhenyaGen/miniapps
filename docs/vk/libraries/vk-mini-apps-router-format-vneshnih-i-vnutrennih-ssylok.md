# Формат внешних и внутренних ссылок

**Раздел:** Библиотеки → vk-mini-apps-router → Формат внешних и внутренних ссылок  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

При работе с одностраничными приложениями в URL часто используется символ `#`, после которого указывается активная страница и другие параметры.

```
https://my-app.com/#/catalog/123/order
```

Необходимость использования этого символа в ссылках на экраны вашего приложения зависит:

- От [типа используемого роутера](https://dev.vk.ru/ru/libraries/router/router-types) — Hash, HashParam или Browser.
- От вида ссылки и компонента, в котором она указывается.

Давайте рассмотрим это подробнее.

## Типы роутеров

Библиотека [vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router) используется в React-приложениях, созданных с помощью библиотеки [VKUI](https://dev.vk.ru/ru/libraries/vkui). В общем случае такие веб-приложения могут запускаться на платформе ВКонтакте или вне платформы.

Запуск на платформе означает, что веб-приложение запускается из мобильного приложения ВКонтакте или из десктопной или мобильной версии сайта. Запуск вне платформы — что веб- приложение открывается в браузере, как обычный сайт.

При запуске на платформе приложение должно использовать роутеры типов [Hash](https://dev.vk.ru/ru/libraries/router/router-types#Hash-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80) или [HashParam](https://dev.vk.ru/ru/libraries/router/router-types#HashParam-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80). При запуске вне платформы приложение может использовать роутер типа [Browser](https://dev.vk.ru/ru/libraries/router/router-types#Browser-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80).

## Hash- и HashParam-роутеры

Принципы формирования ссылок в приложениях, которые используют роутеры вида Hash и HashParam, одинаковы. Разница — в формате ссылок:

- Hash-роутер воспринимает в качестве маршрута текст после символа `#`.

```
https://vk.com/app12345/#/contacts/edit
```

- HashParam-роутер дополнительно к символу `#` требует ключевое слово `path`:

```
https://vk.com/app12345/#param1=value1&path=%2Fcontacts%2Fedit
```

### Когда не надо указывать # и path

Символ `#` и слово `path` не указываются в вызовах [методов и функций](https://dev.vk.ru/ru/libraries/router/reference), которые предоставляет библиотека [vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router), а также в [компонентах](https://dev.vk.ru/ru/libraries/router/reference), которые предоставляет эта библиотека.

`#` и `path` не надо указывать:

- При [создании маршрутов](https://dev.vk.ru/ru/libraries/router/setting-routes).

- В методах объекта [`RouteNavigator`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator), которые применяются для [навигации по страницам](https://dev.vk.ru/ru/libraries/router/navigation).
- В компоненте [`RouterLink`](https://dev.vk.ru/ru/libraries/router/reference/components/RouterLink) [.](https://dev.vk.ru/ru/libraries/router/reference/components/RouterLink)
- При вызове функций [`useHref(...)`](https://dev.vk.ru/ru/libraries/router/reference/hooks/useHref) и [`useLinkCreateHandler(...)`](https://dev.vk.ru/ru/libraries/router/reference/hooks/useLinkCreateHandler) [.](https://dev.vk.ru/ru/libraries/router/reference/hooks/useLinkCreateHandler)

#### Пример 1

Ниже — код создания маршрута. Этот код использует объекты, предоставляемые библиотекой vk- mini-apps-router. Использовать `#` и `path` в нём не нужно.

```ts
// Указание маршрута
const routes: RouteWithoutRoot[] = [
  {
    path: `/catalog/:id/details`, // Символ # и слово path не указаны
    modal: 'item_modal',
    panel: 'main_panel',
    view: 'default_view'
  },
  // Другие маршруты...
]
```

#### Пример 2

Ниже — пример использования компонента [`RouterLink`](https://dev.vk.ru/ru/libraries/router/reference/components/RouterLink). Этот компонент входит в библиотеку vk- mini-apps-router. Адрес перехода в его атрибуте `to` не содержит `#` и `path`.

```ts
// Компонент RouterLink из библиотеки vk-mini-apps-router
<RouterLink to='/catalog/123/order'>
  Перейти
</RouterLink>
```

#### Пример 3

Ниже — пример указания маршрута в стороннем компоненте `Button`. Этот компонент объявлен не в библиотеке vk-mini-apps-router, но обработчик `onClick` вызывает метод

`routeNavigator.push(...)`, который предоставлен нашей библиотекой, поэтому `#` и `path` в ссылке не требуются.

```ts
// Вызов метода
// # и path не указывается в адресе для перехода
<Button
  onClick={() => routeNavigator.push('/catalog/123/order')}
  >Заказать</Button>
```

### Когда надо указывать # и path

- Во внешних ссылках на экраны приложений, использующих роутеры Hash и HashParam.

Предположим, вы определили такой путь в своём приложении:

```
/catalog/new-spring-collection
```

При размещении ссылок на эту страницу на каких-либо ресурсах: на стене или в сообществах ВКонтакте, на других сайтах — необходимо использовать символ `#`. Без этого приложение не откроется.

```
// Hash-роутер
https://vk.com/app12345/#/catalog/new-spring-collection
```

```
// HashParam-роутер
https://vk.com/app12345/#path=%2Fcatalog%2Fnew-spring-collection
```

- В коде приложения в компонентах, которые предоставлены другими библиотеками, а не библиотекой vk-mini-apps-router.

#### Пример

Компонент `Link` предоставлен библиотекой [VKUI](https://dev.vk.ru/ru/libraries/vkui), в его атрибуте `href` надо указывать ссылку с `#` и `path`.

Элемент `<a>` — стандартный HTML-элемент. В его атрибуте `href` тоже надо указывать ссылку с `#` и `path`.

```ts
// Hash-роутер
<Link href="/#/persik/show" onClick={ ()=> {
routeNavigator.push('/persik/show') }}>Увидеть Персика</Link>
<a href="/#/contacts" onclick={ ()=> { routeNavigator.push('/contacts')
}}>Контакты</a>
```

```
// HashParam-роутер
<Link href="/#path=%2Fpersik%2Fshow" onClick={ ()=> {
routeNavigator.push('/persik/show') }}>Увидеть Персика</Link>
<a href="/#path=%2Fcontacts" onclick={ ()=> {
routeNavigator.push('/contacts') }}>Контакты</a>
```

Обратите внимание, что обработчик `onClick` вызывает метод `push(...)` объекта

[`RouteNavigator`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator). Этот объект предоставлен библиотекой vk-mini-apps-router, поэтому в адресе, который передаётся методу `push(...)`, использовать `#` и `path` не нужно.

Совет. Ссылки в примере кода выше иллюстрируют форматы, поддерживаемые роутерами вида Hash и HashParam. Мы привели их в демонстрационных целях. Строгое следование какому-то одному формату может представлять проблему для приложений, которые запускаются как на платформе ВКонтакте, так и вне её, поскольку они используют разные виды роутеров.

Хорошей практикой является использование специальных функций, которые формируют ссылки в зависимости от используемого в текущий момент роутера. Подробности — ниже, в

разделе Унифицированный подход.

## Browser-роутер

Browser-роутер используется в веб-приложениях, которые запускаются вне платформы ВКонтакте. Этот роутер не требует указания в ссылках каких-либо дополнительных атрибутов для маршрутов. Символ `#` и ключевое слово `path` не надо использовать ни во внешних ссылках, ни где-либо в коде приложения.

#### Пример внешней ссылки

```
// Browser-роутер
https://my-app.com/catalog/new-spring-collection
```

#### Пример ссылки в коде приложения

```ts
// Browser-роутер
```

```
<Link href="/persik/show" onClick={ ()=> { routeNavigator.push('/persik/show')
}}>Увидеть Персика</Link>
<a href="/contacts" onclick={ ()=> { routeNavigator.push('/contacts')
}}>Контакты</a>
```

Совет. Ссылки в примере выше иллюстрируют формат, совместимый с роутером вида Browser. Мы привели их в демонстрационных целях. Строгое следование одному формату в коде может представлять проблему для приложений, которые запускаются как на платформе ВКонтакте, так и вне её, поскольку они используют разные виды роутеров.

Хорошей практикой является использование специальных функций, которые формируют ссылки в зависимости от используемого в текущий момент роутера.

## Унифицированный подход

Разница в формате ссылок может быть проблемой для приложений, которые запускаются как на платформе ВКонтакте, так и вне её.

Чтобы получать ссылки в формате, который поддерживает роутер, используйте функцию

[`useHref(...)`](https://dev.vk.ru/ru/libraries/router/reference/hooks/useHref) библиотеки vk-mini-apps-router. Она принимает строку-маршрут в качестве параметра и возвращает строковое значение, которое можно использовать в компонентах.

Для создания кода обработчика события onClick таких компонентов вы можете использовать функцию [`useLinkClickHandler(...)`](https://dev.vk.ru/ru/libraries/router/reference/hooks/useLinkClickHandler) [.](https://dev.vk.ru/ru/libraries/router/reference/hooks/useLinkClickHandler)

```ts
import { useParams, useLinkClickHandler } from '@vkontake/vk-mini-apps-
router';
```

```
const url = useHref('/contacts/edit');
const handler = useLinkClickHandler('/contacts/edit');
```

```
<Link href={url} onClick={ handler }>
  Edit Contacts
</Link>
```

## Материалы по теме

- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [Настройка маршрутов](https://dev.vk.ru/ru/libraries/router/setting-routes)
- [Библиотека vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router)
