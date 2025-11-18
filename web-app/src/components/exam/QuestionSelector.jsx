import { useState } from 'react'
import QuestionCard from '../QuestionCard'
import SearchBar from '../SearchBar'
import FilterPanel from '../FilterPanel'
import './QuestionSelector.css'

const QuestionSelector = ({ selectedQuestions, onAddQuestion }) => {
  // 샘플 문제 데이터 (실제로는 Firebase에서 가져와야 함)
  const sampleQuestions = [
    {
      id: 'q1',
      type: 'multiple_choice',
      category: { id: 'c1', name: '수학' },
      questionText: '다음 중 소수(prime number)가 아닌 것은?',
      difficulty: 'easy',
      points: 10,
      choices: [
        { id: 'ch1', choiceText: '2', isCorrect: false },
        { id: 'ch2', choiceText: '3', isCorrect: false },
        { id: 'ch3', choiceText: '4', isCorrect: true },
        { id: 'ch4', choiceText: '5', isCorrect: false }
      ],
      createdAt: new Date('2024-01-15'),
      createdBy: { name: '김선생' }
    },
    {
      id: 'q2',
      type: 'multiple_choice',
      category: { id: 'c2', name: '과학' },
      questionText: '광합성이 일어나는 세포 소기관은?',
      difficulty: 'medium',
      points: 15,
      choices: [
        { id: 'ch5', choiceText: '미토콘드리아', isCorrect: false },
        { id: 'ch6', choiceText: '엽록체', isCorrect: true },
        { id: 'ch7', choiceText: '골지체', isCorrect: false },
        { id: 'ch8', choiceText: '리보솜', isCorrect: false }
      ],
      createdAt: new Date('2024-01-14'),
      createdBy: { name: '박선생' }
    },
    {
      id: 'q3',
      type: 'short_answer',
      category: { id: 'c3', name: '영어' },
      questionText: '다음 문장의 빈칸에 알맞은 단어를 쓰시오: "I _____ to school every day."',
      difficulty: 'easy',
      points: 10,
      answers: [
        { answerText: 'go', isMain: true }
      ],
      createdAt: new Date('2024-01-13'),
      createdBy: { name: '이선생' }
    },
    {
      id: 'q4',
      type: 'essay',
      category: { id: 'c1', name: '수학' },
      questionText: '피타고라스의 정리를 증명하시오.',
      difficulty: 'hard',
      points: 25,
      answers: [
        {
          answerText: '직각삼각형에서 빗변의 제곱은 나머지 두 변의 제곱의 합과 같다는 정리',
          isMain: true,
          keywords: ['직각삼각형', '빗변', '제곱']
        }
      ],
      createdAt: new Date('2024-01-12'),
      createdBy: { name: '김선생' }
    },
    {
      id: 'q5',
      type: 'multiple_choice',
      category: { id: 'c4', name: '역사' },
      questionText: '조선시대 한글을 창제한 왕은?',
      difficulty: 'easy',
      points: 10,
      choices: [
        { id: 'ch9', choiceText: '태조', isCorrect: false },
        { id: 'ch10', choiceText: '세종', isCorrect: true },
        { id: 'ch11', choiceText: '성종', isCorrect: false },
        { id: 'ch12', choiceText: '정조', isCorrect: false }
      ],
      createdAt: new Date('2024-01-11'),
      createdBy: { name: '최선생' }
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

  const handleSearch = (term) => {
    setSearchTerm(term)
    applyFilters(term, filters)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    applyFilters(searchTerm, newFilters)
  }

  const applyFilters = (search, filterValues) => {
    let filtered = questions

    // 검색어 필터
    if (search) {
      filtered = filtered.filter(q =>
        q.questionText.toLowerCase().includes(search.toLowerCase()) ||
        q.category.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    // 카테고리 필터
    if (filterValues.category !== 'all') {
      filtered = filtered.filter(q => q.category.id === filterValues.category)
    }

    // 난이도 필터
    if (filterValues.difficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === filterValues.difficulty)
    }

    // 문제 유형 필터
    if (filterValues.type !== 'all') {
      filtered = filtered.filter(q => q.type === filterValues.type)
    }

    setFilteredQuestions(filtered)
  }

  const isQuestionSelected = (questionId) => {
    return selectedQuestions.some(q => q.questionId === questionId)
  }

  return (
    <div className="question-selector">
      <div className="selector-header">
        <div className="step-description">
          <h3>📚 문제 선택</h3>
          <p>시험에 출제할 문제를 선택해주세요.</p>
        </div>

        <div className="selected-count">
          <span className="count-badge">{selectedQuestions.length}개 선택됨</span>
        </div>
      </div>

      <div className="selector-tools">
        <SearchBar
          searchTerm={searchTerm}
          onSearch={handleSearch}
        />
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="questions-grid">
        {filteredQuestions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p>조건에 맞는 문제가 없습니다.</p>
          </div>
        ) : (
          filteredQuestions.map(question => (
            <div key={question.id} className="question-wrapper">
              <QuestionCard question={question} />
              <button
                className={`select-btn ${isQuestionSelected(question.id) ? 'selected' : ''}`}
                onClick={() => onAddQuestion(question)}
                disabled={isQuestionSelected(question.id)}
              >
                {isQuestionSelected(question.id) ? '✓ 선택됨' : '+ 선택'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default QuestionSelector
