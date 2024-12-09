"use client";

import { Button } from "@nextui-org/react";
import { ChevronLeft, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ShopHeader() {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center py-4 bg-gradient-to-b from-sky-500/20 dark:from-black/100 to-transparent fixed inset-x-0 top-0 z-50">
        <div className="flex w-full justify-between mx-2">
          <div className="flex items-center gap-x-2">
            <Button variant="light" isIconOnly>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2.4em"
                height="2.4em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6m8 2V3m0 0L8.5 6.5M12 3l3.5 3.5"
                />
              </svg>
            </Button>
            <Button
              variant="light"
              isIconOnly
              className="justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2.4em"
                height="2.4em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M22.75 12c0-5.937-4.813-10.75-10.75-10.75S1.25 6.063 1.25 12c0 1.718.404 3.345 1.122 4.787c.107.215.13.435.08.62l-.595 2.226c-.408 1.524.986 2.918 2.51 2.51l2.226-.596a.9.9 0 0 1 .62.08A10.7 10.7 0 0 0 12 22.75c5.937 0 10.75-4.813 10.75-10.75M12 2.75a9.25 9.25 0 0 1 0 18.5a9.2 9.2 0 0 1-4.118-.965a2.38 2.38 0 0 0-1.676-.187l-2.227.596a.55.55 0 0 1-.673-.674l.596-2.226a2.38 2.38 0 0 0-.187-1.676A9.2 9.2 0 0 1 2.75 12A9.25 9.25 0 0 1 12 2.75"
                  clipRule="evenodd"
                />
              </svg>
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
