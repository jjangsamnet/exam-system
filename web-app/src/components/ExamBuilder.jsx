import { useState } from 'react'
import { createExam, addQuestionToExam } from '../dataconnect-generated'
import StepIndicator from './StepIndicator'
import ExamBasicInfo from './exam/ExamBasicInfo'
import QuestionSelector from './exam/QuestionSelector'
import ExamConfiguration from './exam/ExamConfiguration'
import ExamPreview from './exam/ExamPreview'
import './ExamBuilder.css'

const ExamBuilder = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [examData, setExamData] = useState({
    title: '',
    description: '',
    duration: 60, // 분
    totalPoints: 0,
    passingScore: 60,
    startTime: '',
    endTime: '',
    isPublished: false,
    selectedQuestions: [] // { questionId, question, order, pointsOverride }
  })

  const totalSteps = 4

  const updateExamData = (field, value) => {
    setExamData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addQuestion = (question) => {
    const exists = examData.selectedQuestions.find(q => q.questionId === question.id)
    if (exists) {
      alert('이미 추가된 문제입니다.')
      return
    }

    const newQuestion = {
      questionId: question.id,
      question: question,
      order: examData.selectedQuestions.length + 1,
      pointsOverride: null // null이면 문제의 기본 배점 사용
    }

    const newSelectedQuestions = [...examData.selectedQuestions, newQuestion]
    const newTotalPoints = calculateTotalPoints(newSelectedQuestions)

    setExamData(prev => ({
      ...prev,
      selectedQuestions: newSelectedQuestions,
      totalPoints: newTotalPoints
    }))
  }

  const removeQuestion = (questionId) => {
    const newSelectedQuestions = examData.selectedQuestions
      .filter(q => q.questionId !== questionId)
      .map((q, index) => ({ ...q, order: index + 1 }))

    const newTotalPoints = calculateTotalPoints(newSelectedQuestions)

    setExamData(prev => ({
      ...prev,
      selectedQuestions: newSelectedQuestions,
      totalPoints: newTotalPoints
    }))
  }

  const moveQuestion = (questionId, direction) => {
    const index = examData.selectedQuestions.findIndex(q => q.questionId === questionId)
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === examData.selectedQuestions.length - 1)
    ) {
      return
    }

    const newSelectedQuestions = [...examData.selectedQuestions]
    const newIndex = direction === 'up' ? index - 1 : index + 1

    // Swap
    [newSelectedQuestions[index], newSelectedQuestions[newIndex]] =
    [newSelectedQuestions[newIndex], newSelectedQuestions[index]]

    // Update order
    newSelectedQuestions.forEach((q, i) => {
      q.order = i + 1
    })

    setExamData(prev => ({
      ...prev,
      selectedQuestions: newSelectedQuestions
    }))
  }

  const updateQuestionPoints = (questionId, points) => {
    const newSelectedQuestions = examData.selectedQuestions.map(q =>
      q.questionId === questionId
        ? { ...q, pointsOverride: points }
        : q
    )

    const newTotalPoints = calculateTotalPoints(newSelectedQuestions)

    setExamData(prev => ({
      ...prev,
      selectedQuestions: newSelectedQuestions,
      totalPoints: newTotalPoints
    }))
  }

  const calculateTotalPoints = (questions) => {
    return questions.reduce((total, q) => {
      const points = q.pointsOverride !== null ? q.pointsOverride : q.question.points
      return total + points
    }, 0)
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
        if (!examData.title.trim()) {
          alert('시험 제목을 입력해주세요.')
          return false
        }
        if (!examData.duration || examData.duration < 1) {
          alert('시험 시간을 입력해주세요.')
          return false
        }
        if (!examData.passingScore || examData.passingScore < 0) {
          alert('합격 점수를 입력해주세요.')
          return false
        }
        return true
      case 2:
        if (examData.selectedQuestions.length === 0) {
          alert('최소 1개 이상의 문제를 선택해주세요.')
          return false
        }
        return true
      case 3:
        if (examData.passingScore > examData.totalPoints) {
          alert('합격 점수가 총점보다 클 수 없습니다.')
          return false
        }
        return true
      default:
        return true
    }
  }

  const handleSubmit = async () => {
    try {
      console.log('시험 생성 시작:', examData)

      // 1. 시험 생성
      const examResult = await createExam({
        title: examData.title,
        description: examData.description || null,
        duration: examData.duration,
        totalPoints: examData.totalPoints,
        passingScore: examData.passingScore,
        startTime: examData.startTime || null,
        endTime: examData.endTime || null
      })

      const examId = examResult.data.exam_insert.id
      console.log('시험 생성 완료, ID:', examId)

      // 2. 시험에 문제 추가
      for (const item of examData.selectedQuestions) {
        await addQuestionToExam({
          examId: examId,
          questionId: item.questionId,
          questionOrder: item.order,
          pointsOverride: item.pointsOverride
        })
      }
      console.log('문제 추가 완료')

      alert('시험이 성공적으로 생성되었습니다!')
      onClose && onClose()
    } catch (error) {
      console.error('시험 생성 실패:', error)
      alert('시험 생성에 실패했습니다: ' + error.message)
    }
  }

  const handleSaveDraft = () => {
    localStorage.setItem('examDraft', JSON.stringify(examData))
    alert('임시 저장되었습니다.')
  }

  return (
    <div className="exam-builder-container">
      <div className="exam-builder">
        <div className="builder-header">
          <div className="header-top">
            <h2>📋 시험 만들기</h2>
            {onClose && (
              <button className="close-btn" onClick={onClose}>✕</button>
            )}
          </div>
          <p className="header-subtitle">
            {examData.selectedQuestions.length}개 문제 선택됨 • 총 {examData.totalPoints}점
          </p>
        </div>

        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <div className="builder-content">
          {currentStep === 1 && (
            <ExamBasicInfo
              examData={examData}
              updateExamData={updateExamData}
            />
          )}
          {currentStep === 2 && (
            <QuestionSelector
              selectedQuestions={examData.selectedQuestions}
              onAddQuestion={addQuestion}
            />
          )}
          {currentStep === 3 && (
            <ExamConfiguration
              examData={examData}
              onRemoveQuestion={removeQuestion}
              onMoveQuestion={moveQuestion}
              onUpdatePoints={updateQuestionPoints}
            />
          )}
          {currentStep === 4 && (
            <ExamPreview examData={examData} />
          )}
        </div>

        <div className="builder-actions">
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
                ✓ 시험 생성
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamBuilder
