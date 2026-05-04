# Instagram Live Feed for `main`

## Мета

Реалізувати на лендінгу `main` блок з **останніми 3 постами Instagram**, які **оновлюються live без нового build**.

Цей документ фіксує **єдиний робочий варіант** для поточного проєкту і поточного хостингу.

Для детальної реалізації server-side частини дивись окреме ТЗ:

- [instagram-live-feed-stage-2-php-runtime-spec.md](/Users/roman/Project/DITIB-Ahlen/main/docs/instagram-live-feed-stage-2-php-runtime-spec.md)

## Вихідні умови проєкту

- Проєкт: `main`
- Стек: `React + Vite + TypeScript`
- Прод-хостинг: `PixelX`
- Прод-сервер: `Apache shared hosting`
- Деплой: **ручне завантаження `dist/` через FTP**
- Поточний сайт: **статичний SPA**, без власного бекенду
- Build робиться рідко, тому `build-time fetch` не підходить

## Поточний статус підготовки Meta

### Що вже зроблено

- [x] Instagram акаунт `ditib_ahlen_projekte` переведено в **Professional**
- [x] Створено Facebook Page `DITIB Bildungs- & Begegnungszentrum`
- [x] Facebook Page прив’язано до Instagram акаунта `ditib_ahlen_projekte`
- [x] Створено окремий Meta App `DITIB Ahlen Feed`
- [x] Підтверджено `IG_USER_ID`
- [x] Отримано `long-lived user token`
- [x] Отримано `page access token`
- [x] Перевірено runtime-запити до Graph API з реальними відповідями

### Підтверджені ідентифікатори

- `INSTAGRAM_APP_ID = 1623528855432943`
- `INSTAGRAM_PAGE_ID = 1083007281566669`
- `INSTAGRAM_IG_USER_ID = 17841433989345669`

### Де лежать важливі документи і дані

- Робочі секрети і токени: [main/.env.instagram.local](/Users/roman/Project/DITIB-Ahlen/main/.env.instagram.local)
- Підтвердження зв’язки `Page -> Instagram account`: [workspace/API/me-accounts.md](/Users/roman/Project/DITIB-Ahlen/workspace/API/me-accounts.md)
- Підтвердження `IG_USER_ID` і `profile_picture_url`: [workspace/API/picture_url.md](/Users/roman/Project/DITIB-Ahlen/workspace/API/picture_url.md)
- Підтвердження робочого media endpoint: [workspace/API/media.md](/Users/roman/Project/DITIB-Ahlen/workspace/API/media.md)

### Що зберігаємо як джерело правди

- Для розробки і деплою джерелом правди для секретів є `main/.env.instagram.local`
- Документи у `workspace/API` є довідковими артефактами перевірки і можуть бути видалені після завершення інтеграції, якщо не потрібен технічний слід

## Обраний варіант

### Один правильний шлях

Для `main` використовуємо:

1. **Офіційний Meta Instagram API**
2. **PHP runtime endpoint прямо на PixelX**
3. **React frontend, який читає локальний same-origin endpoint**
4. **Файловий кеш на хостингу**
5. **Автооновлення access token через окремий PHP refresh-script + cron**

Це означає:

- React **не ходить напряму** в Instagram API
- access token **не потрапляє в браузер**
- нові пости з’являються **без rebuild**
- рішення сумісне з `PixelX + FTP + Apache`

## Чому саме цей варіант

Тому що він одночасно:

- працює з вашим реальним хостингом;
- не потребує окремого Laravel/Node-сервера;
- не залежить від Vercel/Netlify/serverless;
- не ламає поточний статичний workflow;
- дає live-оновлення;
- дозволяє тримати секрети поза React bundle.

## Архітектура

```text
Instagram Professional Account
        ↓
Meta Instagram API
        ↓
PixelX / Apache / PHP endpoint
        ↓
JSON response from same domain
        ↓
React component in main
```

### Потік даних

1. Користувач відкриває сайт.
2. React-компонент робить `fetch('/api/instagram-feed.php')`.
3. PHP endpoint на PixelX перевіряє локальний кеш.
4. Якщо кеш свіжий, віддає кешований JSON.
5. Якщо кеш прострочений, endpoint звертається до Meta API, оновлює кеш і віддає свіжі дані.
6. React рендерить 3 останні пости.

## Технічна структура

### Файли в репозиторії

```text
main/
├── public/
│   └── api/
│       ├── .htaccess
│       ├── instagram-feed.php
│       ├── instagram-refresh-token.php
│       ├── instagram-config.example.php
│       └── cache/
│           └── .gitignore
├── src/
│   ├── components/
│   │   └── InstagramFeedSection.tsx
│   ├── lib/
│   │   └── instagram-feed.ts
│   └── i18n/
│       ├── de.ts
│       └── tr.ts
└── docs/
    └── instagram-live-feed-plan.md
```

### Файли, які не комітимо

На `PixelX` вручну додаються:

```text
/api/instagram-config.php
/api/cache/instagram-feed.json
/api/cache/instagram-token.json
```

`instagram-config.php` містить секрети і не входить до git.

## Server-side шар на PixelX

### 1. `instagram-feed.php`

Основний endpoint для React.

Його задача:

- читати конфіг;
- читати токен;
- звертатись до Meta API;
- кешувати результат;
- віддавати тільки очищений JSON для UI.

### 2. `instagram-refresh-token.php`

Окремий endpoint або CLI/PHP script для підтримки long-lived token.

Його задача:

- брати поточний токен;
- викликати Meta refresh endpoint;
- зберігати оновлений токен локально;
- писати `refreshed_at` і `expires_at`.

### 3. `api/.htaccess`

Потрібен для:

- заборони прямого доступу до `instagram-config.php`;
- заборони листингу папки `cache/`;
- правильного `Content-Type: application/json` для JSON відповіді при потребі;
- захисту допоміжних файлів.

## Meta API: що саме використовуємо

### Endpoint для постів

Офіційний runtime запит:

```text
GET https://graph.facebook.com/v25.0/{IG_USER_ID}/media
```

### Поля

Запитуємо тільки те, що реально потрібно для карток:

```text
id,
caption,
media_type,
media_url,
permalink,
thumbnail_url,
timestamp,
username,
children{media_type,media_url,thumbnail_url,permalink}
```

### Limit

```text
limit=3
```

### Правила нормалізації

- `IMAGE` → використовуємо `media_url`
- `VIDEO` → використовуємо `thumbnail_url`, якщо є; інакше `media_url`
- `CAROUSEL_ALBUM` → беремо перший елемент з `children`

### Що повертаємо у frontend

Frontend не повинен знати сирий Meta response. Endpoint повертає нормалізований масив:

```json
{
  "items": [
    {
      "id": "1789...",
      "type": "image",
      "imageUrl": "https://...",
      "permalink": "https://www.instagram.com/p/...",
      "caption": "....",
      "timestamp": "2026-05-04T10:12:00+0000"
    }
  ],
  "updatedAt": "2026-05-04T12:30:00+02:00",
  "source": "cache"
}
```

## Авторизація і токени

### Обов’язкові умови

- Instagram account має бути **Professional**
- акаунт має бути прив’язаний до Facebook Page
- Meta App має бути налаштований під Instagram API

### Доступи

Для читання останніх постів закладаємо:

- `instagram_business_basic` або сумісний доступ для читання профілю/медіа у вибраному login flow
- доступ до пов’язаного професійного акаунта

Фактичний перелік дозволів треба перевірити у Meta App Dashboard під ту схему логіну, яку буде затверджено в App Setup.

### Зберігання токена

Токен зберігається **тільки на хостингу** в PHP/JSON-файлі.

Не можна:

- зберігати token у `VITE_*`
- зберігати token у React коді
- викликати Meta API з браузера

### Refresh токена

Long-lived token оновлюємо автоматично через cron:

- частота: **1 раз на добу**
- механіка: `instagram-refresh-token.php`

Це частина основного рішення, а не опція.

## Кешування

### Кеш feed

Файловий кеш:

```text
/api/cache/instagram-feed.json
```

### TTL

Робоче значення:

- **15 хвилин**

Це дає:

- feed оновлюється достатньо часто;
- хостинг не смикає Meta API при кожному заході;
- зменшується ризик rate-limit.

### Поведінка при помилці

Якщо Meta API тимчасово недоступний:

- endpoint повертає **останній успішний кеш**;
- якщо кешу ще не було, повертає порожній масив + error flag;
- frontend не падає.

## Frontend у `main`

### Новий компонент

Створюємо:

```text
src/components/InstagramFeedSection.tsx
```

### Поведінка компонента

- робить `fetch('/api/instagram-feed.php')`
- показує 3 картки
- кожна картка веде на `permalink`
- під картками лишається CTA на Instagram профіль
- секція стилістично підпорядковується існуючому дизайну `main`

### Де вставляємо

Новий блок логічно ставиться на місце або в розвиток поточного `SocialSection`.

Рекомендований шлях:

- замінити поточний чистий CTA-блок на feed-секцію з CTA внизу

## Privacy / DSGVO

Оскільки на фронтенді будуть завантажуватись `media_url` / `thumbnail_url` з Instagram CDN, це треба трактувати як **зовнішній контент Meta**.

Отже, під час реалізації потрібно:

1. додати Instagram feed до логіки `External Content`
2. не вантажити feed до згоди користувача, якщо цей режим обрано для зовнішнього контенту
3. оновити текст у Datenschutz, якщо це потрібно після фінальної реалізації

Цей пункт не змінює архітектуру. Це частина тієї ж самої реалізації.

## FTP / Build / Deploy

### Як це стикується з поточним workflow

Поточний деплой не змінюється:

1. `npm run build`
2. завантаження `dist/` на `PixelX` через FTP

Але тепер у `dist/` повинні потрапляти також:

- `api/instagram-feed.php`
- `api/instagram-refresh-token.php`
- `api/.htaccess`

Після першого деплою на хостингу окремо додаються:

- `api/instagram-config.php`
- `api/cache/`
- cron job для refresh токена

## Етапи розробки

### Етап 1. Підготовка Meta

- [x] перевести Instagram акаунт у Professional
- [x] перевірити прив’язку до Facebook Page
- [x] створити/перевірити Meta App
- [x] отримати `IG_USER_ID`
- [x] отримати `long-lived user token`
- [x] отримати `page access token`
- [x] зберегти робочі значення в локальний конфіг

### Етап 2. Runtime PHP layer

Детальне робоче ТЗ для цього етапу:

- [instagram-live-feed-stage-2-php-runtime-spec.md](/Users/roman/Project/DITIB-Ahlen/main/docs/instagram-live-feed-stage-2-php-runtime-spec.md)

- [ ] додати `public/api/instagram-feed.php`
- [ ] додати `public/api/instagram-refresh-token.php`
- [ ] додати `public/api/.htaccess`
- [ ] реалізувати читання конфігу
- [ ] реалізувати HTTP-запит до Meta API
- [ ] реалізувати файловий кеш
- [ ] реалізувати safe fallback на last-good-cache

### Етап 3. Token maintenance

- [ ] зробити формат `instagram-token.json`
- [ ] реалізувати refresh-script
- [ ] налаштувати cron на PixelX
- [ ] перевірити, що token refresh працює без ручного втручання

### Етап 4. Frontend integration

- [ ] створити `InstagramFeedSection.tsx`
- [ ] створити helper для fetch / typing
- [ ] додати локалізовані тексти в `de.ts` і `tr.ts`
- [ ] вставити секцію у сторінку
- [ ] звірити адаптивність desktop/mobile

### Етап 5. Privacy integration

- [ ] вбудувати секцію в існуючу логіку consent / external content
- [ ] перевірити, що без згоди Instagram feed не підтягується
- [ ] перевірити, що після згоди секція працює

### Етап 6. Production hardening

- [ ] перевірити 200/304/caching headers
- [ ] перевірити роботу при порожньому кеші
- [ ] перевірити роботу при простроченому токені
- [ ] перевірити роботу при таймауті Meta API
- [ ] перевірити ручний FTP deploy

## Чеклист готовності

- [x] Meta App налаштований
- [x] Отримано `IG_USER_ID`
- [x] Отримано long-lived token
- [x] Отримано page access token
- [ ] `instagram-feed.php` працює локально/на тесті
- [ ] `instagram-refresh-token.php` оновлює token
- [ ] cron на PixelX налаштований
- [ ] `api/.htaccess` блокує доступ до конфігів і кешу
- [ ] React-компонент рендерить 3 пости
- [ ] без нового build новий пост з’являється через runtime endpoint
- [ ] поведінка коректна на mobile
- [ ] consent / privacy логіка не порушена
- [ ] FTP deploy повністю відтворює систему

## Критичні заборони

Не робимо:

- `build-time fetch`
- прямий виклик Meta API з React
- зберігання token у `VITE_*`
- `oEmbed` як джерело останніх постів
- сторонні Instagram widgets як основу архітектури
- неофіційний scraping Instagram HTML

## Результат

Після реалізації цього плану `main` матиме:

- live-блок з 3 останніми постами Instagram;
- оновлення без нового build;
- безпечне зберігання token поза frontend;
- архітектуру, сумісну з `PixelX + Apache + FTP`;
- рішення, яке можна підтримувати без переносу всього сайту на іншу платформу.
