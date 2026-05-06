"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { readEchoAppNavDescriptors } from "@/lib/echo/readEchoAppNavDescriptors";
import { readEchoAppNavItemIsActive } from "@/lib/echo/readEchoAppNavItemIsActive";
import { readLucideIconForEchoAppNavHref } from "@/lib/shell/readLucideIconForEchoAppNavHref";

export const EchoAppBottomNav = () => {
  const pathname = usePathname();
  const items = readEchoAppNavDescriptors();

  return (
    <nav
      className="fixed bottom-0 left-0 z-40 flex w-full items-stretch justify-around border-t border-outline-variant/40 bg-echo-card/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 backdrop-blur-sm md:hidden"
      aria-label="Primary mobile"
    >
      {items.map((item) => {
        const active = readEchoAppNavItemIsActive(pathname, item);
        const Icon = readLucideIconForEchoAppNavHref(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            title={item.label}
            className={`flex min-h-11 min-w-11 flex-1 flex-col items-center justify-center px-2 py-1 ${
              active ? "text-white" : "text-on-surface-variant"
            }`}
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                active ? "bg-[#4A634A] text-white shadow-sm" : "bg-transparent"
              }`}
            >
              <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
