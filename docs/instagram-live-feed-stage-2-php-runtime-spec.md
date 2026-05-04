# Детальне ТЗ для Claude Code: Етап 2 `Runtime PHP layer`

## Контекст

Цей документ є **детальним робочим ТЗ** для реалізації server-side частини Instagram live feed у проєкті `main`.

Загальна архітектура, мета, уже завершена Meta-підготовка і повний roadmap описані в базовому документі:

- [instagram-live-feed-plan.md](/Users/roman/Project/DITIB-Ahlen/main/docs/instagram-live-feed-plan.md)

Цей файл не дублює всю загальну картину, а уточнює **тільки Етап 2**, щоб реалізація вийшла якісною, узгодженою і одразу вела до єдиної цілі:

- **працюючий Instagram-блок на сторінці `main`**

## Мета етапу

На цьому етапі потрібно реалізувати **runtime PHP layer**, який:

1. живе у `public/api/`
2. читає секрети з локального конфігу
3. вміє віддавати нормалізований feed для frontend
4. кешує останній успішний результат
5. безпечно деградує при помилках Meta API
6. готує базу для наступного етапу `token maintenance`

Результатом цього етапу ще не є повністю готовий UI-блок, але саме він створює **єдиний бекенд-контур**, без якого live feed на сторінці не запрацює.

## Джерела правди

### Архітектурний документ

- [instagram-live-feed-plan.md](/Users/roman/Project/DITIB-Ahlen/main/docs/instagram-live-feed-plan.md)

### Локальні секрети і токени

- [main/.env.instagram.local](/Users/roman/Project/DITIB-Ahlen/main/.env.instagram.local)

### Підтверджені API-артефакти

- [workspace/API/me-accounts.md](/Users/roman/Project/DITIB-Ahlen/workspace/API/me-accounts.md)
- [workspace/API/picture_url.md](/Users/roman/Project/DITIB-Ahlen/workspace/API/picture_url.md)
- [workspace/API/media.md](/Users/roman/Project/DITIB-Ahlen/workspace/API/media.md)

## Важливі вхідні дані

На момент старту цього етапу вже підтверджено:

- `INSTAGRAM_APP_ID=1623528855432943`
- `INSTAGRAM_PAGE_ID=1083007281566669`
- `INSTAGRAM_IG_USER_ID=17841433989345669`
- існує робочий `long-lived user token`
- існує робочий `page access token`

Claude Code не повинен заново проходити Meta setup. Потрібно використати вже підготовлений контур.

## Що потрібно реалізувати

### 1. Файлова структура

Необхідно додати в репозиторій:

```text
main/public/api/
├── .htaccess
├── instagram-feed.php
├── instagram-refresh-token.php
├── instagram-config.example.php
└── cache/
    └── .gitignore
```

### 2. `instagram-config.example.php`

Потрібен приклад конфігу без секретів.

У ньому мають бути описані ключі на кшталт:

- `INSTAGRAM_APP_ID`
- `INSTAGRAM_APP_SECRET`
- `INSTAGRAM_PAGE_ID`
- `INSTAGRAM_IG_USER_ID`
- `INSTAGRAM_PAGE_ACCESS_TOKEN`

Важливо:

- реальні секрети не комітити
- `example` має відображати реальну форму очікуваного прод-конфігу

### 3. `instagram-feed.php`

Це головний runtime endpoint для frontend.

Вимоги:

- повертає JSON
- працює по `GET`
- читає конфіг
- читає кеш
- при потребі звертається до Graph API
- нормалізує Meta response до стабільної форми для frontend
- кешує успішну відповідь
- при помилці повертає `last-good-cache`, якщо він є

#### Graph API endpoint

```text
GET https://graph.facebook.com/v25.0/{IG_USER_ID}/media
```

#### Обов’язкові поля запиту

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

#### Обмеження

- `limit=3`

#### Нормалізація

Потрібно привести відповідь до формату:

```json
{
  "items": [
    {
      "id": "179...",
      "type": "image",
      "imageUrl": "https://...",
      "permalink": "https://www.instagram.com/p/...",
      "caption": "text",
      "timestamp": "2026-05-04T10:12:00+0000"
    }
  ],
  "updatedAt": "2026-05-04T12:30:00+02:00",
  "source": "live"
}
```

#### Правила для `type` і `imageUrl`

- `IMAGE` -> `type=image`, `imageUrl=media_url`
- `VIDEO` -> `type=video`, `imageUrl=thumbnail_url`, а якщо `thumbnail_url` відсутній, тоді `media_url`
- `CAROUSEL_ALBUM` -> `type=carousel`, брати перший валідний елемент з `children`

#### Кеш

Потрібен файловий кеш:

```text
public/api/cache/instagram-feed.json
```

Вимоги до кешу:

- TTL: `15 хвилин`
- зберігати тільки вже нормалізований payload
- зберігати `updatedAt`
- зберігати джерело `source`

#### Fallback-поведінка

Якщо Meta API повернув помилку або таймаут:

- якщо є валідний останній кеш, віддати його зі `source=cache`
- якщо кешу немає, віддати:

```json
{
  "items": [],
  "updatedAt": null,
  "source": "empty",
  "error": true
}
```

#### Технічні вимоги до endpoint

- ставити `Content-Type: application/json; charset=utf-8`
- не світити сирі токени у відповіді
- не прокидувати у frontend весь сирий response Meta
- мати зрозумілі невеликі внутрішні helper-функції
- не робити надмірно складну архітектуру

### 4. `instagram-refresh-token.php`

На Етапі 2 потрібно зробити **мінімально робочий refresh-script**, навіть якщо cron налаштовуватиметься пізніше.

Вимоги:

- читає конфіг
- читає поточний токен-стан
- оновлює токен через Meta flow, якщо це допустимо в обраній схемі
- записує результат у JSON-файл стану токена

На цьому етапі допустимо реалізувати базову версію під наступний формат:

```text
public/api/cache/instagram-token.json
```

Очікувані поля стану:

- `access_token`
- `token_type`
- `expires_at`
- `refreshed_at`

Якщо поточна Meta-схема вимагає окремого точного refresh flow на наступному етапі, це треба чесно відобразити в коді й коментарі, але файл і контракт мають уже існувати.

### 5. `api/.htaccess`

Потрібно додати захист для runtime-шару.

Мінімально:

- заборонити прямий доступ до `instagram-config.php`
- заборонити прямий доступ до `.env*`
- заборонити list directory для `cache/`
- захистити службові файли
- не зламати виконання `.php`

### 6. `cache/.gitignore`

Потрібно, щоб папка кешу була в репозиторії, але її вміст не комітився.

## Що не потрібно робити на цьому етапі

- не робити React-компонент
- не чіпати `SocialSection` або `Index.tsx`
- не реалізовувати consent/UI-логіку
- не робити build-time fetch
- не переносити секрети в `VITE_*`
- не викликати Meta API з браузера
- не вводити зайві сторонні залежності без потреби

## Якість реалізації

Claude Code має реалізувати це як production-oriented код для shared hosting, а не як тимчасовий proof of concept.

Очікування по якості:

- простий і читабельний PHP
- мінімум магії
- прогнозована обробка помилок
- акуратні JSON-відповіді
- зрозумілі назви функцій
- без витоку секретів
- без прив’язки до локального shell під час runtime

## Перевірка після реалізації

Після завершення Claude Code має перевірити:

1. що `instagram-feed.php` віддає валідний JSON локально
2. що при успішному зверненні до Meta формується кеш
3. що при повторному зверненні без прострочення TTL читається кеш
4. що при штучній помилці Meta endpoint не падає фатально
5. що `instagram-refresh-token.php` створює або оновлює token-state файл
6. що `.htaccess` і структура папок готові до FTP-деплою

## Формат звіту від Claude Code

Після виконання Claude Code має повернути:

- які файли створено
- які файли змінено
- як саме працює runtime flow
- як перевірити endpoint локально
- які ризики або відкриті питання залишилися до Етапу 3 і Етапу 4

## Критерій приймання етапу

Етап вважається виконаним, якщо:

- у `public/api/` існує повний PHP runtime-шар
- `instagram-feed.php` реально вміє повернути 3 останні пости через Meta API
- є файловий кеш і fallback
- є стартова token-maintenance заготовка
- структура сумісна з подальшим FTP-деплоєм на `PixelX`

Це має безпосередньо наблизити проєкт до фінальної цілі:

- **працюючий Instagram-блок на сторінці без rebuild**
