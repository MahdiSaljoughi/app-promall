"use client";

import OrderStepper from "@/components/Order/OrderStepper/OrderStepper";
import { Button } from "@nextui-org/react";
import { Copy } from "lucide-react";
import { useState } from "react";
import { PiSealCheckFill } from "react-icons/pi";

export default function OrderComplete() {
  const orderId = "#ORD2023234"; // Mock realistic order ID
  const [toastVisible, setToastVisible] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(orderId); // Copy order ID to clipboard
    setToastVisible(true); // Show notification
    setTimeout(() => setToastVisible(false), 2000); // Hide after 2 seconds
  };

  return (
    <>
      {/* Main Container */}
      <div className="flex flex-col min-h-screen text-white">
        <OrderStepper />
        <div className="flex flex-col items-center justify-center px-5 mt-5">
          {/* Large Checkmark Icon */}
          <div className="flex items-center justify-center mb-6 flex-col">
            <PiSealCheckFill size={150} className="text-primary" />
            <p className="text-3xl font-bold text-primary">مبارکههه :)</p>
          </div>

          {/* Confirmation Card */}
          <div className=" bg-black/30 shadow-lg rounded-xl p-6 w-full max-w-xl text-center">
            {/* Heading */}
            <h1 className="text-xl font-bold text-primary mb-6">
              سفارشتون با موفقیت تکمیل شد !
            </h1>

            {/* Subtext */}
            <p className="text-gray-400 text-lg mb-6">
              از خریدتون ممنونیم سفارشتون در حال آماده سازیه و زودی میاد دستت
            </p>
            <p className="text-gray-400 text-lg mb-6 font-bold">
              با شماره سفارشت میتونی از همین اپ وضعیت سفارشت رو پیگیری کنی
            </p>
            {/* Order Details */}
            <div className=" bg-black/40 p-4 rounded-lg mb-6 shadow-md">
              <div className="flex justify-between text-gray-300 mb-2">
                <span>شماره سفارش:</span>
                <div className="inline-flex gap-2">
                  <span className="font-bold text-primary" dir="ltr">
                    {orderId}
                  </span>
                  <Copy
                    size={19}
                    onClick={handleCopyClick}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex justify-between text-gray-300 mb-2">
                <span>تاریخ سفارش:</span>
                <span className="font-bold">۱۴۰۲/۰۶/۱۵</span>
              </div>

              <div className="flex justify-between text-gray-300">
                <span>مبلغ کل:</span>
                <span className="font-bold">۲,۵۰۰,۰۰۰ تومان</span>
              </div>
            </div>

            {/* Shipping Details */}
            <div className=" bg-black/40 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold text-primary mb-4">
                جزئیات ارسال
              </h2>
              <p className="text-gray-300 mb-2">نام گیرنده: علی احمدی</p>
              <p className="text-gray-300 mb-2">
                آدرس: تهران، خیابان ولیعصر، پلاک ۱۲۳
              </p>
              <p className="text-gray-300">روش ارسال: پست پیشتاز</p>
            </div>
          </div>
        </div>
        {/* Call to Action Button */}
        <div className="fixed bottom-4 px-4 w-full mt-6 z-10">
          <Button
            className="w-full font-bold py-4"
            variant="solid"
            color="primary"
          >
            کجا پیگیری کنیم سفارشمونو ؟
          </Button>
        </div>
      </div>
      <div className="fixed bottom-0 bg-gradient-to-t from-black/45 to-transparent h-20 left-0 right-0 z-0"></div>

      {/* Custom iOS-style Toast Notification */}
      {toastVisible && (
        <div
          className="fixed top-14 left-1/2 transform -translate-x-1/2 bg-black/75 text-white py-2 px-4 rounded-lg shadow-lg transition-opacity duration-300"
          style={{ opacity: toastVisible ? 1 : 0 }}
        >
          کد سفارش کپی شد
        </div>
      )}
    </>
  );
}
