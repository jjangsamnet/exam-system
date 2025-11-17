import './QuestionCard.css'

const QuestionCard = ({ question, onEdit, onDelete }) => {
  const getTypeName = (type) => {
    const types = {
      'multiple_choice': '객관식',
      'short_answer': '주관식',
      'essay': '서술형'
    }
    return types[type] || type
  }

  const getDifficultyInfo = (difficulty) => {
    const info = {
      'easy': { label: '쉬움', icon: '⭐', color: '#10b981' },
      'medium': { label: '보통', icon: '⭐⭐', color: '#f59e0b' },
      'hard': { label: '어려움', icon: '⭐⭐⭐', color: '#ef4444' }
    }
    return info[difficulty] || info['medium']
  }

  const difficultyInfo = getDifficultyInfo(question.difficulty)

  return (
    <div className="question-card">
      <div className="card-header">
        <div className="card-badges">
          <span className="category-badge">{question.categoryName}</span>
          <span className={`type-badge ${question.type}`}>
            {getTypeName(question.type)}
          </span>
        </div>
        <div className="card-actions">
          <button
            className="icon-btn edit"
            onClick={() => onEdit(question)}
            title="수정"
          >
            ✏️
          </button>
          <button
            className="icon-btn delete"
            onClick={() => onDelete(question.id)}
            title="삭제"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="card-body">
        <p className="question-text">{question.questionText}</p>

        {question.imageUrl && (
          <div className="question-image">
            <img src={question.imageUrl} alt="문제 이미지" />
          </div>
        )}

        {question.type === 'multiple_choice' && question.choices && (
          <div className="choices-preview">
            {question.choices.map((choice, index) => (
              <div
                key={index}
                className={`choice-preview ${choice.isCorrect ? 'correct' : ''}`}
              >
                <span className="choice-num">{choice.choiceNumber}.</span>
                <span className="choice-text">{choice.choiceText}</span>
                {choice.isCorrect && <span className="correct-mark">✓</span>}
              </div>
            ))}
          </div>
        )}

        {(question.type === 'short_answer' || question.type === 'essay') && (
          <div className="answer-preview">
            <div className="answer-label">정답:</div>
            <div className="answer-text">
              {question.answerText.length > 100
                ? question.answerText.substring(0, 100) + '...'
                : question.answerText}
            </div>
            {question.keywords && (
              <div className="keywords">
                <strong>키워드:</strong> {question.keywords}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="card-footer">
        <div className="footer-info">
          <div className="info-item">
            <span className="info-icon">👤</span>
            <span className="info-text">{question.createdBy}</span>
          </div>
          <div className="info-item">
            <span className="info-icon">📅</span>
            <span className="info-text">{question.createdAt}</span>
          </div>
        </div>
        <div className="footer-stats">
          <div
            className="difficulty-indicator"
            style={{ color: difficultyInfo.color }}
          >
            {difficultyInfo.icon} {difficultyInfo.label}
          </div>
          <div className="points-indicator">
            <strong>{question.points}</strong>점
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
