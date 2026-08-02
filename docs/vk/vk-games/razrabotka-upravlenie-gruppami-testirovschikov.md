# Управление группами тестировщиков

**Раздел:** VK Games → Разработка → Управление группами тестировщиков  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Вы можете управлять [группами тестировщиков](https://dev.vk.ru/ru/games/settings/test-groups) игры c помощью методов API.

Важно! Методы для управления группами тестировщиков используются с [сервисным ключом](https://dev.vk.ru/ru/games/settings/development/keys#%D0%A1%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BB%D1%8E%D1%87) [доступа мини-приложения](https://dev.vk.ru/ru/games/settings/development/keys#%D0%A1%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BB%D1%8E%D1%87) и могут быть вызваны только на сервере.

Для вызова методов API используйте [GET- или POST-запросы](https://dev.vk.ru/ru/api/api-requests).

## Получение

Вызовите метод [получения информации о группе тестировщиков](https://dev.vk.ru/ru/method/apps.getTestingGroups) с помощью POST-запроса.

```bash
curl -X POST 'https://api.vk.ru/method/apps.getTestingGroups' \
  -H 'Authorization: Bearer <КЛЮЧ_ДОСТУПА>' \
  -F 'group_id=<ИДЕНТИФИКАТОР_ГРУППЫ_ТЕСТИРОВЩИКОВ>' \
  -F 'v=<ВЕРСИЯ_API>'
```

## Создание

Вызовите метод [создания группы тестировщиков](https://dev.vk.ru/ru/method/apps.updateMetaForTestingGroup) с помощью POST-запроса.

```bash
curl -X POST 'https://api.vk.ru/method/apps.updateMetaForTestingGroup' \
  -H 'Authorization: Bearer <КЛЮЧ_ДОСТУПА>' \
  -F 'group_id=<ИДЕНТИФИКАТОР_ГРУППЫ_ТЕСТИРОВЩИКОВ>' \
  -F 'webview=<URL_МИНИ_ПРИЛОЖЕНИЯ>' \
  -F 'name=<НАЗВАНИЕ_ГРУППЫ_ТЕСТИРОВЩИКОВ>' \
  -F 'platforms=<ДОСТУПНЫЕ_ПЛАТФОРМЫ_МИНИ_ПРИЛОЖЕНИЯ>' \
  -F 'user_ids=<ИДЕНТИФИКАТОРЫ_ПОЛЬЗОВАТЕЛЕЙ_ГРУППЫ_ТЕСТИРОВЩИКОВ>' \
  -F 'v=<ВЕРСИЯ_API>'
```

## Редактирование

Вызовите метод [редактирования группы тестировщиков](https://dev.vk.ru/ru/method/apps.updateMetaForTestingGroup) с помощью POST-запроса.

```bash
curl -X POST 'https://api.vk.ru/method/apps.updateMetaForTestingGroup' \
  -H 'Authorization: Bearer <КЛЮЧ_ДОСТУПА>' \
  -F 'group_id=<ИДЕНТИФИКАТОР_ГРУППЫ_ТЕСТИРОВЩИКОВ>' \
  -F 'webview=<URL_МИНИ_ПРИЛОЖЕНИЯ>' \
  -F 'name=<НАЗВАНИЕ_ГРУППЫ_ТЕСТИРОВЩИКОВ>' \
  -F 'platforms=<ДОСТУПНЫЕ_ПЛАТФОРМЫ_МИНИ_ПРИЛОЖЕНИЯ>' \
  -F 'user_ids=<ИДЕНТИФИКАТОРЫ_ПОЛЬЗОВАТЕЛЕЙ_ГРУППЫ_ТЕСТИРОВЩИКОВ>' \
  -F 'v=<ВЕРСИЯ_API>'
```

### Добавление пользователей

Вызовите метод [добавления пользователей в группу тестировщиков](https://dev.vk.ru/ru/method/apps.addUsersToTestingGroup) с помощью POST-запроса.

```bash
curl -X POST 'https://api.vk.ru/method/apps.addUsersToTestingGroup' \
  -H 'Authorization: Bearer <КЛЮЧ_ДОСТУПА>' \
  -F 'user_ids=<ИДЕНТИФИКАТОРЫ_ПОЛЬЗОВАТЕЛЕЙ_ГРУППЫ_ТЕСТИРОВЩИКОВ>' \
  -F 'group_id=<ИДЕНТИФИКАТОР_ГРУППЫ_ТЕСТИРОВЩИКОВ>' \
  -F 'v=<ВЕРСИЯ_API>'
```

### Удаление пользователей

Вызовите метод [удаления пользователей из групп тестировщиков](https://dev.vk.ru/ru/method/apps.removeUsersFromTestingGroups) с помощью POST-запроса.

```bash
curl -X POST 'https://api.vk.ru/method/apps.removeUsersFromTestingGroups' \
  -H 'Authorization: Bearer <КЛЮЧ_ДОСТУПА>' \
  -F 'user_ids=<ИДЕНТИФИКАТОРЫ_ПОЛЬЗОВАТЕЛЕЙ_ГРУППЫ_ТЕСТИРОВЩИКОВ>' \
  -F 'v=<ВЕРСИЯ_API>'
```

## Удаление группы тестировщиков

Вызовите метод [удаления группы тестировщиков](https://dev.vk.ru/ru/method/apps.removeTestingGroup) с помощью POST-запроса.

```bash
curl -X POST 'https://api.vk.ru/method/apps.removeTestingGroup' \
  -H 'Authorization: Bearer <КЛЮЧ_ДОСТУПА>' \
  -F 'group_id=<ИДЕНТИФИКАТОР_ГРУППЫ_ТЕСТИРОВЩИКОВ>' \
  -F 'v=<ВЕРСИЯ_API>'
```
