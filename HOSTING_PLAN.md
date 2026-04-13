# DITIB Ahlen — План технічної підготовки до хостингу

## Поточний стан проекту
- Статичний React SPA (Vite + TypeScript)
- Немає бекенду, БД або API
- Локальний preview/site через Docker на порту 8080
- Мова: German (de)

---

## ✅ Вже готово
- [x] React компоненти (всі 10 секцій лендінгу)
- [x] Дизайн-система (Tailwind + shadcn/ui)
- [x] Адаптивна верстка (mobile-first)
- [x] Локальний dev-сервер (localhost:8080)
- [x] Docker multi-stage build + nginx для локального production-preview
- [x] Git репозиторій (GitHub)
- [x] `npm run build` проходить успішно, `dist/` генерується
- [x] SPA fallback в nginx налаштований
- [x] gzip-компресія в nginx увімкнена
- [x] Cache-Control для статичних asset-ів налаштований
- [x] `robots.txt`, `sitemap.xml`, `llms.txt` підключені
- [x] Cookie banner реалізований
- [x] Impressum / Datenschutz заповнені
- [x] PDF-файли підключені і відкриваються в браузері
- [x] Функціонал пожертв працює через PayPal link + IBAN
- [x] Базове технічне SEO налаштоване (`meta`, Open Graph, Twitter, Schema.org, image SEO)

---

## ❌ Що потрібно зробити для повноцінного хостингу

### 1. 🌐 Домен та DNS
- [x] Домен підключено: `https://ditib-ahlen-projekte.de/`
- [x] DNS налаштовано під поточний хостинг
- [ ] Перевірити/зафіксувати `www` → apex redirect, якщо це потрібно на стороні хостингу

### 2. 🔒 SSL/HTTPS
- [x] SSL/HTTPS активний для `https://ditib-ahlen-projekte.de/`
- [ ] Перевірити автооновлення сертифіката на стороні PixelX
- [ ] Переконатися, що HTTP → HTTPS redirect примусово увімкнений на проді

### 3. 🏗️ Production Build
- [x] Запустити `npm run build` — генерує `dist/` папку
- [x] Перевірити що build проходить без помилок
- [ ] Перевірити bundle size (оптимізація за потреби)

### 4. 🐳 Docker Production Setup
- [x] Dockerfile з multi-stage build (Node.js build → nginx serve)
- [x] nginx.conf для SPA (fallback всіх роутів на index.html)
- [x] docker-compose.yml для локального production-preview
- [x] Production-хостинг визначено: PixelX
- [x] Схема деплою уточнена: ручне завантаження `dist/` через FTP

### 5. 📁 Контент (Реальні дані)
- [x] Замінити placeholder зображення на наявні фото/рендери
- [x] Оновити суму зборів (зараз 2.34M / 5M EUR)
- [x] Прибрати публічний лічильник донорів із UI
- [x] Додати реальні PDF файли для завантаження (PDFDownloadSection.tsx)
- [x] Оновити контактну інформацію
- [x] Заповнити сторінки: Impressum, Datenschutz
- [ ] Фінально підтвердити весь текстовий контент перед запуском

### 6. 📧 Функціонал пожертвувань
- [x] Вибрати платіжний провайдер: PayPal
- [x] Підключити зовнішнє посилання на PayPal
- [x] Додати банківський переказ (IBAN)
- [x] Кнопки пожертвування функціональні
- [ ] За потреби додати окреме conversion tracking для кліків на donate CTA

### 7. 🔍 SEO та мета-дані
- [x] Перевірити/оновити Open Graph теги (index.html)
- [x] Додати Schema.org розмітку для організації
- [x] Оновити sitemap.xml
- [x] Google Search Console вже підключено
- [ ] Підключити Bing Webmaster Tools

### 8. 📊 Аналітика
- [ ] Підключити аналітику пізніше (`GA4` або `Matomo`)
- [ ] Налаштувати відстеження конверсій (кліки на "Spenden")
- [x] Cookie banner (обов'язково по GDPR!)
- [ ] Під час додавання аналітики оновити cookie consent категорії/тексти і Datenschutzerklärung

### 9. 📱 PWA (опціонально)
- [ ] manifest.json
- [ ] Service Worker для кешування
- [ ] Іконки для різних платформ

### 10. ⚡ Performance
- [ ] Перевірити Lighthouse score (target: 90+)
- [ ] Дотиснути оптимізацію зображень (частково вже є WebP, але не всюди)
- [ ] За потреби додати brotli компресію в production
- [x] Налаштувати gzip компресію в nginx
- [x] Кешування статичних активів (Cache-Control headers)

---

## 🚀 Рекомендовані платформи хостингу

### Варіант A: VPS + Docker (рекомендовано)
```
Провайдер: Hetzner Cloud (CX11 = 3.79€/міс)
ОС: Ubuntu 22.04
Stack: Docker + nginx
Переваги: повний контроль, дешево, DDEV-сумісно
```

### Поточний варіант
```
Хостинг: PixelX
Домен: https://ditib-ahlen-projekte.de/
Деплой: ручне завантаження `dist/` через FTP
Статус: активний хостинг уже є
```

### Варіант B: Static Hosting (найпростіше)
```
Провайдери: Netlify, Vercel, Cloudflare Pages
Ціна: безкоштовно для статичних сайтів
Переваги: auto-deploy з GitHub, SSL автоматично
Обмеження: без серверної логіки
```

### Варіант C: Shared Hosting (найдешевше)
```
Провайдери: IONOS, Strato, All-Inkl (популярні в Німеччині)
Ціна: ~2-5€/міс
Потрібно: завантажити dist/ папку через FTP
```

---

## 🔧 CI/CD Pipeline (GitHub Actions)

Для автоматичного деплою при push у `main` гілку:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - name: Deploy dist/ to hosting
        # залежить від обраного провайдера
```

---

## 📋 Обов'язково по закону Німеччини (Impressum/DSGVO)

- [x] **Impressum** — повна юридична інформація про організацію (§5 DDG)
  - Назва організації: DITIB - Türkisch Islamische Gemeinde zu Ahlen e.V.
  - Адреса, телефон, email
  - Реєстраційний номер (Vereinsregister)
  - Відповідальна особа

- [x] **Datenschutzerklärung** (Політика конфіденційності GDPR/DSGVO)
  - Які дані збираються
  - Cookie policy
  - Google Analytics якщо буде додано

---

## 📅 Пріоритети (по порядку виконання)

1. **До запуску:** Фінальні тексти
2. **До запуску:** Перевірити redirects/SSL на PixelX після FTP-деплою
3. **До запуску:** Bing Webmaster Tools
4. **Після запуску:** Аналітика + conversion tracking + оновлення cookie consent / Datenschutzerklärung
5. **Після запуску:** Lighthouse / performance optimization
