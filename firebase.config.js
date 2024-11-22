// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC463nXXAe-QK5tBzVvJ0cENDdMx1Pee90",
  authDomain: "logistics-registry.firebaseapp.com",
  projectId: "logistics-registry",
  storageBucket: "logistics-registry.firebasestorage.app",
  messagingSenderId: "619847568070",
  appId: "1:619847568070:web:71b19b1f9fd7ae458365c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
