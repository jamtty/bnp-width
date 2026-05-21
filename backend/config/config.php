<?php
// ============================================================
// 데이터베이스
// ============================================================
define('DB_HOST',    'localhost');
define('DB_NAME',    'bnpwith');
define('DB_USER',    'bnpwith');
define('DB_PASS',    'Bnp21001!');
define('DB_CHARSET', 'utf8mb4');

// ============================================================
// JWT
// ============================================================
define('JWT_SECRET', 'hesed_jwt_secret_key_change_in_production');
define('JWT_EXPIRY', 3600 * 24); // 24시간

// ============================================================
// 파일 업로드
// ============================================================
define('UPLOAD_BASE_PATH', dirname(dirname(__DIR__)) . '/uploads');
define('UPLOAD_BASE_URL',  '/uploads');
define('MAX_FILE_SIZE',    50 * 1024 * 1024); // 50MB

define('ALLOWED_IMAGE_EXTS', ['jpg', 'jpeg', 'png', 'gif', 'webp']);
define('ALLOWED_FILE_EXTS',  ['jpg', 'jpeg', 'png', 'gif', 'webp',
                               'pdf', 'doc', 'docx', 'xls', 'xlsx',
                               'ppt', 'pptx', 'zip', 'hwp']);

// ============================================================
// CORS 허용 도메인
// ============================================================
define('ALLOWED_ORIGINS', ['https://bnpwith.mycafe24.com']);
