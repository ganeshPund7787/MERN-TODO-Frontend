// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "task-manager-86a94.firebaseapp.com",
    projectId: "task-manager-86a94",
    storageBucket: "task-manager-86a94.appspot.com",
    messagingSenderId: "663931319889",
    appId: "1:663931319889:web:45188855420bb1e0f92a70"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);