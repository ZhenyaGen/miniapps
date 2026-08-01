# Навигация в приложении

**Раздел:** Библиотеки → vk-mini-apps-router → Навигация в приложении  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## О навигации

Для навигации в [мини-приложении](https://dev.vk.ru/ru/mini-apps/overview) используйте объект [`RouteNavigator`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator), который предлагает библиотека [vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router). Он содержит методы для выполнения переходов и работы с историей переходов.

Метод объекта  RouteNavigator Описание

[`push(path, params, options)`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/push) Выполняет переход по указанному пути и добавляет путь в историю переходов. Если в истории переходов есть записи, относящиеся к будущим переходам, они будут удалены.

[`replace(path, params, options)`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/replace) Выполняет переход по указанному пути и заменяет текущую запись в истории переходов. Другие записи из истории не удаляются.

[`back()`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/back) Выполняет возврат на предыдущую запись в истории переходов.

## Пример

Чтобы получить объект `RouteNavigator`, вызовите [`useRouteNavigator()`](https://dev.vk.ru/ru/libraries/router/reference/hooks/useRouteNavigator) [.](https://dev.vk.ru/ru/libraries/router/reference/hooks/useRouteNavigator)

```ts
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
```

```
export function PersikPage() {
  const routeNavigator = useRouteNavigator();
```

```
  return (
    <Button onClick={() => routeNavigator.push('/')}>На главную</Button>
  );
}
```

Важно! Вызов `useRouteNavigator()` должен находиться в рамках компонента

`<RouterProvider>...</RouterProvider>`.

## Как работает переход?

При выполнении перехода библиотека инициирует перерисовку React-компонентов. Вызов

[`useActiveVkuiLocation()`](https://dev.vk.ru/ru/libraries/router/reference/hooks/useActiveVkuiLocation) возвращает информацию о `Root`, `View`, `Panel` и других компонентах, которые соответствуют новому пути.

```ts
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
```

```
export function App() {
  // Получаем активные View и Panel
  const { view: activeView, panel: activePanel } = useActiveVkuiLocation();
```

```
  return(
    // Указываем View и Panel для отрисовки
    <Root activeView={activeView | DEFAULT_VIEW}>
      <View nav="default_view" activePanel={activePanel | DEFAULT_PANEL}>
        <Panel nav="home_panel">...</Panel>
        <Panel nav="persik_panel">...</Panel>
      </View>
    </Root>
  )
}
```

## Использование ссылок

Для создания ссылок в приложении можно использовать компонент [`RouterLink`](https://dev.vk.ru/ru/libraries/router/reference/components/RouterLink), который входит в библиотеку vk-mini-apps-router, либо воспользоваться сторонними компонентами, например `Link` или HTML-элементами `<a>`.

При использовании компонента `RouterLink` просто укажите маршрут для перехода в атрибуте

`to`.

```ts
<RouterLink to="/persik/show">Покажите Персика</RouterLink>
```

При использовании HTML-элементов или сторонних компонентов маршрут надо привести в поддерживаемый формат. Если в таких случаях указать маршрут так, как он определён в вашем приложении, ссылка может не сработать.

```html
<a href="/contacts/screen1">...</a>  <!-- Ссылка может не сработать -->
<Link href="/contacts/screen2">...</Link>  <!-- Ссылка может не сработать -->
```

Формат значения значения `href` зависит от [типа роутера](https://dev.vk.ru/ru/libraries/router/router-types), который использует ваше приложение.

| Тип рoутера | Поддерживаемый формат ссылки |
|---|---|
| [Hash](https://dev.vk.ru/ru/libraries/router/router-types#Hash-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80) | `<a href="/#/contacts/screen1">...</a>` |
| [HashParam](https://dev.vk.ru/ru/libraries/router/router-types#HashParam-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80) | `<a href="/#path=%2Fcontacts%2Fscreen1">...</a>` |
| [Browser](https://dev.vk.ru/ru/libraries/router/router-types#Browser-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80) | `<a href="/contacts/screen1">...</a>` |

Важно! Указание адресов напрямую в коде элементов, как показано в примерах выше, является проблемой для приложений, которые работают как на платформе ВКонтакте, так и вне её, поскольку они используют разные типы роутеров. Такой подход также затрудняет смену типа роутера, потому что для неё придётся обновлять все ссылки в коде.

Чтобы обойти эти проблемы, используйте функцию [`useHref(...)`](https://dev.vk.ru/ru/libraries/router/reference/hooks/useHref). Она вернёт значение, которое соответствует типу роутера, используемому в текущий момент. Это значение можно вставить в атрибут `href`.

Кроме того, мы рекомендуем использовать обработчик события `onClick`, в котором вызывать методы объекта `RouteNavigator`. Код обработчика не зависит от вида роутера. Для получения кода обработчика удобно использовать функцию [`useLinkClickHandler(...)`](https://dev.vk.ru/ru/libraries/router/reference/hooks/useLinkClickHandler) [.](https://dev.vk.ru/ru/libraries/router/reference/hooks/useLinkClickHandler)

```ts
import { useHref, useLinkClickHandler } from '@vkontakte/vk-mini-apps-router';
```

```
<Link
  href={useHref('/contacts/screen1')}
  onClick={useLinkClickHandler('/contacts/screen1')}>
  ...
</Link>
```

## NavigationTarget

Есть три способа задать конечную точку перехода:

1. С помощью строки. Подробнее — в разделе Навигация по строкам.

2. С помощью объекта `Page` или `PageWithRoot`. Подробнее — в разделе Навигация по идентификаторам объектов.

3. С помощью URL-объекта. Подробнее — в разделе Навигация при помощи URL-объекта.

Если для перехода вы используете `PageWithParams` или строку типа `/path/:param`, укажите дополнительные [параметры](https://dev.vk.ru/ru/libraries/router/parameters).

### Навигация по строкам

В простом случае вы передаёте в методы [`RouteNavigator.push(...)`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/push) и

[`RouteNavigator.replace(...)`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/replace) желаемый URL для перехода.

```ts
routeNavigator.push('/');
routeNavigator.push('/persik');
routeNavigator.push('/user/123');
```

Обратите внимание, что мы не используем символ `#` и ключевое слово `path` в URL. В них нет необходимости при навигации с помощью методов объекта `RouteNavigator`. Подробности — в разделе [Формат внешних и внутренних ссылок](https://dev.vk.ru/ru/libraries/router/hash-in-links).

### Навигация по идентификаторам объектов

Методы [`RouteNavigator.push(...)`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/push) и [`RouteNavigator.replace(...)`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/replace) могут также принимать объекты, полученные при [настройке маршрутов с помощью](https://dev.vk.ru/ru/libraries/router/setting-routes)

[`RoutesConfig.create(...)`](https://dev.vk.ru/ru/libraries/router/setting-routes) [.](https://dev.vk.ru/ru/libraries/router/setting-routes)

```ts
routeNavigator.push(routes.default_root.default_view.home_panel);
routeNavigator.push(routes.default_root.default_view.persik_panel, {
'emotion': 'sad' });
routeNavigator.push(routes.default_root.default_view.persik_panel.persik_modal
, { 'emotion': 'sad' });
```

Для указания объектов для перехода используйте синтаксис вида `routes.root.view.panel`.

Удобство навигации по объектам заключается в том, что среда разработки будет давать подсказки с именами объектов и информацией о параметрах.

### Навигация при помощи URL-объекта

В методы [`RouteNavigator.push(...)`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/push) и [`RouteNavigator.replace(...)`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/replace) можно передавать URL-объекты с указанием парамеров, не формируя при этом строку:

```ts
{pathname?: string | Page | PageWithParams, hash?: string, search?:
URLSearchParams | Record<string, string> | string}
```

Пример перехода с указанием хеша без параметров пути:

```ts
routeNavigator.push({pathname: ‘/persik’, search: {name: ‘persik’, hash:
‘10’}});
```

Результатом такого перехода будет путь `/persik?name=persik#10`.

Пример перехода с указанием search-параметров:

```ts
let persik_panel = routes.default_root.default_view.persik_panel
routeNavigator.push({
  pathname: persik_panel,
  search: {name: ‘persik’},
  hash: ‘10’
}, { emotion: 'sad' });
```

В таком случае мы перейдём на страницу `/persik/sad?name=persik#10`.

## Навигация назад

Для возврата на предыдущую запись в истории переходов вызовите метод

[`RouteNavigator.back()`](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator/back). Он работает так же, как браузерная кнопка «Назад».

```ts
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
```

```
export function SomePage() {
  const routeNavigator = useRouteNavigator();
```

```
  return (
    <Button onClick={() => routeNavigator.back()}>Вернуться</Button>
  );
}
```

Если пользователь открыл приложение по прямой ссылке и уже находится на первой загруженной странице, то нажатие на кнопку «Назад» приведёт к выходу из мини-приложения. Чтобы предотвратить выход, используйте функцию [`useFirstPageCheck()`](https://dev.vk.ru/ru/libraries/router/reference/hooks/useFirstPageCheck) [.](https://dev.vk.ru/ru/libraries/router/reference/hooks/useFirstPageCheck)

```ts
import { useFirstPageCheck } from '@vkontakte/vk-mini-apps-router';
```

```
// Проверка, является ли страница первой загруженной
const isFirstPage = useFirstPageCheck();
```

```
return (
  <PanelHeader
    before={<PanelHeaderBack onClick={() => isFirstPage ?
routeNavigator.push('/') : routeNavigator.back()} />}
  >
    Текст заголовка
  </PanelHeader>
)
```

Код выше отлавливает ситуацию, когда пользователь пытается перейти назад с первой загруженной страницы приложения, и перенаправляет его на главную страницу приложения.

## Передача параметров

Если при настройке маршрутов вы использовали [параметры](https://dev.vk.ru/ru/libraries/router/parameters), то при переходе вы должны указывать значение, а не имя параметра. Например, если маршрут объявлен как `/user/:id`, то для перехода передайте URL `/user/123`.

Если страница использует параметры в URL после символа `?`, укажите эти параметры в строке URL, например `/user/contacts?action=edit&value=123`.

Кроме того, вы может передать значения целевой странице с помощью специального параметра методов `push()` и `replace()`.

Подробности разных способов передачи значений — в разделе [Использование параметров](https://dev.vk.ru/ru/libraries/router/parameters).

## Блокировка переходов

Вам может потребоваться блокировать переход с какого-либо экрана в вашем приложении. Например, вы можете блокировать продвижение, если пользователь не ввёл требуемые данные. Библиотека vk-mini-apps-router предоставляет специальные возможности для этого. Подробности — в разделе [Блокировка навигации](https://dev.vk.ru/ru/libraries/router/blocking-navigation).

## Материалы по теме

- [Настройка маршрутов](https://dev.vk.ru/ru/libraries/router/setting-routes)
- [Использование параметров](https://dev.vk.ru/ru/libraries/router/parameters)
- [Использование роутера для отрисовки страниц](https://dev.vk.ru/ru/libraries/router/setup#%D0%A8%D0%B0%D0%B3%203.%20%D0%98%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B9%D1%82%D0%B5%20%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80%20%D0%B4%D0%BB%D1%8F%20%D0%BE%D1%82%D1%80%D0%B8%D1%81%D0%BE%D0%B2%D0%BA%D0%B8%20%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86)
- [Формат внешних и внутренних ссылок](https://dev.vk.ru/ru/libraries/router/hash-in-links)
- [Объект RouteNavigator](https://dev.vk.ru/ru/libraries/router/reference/objects/RouteNavigator)
- [Блокировка навигации](https://dev.vk.ru/ru/libraries/router/blocking-navigation)
- [История навигации](https://dev.vk.ru/ru/libraries/router/navigation_history)
- [Обработка ошибок](https://dev.vk.ru/ru/libraries/router/handling-errors)
- [Поддержка анимации](https://dev.vk.ru/ru/libraries/router/animation)
- [Библиотека vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router)
