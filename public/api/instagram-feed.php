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
const FEED_LIMIT             = 3;
const HTTP_CONNECT_TIMEOUT   = 3;
const HTTP_TIMEOUT           = 5;

$cacheDir   = __DIR__ . '/cache';
$cacheFile  = $cacheDir . '/instagram-feed.json';
$errorLog   = $cacheDir . '/instagram-feed.error.log';
$configFile = __DIR__ . '/instagram-config.php';

try {
    if (!is_dir($cacheDir)) {
        @mkdir($cacheDir, 0775, true);
    }

    if (!is_file($configFile)) {
        log_feed_error($errorLog, 'config_missing');
        echo json_encode(serve_fallback($cacheFile, true), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
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
        echo json_encode(serve_fallback($cacheFile, true), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit;
    }

    $payload = [
        'items'     => normalize_items($raw['data']),
        'updatedAt' => date('c'),
        'source'    => 'live',
    ];

    write_cache($cacheFile, $payload);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
} catch (\Throwable $e) {
    log_feed_error($errorLog, 'unhandled_exception:' . $e->getMessage());
    echo json_encode(serve_fallback($cacheFile, true), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
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

function serve_fallback(string $cacheFile, bool $error): array
{
    $cached = read_any_cache($cacheFile);
    if ($cached !== null && isset($cached['items'])) {
        $cached['source'] = 'cache';
        if ($error) {
            $cached['error'] = true;
        }
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
        FEED_LIMIT,
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

function normalize_items(array $items): array
{
    $out = [];
    foreach ($items as $it) {
        $normalized = normalize_item($it);
        if ($normalized !== null) {
            $out[] = $normalized;
        }
    }
    return $out;
}

function normalize_item(array $it): ?array
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
    } else {
        return null;
    }

    if (!$imageUrl) {
        return null;
    }

    return [
        'id'            => $id,
        'type'          => $outType,
        'imageUrl'      => $imageUrl,
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
