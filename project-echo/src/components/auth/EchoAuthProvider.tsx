"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { EchoAuthContext } from "@/contexts/echoAuthContext";
import type { EchoAuthContextValue } from "@/lib/echo/echoAuthContextValueType";
import { readFirebaseAuth } from "@/lib/firebase/readFirebaseAuth";
import { readFirebaseAuthErrorCode } from "@/lib/firebase/readFirebaseAuthErrorCode";
import { runEchoClientStorageClearOnLogout } from "@/lib/echo/runEchoClientStorageClearOnLogout";

const googleAuthProvider = new GoogleAuthProvider();

export const EchoAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<EchoAuthContextValue["user"]>(null);
  const [loading, setLoading] = useState(true);
  const [googleSignInPending, setGoogleSignInPending] = useState(false);
  const googleSignInFlightRef = useRef(false);

  useEffect(() => {
    const auth = readFirebaseAuth();
    let cancelled = false;

    void (async () => {
      try {
        await getRedirectResult(auth);
        /* onAuthStateChanged sets user when redirect completes */
      } catch (error) {
        console.error(
          "ECHO: getRedirectResult failed after Google sign-in. Check Firebase Auth Google provider, Authorized domains (localhost vs 127.0.0.1), and browser cookies.",
          error,
        );
      }
    })();

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      if (!cancelled) {
        setUser(nextUser);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (googleSignInFlightRef.current) {
      return;
    }
    googleSignInFlightRef.current = true;
    setGoogleSignInPending(true);
    const auth = readFirebaseAuth();
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      const errorCode = readFirebaseAuthErrorCode(error);
      const isPopupBlocked = errorCode === "auth/popup-blocked";

      if (isPopupBlocked) {
        console.info(
          "ECHO: Popup blocked; using full-page Google sign-in. Close any empty Firebase tabs from earlier attempts.",
        );
        await signInWithRedirect(auth, googleAuthProvider);
        return;
      }

      console.error("ECHO Google sign-in did not complete.", error);
    } finally {
      googleSignInFlightRef.current = false;
      setGoogleSignInPending(false);
    }
  }, []);

  const signOutUser = useCallback(async () => {
    const auth = readFirebaseAuth();
    await signOut(auth);
    runEchoClientStorageClearOnLogout();
  }, []);

  const contextValue = useMemo(
    (): EchoAuthContextValue => ({
      user,
      loading,
      googleSignInPending,
      signInWithGoogle,
      signOutUser,
    }),
    [user, loading, googleSignInPending, signInWithGoogle, signOutUser],
  );

  return <EchoAuthContext.Provider value={contextValue}>{children}</EchoAuthContext.Provider>;
};
