"use client";

import { useEffect, useState } from "react";
import {
  Avatar,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { IShop, IUser } from "@/types/interfaces";
import Link from "next/link";
import LogoDarkAndLight from "@/components/Main/Logo/LogoDarkAndLight";

interface IMenuItem {
  id: number;
  title: string;
  icon: React.ReactNode;
  href: string;
}

export default function Header({ shopId }) {
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [user, setUser] = useState<IUser | null>(null);
  const [shop, setShop] = useState<IShop | null>(null);

  const fetchUserProfile = async () => {
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
      console.log(error);
    }
  };

  const fetchShop = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/shop/${shopId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.user?.access_token}`,
        },
      });

      if (response.ok) {
        const shop = await response.json();
        setShop(shop.data);
      } else {
        console.log("Failed to fetch shop data:", response.statusText);
      }
    } catch (error) {
      console.log("Error fetching shop data:", error);
    }
  };

  useEffect(() => {
    if (session?.user.access_token) {
      fetchUserProfile();
      fetchShop();
    }
  }, [session?.user.access_token]);

  const menuItems: IMenuItem[] = [
    {
      id: 0,
      title: "خانه",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.6em"
          height="1.6em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M13.106 22h-2.212c-3.447 0-5.17 0-6.345-1.012s-1.419-2.705-1.906-6.093l-.279-1.937c-.38-2.637-.57-3.956-.029-5.083s1.691-1.813 3.992-3.183l1.385-.825C9.8 2.622 10.846 2 12 2s2.199.622 4.288 1.867l1.385.825c2.3 1.37 3.451 2.056 3.992 3.183s.35 2.446-.03 5.083l-.278 1.937c-.487 3.388-.731 5.081-1.906 6.093S16.553 22 13.106 22m-4.708-6.447a.75.75 0 0 1 1.049-.156c.728.54 1.607.853 2.553.853s1.825-.313 2.553-.853a.75.75 0 1 1 .894 1.205A5.77 5.77 0 0 1 12 17.75a5.77 5.77 0 0 1-3.447-1.148a.75.75 0 0 1-.155-1.049"
            clipRule="evenodd"
          />
        </svg>
      ),
      href: "/",
    },
    {
      id: 1,
      title: "داشبورد",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.6em"
          height="1.6em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5.6 2A2.6 2.6 0 0 0 3 4.6v4.8A2.6 2.6 0 0 0 5.6 12h2.8A2.6 2.6 0 0 0 11 9.4V4.6A2.6 2.6 0 0 0 8.4 2zm0 12A2.6 2.6 0 0 0 3 16.6v2.8A2.6 2.6 0 0 0 5.6 22h2.8a2.6 2.6 0 0 0 2.6-2.6v-2.8A2.6 2.6 0 0 0 8.4 14zm10-12A2.6 2.6 0 0 0 13 4.6v2.8a2.6 2.6 0 0 0 2.6 2.6h2.8A2.6 2.6 0 0 0 21 7.4V4.6A2.6 2.6 0 0 0 18.4 2zm0 10a2.6 2.6 0 0 0-2.6 2.6v4.8a2.6 2.6 0 0 0 2.6 2.6h2.8a2.6 2.6 0 0 0 2.6-2.6v-4.8a2.6 2.6 0 0 0-2.6-2.6z"
          />
        </svg>
      ),
      href: `/dashboard/${shopId}`,
    },
    {
      id: 2,
      title: "ویرایش فروشگاه",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.6em"
          height="1.6em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M3.778 3.655c-.181.36-.27.806-.448 1.696l-.598 2.99a3.06 3.06 0 1 0 6.043.904l.07-.69a3.167 3.167 0 1 0 6.307-.038l.073.728a3.06 3.06 0 1 0 6.043-.904l-.598-2.99c-.178-.89-.267-1.335-.448-1.696a3 3 0 0 0-1.888-1.548C17.944 2 17.49 2 16.582 2H7.418c-.908 0-1.362 0-1.752.107a3 3 0 0 0-1.888 1.548M18.269 13.5a4.53 4.53 0 0 0 2.231-.581V14c0 3.771 0 5.657-1.172 6.828c-.943.944-2.348 1.127-4.828 1.163V18.5c0-.935 0-1.402-.201-1.75a1.5 1.5 0 0 0-.549-.549C13.402 16 12.935 16 12 16s-1.402 0-1.75.201a1.5 1.5 0 0 0-.549.549c-.201.348-.201.815-.201 1.75v3.491c-2.48-.036-3.885-.22-4.828-1.163C3.5 19.657 3.5 17.771 3.5 14v-1.081a4.53 4.53 0 0 0 2.232.581a4.55 4.55 0 0 0 3.112-1.228A4.64 4.64 0 0 0 12 13.5a4.64 4.64 0 0 0 3.156-1.228a4.55 4.55 0 0 0 3.112 1.228"
          />
        </svg>
      ),
      href: `/dashboard/${shopId}/edit-shop`,
    },
    {
      id: 3,
      title: "مدیریت محصولات",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.6em"
          height="1.6em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M17.5 2.75a.75.75 0 0 1 .75.75v2.25h2.25a.75.75 0 0 1 0 1.5h-2.25V9.5a.75.75 0 0 1-1.5 0V7.25H14.5a.75.75 0 0 1 0-1.5h2.25V3.5a.75.75 0 0 1 .75-.75"
            clipRule="evenodd"
          />
          <path
            fill="currentColor"
            d="M2 6.5c0-2.121 0-3.182.659-3.841S4.379 2 6.5 2s3.182 0 3.841.659S11 4.379 11 6.5s0 3.182-.659 3.841S8.621 11 6.5 11s-3.182 0-3.841-.659S2 8.621 2 6.5m11 11c0-2.121 0-3.182.659-3.841S15.379 13 17.5 13s3.182 0 3.841.659S22 15.379 22 17.5s0 3.182-.659 3.841S19.621 22 17.5 22s-3.182 0-3.841-.659S13 19.621 13 17.5"
          />
          <path
            fill="currentColor"
            d="M2 17.5c0-2.121 0-3.182.659-3.841S4.379 13 6.5 13s3.182 0 3.841.659S11 15.379 11 17.5s0 3.182-.659 3.841S8.621 22 6.5 22s-3.182 0-3.841-.659S2 19.621 2 17.5"
            opacity="0.5"
          />
        </svg>
      ),
      href: `/dashboard/${shopId}/products`,
    },
    {
      id: 4,
      title: "مدیریت سفارشات",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.6em"
          height="1.6em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M3.464 3.464C2 4.93 2 7.286 2 12s0 7.071 1.464 8.535C4.93 22 7.286 22 12 22s7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464m7.08 4.053a.75.75 0 1 0-1.087-1.034l-2.314 2.43l-.6-.63a.75.75 0 1 0-1.086 1.034l1.143 1.2a.75.75 0 0 0 1.086 0zM13 8.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5zm-2.457 6.267a.75.75 0 1 0-1.086-1.034l-2.314 2.43l-.6-.63a.75.75 0 1 0-1.086 1.034l1.143 1.2a.75.75 0 0 0 1.086 0zM13 15.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      href: "/",
    },
    {
      id: 5,
      title: "حسابداری",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.6em"
          height="1.6em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M21 15.998v-6c0-2.828 0-4.242-.879-5.121C19.353 4.109 18.175 4.012 16 4H8c-2.175.012-3.353.109-4.121.877C3 5.756 3 7.17 3 9.998v6c0 2.829 0 4.243.879 5.122c.878.878 2.293.878 5.121.878h6c2.828 0 4.243 0 5.121-.878c.879-.88.879-2.293.879-5.122"
            opacity={0.5}
          ></path>
          <path
            fill="currentColor"
            d="M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z"
          ></path>
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M6.25 10.5A.75.75 0 0 1 7 9.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75M6.25 14a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75m-3.5 3.5a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      href: "/",
    },
    {
      id: 6,
      title: "انتخاب فروشگاه",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.6em"
          height="1.6em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M16.528 2H7.472c-1.203 0-1.804 0-2.288.299c-.483.298-.752.836-1.29 1.912L2.491 7.76c-.325.82-.608 1.786-.062 2.479A2 2 0 0 0 6 9a2 2 0 1 0 4 0a2 2 0 1 0 4 0a2 2 0 1 0 4 0a2 2 0 0 0 3.571 1.238c.546-.693.262-1.659-.062-2.479l-1.404-3.548c-.538-1.076-.806-1.614-1.29-1.912C18.332 2 17.73 2 16.528 2M9.5 21.25V18.5c0-.935 0-1.402.201-1.75a1.5 1.5 0 0 1 .549-.549C10.598 16 11.065 16 12 16s1.402 0 1.75.201a1.5 1.5 0 0 1 .549.549c.201.348.201.815.201 1.75v2.75z"
          ></path>
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M4 11a2 2 0 0 0 2-2a2 2 0 1 0 4 0a2 2 0 1 0 4 0a2 2 0 1 0 4 0a2 2 0 0 0 2 2v10.25h-5.5V18.5c0-.935 0-1.402-.201-1.75a1.5 1.5 0 0 0-.549-.549C13.402 16 12.935 16 12 16s-1.402 0-1.75.201a1.5 1.5 0 0 0-.549.549c-.201.348-.201.815-.201 1.75v2.75H4z"
            clipRule="evenodd"
            opacity={0.5}
          ></path>
          <path
            fill="currentColor"
            d="M14.5 21.25H2a.75.75 0 0 0 0 1.5h20a.75.75 0 0 0 0-1.5z"
          ></path>
        </svg>
      ),
      href: "/dashboard",
    },
  ];

  return (
    <>
      <div className="flex items-center p-4 justify-between font-bold rounded-3xl bg-white dark:bg-black shadow-lg dark:drop-shadow-2xl dark:shadow-xl dark:shadow-black/10">
        <div className="flex items-center">
          <Avatar
            src={
              shop
                ? `${process.env.API_URL}${shop?.avatar}`
                : "/assets/profile.png"
            }
          />

          <div className="flex flex-col justify-center mr-3">
            <p className="text-md">
              {user?.first_name} وقت بخیر :{")"}
            </p>
            <p className="text-zinc-600 dark:text-zinc-200 text-sm">
              {shop?.name}
            </p>
          </div>
        </div>

        <>
          <button className="block" onClick={onOpen}>
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
          </button>
          <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="xs">
            <DrawerContent>
              {(onClose) => (
                <>
                  <DrawerHeader className="flex items-center justify-center">
                    <Link href={"/"}>
                      <LogoDarkAndLight />
                    </Link>
                  </DrawerHeader>
                  <DrawerBody>
                    <div className="flex flex-col gap-y-4">
                      {menuItems.map((item: IMenuItem) => (
                        <Link
                          onClick={onClose}
                          key={item.id}
                          href={item.href}
                          className="flex items-center gap-x-2 text-lg bg-sky-100/50 dark:bg-primary/10 p-4 rounded-2xl hover:scale-105 transition-transform"
                        >
                          <span>{item.icon}</span>
                          <span>{item.title}</span>
                        </Link>
                      ))}
                    </div>
                  </DrawerBody>
                </>
              )}
            </DrawerContent>
          </Drawer>
        </>
      </div>
    </>
  );
}
