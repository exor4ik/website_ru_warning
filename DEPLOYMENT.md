# Инструкция по развертыванию на GitHub Pages

## Шаг 1: Подготовка репозитория

1. Убедитесь, что все файлы закоммичены в Git:
```bash
git add .
git commit -m "PS2 RSOD warning page with 3D background"
git push origin main
```

## Шаг 2: Включение GitHub Pages

1. Откройте репозиторий на GitHub
2. Перейдите в **Settings** → **Pages**
3. Выберите:
   - **Source**: Deploy from a branch
   - **Branch**: `main` (или `master`)
   - **Folder**: `/ (root)`
4. Сохраните изменения

## Шаг 3: Ожидание развертывания

1. Сайт будет доступен через 1-2 минуты
2. URL: `https://USERNAME.github.io/website_ru_warning/`
   (замените USERNAME на ваше имя пользователя GitHub)

## Локальное тестирование

### Способ 1: Python
```bash
# Python 3
python -m http.server 8000

# Затем откройте http://localhost:8000
```

### Способ 2: Node.js
```bash
npx http-server
# Затем откройте http://localhost:8080
```

### Способ 3: Ruby
```bash
ruby -run -ehttpd . -p8000
# Затем откройте http://localhost:8000
```

### Способ 4: Встроенный скрипт Python
```bash
python run_server.py
# Затем откройте http://localhost:8000
```

## Проверка работоспособности

### Консоль браузера (F12)
1. Откройте Developer Tools
2. Перейдите на вкладку **Console**
3. Проверьте наличие ошибок
4. Должны быть видны логи инициализации Three.js

### Network вкладка
1. Откройте вкладку **Network**
2. Проверьте загрузку:
   - `three.min.js` (из jsDelivr CDN)
   - `style.css`
   - `script.js`

## Устранение проблем

### Three.js не загружается
- Это может быть проблема CDN
- Скрипт автоматически переключится на fallback (CSS gradient)
- Страница всё равно будет работать, но без 3D эффектов

### Изображение/стили не загружаются
- Проверьте пути к файлам (должны быть относительные)
- Убедитесь, что файлы находятся в корне репозитория
- Очистите кэш браузера (Ctrl+Shift+Delete)

### 404 ошибки на странице
- Убедитесь, что файл `404.html` находится в корне
- GitHub Pages будет автоматически служить этот файл для всех несуществующих путей

## Файлы конфигурации

- `.nojekyll` - отключает Jekyll обработку (важно!)
- `_config.yml` - конфигурация GitHub Pages
- `404.html` - обработка ошибок 404

## Дополнительные ресурсы

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Three.js Documentation](https://threejs.org/docs/)
- [jsDelivr CDN](https://www.jsdelivr.com/)

## Поддерживаемые браузеры

- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Заметки

- Используется jsDelivr CDN для Three.js (более надежен)
- Имеется fallback на unpkg CDN, если jsDelivr недоступен
- CSS fallback градиент, если Three.js не загружается
- Полная поддержка мобильных устройств
