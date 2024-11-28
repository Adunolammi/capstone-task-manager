// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "task-manager-903f6.firebaseapp.com",
  projectId: "task-manager-903f6",
  storageBucket: "task-manager-903f6.appspot.com",
  messagingSenderId: "661435056012",
  appId: "1:661435056012:web:a3af6976489695d465a0a9",
  measurementId: "G-YN48R0X1VV"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const app = initializeApp(firebaseConfig);