"use client";

import { useEffect, useState } from "react";
import Hamburger from "hamburger-react";
import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { IShop, IUser } from "@/types/interfaces";

export default function Header({ isOpen, setOpen, shopId }) {
  const { data: session } = useSession();

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

  return (
    <>
      <div className="flex items-center py-4 justify-between font-bold rounded-3xl bg-white dark:bg-black shadow-lg dark:drop-shadow-2xl dark:shadow-xl dark:shadow-black/10">
        <div className="flex items-center mr-4">
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
        <div className="ml-2">
          <Hamburger
            toggled={isOpen}
            size={25}
            animateOnMount={true}
            toggle={setOpen}
            direction="right"
            hideOutline={true}
            rounded={true}
          />
        </div>
      </div>
    </>
  );
}
