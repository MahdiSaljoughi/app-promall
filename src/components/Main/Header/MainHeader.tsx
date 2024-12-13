"use client";

import DropdownMenuHeader from "@/components/Main/Menu/DropdownMenuHeader";
import Icon from "@/components/Notification/Icon";
import MainSearch from "@/components/Search/MainSearch";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoDarkAndLight from "../Logo/LogoDarkAndLight";

export default function MainHeader() {
  const { data: session } = useSession();

  return (
    <>
      <header className="sticky top-0 container mx-auto z-50 pb-8 md:pb-16">
        <div className="bg-sky-100/50 dark:bg-black/50 backdrop-blur-md rounded-b-[32px] px-4 py-6 md:p-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-x-2">
              <LogoDarkAndLight />
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

              <DropdownMenuHeader session={session} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
