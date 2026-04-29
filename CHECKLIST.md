# GitHub Pages Setup Checklist

## ✅ Файлы проекта

- [x] `index.html` - основной HTML файл с базовым URL для GitHub Pages
- [x] `404.html` - обработка 404 ошибок 
- [x] `style.css` - стили с PS2 RSOD эффектами
- [x] `script.js` - Three.js код с fallback механизмом
- [x] `.nojekyll` - отключение Jekyll обработки
- [x] `_config.yml` - конфигурация GitHub Pages
- [x] `.gitignore` - исключение файлов из Git
- [x] `README.md` - основная документация
- [x] `run_server.py` - локальный сервер для тестирования
- [x] `DEPLOYMENT.md` - инструкции по развертыванию
- [x] `GITHUB_PAGES_SETUP.md` - документация по GitHub Pages

## 🔧 Внедренные исправления

### Проблема 1: CDN не работал на GitHub Pages
- ✅ Заменён cdnjs на jsDelivr (более надежный)
- ✅ Добавлен fallback на unpkg CDN
- ✅ Реализована проверка загрузки Three.js

### Проблема 2: Three.js может не загружаться
- ✅ Добавлен CSS gradient fallback
- ✅ Реализована логика повторной попытки загрузки
- ✅ Добавлено логирование в консоль

### Проблема 3: Пути к файлам на GitHub Pages
- ✅ Добавлено автоматическое определение baseurl
- ✅ Реализована поддержка как `/website_ru_warning/` так и `/` путей

### Проблема 4: Jekyll обработка конфликтует с файлами
- ✅ Создан файл `.nojekyll`
- ✅ Обновлен `_config.yml` с правильными настройками

## 📋 Шаги для развертывания

1. [ ] Убедитесь, что все файлы закоммичены
   ```bash
   git add .
   git commit -m "PS2 RSOD warning with GitHub Pages support"
   git push
   ```

2. [ ] Включите GitHub Pages в Settings репозитория
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: main
   - Folder: / (root)

3. [ ] Дождитесь развертывания (1-2 минуты)

4. [ ] Проверьте сайт по URL
   - https://USERNAME.github.io/website_ru_warning/

## 🧪 Локальное тестирование

```bash
# Способ 1: Python
python -m http.server 8000

# Способ 2: встроенный скрипт
python run_server.py

# Способ 3: Node.js
npx http-server
```

Затем откройте `http://localhost:8000` в браузере.

## 🔍 Отладка

### Проверка загрузки Three.js
1. Откройте F12 → Console
2. Проверьте ошибки
3. Убедитесь, что `window.THREE` определён

### Проверка Network
1. F12 → Network
2. Проверьте загрузку `three.min.js`, `style.css`, `script.js`

### Fallback работает
- Если Three.js не загружается, будет виден красный CSS gradient
- Клик на страницу всё равно будет выполнять редирект

## 📝 Примечания

- JavaScript автоматически определяет, запущена ли страница на GitHub Pages
- Three.js загружается с двумя fallback CDN (jsDelivr → unpkg)
- CSS fallback гарантирует, что страница будет выглядеть правильно даже без 3D
- Все пути относительные для совместимости с GitHub Pages

## ✨ Дополнительные возможности

- Полная поддержка CORS благодаря GitHub Pages
- Кэширование отключено через headers
- Мобильная адаптивность включена
- WebGL fallback на CSS градиент
- Обработка ошибок 404 с PS2 стилем
