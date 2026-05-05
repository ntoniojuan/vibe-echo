import { getAuth } from "firebase/auth";
import { readFirebaseApp } from "@/lib/firebase/readFirebaseApp";

export const readFirebaseAuth = () => getAuth(readFirebaseApp());
