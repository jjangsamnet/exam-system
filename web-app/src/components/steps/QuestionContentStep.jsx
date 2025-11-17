import { useState } from 'react'
import './Steps.css'

const QuestionContentStep = ({ formData, updateFormData }) => {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    if (file.type.startsWith('image/')) {
      // TODO: Firebase Storage에 업로드하고 URL 받기
      const reader = new FileReader()
      reader.onload = (e) => {
        updateFormData('imageUrl', e.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      alert('이미지 파일만 업로드 가능합니다.')
    }
  }

  const removeImage = () => {
    updateFormData('imageUrl', '')
  }

  return (
    <div className="step-content">
      <h3 className="step-title">문제 내용</h3>
      <p className="step-description">학생들이 풀게 될 문제를 입력해주세요.</p>

      <div className="form-group">
        <label className="form-label required">문제</label>
        <textarea
          className="form-textarea"
          rows="6"
          placeholder="문제를 입력하세요. 예) 다음 중 원의 넓이를 구하는 공식은?"
          value={formData.questionText}
          onChange={(e) => updateFormData('questionText', e.target.value)}
        />
        <div className="form-help">
          {formData.questionText.length}/1000자
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">이미지 첨부 (선택)</label>

        {!formData.imageUrl ? (
          <div
            className={`file-upload ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="upload-icon">📷</div>
            <div className="upload-text">
              <p><strong>이미지를 드래그하거나 클릭하여 업로드</strong></p>
              <p className="upload-hint">JPG, PNG, GIF (최대 5MB)</p>
            </div>
            <input
              type="file"
              className="file-input"
              accept="image/*"
              onChange={handleFileInput}
            />
          </div>
        ) : (
          <div className="image-preview">
            <img src={formData.imageUrl} alt="문제 이미지" />
            <button className="remove-image-btn" onClick={removeImage}>
              ✕ 제거
            </button>
          </div>
        )}
      </div>

      <div className="info-box">
        <div className="info-icon">💡</div>
        <div className="info-text">
          <strong>좋은 문제 작성 팁</strong>
          <ul>
            <li>명확하고 간결한 문장 사용</li>
            <li>모호한 표현 지양</li>
            <li>필요한 경우 그림이나 도표 활용</li>
            <li>학생 수준에 맞는 어휘 사용</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default QuestionContentStep
