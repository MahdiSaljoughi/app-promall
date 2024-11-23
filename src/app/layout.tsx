"use client";

import "../styles/globals.css";
import "../styles/style.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";

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
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="./icon.png" type="image/x-icon" />
      </head>

      <body className="bg-white dark:bg-gradiant">
        <Toaster position="top-center" reverseOrder={false} />

        <NextTopLoader
          color="#3b82f6"
          initialPosition={0.08}
          crawlSpeed={200}
          height={4}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow=""
          template='<div class="bar rounded-full" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          showAtBottom={true}
        />
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="system">
            {children}
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
