<?php
declare(strict_types=1);

require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers/response.php';
require_once __DIR__ . '/helpers/jwt.php';
require_once __DIR__ . '/helpers/upload.php';

// 전역 예외 처리 - 500 에러 시 JSON으로 반환
set_exception_handler(function (Throwable $e) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => false,
        'message' => '서버 오류: ' . $e->getMessage(),
    ], JSON_UNESCAPED_UNICODE);
    exit;
});

/* ---------------------------------------------------------------
 * CORS
 * --------------------------------------------------------------- */
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$isLocalhost = (bool)preg_match('#^https?://(localhost|127\.0\.0\.1)(:\d+)?$#', $origin);
if ($isLocalhost || in_array($origin, ALLOWED_ORIGINS, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

/* ---------------------------------------------------------------
 * 라우팅
 * --------------------------------------------------------------- */
$requestUri  = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$basePath    = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/');
$path        = '/' . ltrim(substr($requestUri, strlen($basePath)), '/');
$method      = strtoupper($_SERVER['REQUEST_METHOD']);

// /api/ prefix 제거
if (strpos($path, '/api/') === 0) {
    $path = substr($path, 4); // '/api' 제거 → '/main-banner/...'
}

$segments = array_values(array_filter(explode('/', $path)));

// ------------------------------------------------------------------
// 라우트 매칭
// ------------------------------------------------------------------

// [배너관리] ---------------------------------------------------------
if (($segments[0] ?? '') === 'main-banner') {
    require_once __DIR__ . '/routes/main_banner.php';
    handleMainBanner($segments, $method);
    exit;
}

// [공지사항] ---------------------------------------------------------
if (($segments[0] ?? '') === 'notice') {
    require_once __DIR__ . '/routes/notice.php';
    handleNotice($segments, $method);
    exit;
}

// [자료실] -----------------------------------------------------------
if (($segments[0] ?? '') === 'report') {
    require_once __DIR__ . '/routes/report.php';
    handleReport($segments, $method);
    exit;
}

// [이미지 업로드] ----------------------------------------------------
if (($segments[0] ?? '') === 'upload') {
    require_once __DIR__ . '/routes/upload.php';
    handleUpload($segments, $method);
    exit;
}

// [인증] -------------------------------------------------------------
if (($segments[0] ?? '') === 'auth') {
    require_once __DIR__ . '/routes/auth.php';
    handleAuth($segments, $method);
    exit;
}

errorResponse('요청한 API를 찾을 수 없습니다.', 404);
