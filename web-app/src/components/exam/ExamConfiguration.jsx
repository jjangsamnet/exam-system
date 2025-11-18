import './ExamConfiguration.css'

const ExamConfiguration = ({ examData, onRemoveQuestion, onMoveQuestion, onUpdatePoints }) => {
  const getTypeLabel = (type) => {
    const labels = {
      'multiple_choice': '객관식',
      'short_answer': '주관식',
      'essay': '서술형'
    }
    return labels[type] || type
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'easy': '#10b981',
      'medium': '#f59e0b',
      'hard': '#ef4444'
    }
    return colors[difficulty] || '#6b7280'
  }

  return (
    <div className="exam-configuration">
      <div className="step-description">
        <h3>⚙️ 시험 구성</h3>
        <p>문제 순서를 조정하고 배점을 설정하세요.</p>
      </div>

      <div className="config-summary">
        <div className="summary-item">
          <span className="summary-label">총 문제 수</span>
          <span className="summary-value">{examData.selectedQuestions.length}개</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">총점</span>
          <span className="summary-value highlight">{examData.totalPoints}점</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">합격 점수</span>
          <span className="summary-value">{examData.passingScore}점</span>
        </div>
      </div>

      {examData.selectedQuestions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <p>선택된 문제가 없습니다.</p>
          <p className="empty-hint">이전 단계에서 문제를 선택해주세요.</p>
        </div>
      ) : (
        <div className="questions-list">
          {examData.selectedQuestions.map((item, index) => {
            const question = item.question
            const currentPoints = item.pointsOverride !== null ? item.pointsOverride : question.points

            return (
              <div key={item.questionId} className="config-question-card">
                <div className="card-left">
                  <div className="question-number">#{item.order}</div>
                  <div className="question-info">
                    <div className="question-badges">
                      <span className="badge badge-type">{getTypeLabel(question.type)}</span>
                      <span
                        className="badge badge-difficulty"
                        style={{ background: getDifficultyColor(question.difficulty) }}
                      >
                        {question.difficulty === 'easy' ? '하' :
                         question.difficulty === 'medium' ? '중' : '상'}
                      </span>
                      <span className="badge badge-category">{question.category.name}</span>
                    </div>
                    <p className="question-text">{question.questionText}</p>
                  </div>
                </div>

                <div className="card-right">
                  <div className="points-control">
                    <label className="points-label">배점</label>
                    <input
                      type="number"
                      className="points-input"
                      min="0"
                      value={currentPoints}
                      onChange={(e) => onUpdatePoints(item.questionId, parseInt(e.target.value) || 0)}
                    />
                    {item.pointsOverride !== null && (
                      <span className="points-original">
                        (원래: {question.points}점)
                      </span>
                    )}
                  </div>

                  <div className="card-actions">
                    <button
                      className="action-btn move-btn"
                      onClick={() => onMoveQuestion(item.questionId, 'up')}
                      disabled={index === 0}
                      title="위로 이동"
                    >
                      ↑
                    </button>
                    <button
                      className="action-btn move-btn"
                      onClick={() => onMoveQuestion(item.questionId, 'down')}
                      disabled={index === examData.selectedQuestions.length - 1}
                      title="아래로 이동"
                    >
                      ↓
                    </button>
                    <button
                      className="action-btn remove-btn"
                      onClick={() => onRemoveQuestion(item.questionId)}
                      title="삭제"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {examData.passingScore > examData.totalPoints && (
        <div className="warning-box">
          ⚠️ 합격 점수({examData.passingScore}점)가 총점({examData.totalPoints}점)보다 큽니다.
          기본 정보 단계로 돌아가서 합격 점수를 조정해주세요.
        </div>
      )}
    </div>
  )
}

export default ExamConfiguration
