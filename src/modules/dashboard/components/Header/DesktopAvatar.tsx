"use client";

import { IUser } from "@/types/interfaces";
import type { TShop } from "@/types/types";
import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DesktopAvatar({ shopId }) {
  const { data: session } = useSession();
  const [user, setUser] = useState<IUser | null>(null);
  const [shop, setShop] = useState<TShop | null>(null);

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
      <div className="flex items-center gap-x-3">
        <div className="flex flex-col items-end">
          <p className="text-md">
            {user?.first_name} وقت بخیر :{")"}
          </p>
          <p className="text-zinc-600 dark:text-zinc-200 text-sm">
            {shop?.name}
          </p>
        </div>
        <Avatar
          size="lg"
          src={
            shop
              ? `${process.env.API_URL}${shop?.avatar}`
              : "/assets/profile.png"
          }
        />
      </div>
    </>
  );
}
