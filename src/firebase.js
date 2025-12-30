// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe7bpGq4QZg56BKiVXwMVnqUPl2aGlxCA",
  authDomain: "personalca-9c5bd.firebaseapp.com",
  projectId: "personalca-9c5bd",
  storageBucket: "personalca-9c5bd.firebasestorage.app",
  messagingSenderId: "896338344002",
  appId: "1:896338344002:web:e75148e209dab19e20d5db",
  measurementId: "G-BZ0Z14YRRV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);