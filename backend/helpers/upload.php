<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../helpers/response.php';

/**
 * 파일을 지정 디렉토리에 업로드하고 저장 파일명을 반환
 * @param array  $file       $_FILES 항목
 * @param string $subDir     UPLOAD_BASE_PATH 하위 디렉토리 (예: 'banner', 'notice')
 * @param array  $allowedExts 허용 확장자 배열
 * @return array ['save_name' => string, 'ori_name' => string, 'file_url' => string, 'file_size' => int, 'file_ext' => string]
 */
function uploadFile(array $file, string $subDir, array $allowedExts = ALLOWED_FILE_EXTS): array {
    if ($file['error'] !== UPLOAD_ERR_OK) {
        errorResponse('파일 업로드 중 오류가 발생했습니다. (code: ' . $file['error'] . ')');
    }
    if ($file['size'] > MAX_FILE_SIZE) {
        errorResponse('파일 크기가 허용 한도를 초과합니다. (최대 50MB)');
    }

    $oriName = basename($file['name']);
    $ext     = strtolower(pathinfo($oriName, PATHINFO_EXTENSION));
    if (!in_array($ext, $allowedExts, true)) {
        errorResponse('허용되지 않는 파일 형식입니다: ' . $ext);
    }

    $saveName = date('YmdHis') . '_' . bin2hex(random_bytes(6)) . '.' . $ext;
    $dir      = UPLOAD_BASE_PATH . '/' . $subDir;
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    $dest = $dir . '/' . $saveName;
    if (!move_uploaded_file($file['tmp_name'], $dest)) {
        errorResponse('파일 저장에 실패했습니다.');
    }

    return [
        'save_name' => $saveName,
        'ori_name'  => $oriName,
        'file_url'  => UPLOAD_BASE_URL . '/' . $subDir . '/' . $saveName,
        'file_size' => $file['size'],
        'file_ext'  => $ext,
    ];
}

/** 업로드된 파일 실제 삭제 */
function deleteUploadedFile(string $subDir, string $saveName): void {
    $path = UPLOAD_BASE_PATH . '/' . $subDir . '/' . $saveName;
    if (is_file($path)) {
        @unlink($path);
    }
}
