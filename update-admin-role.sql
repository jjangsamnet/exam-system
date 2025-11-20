-- ============================================================================
-- kd12345@gmail.com 계정을 관리자로 등록
-- ============================================================================

-- 1단계: 현재 사용자 정보 확인
SELECT id, email, name, role, approval_status, school_name
FROM "public"."user"
WHERE email = 'kd12345@gmail.com';

-- 2단계: 관리자로 변경
UPDATE "public"."user"
SET
  role = 'admin',
  approval_status = 'approved'
WHERE email = 'kd12345@gmail.com';

-- 3단계: 변경 확인
SELECT id, email, name, role, approval_status, school_name, created_at
FROM "public"."user"
WHERE email = 'kd12345@gmail.com';

-- 4단계: 모든 사용자 목록 확인
SELECT id, email, name, role, approval_status, created_at
FROM "public"."user"
ORDER BY created_at DESC;

-- ============================================================================
