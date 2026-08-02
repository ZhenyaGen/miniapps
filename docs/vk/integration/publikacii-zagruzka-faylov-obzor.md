# Обзор

**Раздел:** Интеграция → Публикации → Загрузка файлов → Обзор  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Возможность поделиться с друзьями своей фотографией, прикрепить документ или понравившийся клип очень важна для многих пользователей. Реализовав эту функциональность, вы сделаете своё приложение более привлекательным и востребованным.

Процесс загрузки любого файла состоит из следующих этапов:

1. Получение адреса для загрузки.

2. Передача файлов на полученный адрес в формате [`multipart/form-data`](https://ru.wikipedia.org/wiki/Multipart/form-data) [.](https://ru.wikipedia.org/wiki/Multipart/form-data)

3. Сохранение информации о загруженном файле.

Примечание. Чтобы сохранить информацию о загруженном файле, удалите из параметров

`photo`, `photo_list` экранирование (символ `\`).

Детали процесса загрузки могут отличаться в зависимости от типа файла.

В левом меню вы найдёте разделы с подробными инструкциями для всех типов медиаконтента:

- [Загрузка фотографий в альбом](https://dev.vk.ru/ru/api/upload/album-photos)
- [Загрузка фотографии на стену](https://dev.vk.ru/ru/api/upload/wall-photo)
- [Загрузка главной фотографии пользователя или сообщества](https://dev.vk.ru/ru/api/upload/main-photo-in-profile)
- [Загрузка фотографии в личное сообщение](https://dev.vk.ru/ru/api/upload/photo-in-message)
- [Загрузка главной фотографии для чата](https://dev.vk.ru/ru/api/upload/main-photo-in-chat)
- [Загрузка фотографии для товара](https://dev.vk.ru/ru/api/upload/photo-in-market)
- [Загрузка фотографии для подборки товаров](https://dev.vk.ru/ru/api/upload/main-photo-in-market)
- [Загрузка видеозаписи в профиль](https://dev.vk.ru/ru/api/upload/video-in-profile)
- [Загрузка документов](https://dev.vk.ru/ru/api/upload/document-in-profile)
- [Загрузка обложки сообщества](https://dev.vk.ru/ru/api/upload/main-photo-in-group)
- [Загрузка аудиосообщения](https://dev.vk.ru/ru/api/upload/audio-record)
- [Загрузка истории в профиль](https://dev.vk.ru/ru/api/upload/story-in-profile)
