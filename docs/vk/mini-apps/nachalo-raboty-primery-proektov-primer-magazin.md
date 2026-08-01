# Пример «Магазин»

**Раздел:** Мини-приложения → Начало работы → Примеры проектов → Пример «Магазин»  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Приложение-пример «Магазин»

«Магазин» — приближенный к реальности пример [мини-приложения](https://dev.vk.ru/ru/mini-apps/overview), созданного на React с помощью библиотек ВКонтакте. Приложение представляет собой каталог товаров с возможностью поиска, добавления товаров в корзину и оформления покупки.

Пример экрана приложения «Магазин»

Мы создали этот пример, чтобы показать, как использовать ту или иную библиотеку, как они работают вместе, а также чтобы продемонстрировать лучшие подходы к созданию мини- приложений.

## Исходный код и ссылка на приложение

Исходный код: [github.com/VKCOM/vk-mini-apps-examples](https://github.com/VKCOM/vk-mini-apps-examples).

Ссылка для запуска готового приложения: [vk.com/app51654068](https://vk.com/app51654068).

## Используемые библиотеки и пакеты

Пример демонстрирует использование следующих библиотек и npm-пакетов, предлагаемых ВКонтакте:

| Библиотека или | пакет |
|---|---|
| [VKUI](https://dev.vk.ru/ru/libraries/vkui) | Библиотека React-компонентов для создания мини-приложений в стиле ВКонтакте. |
| [icons](https://github.com/VKCOM/icons) | Набор иконок для использования в компонентах VKUI. |
| [vkui-tokens](https://www.npmjs.com/package/@vkontakte/vkui-tokens) | npm-пакет, который используется для подготовки CSS-файлов и стилей. |
| [VK Bridge](https://dev.vk.ru/ru/bridge/overview) | Библиотека для отправки команд и обмена данными с платформой ВКонтакте. Работает в пользовательской части мини-приложения. |
| [vk-bridge-react](https://www.npmjs.com/package/@vkontakte/vk-bridge-react) | npm-пакет, который даёт возможность использовать события библиотеки VK Bridge в React-приложениях. |
| [vk-mini-apps-](https://dev.vk.ru/ru/libraries/router) [router](https://dev.vk.ru/ru/libraries/router) | Библиотека для маршрутизации и навигации в мини-приложениях, созданных с помощью VKUI. |
| [vk-miniapps-](https://github.com/VKCOM/vk-miniapps-deploy) [deploy](https://github.com/VKCOM/vk-miniapps-deploy) | npm-пакет для размещения файлов мини-приложения на [хостинге ВКонтакте](https://dev.vk.ru/ru/mini-apps/development/hosting/overview). |
| [VK Tunnel](https://dev.vk.ru/ru/libraries/tunnel) | Утилита, предоставляющая публичный доступ к веб-серверу, запущенному на компьютере разработчика. |

## Правила кодирования

Хорошая практика при разработке приложений — создание свода правил, которые помогают команде быстро и качественно выполнять поставленные задачи, писать гибкий и расширяемый код, упрощать его чтение для других. Есть такие правила и у приложения-примера «Магазин».

### Файловая структура

Для удобной работы и упрощения поддержки кода важно правильно организовать исходные файлы. В нашем примере файлы приложения сгруппированы в следующие папки:

| Папка | Описание |
|---|---|
| `api` | Код, который выполняет API-запросы. Его можно легко заменить без необходимости менять код других частей приложения. |
| `components` | Код React-компонентов. |
| `pages` | Код страниц, составленных из React-компонентов. |
| `modals` | Код модальных диалоговых окон. |
| `store` | Код менеджера состояний приложения. В нашем примере мы используем [`redux-`](https://github.com/reduxjs/redux-toolkit?ysclid=ljmvesuels37862287) [`toolkit`](https://github.com/reduxjs/redux-toolkit?ysclid=ljmvesuels37862287) [.](https://github.com/reduxjs/redux-toolkit?ysclid=ljmvesuels37862287) |

| Папка | Описание |
|---|---|
| `utils` | Код вспомогательных функций, которые используются в разных частях приложения. Например, здесь вы найдёте код функции изменения формы слова по падежам или код функций, управляющих отображением картинок при прокрутке экрана. |
| Каждая папка содержит файл `index.ts`, который перечисляет экспортируемые функции, классы и | объекты, то есть те элементы, которые будут доступны в других частях приложения. |

Структура, описанная выше, хорошо показывает себя на небольших или краткосрочных проектах. Для более крупных задач рассмотрите использование [Feature-Sliced Design](https://feature-sliced.design), модульной архитектуры, монорепозиториев или подумайте над своим решением.

### Именование файлов и папок

Для папок и файлов используется стиль CamelCase.

- Файлы `.css`, `.jsx`, `.tsx`, содержащие код компонентов, именуются с заглавной буквы.
- Остальные файлы именуются с прописной буквы.

### Язык и форматирование

Разработчикам удобно и приятно работать с хорошо читаемым и типизированным кодом.

Наш пример создан на [TypeScript](https://typescriptlang.org/). Для контроля правил кодирования мы использовали инструмент [ESLint](https://eslint.org/), для форматирования кода — [Prettier](https://prettier.io/).

Если вам понравилось, как это выполнено в нашем примере, вы можете исследовать конфигурационные файлы для ESLint и Prettier, а также файл `ts.config` в корневой папке проекта и перенести понравившиеся решения в своё приложение.

### Правила CSS

Наш пример хранит информацию о стилях веб-элементов в CSS-файлах. Мы указываем стили в соответствии с методологией [БЭМ (Блок, Элемент, Модификатор)](https://ru.bem.info/methodology/css/). То есть мы не указываем стили для тегов или идентификаторов, а работаем только с селекторами классов.

```css
/* Файл src/components/Products/Products.css */
```

```
.Products {
  width: 100%;
  height: max-content;
  margin-bottom: 16px;
}
```

```
.Products_header {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.Products_header_avatar {
  display: inline-block;
  margin-right: 5px;
  border-radius: 100%;
}
```

```
.Products_header_avatar__unload {
  opacity: 0;
}
```

Имя класса компонента может зависеть от значения каких-либо переменных. Чтобы в таком случае определить имя класса, мы используем npm-пакет [classnames](https://www.npmjs.com/package/classnames). Примеры можно найти в файлах из папки `src/components`. Например, ниже показаны строки из исходного кода компонента

`CarItem`:

```ts
// Файл src/components/CustomCell/CustomCell.tsx
```

```
// ...
import cx from 'classnames'
// ...
export type CustomCellProps = {
  active: boolean
  content: string
} & React.HtmlHTMLAttributes<HTMLDivElement>
```

```
/** Блок категории в фильтрах */
export const CustomCell: FC<CustomCellProps> = memo(
  ({ active, content, ...props }: CustomCellProps) => {
    return (
      <div
        {...props}
        className={cx('CustomCell', { CustomCell__active: active })}
      >
        //...
      </div>
    )
  }
)
```

```
CustomCell.displayName = 'CustomCell'
```

## Применяемые подходы

### Адаптация к платформам

Пользователи могут запускать ваше мини-приложение как из десктопной версии сайта ВКонтакте, так и на мобильных устройствах. Мониторы и экраны могут иметь разные разрешения.

При запуске в десктопной версии сайта мини-приложения открываются в <iframe>. На мобильных устройствах мини-приложения работают в элементе управления WebView.

Для привлечения аудитории большего размера и удобства работы пользователей, создавайте мини- приложения, которые адаптируются к разным платформам и экранам. Наш пример именно такой. Он работает на всех поддерживаемых платформах и учитывает их особенности.

Чтобы определить параметры экрана, мы используем функцию

[`useAdaptivityWithJSMediaQueries`](https://github.com/VKCOM/VKUI/blob/master/packages/vkui/src/hooks/useAdaptivityWithJSMediaQueries.ts) библиотеки VKUI. Помимо размеров экрана, эта функция позволяет также определить, запущено ли приложение из десктопной версии сайта. В нашем примере мы используем это значение, чтобы изменить размер кнопки в зависимости от ширины экрана.

```ts
// Файл src/components/Checkout/Checkout.tsx
```

```
// ...
const { isDesktop } = useAdaptivityWithJSMediaQueries()
  return (
    // ...
    <Button
      size="l"
      disabled={totalPrice === 0}
      onClick={onConfirmPayClick}
      stretched={isDesktop}
    >
      К оформлению
    </Button>)
    // ...
```

Чтобы определить платформу, на которой работает пользователь, мы используем функцию

[`usePlatform`](https://vkui.io/components/platform-provider#use-platform) из библиотеки VKUI.

Получив информацию о платформе, мини-приложения могут выполнять какие-либо действия, специфичные для платформы. Наш пример определяет, запущено ли приложение из десктопной версии сайта ВКонтакте, и если это так, то использует событие [`VKWebAppResizeWindow`](https://dev.vk.ru/ru/bridge/VKWebAppResizeWindow) библиотеки VK Bridge, чтобы подстроить размеры <iframe> под размеры экрана.

```ts
// Файл src/App.tsx
```

```
import {
  /* ... */
  usePlatform,
  /* ... */
} from '@vkontakte/vkui'
/** Возвращает платформу IOS, ANDROID, VKCOM */
const platform = usePlatform()
```

```
// ...
/** Растягивание экрана на всю ширину окна для десктопа */
useEffect(() => {
  /** Callback на изменение размеров страницы */
  async function iframeResize() {
    // Проверяем, что платформа VK.COM
    if (platform !== Platform.VKCOM) return
```

```
// Получаем данные конфигурации
const data = (await bridge.send(
  'VKWebAppGetConfig'
)) as SharedUpdateConfigData
```

```
  // Обновляем размер страницы
  bridge.send('VKWebAppResizeWindow', {
    width: 840,
    height: data.viewport_height - 100,
  })
}
```

```
iframeResize()
window.addEventListener('resize', iframeResize)
```

```
  return () => {
    window.removeEventListener('resize',iframeResize)
  }
}, [platform])
```

```
// ...
```

### Поддержка светлой и тёмной темы

ВКонтакте поддерживает светлую и темную тему пользовательского интерфейса.

Компоненты из библиотеки VKUI автоматически подстраиваются под тему ВКонтакте UI. Если вы создаёте и используете свои компоненты, вам нужно будет реализовать поддержку обеих тем. Для решения этой задачи мы используем [VKUI-токены](https://www.npmjs.com/package/@vkontakte/vkui-tokens), которые автоматически меняют свои значения при изменении темы.

VKUI-токены обычно используются в файлах `.css`.

```css
/* Файл src/pages/ProductInfo/ProductInfo.css */
```

```
.ProductInfo {
  background: var(--vkui--color_background_content);
  position: relative;
}
```

VKUI-токены также можно использовать и в коде React-компонентов. Ниже приведён пример такого использования для заливки области иконки.

```ts
// Файл src/components/Filters/Filters.tsx
```

```
// ...
import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme'
```

```
// ...
```

```
export const Filters: FC = memo(() => {
  const iconColor =
    priceFrom || priceTo ? baseTheme.colorPanelHeaderIcon.active.value : ''
```

```
return (
  <Search
    icon={
      <Icon24Filter
        fill={iconColor}
        onClick={onSearchIconClick}
      />
    }
    iconAriaLabel="filter"
    defaultValue={query}
    onChange={onQueryChange}
  />
)
```

```
  // ...
}
```

Для получения информации о текущей теме в своём React-приложении вы также можете использовать функцию `useAppearance`. Она входит в библиотеку VKUI. Наш пример эту функцию не использует, так как применяет другой подход.

Подробнее о поддержке тем и настройке интерфейса вы можете прочитать в документации VKUI:

- [Темы](https://vkui.io/overview/themes)

- [Дизайн-токены](https://vkui.io/overview/design-tokens)

Если вы не используете VKUI в вашем мини-приложении, для получение информации об активной теме вы можете применить событие [`VKWebAppUpdateConfig`](https://dev.vk.ru/ru/bridge/VKWebAppUpdateConfig) библиотеки VK Bridge.

### Быстродействие

Производительность устройств различается. Опытные разработчики отслеживают количество ресурсов, которое использует их приложение, на всех этапах его создания.

Для поиска узких мест можно использовать вкладку Perfomance в инструментах разработчика в браузере, а также проводить изменения с помощью [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) или аналогичных инструментов.

В зависимости от результатов вам может потребоваться оптимизировать ту или иную функцию или часть приложения. В нашем примере наиболее часто используемой страницей является каталог товаров с фильтрами. Чтобы её ускорить, мы создали функцию `imageIntersectionObserver`, которая управляет загрузкой картинок в зависимости от скорости прокрутки — при быстрой прокрутке картинки не загружаются.

Код функции — в файле `src/utils/ imageIntersectionObserver.ts`. Пример использования
— в `src/pages/Store/Store.tsx`.

### Загрузка данных

Для приложений важна скорость загрузки данных, и наш пример — не исключение. Чтобы ускорить загрузку статических ресурсов: кода страниц, файлов.css, шрифтов, изображений мы используем элемент `<link rel="preconnect">`. Он даёт браузеру команду установить предварительное соединение с серверами, поэтому загрузка ресурсов выполняется быстрее.

```html
<!-- Файл public/index.html -->
```

```
<!-- Ускоряем загрузку статики — делаем preconnect к хранилищу фото -->
<link
    rel="preconnect"
    href="{адрес-хостинга-фото}"
/>
```

```
<!-- Ускоряем загрузку статических файлов — делаем preconnect к серверу -->
<link
  rel="preconnect"
  href="{адрес-сервера}"
/>
```

Для ускорения загрузки фотографий товаров мы используем изображения в формате WebP. Он обеспечивает меньший размер файла по сравнению с PNG и JPEG и сохраняет качество. Формат поддерживается всеми современными браузерами. Чтобы обеспечить работу в старых браузерах, мы также включаем поддержку PNG-изображений. Код построен так, что браузер сначала пытается загрузить WebP-изображение, а если сталкивается с ошибкой, то переключается на PNG.

```ts
// Файл src/components/CartItem/CartItem.tsx
<picture>
   <source srcSet={preview + '.webp'} type="image/webp"></source>
   <img
        className="CartItem_preview_image CartItem_preview_image__unload"
        onLoad={on Preview Load}
        src={preview + '.png'}
        alt=""
        width={120}
        height={120}
      />
 </picture>
```

### Работа с local storage

Для хранения небольших данных пример использует события библиотеки VK Bridge:

[`VKWebAppStorageSet`](https://dev.vk.ru/ru/bridge/VKWebAppStorageSet) [,](https://dev.vk.ru/ru/bridge/VKWebAppStorageSet) [`VKWebAppStorageGet`](https://dev.vk.ru/ru/bridge/VKWebAppStorageGet), [`VKWebAppStorageGetKeys`](https://dev.vk.ru/ru/bridge/VKWebAppStorageGetKeys). Это удобная кросс- платформенная альтернатива стандартному объекту `LocalStorage`. С её помощью вы можете хранить и использовать данные небольшого объёма при запуске приложения в разных браузерах.

Наш пример использует записи в хранилище, чтобы проверить, является ли посещение первым и надо ли показать приветственное сообщение. Этот код находится в файле `src/App.tsx`.

```ts
// Файл src/App.tsx
```

```
/** Получение данных пользователя */
useLayoutEffect(() => {
  async function initUser() {
    // Получаем данные текущего пользователя
    const userData = await bridge.send('VKWebAppGetUserInfo', {})
    // Проверяем есть ли он в Storage
    const data = await bridge.send('VKWebAppStorageGet', {
      keys: [userData.id.toString()],
    })
    // Если он уже сохранён, то сохраняем его имя в store
    if (data.keys[0].value)
      dispatch(setUserData({
        name: data.keys[0].value,
        id: userData.id
      }))
    /* Если не сохранен, то сохраняем в store и показываем приветственную
модалку */
    else if (userData) {
      dispatch(setUserData({
        name: userData.first_name,
        id: userData.id
      }))
      dispatch(setOnboardingComplete(false))
      bridge.send('VKWebAppStorageSet', {
        key: userData.id.toString(),
        value: userData.first_name,
      })
    }
  }
  initUser()
}, [dispatch, routeNavigator])
```

### Маршрутизация и навигация

Для настройки маршрутизации в приложении мы используем библиотеку [vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router). С её помощью мы определяем, какой экран или всплывающее окно должно быть показано при изменении текущего URL в приложении. Мы также используем функциональность этой библиотеки для переходов между экранами.

Библиотека тесно связана с [VKUI](https://dev.vk.ru/ru/libraries/vkui) и работает в мини-приложениях, которые используют VKUI- компоненты.

Программный код для создания маршрутов находится в файле `src/routes.ts`.

```ts
// Файл src/routes.ts
```

```
import {
  RoutesConfig,
  createHashRouter,
  createPanel,
  createRoot,
  createView,
} from '@vkontakte/vk-mini-apps-router'
```

```
// ...
```

```
/** Настройка типизированной конфигурации маршрутов */
export const routes = RoutesConfig.create([
  createRoot(SHOP_ROOT, [
    createView(ShopView.Main, [
      createPanel(ShopPanel.Store, '/', []),
      createPanel(ShopPanel.ProductInfo, `/${ShopPanel.ProductInfo}`, []),
      createPanel(ShopPanel.ShoppingCart, `/${ShopPanel.ShoppingCart}`, []),
    ]),
  ]),
])
/** Передача массива маршрутов для создания роутера */
export const router = createHashRouter(routes.getRoutes())
```

Код, выполняющий переходы между экранами, можно найти в исходных файлах компонентов в папке `src/components`. Ниже приведён пример кода из компонента `ProductCard`.

```ts
// Файл src/components/ProductCard/ProductCard.tsx
```

```
export const ProductCard: FC<ProductCardProps> = memo(
  ({
    id,
    name,
    back,
    price,
    preview,
    isInCart,
    maxAvailable,
    ...props
  }: ProductCardProps) => {
    const routeNavigator = useRouteNavigator()
    // ...
    /** При клике на карту переходим на страницу товара */
    const onCardClick = () => {
     const params = `id=${id}&name=${name}&price=${price}&back=${back}`
     routeNavigator.push(`/${ShopPanel.ProductInfo}?${params}`
     )
    }
    // ...
    return (
      <div
        onClick={onCardClick}
        className="ProductCard"
        ref={$card}
        {...props}
       >
         // ...
       </div>
    )
  }
)
```

Подробнее об указании маршрутов, навигации и работы с модальными и всплывающими окнами — в [описании библиотеки vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router).

### Сборка и хостинг

Пример демонстрирует возможность сборки проекта и размещения его на серверах ВКонтакте. Для этого мы используем пакет [vk-miniapps-deploy](https://www.npmjs.com/package/@vkontakte/vk-miniapps-deploy).

Откройте файл `package.json`, который расположен в корневой папке проекта. В разделе

`"scripts"` есть две команды: `"predeploy"` и `"deploy"`:

```json
{
  "name": "mini-app",
  "version": "0.0.0",
  "scripts": {
    ...
    "predeploy": "predeploy": "react-scripts build",
    "deploy": "vk-miniapps-deploy",
    ...
  },
...
```

Сборка и загрузка на серверы выполняются одной командой:

#### Командная строка

```
npm run deploy
```

Во время своей работы эта команда сначала вызовет `"predeploy"`, которая, в свою очередь, соберёт проект. После сборки `"deploy"` загрузит получившиеся файлы на серверы ВКонтакте.

Конфигурационный файл для vk-miniapps-deploy расположен в корневой папке примера и называется `vk-hosting-config.json`.

Подробнее о хостинге на серверах ВКонтакте — в разделе [Хостинг статики](https://dev.vk.ru/ru/mini-apps/development/hosting/overview).

### Разработка и тестирование

Когда вы запускаете мини-приложение по его URL ВКонтакте — в нашем случае [vk.com/app51654068](https://vk.com/app51654068)
— платформа загружает файлы мини-приложение с веб-сервера по URL, указанному в [настройках](https://dev.vk.ru/ru/mini-apps/settings/general/placement) [мини-приложения](https://dev.vk.ru/ru/mini-apps/settings/general/placement).

При разработке и тестировании удобно, когда файлы приложения загружаются не с хостинга, а с компьютера разработчика. Это позволяет, например, заниматься отладкой запросов в среде разработки или продемонстрировать коллегам версию приложения, которая ещё не была опубликована.

Реализация такого подхода обычно затруднена тем, что веб-сервер, запущенный на компьютере разработчика, не виден в интернете. Это проблему можно решить с помощью утилиты [VK Tunnel](https://dev.vk.ru/ru/libraries/tunnel). Она позволяет платформе ВКонтакте получить доступ к локальному веб-серверу. Наш пример иллюстрирует работу с утилитой.

Файл `package.json` содержит команды для запуска VK Tunnel.

```json
// Файл package.json
```

```
{
  "name": "mini-app",
  "version": "0.0.0",
  "scripts": {
    "start": "cross-env PORT=10888 react-scripts start ",
    ...
    "tunnel": "vk-tunnel --insecure=1 --http-protocol=http --ws-protocol=ws --
host=127.0.0.1 --port=5173 app_id=51654068 endpoints=[web]"
  },
...
```

Чтобы использовать VK Tunnel:

1. Установите VK Tunnel на свой компьютер. Для этого выполните следующие инструкции в командной строке:

#### Командная строка

```
npm install @vkontakte/vk-tunnel -g
```

2. В окне командной строки перейдите в папку примера и запустите веб-сервер.

#### Командная строка

```
cd {путь-к-папке-примера}
npm start
```

3. Откройте другое окно командной строки. В нём перейдите в папку проекта-примера и запустите VK Tunnel:

#### Командная строка

```
cd {путь-к-папке-примера}
npm run tunnel
```

4. VK Tunnel создаст соединение (туннель) к веб-серверу, который вы запустили локально, и в окне командной строки отобразит URL для доступа к этому веб-серверу. Скопируйте этот URL.

Теперь вы можете указать этот URL в настройках приложения. Сделать это можно, например, так:

1. Откройте настройки мини-приложения и перейдите в раздел Тестирование.

2. Создайте в этом разделе новую группу. Включите в неё нужных вам пользователей. В поле URL укажите скопированный URL. Подробнее — в разделе [Тестовые группы](https://dev.vk.ru/ru/mini-apps/settings/test-groups).

Когда пользователи группы будут запускать приложение, ВКонтакте будет переадресовывать вызовы на локальный веб-сервер. Пользователи будут видеть версию мини-приложения, которая находится на вашей машине. Конечно, чтобы этот подход работал, локальный веб-сервер должен быть запущен.

Подробнее о работе с утилитой — в разделе [VK Tunnel](https://dev.vk.ru/ru/libraries/tunnel).

## Можно ли использовать пример как шаблон для своего мини-приложения?

Да, вы можете модифицировать пример для своих нужд. Однако в общем случае для начала работы над своим проектом удобнее использовать npm-пакет [create-vk-mini-app](https://www.npmjs.com/package/@vkontakte/create-vk-mini-app). Он тоже содержит все

необходимые библиотеки для создания мини-приложений, но в нём меньше кода, который вам, возможно, придётся удалить.

Подробнее о создании мини-приложений и использовании пакета — в разделе [Первые шаги](https://dev.vk.ru/ru/mini-apps/getting-started).

## Материалы по теме

- [Примеры проектов](https://dev.vk.ru/ru/mini-apps/examples)
- [Мини-приложения — Первые шаги](https://dev.vk.ru/ru/mini-apps/getting-started)
- [VK Tunnel](https://dev.vk.ru/ru/libraries/tunnel)
