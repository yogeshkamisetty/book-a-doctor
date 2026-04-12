// Firebase Configuration for Push Notifications & Messaging
// FREE TIER: 100 connections, 1GB storage, 100 database operations/day

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Messaging (get messaging service)
let messaging: Messaging | null = null;

if (typeof window !== 'undefined') {
  try {
    messaging = getMessaging(app);
  } catch (error) {
    console.log('Firebase Messaging not available:', error);
  }
}

interface PushNotificationPayload {
  notification?: {
    title?: string;
    body?: string;
    icon?: string;
  };
  data?: Record<string, string>;
}

export const firebaseService = {
  // Request permission and get FCM token
  requestNotificationPermission: async (): Promise<string | null> => {
    if (!messaging) return null;

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });
        return token;
      }
      return null;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  },

  // Listen for incoming messages
  onMessageReceived: (callback: (payload: PushNotificationPayload) => void) => {
    if (!messaging) return;

    onMessage(messaging, (payload) => {
      callback(payload);
    });
  },

  // Show notification
  showNotification: (title: string, options?: NotificationOptions) => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      new Notification(title, options);
    }
  },
};
