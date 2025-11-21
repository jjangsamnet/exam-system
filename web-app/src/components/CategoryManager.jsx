import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { createCategory, listCategories } from '../dataconnect-generated'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const CategoryManager = () => {
  const { currentUser, userProfile } = useAuth()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showSeedButton, setShowSeedButton] = useState(true)

  // 카테고리 목록 조회
  const { data: categoriesData, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const result = await listCategories()
      return result.data
    },
    enabled: !!currentUser
  })

  // 카테고리 생성 뮤테이션
  const createMutation = useMutation({
    mutationFn: async (categoryData) => {
      return await createCategory(categoryData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      setFormData({ name: '', description: '' })
      setSuccess('카테고리가 성공적으로 생성되었습니다!')
      setError('')
      setTimeout(() => setSuccess(''), 3000)
    },
    onError: (error) => {
      console.error('카테고리 생성 실패:', error)
      setError('카테고리 생성에 실패했습니다.')
      setSuccess('')
    }
  })

  // 초기 카테고리 데이터 생성
  const seedCategories = async () => {
    const initialCategories = [
      { name: '수학', description: '수학 관련 문제 카테고리' },
      { name: '과학', description: '과학 관련 문제 카테고리' },
      { name: '영어', description: '영어 관련 문제 카테고리' },
      { name: '국어', description: '국어 관련 문제 카테고리' },
      { name: '사회', description: '사회 관련 문제 카테고리' },
      { name: '역사', description: '역사 관련 문제 카테고리' },
      { name: '물리', description: '물리학 관련 문제 카테고리' },
      { name: '화학', description: '화학 관련 문제 카테고리' },
      { name: '생물', description: '생물학 관련 문제 카테고리' },
      { name: '지구과학', description: '지구과학 관련 문제 카테고리' },
      { name: '컴퓨팅사고력검사', description: '컴퓨팅 사고력 평가 문제 카테고리' },
      { name: '게임리터러시', description: '게임 리터러시 관련 문제 카테고리' }
    ]

    setError('')
    setSuccess('')

    try {
      for (const category of initialCategories) {
        await createCategory(category)
      }
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      setSuccess(`${initialCategories.length}개의 초기 카테고리가 생성되었습니다!`)
      setShowSeedButton(false)
      setTimeout(() => setSuccess(''), 5000)
    } catch (error) {
      console.error('초기 데이터 생성 실패:', error)
      setError('초기 데이터 생성 중 오류가 발생했습니다.')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      setError('카테고리 이름을 입력해주세요.')
      return
    }

    createMutation.mutate({
      name: formData.name,
      description: formData.description || null
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  // 권한 체크
  if (!currentUser) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.warning}>
            <span style={styles.warningIcon}>🔒</span>
            <p>카테고리 관리는 로그인이 필요합니다.</p>
          </div>
        </div>
      </div>
    )
  }

  if (userProfile?.role !== 'teacher' && userProfile?.role !== 'admin') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.warning}>
            <span style={styles.warningIcon}>⚠️</span>
            <p>카테고리 관리는 교사 또는 관리자만 접근할 수 있습니다.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>📚 카테고리 관리</h2>
          <p style={styles.subtitle}>시험 문제 카테고리를 생성하고 관리합니다.</p>
        </div>

        {/* 초기 데이터 생성 버튼 */}
        {showSeedButton && (!categoriesData?.categories || categoriesData.categories.length === 0) && (
          <div style={styles.seedSection}>
            <p style={styles.seedText}>
              아직 카테고리가 없습니다. 기본 카테고리를 자동으로 생성하시겠습니까?
            </p>
            <button
              style={styles.seedButton}
              onClick={seedCategories}
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? '생성 중...' : '📦 초기 카테고리 생성 (12개)'}
            </button>
          </div>
        )}

        {/* 성공/에러 메시지 */}
        {success && (
          <div style={styles.success}>
            <span style={styles.successIcon}>✅</span>
            {success}
          </div>
        )}

        {error && (
          <div style={styles.error}>
            <span style={styles.errorIcon}>⚠️</span>
            {error}
          </div>
        )}

        {/* 카테고리 생성 폼 */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>카테고리 이름 *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="예: 수학, 과학, 영어"
              style={styles.input}
              disabled={createMutation.isPending}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>설명</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="카테고리에 대한 설명을 입력하세요 (선택사항)"
              style={{ ...styles.input, ...styles.textarea }}
              disabled={createMutation.isPending}
            />
          </div>

          <button
            type="submit"
            style={styles.submitButton}
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? '생성 중...' : '➕ 카테고리 생성'}
          </button>
        </form>

        {/* 카테고리 목록 */}
        <div style={styles.listSection}>
          <h3 style={styles.listTitle}>등록된 카테고리</h3>
          {isLoading ? (
            <div style={styles.loading}>로딩 중...</div>
          ) : categoriesData?.categories && categoriesData.categories.length > 0 ? (
            <div style={styles.categoryList}>
              {categoriesData.categories.map((category) => (
                <div key={category.id} style={styles.categoryItem}>
                  <div style={styles.categoryIcon}>📁</div>
                  <div style={styles.categoryInfo}>
                    <div style={styles.categoryName}>{category.name}</div>
                    {category.description && (
                      <div style={styles.categoryDescription}>{category.description}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.empty}>
              <span style={styles.emptyIcon}>📭</span>
              <p>등록된 카테고리가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '0 20px'
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden'
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '32px',
    textAlign: 'center'
  },
  title: {
    margin: 0,
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '8px'
  },
  subtitle: {
    margin: 0,
    fontSize: '16px',
    opacity: 0.95
  },
  seedSection: {
    background: '#f0f9ff',
    border: '2px solid #bfdbfe',
    borderRadius: '12px',
    padding: '24px',
    margin: '24px 32px',
    textAlign: 'center'
  },
  seedText: {
    color: '#1e40af',
    marginBottom: '16px',
    fontSize: '15px'
  },
  seedButton: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '14px 28px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
  },
  success: {
    background: '#d1fae5',
    border: '2px solid #6ee7b7',
    borderRadius: '8px',
    padding: '12px 16px',
    margin: '24px 32px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#065f46',
    fontSize: '14px',
    fontWeight: '500'
  },
  successIcon: {
    fontSize: '18px'
  },
  error: {
    background: '#fee2e2',
    border: '2px solid #fecaca',
    borderRadius: '8px',
    padding: '12px 16px',
    margin: '24px 32px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#991b1b',
    fontSize: '14px',
    fontWeight: '500'
  },
  errorIcon: {
    fontSize: '18px'
  },
  warning: {
    background: '#fef3c7',
    border: '2px solid #fde68a',
    borderRadius: '12px',
    padding: '24px',
    margin: '32px',
    textAlign: 'center',
    color: '#92400e'
  },
  warningIcon: {
    fontSize: '32px',
    display: 'block',
    marginBottom: '12px'
  },
  form: {
    padding: '32px',
    borderBottom: '1px solid #e5e7eb'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '15px',
    color: '#1f2937',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  },
  textarea: {
    minHeight: '100px',
    resize: 'vertical'
  },
  submitButton: {
    width: '100%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '14px 20px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
  },
  listSection: {
    padding: '32px'
  },
  listTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '20px'
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    color: '#6b7280',
    fontSize: '15px'
  },
  categoryList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '16px'
  },
  categoryItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '16px',
    background: '#f9fafb',
    borderRadius: '12px',
    border: '2px solid #e5e7eb',
    transition: 'all 0.2s',
    cursor: 'default'
  },
  categoryIcon: {
    fontSize: '24px',
    flexShrink: 0
  },
  categoryInfo: {
    flex: 1,
    minWidth: 0
  },
  categoryName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '4px'
  },
  categoryDescription: {
    fontSize: '13px',
    color: '#6b7280',
    lineHeight: '1.4'
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#9ca3af'
  },
  emptyIcon: {
    fontSize: '48px',
    display: 'block',
    marginBottom: '16px'
  }
}

export default CategoryManager
