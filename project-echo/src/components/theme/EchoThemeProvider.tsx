"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

type EchoThemeProviderProps = {
  children: ReactNode;
};

/** Persists Light vs Midnight (`dark` in next-themes) under `localStorage` key `echo-theme`. `attribute="class"` applies **`dark` only on `<html>`** (`document.documentElement`), matching `html.dark` tokens and Tailwind `dark:` variants. */
export const EchoThemeProvider = ({ children }: EchoThemeProviderProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="echo-theme"
      themes={["light", "dark"]}
    >
      {children}
    </ThemeProvider>
  );
};
