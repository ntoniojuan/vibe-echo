import { getFirestore } from "firebase/firestore";
import { readFirebaseApp } from "@/lib/firebase/readFirebaseApp";

export const readFirestoreDb = () => getFirestore(readFirebaseApp());
