// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.local.VITE_FB_API_KEY,
  authDomain: "login-59271.firebaseapp.com",
  projectId: "login-59271",
  storageBucket: "login-59271.appspot.com",
  messagingSenderId: "565968380267",
  appId: "1:565968380267:web:15bf89ab2b9d1f902fac2e",
  measurementId: "G-M4HMK7RJWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const googleProvider = new GoogleAuthProvider();