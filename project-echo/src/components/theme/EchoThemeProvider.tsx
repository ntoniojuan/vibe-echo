"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

type EchoThemeProviderProps = {
  children: ReactNode;
};

/** Persists Light vs Midnight (`dark` in next-themes) under `localStorage` key `echo-theme`. `attribute="class"` applies the active theme as a class on the document root (`<html>`), so global `.dark { … }` CSS and Tailwind dark variants resolve correctly. */
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
