# photos

**Раздел:** photos  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

## Photos

Методы для работы с фотографиями.

[`copy`](https://dev.vk.ru/ru/method/photos.copy) Позволяет скопировать фотографию в альбом "Сохраненные фотографии"

[`createAlbum`](https://dev.vk.ru/ru/method/photos.createAlbum) Создает пустой альбом для фотографий.

[`createComment`](https://dev.vk.ru/ru/method/photos.createComment) Создает новый комментарий к фотографии.

[`delete`](https://dev.vk.ru/ru/method/photos.delete) Удаление фотографии на сайте.

[`deleteAlbum`](https://dev.vk.ru/ru/method/photos.deleteAlbum) Удаляет указанный альбом для фотографий у текущего пользователя

[`deleteComment`](https://dev.vk.ru/ru/method/photos.deleteComment) Удаляет комментарий к фотографии.

[`edit`](https://dev.vk.ru/ru/method/photos.edit) Редактирует описание или геометку у фотографии.

[`editAlbum`](https://dev.vk.ru/ru/method/photos.editAlbum) Редактирует данные альбома для фотографий.

[`editComment`](https://dev.vk.ru/ru/method/photos.editComment) Изменяет текст комментария к фотографии.

[`get`](https://dev.vk.ru/ru/method/photos.get) Возвращает список фотографий в альбоме.

[`getAlbums`](https://dev.vk.ru/ru/method/photos.getAlbums) Возвращает список фотоальбомов пользователя или сообщества.

[`getAlbumsCount`](https://dev.vk.ru/ru/method/photos.getAlbumsCount) Возвращает количество доступных альбомов пользователя или сообщества.

[`getAll`](https://dev.vk.ru/ru/method/photos.getAll) Возвращает все фотографии пользователя или сообщества в антихронологическом порядке.

[`getAllComments`](https://dev.vk.ru/ru/method/photos.getAllComments) Возвращает отсортированный в антихронологическом порядке список всех комментариев к конкретному альбому или ко всем альбомам пользователя.

[`getById`](https://dev.vk.ru/ru/method/photos.getById) Возвращает информацию о фотографиях по их идентификаторам.

[`getChatUploadServer`](https://dev.vk.ru/ru/method/photos.getChatUploadServer) Метод получает адрес сервера для [загрузки обложки чата](https://dev.vk.ru/ru/api/upload/main-photo-in-chat).

[`getComments`](https://dev.vk.ru/ru/method/photos.getComments) Возвращает список комментариев к фотографии.

| [`getMarketAlbumUploadServ`](https://dev.vk.ru/ru/method/photos.getMarketAlbumUploadServer) [`er`](https://dev.vk.ru/ru/method/photos.getMarketAlbumUploadServer) | Метод получает адрес сервера для [загрузки фотографии подборки](https://dev.vk.ru/ru/api/upload/main-photo-in-market) [товаров](https://dev.vk.ru/ru/api/upload/main-photo-in-market) в сообществе. |
|---|---|
| [`getMessagesUploadServer`](https://dev.vk.ru/ru/method/photos.getMessagesUploadServer) | Метод получает адрес сервера для [загрузки фотографии в личное](https://dev.vk.ru/ru/api/upload/photo-in-message) [сообщение](https://dev.vk.ru/ru/api/upload/photo-in-message) пользователя или в сообщение сообщества. |
| [`getOwnerCoverPhotoUploa`](https://dev.vk.ru/ru/method/photos.getOwnerCoverPhotoUploadServer) [`dServer`](https://dev.vk.ru/ru/method/photos.getOwnerCoverPhotoUploadServer) | Метод получает адрес сервера для [загрузки обложки](https://dev.vk.ru/ru/api/upload/main-photo-in-group) сообщества. |
| [`getOwnerPhotoUploadServ`](https://dev.vk.ru/ru/method/photos.getOwnerPhotoUploadServer) [`er`](https://dev.vk.ru/ru/method/photos.getOwnerPhotoUploadServer) | Метод получает адрес сервера для [загрузки главной фотографии](https://dev.vk.ru/ru/api/upload/main-photo-in-profile) на страницу пользователя или сообщества. |
| [`getUploadServer`](https://dev.vk.ru/ru/method/photos.getUploadServer) | Метод получает адрес сервера для [загрузки фотографий в альбом](https://dev.vk.ru/ru/api/upload/album-photos) пользователя или сообщества. |
| [`getUserPhotos`](https://dev.vk.ru/ru/method/photos.getUserPhotos) | Возвращает список фотографий, на которых отмечен пользователь |
| [`getWallUploadServer`](https://dev.vk.ru/ru/method/photos.getWallUploadServer) | Метод получает адрес сервера для [загрузки фотографии на стену](https://dev.vk.ru/ru/api/upload/wall-photo) пользователя или сообщества. |
| [`makeCover`](https://dev.vk.ru/ru/method/photos.makeCover) | Делает фотографию обложкой альбома. |
| [`move`](https://dev.vk.ru/ru/method/photos.move) | Переносит фотографию из одного альбома в другой. |
| [`reorderAlbums`](https://dev.vk.ru/ru/method/photos.reorderAlbums) | Меняет порядок альбома в списке альбомов пользователя. |
| [`reorderPhotos`](https://dev.vk.ru/ru/method/photos.reorderPhotos) | Меняет порядок фотографии в списке фотографий альбома пользователя. |
| [`report`](https://dev.vk.ru/ru/method/photos.report) | Позволяет пожаловаться на фотографию. |
| [`reportComment`](https://dev.vk.ru/ru/method/photos.reportComment) | Позволяет пожаловаться на комментарий к фотографии. |
| [`restore`](https://dev.vk.ru/ru/method/photos.restore) | Восстанавливает удаленную фотографию. |
| [`restoreComment`](https://dev.vk.ru/ru/method/photos.restoreComment) | Восстанавливает удаленный комментарий к фотографии. |
| [`save`](https://dev.vk.ru/ru/method/photos.save) | Метод сохраняет фотографии в альбом после их успешной [загрузки на сервер](https://dev.vk.ru/ru/api/upload/album-photos). |
| [`saveMarketAlbumPhoto`](https://dev.vk.ru/ru/method/photos.saveMarketAlbumPhoto) | Метод сохраняет фотографию подборки товаров сообщества после её успешной [загрузки на сервер](https://dev.vk.ru/ru/api/upload/main-photo-in-market). |
| [`saveMessagesPhoto`](https://dev.vk.ru/ru/method/photos.saveMessagesPhoto) | Метод сохраняет фотографию в личном сообщении после её успешной [загрузки на сервер](https://dev.vk.ru/ru/api/upload/photo-in-message). |
| [`saveOwnerCoverPhoto`](https://dev.vk.ru/ru/method/photos.saveOwnerCoverPhoto) | Метод сохраняет обложку сообщества или профиля пользователя после её успешной [загрузки на сервер](https://dev.vk.ru/ru/api/upload/main-photo-in-group). |
| [`saveOwnerPhoto`](https://dev.vk.ru/ru/method/photos.saveOwnerPhoto) | Метод сохраняет главную фотографию после её успешной [загрузки на сервер](https://dev.vk.ru/ru/api/upload/main-photo-in-profile). |
| [`saveWallPhoto`](https://dev.vk.ru/ru/method/photos.saveWallPhoto) | Метод сохраняет фотографии на стене после их успешной [загрузки на сервер](https://dev.vk.ru/ru/api/upload/wall-photo). |
| [`search`](https://dev.vk.ru/ru/method/photos.search) | Осуществляет поиск изображений по местоположению или описанию. |
