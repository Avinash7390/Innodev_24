// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "event-management-df7b7.firebaseapp.com",
  projectId: "event-management-df7b7",
  storageBucket: "event-management-df7b7.appspot.com",
  messagingSenderId: "105053156995",
  appId: "1:105053156995:web:5098bff097b126e2bdcdb6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);