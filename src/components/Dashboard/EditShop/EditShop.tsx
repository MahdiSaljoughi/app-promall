"use client";

import Image from "next/image";
import { Button } from "@nextui-org/react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Shop {
  id: string;
  name: string;
  avatar: string;
  detail: any;
  shopCategories: any;
}

export default function EditShop({ shopId }) {
  const { data: session } = useSession();

  const router = useRouter();

  const [shop, setShop] = useState<Shop | undefined>(undefined);

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
        const shop = await response.json();
        setShop(shop.data);
      } else {
        console.log("Failed to fetch shop data:", response.statusText);
      }
    } catch (error) {
      console.log("Error fetching shop data:", error);
    }
  }

  useEffect(() => {
    fetchShop();
  }, [session, shopId]);

  return (
    <>
      <div className="fixed inset-x-0 z-50 flex items-center h-20 bg-gradient-to-b from-sky-500/20 dark:from-black/100 to-transparent -top-2">
        <div className="flex w-full justify-end">
          <Button
            onClick={() => router.back()}
            variant="light"
            isIconOnly
            className="ml-2"
          >
            <ChevronLeft strokeWidth={2} absoluteStrokeWidth size={30} />
          </Button>
        </div>
      </div>

      <div className="min-h-screen">
        <div className="rounded-b-3xl drop-shadow-md h-56 w-full overflow-hidden">
          {/* <Image
            src={""}
            alt="Shop Banner"
            layout="fill"
            objectFit="cover"
            quality={100}
          /> */}
          swiper
        </div>

        <div className="flex flex-col gap-y-8 mx-10">
          <div className="-mt-20 bg-black size-28 flex items-center justify-center rounded-3xl">
            <Image
              src={`${process.env.API_URL}/${shop?.avatar}`}
              alt="Shop Banner"
              quality={100}
              width={80}
              height={80}
              className="w-28 rounded-3xl"
            />
          </div>

          <div>
            <span className="text-2xl font-bold">{shop?.name}</span>
          </div>

          {/*  */}
        </div>
      </div>
    </>
  );
}
