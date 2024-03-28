// notificationUtils.js

import webPush from 'web-push';

// Configure VAPID keys
const vapidKeys = {
  publicKey: 'BKaWnOHSMMKiWc464r9MlPqBc8erMty69OQ376NYLWCkHiZpO5v33OQctEwYqwaK8WXBpf6vpvaVsrIrJco4BE8',
  privateKey: 'R0zgdEmPLxFJZILNlGv4zhFqG8fBHz2s2BE1rlZI5Ig',
};

webPush.setVapidDetails(
  'mailto:konedieu5@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Fonction pour envoyer une notification
export async function sendNotification(subscription, payload) {
  try {
    await webPush.sendNotification(subscription, JSON.stringify(payload));
    console.log('Notification envoyée avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la notification :', error);
  }
}
