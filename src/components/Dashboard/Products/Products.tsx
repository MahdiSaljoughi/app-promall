"use client";

import Image from "next/image";
import Table from "./TableProducts";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Search from "@/components/Home/Search";
import { Button } from "@nextui-org/react";

interface Shop {
  id: string;
  name: string;
  avatar: string;
}

export default function Products({ shopId }) {
  const { data: session } = useSession();

  const [shop, setShop] = useState<Shop>();

  async function fetchShop() {
    if (shopId === null) {
      return;
    }

    try {
      const response = await fetch(`${process.env.API_URL}/shop/${shopId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.user?.access_token}`,
        },
      });

      if (response.ok) {
        const shopdata = await response.json();
        setShop(shopdata.data);
      } else {
        console.log("Failed to fetch shop data:", response.statusText);
      }
    } catch (error) {
      console.log("Error fetching shop data:", error);
    }
  }

  useEffect(() => {
    if (session?.user?.access_token) {
      fetchShop();
    }
  }, [session?.user?.access_token, shopId]);

  return (
    <>
      <div className="min-h-screen dark:bg-gradient px-4 md:px-0 container mx-auto">
        <div className="flex flex-col gap-y-8 py-8">
          <div className="shadow border dark:border-none dark:bg-zinc-900 p-4 pb-0 rounded-2xl">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-y-4">
                <p className="text-primary font-bold">مدیریت محصولات</p>
                {shop && <p className="text-sm">{shop.name}</p>}
              </div>
              {shop && (
                <Image
                  src={`${process.env.API_URL}${shop.avatar}`}
                  width={40}
                  height={40}
                  alt={shop.name}
                  className="rounded-full border dark:border-zinc-700"
                />
              )}
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-800 px-0 py-4 md:p-4 rounded-xl my-4 flex flex-col gap-y-4">
              <Search />
              <Button className="flex items-center justify-center mx-auto gap-x-2" color="primary">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.4em"
                    height="1.4em"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" opacity="0.5" />
                      <path
                        strokeLinecap="round"
                        d="M15 12h-3m0 0H9m3 0V9m0 3v3"
                      />
                    </g>
                  </svg>
                </span>
                <span>افزودن محصول</span>
              </Button>
            </div>
          </div>
          <div>
            <Table />
          </div>
        </div>
      </div>
    </>
  );
}
