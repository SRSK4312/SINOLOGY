## Копирование на сервер
Подключится к серверу по ssh или другими методами.
  # Установить Nodejs и npm.
  ```bash
  $ sudo apt update
  $ sudo apt install nodejs
  $ node -v
  Output
  v10.19.0
  ```
  # Установить git
  ``` bash
  $ sudo apt update
  $ sudo apt install git
  $ git --version
  ```
  # Создать папку проекта, скопировать в неё git репозиторий при помощи команды git-clone
  ``` bash
  $ git clone {repository URL}
  ```

## Иницализация

```bash
$ npm install
```

## Запуск приложения

```bash
# production mode
$ npm run start:prod

# development
$ npm run start

# watch mode
$ npm run start:dev
```
