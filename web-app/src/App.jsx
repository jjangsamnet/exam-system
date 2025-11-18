import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { auth, db } from './firebase-config'
import QuestionForm from './components/QuestionForm'
import QuestionList from './components/QuestionList'
import ExamBuilder from './components/ExamBuilder'
import CategoryManager from './components/CategoryManager'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import './App.css'

// QueryClient 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

function AppContent() {
  const { currentUser, userProfile, logout } = useAuth()
  const [firebaseStatus, setFirebaseStatus] = useState('연결 확인 중...')
  const [projectId, setProjectId] = useState('')
  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [showQuestionList, setShowQuestionList] = useState(false)
  const [showExamBuilder, setShowExamBuilder] = useState(false)
  const [showCategoryManager, setShowCategoryManager] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [systemInfo, setSystemInfo] = useState({
    schemaVersion: '1.0',
    totalEntities: 10,
    totalQueries: 13,
    totalMutations: 26
  })

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

  const handleLogout = async () => {
    try {
      await logout()
      alert('로그아웃되었습니다.')
    } catch (error) {
      console.error('로그아웃 오류:', error)
    }
  }

  const getRoleName = (role) => {
    const roleNames = {
      'teacher': '교사',
      'student': '학생',
      'admin': '관리자'
    }
    return roleNames[role] || role
  }

  return (
    <div className="App">
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.title}>📝 문항 출제 관리 시스템</h1>
            <p style={styles.subtitle}>Firebase Data Connect 기반 온라인 시험 플랫폼</p>
          </div>
          <div style={styles.authSection}>
            {currentUser ? (
              <div style={styles.userInfo}>
                <div style={styles.userDetails}>
                  <span style={styles.userName}>{userProfile?.name || '사용자'}</span>
                  <span style={styles.userRole}>({getRoleName(userProfile?.role)})</span>
                </div>
                <button style={styles.logoutBtn} onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            ) : (
              <div style={styles.authButtons}>
                <button style={styles.loginBtn} onClick={() => setShowLogin(true)}>
                  로그인
                </button>
                <button style={styles.signupBtn} onClick={() => setShowSignup(true)}>
                  회원가입
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main style={styles.main}>
        {/* Firebase 연동 상태 */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>🔗 시스템 연동 상태</h2>
          <div style={styles.statusBox}>
            <div style={styles.statusItem}>
              <span style={styles.label}>Firebase 상태:</span>
              <span style={styles.statusValue}>{firebaseStatus}</span>
            </div>
            <div style={styles.statusItem}>
              <span style={styles.label}>프로젝트 ID:</span>
              <span style={styles.codeValue}>{projectId}</span>
            </div>
            <div style={styles.statusItem}>
              <span style={styles.label}>인증 서비스:</span>
              <span style={{...styles.value, color: auth ? '#10b981' : '#ef4444'}}>
                {auth ? '✅ 활성화' : '❌ 비활성화'}
              </span>
            </div>
            <div style={styles.statusItem}>
              <span style={styles.label}>데이터베이스:</span>
              <span style={{...styles.value, color: db ? '#10b981' : '#ef4444'}}>
                {db ? '✅ 연결됨' : '❌ 연결 안 됨'}
              </span>
            </div>
          </div>
        </section>

        {/* 시스템 기능 */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>⚙️ 시스템 기능</h2>
          <div style={styles.featureGrid}>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>📚</div>
              <h3 style={styles.featureTitle}>문제 은행 관리</h3>
              <p style={styles.featureDesc}>객관식/주관식/서술형 문제 등록 및 관리</p>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>📋</div>
              <h3 style={styles.featureTitle}>시험 출제</h3>
              <p style={styles.featureDesc}>문제 선택하여 시험지 자동 구성</p>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>✍️</div>
              <h3 style={styles.featureTitle}>온라인 응시</h3>
              <p style={styles.featureDesc}>학생 온라인 시험 응시 및 답안 제출</p>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>📊</div>
              <h3 style={styles.featureTitle}>성적 관리</h3>
              <p style={styles.featureDesc}>자동 채점 및 성적 통계 분석</p>
            </div>
          </div>
        </section>

        {/* 데이터베이스 정보 */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>🗄️ 데이터베이스 구조</h2>
          <div style={styles.dbInfo}>
            <div style={styles.dbItem}>
              <span style={styles.dbLabel}>총 테이블:</span>
              <span style={styles.dbValue}>{systemInfo.totalEntities}개</span>
            </div>
            <div style={styles.dbItem}>
              <span style={styles.dbLabel}>GraphQL 쿼리:</span>
              <span style={styles.dbValue}>{systemInfo.totalQueries}개</span>
            </div>
            <div style={styles.dbItem}>
              <span style={styles.dbLabel}>GraphQL 뮤테이션:</span>
              <span style={styles.dbValue}>{systemInfo.totalMutations}개</span>
            </div>
            <div style={styles.dbItem}>
              <span style={styles.dbLabel}>스키마 버전:</span>
              <span style={styles.dbValue}>v{systemInfo.schemaVersion}</span>
            </div>
          </div>

          <div style={styles.tableList}>
            <h3 style={styles.tableListTitle}>주요 데이터 테이블:</h3>
            <ul style={styles.list}>
              <li>👤 User - 사용자 (교사/학생/관리자)</li>
              <li>📁 Category - 문제 카테고리 (과목/단원)</li>
              <li>❓ Question - 문제</li>
              <li>🔤 Choice - 객관식 선택지</li>
              <li>✅ Answer - 주관식 정답</li>
              <li>📄 Exam - 시험</li>
              <li>🔗 ExamQuestion - 시험-문제 연결</li>
              <li>📝 ExamAttempt - 시험 응시 기록</li>
              <li>✏️ StudentAnswer - 학생 답안</li>
              <li>📈 QuestionStatistics - 문제 통계</li>
            </ul>
          </div>
        </section>

        {/* 사용자 역할 */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>👥 사용자 역할</h2>
          <div style={styles.roleGrid}>
            <div style={styles.role}>
              <div style={styles.roleIcon}>👨‍🏫</div>
              <h3>교사/강사</h3>
              <p>문제 출제, 시험 생성, 채점 관리</p>
            </div>
            <div style={styles.role}>
              <div style={styles.roleIcon}>👨‍🎓</div>
              <h3>학생/수험생</h3>
              <p>시험 응시, 성적 확인</p>
            </div>
            <div style={styles.role}>
              <div style={styles.roleIcon}>👨‍💼</div>
              <h3>관리자</h3>
              <p>전체 시스템 관리 및 통계</p>
            </div>
          </div>
        </section>

        <footer style={styles.footer}>
          <p style={styles.footerText}>
            ✨ Firebase Data Connect + PostgreSQL + GraphQL
          </p>
          <p style={styles.footerText}>
            🚀 프로덕션 준비 완료 - UI 개발 진행 중
          </p>
          <div style={styles.demoButtons}>
            <button
              style={{...styles.demoButton, background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'}}
              onClick={() => setShowCategoryManager(true)}
            >
              📚 카테고리 관리
            </button>
            <button
              style={styles.demoButton}
              onClick={() => setShowQuestionForm(true)}
            >
              📝 문항 등록 UI
            </button>
            <button
              style={{...styles.demoButton, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}
              onClick={() => setShowQuestionList(true)}
            >
              📚 문제 목록 UI
            </button>
            <button
              style={{...styles.demoButton, background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'}}
              onClick={() => setShowExamBuilder(true)}
            >
              📋 시험 만들기 UI
            </button>
          </div>
        </footer>
      </main>

      {/* Question Form Modal */}
      {showQuestionForm && (
        <QuestionForm onClose={() => setShowQuestionForm(false)} />
      )}

      {/* Question List Modal */}
      {showQuestionList && (
        <QuestionList
          onClose={() => setShowQuestionList(false)}
          onEdit={(question) => {
            console.log('Edit question:', question)
            setShowQuestionList(false)
            setShowQuestionForm(true)
          }}
        />
      )}

      {/* Exam Builder Modal */}
      {showExamBuilder && (
        <ExamBuilder onClose={() => setShowExamBuilder(false)} />
      )}

      {/* Category Manager Modal */}
      {showCategoryManager && (
        <div style={styles.modal}>
          <CategoryManager />
          <button
            style={styles.closeModalBtn}
            onClick={() => setShowCategoryManager(false)}
          >
            ✕ 닫기
          </button>
        </div>
      )}

      {/* Auth Modals */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false)
            setShowSignup(true)
          }}
        />
      )}

      {showSignup && (
        <Signup
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false)
            setShowLogin(true)
          }}
        />
      )}
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  )
}

const styles = {
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '2rem',
    borderRadius: '0 0 20px 20px',
    marginBottom: '2rem'
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '2rem'
  },
  title: {
    fontSize: '2.5rem',
    margin: '0 0 0.5rem 0'
  },
  subtitle: {
    fontSize: '1.1rem',
    opacity: 0.9,
    margin: 0
  },
  authSection: {
    display: 'flex',
    alignItems: 'center'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px'
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  userName: {
    fontSize: '1.1rem',
    fontWeight: 600
  },
  userRole: {
    fontSize: '0.9rem',
    opacity: 0.8
  },
  logoutBtn: {
    padding: '8px 16px',
    background: 'rgba(255, 255, 255, 0.2)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  authButtons: {
    display: 'flex',
    gap: '12px'
  },
  loginBtn: {
    padding: '10px 20px',
    background: 'rgba(255, 255, 255, 0.2)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  signupBtn: {
    padding: '10px 20px',
    background: 'white',
    border: '2px solid white',
    borderRadius: '8px',
    color: '#667eea',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem 2rem 1rem'
  },
  card: {
    background: 'white',
    borderRadius: '15px',
    padding: '2rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  cardTitle: {
    color: '#333',
    marginTop: 0,
    marginBottom: '1.5rem',
    fontSize: '1.5rem'
  },
  statusBox: {
    background: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '10px'
  },
  statusItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.75rem 0',
    borderBottom: '1px solid #e0e0e0'
  },
  label: {
    fontWeight: 600,
    color: '#555'
  },
  statusValue: {
    color: '#10b981',
    fontWeight: 600
  },
  value: {
    fontWeight: 600
  },
  codeValue: {
    fontFamily: 'monospace',
    background: '#e0e7ff',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.9rem'
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem'
  },
  feature: {
    textAlign: 'center',
    padding: '1.5rem',
    background: '#f8f9fa',
    borderRadius: '10px'
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  featureTitle: {
    color: '#333',
    fontSize: '1.2rem',
    margin: '0 0 0.5rem 0'
  },
  featureDesc: {
    color: '#666',
    fontSize: '0.95rem',
    margin: 0
  },
  dbInfo: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  dbItem: {
    background: '#f0f4ff',
    padding: '1rem',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column'
  },
  dbLabel: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '0.5rem'
  },
  dbValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#667eea'
  },
  tableList: {
    background: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '10px'
  },
  tableListTitle: {
    color: '#333',
    marginTop: 0,
    marginBottom: '1rem',
    fontSize: '1.1rem'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    color: '#1f2937',
    fontSize: '15px',
    lineHeight: '2'
  },
  roleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem'
  },
  role: {
    textAlign: 'center',
    padding: '1.5rem',
    background: '#f8f9fa',
    borderRadius: '10px',
    color: '#1f2937'
  },
  roleIcon: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  footer: {
    textAlign: 'center',
    marginTop: '3rem',
    padding: '2rem',
    background: '#f8f9fa',
    borderRadius: '15px'
  },
  footerText: {
    color: '#666',
    margin: '0.5rem 0'
  },
  demoButtons: {
    marginTop: '1.5rem',
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  demoButton: {
    padding: '15px 30px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 1000,
    padding: '20px',
    overflowY: 'auto'
  },
  closeModalBtn: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '12px 24px',
    background: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
    transition: 'all 0.2s',
    zIndex: 1001
  }
}

export default App
