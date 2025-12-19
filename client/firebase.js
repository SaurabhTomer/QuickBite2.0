// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "quickbite-food-delivery.firebaseapp.com",
  projectId: "quickbite-food-delivery",
  storageBucket: "quickbite-food-delivery.firebasestorage.app",
  messagingSenderId: "929882733929",
  appId: "1:929882733929:web:7b83a706a7661b201811f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export {app , auth}