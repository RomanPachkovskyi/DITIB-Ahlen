<?php
/**
 * Instagram runtime config — EXAMPLE template.
 *
 * Copy this file to `instagram-config.php` on the production host and fill
 * in real values. The real `instagram-config.php` MUST NOT be committed.
 */

return [
    'INSTAGRAM_GRAPH_API_VERSION'     => 'v25.0',
    'INSTAGRAM_APP_ID'                => '',
    'INSTAGRAM_APP_SECRET'            => '',
    'INSTAGRAM_PAGE_ID'               => '',
    'INSTAGRAM_IG_USER_ID'            => '',
    'INSTAGRAM_LONG_LIVED_USER_TOKEN' => '',
    'INSTAGRAM_PAGE_ACCESS_TOKEN'     => '',

    /**
     * Optional: shared secret for HTTP access to instagram-refresh-token.php.
     *
     * Recommended cron mode is CLI ("Run a PHP script" in Plesk), which does
     * not need this secret — leave it empty in that case so HTTP access is
     * fully blocked (403).
     *
     * Set this only as a fallback if CLI cron is unavailable. Use a long,
     * random string (e.g. `openssl rand -hex 32`). The cron then calls
     * `https://.../api/instagram-refresh-token.php?key=<this-secret>`.
     */
    'INSTAGRAM_REFRESH_SECRET'        => '',
];
