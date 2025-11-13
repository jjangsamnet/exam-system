// Firebase 설정
const firebaseConfig = {
    apiKey: "AIzaSyCK5TaR7A53lZ3CSGifR_3nt6DssBCLEc0",
    authDomain: "exam-system-28765.firebaseapp.com",
    projectId: "exam-system-28765",
    storageBucket: "exam-system-28765.firebasestorage.app",
    messagingSenderId: "503127502491",
    appId: "1:503127502491:web:7de0f65f463f6b5dde203e",
    measurementId: "G-LTYG0GX4E0"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Firebase 서비스
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// 한국어 설정
auth.languageCode = 'ko';
