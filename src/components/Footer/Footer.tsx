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
      shops: "/shops",
      package_check: "/package-check",
      home: "/",
      category: "/categories",
    };

    const route = routes[iconName] || "/";
    router.push(route);
  };

  return (
    <>
      <footer className="pt-24" dir="ltr">
        {/* @ts-expect-error */}
        <RelativeMenu activeIcon={activeIcon} onIconClick={handleIconClick} />
        <div className="fixed bottom-0 bg-gradient-to-t from-sky-500/20 dark:from-black/90 to-transparent h-20 inset-x-0" />
      </footer>
    </>
  );
}
