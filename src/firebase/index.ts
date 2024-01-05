import firebase from 'firebase/compat/app'
import 'firebase/compat/analytics'
import 'firebaseui/dist/firebaseui.css'

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyDrRzRoE6PSf4tJNRRWkS1XQdJL_CeqCQ0',
  // authDomain: 'resume.szram.co',
  projectId: 'resume-szram-co',
  storageBucket: 'resume-szram-co.appspot.com',
  messagingSenderId: '414476963842',
  appId: '1:414476963842:web:93b2e185beac24ee1bd71b',
  measurementId: 'G-BDG4S6VYSP'
})

// Initialize Analytics and get a reference to the service
const firebaseAnalytics = firebase.analytics()

export { firebaseAnalytics }
