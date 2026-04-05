# DITIB Ahlen — План технічної підготовки до хостингу

## Поточний стан проекту
- Статичний React SPA (Vite + TypeScript)
- Немає бекенду, БД або API
- Dev-сервер на порту 8080
- Мова: German (de)

---

## ✅ Вже готово
- [x] React компоненти (всі 10 секцій лендінгу)
- [x] Дизайн-система (Tailwind + shadcn/ui)
- [x] Адаптивна верстка (mobile-first)
- [x] Локальний dev-сервер (localhost:8080)
- [x] Docker-контейнер для локальної розробки
- [x] Git репозиторій (GitHub)

---

## ❌ Що потрібно зробити для повноцінного хостингу

### 1. 🌐 Домен та DNS
- [ ] Придбати/підключити домен (наприклад: `ditib-ahlen.de` або `ahlen-kulturzentrum.de`)
- [ ] Налаштувати DNS записи: A-record → IP хостингу
- [ ] Опціонально: www-redirect → apex domain

### 2. 🔒 SSL/HTTPS
- [ ] Отримати SSL-сертифікат (Let's Encrypt безкоштовно)
- [ ] Налаштувати автоматичне оновлення сертифіката (Certbot)
- [ ] Redirect HTTP → HTTPS

### 3. 🏗️ Production Build
- [ ] Запустити `npm run build` — генерує `dist/` папку
- [ ] Перевірити що build проходить без помилок
- [ ] Перевірити bundle size (оптимізація за потреби)

### 4. 🐳 Docker Production Setup
- [ ] Dockerfile з multi-stage build (Node.js build → nginx serve)
- [ ] nginx.conf для SPA (fallback всіх роутів на index.html)
- [ ] docker-compose.yml для production
- [ ] Налаштувати порти (80/443)

### 5. 📁 Контент (Реальні дані)
- [ ] Замінити placeholder зображення на реальні фото/рендери
- [ ] Оновити суму зборів (DonationProgress.tsx — зараз 2.34M/8M EUR)
- [ ] Оновити кількість донорів (зараз 1847)
- [ ] Додати реальні PDF файли для завантаження (PDFDownloadSection.tsx)
- [ ] Оновити контактну інформацію (Footer.tsx)
- [ ] Заповнити сторінки: Impressum, Datenschutz (обов'язково по закону Німеччини!)

### 6. 📧 Функціонал пожертвувань
- [ ] Вибрати платіжний провайдер (Stripe, PayPal, Mollie)
- [ ] Підключити форму пожертвування
- [ ] Або інтегрувати посилання на зовнішній банківський переказ (IBAN)
- [ ] Кнопка "Ich möchte spenden" зараз не функціональна!

### 7. 🔍 SEO та мета-дані
- [ ] Перевірити/оновити Open Graph теги (index.html)
- [ ] Додати Schema.org розмітку для організації
- [ ] Оновити sitemap.xml
- [ ] Перевірити Google Search Console

### 8. 📊 Аналітика
- [ ] Підключити Google Analytics 4 або Matomo (privacy-friendly)
- [ ] Налаштувати відстеження конверсій (кліки на "Spenden")
- [ ] Cookie banner (обов'язково по GDPR!)

### 9. 📱 PWA (опціонально)
- [ ] manifest.json
- [ ] Service Worker для кешування
- [ ] Іконки для різних платформ

### 10. ⚡ Performance
- [ ] Перевірити Lighthouse score (target: 90+)
- [ ] Оптимізувати зображення (WebP формат)
- [ ] Налаштувати gzip/brotli компресію в nginx
- [ ] Кешування статичних активів (Cache-Control headers)

---

## 🚀 Рекомендовані платформи хостингу

### Варіант A: VPS + Docker (рекомендовано)
```
Провайдер: Hetzner Cloud (CX11 = 3.79€/міс)
ОС: Ubuntu 22.04
Stack: Docker + nginx
Переваги: повний контроль, дешево, DDEV-сумісно
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

- [ ] **Impressum** — повна юридична інформація про організацію (§5 TMG)
  - Назва організації: DITIB Türkisch Islamische Kultur Verein e.V. Ahlen
  - Адреса, телефон, email
  - Реєстраційний номер (Vereinsregister)
  - Відповідальна особа

- [ ] **Datenschutzerklärung** (Політика конфіденційності GDPR/DSGVO)
  - Які дані збираються
  - Cookie policy
  - Google Analytics якщо є

---

## 📅 Пріоритети (по порядку виконання)

1. **Негайно:** Production build + Docker setup (пункти 3, 4)
2. **До запуску:** Реальний контент, PDF файли (пункт 5)
3. **До запуску:** Impressum + Datenschutz (пункт 9 — юридично обов'язково!)
4. **До запуску:** Домен + SSL (пункти 1, 2)
5. **Після запуску:** Пожертвування (пункт 6)
6. **Після запуску:** Аналітика + Cookie banner (пункт 8)
