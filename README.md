Для запуска через докер:
1) Скопировать репозиторий
2) Cоздать файл .env вида:
  {
    NODE_ENV=development # Пока не использую
    PORT=5000

    POSTGRES_USER=admin
    POSTGRES_PASSWORD=admin
    POSTGRES_HOST=postgres #postgres | localhost
    POSTGRES_PORT=5432
    POSTGRES_DB=test_appeal
    POSTGRES_URL='postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public'
  }
3) Запустить команду docker compose up --build -d

(Для запуска сервера не через докер поменять POSTGRES_HOST=localhost)
