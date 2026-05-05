"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { EchoGoogleGIcon } from "@/components/marketing/EchoGoogleGIcon";
import { useEchoAuth } from "@/hooks/useEchoAuth";

export default function MarketingLandingPage() {
  const { user, loading, googleSignInPending, signInWithGoogle } = useEchoAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const onGetStarted = () => {
    void signInWithGoogle();
  };

  let signInButtonLabel = "Sign in with Google";
  if (loading) {
    signInButtonLabel = "Loading…";
  } else if (googleSignInPending) {
    signInButtonLabel = "Signing in…";
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-4 py-14 sm:px-6">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#eef4ef] via-[#e6ebe4] to-[#dce6dc] dark:from-[#0c1222] dark:via-[#111d32] dark:to-[#151f2e]"
        aria-hidden
      />
      <div className="relative w-full max-w-[440px]">
        <div className="rounded-2xl border border-outline-variant/35 bg-surface-container-lowest/95 p-8 shadow-[0_8px_40px_rgba(17,28,44,0.1)] backdrop-blur-sm sm:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-inverse-surface text-sm font-bold text-inverse-on-surface shadow-sm"
                aria-hidden
              >
                E
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-on-surface sm:text-[2rem] sm:leading-tight">
                ECHO
              </h1>
            </div>
            <h2 className="mt-8 text-2xl font-bold tracking-tight text-on-surface sm:text-[1.65rem] sm:leading-tight">
              Welcome back
            </h2>
            <p className="mt-2 max-w-[320px] text-base leading-relaxed text-on-surface-variant">
              Sign in to continue to the ECHO platform.
            </p>
          </div>

          <button
            type="button"
            onClick={onGetStarted}
            disabled={loading || googleSignInPending}
            className="mt-9 flex w-full items-center justify-center gap-3 rounded-full border border-outline-variant bg-surface-container-lowest py-3.5 pl-5 pr-6 text-sm font-semibold text-on-surface shadow-sm transition hover:bg-surface-container-low hover:shadow disabled:cursor-not-allowed disabled:opacity-55"
          >
            <EchoGoogleGIcon />
            {signInButtonLabel}
          </button>

          <p className="mt-8 text-center text-sm leading-relaxed text-on-surface-variant">
            Don&apos;t have an account? Sign in to make one!
          </p>
        </div>
      </div>
    </main>
  );
}
