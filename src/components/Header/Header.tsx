"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeSwitcher } from "../ThemeSwitcher";
import DropdownMenuUser from "./DropdownMenuUser";
import Icon from "../Notification/Icon";
import MainSearch from "../Search/MainSearch";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="p-4 bg-white dark:bg-gradient-header border-b dark:border-none shadow-sm">
          <div className="container flex justify-between items-center">
            <Link href="/" className="flex items-center gap-x-2">
              <Image
                src={"/assets/logo/logo-b.png"}
                alt="لوگو پرومال"
                className="w-12 block dark:hidden"
                width={1000}
                height={1000}
              />
              <Image
                src={"/assets/logo/logo.png"}
                alt="لوگو پرومال"
                className="w-12 hidden dark:block"
                width={1000}
                height={1000}
              />
              <div className="font-bold">
                <span className="text-xl text-primary">پرو</span>
                <span className="text-xl dark:text-white">مال</span>
              </div>
            </Link>

            <div className="flex items-center gap-x-4">
              <MainSearch />

              {session?.user.access_token && (
                <Link href={"/profile/notification"}>
                  <Icon size={"1.4em"} />
                </Link>
              )}

              <ThemeSwitcher />

              <DropdownMenuUser session={session} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
