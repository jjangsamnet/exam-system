# 시험 출제 시스템 (Exam System)

Firebase 기반 온라인 시험 출제 및 관리 시스템

## 주요 기능

### 사용자 관리
- **역할 기반 접근 제어**: 학생, 교사, 관리자
- **인증 방식**: 이메일/비밀번호, Google OAuth
- **승인 시스템**: 교사 및 관리자 계정은 관리자 승인 필요
- **학생 정보**: 학생 회원가입 시 학교명 입력

### 문제 관리
- **문제 유형**: 객관식, O/X, 단답형, 서술형
- **난이도 설정**: 쉬움, 보통, 어려움
- **카테고리 관리**: 과목 및 단원별 분류
- **이미지 첨부**: 문제에 이미지 추가 가능

### 시험 관리
- **시험 생성**: 문제 선택 및 시험 구성
- **시간 제한**: 시험 시간 설정
- **배점 관리**: 문제별 배점 설정
- **합격 기준**: 합격 점수 설정

### 시험 응시
- **실시간 응시**: 온라인으로 시험 응시
- **자동 채점**: 객관식/O/X 자동 채점
- **수동 채점**: 주관식 답안 교사 채점
- **결과 확인**: 점수 및 합격 여부 확인

## 기술 스택

### Frontend
- React 18
- Vite
- React Router
- TanStack Query

### Backend
- Firebase Authentication
- Firebase Data Connect (PostgreSQL)
- Firebase Analytics

### Database Schema
- Users (사용자)
- Categories (카테고리)
- Questions (문제)
- Choices (선택지)
- Answers (정답)
- Exams (시험)
- ExamAttempts (응시 기록)
- StudentAnswers (학생 답안)

## 프로젝트 구조

```
exam-system/
├── web-app/              # React 프론트엔드
│   ├── src/
│   │   ├── components/   # UI 컴포넌트
│   │   ├── contexts/     # React Context
│   │   └── dataconnect-generated/  # 자동 생성된 SDK
│   └── package.json
├── dataconnect/          # Firebase Data Connect
│   ├── schema/           # GraphQL 스키마
│   ├── example/          # GraphQL 쿼리/뮤테이션
│   └── dataconnect.yaml
├── firebase-config.js    # Firebase 설정
└── firebase.json         # Firebase 프로젝트 설정
```

## 설치 및 실행

### 1. 사전 요구사항
- Node.js 18 이상
- Firebase CLI
- Firebase 프로젝트 (Data Connect 활성화 필요)

### 2. 프로젝트 클론
```bash
git clone https://github.com/jjangsamnet/exam-system.git
cd exam-system
```

### 3. Firebase 설정
```bash
# Firebase 로그인
firebase login

# Firebase 프로젝트 선택
firebase use --add
```

### 4. 웹 앱 설치 및 실행
```bash
cd web-app
npm install
npm run dev
```

### 5. Data Connect 배포 (선택사항)
```bash
cd dataconnect
firebase dataconnect:sql:migrate
```

## 사용 방법

### 관리자
1. 관리자 계정으로 회원가입 (이메일/비밀번호만 가능)
2. 최초 관리자는 직접 데이터베이스에서 승인 필요
3. 교사 계정 승인 관리

### 교사
1. 교사 계정으로 회원가입 (이메일/비밀번호 또는 Google)
2. 관리자 승인 대기
3. 승인 후 로그인
4. 카테고리 생성 (과목, 단원 등)
5. 문제 출제
6. 시험 생성 및 발행
7. 주관식 답안 채점

### 학생
1. 학생 계정으로 회원가입 (학교명 입력)
2. 즉시 로그인 가능 (승인 불필요)
3. 발행된 시험 확인
4. 시험 응시
5. 결과 확인

## 개발 현황

### 완료된 기능
- [x] Firebase 프로젝트 설정
- [x] Firebase Authentication 연동
- [x] Firebase Data Connect 스키마 정의
- [x] 사용자 역할 기반 접근 제어
- [x] 카테고리 관리 UI
- [x] 문제 등록 UI (4단계 마법사)
- [x] 문제 목록 UI (검색 및 필터링)
- [x] 시험 생성 UI (4단계 마법사)
- [x] 승인 시스템 UI
- [x] 학생 학교명 입력

### 개발 예정
- [ ] 시험 응시 UI
- [ ] 채점 UI
- [ ] 결과 확인 UI
- [ ] 통계 대시보드
- [ ] 관리자 승인 관리 UI
- [ ] 이메일 알림 기능

## 라이선스

이 프로젝트는 학습 및 개발 목적으로 만들어졌습니다.

## 기여

버그 리포트 및 기능 제안은 Issues를 통해 제출해주세요.

## 연락처

GitHub: [jjangsamnet](https://github.com/jjangsamnet)
