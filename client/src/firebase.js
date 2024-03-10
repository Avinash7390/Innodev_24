// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-5931f.firebaseapp.com",
  projectId: "mern-blog-5931f",
  storageBucket: "mern-blog-5931f.appspot.com",
  messagingSenderId: "177026575593",
  appId: "1:177026575593:web:bced3b112c9594a1891478",
  measurementId: "G-S4B9H5STVK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
