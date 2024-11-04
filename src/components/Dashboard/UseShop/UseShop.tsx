"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import DashboardPage from "../DashboardPage";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface ShopDetail {}

interface ShopCategory {}

interface Shop {
  id: string;
  name: string;
  avatar: string;
  detail: ShopDetail;
  shopCategories: ShopCategory[];
}

export default function UseShop() {
  const { data: session } = useSession();

  const router = useRouter();

  const [shops, setShops] = useState<Shop[]>([]);
  const [shopsId, setShopId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchShops() {
    setLoading(true);

    try {
      const response = await fetch(`${process.env.API_URL}/shop/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.user?.access_token}`,
        },
      });

      if (response.ok) {
        const shopsData = await response.json();
        setShops(shopsData.data);
        if (shopsData.data.length === 1) {
          setShopId(shopsData.data[0].id);
        }
        if (shopsData.data.length === 0) {
          router.push("/create-shop");
        }
      } else {
        console.log("Failed to fetch shop data:", response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error fetching shop data:", error);
      setLoading(false);
    } finally {
      if (shops) setLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.access_token) {
        await fetchShops();
      }
    };
    fetchData();
  }, [session?.user?.access_token]);

  return (
    <>
      <div className="bg-dashboard-gradient min-h-screen">
        {loading ? (
          <>
            <div className="w-screen h-screen flex items-center justify-center">
              <Spinner
                size="lg"
                color="primary"
                labelColor="primary"
                label="در حال برسی..."
                classNames={{ label: "mt-4" }}
              />
            </div>
          </>
        ) : (
          <>
            {shopsId === null ? (
              <>
                <div className="flex flex-col gap-y-6 p-4 pt-8">
                  <span className="block text-xl text-primary text-center">
                    انتخاب فروشگاه
                  </span>

                  {shops.map((shop: Shop) => (
                    <div key={shop.id}>
                      <button
                        onClick={() => setShopId(shop.id)}
                        className="min-h-[77px] flex items-center gap-x-4 p-4 dark:bg-blue-950/10 rounded-3xl max-w-full w-96 mx-auto border-x border-indigo-900 hover:ring-4 hover:border-black/10 ring-indigo-900/50 transition-all"
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
            ) : (
              <>
                <DashboardPage shopId={shopsId} />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
