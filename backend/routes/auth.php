<?php
/**
 * 인증 API
 *
 * POST  /api/auth/login     관리자 로그인
 * PATCH /api/auth/password  비밀번호 변경
 */
function handleAuth(array $seg, string $method): void {
    $pdo = getDB();

    // POST /api/auth/login
    if ($method === 'POST' && ($seg[1] ?? '') === 'login') {
        $body     = json_decode(file_get_contents('php://input'), true) ?? [];
        $loginId  = trim($body['login_id'] ?? '');
        $password = $body['password'] ?? '';

        if ($loginId === '' || $password === '') {
            errorResponse('아이디와 비밀번호를 입력해주세요.');
        }

        $stmt = $pdo->prepare("SELECT id, login_id, password, name, role FROM member WHERE login_id = ? AND is_deleted = 0 LIMIT 1");
        $stmt->execute([$loginId]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password'])) {
            errorResponse('아이디 또는 비밀번호가 올바르지 않습니다.', 401);
        }

        $token = createToken($user);
        successResponse([
            'token' => $token,
            'user'  => [
                'id'   => (int)$user['id'],
                'name' => $user['name'],
                'role' => $user['role'],
            ],
        ]);
    }

    // PATCH /api/auth/password
    if ($method === 'PATCH' && ($seg[1] ?? '') === 'password') {
        $auth = requireAuth();
        $body = json_decode(file_get_contents('php://input'), true) ?? [];

        $currentPw  = $body['current_password'] ?? '';
        $newPw      = $body['new_password'] ?? '';
        $newPwConf  = $body['new_password_confirm'] ?? '';

        if ($currentPw === '' || $newPw === '' || $newPwConf === '') {
            errorResponse('모든 항목을 입력해주세요.');
        }
        if ($newPw !== $newPwConf) {
            errorResponse('새 비밀번호와 확인이 일치하지 않습니다.');
        }
        if (strlen($newPw) < 8) {
            errorResponse('비밀번호는 8자 이상이어야 합니다.');
        }

        $stmt = $pdo->prepare("SELECT password FROM member WHERE id = ? AND is_deleted = 0");
        $stmt->execute([$auth['sub']]);
        $user = $stmt->fetch();
        if (!$user) errorResponse('사용자를 찾을 수 없습니다.', 404);

        if (!password_verify($currentPw, $user['password'])) {
            errorResponse('현재 비밀번호가 올바르지 않습니다.');
        }

        $hash = password_hash($newPw, PASSWORD_BCRYPT);
        $pdo->prepare("UPDATE member SET password = ? WHERE id = ?")
            ->execute([$hash, $auth['sub']]);

        successResponse(null, '비밀번호가 변경되었습니다.');
    }

    errorResponse('잘못된 요청입니다.', 400);
}
