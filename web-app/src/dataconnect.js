// Firebase Data Connect 설정
import { getDataConnect, connectDataConnectEmulator } from 'firebase/data-connect'
import { app } from './firebase-config'
import { connectorConfig } from './dataconnect-generated'

// Data Connect 인스턴스 생성
export const dataConnect = getDataConnect(app, connectorConfig)

// 개발 환경에서 에뮬레이터 사용 (필요시)
if (import.meta.env.DEV && import.meta.env.VITE_USE_EMULATOR === 'true') {
  connectDataConnectEmulator(
    dataConnect,
    'localhost',
    9399 // Data Connect 에뮬레이터 기본 포트
  )
  console.log('🔌 Data Connect Emulator 연결됨')
}

export default dataConnect
