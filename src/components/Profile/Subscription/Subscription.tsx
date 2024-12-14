"use client";

import Image from "next/image";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Subscription() {
  const Answers = [
    "مدیریت آسان شاپ",
    "به راحتی سفارش مشتریات رو هندل کن !",
    "    به راحتی سفارش مشتریات رو هندل کن",
  ];

  return (
    <>
      <div className="flex flex-col items-center container mx-auto">
        <div className="z-10">
          <Image
            src={"/assets/sub.png"}
            alt="img-subscription"
            className="rounded-b-3xl object-cover w-full h-80"
            width={1000}
            height={1000}
          />
        </div>

        <div className="z-20 -mt-12 w-full">
          <p className="text-lg font-semibold text-center bg-black/30 backdrop-blur-sm rounded-2xl py-6">
            اشتراک
          </p>

          <div className="my-10">
            <div className="bg-order-gradient rounded-2xl flex flex-col items-center gap-y-8 py-12 shadow-ticket drop-shadow-ticket">
              <h2 className="text-lg font-semibold">حالا چرا پلن پرو ؟</h2>
              <div className="answer flex flex-col justify-center items-start gap-y-3 text-sm tracking-wider">
                {Answers?.map((answers, index) => (
                  <p key={index}>{answers}</p>
                ))}
              </div>
            </div>
          </div>

          <Button color="primary" fullWidth>
            <Link href={"/profile/subscription/plans"}>برو بریم</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
