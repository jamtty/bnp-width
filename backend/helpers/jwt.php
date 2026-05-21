<?php
require_once __DIR__ . '/../config/config.php';

/* ----------------------------------------------------------------
 * 순수 PHP JWT (HS256) 구현
 * firebase/php-jwt 없이 동작
 * ---------------------------------------------------------------- */

function base64UrlEncode(string $data): string {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64UrlDecode(string $data): string {
    $padded = str_pad(strtr($data, '-_', '+/'), strlen($data) + (4 - strlen($data) % 4) % 4, '=');
    return base64_decode($padded);
}

function jwtEncode(array $payload): string {
    $header  = base64UrlEncode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
    $payload = base64UrlEncode(json_encode($payload));
    $sig     = base64UrlEncode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
    return "$header.$payload.$sig";
}

function jwtDecode(string $token): ?array {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;

    [$header, $payload, $sig] = $parts;
    $expected = base64UrlEncode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
    if (!hash_equals($expected, $sig)) return null;

    $data = json_decode(base64UrlDecode($payload), true);
    if (!$data) return null;
    if (isset($data['exp']) && $data['exp'] < time()) return null;

    return $data;
}

function createToken(array $user): string {
    return jwtEncode([
        'sub'  => $user['id'],
        'name' => $user['name'],
        'role' => $user['role'],
        'iat'  => time(),
        'exp'  => time() + JWT_EXPIRY,
    ]);
}

/** Authorization 헤더에서 토큰을 꺼내 검증하고 payload 반환 */
function requireAuth(): array {
    // Apache 환경마다 헤더명이 다를 수 있으므로 여러 키를 체크
    $header = $_SERVER['HTTP_AUTHORIZATION']
           ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
           ?? getallheaders()['Authorization']
           ?? getallheaders()['authorization']
           ?? '';
    if (!preg_match('/^Bearer\s+(.+)$/i', $header, $m)) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => '인증이 필요합니다.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    $payload = jwtDecode($m[1]);
    if (!$payload) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => '유효하지 않거나 만료된 토큰입니다.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    return $payload;
}
