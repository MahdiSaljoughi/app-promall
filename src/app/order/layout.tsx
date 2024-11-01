"use client";

import React from "react";
import "../../styles/globals.css";
import "../../styles/style.css";
import { Providers } from "@/providers/themProviders";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State for theme switching

  // Persist theme between sessions using localStorage

  return (
    <main className={`flex-grow bg-product-gradient`}>
      <Providers>{children}</Providers>
    </main>
  );
}
