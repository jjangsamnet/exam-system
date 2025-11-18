import './ExamPreview.css'

const ExamPreview = ({ examData }) => {
  const getTypeLabel = (type) => {
    const labels = {
      'multiple_choice': '객관식',
      'short_answer': '주관식',
      'essay': '서술형'
    }
    return labels[type] || type
  }

  const getDifficultyLabel = (difficulty) => {
    const labels = {
      'easy': '하',
      'medium': '중',
      'hard': '상'
    }
    return labels[difficulty] || difficulty
  }

  const formatDateTime = (datetime) => {
    if (!datetime) return '미설정'
    const date = new Date(datetime)
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="exam-preview">
      <div className="preview-header">
        <h3>👀 시험 미리보기</h3>
        <p>생성될 시험의 최종 내용을 확인하세요.</p>
      </div>

      <div className="preview-content">
        {/* 시험 기본 정보 */}
        <section className="preview-section">
          <h4 className="section-title">📋 기본 정보</h4>
          <div className="info-grid">
            <div className="info-row">
              <span className="info-label">시험 제목:</span>
              <span className="info-value">{examData.title || '(제목 없음)'}</span>
            </div>
            {examData.description && (
              <div className="info-row">
                <span className="info-label">설명:</span>
                <span className="info-value">{examData.description}</span>
              </div>
            )}
            <div className="info-row">
              <span className="info-label">시험 시간:</span>
              <span className="info-value">{examData.duration}분</span>
            </div>
            <div className="info-row">
              <span className="info-label">총점:</span>
              <span className="info-value highlight">{examData.totalPoints}점</span>
            </div>
            <div className="info-row">
              <span className="info-label">합격 점수:</span>
              <span className="info-value">{examData.passingScore}점</span>
            </div>
            <div className="info-row">
              <span className="info-label">시작 시간:</span>
              <span className="info-value">{formatDateTime(examData.startTime)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">종료 시간:</span>
              <span className="info-value">{formatDateTime(examData.endTime)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">공개 상태:</span>
              <span className={`info-value ${examData.isPublished ? 'published' : 'draft'}`}>
                {examData.isPublished ? '✓ 즉시 공개' : '○ 비공개'}
              </span>
            </div>
          </div>
        </section>

        {/* 문제 목록 */}
        <section className="preview-section">
          <h4 className="section-title">❓ 출제 문제 ({examData.selectedQuestions.length}개)</h4>
          {examData.selectedQuestions.length === 0 ? (
            <div className="empty-message">선택된 문제가 없습니다.</div>
          ) : (
            <div className="preview-questions">
              {examData.selectedQuestions.map((item) => {
                const question = item.question
                const points = item.pointsOverride !== null ? item.pointsOverride : question.points

                return (
                  <div key={item.questionId} className="preview-question">
                    <div className="question-header">
                      <div className="question-number-badge">문제 {item.order}</div>
                      <div className="question-meta">
                        <span className="meta-badge">{getTypeLabel(question.type)}</span>
                        <span className="meta-badge">{getDifficultyLabel(question.difficulty)}</span>
                        <span className="meta-badge">{question.category.name}</span>
                        <span className="points-badge">{points}점</span>
                      </div>
                    </div>
                    <div className="question-content">
                      <p className="question-text">{question.questionText}</p>
                      {question.imageUrl && (
                        <div className="question-image">
                          <img src={question.imageUrl} alt="문제 이미지" />
                        </div>
                      )}
                      {question.type === 'multiple_choice' && question.choices && (
                        <div className="choices-list">
                          {question.choices.map((choice, idx) => (
                            <div key={choice.id} className={`choice-item ${choice.isCorrect ? 'correct' : ''}`}>
                              <span className="choice-num">{idx + 1}.</span>
                              <span className="choice-text">{choice.choiceText}</span>
                              {choice.isCorrect && <span className="correct-mark">✓</span>}
                            </div>
                          ))}
                        </div>
                      )}
                      {(question.type === 'short_answer' || question.type === 'essay') && question.answers && (
                        <div className="answer-section">
                          <div className="answer-label">정답:</div>
                          {question.answers.map((answer, idx) => (
                            <div key={idx} className="answer-item">
                              <p className="answer-text">{answer.answerText}</p>
                              {answer.keywords && answer.keywords.length > 0 && (
                                <p className="keywords">
                                  키워드: {answer.keywords.join(', ')}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* 통계 요약 */}
        <section className="preview-section">
          <h4 className="section-title">📊 통계 요약</h4>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-value">{examData.selectedQuestions.length}</div>
              <div className="stat-label">총 문제 수</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💯</div>
              <div className="stat-value">{examData.totalPoints}</div>
              <div className="stat-label">총점</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-value">{examData.passingScore}</div>
              <div className="stat-label">합격 점수</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-value">{examData.duration}</div>
              <div className="stat-label">시험 시간(분)</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ExamPreview
