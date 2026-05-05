import { cert, getApps, initializeApp } from "firebase-admin/app";
import type { ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const readFirebaseAdminFirestore = () => {
  const existingApplication = getApps()[0];
  if (existingApplication) {
    return getFirestore(existingApplication);
  }

  const rawJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (!rawJson) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT_JSON is not configured. Provide the service account JSON string.",
    );
  }

  const credentials = JSON.parse(rawJson) as ServiceAccount;
  const application = initializeApp({
    credential: cert(credentials),
  });

  return getFirestore(application);
};
