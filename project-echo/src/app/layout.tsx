import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { EchoThemeProvider } from "@/components/theme/EchoThemeProvider";
import { ToastProvider } from "@/components/toast/ToastProvider";
import { EchoAuthProvider } from "@/components/auth/EchoAuthProvider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Project ECHO",
  description: "Evaluation of Capabilities and Holistic Objectives",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* next-themes (EchoThemeProvider) sets `class="dark"` on <html> when midnight mode is on. */
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} min-h-screen antialiased`}>
        <EchoThemeProvider>
          <ToastProvider>
            <EchoAuthProvider>{children}</EchoAuthProvider>
          </ToastProvider>
        </EchoThemeProvider>
      </body>
    </html>
  );
}
