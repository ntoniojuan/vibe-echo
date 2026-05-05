import { getFunctions } from "firebase/functions";
import { readFirebaseApp } from "@/lib/firebase/readFirebaseApp";

export const readEchoCallableFunctions = (): ReturnType<typeof getFunctions> =>
  getFunctions(readFirebaseApp(), "us-central1");
