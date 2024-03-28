// // pages/askPermission.js

// import { messaging } from "@/Firebase/config";
// import { Messaging } from "@/Firebase/getmessage";
import { useEffect } from "react";

// import { messaging } from "@/Firebase/config";

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/router';
// // import { sendNotification } from '../Firebase/Notif';

// const AskPermissionPage = () => {
//   const router = useRouter();

//   useEffect(() => {
//     async function askForPermission() {
//       try {
//         const permission = await Notification.requestPermission();
//         if (permission !== 'granted') {
//           throw new Error('Permission denied for notifications');
//         }

//         const registration = await navigator.serviceWorker.register('/service-worker.js');
//         const subscription = await registration.pushManager.subscribe({
//           userVisibleOnly: true,
//           applicationServerKey: '188F9265891B4B8997E44FA98EDFFB2CFDA4A03647BA8FBFC2652D4FC23B3DF3', // Clé publique pour les notifications Pusher
//         });

//         // Envoyer l'abonnement au serveur
//         await sendNotificationSubscriptionToServer(subscription);

//         // Rediriger vers la page principale
//         router.push('/');
//       } catch (error) {
//         console.error('Erreur lors de la demande de permission :', error);
//         // Gérer les erreurs ou afficher un message d'erreur à l'utilisateur
//       }
//     }

//     askForPermission();
//   }, [router]);

//   return (
//     <div>
//       <p>Demande de permission pour envoyer des notifications...</p>
//     </div>
//   );
// };

// export default AskPermissionPage;



// export default async function requestNotificationPermission() {
//   try {
//     await Messaging.requestPermission();
//     console.log('Notification permission granted.');
//     // Retrieve the FCM token
//     const token = await messaging.getToken();
//     console.log('FCM token:', token);
//     // Send this token to your server for sending push notifications
//   } catch (error) {
//     console.error('Error in requesting notification permission:', error);
//   }
//   return(<></>)
// }


export default function Perm(){


useEffect(() => {
  // const requestNotificationPermission = async () => {
  //   try {
  //     await messaging.requestPermission();
  //     console.log('Notification permission granted.');
  //     const token = await messaging.getToken();
  //     console.log('FCM token:', token);
  //     // Envoyer le token au serveur pour envoyer des notifications
  //   } catch (error) {
  //     console.error('Error requesting notification permission:', error);
  //   }
  // };

  // requestNotificationPermission();
}, []);

}