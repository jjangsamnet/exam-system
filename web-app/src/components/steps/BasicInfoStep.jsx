import './Steps.css'

const BasicInfoStep = ({ formData, updateFormData }) => {
  const categories = [
    { id: 'cat-math', name: '수학' },
    { id: 'cat-science', name: '과학' },
    { id: 'cat-english', name: '영어' },
    { id: 'cat-korean', name: '국어' }
  ]

  return (
    <div className="step-content">
      <h3 className="step-title">기본 정보</h3>
      <p className="step-description">문제의 기본 정보를 입력해주세요.</p>

      <div className="form-group">
        <label className="form-label required">문제 유형</label>
        <div className="radio-group">
          <label className={`radio-card ${formData.type === 'multiple_choice' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="type"
              value="multiple_choice"
              checked={formData.type === 'multiple_choice'}
              onChange={(e) => updateFormData('type', e.target.value)}
            />
            <div className="radio-content">
              <div className="radio-icon">☑️</div>
              <div className="radio-text">
                <div className="radio-title">객관식</div>
                <div className="radio-desc">4-5지선다형 문제</div>
              </div>
            </div>
          </label>

          <label className={`radio-card ${formData.type === 'short_answer' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="type"
              value="short_answer"
              checked={formData.type === 'short_answer'}
              onChange={(e) => updateFormData('type', e.target.value)}
            />
            <div className="radio-content">
              <div className="radio-icon">✏️</div>
              <div className="radio-text">
                <div className="radio-title">주관식</div>
                <div className="radio-desc">단답형 문제</div>
              </div>
            </div>
          </label>

          <label className={`radio-card ${formData.type === 'essay' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="type"
              value="essay"
              checked={formData.type === 'essay'}
              onChange={(e) => updateFormData('type', e.target.value)}
            />
            <div className="radio-content">
              <div className="radio-icon">📝</div>
              <div className="radio-text">
                <div className="radio-title">서술형</div>
                <div className="radio-desc">논술형 문제</div>
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label required">과목</label>
          <select
            className="form-select"
            value={formData.categoryId}
            onChange={(e) => updateFormData('categoryId', e.target.value)}
          >
            <option value="">과목을 선택하세요</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label required">난이도</label>
          <select
            className="form-select"
            value={formData.difficulty}
            onChange={(e) => updateFormData('difficulty', e.target.value)}
          >
            <option value="easy">쉬움 ⭐</option>
            <option value="medium">보통 ⭐⭐</option>
            <option value="hard">어려움 ⭐⭐⭐</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label required">배점</label>
          <div className="input-group">
            <input
              type="number"
              className="form-input"
              min="1"
              max="100"
              value={formData.points}
              onChange={(e) => updateFormData('points', parseInt(e.target.value) || 0)}
            />
            <span className="input-suffix">점</span>
          </div>
        </div>
      </div>

      <div className="info-box">
        <div className="info-icon">💡</div>
        <div className="info-text">
          <strong>문제 유형 선택 가이드</strong>
          <ul>
            <li><strong>객관식:</strong> 정답이 명확한 문제 (자동 채점)</li>
            <li><strong>주관식:</strong> 짧은 답변 (키워드 기반 자동/수동 채점)</li>
            <li><strong>서술형:</strong> 긴 답변 필요 (수동 채점)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BasicInfoStep
