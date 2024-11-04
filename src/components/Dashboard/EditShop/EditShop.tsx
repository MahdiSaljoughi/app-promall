"use client";

import ShopBanner from "@/components/Shop/ShopPage/ShopBanner/ShopBanner";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditShop() {
  const router = useRouter();

  const items = [
    {
      imageSrc: "/assets/nike-hoodie.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      title: "Solo Swoosh",
      price: "٣۰,۰۰۰,۰۰۰",
      describe: "هودی",
    },
  ];

  return (
    <>
      <div className="fixed inset-x-0 z-50 flex items-center h-20 bg-gradient-to-b from-black/100 to-transparent -top-2">
        <div className="flex w-full justify-end">
          <Button
            onClick={() => router.back()}
            variant="light"
            isIconOnly
            className="ml-2"
          >
            <ChevronLeft
              color="#ffffff"
              strokeWidth={2}
              absoluteStrokeWidth
              size={30}
            />
          </Button>
        </div>
      </div>

      <div className="min-h-screen">
        <ShopBanner imageUrl={"/assets/nike-white.png"} />

        <div className="flex flex-col gap-y-8 mx-10">
          <div className="-mt-20 bg-black/80 size-28 flex items-center justify-center rounded-3xl">
            <Image
              src={"/assets/nike-white.png"}
              className="drop-shadow-2xl"
              alt="Shop Banner"
              quality={100}
              width={80}
              height={10}
            />
          </div>

          <div>
            <span className="text-2xl font-bold">نایکی سنتر</span>
          </div>

          {/*  */}
        </div>
      </div>
    </>
  );
}
