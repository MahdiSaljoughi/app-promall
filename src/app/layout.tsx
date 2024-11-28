"use client";

import "../styles/globals.css";
import "../styles/style.css";
import "react-toastify/dist/ReactToastify.css";
import NotifToast from "@/components/Notification/NotifToast";
import NextTopLoader from "nextjs-toploader";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute(
        "data-theme",
        document.documentElement.classList.value
      );
    }
  }, []);

  return (
    <html lang="en" dir="rtl">
      <head>
        <title>پرومال</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="./icon.png" type="image/x-icon" />
      </head>

      <body className="bg-white dark:bg-gradiant dark:text-white">
        <NextTopLoader
          color="#3b82f6"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          showAtBottom={false}
        />

        <SessionProvider>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="system">
              <ToastContainer />
              <NotifToast />
              {children}
            </NextThemesProvider>
          </NextUIProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
