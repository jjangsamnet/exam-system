-- User 테이블에 school_name과 approval_status 컬럼 추가
ALTER TABLE "public"."user"
ADD COLUMN "approval_status" character varying(20) NULL,
ADD COLUMN "school_name" character varying(200) NULL;
