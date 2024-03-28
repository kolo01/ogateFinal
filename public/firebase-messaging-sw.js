// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDslirp1m8dRri0s8cjQtdO_5up1oEnTLQ",
  authDomain: "ogatenotification.firebaseapp.com",
  projectId: "ogatenotification",
  storageBucket: "ogatenotification.appspot.com",
  messagingSenderId: "219059064219",
  appId: "1:219059064219:web:8d77c7a4c2134bba08e53e",
  measurementId: "G-4BJS7V16XN"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});