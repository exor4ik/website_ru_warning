# GitHub Pages Setup Guide

## Проблемы и решения

### Проблема: Three.js не загружается на GitHub Pages

**Причины:**
- CDN блокируется браузером или недоступен
- Проблемы с CORS
- Проблемы с путями к файлам

**Решение:**
1. Использован более надежный CDN - jsDelivr вместо cdnjs
2. Добавлен файл `.nojekyll` для отключения Jekyll обработки
3. Добавлена конфигурация в `_config.yml`
4. Реализован CSS fallback, если Three.js не загружается

### Требуемая конфигурация GitHub Pages

1. **Включить GitHub Pages в репозитории:**
   - Перейдите в Settings → Pages
   - Выберите Branch: `main` (или `master`)
   - Сохраните

2. **Структура файлов:**
   ```
   ├── index.html
   ├── 404.html
   ├── style.css
   ├── script.js
   ├── .nojekyll (пустой файл)
   ├── _config.yml
   ├── .gitignore
   └── README.md
   ```

3. **Файлы конфигурации:**
   - `.nojekyll` - отключает Jekyll обработку
   - `_config.yml` - конфигурация GitHub Pages
   - `404.html` - обработка ошибок 404

### Тестирование локально

```bash
# Простой HTTP сервер (Python 3)
python -m http.server 8000

# Простой HTTP сервер (Node.js)
npx http-server

# Простой HTTP сервер (Ruby)
ruby -run -ehttpd . -p8000
```

Затем откройте `http://localhost:8000` в браузере.

### Отладка на GitHub Pages

1. Откройте консоль браузера (F12)
2. Проверьте наличие ошибок в консоли
3. Перейдите на вкладку Network и проверьте загрузку файлов
4. Убедитесь, что Three.js загружается с jsDelivr

### Fallback механизм

Если Three.js не загружается:
- Будет применен CSS gradient фон вместо 3D сцены
- Страница всё равно будет выглядеть как PS2 RSOD
- Клик на страницу будет работать

### URL развертывания

После включения GitHub Pages сайт будет доступен по:
`https://USERNAME.github.io/website_ru_warning/`

Замените `USERNAME` на ваше имя пользователя GitHub.
