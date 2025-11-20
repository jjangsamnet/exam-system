-- 1. fdcdb 데이터베이스에 연결
\c fdcdb

-- 2. 현재 연결된 사용자 확인
SELECT current_user, current_database();

-- 3. 모든 데이터베이스 역할 확인
SELECT rolname, rolsuper, rolinherit, rolcreaterole, rolcreatedb, rolcanlogin
FROM pg_roles
WHERE rolname LIKE '%firebase%' OR rolname LIKE '%owner%'
ORDER BY rolname;

-- 4. firebaseowner_fdcdb_public 역할의 상세 권한 확인
\du firebaseowner_fdcdb_public

-- 5. firebaseowner_fdcdb_public이 속한 역할 그룹 확인
SELECT r.rolname AS role_name, m.rolname AS member_of
FROM pg_roles r
LEFT JOIN pg_auth_members am ON r.oid = am.member
LEFT JOIN pg_roles m ON am.roleid = m.oid
WHERE r.rolname = 'firebaseowner_fdcdb_public';

-- 6. cloudsqlsuperuser 역할 존재 여부 확인
SELECT rolname, rolsuper, rolcreaterole, rolcreatedb
FROM pg_roles
WHERE rolname = 'cloudsqlsuperuser';

-- 7. public 스키마의 user 테이블 구조 확인
\d "public"."user"

-- 8. user 테이블의 현재 컬럼 목록
SELECT column_name, data_type, character_maximum_length, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'user'
ORDER BY ordinal_position;
