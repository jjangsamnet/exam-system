import { createContext, useContext, useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../firebase-config'
import { upsertUser, getCurrentUser } from '../dataconnect-generated'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // 사용자 프로필을 Data Connect에 저장/업데이트
  const syncUserProfile = async (user, additionalData = {}) => {
    try {
      const role = additionalData.role || 'student' // 기본값: student
      const userData = {
        email: user.email,
        name: additionalData.name || user.displayName || user.email.split('@')[0],
        role: role,
        schoolName: additionalData.schoolName || null,
        approvalStatus: additionalData.approvalStatus || (role === 'student' ? 'approved' : 'pending')
      }

      await upsertUser(userData)
      setUserProfile(userData)
      console.log('사용자 프로필 동기화 완료:', userData)
    } catch (error) {
      console.error('사용자 프로필 동기화 실패:', error)
    }
  }

  // 이메일/비밀번호 회원가입
  const signup = async (email, password, name, role = 'student', schoolName = null) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await syncUserProfile(result.user, { name, role, schoolName })
      return result
    } catch (error) {
      console.error('회원가입 오류:', error)
      throw error
    }
  }

  // 이메일/비밀번호 로그인
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result
    } catch (error) {
      console.error('로그인 오류:', error)
      throw error
    }
  }

  // Google 로그인
  const loginWithGoogle = async (role = 'student', schoolName = null) => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      // 기존 사용자인지 확인
      try {
        const userProfile = await getCurrentUser()
        if (!userProfile.data.user) {
          // 신규 사용자인 경우에만 프로필 생성
          await syncUserProfile(result.user, { role, schoolName })
        }
        // 기존 사용자는 데이터베이스의 정보를 유지 (덮어쓰지 않음)
      } catch (error) {
        // 오류 발생 시 신규 사용자로 간주하고 프로필 생성
        await syncUserProfile(result.user, { role, schoolName })
      }

      return result
    } catch (error) {
      console.error('Google 로그인 오류:', error)
      throw error
    }
  }

  // 로그아웃
  const logout = async () => {
    try {
      await signOut(auth)
      setUserProfile(null)
    } catch (error) {
      console.error('로그아웃 오류:', error)
      throw error
    }
  }

  // 인증 상태 변경 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)

      if (user) {
        // 로그인된 경우 - 데이터베이스에서 사용자 정보 가져오기
        try {
          const result = await getCurrentUser()
          if (result.data.user) {
            setUserProfile({
              email: result.data.user.email,
              name: result.data.user.name,
              role: result.data.user.role,
              schoolName: result.data.user.schoolName,
              approvalStatus: result.data.user.approvalStatus
            })
          } else {
            // 데이터베이스에 사용자 정보가 없는 경우 (새 사용자)
            setUserProfile({
              email: user.email,
              name: user.displayName || user.email.split('@')[0]
            })
          }
        } catch (error) {
          console.error('사용자 프로필 로드 실패:', error)
          // 오류 발생 시 기본 정보만 설정
          setUserProfile({
            email: user.email,
            name: user.displayName || user.email.split('@')[0]
          })
        }
      } else {
        setUserProfile(null)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    loginWithGoogle,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthContext
