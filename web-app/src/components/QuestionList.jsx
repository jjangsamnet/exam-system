import { useState, useEffect } from 'react'
import { useListQuestions } from '../dataconnect-generated/react'
import QuestionCard from './QuestionCard'
import SearchBar from './SearchBar'
import FilterPanel from './FilterPanel'
import './QuestionList.css'

const QuestionList = ({ onClose, onEdit }) => {
  // Firebase Data Connect에서 문제 목록 가져오기
  const { data: questionsData, isLoading, error } = useListQuestions()

  // 샘플 데이터 (Firebase 데이터가 없을 때 사용)
  const sampleQuestions = [
    {
      id: 'q1',
      type: 'multiple_choice',
      categoryId: 'cat-math',
      categoryName: '수학',
      questionText: '다음 중 원의 넓이를 구하는 공식은?',
      difficulty: 'medium',
      points: 10,
      choices: [
        { choiceNumber: 1, choiceText: 'πr', isCorrect: false },
        { choiceNumber: 2, choiceText: 'πr²', isCorrect: true },
        { choiceNumber: 3, choiceText: '2πr', isCorrect: false },
        { choiceNumber: 4, choiceText: '2πr²', isCorrect: false }
      ],
      createdAt: '2024-01-15',
      createdBy: '김선생님'
    },
    {
      id: 'q2',
      type: 'multiple_choice',
      categoryId: 'cat-science',
      categoryName: '과학',
      questionText: '물의 화학식은?',
      difficulty: 'easy',
      points: 5,
      choices: [
        { choiceNumber: 1, choiceText: 'H₂O', isCorrect: true },
        { choiceNumber: 2, choiceText: 'CO₂', isCorrect: false },
        { choiceNumber: 3, choiceText: 'O₂', isCorrect: false },
        { choiceNumber: 4, choiceText: 'H₂', isCorrect: false }
      ],
      createdAt: '2024-01-14',
      createdBy: '박선생님'
    },
    {
      id: 'q3',
      type: 'short_answer',
      categoryId: 'cat-english',
      categoryName: '영어',
      questionText: '다음 문장을 영어로 번역하시오: "나는 학생입니다."',
      difficulty: 'easy',
      points: 10,
      answerText: 'I am a student.',
      keywords: 'I am, student',
      createdAt: '2024-01-13',
      createdBy: '이선생님'
    },
    {
      id: 'q4',
      type: 'essay',
      categoryId: 'cat-korean',
      categoryName: '국어',
      questionText: '독서의 중요성에 대해 200자 이내로 서술하시오.',
      difficulty: 'medium',
      points: 20,
      answerText: '독서는 지식을 습득하고 사고력을 기르는 중요한 활동입니다...',
      keywords: '지식, 사고력, 중요성',
      createdAt: '2024-01-12',
      createdBy: '최선생님'
    },
    {
      id: 'q5',
      type: 'multiple_choice',
      categoryId: 'cat-math',
      categoryName: '수학',
      questionText: '2 + 2 = ?',
      difficulty: 'easy',
      points: 5,
      choices: [
        { choiceNumber: 1, choiceText: '3', isCorrect: false },
        { choiceNumber: 2, choiceText: '4', isCorrect: true },
        { choiceNumber: 3, choiceText: '5', isCorrect: false },
        { choiceNumber: 4, choiceText: '6', isCorrect: false }
      ],
      createdAt: '2024-01-11',
      createdBy: '김선생님'
    }
  ]

  const [questions, setQuestions] = useState(sampleQuestions)
  const [filteredQuestions, setFilteredQuestions] = useState(sampleQuestions)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    type: 'all'
  })
  const [sortBy, setSortBy] = useState('latest') // 'latest', 'oldest', 'points'
  const [viewMode, setViewMode] = useState('card') // 'card' or 'table'

  // Firebase에서 가져온 데이터로 업데이트
  useEffect(() => {
    if (questionsData?.questions && questionsData.questions.length > 0) {
      // Firebase 데이터를 UI 형식으로 변환
      const formattedQuestions = questionsData.questions.map(q => ({
        id: q.id,
        type: q.type,
        categoryId: q.category.id,
        categoryName: q.category.name,
        questionText: q.questionText,
        imageUrl: q.imageUrl,
        difficulty: q.difficulty,
        points: q.points,
        choices: q.choices || [],
        answerText: q.answers?.[0]?.answerText || '',
        keywords: q.answers?.[0]?.keywords || '',
        createdAt: q.createdAt,
        createdBy: q.createdBy.name
      }))
      setQuestions(formattedQuestions)
      setFilteredQuestions(formattedQuestions)
    }
  }, [questionsData])

  // 검색 및 필터링 적용
  useEffect(() => {
    let filtered = [...questions]

    // 검색어 필터
    if (searchTerm) {
      filtered = filtered.filter(q =>
        q.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // 카테고리 필터
    if (filters.category !== 'all') {
      filtered = filtered.filter(q => q.categoryId === filters.category)
    }

    // 난이도 필터
    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === filters.difficulty)
    }

    // 문제 유형 필터
    if (filters.type !== 'all') {
      filtered = filtered.filter(q => q.type === filters.type)
    }

    // 정렬
    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    } else if (sortBy === 'points') {
      filtered.sort((a, b) => b.points - a.points)
    }

    setFilteredQuestions(filtered)
  }, [searchTerm, filters, sortBy, questions])

  const handleDelete = (questionId) => {
    if (window.confirm('이 문제를 삭제하시겠습니까?')) {
      setQuestions(questions.filter(q => q.id !== questionId))
      alert('문제가 삭제되었습니다.')
    }
  }

  const handleEdit = (question) => {
    onEdit && onEdit(question)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const resetFilters = () => {
    setSearchTerm('')
    setFilters({
      category: 'all',
      difficulty: 'all',
      type: 'all'
    })
  }

  return (
    <div className="question-list-container">
      <div className="question-list">
        {/* 헤더 */}
        <div className="list-header">
          <div className="header-top">
            <h2>📚 문제 은행</h2>
            {onClose && (
              <button className="close-btn" onClick={onClose}>✕</button>
            )}
          </div>
          <p className="header-subtitle">
            총 <strong>{filteredQuestions.length}</strong>개의 문제
            {filteredQuestions.length !== questions.length &&
              ` (전체 ${questions.length}개)`
            }
          </p>
        </div>

        {/* 검색 및 필터 */}
        <div className="list-controls">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={resetFilters}
          />
        </div>

        {/* 정렬 및 보기 옵션 */}
        <div className="list-options">
          <div className="sort-options">
            <label>정렬:</label>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
              <option value="points">배점순</option>
            </select>
          </div>

          <div className="view-options">
            <button
              className={`view-btn ${viewMode === 'card' ? 'active' : ''}`}
              onClick={() => setViewMode('card')}
              title="카드 보기"
            >
              ⊞
            </button>
            <button
              className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="테이블 보기"
            >
              ☰
            </button>
          </div>
        </div>

        {/* 로딩 상태 */}
        {isLoading && (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>문제 목록을 불러오는 중...</p>
          </div>
        )}

        {/* 에러 상태 */}
        {error && (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>데이터를 불러오지 못했습니다</h3>
            <p>{error.message}</p>
            <p className="error-hint">샘플 데이터를 표시합니다.</p>
          </div>
        )}

        {/* 문제 목록 */}
        {!isLoading && (
        <div className={`questions-content ${viewMode}`}>
          {filteredQuestions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>검색 결과가 없습니다</h3>
              <p>다른 검색어나 필터를 시도해보세요.</p>
              <button className="btn btn-secondary" onClick={resetFilters}>
                필터 초기화
              </button>
            </div>
          ) : (
            <div className={viewMode === 'card' ? 'question-grid' : 'question-table-wrapper'}>
              {viewMode === 'card' ? (
                filteredQuestions.map(question => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <table className="question-table">
                  <thead>
                    <tr>
                      <th>과목</th>
                      <th>문제</th>
                      <th>유형</th>
                      <th>난이도</th>
                      <th>배점</th>
                      <th>작성자</th>
                      <th>작성일</th>
                      <th>관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuestions.map(question => (
                      <tr key={question.id}>
                        <td>
                          <span className="category-badge">{question.categoryName}</span>
                        </td>
                        <td className="question-text-cell">
                          {question.questionText.length > 50
                            ? question.questionText.substring(0, 50) + '...'
                            : question.questionText}
                        </td>
                        <td>
                          <span className={`type-badge ${question.type}`}>
                            {question.type === 'multiple_choice' ? '객관식' :
                             question.type === 'short_answer' ? '주관식' : '서술형'}
                          </span>
                        </td>
                        <td>
                          <span className={`difficulty-badge ${question.difficulty}`}>
                            {question.difficulty === 'easy' ? '쉬움' :
                             question.difficulty === 'medium' ? '보통' : '어려움'}
                          </span>
                        </td>
                        <td><strong>{question.points}점</strong></td>
                        <td>{question.createdBy}</td>
                        <td>{question.createdAt}</td>
                        <td>
                          <div className="table-actions">
                            <button
                              className="icon-btn edit"
                              onClick={() => handleEdit(question)}
                              title="수정"
                            >
                              ✏️
                            </button>
                            <button
                              className="icon-btn delete"
                              onClick={() => handleDelete(question.id)}
                              title="삭제"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  )
}

export default QuestionList
