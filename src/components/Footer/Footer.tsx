"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import RelativeMenu from "@/components/Footer/RelativeMenu";

export default function Footer() {
  const [activeIcon, setActiveIcon] = useState<string>("");
  const router = useRouter();

  const handleIconClick = (iconName: string) => {
    setActiveIcon(iconName);

    const routes: Record<string, string> = {
      shop: "/shop",
      "package-check": "/package-check",
      "": "/",
      category: "/categories",
    };

    const route = routes[iconName] || "/";
    router.push(route);
  };

  return (
    <>
      <footer className="pt-24">
        {/* @ts-ignore */}
        <RelativeMenu activeIcon={activeIcon} onIconClick={handleIconClick} />
        <div className="fixed bottom-0 bg-gradient-to-t from-zinc-400 dark:from-black/90 to-transparent h-20 left-0 right-0" />
      </footer>
    </>
  );
}