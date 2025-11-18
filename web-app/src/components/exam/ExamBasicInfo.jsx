import './ExamBasicInfo.css'

const ExamBasicInfo = ({ examData, updateExamData }) => {
  return (
    <div className="exam-basic-info">
      <div className="step-description">
        <h3>📋 시험 기본 정보</h3>
        <p>시험의 기본적인 정보를 입력해주세요.</p>
      </div>

      <div className="form-section">
        <div className="form-group">
          <label className="form-label">
            <span className="label-text">시험 제목</span>
            <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="예: 2024년 1학기 중간고사"
            value={examData.title}
            onChange={(e) => updateExamData('title', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <span className="label-text">시험 설명</span>
          </label>
          <textarea
            className="form-textarea"
            placeholder="시험에 대한 간단한 설명을 입력하세요 (선택사항)"
            rows={4}
            value={examData.description}
            onChange={(e) => updateExamData('description', e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              <span className="label-text">시험 시간 (분)</span>
              <span className="required">*</span>
            </label>
            <input
              type="number"
              className="form-input"
              min="1"
              value={examData.duration}
              onChange={(e) => updateExamData('duration', parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-text">합격 점수</span>
              <span className="required">*</span>
            </label>
            <input
              type="number"
              className="form-input"
              min="0"
              value={examData.passingScore}
              onChange={(e) => updateExamData('passingScore', parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              <span className="label-text">시험 시작 시간</span>
            </label>
            <input
              type="datetime-local"
              className="form-input"
              value={examData.startTime}
              onChange={(e) => updateExamData('startTime', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-text">시험 종료 시간</span>
            </label>
            <input
              type="datetime-local"
              className="form-input"
              value={examData.endTime}
              onChange={(e) => updateExamData('endTime', e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={examData.isPublished}
              onChange={(e) => updateExamData('isPublished', e.target.checked)}
            />
            <span>시험 생성 즉시 공개</span>
          </label>
          <p className="help-text">
            체크하지 않으면 비공개 상태로 저장되며, 나중에 공개할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ExamBasicInfo
