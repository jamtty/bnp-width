<?php
/**
 * 이미지 업로드 API
 *
 * POST /api/upload/image   에디터 이미지 업로드 → { url }
 */
function handleUpload(array $seg, string $method): void {
    // POST /api/upload/image
    if ($method === 'POST' && ($seg[1] ?? '') === 'image') {
        requireAuth();

        if (empty($_FILES['image']['name'])) {
            errorResponse('이미지 파일이 없습니다.');
        }

        $info = uploadFile($_FILES['image'], 'editor', ALLOWED_IMAGE_EXTS);
        successResponse(['url' => $info['file_url']]);
    }

    errorResponse('잘못된 요청입니다.', 400);
}
