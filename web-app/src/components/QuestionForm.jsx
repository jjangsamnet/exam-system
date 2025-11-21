import { useState } from 'react'
import { createQuestion, addChoice, addAnswer } from '../dataconnect-generated'
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
      console.log('문제 등록 시작:', formData)

      // 1. 문제 생성
      const questionResult = await createQuestion({
        categoryId: formData.categoryId,
        type: formData.type,
        questionText: formData.questionText,
        imageUrl: formData.imageUrl || null,
        difficulty: formData.difficulty,
        points: formData.points
      })

      const questionId = questionResult.data.question_insert.id
      console.log('문제 생성 완료, ID:', questionId)

      // 2. 객관식인 경우 선택지 추가
      if (formData.type === 'multiple_choice') {
        for (const choice of formData.choices) {
          if (choice.choiceText.trim()) {
            await addChoice({
              questionId: questionId,
              choiceText: choice.choiceText,
              choiceNumber: choice.choiceNumber,
              isCorrect: choice.isCorrect
            })
          }
        }
        console.log('선택지 추가 완료')
      }

      // 3. 주관식/서술형인 경우 정답 추가
      if (formData.type === 'short_answer' || formData.type === 'essay') {
        await addAnswer({
          questionId: questionId,
          answerText: formData.answerText,
          keywords: formData.keywords || null
        })
        console.log('정답 추가 완료')
      }

      alert('문제가 성공적으로 등록되었습니다!')
      onClose && onClose()
    } catch (error) {
      console.error('문제 등록 실패:', error)
      alert('문제 등록에 실패했습니다: ' + error.message)
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
          <button className="close-btn" onClick={onClose} title="닫기">
            <span style={{ color: '#ef4444', fontWeight: 900, fontSize: '32px' }}>×</span>
          </button>
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
