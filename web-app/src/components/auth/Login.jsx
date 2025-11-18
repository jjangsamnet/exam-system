import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './Auth.css'

const Login = ({ onClose, onSwitchToSignup }) => {
  const { login, loginWithGoogle } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      onClose && onClose()
    } catch (error) {
      console.error('로그인 실패:', error)

      switch (error.code) {
        case 'auth/user-not-found':
          setError('등록되지 않은 이메일입니다.')
          break
        case 'auth/wrong-password':
          setError('비밀번호가 올바르지 않습니다.')
          break
        case 'auth/invalid-email':
          setError('이메일 형식이 올바르지 않습니다.')
          break
        case 'auth/too-many-requests':
          setError('너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.')
          break
        default:
          setError('로그인에 실패했습니다. 다시 시도해주세요.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError('')
    setLoading(true)

    try {
      await loginWithGoogle()
      onClose && onClose()
    } catch (error) {
      console.error('Google 로그인 실패:', error)
      if (error.code === 'auth/popup-closed-by-user') {
        setError('로그인이 취소되었습니다.')
      } else {
        setError('Google 로그인에 실패했습니다.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <div className="auth-header">
          <h2>로그인</h2>
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
                placeholder="비밀번호를 입력하세요"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="auth-btn primary"
              disabled={loading}
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className="divider">
            <span>또는</span>
          </div>

          <button
            className="auth-btn google"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="google-icon"
            />
            Google로 로그인
          </button>

          <div className="auth-footer">
            <p>
              계정이 없으신가요?{' '}
              <button
                className="link-btn"
                onClick={onSwitchToSignup}
                disabled={loading}
              >
                회원가입
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
