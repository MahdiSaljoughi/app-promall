import LogoB from "@/app/logo-b.png";
import Logo from "@/app/logo.png";
import Image from "next/image";
import Link from "next/link";
import { ThemeSwitcher } from "../ThemeSwitcher";
import DropdownMenuUser from "./DropdownMenuUser";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="bg-gradient-to-b from-sky-500/20 dark:from-black to-transparent p-4">
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
                <span className="text-xl">مال</span>
              </div>
            </Link>
            <div className="flex items-center gap-x-4">
              <ThemeSwitcher />

              <DropdownMenuUser session={session} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
