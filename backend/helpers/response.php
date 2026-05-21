<?php

function jsonResponse(bool $success, $data = null, string $message = '', int $statusCode = 200): void {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    $body = ['success' => $success];
    if ($message !== '') $body['message'] = $message;
    if ($data !== null) $body['data'] = $data;
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function successResponse($data = null, string $message = ''): void {
    jsonResponse(true, $data, $message, 200);
}

function errorResponse(string $message, int $statusCode = 400): void {
    jsonResponse(false, null, $message, $statusCode);
}
