"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type EchoThemeToggleVariant = "sidebar" | "surface";

type EchoThemeToggleProps = {
  variant?: EchoThemeToggleVariant;
  className?: string;
};

export const EchoThemeToggle = ({
  variant = "surface",
  className,
}: EchoThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const variantClassName =
    variant === "sidebar"
      ? "border-white/15 bg-white/5 text-echo-sidebar-fg hover:bg-white/10"
      : "border-outline-variant/40 bg-surface-container-low text-on-surface hover:bg-surface-container-high";

  if (!mounted) {
    return (
      <span
        className={`inline-flex h-9 w-9 shrink-0 rounded-lg border border-transparent ${variantClassName} ${className ?? ""}`}
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(isDark ? "light" : "dark");
      }}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${variantClassName} ${className ?? ""}`}
      aria-label={isDark ? "Switch to light theme" : "Switch to Midnight theme"}
    >
      {isDark ? (
        <Sun className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      )}
    </button>
  );
};
