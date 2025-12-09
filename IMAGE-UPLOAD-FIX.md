# 이미지 업로드 문제 해결 가이드

## 문제 현상
문항 출제 시 이미지 업로드가 0%에서 멈추는 현상

## 원인 분석
1. **환경 변수 누락**: `.env.local` 파일이 없어 Firebase Storage가 초기화되지 않음
2. **Storage 규칙 미설정**: Firebase Storage 보안 규칙이 설정되지 않아 업로드 권한 없음
3. **에러 핸들링 부족**: 구체적인 오류 메시지가 표시되지 않음

## 해결 방법

### 1. 환경 변수 파일 생성
`web-app/.env.local` 파일이 생성되었습니다:
```env
VITE_FIREBASE_API_KEY=AIzaSyCK5TaR7A53lZ3CSGifR_3nt6DssBCLEc0
VITE_FIREBASE_AUTH_DOMAIN=exam-system-28765.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=exam-system-28765
VITE_FIREBASE_STORAGE_BUCKET=exam-system-28765.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=503127502491
VITE_FIREBASE_APP_ID=1:503127502491:web:7de0f65f463f6b5dde203e
VITE_FIREBASE_MEASUREMENT_ID=G-LTYG0GX4E0
```

### 2. Firebase Storage 보안 규칙 설정
`storage.rules` 파일이 생성되었습니다. 다음 명령으로 배포하세요:

```bash
# Firebase Storage 규칙 배포
firebase deploy --only storage
```

**규칙 내용**:
- 인증된 사용자만 이미지 읽기 가능
- 인증된 사용자가 이미지 업로드 가능
- 파일 크기 5MB 제한
- 이미지 파일만 허용

### 3. 코드 개선 사항
`QuestionContentStep.jsx` 파일이 개선되었습니다:
- ✅ 상세한 로그 추가 (디버깅 용이)
- ✅ Storage 초기화 확인
- ✅ 구체적인 에러 메시지 표시
- ✅ 권한, 취소, 네트워크 오류 구분
- ✅ 업로드 진행률 정확한 표시

### 4. Firebase 설정 업데이트
`firebase.json`에 storage 설정이 추가되었습니다:
```json
{
  "storage": {
    "rules": "storage.rules"
  },
  "emulators": {
    "storage": {
      "port": 9199
    }
  }
}
```

## 배포 절차

### 로컬 테스트
```bash
# 1. 의존성 설치 (아직 안 했다면)
cd web-app
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저에서 테스트
# http://localhost:5173 접속
# 로그인 후 문제 출제 > 이미지 업로드 시도
# 브라우저 콘솔에서 로그 확인
```

### Firebase Storage 규칙 배포
```bash
# 프로젝트 루트 디렉토리에서
firebase deploy --only storage
```

### 전체 배포
```bash
# 1. 빌드
cd web-app
npm run build

# 2. Firebase 배포
cd ..
firebase deploy
```

## 테스트 방법

### 1. 브라우저 콘솔 확인
브라우저 개발자 도구(F12) > Console 탭에서 다음 로그 확인:
- ✅ "파일 업로드 시작: ..."
- ✅ "Firebase Storage 초기화 확인 완료"
- ✅ "업로드 경로: question-images/..."
- ✅ "Storage Reference 생성 완료"
- ✅ "Upload Task 생성 완료"
- ✅ "업로드 진행률: X%"
- ✅ "이미지 업로드 완료: https://..."

### 2. 오류 발생 시 확인사항

#### "Firebase Storage가 초기화되지 않았습니다"
→ `.env.local` 파일 확인 및 개발 서버 재시작

#### "storage/unauthorized" 오류
→ Firebase Storage 규칙 배포:
```bash
firebase deploy --only storage
```

→ Firebase Console에서 확인:
https://console.firebase.google.com/project/exam-system-28765/storage/rules

#### "storage/unknown" 오류
→ 네트워크 연결 확인
→ Firebase 프로젝트 상태 확인
→ Storage 버킷 확인: exam-system-28765.firebasestorage.app

### 3. Firebase Console에서 직접 확인
1. https://console.firebase.google.com/project/exam-system-28765/storage 접속
2. `question-images/` 폴더에 이미지가 업로드되었는지 확인
3. 이미지 클릭 → URL 복사하여 브라우저에서 접근 가능한지 확인

## 추가 디버깅 팁

### Storage 초기화 확인
브라우저 콘솔에서 실행:
```javascript
import { storage } from './firebase-config'
console.log('Storage:', storage)
console.log('Storage bucket:', storage.app.options.storageBucket)
```

### 수동으로 이미지 업로드 테스트
```javascript
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase-config'

const testUpload = async () => {
  const testFile = new File(['test'], 'test.txt', { type: 'text/plain' })
  const storageRef = ref(storage, 'test/test.txt')
  
  try {
    await uploadBytes(storageRef, testFile)
    const url = await getDownloadURL(storageRef)
    console.log('테스트 업로드 성공:', url)
  } catch (error) {
    console.error('테스트 업로드 실패:', error)
  }
}

testUpload()
```

## 관련 파일
- ✅ `web-app/.env.local` - 환경 변수 (새로 생성됨)
- ✅ `storage.rules` - Storage 보안 규칙 (새로 생성됨)
- ✅ `firebase.json` - Firebase 설정 (수정됨)
- ✅ `web-app/src/components/steps/QuestionContentStep.jsx` - 업로드 로직 (개선됨)

## 커밋 및 배포

```bash
# 변경사항 커밋
git add .
git commit -m "Fix image upload issue: add env file, storage rules, and better error handling"

# Firebase Storage 규칙 배포
firebase deploy --only storage

# (선택) 전체 재배포
firebase deploy
```

## 결론
위 단계를 모두 완료하면 이미지 업로드가 정상적으로 작동해야 합니다.
문제가 계속되면 브라우저 콘솔의 로그를 확인하여 구체적인 오류 원인을 파악하세요.
