// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernproject-6ecdb.firebaseapp.com",
  projectId: "mernproject-6ecdb",
  storageBucket: "mernproject-6ecdb.appspot.com",
  messagingSenderId: "60664999660",
  appId: "1:60664999660:web:76759eadf3a3126f08ffc9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);