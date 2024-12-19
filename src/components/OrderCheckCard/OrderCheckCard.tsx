"use client";

import { Avatar, Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import nikeAdapt from "../../../public/assets/shoes-1.png";
import { BackgroundGradient } from "../ui/border-gradiant-card/border-gradiant-card";
import OrderStepper from "../ui/order-stepper/order-stepper";

export default function OrderCheckCard({ onClose }) {
  return (
    <>
      <BackgroundGradient className="rounded-[22px] w-full p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <div className="relative flex flex-col h-[29em] w-[16em]">
          <div className="text-center">
            <span className="text-2xl">سفارشتو پیدا کردممم!</span>
            <br />
            <br />
          </div>
          <div className="flex flex-col items-center">
            {/* <Avatar /> */}
            <span className="text-md mt-2">فروشگاه نایکی</span>
          </div>
          <div className="inline-flex mt-6">
            <div className="flex flex-col w-20  ">
              <Image src={nikeAdapt} alt="" className="-rotate-45" />
              <div className="flex justify-center">
                <div className="rounded-full w-6 h-5 bg-default-300 mt-3 flex justify-center">
                  <span className="text-white text-center text-sm">۲x</span>
                </div>
              </div>
            </div>
            <div className="w-[0.1px] h-14 bg-default-300"></div>

            <div className="flex flex-col w-20 mr-2">
              <Image src={nikeAdapt} alt="" className="-rotate-45" />
              <div className="flex justify-center">
                <div className="rounded-full w-6 h-5 bg-default-300 mt-3 flex justify-center">
                  <span className="text-white text-center text-sm">۲x</span>
                </div>
              </div>
            </div>
            <div className="w-[0.1px] h-14 bg-default-300"></div>
            <div className="flex flex-col w-20 mr-2">
              <Image src={nikeAdapt} alt="" className="-rotate-45" />
              <div className="flex justify-center">
                <div className="rounded-full w-6 h-5 bg-default-300 mt-3 flex justify-center">
                  <span className="text-white text-center text-sm">۲x</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-6 justify-between mx-3">
            <span>قیمت همش :</span>
            <span>۲۳۰,۰۰۰</span>
          </div>
          <div className="flex mt-3 justify-between mx-3">
            <span>مالیات :</span>
            <span>صفر</span>
          </div>
          <div className="flex mt-3 justify-between mx-3">
            <span>مالیات :</span>
            <span>صفر</span>
          </div>
          <div className="h-10 w-full flex flex-col items-center justify-center">
            <OrderStepper></OrderStepper>
          </div>

          <div className="absolute bottom-1 w-full">
            <Button type="button" className="w-full" onClick={onClose}>
              اوکیه !
            </Button>
          </div>
        </div>
      </BackgroundGradient>
    </>
  );
}
