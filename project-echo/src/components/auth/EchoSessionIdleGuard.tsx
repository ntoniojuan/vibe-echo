"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { readEchoSessionIdleTimeoutMs } from "@/lib/echo/readEchoSessionIdleTimeoutMs";
import { useEchoAuth } from "@/hooks/useEchoAuth";
import { useToast } from "@/hooks/useToast";

const activityThrottleMs = 2_000;
const idleCheckIntervalMs = 30_000;
const warningLeadMs = 5 * 60 * 1000;

export const EchoSessionIdleGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, signOutUser } = useEchoAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const lastActivityMsRef = useRef(Date.now());
  const warnedRef = useRef(false);
  const lastThrottleMsRef = useRef(0);

  useEffect(() => {
    if (!user) {
      return;
    }

    const markActive = () => {
      const now = Date.now();
      if (now - lastThrottleMsRef.current < activityThrottleMs) {
        return;
      }
      lastThrottleMsRef.current = now;
      lastActivityMsRef.current = now;
      warnedRef.current = false;
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        markActive();
      }
    };

    window.addEventListener("pointerdown", markActive, { passive: true });
    window.addEventListener("keydown", markActive);
    window.addEventListener("scroll", markActive, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    const timeoutMs = readEchoSessionIdleTimeoutMs();

    const intervalId = window.setInterval(() => {
      const idleMs = Date.now() - lastActivityMsRef.current;
      if (idleMs >= timeoutMs) {
        void (async () => {
          const minutesRounded = Math.max(1, Math.round(readEchoSessionIdleTimeoutMs() / 60_000));
          await signOutUser();
          showToast(
            `Your session ended after ${String(minutesRounded)} minutes of inactivity (IT.06.POL).`,
            "error",
          );
          router.replace("/");
        })();
        return;
      }
      if (
        timeoutMs > warningLeadMs &&
        idleMs >= timeoutMs - warningLeadMs &&
        !warnedRef.current
      ) {
        warnedRef.current = true;
        showToast("Your session will expire in about 5 minutes unless you continue.", "error");
      }
    }, idleCheckIntervalMs);

    return () => {
      window.removeEventListener("pointerdown", markActive);
      window.removeEventListener("keydown", markActive);
      window.removeEventListener("scroll", markActive);
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearInterval(intervalId);
    };
  }, [user, signOutUser, showToast, router]);

  return <>{children}</>;
};
