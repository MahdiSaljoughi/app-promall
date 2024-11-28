"use client";

import { Button } from "@nextui-org/react";
import { ChevronLeft, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { MdIosShare } from "react-icons/md";

export default function ShopHeader() {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center py-4 bg-gradient-to-b from-sky-500/20 dark:from-black/100 to-transparent">
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
              <MessageCircle strokeWidth={2} absoluteStrokeWidth size={30} />
            </Button>
          </div>

          <Button onClick={() => router.back()} variant="light" isIconOnly>
            <ChevronLeft strokeWidth={2} absoluteStrokeWidth size={30} />
          </Button>
        </div>
      </div>
    </>
  );
}
