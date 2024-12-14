"use client";

import { Button } from "@nextui-org/react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ShopHeaderProduct() {
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
                <g fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M9 11.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z"></path>
                  <path
                    strokeLinecap="round"
                    d="M14.32 16.802L9 13.29m5.42-6.45L9.1 10.352"
                    opacity={0.5}
                  ></path>
                  <path d="M19 18.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Zm0-13a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z"></path>
                </g>
              </svg>
            </Button>
            <Button
              variant="light"
              isIconOnly
              className="justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2.2em"
                height="2.2em"
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
            <Button variant="light" isIconOnly>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2.4em"
                height="2.4em"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M21 16.09v-4.992c0-4.29 0-6.433-1.318-7.766C18.364 2 16.242 2 12 2S5.636 2 4.318 3.332S3 6.81 3 11.098v4.993c0 3.096 0 4.645.734 5.321c.35.323.792.526 1.263.58c.987.113 2.14-.907 4.445-2.946c1.02-.901 1.529-1.352 2.118-1.47c.29-.06.59-.06.88 0c.59.118 1.099.569 2.118 1.47c2.305 2.039 3.458 3.059 4.445 2.945c.47-.053.913-.256 1.263-.579c.734-.676.734-2.224.734-5.321Z"></path>
                  <path strokeLinecap="round" d="M15 6H9"></path>
                </g>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2.4em"
                height="2.4em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M21 11.098v4.993c0 3.096 0 4.645-.734 5.321c-.35.323-.792.526-1.263.58c-.987.113-2.14-.907-4.445-2.946c-1.02-.901-1.529-1.352-2.118-1.47a2.2 2.2 0 0 0-.88 0c-.59.118-1.099.569-2.118 1.47c-2.305 2.039-3.458 3.059-4.445 2.945a2.24 2.24 0 0 1-1.263-.579C3 20.736 3 19.188 3 16.091v-4.994C3 6.81 3 4.666 4.318 3.333S7.758 2 12 2s6.364 0 7.682 1.332S21 6.81 21 11.098M8.25 6A.75.75 0 0 1 9 5.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 6"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
          </div>

          <Button onPress={() => router.back()} variant="light" isIconOnly>
            <ChevronLeft strokeWidth={2} absoluteStrokeWidth size={30} />
          </Button>
        </div>
      </div>
    </>
  );
}
