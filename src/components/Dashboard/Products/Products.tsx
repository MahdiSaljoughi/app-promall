"use client";

import Table from "./TableProducts";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Search from "@/components/Home/Search";
import { Avatar, Spinner } from "@nextui-org/react";
import Footer from "@/components/Footer/Footer";

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
      <div className="min-h-screen dark:bg-gradient container mx-auto">
        {session?.user.access_token ? (
          <>
            <div className="flex flex-col gap-y-8">
              <div className="shadow border dark:border-none dark:bg-zinc-900 p-4 pb-0 rounded-b-3xl -mt-0.5">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-y-4">
                    <p className="text-primary font-bold">مدیریت محصولات</p>
                    {shop && <p className="text-sm">{shop.name}</p>}
                  </div>
                  {shop && (
                    <Avatar src={`${process.env.API_URL}${shop.avatar}`} />
                  )}
                </div>
                <div className="py-4">
                  <Search />
                </div>
              </div>
              {shopId && (
                <div className="px-4 md:px-0">
                  <Table shopId={shopId} />
                </div>
              )}
            </div>
            <Footer />
          </>
        ) : (
          <div className="h-screen flex items-center justify-center">
            <Spinner
              size="lg"
              color="primary"
              labelColor="primary"
              label="در حال برسی..."
              classNames={{ label: "mt-4" }}
            />
          </div>
        )}
      </div>
    </>
  );
}
