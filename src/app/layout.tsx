import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import Session from "@/providers/session";
import Nextui from "@/providers/nextUi";
import ReactQuery from "@/providers/reactQuery";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa-IR" dir="rtl" suppressHydrationWarning>
      <head>
        <title>پرومال</title>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
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

        <Session>
          <Nextui>
            <ReactQuery>{children}</ReactQuery>
          </Nextui>
        </Session>
      </body>
    </html>
  );
}
