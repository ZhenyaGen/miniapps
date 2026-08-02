# VKUI

**Раздел:** Библиотеки → VKUI  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## VKUI-компоненты

VKUI — это библиотека адаптивных React-компонентов. С её помощью вы можете создавать привлекательный интерфейс [мини-приложений](https://dev.vk.ru/ru/mini-apps/overview) для мобильных устройств.

## Файлы и ресурсы

**Ресурс | Описание**

npm [https://www.npmjs.com/package/@vkontakte/vkui](https://www.npmjs.com/package/@vkontakte/vkui) Пакет для установки

GitHub [https://github.com/VKCOM/VKUI](https://github.com/VKCOM/VKUI) Исходный код

Figma [https://www.figma.com/@vk](https://www.figma.com/@vk) Графические файлы

## Документация

- [Полная документация](https://vkui.io/overview/about)
- [Интеграция с VK Mini Apps](https://vkui.io/integrations/vk-mini-apps)

## VKUI и VK Bridge

Ранние версии VKUI включали поддержку библиотеку [VK Bridge](https://dev.vk.ru/ru/bridge/overview), которая необходима для работы [мини-приложений](https://dev.vk.ru/ru/mini-apps/overview) и [игр](https://dev.vk.ru/ru/games/overview) ВКонтакте. Эта библиотека устанавливалась на компьютеры разработчиков при установке пакета VKUI.

По мере своего развития VKUI превратилась в полноценную React-библиотеку, которую можно использовать не только для создания мини-приложений ВКонтакте, но и для разработки других приложений на React. Поэтому при подготовке VKUI версии 6.0 разработчики приняли решение исключить из неё поддержку VK Bridge.

Если вы используете VKUI версии 6.0 или более поздней, вам надо самостоятельно подключить VK Bridge к своему проекту. Это несложно, подробные инструкции есть в документации VKUI, в разделе [Интеграция с VK Mini Apps](https://vkui.io/integrations/vk-mini-apps).

## Материалы по теме

- [Библиотека VK Bridge](https://dev.vk.ru/ru/bridge/overview)
- [Мини-приложения](https://dev.vk.ru/ru/mini-apps/overview)
- [SDK ВКонтакте](https://dev.vk.ru/ru/sdk/overview)
