"use client";

import "../styles/globals.css";
import "../styles/style.css";
import NotifToast from "@/components/Notification/NotifToast";
import NextTopLoader from "nextjs-toploader";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client: QueryClient = new QueryClient({});

  return (
    <html lang="fa-IR" dir="rtl" suppressHydrationWarning>
      <head>
        <title>پرومال</title>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="./icon.png" type="image/x-icon" />
      </head>

      <body className="bg-white dark:bg-main-bg dark:text-white">
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
        <Toaster position="top-center" reverseOrder={true} />

        <SessionProvider>
          <NextUIProvider>
            <NextThemesProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
            >
              <NotifToast />
              <QueryClientProvider client={client}>
                {children}
                {/* <div dir="ltr">
                  <ReactQueryDevtools />
                </div> */}
              </QueryClientProvider>
            </NextThemesProvider>
          </NextUIProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
