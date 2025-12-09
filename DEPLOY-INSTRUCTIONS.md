# 배포 지침서

## 🚨 중요: 이미지 업로드 기능 활성화를 위한 필수 단계

이미지 업로드가 작동하려면 **Firebase Storage 규칙을 배포해야 합니다**.

---

## 방법 1: Firebase Console에서 직접 설정 (권장)

### 1. Firebase Console 접속
https://console.firebase.google.com/project/exam-system-28765/storage/rules

### 2. 규칙 편집
좌측 메뉴에서 **Storage** → **Rules** 클릭

### 3. 다음 규칙 복사하여 붙여넣기

```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // 인증된 사용자만 읽기 가능
    match /{allPaths=**} {
      allow read: if request.auth != null;
    }
    
    // 문제 이미지 업로드 - 인증된 사용자만 가능
    match /question-images/{imageId} {
      allow write: if request.auth != null 
                   && request.resource.size < 5 * 1024 * 1024  // 5MB 제한
                   && request.resource.contentType.matches('image/.*');
      allow read: if request.auth != null;
    }
    
    // 임시: 개발 중에는 모든 인증된 사용자가 업로드 가능
    match /question-images/{allPaths=**} {
      allow write: if request.auth != null 
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
      allow read: if request.auth != null;
    }
  }
}
```

### 4. "게시" 버튼 클릭

---

## 방법 2: Firebase CLI 사용

### 전제 조건
Firebase CLI가 설치되어 있어야 합니다.

```bash
# Firebase CLI 설치 (아직 안 했다면)
npm install -g firebase-tools

# Firebase 로그인
firebase login

# 프로젝트 선택
firebase use exam-system-28765
```

### Storage 규칙 배포
```bash
cd /path/to/exam-system
firebase deploy --only storage
```

---

## 배포 후 확인

### 1. 웹 앱에서 테스트
1. https://exam-system-28765.web.app 접속
2. 로그인
3. 교사 계정으로 문제 출제 시작
4. 이미지 업로드 시도
5. 브라우저 개발자 도구(F12) 콘솔에서 로그 확인

### 2. 예상 로그 출력
```
파일 업로드 시작: example.png image/png 123456
Firebase Storage 초기화 확인 완료
업로드 경로: question-images/1234567890_example.png
Storage Reference 생성 완료
Upload Task 생성 완료
업로드 진행률: 10% (12345/123456 bytes)
업로드 진행률: 50% (61728/123456 bytes)
업로드 진행률: 100% (123456/123456 bytes)
업로드 완료, URL 가져오는 중...
이미지 업로드 완료: https://firebasestorage.googleapis.com/...
```

### 3. 오류 발생 시
`storage/unauthorized` 오류가 발생하면:
→ Firebase Storage 규칙이 제대로 배포되지 않았음
→ 위의 방법 1 또는 2를 다시 시도

---

## 전체 프로젝트 배포

### 1. 웹 앱 빌드
```bash
cd web-app
npm install  # 처음 한 번만
npm run build
```

### 2. Firebase 배포
```bash
cd ..
firebase deploy
```

또는 Hosting만 배포:
```bash
firebase deploy --only hosting
```

---

## 로컬 개발 환경 설정

### 1. 환경 변수 파일 생성
`web-app/.env.local` 파일을 생성하고 다음 내용 입력:

```env
VITE_FIREBASE_API_KEY=AIzaSyCK5TaR7A53lZ3CSGifR_3nt6DssBCLEc0
VITE_FIREBASE_AUTH_DOMAIN=exam-system-28765.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=exam-system-28765
VITE_FIREBASE_STORAGE_BUCKET=exam-system-28765.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=503127502491
VITE_FIREBASE_APP_ID=1:503127502491:web:7de0f65f463f6b5dde203e
VITE_FIREBASE_MEASUREMENT_ID=G-LTYG0GX4E0
```

> **보안 주의**: `.env.local` 파일은 절대 Git에 커밋하지 마세요!
> (이미 `.gitignore`에 포함되어 있음)

### 2. 의존성 설치
```bash
cd web-app
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 http://localhost:5173 접속

---

## 문제 해결

### 이미지 업로드가 여전히 작동하지 않는 경우

#### 1. 브라우저 콘솔 확인
F12 → Console 탭에서 오류 메시지 확인

#### 2. Firebase Storage 확인
- https://console.firebase.google.com/project/exam-system-28765/storage
- `question-images/` 폴더 존재 여부 확인
- 규칙이 올바르게 설정되었는지 확인

#### 3. 로그인 상태 확인
- Storage 업로드는 인증된 사용자만 가능
- 로그아웃 후 다시 로그인 시도

#### 4. 캐시 삭제
- 브라우저 캐시 및 쿠키 삭제
- 하드 리프레시 (Ctrl+Shift+R 또는 Cmd+Shift+R)

#### 5. 네트워크 확인
- 인터넷 연결 상태 확인
- 방화벽 설정 확인

---

## 추가 리소스

- **Firebase Console**: https://console.firebase.google.com/project/exam-system-28765
- **Storage Console**: https://console.firebase.google.com/project/exam-system-28765/storage
- **Storage Rules**: https://console.firebase.google.com/project/exam-system-28765/storage/rules
- **배포된 앱**: https://exam-system-28765.web.app
- **GitHub**: https://github.com/jjangsamnet/exam-system

---

## 체크리스트

배포 전 확인사항:

- [ ] Firebase Storage 규칙 배포됨
- [ ] `.env.local` 파일 생성됨 (로컬 개발용)
- [ ] 웹 앱 빌드 성공
- [ ] 로컬에서 이미지 업로드 테스트 완료
- [ ] Firebase Hosting 배포 완료
- [ ] 프로덕션 환경에서 이미지 업로드 테스트 완료

---

**마지막 업데이트**: 2025-12-09
