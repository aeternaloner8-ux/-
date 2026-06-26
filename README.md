# Сайт

Статический сайт (HTML / CSS / JS), готовый к публикации через GitHub Pages.

## Структура
- `index.html` — главная страница (точка входа для GitHub Pages)
- `about.html`, `portfolio.html`, `process.html`, `reviews.html`, `contacts.html` — внутренние страницы
- `project-greben.html`, `project-liniya.html`, `project-solis.html`, `project-panorama.html` — страницы проектов
- `velora-homes.html` — отдельный одностраничный лендинг ВЕЛОРА
- `styles.css`, `main.js` — общие стили и скрипты
- `assets/` — изображения и иконки

## Локальный просмотр
Открой `index.html` в браузере или запусти простой сервер:

```bash
python3 -m http.server 8000
```

затем открой http://localhost:8000

## Публикация (GitHub Pages)
1. Открой репозиторий на GitHub → **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main`, папка `/ (root)` → **Save**
4. Через 1–2 минуты сайт будет доступен по адресу:
   `https://aeternaloner8-ux.github.io/-/`
