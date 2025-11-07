// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3gdyhiZnKvaDfQyowD3x_8fa1AOEY5Wc",
  authDomain: "login-register-tasks.firebaseapp.com",
  projectId: "login-register-tasks",
  storageBucket: "login-register-tasks.appspot.com",
  messagingSenderId: "779870054209",
  appId: "1:779870054209:web:2c306e41c978cfa04c63c0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// ✅ Exportamos auth y db correctamente
export const auth = getAuth(app);
export const db = getFirestore(app);
