// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-preloved.firebaseapp.com",
  projectId: "mern-preloved",
  storageBucket: "mern-preloved.appspot.com",
  messagingSenderId: "516756831757",
  appId: "1:516756831757:web:5cbc908bb6d3e3d4701f44"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);