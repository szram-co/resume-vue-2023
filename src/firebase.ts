// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyBxXZFW6oWSsljg0UsBvqfsV5DSfnli3bI',
  authDomain: 'szram-resume.firebaseapp.com',
  projectId: 'szram-resume',
  storageBucket: 'szram-resume.appspot.com',
  messagingSenderId: '38505796933',
  appId: '1:38505796933:web:ebbd045e7198167beada2c',
  measurementId: 'G-P4RE3VT7RP'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export { firebaseConfig, app, analytics }
