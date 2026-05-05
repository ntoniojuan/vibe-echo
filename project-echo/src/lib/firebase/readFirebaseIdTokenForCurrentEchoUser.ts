import { readFirebaseAuth } from "@/lib/firebase/readFirebaseAuth";

export const readFirebaseIdTokenForCurrentEchoUser = async (): Promise<string> => {
  const auth = readFirebaseAuth();
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("Not signed in.");
  }
  return currentUser.getIdToken();
};
