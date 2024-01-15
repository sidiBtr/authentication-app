// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-77bd0.firebaseapp.com",
  projectId: "mern-auth-77bd0",
  storageBucket: "mern-auth-77bd0.appspot.com",
  messagingSenderId: "603849363813",
  appId: "1:603849363813:web:6f83712ea6dfeaca68118c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);