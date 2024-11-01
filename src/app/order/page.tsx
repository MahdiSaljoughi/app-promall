"use client";

import OrderModal from "@/components/Order/OrderModal/OrderModal";
import OrderStepper from "@/components/Order/OrderStepper/OrderStepper";
import { Button, Input, Slider, Textarea } from "@nextui-org/react";
import { Footprints } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [shoeSize, setShoeSize] = useState(36);

  // Function to convert numbers to Persian numerals
  const toPersianDigits = (num) =>
    num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

  const handleSliderChange = (value) => {
    setShoeSize(value);
  };

  return (
    <>
      <OrderStepper></OrderStepper>
      <OrderModal />

      <div className="flex flex-col gap-5 w-full h-[100vh] p-5">
        <div className="flex justify-center flex-col items-center gap-4">
          <p className="self-center text-xl ">
            به فروشگاه نایکی سنتر خوش اومدی !
          </p>
          <p className="text-sm">برای تکمیل سفارشتون اینجا رو با دقت پر کنین</p>
        </div>
        <Input type="text" label="اسم" variant="bordered" className="w-full" />
        <Input
          type="text"
          label="فامیل"
          variant="bordered"
          className="w-full"
        />
        <Input
          type="text"
          label="کد پستی"
          variant="bordered"
          className="w-full"
        />
        <Input
          type="tel"
          label="شماره موبایل"
          variant="bordered"
          className="w-full"
        />
        <Input
          type="text"
          label="آدرس دقیق"
          variant="bordered"
          className="w-full"
        />
        <Textarea
          type="text"
          label="یادداشت برای فروشگاه"
          variant="bordered"
          className="w-full"
        />
        <div className="flex flex-col justify-center items-center gap-5 mx-3 mt-2">
          <div className="flex flex-row gap-2">
            <Footprints className="text-primary" />
            سایز کفش: {toPersianDigits(shoeSize)}
          </div>

          <Slider
            dir="ltr"
            size="md"
            step={1}
            showSteps={true}
            maxValue={43}
            minValue={36}
            defaultValue={shoeSize}
            onChange={handleSliderChange}
            className="w-full"
          />
        </div>
      </div>
      <div className="fixed bottom-4 right-4 left-4 z-10">
        <Button className="w-full font-bold" variant="solid" color="primary">
          تایید
        </Button>
      </div>
      <div className="fixed bottom-0 bg-gradient-to-t from-black/90 to-transparent h-20 left-0 right-0"></div>
    </>
  );
}
