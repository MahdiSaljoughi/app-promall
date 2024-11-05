"use client";

import "../styles/globals.css";
import "../styles/style.css";
import { SessionProvider } from "next-auth/react";
import { Providers } from "../providers/themProviders";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const noLayoutRoutes = ["/", "/package-check", "/categories", "/shop"];
  const isLayoutVisible = !noLayoutRoutes.includes(pathname);

  // State for theme and direction
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const userTheme = window.matchMedia("(colorScheme: dark)").matches
      ? "dark"
      : "light";

    setTheme(userTheme);
  }, []);

  return (
    <html lang="en" dir="rtl" className={theme} style={{ colorScheme: theme }}>
      <head>
        <title>پرومال</title>
        <link rel="shortcut icon" href="./icon.png" type="image/x-icon" />
      </head>

      <body className="dark:bg-gradiant font-yekanbakh overflow-x-hidden antialiased scroll-smooth">
        <SessionProvider>
          <Providers>
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
            {!isLayoutVisible && <Header />}
            <main className="flex-grow">{children}</main>
            {!isLayoutVisible && <Footer />}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
