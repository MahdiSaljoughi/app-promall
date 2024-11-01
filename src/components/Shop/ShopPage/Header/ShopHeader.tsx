"use client";

import { Button } from "@nextui-org/react";
import { ChevronLeft, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { MdIosShare } from "react-icons/md";

export default function ShopHeader() {
  const router = useRouter();

  return (
    <>
      <nav>
        <div className="fixed left-0 right-0 z-[999] flex flex-row justify-between items-center h-20 bg-gradient-to-b from-black/100 to-transparent top-[-5px]">
          <div className="flex flex-row w-full justify-between mx-2">
            <div className="inline-flex gap-1">
              <Button variant="light" isIconOnly className="">
                <MdIosShare size={30} />
              </Button>
              <Button
                variant="light"
                isIconOnly
                className="justify-center items-center ml-1"
              >
                <MessageCircle
                  color="#ffffff"
                  strokeWidth={2}
                  absoluteStrokeWidth
                  size={30}
                />
              </Button>
            </div>

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
      </nav>
    </>
  );
}
