import type { User } from "firebase/auth";

export type EchoAuthContextValue = {
  user: User | null;
  loading: boolean;
  googleSignInPending: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
};
