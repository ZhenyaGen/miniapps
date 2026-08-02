# miniapps

Разработка мини-приложений ВКонтакте.

## Приложения

| Приложение | Что делает |
|---|---|
| [`apps/vk-audit`](apps/vk-audit/README.md) | мини-приложение: аудит страницы ВК — метрики, зоны роста, план на 4 недели, сравнение с конкурентами. Считает без сервера, прямо в браузере |
| [`apps/vk-bot`](apps/vk-bot/README.md) | бот сообщества: присылает разборы в личные сообщения раз в неделю или в месяц. Текст пишет DeepSeek, цифры — тот же движок |

**Запустить за 10 минут, без терминала** — [КАК-ЗАПУСТИТЬ.md](КАК-ЗАПУСТИТЬ.md).
Всё остальное (свой домен, бот, обслуживание) — [ИНСТРУКЦИЯ.md](ИНСТРУКЦИЯ.md).

## База знаний

В [`docs/vk/`](docs/vk/README.md) лежит офлайн-копия документации [dev.vk.ru](https://dev.vk.ru) —
**499 страниц** в Markdown, сконвертированных из PDF-экспорта:

| Раздел | Страниц |
|---|---|
| [VK Bridge](docs/vk/vk-bridge/) — события `VKWebApp*` ([справочник](docs/vk/vk-bridge/EVENTS.md)) | 100 |
| [Мини-приложения](docs/vk/mini-apps/) — платформа, запуск, монетизация, видеокурс | 89 |
| [VK Games](docs/vk/vk-games/) | 80 |
| [Библиотеки и SDK](docs/vk/libraries/) — VKUI, `vk-mini-apps-router`, VK QR, серверные SDK | 58 |
| [API ВКонтакте](docs/vk/api/) | 47 |
| [Интеграция](docs/vk/integration/) | 45 |
| [VK Pay](docs/vk/vk-pay/) | 21 |
| Остальное — [Одноклассники](docs/vk/odnoklassniki/), [Captcha](docs/vk/captcha/), [VK Testers](docs/vk/vk-testers/), [Маски](docs/vk/masks/), [Правила](docs/vk/rules/) и др. | 59 |

Навигация — [`docs/vk/README.md`](docs/vk/README.md), машиночитаемый индекс — `docs/vk/index.json`.

Скрипты конвертации — [`tools/vk-docs/`](tools/vk-docs/README.md).
