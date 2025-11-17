import { useState } from 'react'
import StepIndicator from './StepIndicator'
import BasicInfoStep from './steps/BasicInfoStep'
import QuestionContentStep from './steps/QuestionContentStep'
import ChoicesStep from './steps/ChoicesStep'
import PreviewStep from './steps/PreviewStep'
import './QuestionForm.css'

const QuestionForm = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    type: 'multiple_choice', // 'multiple_choice', 'short_answer', 'essay'
    categoryId: '',
    difficulty: 'medium', // 'easy', 'medium', 'hard'
    points: 10,
    questionText: '',
    imageUrl: '',
    choices: [
      { choiceNumber: 1, choiceText: '', isCorrect: false },
      { choiceNumber: 2, choiceText: '', isCorrect: false },
      { choiceNumber: 3, choiceText: '', isCorrect: false },
      { choiceNumber: 4, choiceText: '', isCorrect: false }
    ],
    answerText: '',
    keywords: ''
  })

  const totalSteps = 4

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.categoryId) {
          alert('과목을 선택해주세요.')
          return false
        }
        if (!formData.points || formData.points < 1) {
          alert('배점을 입력해주세요.')
          return false
        }
        return true
      case 2:
        if (!formData.questionText.trim()) {
          alert('문제 내용을 입력해주세요.')
          return false
        }
        return true
      case 3:
        if (formData.type === 'multiple_choice') {
          const hasCorrectAnswer = formData.choices.some(c => c.isCorrect)
          if (!hasCorrectAnswer) {
            alert('정답을 하나 이상 선택해주세요.')
            return false
          }
          const emptyChoices = formData.choices.filter(c => !c.choiceText.trim())
          if (emptyChoices.length > 0) {
            alert('모든 선택지를 입력해주세요.')
            return false
          }
        } else {
          if (!formData.answerText.trim()) {
            alert('정답을 입력해주세요.')
            return false
          }
        }
        return true
      default:
        return true
    }
  }

  const handleSubmit = async () => {
    try {
      // TODO: Firebase Data Connect mutation 호출
      console.log('문제 등록:', formData)
      alert('문제가 성공적으로 등록되었습니다!')
      onClose && onClose()
    } catch (error) {
      console.error('문제 등록 실패:', error)
      alert('문제 등록에 실패했습니다.')
    }
  }

  const handleSaveDraft = () => {
    // TODO: 임시 저장 기능
    localStorage.setItem('questionDraft', JSON.stringify(formData))
    alert('임시 저장되었습니다.')
  }

  return (
    <div className="question-form-container">
      <div className="question-form">
        <div className="form-header">
          <h2>📝 새 문항 등록</h2>
          {onClose && (
            <button className="close-btn" onClick={onClose}>✕</button>
          )}
        </div>

        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <div className="form-content">
          {currentStep === 1 && (
            <BasicInfoStep
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {currentStep === 2 && (
            <QuestionContentStep
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {currentStep === 3 && (
            <ChoicesStep
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {currentStep === 4 && (
            <PreviewStep formData={formData} />
          )}
        </div>

        <div className="form-actions">
          <div className="left-actions">
            {currentStep > 1 && (
              <button className="btn btn-secondary" onClick={handlePrev}>
                ← 이전
              </button>
            )}
          </div>
          <div className="center-actions">
            <button className="btn btn-outline" onClick={handleSaveDraft}>
              💾 임시저장
            </button>
          </div>
          <div className="right-actions">
            {currentStep < totalSteps ? (
              <button className="btn btn-primary" onClick={handleNext}>
                다음 →
              </button>
            ) : (
              <button className="btn btn-success" onClick={handleSubmit}>
                ✓ 등록하기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionForm
