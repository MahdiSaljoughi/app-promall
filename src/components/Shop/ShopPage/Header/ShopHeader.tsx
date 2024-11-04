"use client";

import { Button } from "@nextui-org/react";
import { ChevronLeft, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { MdIosShare } from "react-icons/md";

export default function ShopHeader() {
  const router = useRouter();

  return (
    <>
      <div className="fixed inset-x-0 z-50 flex items-center h-20 bg-gradient-to-b from-black/100 to-transparent -top-2">
        <div className="flex w-full justify-between mx-2">
          <div className="flex items-center gap-x-2">
            <Button variant="light" isIconOnly>
              <MdIosShare size={30} />
            </Button>
            <Button
              variant="light"
              isIconOnly
              className="justify-center items-center"
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
    </>
  );
}
