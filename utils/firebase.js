import { initializeApp } from "firebase/app";

import { getMessaging, getToken } from "firebase/messaging";

//Firebase Config values imported from .env file
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



export {app};