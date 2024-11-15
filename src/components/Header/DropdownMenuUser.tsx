"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownSection,
  DropdownItem,
  User,
  DropdownMenu,
  Avatar,
  Spinner,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import UserAvatar from "../Avatar/UserAvatar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  first_name: string;
  avatar: string;
}

export default function DropdownMenuUser() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User>();

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
      console.log(`Error fetching user avatar: ${error}`);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserData();
    }
  }, [session]);

  if (status === "loading") {
    return (
      <>
        <Spinner size="md" color="primary" />
      </>
    );
  }

  const handleLogout = () => {
    signOut({
      redirect: true,
      callbackUrl:
        process.env.NODE_ENV !== "production"
          ? "/auth"
          : `${process.env.APP_URL}/auth`,
    });
  };

  return (
    <>
      {!session?.user.access_token ? (
        <Link href="/auth">
          <Avatar className="w-8 h-8" />
        </Link>
      ) : (
        <>
          <Dropdown
            showArrow
            radius="sm"
            classNames={{
              base: "before:bg-default-200",
              content: "p-0 border-small border-divider bg-background",
            }}
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
              disabledKeys={["profile"]}
              className="p-2"
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
              <DropdownSection aria-label="Profile" showDivider>
                <DropdownItem isReadOnly key="profile" className="opacity-100">
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

                <DropdownItem
                  key="profile-page"
                  onPress={() => router.push("/profile")}
                >
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                      delay: 0.2,
                    }}
                    tabIndex={0}
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
                </DropdownItem>
                <DropdownItem
                  key="dashboard"
                  onPress={() => router.push("/dashboard")}
                >
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                      delay: 0.2,
                    }}
                    tabIndex={0}
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
                </DropdownItem>
                <DropdownItem
                  key="notification"
                  onPress={() => router.push("/profile/notification")}
                >
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                      delay: 0.2,
                    }}
                    tabIndex={0}
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
                        d="M12 6.5c-2.49 0-4 2.02-4 4.5v6h8v-6c0-2.48-1.51-4.5-4-4.5"
                        opacity="0.3"
                      />
                      <path
                        fill="currentColor"
                        d="M18 16v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5zm-4 5c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2"
                      />
                    </svg>
                    اعلان ها
                  </motion.span>
                </DropdownItem>
              </DropdownSection>

              <DropdownSection aria-label="Log Out">
                <DropdownItem key="logout" onPress={handleLogout}>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                      delay: 0.2,
                    }}
                    tabIndex={0}
                    className="flex items-center text-rose-500 text-base"
                  >
                    <FiLogOut className="mr-2 ml-2" />
                    خروج
                  </motion.span>
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </>
      )}
    </>
  );
}
