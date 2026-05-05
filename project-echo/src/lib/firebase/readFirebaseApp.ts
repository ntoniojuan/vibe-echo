import { initializeApp, getApps, type FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const readFirebaseApp = (): FirebaseApp => {
  if (getApps().length > 0) {
    const existingApp = getApps()[0];
    if (!existingApp) {
      throw new Error("Firebase app is not initialized.");
    }
    return existingApp;
  }

  const hasRequiredConfig = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
  if (!hasRequiredConfig) {
    throw new Error(
      "Missing Firebase web configuration. Set NEXT_PUBLIC_FIREBASE_* environment variables.",
    );
  }

  return initializeApp(firebaseConfig);
};
