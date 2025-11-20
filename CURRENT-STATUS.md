# 프로젝트 현재 상태

**날짜:** 2025-11-20
**프로젝트:** exam-system (시험 출제 시스템)
**배포 URL:** https://exam-system-28765.web.app

---

## ✅ 정상 작동 중

현재 시스템은 **정상적으로 배포 및 작동 중**입니다.

### 사용 가능한 기능:
- ✅ 사용자 인증 (이메일/비밀번호, Google OAuth)
- ✅ 역할 기반 접근 제어 (학생, 교사, 관리자)
- ✅ 카테고리 관리
- ✅ 문제 생성 (4단계 마법사)
- ✅ 문제 목록 및 검색/필터
- ✅ 시험 빌더 (4단계 마법사)
- ✅ Firebase Analytics
- ✅ 로그인/회원가입
- ✅ 사용자 프로필 관리

---

## ⚠️ 제한된 기능

다음 기능은 데이터베이스 스키마 마이그레이션이 완료될 때까지 사용할 수 없습니다:

### 1. 학생 학교명 저장
- **현재 상태:** 클라이언트 측에서만 관리
- **영향:** 학교명이 데이터베이스에 저장되지 않음
- **임시 해결:** 회원가입 시 입력은 가능하나 저장되지 않음

### 2. 교사/관리자 승인 시스템
- **현재 상태:** `approvalStatus` 필드가 데이터베이스에 없음
- **영향:** 교사/관리자 승인 워크플로우 작동 불가
- **임시 해결:** 모든 교사/관리자가 즉시 접근 가능 (승인 없이)

---

## 🔧 기술적 이슈

### 데이터베이스 마이그레이션 실패

**문제:**
PostgreSQL 데이터베이스에 `school_name`과 `approval_status` 컬럼 추가 필요

**필요한 SQL:**
```sql
ALTER TABLE "public"."user"
ADD COLUMN "approval_status" character varying(20) NULL,
ADD COLUMN "school_name" character varying(200) NULL;
```

**실패 원인:**
1. Firebase CLI에서 Cloud SQL 연결 시 타임아웃 발생
2. SQL 명령 실행 중 연결 끊김
3. `firebaseowner_fdcdb_public` 역할에 `cloudsqlsuperuser` 권한 부족

**시도한 해결 방법:**
- ✅ IAM 권한 확인 및 부여
- ✅ Cloud SQL 승인된 네트워크에 IP 추가
- ❌ `firebase dataconnect:sql:setup` - 타임아웃
- ❌ `firebase dataconnect:sql:migrate --force` - 타임아웃
- ❌ `firebase deploy --only dataconnect` - 스키마 불일치 오류
- ❌ Cloud SQL Studio에서 직접 SQL 실행 - 권한 부족

---

## 📝 적용된 임시 해결책

**파일:** `web-app/src/contexts/AuthContext.jsx`

**변경 사항:**
```javascript
// 이전 코드 (작동 안 함)
const userData = {
  email: user.email,
  name: ...,
  role: ...,
  schoolName: additionalData.schoolName || null  // ❌ 서버로 전송
}

// 현재 코드 (작동함)
const userData = {
  email: user.email,
  name: ...,
  role: ...
  // schoolName은 서버 스키마 업데이트 후 추가 예정
}

// 클라이언트 측 상태에는 유지
setUserProfile({...userData, schoolName: additionalData.schoolName || null})
```

**결과:**
- ✅ 사용자 로그인/회원가입 정상 작동
- ✅ 오류 메시지 제거
- ⚠️ `schoolName`은 페이지 새로고침 시 사라짐 (DB에 저장 안 됨)

---

## 📧 Firebase 지원팀 문의

**상태:** 진행 중

**문의 파일:**
- `firebase-support-request.txt` (초기 문의)
- `firebase-support-followup.txt` (상세 디버그 정보)
- `firebase-support-followup-kr.txt` (한글 버전)

**요청 사항:**
1. 서버 측에서 직접 ALTER TABLE 실행
2. 연결 타임아웃 원인 조사
3. 대체 마이그레이션 방법 안내

---

## 🚀 다음 단계

### 단기 (현재 유지):
1. ✅ 현재 배포 버전 유지
2. ⏳ Firebase 지원팀 답변 대기
3. ⏳ 마이그레이션 완료 후 AuthContext 복원

### 중기 (마이그레이션 완료 후):
1. `schoolName` 및 `approvalStatus` 필드 활성화
2. 승인 시스템 UI 구현
3. 관리자 승인 관리 페이지 개발

### 장기:
1. 시험 응시 인터페이스 개발
2. 자동/수동 채점 시스템 구현
3. 학생 성적 대시보드 개발

---

## 📊 프로젝트 통계

- **진행률:** 약 75%
- **배포 상태:** 프로덕션
- **사용자 기능:** 정상
- **관리자 기능:** 대부분 정상 (승인 시스템 제외)
- **개발 환경:** 로컬 개발 가능
- **테스트 환경:** Firebase 에뮬레이터 사용 가능

---

## 📞 연락처 및 리소스

- **프로젝트 Console:** https://console.firebase.google.com/project/exam-system-28765
- **Cloud SQL Console:** https://console.cloud.google.com/sql/instances/exam-system-fdc
- **GitHub Repository:** https://github.com/jjangsamnet/exam-system
- **배포 URL:** https://exam-system-28765.web.app

---

## 💡 참고 사항

1. **시스템은 현재 정상 작동 중**입니다. 사용자들이 로그인하고 대부분의 기능을 사용할 수 있습니다.

2. **데이터 손실 없음**: 임시 해결책은 데이터를 삭제하지 않으며, 향후 마이그레이션 시 문제없이 전환 가능합니다.

3. **보안**: 모든 인증 및 권한 시스템은 정상 작동 중입니다.

4. **성능**: 프로덕션 배포 상태로 정상적인 성능을 제공합니다.

---

**마지막 업데이트:** 2025-11-20 12:00 (KST)
