# Изменения в играх от 8 августа 2024 года

**Раздел:** VK Games → Архив → Изменения в играх от 8 августа 2024 года  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Мы стремимся сократить различия в работе с играми и мини-приложениями, поэтому 8 августа 2024 года внесли ряд изменений в панель управления:

- Добавили для игр разделы, которые были только у мини-приложений.
- Унифицировали параметры запуска.
- Стали использовать единый формат настроек размещения.

| Функциональность | Было | Стало |
|---|---|---|
| Параметры запуска Параметры запуска в играх и мини-приложениях различались. Устаревшие параметры для игр доступны в [таблице](https://dev.vk.ru/ru/games/development/parameters/old). | Теперь используется единый | формат параметров запуска. Набор специфичных параметров может незначительно отличаться в зависимости от типа приложения. Это отмечено в [таблице с новыми](https://dev.vk.ru/ru/games/development/parameters) [параметрами](https://dev.vk.ru/ru/games/development/parameters). |
| Событие | Событие применялось только в мини-приложениях. | Теперь в играх можно получить параметры запуска с помощью этого события. |

[`VKWebAppGetLaunchParams`](https://dev.vk.ru/ru/bridge/VKWebAppGetLaunchParams)

| Запрос прав В панели управления разработчик указывал, в какой момент запрашивать права у пользователя: при запуске игры или по мере необходимости. Как это работало раньше, можно посмотреть в [старой](https://dev.vk.ru/ru/games/development/permissions) [документации](https://dev.vk.ru/ru/games/development/permissions). | Права запрашиваются только в тот момент, когда они нужны. |
|---|---|
| [Экран игры перед запуском](https://dev.vk.ru/ru/games/settings/design-examples#%D0%AD%D0%BA%D1%80%D0%B0%D0%BD%20%D0%B8%D0%B3%D1%80%D1%8B%20%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%20%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA%D0%BE%D0%BC) Мог показываться в каталоге игр перед запуском игры. На экране перечислялись права, которые будут запрошены при запуске. | В играх, созданных на платформе после указанных изменений, экран игры перед загрузкой не нужен. Теперь можно настраивать [экран](https://dev.vk.ru/ru/games/development/launch-screen) [запуска](https://dev.vk.ru/ru/games/development/launch-screen), как в мини- приложениях. |
| [Экран запуска](https://dev.vk.ru/ru/games/development/launch-screen) Экран запуска есть, но он не настраиваемый. | Экран запуска можно настраивать в [панели](https://dev.vk.ru/ru/games/settings/general/design#%D0%AD%D0%BA%D1%80%D0%B0%D0%BD%20%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA%D0%B0) [управления](https://dev.vk.ru/ru/games/settings/general/design#%D0%AD%D0%BA%D1%80%D0%B0%D0%BD%20%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA%D0%B0). |

| Функциональность | Было | Стало |
|---|---|---|
| Первый запрос к API Первый запрос к API мог использоваться при запуске игры. | Первый запрос к API не нужен. |
| Группы тестирования Функциональность отсутствовала. | Добавлена возможность | создавать [тестовые группы](https://dev.vk.ru/ru/games/settings/test-groups). |
| Хранимые процедуры Функциональность отсутствовала. | Добавлена возможность | создавать [хранимые](https://dev.vk.ru/ru/games/settings/development/stored-procedures) [процедуры](https://dev.vk.ru/ru/games/settings/development/stored-procedures). |

[Хостинг статики](https://dev.vk.ru/ru/games/development/hosting/overview) Не было поддержики m.vk.com. Добавлена возможность обновлять игру на m.vk.com отдельно от мобильных устройств и десктопа.

| Платформы размещения Настройки размещения для игр и мини-приложений различались. Раньше играм были доступны параметры Direct games для загрузки в WebView и Web для загрузки в iframe. | Теперь в играх и мини- приложениях используется единый формат [настроек](https://dev.vk.ru/ru/games/settings/general/placement) [размещения](https://dev.vk.ru/ru/games/settings/general/placement). Вы можете указать разные адреса для запуска игры в мобильном приложении, в мобильной и десктопной версиях сайта. |
|---|---|

## Материалы по теме

- [Параметры запуска](https://dev.vk.ru/ru/games/development/parameters)
- [Экран запуска](https://dev.vk.ru/ru/games/development/launch-screen)
- [Запрос прав (устарел)](https://dev.vk.ru/ru/games/development/permissions)
- [Хранимые процедуры](https://dev.vk.ru/ru/games/settings/development/stored-procedures)
- [Тестовые группы](https://dev.vk.ru/ru/games/settings/test-groups)
- [Хостинг статики](https://dev.vk.ru/ru/games/development/hosting/overview)
- Событие [`VKWebAppGetLaunchParams`](https://dev.vk.ru/ru/bridge/VKWebAppGetLaunchParams)
