import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
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
  /* next-themes sets `class="dark"` on `<html>` only; inline script reduces stored-theme FOUC before hydration. */
  return (
    <html lang="en" suppressHydrationWarning className="min-h-full bg-background">
      <body
        className={`${manrope.variable} echo-theme-transition min-h-screen bg-background text-foreground antialiased`}
      >
        <Script id="echo-theme-init" strategy="beforeInteractive">
          {`(function(){try{var k="echo-theme",v=localStorage.getItem(k);if(v==="dark")document.documentElement.classList.add("dark");else if(v==="light")document.documentElement.classList.remove("dark");}catch(e){}})();`}
        </Script>
        <EchoThemeProvider>
          <ToastProvider>
            <EchoAuthProvider>{children}</EchoAuthProvider>
          </ToastProvider>
        </EchoThemeProvider>
      </body>
    </html>
  );
}
