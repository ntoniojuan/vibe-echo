"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { EchoSessionIdleGuard } from "@/components/auth/EchoSessionIdleGuard";
import { EchoAppShell } from "@/components/shell/EchoAppShell";
import { useEchoAuth } from "@/hooks/useEchoAuth";

export const EchoProtectedAppLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useEchoAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-on-surface-variant">
        Loading…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-on-surface-variant">
        Redirecting…
      </div>
    );
  }

  return (
    <EchoSessionIdleGuard>
      <EchoAppShell>{children}</EchoAppShell>
    </EchoSessionIdleGuard>
  );
};
