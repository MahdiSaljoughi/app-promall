"use client";

import { Avatar } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { MdSpaceDashboard } from "react-icons/md";
import { useSession } from "next-auth/react";
import UserAvatar from "./UserAvatar";
import { useRouter } from "next/navigation";

export default function HomeAvatar() {
  const { data: session } = useSession();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // signOut({ redirect: false, callbackUrl: "/" });
    // if (process.env.NODE_ENV !== "production") {
    //   if (!session?.user.access_token) {
    //     router.push("/auth");
    //   }
    // } else {
    //   if (!session?.user.access_token) {
    //     router.push(`${process.env.APP_URL}/auth`);
    //   }
    // }
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/auth`,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative" ref={menuRef}>
        {!session?.user ? (
          <Link href="/auth">
            <Avatar className="w-8 h-8" />
          </Link>
        ) : (
          <>
            <button onClick={toggleDropdown} className="block">
              <UserAvatar
                userAcc={session?.user.access_token}
                size={"w-8 h-8"}
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute left-5 w-48 bg-white dark:bg-black/40 rounded-lg z-50 backdrop-blur-md drop-shadow-2xl"
                  style={{ top: "100%" }}
                >
                  <ul className="py-2">
                    <Link href="/profile">
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex items-center p-3 focus:bg-gray-200 dark:focus:bg-white/10 focus:outline-none"
                        tabIndex={0}
                      >
                        <FiSettings className="mr-2 ml-2" />
                        پروفایل
                      </motion.li>
                    </Link>

                    <Link href="/dashboard">
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeOut",
                          delay: 0.1,
                        }}
                        className="flex items-center p-3 focus:bg-gray-200 dark:focus:bg-white/10 focus:outline-none"
                        tabIndex={0}
                      >
                        <MdSpaceDashboard className="mr-2 ml-2" />
                        داشبورد فروشگاه
                      </motion.li>
                    </Link>

                    <button onClick={handleLogout} className="w-full">
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{
                          duration: 0.4,
                          ease: "easeOut",
                          delay: 0.2,
                        }}
                        className="flex items-center p-3 focus:bg-gray-200 dark:focus:bg-white/10 focus:outline-none"
                        tabIndex={0}
                      >
                        <FiLogOut className="mr-2 ml-2" />
                        خروج
                      </motion.li>
                    </button>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </>
  );
}
