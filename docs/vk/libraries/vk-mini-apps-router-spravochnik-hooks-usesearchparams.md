# useSearchParams

**Раздел:** Библиотеки → vk-mini-apps-router → Справочник → Hooks → useSearchParams  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Используйте эту функцию, чтобы извлечь из URL значения [query-параметров](https://dev.vk.ru/ru/libraries/router/parameters#Query-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B), например `/persik?` `param=123`.

## Пример

```ts
import { useSearchParams } from '@vkontakte/vk-mini-apps-router';
```

```
const [params, setParams] = useSearchParams();
```

```
const [additional, setAdditional] = useState(params.get('additional'));
```

```
function updateSearch() {
 if (additional) {
  params.set('additional', additional);
 } else {
  params.delete('additional');
 }
```

```
    setParams(params);
}
```

## Объявление

```ts
export function useSearchParams(defaultInit?: URLSearchParamsInit):
[URLSearchParams, SetURLSearchParams]
```

## Параметры

| Параметр | Тип | Описание |
|---|---|---|
| `defaultInit` необязательный | `URLSearchParamsInit` | Строка, объект или массив, которые могут использоваться для инициализации параметров. |

## Результат

Функция возвращает стандартный используемый в веб-разработке объект [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams), а также ссылку на метод, который можно использовать для установления значений параметров в последующих вызовах.

## Особенности использования

Старые версии некоторых браузеров, например Internet Explorer 11, не поддерживают объект

`URLSearchParams`. Работа функции `useSearchParams()` в таких случаях невозможна.

## Материалы по теме

- [Использование параметров](https://dev.vk.ru/ru/libraries/router/parameters)
- [useParams](https://dev.vk.ru/ru/libraries/router/reference/hooks/useParams)
- [useMetaParams](https://dev.vk.ru/ru/libraries/router/reference/hooks/useMetaParams)
- [Навигация в приложении](https://dev.vk.ru/ru/libraries/router/navigation)
- [Справочник vk-mini-apps-router](https://dev.vk.ru/ru/libraries/router/reference)
