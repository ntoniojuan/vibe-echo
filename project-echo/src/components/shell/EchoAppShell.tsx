"use client";

import { EchoAppBottomNav } from "@/components/shell/EchoAppBottomNav";
import { EchoAppSidebar } from "@/components/shell/EchoAppSidebar";

export const EchoAppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="echo-theme-transition flex min-h-screen items-stretch text-on-surface">
      <EchoAppSidebar />
      <div className="echo-theme-transition flex min-h-screen min-w-0 flex-1 flex-col pb-20 md:pb-0">
        <main className="echo-theme-transition flex-1 bg-echo-main-canvas px-6 py-6 lg:px-8">
          {children}
        </main>
      </div>
      <EchoAppBottomNav />
    </div>
  );
};
