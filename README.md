# ВЕЛОРА — модульные дома

Лендинг компании «ВЕЛОРА» с формой заявки. Заявки сохраняются в облачную базу
Postgres через serverless-функцию Vercel.

## Структура
- `index.html` / `velora-homes.html` — сайт (главная страница)
- `api/lead.js` — приём заявки (POST `/api/lead`) → запись в Postgres
- `api/leads.js` — просмотр заявок (GET `/api/leads?key=...`, защищено ключом)
- `package.json` — зависимость `@neondatabase/serverless`

## Как развернуть онлайн (Vercel + бесплатная Postgres)

### 1. Импорт в Vercel
1. https://vercel.com/new → войти через **GitHub**
2. **Import** репозиторий `aeternaloner8-ux/-`
3. Framework Preset: **Other** → **Deploy**
   (получишь домен вида `https://<имя>.vercel.app`)

### 2. Подключить базу (Postgres от Neon)
В дашборде проекта на Vercel:
1. Вкладка **Storage** → **Create Database** → **Postgres** (Neon) → **Create & Connect**
2. Vercel сам добавит переменную окружения `DATABASE_URL` в проект.

(Альтернатива: создать бесплатную базу на https://neon.tech, скопировать
connection string и добавить вручную в **Settings → Environment Variables**
как `DATABASE_URL`.)

### 3. Ключ для просмотра заявок
**Settings → Environment Variables** → добавить:
- `ADMIN_KEY` = любая ваша секретная строка (например, длинный пароль)

### 4. Передеплой
**Deployments → … → Redeploy** (чтобы подхватились переменные окружения).

## Как пользоваться
- Форма на сайте → заявка падает в таблицу `leads` (создаётся автоматически).
- Посмотреть все заявки:
  `https://<ваш-домен>.vercel.app/api/leads?key=ВАШ_ADMIN_KEY`

## Локальный просмотр верстки
Просто открыть `index.html` в браузере (форма онлайн-сохранения работает только
на Vercel, где есть база и функции).
