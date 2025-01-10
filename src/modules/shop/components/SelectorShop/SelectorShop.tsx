"use client";

import { useEffect, useState } from "react";
import { Avatar, Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TShop } from "@/types/types";

export default function SelectorShop({ session }) {
  const router = useRouter();

  const [shops, setShops] = useState<TShop[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchShops = async () => {
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

        if (shopsData.data.length === 0) {
          router.push("/profile/create-shop");
        }
        if (shopsData.data.length === 1) {
          router.push(`/dashboard/${shopsData.data[0].id}`);
        }

        setLoading(false);
      } else {
        console.log("Failed to fetch shop data:", response.status);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error fetching shop data:", error);
      setLoading(false);
    } finally {
      if (shops) setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, [session]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner
          size="lg"
          color="primary"
          labelColor="primary"
          label="در حال بارگذاری..."
          classNames={{ label: "mt-4" }}
        />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="flex flex-col gap-y-6 p-4 pt-8">
          <span className="block text-xl text-primary text-center">
            انتخاب فروشگاه
          </span>
          {shops.map((shop: TShop, index) => (
            <div key={index}>
              <Link
                href={`/dashboard/${shop.id}`}
                className="min-h-[77px] flex items-center gap-x-4 p-4 bg-sky-500/10 dark:bg-blue-950/10 rounded-3xl max-w-full w-96 mx-auto border dark:border-x border-sky-200 shadow dark:border-indigo-900 hover:ring-4 hover:border-black/10 ring-sky-500/20 dark:ring-indigo-900/50 transition-all"
              >
                <Avatar src={`${process.env.API_URL}${shop.avatar}`} />
                <span>{shop.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
