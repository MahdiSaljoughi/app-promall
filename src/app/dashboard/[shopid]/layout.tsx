"use client";

import Link from "next/link";
import LogoDarkAndLight from "@/components/Main/Logos/LogoDarkAndLight";
import { useRef, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { Button } from "@nextui-org/react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { menuList } from "@/modules/dashboard/menuList";
import DesktopAvatar from "@/modules/dashboard/components/Header/DesktopAvatar";
import Header from "@/modules/dashboard/components/Header/MobileHeader";

export default function LayoutProfile({ children }) {
  const { shopid } = useParams<{ shopid: string }>();
  const pathname = usePathname();
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const menu = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    menu.current?.classList.toggle("hidden");
  };

  const handleFullScreen = () => {
    if (fullScreen) {
      setFullScreen(false);
    } else {
      setFullScreen(true);
    }
  };

  return (
    <>
      {/* Desktop */}
      <div
        className={`min-h-screen hidden lg:flex items-center justify-center ${
          fullScreen === false && "lg:px-8 xl:px-16 2xl:px-24"
        }`}
      >
        <div
          className={`w-full  ${
            fullScreen === true && "h-screen"
          }   flex gap-x-8 p-8 rounded-3xl bg-zinc-50 dark:bg-black/20`}
        >
          <div ref={menu} className="min-w-52 flex flex-col gap-y-8">
            <Link href="/" className="flex items-center gap-x-2 mt-2">
              <LogoDarkAndLight width={12} />
              <div className="font-bold text-xl">
                <span className="text-primary">پرو</span>
                <span>مال</span>
              </div>
            </Link>
            <div className="flex flex-col gap-y-4 -mr-4">
              {menuList.map((item) => (
                <Link
                  key={item.id}
                  href={item.href.replace("${shop}", shopid)}
                  className={`flex items-center gap-x-3 hover:scale-105 transition-transform p-4 rounded-2xl ${
                    pathname === item.href.replace("${shop}", shopid) &&
                    "bg-primary text-black"
                  }`}
                >
                  <span
                    dangerouslySetInnerHTML={{ __html: String(item.icon) }}
                  />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <Button
                  isIconOnly
                  onPress={toggleMenu}
                  variant="flat"
                  color="primary"
                  radius="lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M20 7H4m16 5H4m16 5H4"
                    />
                  </svg>
                </Button>
                <Button
                  isIconOnly
                  onPress={handleFullScreen}
                  variant="flat"
                  color="primary"
                  radius="lg"
                >
                  {fullScreen === true ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.4rem"
                      height="1.4rem"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M14 1.25a.75.75 0 0 1 .75.75c0 1.907.002 3.261.14 4.29c.135 1.005.389 1.585.812 2.008s1.003.677 2.009.812c1.027.138 2.382.14 4.289.14a.75.75 0 0 1 0 1.5h-.056c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433V2a.75.75 0 0 1 .75-.75m-4 0a.75.75 0 0 1 .75.75v.056c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H2a.75.75 0 0 1 0-1.5c1.907 0 3.261-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812s.677-1.003.812-2.009c.138-1.028.14-2.382.14-4.289a.75.75 0 0 1 .75-.75M1.25 14a.75.75 0 0 1 .75-.75h.056c1.838 0 3.294 0 4.433.153c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.153 1.14.153 2.595.153 4.433V22a.75.75 0 0 1-1.5 0c0-1.907-.002-3.262-.14-4.29c-.135-1.005-.389-1.585-.812-2.008s-1.003-.677-2.009-.812c-1.028-.138-2.382-.14-4.289-.14a.75.75 0 0 1-.75-.75m20.694-.75H22a.75.75 0 0 1 0 1.5c-1.907 0-3.262.002-4.29.14c-1.005.135-1.585.389-2.008.812s-.677 1.003-.812 2.009c-.138 1.027-.14 2.382-.14 4.289a.75.75 0 0 1-1.5 0v-.056c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c1.14-.153 2.595-.153 4.433-.153"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.8em"
                      height="1.8em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M5 6a1 1 0 0 1 1-1h2a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v2a1 1 0 0 0 2 0zm0 12a1 1 0 0 0 1 1h2a1 1 0 1 1 0 2H6a3 3 0 0 1-3-3v-2a1 1 0 1 1 2 0zM18 5a1 1 0 0 1 1 1v2a1 1 0 1 0 2 0V6a3 3 0 0 0-3-3h-2a1 1 0 1 0 0 2zm1 13a1 1 0 0 1-1 1h-2a1 1 0 1 0 0 2h2a3 3 0 0 0 3-3v-2a1 1 0 1 0-2 0z"
                      ></path>
                    </svg>
                  )}
                </Button>
                <Button isIconOnly variant="flat" color="primary" radius="lg">
                  <ThemeSwitcher />
                </Button>
              </div>
              <DesktopAvatar shopId={shopid} />
            </div>
            <div className="h-[700px] overflow-y-auto overflow-x-hidden bg-zinc-100 dark:bg-black/20 p-4 rounded-2xl scrollbar-custom">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="min-h-screen block lg:hidden">
        <div className="p-4">
          <div className="mb-4">
            <Header shopId={shopid} />
          </div>
          <>{children}</>
        </div>
      </div>
    </>
  );
}
