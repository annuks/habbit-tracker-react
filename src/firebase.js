// configuring firebase
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyAEHlYFIJ261htP8XQuha3Nm2K0H9Opwis",
    authDomain: "habittracker-3e89c.firebaseapp.com",
    projectId: "habittracker-3e89c",
    storageBucket: "habittracker-3e89c.appspot.com",
    messagingSenderId: "594441422816",
    appId: "1:594441422816:web:ac9e374c76463dd2b60d85"
  };

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);