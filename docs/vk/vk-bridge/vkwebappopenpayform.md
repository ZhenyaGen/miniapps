# VKWebAppOpenPayForm

**Раздел:** VK Bridge → VKWebAppOpenPayForm  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

`VKWebAppOpenPayForm` показывает экран [VK Pay](https://dev.vk.ru/ru/pay/getting-started) для совершения платежа.

Примечание. Если пользователь ещё не завёл аккаунт VK Pay, при первом вызове ему будет предложено ввести данные для регистрации.

## Пример

```js
bridge.send('VKWebAppOpenPayForm', {
    app_id: 6909581,
    action: 'pay-to-service',
    params: {
      user_id: 743784474
    }})
  .then((data) => {
    if (data.status) {
      // Экран VK Pay показан
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
```

## Совместимость

| Площадки | Платформы |
|---|---|
| ВКонтакте | Android, iOS, Mobile Web, Web |
| Одноклассники | – |

## Параметры

| Поле | Тип | Описание |
|---|---|---|
| `app_id` обязательное | `integer` | Идентификатор мини-приложения. |

| Поле | Тип | Описание |
|---|---|---|
| `action` обязательное | `string` | Тип перевода. Всегда `pay-to-service` — перевод в пользу юридического лица. |
| `params` обязательное | `object` | Параметры платёжного окна VK Pay. Параметры зависят от типа платежа `action`. Подробнее — в [инструкции по проведению платежа](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/payment-create#%D0%A8%D0%B0%D0%B3%203.%20%D0%9E%D1%82%D0%BF%D1%80%D0%B0%D0%B2%D1%8C%D1%82%D0%B5%20%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%20%D0%BD%D0%B0%20%D0%BE%D1%82%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BB%D0%B0%D1%82%D1%91%D0%B6%D0%BD%D0%BE%D0%B3%D0%BE%20%D0%BE%D0%BA%D0%BD%D0%B0%20VK%C2%A0Pay). |

## Результат

Проверить результат можно:

- Используя объект `Promise`, который возвращается вызовом `bridge.send(...)`.
- С помощью событий `VKWebAppOpenPayFormResult` и `VKWebAppOpenPayFormFailed`.

[Подробнее о проверке результатов при вызовах VK Bridge](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

Возможные ошибки:

- `This action cannot be performed in the background`, если мини-приложение или игра запущены в фоновом режиме.

### Объект Promise

Если обращение к платформе прошло успешно, управление будет передано в `then` -обработчик объекта `Promise`. В качестве ответа платформа возвращает объект со следующими полями:

**Поле | Тип | Описание**

`status` `boolean` Информация о том, успешно ли выполнен платёж. Возможные значения:
- `true` — платёж выполнен успешно.
- `false` — произошла ошибка.

`transaction_id` `string` Идентификатор транзакции в платёжной системе. Поле возвращается, если поле `status` имеет значение `true`.

`amount` `string` Сумма платежа.

`extra` `string` Дополнительные данные о продавце. Содержит данные объекта

[`params.data`](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/payment-create#%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20data) [.](https://dev.vk.ru/ru/pay/payment-form/payment-form-for-developers/payment-create#%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%20data)

Если при обращении к платформе произошла ошибка, управление передаётся в метод `catch`. В качестве ответа платформа возвращает [объект с информацией об ошибке](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA), общий для всех событий VK Bridge.

### События

`VKWebAppOpenPayFormResult`

Сигнализирует, что экран VK Pay показан. В обработчик события на стороне пользователя передаются следующие данные:

```js
{
  detail: {
    type: "VKWebAppOpenPayFormResult",
    data: {
      status: true,
      transaction_id: "1234ABCD-EEEE-5678-90FG-ABCDEF123456",
      amount: "120.5",
      extra: "
{\"currency\":\"RUB\",\"merchant_data\":\"some_merchant_data\",\"merchant_sign
\":\"some_sign\",\"order_id\":\"some_order_id\",\"ts\":1641999488}\""
    }
  }
}
```

Передаваемый объект подобен объекту, возвращаемому при успешном выполнении промиса.

`VKWebAppOpenPayFormFailed`

Информирует об ошибке, которая произошла при взаимодействии с платформой.

В обработчик события на стороне пользователя передаётся [объект с информацией об ошибке,](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA) общий для всех методов VK Bridge.

#### Пример обработки событий

Подробнее — в разделе [Обработка результата](https://dev.vk.ru/ru/bridge/getting-started#%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0%20%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D0%B0).

## Песочница

[VKWebAppOpenPayForm](https://vk.cc/bZfweB)

## Материалы по теме

- [Документация VK Pay](https://dev.vk.ru/ru/pay/getting-started)
- [Платёжное окно](https://dev.vk.ru/ru/pay/payment-form/general-description)
- [Продажа товаров в мини-приложениях](https://dev.vk.ru/ru/mini-apps/monetization/payments)
