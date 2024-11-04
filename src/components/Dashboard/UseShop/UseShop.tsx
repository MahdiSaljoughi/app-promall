"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import DashboardPage from "../DashboardPage";

interface Shop {
  id: string;
  name: string;
  avatar: string;
  detail: any;
  shopCategories: any;
}

export default function UseShop() {
  const { data: session } = useSession();

  const [shops, setShops] = useState([]);
  const [shopsId, setShopId] = useState<string | null>(null);

  async function fetchShops() {
    try {
      const response = await fetch(`${process.env.API_URL}/shop/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.user?.access_token}`,
        },
      });

      if (response.ok) {
        const shops = await response.json();
        setShops(shops.data);
      } else {
        console.log("Failed to fetch shop data:", response.statusText);
      }
    } catch (error) {
      console.log("Error fetching shop data:", error);
    }
  }

  useEffect(() => {
    if (session?.user?.access_token) {
      fetchShops();
    }
  }, [session?.user?.access_token]);

  return (
    <>
      <div className="bg-dashboard-gradient min-h-screen">
        {shopsId !== null ? (
          <>
            <DashboardPage shopId={shopsId} />
          </>
        ) : (
          <>
            <div className="flex flex-col gap-y-4 p-4">
              <span>انتخاب فروشگاه</span>
              {shops.map((shop: Shop) => (
                <div key={shop.id}>
                  <button
                    onClick={() => setShopId(shop.id)}
                    className="flex items-center gap-x-4 p-4 dark:bg-blue-950/10 rounded-3xl max-w-full w-96 mx-auto border-x border-indigo-900 hover:ring-4 hover:border-black/10 ring-indigo-900/50 transition-all"
                  >
                    <Image
                      src={`${process.env.API_URL}${shop.avatar}`}
                      width={45}
                      height={45}
                      alt={shop.name}
                      className="rounded-full"
                    />
                    <span>{shop.name}</span>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
