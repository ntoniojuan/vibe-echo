"use client";

import { EchoAppBottomNav } from "@/components/shell/EchoAppBottomNav";
import { EchoAppSidebar } from "@/components/shell/EchoAppSidebar";

export const EchoAppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="echo-theme-transition flex min-h-screen items-stretch text-on-surface">
      <EchoAppSidebar />
      <div className="echo-theme-transition flex min-h-screen min-w-0 flex-1 flex-col pb-20 md:pb-0">
        <main className="flex-1">{children}</main>
      </div>
      <EchoAppBottomNav />
    </div>
  );
};
