import { getMessaging, getToken } from "firebase/messaging";
import { app, messaging } from "./config";



const Messaging = () =>{
    // Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.

getToken(messaging, { vapidKey: 'BClLfF69UZKU_Up9CGfaZWSnzCUJqBVNB1SMRviN2o7DeDYWC6Xi9Lo0EerG1gsIlHUIlULNXjw4wVQhc4j_YLQ' }).then((currentToken) => {
  if (currentToken) {
    return { currentToken: currentToken};
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});
}



export {Messaging};