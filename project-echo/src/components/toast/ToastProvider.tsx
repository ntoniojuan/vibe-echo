"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ToastContext, type ToastVariant } from "@/contexts/toastContext";
import { ToastNotice } from "@/components/toast/ToastNotice";

type ActiveToast = {
  id: string;
  message: string;
  variant: ToastVariant;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeToast, setActiveToast] = useState<ActiveToast | null>(null);

  const dismissActiveToast = useCallback(() => {
    setActiveToast(null);
  }, []);

  const showToast = useCallback((message: string, variant: ToastVariant = "success") => {
    setActiveToast({
      id: crypto.randomUUID(),
      message,
      variant,
    });
  }, []);

  useEffect(() => {
    if (!activeToast) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      dismissActiveToast();
    }, 4200);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeToast, dismissActiveToast]);

  const contextValue = useMemo(
    () => ({
      showToast,
    }),
    [showToast],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div
        className="pointer-events-none fixed right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-[100] w-[min(20rem,calc(100vw-2rem))]"
        aria-live="polite"
      >
        {activeToast ? (
          <div className="pointer-events-auto">
            <ToastNotice
              message={activeToast.message}
              variant={activeToast.variant}
              onDismiss={dismissActiveToast}
            />
          </div>
        ) : null}
      </div>
    </ToastContext.Provider>
  );
};
