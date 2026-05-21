<?php
/**
 * 공지사항 API
 *
 * GET  /api/notice                목록 (page, size, type, keyword, date_from, date_to)
 * GET  /api/notice/{id}           상세 (조회수 증가; ?preview=1 이면 증가 안 함)
 * POST /api/notice                등록  (FormData: title, content, files[])
 * POST /api/notice/{id}           수정  (FormData: title, content, files[])
 * POST /api/notice/{id}/delete    삭제
 * POST /api/notice/file/{id}/delete  첨부파일 단독 삭제
 */
function handleNotice(array $seg, string $method): void
{
    $pdo = getDB();

    // POST /api/notice/file/{fileId}/delete
    if ($method === 'POST' && ($seg[1] ?? '') === 'file' && ($seg[3] ?? '') === 'delete') {
        requireAuth();
        $fileId = (int)($seg[2] ?? 0);
        $stmt   = $pdo->prepare("SELECT save_name FROM notice_files WHERE id = ?");
        $stmt->execute([$fileId]);
        $file   = $stmt->fetch();
        if (!$file) errorResponse('파일을 찾을 수 없습니다.', 404);
        deleteUploadedFile('notice', $file['save_name']);
        $pdo->prepare("DELETE FROM notice_files WHERE id = ?")->execute([$fileId]);
        successResponse(null, '삭제되었습니다.');
    }

    $id  = isset($seg[1]) && is_numeric($seg[1]) ? (int)$seg[1] : null;
    $sub = $seg[2] ?? '';

    // ----------------------------------------------------------------
    // GET /api/notice  (목록)
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
                case 1: $where[] = 'n.content LIKE ?';           $params[] = "%$keyword%"; break;
                case 2: $where[] = '(n.title LIKE ? OR n.content LIKE ?)'; $params[] = "%$keyword%"; $params[] = "%$keyword%"; break;
                default: $where[] = 'n.title LIKE ?';            $params[] = "%$keyword%"; break;
            }
        }
        if ($dateFrom !== '') { $where[] = 'DATE(n.created_at) >= ?'; $params[] = $dateFrom; }
        if ($dateTo   !== '') { $where[] = 'DATE(n.created_at) <= ?'; $params[] = $dateTo;   }
        $whereStr = $where ? 'WHERE ' . implode(' AND ', $where) : '';

        $cntStmt = $pdo->prepare("SELECT COUNT(*) FROM notice n $whereStr");
        $cntStmt->execute($params);
        $total = (int)$cntStmt->fetchColumn();

        $listStmt = $pdo->prepare(
            "SELECT n.id, n.title, n.author_name, n.view_count, n.created_at,
                    (SELECT COUNT(*) FROM notice_files f WHERE f.notice_id = n.id) AS file_count
               FROM notice n $whereStr
              ORDER BY n.id DESC
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
    // GET /api/notice/{id}  (상세)
    // ----------------------------------------------------------------
    if ($method === 'GET' && $id !== null) {
        $preview = ($_GET['preview'] ?? '') === '1';
        if (!$preview) {
            $pdo->prepare("UPDATE notice SET view_count = view_count + 1 WHERE id = ?")->execute([$id]);
        }

        $stmt = $pdo->prepare("SELECT * FROM notice WHERE id = ?");
        $stmt->execute([$id]);
        $item = $stmt->fetch();
        if (!$item) errorResponse('게시물을 찾을 수 없습니다.', 404);

        $fileStmt = $pdo->prepare("SELECT id, ori_name, save_name, file_url, file_size, file_ext FROM notice_files WHERE notice_id = ? ORDER BY id ASC");
        $fileStmt->execute([$id]);
        $files = $fileStmt->fetchAll();

        $prevStmt = $pdo->prepare("SELECT id, title FROM notice WHERE id < ? ORDER BY id DESC LIMIT 1");
        $prevStmt->execute([$id]);
        $prev = $prevStmt->fetch() ?: null;

        $nextStmt = $pdo->prepare("SELECT id, title FROM notice WHERE id > ? ORDER BY id ASC LIMIT 1");
        $nextStmt->execute([$id]);
        $next = $nextStmt->fetch() ?: null;

        successResponse(['item' => $item, 'files' => $files, 'prev' => $prev, 'next' => $next]);
    }

    // ----------------------------------------------------------------
    // POST /api/notice/{id}/delete  (삭제)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id !== null && $sub === 'delete') {
        requireAuth();
        $fileStmt = $pdo->prepare("SELECT save_name FROM notice_files WHERE notice_id = ?");
        $fileStmt->execute([$id]);
        foreach ($fileStmt->fetchAll() as $f) {
            deleteUploadedFile('notice', $f['save_name']);
        }
        $pdo->prepare("DELETE FROM notice WHERE id = ?")->execute([$id]);
        successResponse(null, '삭제되었습니다.');
    }

    // ----------------------------------------------------------------
    // POST /api/notice  (등록)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id === null) {
        $auth    = requireAuth();
        $title   = trim($_POST['title']   ?? '');
        $content = trim($_POST['content'] ?? '');
        if ($title === '') errorResponse('제목을 입력해주세요.');

        $pdo->prepare(
            "INSERT INTO notice (title, content, author_id, author_name) VALUES (?, ?, ?, ?)"
        )->execute([$title, $content, $auth['sub'] ?? '', $auth['name'] ?? '관리자']);
        $newId = (int)$pdo->lastInsertId();

        _saveNoticeFiles($pdo, $newId);
        successResponse(['id' => $newId], '등록되었습니다.');
    }

    // ----------------------------------------------------------------
    // POST /api/notice/{id}  (수정)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id !== null && $sub === '') {
        requireAuth();
        $stmt = $pdo->prepare("SELECT id FROM notice WHERE id = ?");
        $stmt->execute([$id]);
        if (!$stmt->fetch()) errorResponse('게시물을 찾을 수 없습니다.', 404);

        $title   = trim($_POST['title']   ?? '');
        $content = trim($_POST['content'] ?? '');
        if ($title === '') errorResponse('제목을 입력해주세요.');

        $pdo->prepare("UPDATE notice SET title = ?, content = ?, updated_at = NOW() WHERE id = ?")->execute([$title, $content, $id]);
        _saveNoticeFiles($pdo, $id);
        successResponse(null, '수정되었습니다.');
    }

    errorResponse('잘못된 요청입니다.', 400);
}

function _saveNoticeFiles(PDO $pdo, int $noticeId): void
{
    if (empty($_FILES['files']['name'])) return;

    $files = $_FILES['files'];
    $count = is_array($files['name']) ? count($files['name']) : 1;

    for ($i = 0; $i < $count; $i++) {
        $file = [
            'name'     => is_array($files['name'])     ? $files['name'][$i]     : $files['name'],
            'type'     => is_array($files['type'])     ? $files['type'][$i]     : $files['type'],
            'tmp_name' => is_array($files['tmp_name']) ? $files['tmp_name'][$i] : $files['tmp_name'],
            'error'    => is_array($files['error'])    ? $files['error'][$i]    : $files['error'],
            'size'     => is_array($files['size'])     ? $files['size'][$i]     : $files['size'],
        ];
        if ($file['error'] !== UPLOAD_ERR_OK || $file['name'] === '') continue;

        $info = uploadFile($file, 'notice');
        $pdo->prepare(
            "INSERT INTO notice_files (notice_id, ori_name, save_name, file_url, file_size, file_ext)
             VALUES (?, ?, ?, ?, ?, ?)"
        )->execute([$noticeId, $info['ori_name'], $info['save_name'], $info['file_url'], $info['file_size'], $info['file_ext']]);
    }
}
