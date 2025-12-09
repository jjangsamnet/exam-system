import { useState, useEffect, useRef } from 'react'
import { storage } from '../../firebase-config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import './Steps.css'

const QuestionContentStep = ({ formData, updateFormData }) => {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const textareaRef = useRef(null)

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

  const handleFile = async (file) => {
    console.log('파일 업로드 시작:', file.name, file.type, file.size)
    
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.')
      return
    }

    // 파일 크기 체크 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('이미지 크기는 5MB 이하만 가능합니다.')
      return
    }

    try {
      setUploading(true)
      setUploadProgress(0)

      // Storage 객체 확인
      if (!storage) {
        console.error('Firebase Storage가 초기화되지 않았습니다.')
        alert('Firebase Storage 초기화 오류입니다. 페이지를 새로고침해주세요.')
        setUploading(false)
        return
      }

      console.log('Firebase Storage 초기화 확인 완료')

      // Firebase Storage에 업로드
      const fileName = `question-images/${Date.now()}_${file.name}`
      console.log('업로드 경로:', fileName)
      
      const storageRef = ref(storage, fileName)
      console.log('Storage Reference 생성 완료')
      
      const uploadTask = uploadBytesResumable(storageRef, file)
      console.log('Upload Task 생성 완료')

      // Promise로 감싸서 확실하게 완료 처리
      await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // 업로드 진행률 계산
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setUploadProgress(Math.round(progress))
            console.log('업로드 진행률:', Math.round(progress) + '%', 
                       `(${snapshot.bytesTransferred}/${snapshot.totalBytes} bytes)`)
          },
          (error) => {
            console.error('이미지 업로드 실패:', error)
            console.error('에러 코드:', error.code)
            console.error('에러 메시지:', error.message)
            
            let errorMessage = '이미지 업로드에 실패했습니다.'
            if (error.code === 'storage/unauthorized') {
              errorMessage = '업로드 권한이 없습니다. 로그인 상태를 확인해주세요.'
            } else if (error.code === 'storage/canceled') {
              errorMessage = '업로드가 취소되었습니다.'
            } else if (error.code === 'storage/unknown') {
              errorMessage = '알 수 없는 오류가 발생했습니다. 네트워크 연결을 확인해주세요.'
            }
            
            alert(errorMessage + '\n상세: ' + error.message)
            setUploading(false)
            setUploadProgress(0)
            reject(error)
          },
          async () => {
            try {
              // 업로드 완료 - URL 가져오기
              console.log('업로드 완료, URL 가져오는 중...')
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
              console.log('이미지 업로드 완료:', downloadURL)
              updateFormData('imageUrl', downloadURL)
              setUploading(false)
              setUploadProgress(100)
              
              // 잠시 후 진행률 표시 제거
              setTimeout(() => {
                setUploadProgress(0)
              }, 1000)
              
              resolve(downloadURL)
            } catch (error) {
              console.error('URL 가져오기 실패:', error)
              alert('이미지 URL 가져오기에 실패했습니다.')
              setUploading(false)
              setUploadProgress(0)
              reject(error)
            }
          }
        )
      })
    } catch (error) {
      console.error('이미지 처리 실패:', error)
      alert('이미지 처리에 실패했습니다: ' + error.message)
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const removeImage = () => {
    updateFormData('imageUrl', '')
  }

  // 클립보드에서 이미지 붙여넣기
  const handlePaste = (e) => {
    const items = e.clipboardData?.items
    if (!items) return

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile()
        if (file) {
          e.preventDefault()
          handleFile(file)
        }
      }
    }
  }

  // 페이지 전체에서 붙여넣기 감지
  useEffect(() => {
    const handleWindowPaste = (e) => {
      // 다른 입력 필드에 포커스되어 있으면 무시
      const activeElement = document.activeElement
      if (activeElement && activeElement.tagName === 'TEXTAREA' && activeElement === textareaRef.current) {
        return
      }

      handlePaste(e)
    }

    window.addEventListener('paste', handleWindowPaste)
    return () => {
      window.removeEventListener('paste', handleWindowPaste)
    }
  }, [])

  return (
    <div className="step-content">
      <h3 className="step-title">문제 내용</h3>
      <p className="step-description">학생들이 풀게 될 문제를 입력해주세요.</p>

      <div className="form-group">
        <label className="form-label required">문제</label>
        <textarea
          ref={textareaRef}
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

        {uploading ? (
          <div className="upload-progress-container">
            <div className="upload-progress-bar">
              <div className="upload-progress-fill" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <p className="upload-progress-text">업로드 중... {uploadProgress}%</p>
          </div>
        ) : !formData.imageUrl ? (
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
              <p className="upload-hint">또는 Ctrl+V (Mac: Cmd+V)로 붙여넣기</p>
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
