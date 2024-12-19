"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function ReactQuery({
  children,
}: {
  children: React.ReactNode;
}) {
  const client: QueryClient = new QueryClient({});

  return (
    <>
      <QueryClientProvider client={client}>
        <>{children}</>
        <div dir="ltr">
          <ReactQueryDevtools />
        </div>
      </QueryClientProvider>
    </>
  );
}
