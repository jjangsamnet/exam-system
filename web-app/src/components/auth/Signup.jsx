import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './Auth.css'

const Signup = ({ onClose, onSwitchToLogin }) => {
  const { signup, loginWithGoogle } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // 유효성 검사
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    if (formData.password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.')
      return
    }

    if (!formData.name.trim()) {
      setError('이름을 입력해주세요.')
      return
    }

    setLoading(true)

    try {
      await signup(formData.email, formData.password, formData.name, formData.role)

      // Show approval message for teacher/admin
      if (formData.role === 'teacher' || formData.role === 'admin') {
        alert(`회원가입이 완료되었습니다!\n\n${formData.role === 'admin' ? '관리자' : '교사'} 계정은 관리자의 승인 후 사용하실 수 있습니다.\n승인 완료 시 이메일로 안내드리겠습니다.`)
      }

      onClose && onClose()
    } catch (error) {
      console.error('회원가입 실패:', error)

      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('이미 사용 중인 이메일입니다.')
          break
        case 'auth/invalid-email':
          setError('이메일 형식이 올바르지 않습니다.')
          break
        case 'auth/weak-password':
          setError('비밀번호가 너무 약합니다. 6자 이상 입력해주세요.')
          break
        default:
          setError('회원가입에 실패했습니다. 다시 시도해주세요.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setError('')
    setLoading(true)

    try {
      await loginWithGoogle(formData.role)

      // Show approval message for teacher
      if (formData.role === 'teacher') {
        alert(`회원가입이 완료되었습니다!\n\n교사 계정은 관리자의 승인 후 사용하실 수 있습니다.\n승인 완료 시 이메일로 안내드리겠습니다.`)
      }

      onClose && onClose()
    } catch (error) {
      console.error('Google 회원가입 실패:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)

      if (error.code === 'auth/popup-closed-by-user') {
        setError('가입이 취소되었습니다.')
      } else if (error.code === 'auth/unauthorized-domain') {
        setError('승인되지 않은 도메인입니다. Firebase Console에서 localhost를 승인된 도메인에 추가해주세요.')
      } else if (error.code === 'auth/operation-not-allowed') {
        setError('Google 로그인이 활성화되지 않았습니다. Firebase Console에서 Google 인증을 활성화해주세요.')
      } else {
        setError(`Google 회원가입 실패: ${error.message || error.code || '알 수 없는 오류'}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <div className="auth-header">
          <h2>회원가입</h2>
          {onClose && (
            <button className="close-btn" onClick={onClose}>✕</button>
          )}
        </div>

        <div className="auth-content">
          {error && (
            <div className="auth-error">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="홍길동"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="최소 6자 이상"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="비밀번호를 다시 입력하세요"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">사용자 유형</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="student">학생/수험생</option>
                <option value="teacher">교사/강사</option>
                <option value="admin">관리자</option>
              </select>
            </div>

            <button
              type="submit"
              className="auth-btn primary"
              disabled={loading}
            >
              {loading ? '가입 중...' : '회원가입'}
            </button>
          </form>

          {formData.role !== 'admin' && (
            <>
              <div className="divider">
                <span>또는</span>
              </div>

              <button
                className="auth-btn google"
                onClick={handleGoogleSignup}
                disabled={loading}
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="google-icon"
                />
                Google로 가입
              </button>
            </>
          )}

          {formData.role === 'teacher' && (
            <div style={{
              background: '#fef3c7',
              border: '2px solid #fde68a',
              borderRadius: '8px',
              padding: '12px 16px',
              marginTop: '20px',
              color: '#92400e',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              <strong>📋 교사 계정 안내</strong>
              <p style={{margin: '8px 0 0 0'}}>
                회원가입 후 관리자의 승인이 필요합니다.
              </p>
            </div>
          )}

          {formData.role === 'admin' && (
            <div style={{
              background: '#fee2e2',
              border: '2px solid #fecaca',
              borderRadius: '8px',
              padding: '12px 16px',
              marginTop: '20px',
              color: '#991b1b',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              <strong>🔒 관리자 계정 안내</strong>
              <p style={{margin: '8px 0 0 0'}}>
                관리자 계정은 이메일/비밀번호로만 가입 가능하며, 승인이 필요합니다.
              </p>
            </div>
          )}

          <div className="auth-footer">
            <p>
              이미 계정이 있으신가요?{' '}
              <button
                className="link-btn"
                onClick={onSwitchToLogin}
                disabled={loading}
              >
                로그인
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
