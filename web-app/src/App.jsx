import { useState, useEffect } from 'react'
import { auth, db } from './firebase-config'
import './App.css'

function App() {
  const [firebaseStatus, setFirebaseStatus] = useState('연결 확인 중...')
  const [projectId, setProjectId] = useState('')

  useEffect(() => {
    // Firebase 연결 확인
    try {
      const firebaseProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID
      setProjectId(firebaseProjectId)

      // Firebase Auth와 Firestore가 정상적으로 초기화되었는지 확인
      if (auth && db) {
        setFirebaseStatus('✅ Firebase 연결 성공!')
      } else {
        setFirebaseStatus('❌ Firebase 연결 실패')
      }
    } catch (error) {
      console.error('Firebase 초기화 오류:', error)
      setFirebaseStatus('❌ Firebase 연결 오류: ' + error.message)
    }
  }, [])

  return (
    <div className="App">
      <h1>영화 리뷰 시스템</h1>
      <div className="card">
        <h2>Firebase 연동 상태</h2>
        <p><strong>상태:</strong> {firebaseStatus}</p>
        <p><strong>프로젝트 ID:</strong> {projectId}</p>
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
          <p><strong>초기화된 서비스:</strong></p>
          <ul style={{ textAlign: 'left', display: 'inline-block' }}>
            <li>Firebase Authentication {auth ? '✅' : '❌'}</li>
            <li>Firebase Firestore {db ? '✅' : '❌'}</li>
          </ul>
        </div>
      </div>
      <p className="info">
        Firebase 연동이 완료되었습니다. 이제 영화 리뷰 기능을 개발할 준비가 되었습니다.
      </p>
    </div>
  )
}

export default App
