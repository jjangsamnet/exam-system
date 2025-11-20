-- ============================================================================
-- Cloud SQL 데이터베이스 권한 부여 및 스키마 마이그레이션
-- ============================================================================
-- 프로젝트: exam-system-28765
-- 인스턴스: exam-system-fdc
-- 데이터베이스: fdcdb
-- 실행 사용자: postgres
-- ============================================================================

-- 1단계: firebaseowner_fdcdb_public 역할에 cloudsqlsuperuser 권한 부여
-- ============================================================================

-- firebaseowner_fdcdb_public을 cloudsqlsuperuser 그룹에 추가
GRANT cloudsqlsuperuser TO firebaseowner_fdcdb_public;

-- 권한 부여 확인
SELECT r.rolname AS role_name, m.rolname AS member_of
FROM pg_roles r
LEFT JOIN pg_auth_members am ON r.oid = am.member
LEFT JOIN pg_roles m ON am.roleid = m.oid
WHERE r.rolname = 'firebaseowner_fdcdb_public';

-- ============================================================================
-- 2단계: user 테이블에 필요한 컬럼 추가
-- ============================================================================

-- approval_status와 school_name 컬럼 추가
ALTER TABLE "public"."user"
ADD COLUMN IF NOT EXISTS "approval_status" character varying(20) NULL,
ADD COLUMN IF NOT EXISTS "school_name" character varying(200) NULL;

-- 컬럼 추가 확인
SELECT column_name, data_type, character_maximum_length, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'user'
ORDER BY ordinal_position;

-- ============================================================================
-- 3단계: 최종 확인
-- ============================================================================

-- user 테이블 구조 확인
\d "public"."user"

-- ============================================================================
-- 완료 메시지
-- ============================================================================

SELECT 'Database migration completed successfully!' AS status;
