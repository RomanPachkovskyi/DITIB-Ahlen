<?php
/**
 * Instagram live feed runtime endpoint.
 *
 * GET /api/instagram-feed.php
 *
 * Reads config, serves cached feed if fresh, otherwise fetches from
 * Meta Graph API, normalizes, caches, and serves. On any failure
 * falls back to last-good-cache or empty payload.
 */

declare(strict_types=1);

// Hard-suppress PHP notices/warnings/deprecations from leaking into JSON output.
@ini_set('display_errors', '0');
error_reporting(E_ERROR | E_PARSE);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');

const FEED_CACHE_TTL_SECONDS = 15 * 60;
const FEED_RETURN_LIMIT      = 6;
const FEED_FETCH_LIMIT       = 18;
const HTTP_CONNECT_TIMEOUT   = 3;
const HTTP_TIMEOUT           = 5;
const MEDIA_CACHE_SUBDIR     = 'instagram-media';
const MEDIA_PUBLIC_BASE      = '/api/cache/' . MEDIA_CACHE_SUBDIR;

$cacheDir   = __DIR__ . '/cache';
$mediaCacheDir = $cacheDir . '/' . MEDIA_CACHE_SUBDIR;
$cacheFile  = $cacheDir . '/instagram-feed.json';
$errorLog   = $cacheDir . '/instagram-feed.error.log';
$configFile = __DIR__ . '/instagram-config.php';

try {
    if (!is_dir($cacheDir)) {
        @mkdir($cacheDir, 0775, true);
    }
    if (!is_dir($mediaCacheDir)) {
        @mkdir($mediaCacheDir, 0775, true);
    }

    if (!is_file($configFile)) {
        log_feed_error($errorLog, 'config_missing');
        echo json_encode(serve_fallback($cacheFile, $mediaCacheDir, true), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit;
    }

    $config = require $configFile;

    // Serve fresh cache if available and not expired.
    $fresh = read_fresh_cache($cacheFile, FEED_CACHE_TTL_SECONDS);
    if ($fresh !== null) {
        $fresh['source'] = 'cache';
        echo json_encode($fresh, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Fetch from Meta.
    $raw = fetch_meta_media($config);
    if ($raw === null || !isset($raw['data']) || !is_array($raw['data'])) {
        log_feed_error($errorLog, 'meta_fetch_failed');
        echo json_encode(serve_fallback($cacheFile, $mediaCacheDir, true), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit;
    }

    $payload = [
        'items'     => normalize_items($raw['data'], $mediaCacheDir),
        'updatedAt' => date('c'),
        'source'    => 'live',
    ];

    write_cache($cacheFile, $payload);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
} catch (\Throwable $e) {
    log_feed_error($errorLog, 'unhandled_exception:' . $e->getMessage());
    echo json_encode(serve_fallback($cacheFile, $mediaCacheDir, true), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}

// ---------- helpers ----------

function read_fresh_cache(string $file, int $ttl): ?array
{
    if (!is_file($file)) {
        return null;
    }
    $age = time() - (int) @filemtime($file);
    if ($age > $ttl) {
        return null;
    }
    $raw = @file_get_contents($file);
    if ($raw === false) {
        return null;
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : null;
}

function read_any_cache(string $file): ?array
{
    if (!is_file($file)) {
        return null;
    }
    $raw = @file_get_contents($file);
    if ($raw === false) {
        return null;
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : null;
}

function write_cache(string $file, array $payload): void
{
    $tmp = $file . '.tmp';
    if (@file_put_contents($tmp, json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)) !== false) {
        @rename($tmp, $file);
    }
}

function serve_fallback(string $cacheFile, string $mediaCacheDir, bool $error): array
{
    $cached = read_any_cache($cacheFile);
    if ($cached !== null && isset($cached['items'])) {
        $cached['items'] = hydrate_cached_items($cached['items'], $mediaCacheDir);
        $cached['source'] = 'cache';
        if ($error) {
            $cached['error'] = true;
        }
        write_cache($cacheFile, $cached);
        return $cached;
    }
    return [
        'items'     => [],
        'updatedAt' => null,
        'source'    => 'empty',
        'error'     => true,
    ];
}

function fetch_meta_media(array $config): ?array
{
    $version = $config['INSTAGRAM_GRAPH_API_VERSION'] ?? 'v25.0';
    $igUser  = $config['INSTAGRAM_IG_USER_ID'] ?? '';
    $token   = $config['INSTAGRAM_PAGE_ACCESS_TOKEN'] ?? '';
    if ($igUser === '' || $token === '') {
        return null;
    }

    $fields = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username,'
            . 'like_count,comments_count,'
            . 'children{media_type,media_url,thumbnail_url,permalink}';

    $url = sprintf(
        'https://graph.facebook.com/%s/%s/media?fields=%s&limit=%d&access_token=%s',
        rawurlencode($version),
        rawurlencode($igUser),
        rawurlencode($fields),
        FEED_FETCH_LIMIT,
        rawurlencode($token)
    );

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => HTTP_CONNECT_TIMEOUT,
        CURLOPT_TIMEOUT        => HTTP_TIMEOUT,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_HTTPHEADER     => ['Accept: application/json'],
    ]);
    $body = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);

    if ($body === false || $code < 200 || $code >= 300) {
        return null;
    }
    $data = json_decode($body, true);
    return is_array($data) ? $data : null;
}

function normalize_items(array $items, string $mediaCacheDir): array
{
    global $errorLog;
    $out = [];
    foreach ($items as $it) {
        $normalized = normalize_item($it, $mediaCacheDir);
        if ($normalized !== null) {
            $out[] = $normalized;
        } else {
            // Log filtered items for debugging (id, media_type, has thumbnail_url, has media_url)
            $id   = $it['id']         ?? '?';
            $type = $it['media_type'] ?? '?';
            $hasTn = isset($it['thumbnail_url']) ? 'yes' : 'no';
            $hasMu = isset($it['media_url'])     ? 'yes' : 'no';
            log_feed_error($errorLog, "filtered_item id=$id type=$type thumbnail_url=$hasTn media_url=$hasMu");
        }
    }

    usort(
        $out,
        static function (array $a, array $b): int {
            $timeA = strtotime((string) ($a['timestamp'] ?? '')) ?: 0;
            $timeB = strtotime((string) ($b['timestamp'] ?? '')) ?: 0;

            return $timeB <=> $timeA;
        }
    );

    return array_slice($out, 0, FEED_RETURN_LIMIT);
}

function normalize_item(array $it, string $mediaCacheDir): ?array
{
    $type = strtoupper((string) ($it['media_type'] ?? ''));
    $id   = (string) ($it['id'] ?? '');
    if ($id === '' || $type === '') {
        return null;
    }

    $imageUrl = null;
    $outType  = 'image';

    if ($type === 'IMAGE') {
        $outType  = 'image';
        $imageUrl = $it['media_url'] ?? null;
    } elseif ($type === 'VIDEO') {
        $outType  = 'video';
        $imageUrl = $it['thumbnail_url'] ?? ($it['media_url'] ?? null);
    } elseif ($type === 'CAROUSEL_ALBUM') {
        $outType  = 'carousel';
        $children = $it['children']['data'] ?? [];
        foreach ($children as $child) {
            $childType = strtoupper((string) ($child['media_type'] ?? ''));
            if ($childType === 'IMAGE' && !empty($child['media_url'])) {
                $imageUrl = $child['media_url'];
                break;
            }
            if ($childType === 'VIDEO') {
                $imageUrl = $child['thumbnail_url'] ?? ($child['media_url'] ?? null);
                if ($imageUrl !== null) {
                    break;
                }
            }
        }
        // Fallback: use parent media_url / thumbnail_url if children yielded nothing
        if (!$imageUrl) {
            $imageUrl = $it['media_url'] ?? ($it['thumbnail_url'] ?? null);
        }
    } else {
        return null;
    }

    if (!$imageUrl) {
        return null;
    }

    $cachedImageUrl = cache_media_asset($id, $imageUrl, $mediaCacheDir);

    return [
        'id'            => $id,
        'type'          => $outType,
        'imageUrl'      => $cachedImageUrl ?? $imageUrl,
        'permalink'     => (string) ($it['permalink'] ?? ''),
        'caption'       => (string) ($it['caption'] ?? ''),
        'timestamp'     => (string) ($it['timestamp'] ?? ''),
        'likeCount'     => isset($it['like_count']) ? (int) $it['like_count'] : null,
        'commentsCount' => isset($it['comments_count']) ? (int) $it['comments_count'] : null,
    ];
}

function log_feed_error(string $logFile, string $message): void
{
    $line = sprintf("[%s] %s\n", date('c'), preg_replace('/\s+/', ' ', $message));
    @file_put_contents($logFile, $line, FILE_APPEND);
}

function cache_media_asset(string $id, string $sourceUrl, string $mediaCacheDir): ?string
{
    global $errorLog;

    $extension = detect_media_extension($sourceUrl);
    $fileName  = preg_replace('/[^A-Za-z0-9_-]/', '-', $id) . $extension;
    $filePath  = rtrim($mediaCacheDir, '/') . '/' . $fileName;

    if (is_file($filePath) && (int) @filesize($filePath) > 0) {
        return MEDIA_PUBLIC_BASE . '/' . rawurlencode($fileName);
    }

    $ch = curl_init($sourceUrl);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => HTTP_CONNECT_TIMEOUT,
        CURLOPT_TIMEOUT        => HTTP_TIMEOUT,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTPHEADER     => ['Accept: image/*,*/*;q=0.8'],
    ]);

    $body = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($body === false || $code < 200 || $code >= 300 || $body === '') {
        log_feed_error($errorLog, 'media_cache_failed id=' . $id . ' code=' . $code . ' error=' . $curlError);
        return null;
    }

    $tmpPath = $filePath . '.tmp';
    if (@file_put_contents($tmpPath, $body) === false) {
        log_feed_error($errorLog, 'media_cache_write_failed id=' . $id);
        return null;
    }

    if (!@rename($tmpPath, $filePath)) {
        @unlink($tmpPath);
        log_feed_error($errorLog, 'media_cache_rename_failed id=' . $id);
        return null;
    }

    return MEDIA_PUBLIC_BASE . '/' . rawurlencode($fileName);
}

function detect_media_extension(string $sourceUrl): string
{
    $path = (string) parse_url($sourceUrl, PHP_URL_PATH);
    $ext = strtolower((string) pathinfo($path, PATHINFO_EXTENSION));

    return match ($ext) {
        'png' => '.png',
        'webp' => '.webp',
        default => '.jpg',
    };
}

function hydrate_cached_items(array $items, string $mediaCacheDir): array
{
    foreach ($items as $index => $item) {
        $id = (string) ($item['id'] ?? '');
        $imageUrl = (string) ($item['imageUrl'] ?? '');

        if ($id === '' || $imageUrl === '') {
            continue;
        }

        if (str_starts_with($imageUrl, MEDIA_PUBLIC_BASE . '/')) {
            continue;
        }

        $cachedImageUrl = cache_media_asset($id, $imageUrl, $mediaCacheDir);
        if ($cachedImageUrl !== null) {
            $items[$index]['imageUrl'] = $cachedImageUrl;
        }
    }

    return $items;
}
