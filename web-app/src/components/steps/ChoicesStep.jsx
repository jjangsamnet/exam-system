import './Steps.css'

const ChoicesStep = ({ formData, updateFormData }) => {
  const updateChoice = (index, field, value) => {
    const newChoices = [...formData.choices]
    newChoices[index] = { ...newChoices[index], [field]: value }
    updateFormData('choices', newChoices)
  }

  const addChoice = () => {
    if (formData.choices.length < 5) {
      const newChoices = [...formData.choices, {
        choiceNumber: formData.choices.length + 1,
        choiceText: '',
        isCorrect: false
      }]
      updateFormData('choices', newChoices)
    }
  }

  const removeChoice = (index) => {
    if (formData.choices.length > 2) {
      const newChoices = formData.choices.filter((_, i) => i !== index)
        .map((choice, i) => ({ ...choice, choiceNumber: i + 1 }))
      updateFormData('choices', newChoices)
    }
  }

  if (formData.type === 'multiple_choice') {
    return (
      <div className="step-content">
        <h3 className="step-title">선택지 입력</h3>
        <p className="step-description">객관식 문제의 선택지를 입력하고 정답을 선택해주세요.</p>

        <div className="choices-list">
          {formData.choices.map((choice, index) => (
            <div key={index} className="choice-item">
              <div className="choice-number">{index + 1}</div>
              <input
                type="text"
                className="choice-input"
                placeholder={`${index + 1}번 선택지를 입력하세요`}
                value={choice.choiceText}
                onChange={(e) => updateChoice(index, 'choiceText', e.target.value)}
              />
              <label className="choice-correct">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={choice.isCorrect}
                  onChange={() => {
                    const newChoices = formData.choices.map((c, i) => ({
                      ...c,
                      isCorrect: i === index
                    }))
                    updateFormData('choices', newChoices)
                  }}
                />
                <span className="correct-label">정답</span>
              </label>
              {formData.choices.length > 2 && (
                <button
                  className="remove-choice-btn"
                  onClick={() => removeChoice(index)}
                  title="선택지 삭제"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {formData.choices.length < 5 && (
          <button className="add-choice-btn" onClick={addChoice}>
            + 선택지 추가
          </button>
        )}

        <div className="info-box">
          <div className="info-icon">💡</div>
          <div className="info-text">
            <strong>선택지 작성 가이드</strong>
            <ul>
              <li>최소 2개, 최대 5개의 선택지 입력 가능</li>
              <li>정답은 반드시 1개를 선택해야 합니다</li>
              <li>오답도 그럴듯하게 작성하세요</li>
              <li>선택지는 간결하고 명확하게 작성</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  // 주관식 또는 서술형
  return (
    <div className="step-content">
      <h3 className="step-title">
        {formData.type === 'short_answer' ? '정답 입력' : '채점 기준 입력'}
      </h3>
      <p className="step-description">
        {formData.type === 'short_answer'
          ? '주관식 문제의 모범 답안을 입력해주세요.'
          : '서술형 문제의 채점 기준과 키워드를 입력해주세요.'}
      </p>

      <div className="form-group">
        <label className="form-label required">모범 답안</label>
        <textarea
          className="form-textarea"
          rows="4"
          placeholder={
            formData.type === 'short_answer'
              ? '예) I am a student.'
              : '예) 독서는 지식을 습득하고 사고력을 기르는 중요한 활동입니다...'
          }
          value={formData.answerText}
          onChange={(e) => updateFormData('answerText', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">채점 키워드 (선택)</label>
        <input
          type="text"
          className="form-input"
          placeholder='예) 지식, 사고력, 중요성 (쉼표로 구분)'
          value={formData.keywords}
          onChange={(e) => updateFormData('keywords', e.target.value)}
        />
        <div className="form-help">
          자동 채점에 활용될 키워드를 입력하세요. (쉼표로 구분)
        </div>
      </div>

      <div className="info-box">
        <div className="info-icon">💡</div>
        <div className="info-text">
          <strong>
            {formData.type === 'short_answer' ? '주관식 채점 안내' : '서술형 채점 안내'}
          </strong>
          <ul>
            {formData.type === 'short_answer' ? (
              <>
                <li>키워드가 포함되면 자동으로 부분 점수 부여</li>
                <li>완전히 일치하면 만점 처리</li>
                <li>최종 점수는 교사가 수동으로 조정 가능</li>
              </>
            ) : (
              <>
                <li>서술형은 교사가 직접 채점합니다</li>
                <li>키워드는 채점 시 참고 자료로 활용</li>
                <li>모범 답안은 학생에게 공개할 수 있습니다</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ChoicesStep
