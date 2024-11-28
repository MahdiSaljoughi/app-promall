"use client";

import { User, Avatar } from "@nextui-org/react";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import UserAvatar from "../Avatar/UserAvatar";
import { useEffect, useState } from "react";
import type { IUser } from "@/types/interfaces";
import Icon from "../Notification/Icon";

export default function DropdownMenuUser({ session }) {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`${process.env.API_URL}/user/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.error(`Error fetching user: ${error}`);
      }
    }

    if (session?.user.access_token) {
      fetchUserData();
    }
  }, [session]);

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      {!session?.user.access_token ? (
        <Link href="/auth">
          <Avatar className="w-8 h-8" />
        </Link>
      ) : (
        <>
          <div className="dropdown dropdown-left dropdown-bottom">
            <button className="block">
              <UserAvatar
                userAcc={session!.user.access_token}
                size={"w-8 h-8"}
              />
            </button>

            <div className="menu dropdown-content bg-base-100 rounded-box p-2 shadow w-fit flex items-start">
              <div className="pr-2 pt-2">
                <User
                  name={user?.first_name}
                  classNames={{
                    name: "text-default-600",
                  }}
                  avatarProps={{
                    size: "sm",
                    src: `${process.env.API_URL}${user?.avatar}`,
                  }}
                />
              </div>
              <ul className="min-w-40">
                <li>
                  <Link href={"/profile"}>
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                        delay: 0.2,
                      }}
                      className="flex items-center gap-x-1 text-base"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.2em"
                        height="1.2em"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="6" r="4" fill="currentColor" />
                        <path
                          fill="currentColor"
                          d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
                          opacity="0.5"
                        />
                      </svg>
                      پروفایل
                    </motion.span>
                  </Link>
                </li>
                <li>
                  <Link href={"/dashboard"}>
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                        delay: 0.2,
                      }}
                      className="flex items-center gap-x-1 text-base"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.2em"
                        height="1.2em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M5.6 2A2.6 2.6 0 0 0 3 4.6v4.8A2.6 2.6 0 0 0 5.6 12h2.8A2.6 2.6 0 0 0 11 9.4V4.6A2.6 2.6 0 0 0 8.4 2zm0 12A2.6 2.6 0 0 0 3 16.6v2.8A2.6 2.6 0 0 0 5.6 22h2.8a2.6 2.6 0 0 0 2.6-2.6v-2.8A2.6 2.6 0 0 0 8.4 14zm10-12A2.6 2.6 0 0 0 13 4.6v2.8a2.6 2.6 0 0 0 2.6 2.6h2.8A2.6 2.6 0 0 0 21 7.4V4.6A2.6 2.6 0 0 0 18.4 2zm0 10a2.6 2.6 0 0 0-2.6 2.6v4.8a2.6 2.6 0 0 0 2.6 2.6h2.8a2.6 2.6 0 0 0 2.6-2.6v-4.8a2.6 2.6 0 0 0-2.6-2.6z"
                        />
                      </svg>
                      داشبورد
                    </motion.span>
                  </Link>
                </li>
                <li>
                  <Link href={"/profile/notification"}>
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                        delay: 0.2,
                      }}
                      className="flex items-center gap-x-1 text-base"
                    >
                      <Icon size={"1.2em"} />
                       پیام‌ها
                    </motion.span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-rose-500 text-base"
                  >
                    <FiLogOut />
                    خروج
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
