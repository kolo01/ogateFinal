// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDslirp1m8dRri0s8cjQtdO_5up1oEnTLQ",
  authDomain: "ogatenotification.firebaseapp.com",
  projectId: "ogatenotification",
  storageBucket: "ogatenotification.appspot.com",
  messagingSenderId: "219059064219",
  appId: "1:219059064219:web:8d77c7a4c2134bba08e53e",
  measurementId: "G-4BJS7V16XN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);