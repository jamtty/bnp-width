-- ============================================================
-- 헤세드상담코칭연구소 데이터베이스 스키마
-- ============================================================

CREATE DATABASE IF NOT EXISTS hesed_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hesed_db;

-- ------------------------------------------------------------
-- 관리자 계정 (기존 테이블 사용 - 별도 생성 불필요)
-- ------------------------------------------------------------
-- CREATE TABLE IF NOT EXISTS member (
--     id         INT(11)      NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '번호',
--     login_id   VARCHAR(100) NOT NULL COMMENT '로그인 아이디',
--     password   VARCHAR(255) NOT NULL COMMENT '비밀번호 (bcrypt)',
--     name       VARCHAR(100) NOT NULL DEFAULT '관리자' COMMENT '이름',
--     role       VARCHAR(20)  NOT NULL DEFAULT 'ADMIN' COMMENT '권한',
--     created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
--     is_deleted TINYINT(1)   NOT NULL DEFAULT 0 COMMENT '삭제여부'
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='회원 테이블';

-- ------------------------------------------------------------
-- 메인 배너
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS main_banner (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title           VARCHAR(200) NOT NULL,
    img_web         VARCHAR(255)          DEFAULT NULL,   -- 저장 파일명 (web)
    img_mobile      VARCHAR(255)          DEFAULT NULL,   -- 저장 파일명 (mobile)
    img_web_ori     VARCHAR(255)          DEFAULT NULL,   -- 원본 파일명 (web)
    img_mobile_ori  VARCHAR(255)          DEFAULT NULL,   -- 원본 파일명 (mobile)
    display_yn      CHAR(1)      NOT NULL DEFAULT 'N',
    sort_order      TINYINT UNSIGNED      DEFAULT NULL,
    created_by      VARCHAR(50)           DEFAULT NULL,
    created_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME              DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_display_sort (display_yn, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- 공지사항
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS notice (
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(300) NOT NULL,
    content     LONGTEXT              DEFAULT NULL,
    author_id   VARCHAR(50)           DEFAULT NULL,
    author_name VARCHAR(50)  NOT NULL DEFAULT '관리자',
    view_count  INT UNSIGNED NOT NULL DEFAULT 0,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME              DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FULLTEXT INDEX ft_title_content (title, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS notice_files (
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    notice_id   INT UNSIGNED NOT NULL,
    ori_name    VARCHAR(300) NOT NULL,
    save_name   VARCHAR(255) NOT NULL,
    file_url    VARCHAR(500) NOT NULL,
    file_size   INT UNSIGNED NOT NULL DEFAULT 0,
    file_ext    VARCHAR(20)           DEFAULT NULL,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_notice_id (notice_id),
    FOREIGN KEY (notice_id) REFERENCES notice(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- 자료실 (사업보고)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS report (
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(300) NOT NULL,
    content     LONGTEXT              DEFAULT NULL,
    author_id   VARCHAR(50)           DEFAULT NULL,
    author_name VARCHAR(50)  NOT NULL DEFAULT '관리자',
    view_count  INT UNSIGNED NOT NULL DEFAULT 0,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME              DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FULLTEXT INDEX ft_title_content (title, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS report_files (
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    report_id   INT UNSIGNED NOT NULL,
    ori_name    VARCHAR(300) NOT NULL,
    save_name   VARCHAR(255) NOT NULL,
    file_url    VARCHAR(500) NOT NULL,
    file_size   INT UNSIGNED NOT NULL DEFAULT 0,
    file_ext    VARCHAR(20)           DEFAULT NULL,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_report_id (report_id),
    FOREIGN KEY (report_id) REFERENCES report(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
