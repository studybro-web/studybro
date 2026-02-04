// Import the functions you need from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 🔑 Your Firebase configuration
// ⚠️ REPLACE values with your own Firebase project keys
const firebaseConfig = {
  apiKey: "AIzaSyAPmTL6yhN0sTIfy-u6mFQaYQdqlWEjn5c",
  authDomain: "studybro-aacbb.firebaseapp.com",
  projectId: "studybro-aacbb",
  storageBucket: "studybro-aacbb.firebasestorage.app",
  messagingSenderId: "499341000087",
  appId: "1:499341000087:web:6e316f3c5366c58f7d98d2"
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Firebase services we will use
export const auth = getAuth(app);        // Login / Register
export const db = getFirestore(app);     // Database (materials, users, quiz)
export const storage = getStorage(app);  // Images / thumbnails
