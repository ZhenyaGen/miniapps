# Установка ПО

**Раздел:** Мини-приложения → Разработка → Установка ПО  
**Источник:** документация VK для разработчиков (dev.vk.com)

---

Чтобы библиотеки ВКонтакте работали корректно, установите программное обеспечение:

- Node.js 16.x.x.
- Python 3.x.
- C++ (только для Linux и Windows).

## Установка Node.js

Необходима именно 16 мажорная версия Node.js.

### macOS

Установите Node.js, например с помощью [менеджера пакетов brew:](https://nodejs.org/en/download/package-manager/#macos)

```bash
brew install node@16
```

### Linux

Пример команд для установки Node.js с помощью cURL и менеджера пакетов nvm:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh |
bash
source ~/.bashrc
nvm list-remote
nvm install v16.15.0
```

### Windows 10

1. Скачайте [установщик Node.js 16.x.x](https://nodejs.org/download/release/latest-v16.x/).

2. Запустите установщик.

3. Выполните шаги по установке.

4. Перезагрузите компьютер.

## Установка Python

Необходима именно 3 мажорная версия Python.

### macOS

```bash
brew install python@3.9
```

### Linux (Ubuntu)

```bash
sudo apt install python3.9
```

### Windows 10

1. Перейдите на [страницу пакета Python 3.x в Microsoft Store](https://www.microsoft.com/en-us/p/python-310/9pjpw5ldxlz5).

2. Нажмите кнопку Get in Store app.

3. Нажмите кнопку Открыть приложение "Microsoft Store".

4. Нажмите Получить и Установить.

5. Перезагрузите компьютер.

## Установка C++

Если вы создаёте мини-приложение на Linux или Windows, установите С++ по этой инструкции.

### Linux (Ubuntu)

Установите инструменты компилятора C/C++, например [GCC](https://gcc.gnu.org/):

```bash
sudo apt -y install build-essential
```

### Windows 10

Установите компоненты C/C++ с помощью Visual Studio:

1. Скачайте [установщик Visual Studio](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools).

2. Запустите установщик.

3. Установите флажок Разработка классических приложений на C++.

4. Нажмите кнопку Установить. Дождитесь окончания установки.

5. Откройте командную строку и выполните команду:

```bash
npm config set msvs_version 2017
```

## FAQ

### Как сменить версию Node.js на 16?

Чтобы сменить версию Node.js на macOS, выполните команды:

```bash
brew unlink node
brew link --overwrite node@16
```

Иногда после смены версии требуется добавить Node.js в переменные окружения:

```bash
echo 'export PATH="/usr/local/opt/node@16/bin:$PATH"' >> ~/.zshrc
```

Чтобы сменить версию Node.js на Linux, выполните команду:

```bash
nvm install v16.15.0
```

Чтобы убедиться, что смена прошла успешно, проверьте номер версии:

```bash
node -v
```

### Что такое NPM?

NPM — менеджер пакетов, который автоматически устанавливается вместе с Node.js. Если вы уже установили Node.js, устанавливать NPM отдельно не нужно. Рекомендуем почитать про NPM и NPX в [официальной документации](https://docs.npmjs.com/about-npm).

### Зачем устанавливать C++?

Модули, написанные на С++, используются в библиотеках ВКонтакте. Для компиляции кода на C++ используется [node-gyp](https://github.com/nodejs/node-gyp), который устанавливается вместе с Node.js и может вызывать ошибки, если C++ не установлен.
