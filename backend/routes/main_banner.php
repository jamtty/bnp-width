<?php
/**
 * 메인 배너 API
 *
 * GET    /api/main-banner          목록 조회 (page, size, keyword, display_yn)
 * GET    /api/main-banner/active   활성 배너 목록 (display_yn = Y)
 * GET    /api/main-banner/{id}     상세 조회
 * POST   /api/main-banner          등록
 * POST   /api/main-banner/{id}     수정
 * POST   /api/main-banner/{id}/display  노출 여부 변경
 * POST   /api/main-banner/{id}/sort     정렬 순서 변경
 * POST   /api/main-banner/{id}/delete   삭제
 */
function handleMainBanner(array $seg, string $method): void
{
    $pdo = getDB();
    $id  = isset($seg[1]) && is_numeric($seg[1]) ? (int)$seg[1] : null;
    $sub = $seg[2] ?? '';   // 'display' | 'sort' | 'delete' | ''

    // ----------------------------------------------------------------
    // GET /api/main-banner/active
    // ----------------------------------------------------------------
    if ($method === 'GET' && ($seg[1] ?? '') === 'active') {
        $stmt  = $pdo->query(
            "SELECT id, title, img_web, img_mobile, img_web_ori, img_mobile_ori,
                    display_yn, sort_order
               FROM main_banner
              WHERE display_yn = 'Y'
              ORDER BY sort_order ASC, id ASC"
        );
        $items = $stmt->fetchAll();
        foreach ($items as &$row) {
            $row = _bannerUrls($row);
        }
        unset($row);
        successResponse($items);
    }

    // ----------------------------------------------------------------
    // GET /api/main-banner  (목록)
    // ----------------------------------------------------------------
    if ($method === 'GET' && $id === null) {
        $page      = max(1, (int)($_GET['page']       ?? 1));
        $size      = max(1, min(100, (int)($_GET['size'] ?? 10)));
        $keyword   = trim($_GET['keyword']   ?? '');
        $displayYn = $_GET['display_yn'] ?? '';
        $offset    = ($page - 1) * $size;

        $where  = [];
        $params = [];
        if ($keyword !== '') {
            $where[]  = 'title LIKE ?';
            $params[] = '%' . $keyword . '%';
        }
        if (in_array($displayYn, ['Y', 'N'], true)) {
            $where[]  = 'display_yn = ?';
            $params[] = $displayYn;
        }
        $whereStr = $where ? 'WHERE ' . implode(' AND ', $where) : '';

        $cntStmt = $pdo->prepare("SELECT COUNT(*) FROM main_banner $whereStr");
        $cntStmt->execute($params);
        $total = (int)$cntStmt->fetchColumn();

        $listStmt = $pdo->prepare(
            "SELECT id, title, img_web, img_mobile, img_url_web, img_url_mobile,
                    img_web_ori, img_mobile_ori, display_yn, sort_order, created_at
               FROM main_banner $whereStr
              ORDER BY sort_order ASC, id ASC
              LIMIT ? OFFSET ?"
        );
        $listStmt->execute(array_merge($params, [$size, $offset]));
        $items = $listStmt->fetchAll();
        foreach ($items as &$row) {
            $row = _bannerUrls($row);
        }
        unset($row);

        successResponse([
            'items'       => $items,
            'total'       => $total,
            'total_pages' => (int)ceil($total / $size),
            'page'        => $page,
            'size'        => $size,
        ]);
    }

    // ----------------------------------------------------------------
    // GET /api/main-banner/{id}  (상세)
    // ----------------------------------------------------------------
    if ($method === 'GET' && $id !== null) {
        $stmt = $pdo->prepare(
            "SELECT id, title, img_web, img_mobile, img_url_web, img_url_mobile,
                    img_web_ori, img_mobile_ori, display_yn, sort_order, created_at, updated_at
               FROM main_banner WHERE id = ?"
        );
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) errorResponse('배너를 찾을 수 없습니다.', 404);
        successResponse(_bannerUrls($row));
    }

    // ----------------------------------------------------------------
    // POST /api/main-banner/{id}/display  (노출 여부)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id !== null && $sub === 'display') {
        requireAuth();
        $body      = json_decode(file_get_contents('php://input'), true) ?? [];
        $displayYn = $body['display_yn'] ?? '';
        if (!in_array($displayYn, ['Y', 'N'], true)) errorResponse('display_yn 은 Y 또는 N 이어야 합니다.');
        $pdo->prepare("UPDATE main_banner SET display_yn = ?, updated_at = NOW() WHERE id = ?")->execute([$displayYn, $id]);
        successResponse(null, '변경되었습니다.');
    }

    // ----------------------------------------------------------------
    // POST /api/main-banner/{id}/sort  (정렬 순서)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id !== null && $sub === 'sort') {
        requireAuth();
        $body       = json_decode(file_get_contents('php://input'), true) ?? [];
        $sortOrder  = isset($body['sort_order']) ? (int)$body['sort_order'] : null;
        if ($sortOrder === null) errorResponse('sort_order 값이 필요합니다.');
        $pdo->prepare("UPDATE main_banner SET sort_order = ?, updated_at = NOW() WHERE id = ?")->execute([$sortOrder, $id]);
        successResponse(null, '변경되었습니다.');
    }

    // ----------------------------------------------------------------
    // POST /api/main-banner/{id}/delete  (삭제)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id !== null && $sub === 'delete') {
        requireAuth();
        $stmt = $pdo->prepare("SELECT img_web, img_mobile FROM main_banner WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) errorResponse('배너를 찾을 수 없습니다.', 404);
        if ($row['img_web'])    deleteUploadedFile('banner', $row['img_web']);
        if ($row['img_mobile']) deleteUploadedFile('banner', $row['img_mobile']);
        $pdo->prepare("DELETE FROM main_banner WHERE id = ?")->execute([$id]);
        successResponse(null, '삭제되었습니다.');
    }

    // ----------------------------------------------------------------
    // POST /api/main-banner  (등록)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id === null) {
        requireAuth();
        $auth  = requireAuth();
        $title = trim($_POST['title'] ?? '');
        if ($title === '') errorResponse('제목을 입력해주세요.');

        $displayYn = in_array($_POST['display_yn'] ?? '', ['Y', 'N'], true) ? $_POST['display_yn'] : 'N';
        $sortOrder = isset($_POST['sort_order']) && $_POST['sort_order'] !== '' ? (int)$_POST['sort_order'] : null;

        $webInfo    = null;
        $mobileInfo = null;
        if (!empty($_FILES['img_web']['name'])) {
            $webInfo = uploadFile($_FILES['img_web'], 'banner', ALLOWED_IMAGE_EXTS);
        }
        if (!empty($_FILES['img_mobile']['name'])) {
            $mobileInfo = uploadFile($_FILES['img_mobile'], 'banner', ALLOWED_IMAGE_EXTS);
        }

        $pdo->prepare(
            "INSERT INTO main_banner (title, img_web, img_mobile, img_web_ori, img_mobile_ori,
                                      img_url_web, img_url_mobile, display_yn, sort_order, created_by)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        )->execute([
            $title,
            $webInfo['save_name']    ?? null,
            $mobileInfo['save_name'] ?? null,
            $webInfo['ori_name']     ?? null,
            $mobileInfo['ori_name']  ?? null,
            $webInfo['file_url']     ?? null,
            $mobileInfo['file_url']  ?? null,
            $displayYn,
            $sortOrder,
            $auth['name'] ?? '',
        ]);
        $newId = (int)$pdo->lastInsertId();
        successResponse(['id' => $newId], '등록되었습니다.');
    }

    // ----------------------------------------------------------------
    // POST /api/main-banner/{id}  (수정)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id !== null && $sub === '') {
        requireAuth();
        $stmt = $pdo->prepare("SELECT img_web, img_mobile FROM main_banner WHERE id = ?");
        $stmt->execute([$id]);
        $old = $stmt->fetch();
        if (!$old) errorResponse('배너를 찾을 수 없습니다.', 404);

        $title = trim($_POST['title'] ?? '');
        if ($title === '') errorResponse('제목을 입력해주세요.');

        $displayYn = in_array($_POST['display_yn'] ?? '', ['Y', 'N'], true) ? $_POST['display_yn'] : 'N';
        $sortOrder = isset($_POST['sort_order']) && $_POST['sort_order'] !== '' ? (int)$_POST['sort_order'] : null;

        $webInfo    = null;
        $mobileInfo = null;
        if (!empty($_FILES['img_web']['name'])) {
            if ($old['img_web']) deleteUploadedFile('banner', $old['img_web']);
            $webInfo = uploadFile($_FILES['img_web'], 'banner', ALLOWED_IMAGE_EXTS);
        }
        if (!empty($_FILES['img_mobile']['name'])) {
            if ($old['img_mobile']) deleteUploadedFile('banner', $old['img_mobile']);
            $mobileInfo = uploadFile($_FILES['img_mobile'], 'banner', ALLOWED_IMAGE_EXTS);
        }

        $sets  = ['title = ?', 'display_yn = ?', 'sort_order = ?', 'updated_at = NOW()'];
        $binds = [$title, $displayYn, $sortOrder];
        if ($webInfo) {
            $sets[]  = 'img_web = ?';
            $sets[]  = 'img_web_ori = ?';
            $sets[]  = 'img_url_web = ?';
            $binds[] = $webInfo['save_name'];
            $binds[] = $webInfo['ori_name'];
            $binds[] = $webInfo['file_url'];
        }
        if ($mobileInfo) {
            $sets[]  = 'img_mobile = ?';
            $sets[]  = 'img_mobile_ori = ?';
            $sets[]  = 'img_url_mobile = ?';
            $binds[] = $mobileInfo['save_name'];
            $binds[] = $mobileInfo['ori_name'];
            $binds[] = $mobileInfo['file_url'];
        }
        $binds[] = $id;
        $pdo->prepare("UPDATE main_banner SET " . implode(', ', $sets) . " WHERE id = ?")->execute($binds);
        successResponse(null, '수정되었습니다.');
    }

    errorResponse('잘못된 요청입니다.', 400);
}

// ----------------------------------------------------------------
// Helper: img_web / img_mobile 을 절대 URL 로 변환
// ----------------------------------------------------------------
function _bannerUrls(array $row): array
{
    if (!isset($row['img_url_web']) || !$row['img_url_web']) {
        $row['img_url_web'] = $row['img_web'] ? UPLOAD_BASE_URL . '/banner/' . $row['img_web'] : '';
    }
    if (!isset($row['img_url_mobile']) || !$row['img_url_mobile']) {
        $row['img_url_mobile'] = $row['img_mobile'] ? UPLOAD_BASE_URL . '/banner/' . $row['img_mobile'] : '';
    }
    return $row;
}
