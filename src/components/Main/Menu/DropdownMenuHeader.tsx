"use client";

import {
  User,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import UserAvatar from "../../Avatar/UserAvatar";
import { useEffect, useState } from "react";
import type { IUser } from "@/types/interfaces";
import Icon from "../../Notification/Icon";

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
    console.log("out");
  };

  return (
    <>
      {!session?.user.access_token ? (
        <Link href="/auth">
          <Avatar className="w-8 h-8 transition-transform" isBordered />
        </Link>
      ) : (
        <>
          <Dropdown
            showArrow
            classNames={{
              base: "before:bg-default-200",
              content: "p-0 bg-background",
            }}
            radius="sm"
          >
            <DropdownTrigger>
              <button className="block">
                <UserAvatar
                  userAcc={session!.user.access_token}
                  size={"w-8 h-8"}
                />
              </button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Custom item styles"
              className="p-2"
              disabledKeys={["profile"]}
              itemClasses={{
                base: [
                  "rounded-md",
                  "text-default-500",
                  "transition-opacity",
                  "data-[hover=true]:text-foreground",
                  "data-[hover=true]:bg-default-100",
                  "dark:data-[hover=true]:bg-default-50",
                  "data-[selectable=true]:focus:bg-default-50",
                  "data-[pressed=true]:opacity-70",
                  "data-[focus-visible=true]:ring-default-500",
                ],
              }}
            >
              <DropdownSection showDivider aria-label="Profile & Actions">
                <DropdownItem key="profile" isReadOnly className="opacity-100">
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
                </DropdownItem>
                <DropdownItem key="profileLink" className="py-3 rounded-xl">
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
                </DropdownItem>
                <DropdownItem key="dashboard" className="py-3 rounded-xl">
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
                </DropdownItem>
                <DropdownItem key="notification" className="py-3 rounded-xl">
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
                </DropdownItem>
              </DropdownSection>

              <DropdownSection aria-label="Log Out">
                <DropdownItem key="logout" className="py-3 rounded-xl">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-x-1 text-rose-500 text-base w-full"
                  >
                    <FiLogOut />
                    <span>خروج</span>
                  </button>
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </>
      )}
    </>
  );
}
