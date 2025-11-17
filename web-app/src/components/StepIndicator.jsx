import './StepIndicator.css'

const StepIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, label: '기본정보' },
    { number: 2, label: '문제내용' },
    { number: 3, label: '선택지/정답' },
    { number: 4, label: '미리보기' }
  ]

  return (
    <div className="step-indicator">
      {steps.map((step, index) => (
        <div key={step.number} className="step-wrapper">
          <div className={`step ${currentStep >= step.number ? 'active' : ''} ${currentStep === step.number ? 'current' : ''}`}>
            <div className="step-circle">
              {currentStep > step.number ? '✓' : step.number}
            </div>
            <div className="step-label">{step.label}</div>
          </div>
          {index < steps.length - 1 && (
            <div className={`step-line ${currentStep > step.number ? 'active' : ''}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default StepIndicator
