<<<<<<< HEAD
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
=======
import LogoB from "@/app/logo-b.png";
import Logo from "@/app/logo.png";
import Image from "next/image";
import Link from "next/link";
import { ThemeSwitcher } from "../ThemeSwitcher";
import DropdownMenuUser from "./DropdownMenuUser";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Icon from "../Notification/Icon";
import MainSearch from "../Search/MainSearch";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="p-4 bg-white dark:bg-gradient-header border-b dark:border-none shadow-sm">
          <div className="container flex justify-between items-center">
            <Link href="/" className="flex items-center gap-x-2">
              <Image
                src={LogoB}
                alt="لوگو پرومال"
                className="w-12 block dark:hidden"
              />
              <Image
                src={Logo}
                alt="لوگو پرومال"
                className="w-12 hidden dark:block"
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
>>>>>>> 920b57d7d733d4949c99092b458390ed4130fa69
