"use client";

import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEchoAuth } from "@/hooks/useEchoAuth";
import { readEchoAppNavDescriptors } from "@/lib/echo/readEchoAppNavDescriptors";
import { readEchoAppNavItemIsActive } from "@/lib/echo/readEchoAppNavItemIsActive";
import { readEchoBrandFooterAttribution } from "@/lib/echo/readEchoBrandFooterAttribution";

const EchoSidebarLogoMark = () => (
  <span
    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-echo-sidebar-active"
    aria-hidden
  >
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  </span>
);

const EchoSidebarIconHome = () => (
  <svg
    aria-hidden
    className="h-5 w-5 shrink-0 opacity-90"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const EchoSidebarIconStats = () => (
  <svg
    aria-hidden
    className="h-5 w-5 shrink-0 opacity-90"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

export const EchoAppSidebar = () => {
  const pathname = usePathname();
  const { signOutUser } = useEchoAuth();
  const items = readEchoAppNavDescriptors();
  const primaryItems = items.filter((item) => item.desktopSlot === "primary");
  const footerItems = items.filter((item) => item.desktopSlot === "footer");
  const profileItem = footerItems[0];

  return (
    <nav
      className="hidden w-60 shrink-0 flex-col bg-echo-sidebar py-6 text-echo-sidebar-fg md:flex md:h-screen md:max-h-screen md:overflow-hidden"
      aria-label="Primary"
    >
      <div className="flex shrink-0 items-start gap-2 px-4 pb-5">
        <EchoSidebarLogoMark />
        <div className="min-w-0">
          <p className="text-lg font-bold tracking-tight text-echo-sidebar-fg">ECHO</p>
          <p className="mt-0.5 text-xs text-echo-sidebar-muted">MedGrocer Performance</p>
        </div>
      </div>

      <div className="shrink-0 px-3 pb-6">
        <Link
          href="/evaluation"
          className="flex w-full items-center justify-center rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-bold text-on-primary shadow-sm hover:opacity-90"
        >
          + New Evaluation
        </Link>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-2">
        {primaryItems.map((item) => {
          const active = readEchoAppNavItemIsActive(pathname, item);
          const displayLabel =
            "sidebarLabel" in item && item.sidebarLabel !== undefined
              ? item.sidebarLabel
              : item.label;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-white/10 text-echo-sidebar-active before:absolute before:right-0 before:top-1/2 before:h-8 before:w-0.5 before:-translate-y-1/2 before:rounded-l before:bg-echo-sidebar-active"
                  : "text-echo-sidebar-muted hover:bg-white/5 hover:text-echo-sidebar-fg"
              }`}
            >
              {item.href === "/dashboard" ? <EchoSidebarIconHome /> : null}
              {item.href === "/evaluatee/stats" ? <EchoSidebarIconStats /> : null}
              {displayLabel}
            </Link>
          );
        })}
      </div>

      {profileItem !== undefined ? (
        <div className="shrink-0 border-t border-white/10 px-2 pt-4">
          <Link
            href={profileItem.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
              readEchoAppNavItemIsActive(pathname, profileItem)
                ? "bg-white/10 text-echo-sidebar-active"
                : "text-echo-sidebar-muted hover:bg-white/5 hover:text-echo-sidebar-fg"
            }`}
          >
            <User className="h-5 w-5 shrink-0 opacity-90" strokeWidth={1.75} aria-hidden />
            {profileItem.label}
          </Link>
          <button
            type="button"
            onClick={() => {
              void signOutUser();
            }}
            className="mt-0.5 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-echo-sidebar-muted transition-colors hover:bg-white/5 hover:text-echo-sidebar-fg"
          >
            <LogOut className="h-5 w-5 shrink-0 opacity-90" strokeWidth={1.75} aria-hidden />
            Logout
          </button>
        </div>
      ) : null}
      <div className="shrink-0 px-3 pt-2">
        <p className="text-center text-[10px] leading-snug text-echo-sidebar-muted/85 md:text-left">
          {readEchoBrandFooterAttribution()}
        </p>
      </div>
    </nav>
  );
};
