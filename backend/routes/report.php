<?php
/**
 * 자료실 API  (pcs_data 테이블 - 단일 첨부파일 인라인)
 *
 * GET  /api/report                목록 (page, size, type, keyword, date_from, date_to)
 * GET  /api/report/{id}           상세 (조회수 증가; ?preview=1 이면 증가 안 함)
 * POST /api/report                등록  (FormData: title, content, files[])
 * POST /api/report/{id}           수정  (FormData: title, content, files[])
 * POST /api/report/{id}/delete    삭제
 * POST /api/report/file/{id}/delete  첨부파일 삭제 (id = data_key)
 */
function handleReport(array $seg, string $method): void
{
    $pdo = getDB();

    // POST /api/report/file/{dataId}/delete  (첨부파일 삭제 - data_key 로 처리)
    if ($method === 'POST' && ($seg[1] ?? '') === 'file' && ($seg[3] ?? '') === 'delete') {
        requireAuth();
        $dataId = (int)($seg[2] ?? 0);
        $stmt   = $pdo->prepare("SELECT data_file FROM pcs_data WHERE data_key = ?");
        $stmt->execute([$dataId]);
        $row = $stmt->fetch();
        if (!$row) errorResponse('게시물을 찾을 수 없습니다.', 404);
        if ($row['data_file']) deleteUploadedFile('data', $row['data_file']);
        $pdo->prepare("UPDATE pcs_data SET data_file = NULL, data_file_org = NULL, mod_date = NOW() WHERE data_key = ?")->execute([$dataId]);
        successResponse(null, '삭제되었습니다.');
    }

    $id  = isset($seg[1]) && is_numeric($seg[1]) ? (int)$seg[1] : null;
    $sub = $seg[2] ?? '';

    // ----------------------------------------------------------------
    // GET /api/report  (목록)
    // ----------------------------------------------------------------
    if ($method === 'GET' && $id === null) {
        $page     = max(1, (int)($_GET['page']     ?? 1));
        $size     = max(1, min(100, (int)($_GET['size'] ?? 10)));
        $keyword  = trim($_GET['keyword']  ?? '');
        $type     = (int)($_GET['type']    ?? 0);
        $dateFrom = trim($_GET['date_from'] ?? '');
        $dateTo   = trim($_GET['date_to']   ?? '');
        $offset   = ($page - 1) * $size;

        $where  = [];
        $params = [];

        if ($keyword !== '') {
            switch ($type) {
                case 1: $where[] = 'r.data_content LIKE ?';                                      $params[] = "%$keyword%"; break;
                case 2: $where[] = '(r.data_title LIKE ? OR r.data_content LIKE ?)';             $params[] = "%$keyword%"; $params[] = "%$keyword%"; break;
                default: $where[] = 'r.data_title LIKE ?';                                       $params[] = "%$keyword%"; break;
            }
        }
        if ($dateFrom !== '') { $where[] = 'DATE(r.reg_date) >= ?'; $params[] = $dateFrom; }
        if ($dateTo   !== '') { $where[] = 'DATE(r.reg_date) <= ?'; $params[] = $dateTo;   }
        $whereStr = $where ? 'WHERE ' . implode(' AND ', $where) : '';

        $cntStmt = $pdo->prepare("SELECT COUNT(*) FROM pcs_data r $whereStr");
        $cntStmt->execute($params);
        $total = (int)$cntStmt->fetchColumn();

        $listStmt = $pdo->prepare(
            "SELECT r.data_key AS id, r.data_title AS title,
                    r.reg_name AS author_name, r.data_hit AS view_count, r.reg_date AS created_at,
                    CASE WHEN r.data_file IS NOT NULL AND r.data_file != '' THEN 1 ELSE 0 END AS file_count
               FROM pcs_data r $whereStr
              ORDER BY r.data_key DESC
              LIMIT ? OFFSET ?"
        );
        $listStmt->execute(array_merge($params, [$size, $offset]));
        $items = $listStmt->fetchAll();

        successResponse([
            'items'      => $items,
            'totalCount' => $total,
            'totalPages' => (int)ceil($total / $size),
            'page'       => $page,
            'size'       => $size,
        ]);
    }

    // ----------------------------------------------------------------
    // GET /api/report/{id}  (상세)
    // ----------------------------------------------------------------
    if ($method === 'GET' && $id !== null) {
        $preview = ($_GET['preview'] ?? '') === '1';
        if (!$preview) {
            $pdo->prepare("UPDATE pcs_data SET data_hit = data_hit + 1 WHERE data_key = ?")->execute([$id]);
        }

        $stmt = $pdo->prepare(
            "SELECT data_key AS id, data_title AS title, reg_id AS author_id,
                    reg_name AS author_name, data_content AS content,
                    data_hit AS view_count, reg_date AS created_at, mod_date AS updated_at,
                    data_file, data_file_org
               FROM pcs_data WHERE data_key = ?"
        );
        $stmt->execute([$id]);
        $item = $stmt->fetch();
        if (!$item) errorResponse('게시물을 찾을 수 없습니다.', 404);

        // 첨부파일 배열 구성 (0 또는 1개)
        $files = [];
        if (!empty($item['data_file'])) {
            $files[] = [
                'id'        => $item['id'],
                'ori_name'  => $item['data_file_org'] ?: $item['data_file'],
                'save_name' => $item['data_file'],
                'file_url'  => UPLOAD_BASE_URL . '/data/' . $item['data_file'],
                'file_ext'  => pathinfo($item['data_file'], PATHINFO_EXTENSION),
                'file_size' => 0,
            ];
        }
        unset($item['data_file'], $item['data_file_org']);

        $prevStmt = $pdo->prepare("SELECT data_key AS id, data_title AS title FROM pcs_data WHERE data_key < ? ORDER BY data_key DESC LIMIT 1");
        $prevStmt->execute([$id]);
        $prev = $prevStmt->fetch() ?: null;

        $nextStmt = $pdo->prepare("SELECT data_key AS id, data_title AS title FROM pcs_data WHERE data_key > ? ORDER BY data_key ASC LIMIT 1");
        $nextStmt->execute([$id]);
        $next = $nextStmt->fetch() ?: null;

        successResponse(['item' => $item, 'files' => $files, 'prev' => $prev, 'next' => $next]);
    }

    // ----------------------------------------------------------------
    // POST /api/report/{id}/delete  (삭제)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id !== null && $sub === 'delete') {
        requireAuth();
        $stmt = $pdo->prepare("SELECT data_file FROM pcs_data WHERE data_key = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if ($row && $row['data_file']) {
            deleteUploadedFile('data', $row['data_file']);
        }
        $pdo->prepare("DELETE FROM pcs_data WHERE data_key = ?")->execute([$id]);
        successResponse(null, '삭제되었습니다.');
    }

    // ----------------------------------------------------------------
    // POST /api/report  (등록)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id === null) {
        $auth    = requireAuth();
        $title   = trim($_POST['title']   ?? '');
        $content = trim($_POST['content'] ?? '');
        if ($title === '') errorResponse('제목을 입력해주세요.');

        $fileInfo = _getDataFile('data');

        $pdo->prepare(
            "INSERT INTO pcs_data (data_title, data_content, reg_id, reg_name, data_file, data_file_org)
             VALUES (?, ?, ?, ?, ?, ?)"
        )->execute([
            $title,
            $content,
            $auth['sub']  ?? '',
            $auth['name'] ?? '관리자',
            $fileInfo['save_name'] ?? null,
            $fileInfo['ori_name']  ?? null,
        ]);
        $newId = (int)$pdo->lastInsertId();
        successResponse(['id' => $newId], '등록되었습니다.');
    }

    // ----------------------------------------------------------------
    // POST /api/report/{id}  (수정)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id !== null && $sub === '') {
        requireAuth();
        $stmt = $pdo->prepare("SELECT data_file FROM pcs_data WHERE data_key = ?");
        $stmt->execute([$id]);
        $old = $stmt->fetch();
        if (!$old) errorResponse('게시물을 찾을 수 없습니다.', 404);

        $title   = trim($_POST['title']   ?? '');
        $content = trim($_POST['content'] ?? '');
        if ($title === '') errorResponse('제목을 입력해주세요.');

        $newFileInfo = _getDataFile('data');

        $sets  = ['data_title = ?', 'data_content = ?', 'mod_date = NOW()'];
        $binds = [$title, $content];

        if ($newFileInfo) {
            // 기존 파일 삭제 후 교체
            if ($old['data_file']) deleteUploadedFile('data', $old['data_file']);
            $sets[]  = 'data_file = ?';
            $sets[]  = 'data_file_org = ?';
            $binds[] = $newFileInfo['save_name'];
            $binds[] = $newFileInfo['ori_name'];
        }

        $binds[] = $id;
        $pdo->prepare("UPDATE pcs_data SET " . implode(', ', $sets) . " WHERE data_key = ?")->execute($binds);
        successResponse(null, '수정되었습니다.');
    }

    errorResponse('잘못된 요청입니다.', 400);
}

/**
 * files[] 또는 files 인풋에서 단일 파일을 업로드하고 정보를 반환.
 * 파일이 없으면 null 반환.
 */
function _getDataFile(string $subDir): ?array
{
    if (empty($_FILES['files']['name'])) return null;

    $files    = $_FILES['files'];
    $name     = is_array($files['name'])     ? $files['name'][0]     : $files['name'];
    $type     = is_array($files['type'])     ? $files['type'][0]     : $files['type'];
    $tmpName  = is_array($files['tmp_name']) ? $files['tmp_name'][0] : $files['tmp_name'];
    $error    = is_array($files['error'])    ? $files['error'][0]    : $files['error'];
    $size     = is_array($files['size'])     ? $files['size'][0]     : $files['size'];

    if ($error !== UPLOAD_ERR_OK || $name === '') return null;

    $single = [
        'name'     => $name,
        'type'     => $type,
        'tmp_name' => $tmpName,
        'error'    => $error,
        'size'     => $size,
    ];

    return uploadFile($single, $subDir);
}
