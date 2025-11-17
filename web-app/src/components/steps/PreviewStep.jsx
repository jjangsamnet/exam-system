import './Steps.css'

const PreviewStep = ({ formData }) => {
  const getCategoryName = (id) => {
    const categories = {
      'cat-math': '수학',
      'cat-science': '과학',
      'cat-english': '영어',
      'cat-korean': '국어'
    }
    return categories[id] || '미선택'
  }

  const getDifficultyName = (difficulty) => {
    const difficulties = {
      'easy': '쉬움 ⭐',
      'medium': '보통 ⭐⭐',
      'hard': '어려움 ⭐⭐⭐'
    }
    return difficulties[difficulty] || difficulty
  }

  const getTypeName = (type) => {
    const types = {
      'multiple_choice': '객관식',
      'short_answer': '주관식',
      'essay': '서술형'
    }
    return types[type] || type
  }

  return (
    <div className="step-content">
      <h3 className="step-title">미리보기 및 확인</h3>
      <p className="step-description">입력한 내용을 확인하고 등록하세요.</p>

      <div className="preview-container">
        {/* 문제 정보 */}
        <div className="preview-section">
          <h4 className="preview-section-title">문제 정보</h4>
          <div className="preview-info-grid">
            <div className="preview-info-item">
              <span className="preview-label">유형:</span>
              <span className="preview-value">{getTypeName(formData.type)}</span>
            </div>
            <div className="preview-info-item">
              <span className="preview-label">과목:</span>
              <span className="preview-value">{getCategoryName(formData.categoryId)}</span>
            </div>
            <div className="preview-info-item">
              <span className="preview-label">난이도:</span>
              <span className="preview-value">{getDifficultyName(formData.difficulty)}</span>
            </div>
            <div className="preview-info-item">
              <span className="preview-label">배점:</span>
              <span className="preview-value">{formData.points}점</span>
            </div>
          </div>
        </div>

        {/* 문제 내용 */}
        <div className="preview-section">
          <h4 className="preview-section-title">문제</h4>
          <div className="preview-question">
            <p className="preview-question-text">{formData.questionText}</p>
            {formData.imageUrl && (
              <div className="preview-image">
                <img src={formData.imageUrl} alt="문제 이미지" />
              </div>
            )}
          </div>
        </div>

        {/* 선택지 또는 정답 */}
        {formData.type === 'multiple_choice' ? (
          <div className="preview-section">
            <h4 className="preview-section-title">선택지</h4>
            <div className="preview-choices">
              {formData.choices.map((choice, index) => (
                <div
                  key={index}
                  className={`preview-choice ${choice.isCorrect ? 'correct' : ''}`}
                >
                  <span className="preview-choice-number">{index + 1}.</span>
                  <span className="preview-choice-text">{choice.choiceText}</span>
                  {choice.isCorrect && (
                    <span className="preview-choice-badge">✓ 정답</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="preview-section">
            <h4 className="preview-section-title">모범 답안</h4>
            <div className="preview-answer">
              <p>{formData.answerText}</p>
              {formData.keywords && (
                <div className="preview-keywords">
                  <strong>키워드:</strong> {formData.keywords}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="alert alert-info">
        <div className="alert-icon">ℹ️</div>
        <div className="alert-text">
          <strong>확인해주세요!</strong>
          <p>문제가 등록되면 학생들이 볼 수 있습니다. 내용을 다시 한 번 확인해주세요.</p>
        </div>
      </div>
    </div>
  )
}

export default PreviewStep
