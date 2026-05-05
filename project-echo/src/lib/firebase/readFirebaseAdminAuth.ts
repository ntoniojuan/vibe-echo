import { getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { readFirebaseAdminFirestore } from "@/lib/firebase/readFirebaseAdminFirestore";

export const readFirebaseAdminAuth = () => {
  readFirebaseAdminFirestore();
  const application = getApps()[0];
  if (!application) {
    throw new Error("Firebase Admin app is not initialized.");
  }
  return getAuth(application);
};
