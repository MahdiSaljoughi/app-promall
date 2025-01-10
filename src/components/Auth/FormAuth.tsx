"use client";

import { Button, Input, InputOtp } from "@nextui-org/react";
import { useState } from "react";
import LogoDarkAndLight from "../Main/Logos/LogoDarkAndLight";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function FormAuth() {
  const [step, setStep] = useState("mobile");

  const renderStep = () => {
    switch (step) {
      case "mobile":
        return <MobileInput setStep={setStep} />;
      case "otp":
        return <OtpInput setStep={setStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-y-8 items-center justify-center min-w-full sm:min-w-96 dark:bg-black/30 p-8 rounded-3xl shadow-lg">
      <Link href={"/"}>
        <LogoDarkAndLight width={16} />
      </Link>
      {renderStep()}
    </div>
  );
}

function MobileInput({ setStep }) {
  const handleMobileSubmit = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile: "" }),
      });
      const resUser = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <span className="text-xl">ورود | ثبت نام</span>
      <span className="text-sm">لطفا شماره موبایل خود را وارد کنید</span>
      <Input
        aria-label="Mobile Number"
        placeholder="09123456789"
        size="lg"
        variant="bordered"
        color="primary"
      />
      <Button fullWidth color="primary" onPress={() => setStep("otp")}>
        ارسال کد
      </Button>
    </>
  );
}

function OtpInput({ setStep }) {
  const router = useRouter();

  const handleOtpSubmit = async () => {
    try {
      const signInData = await signIn("credentials", {
        redirect: false,
        mobile: "09121231234",
        otp_code: "1234",
      });

      if (signInData?.error) {
        toast.custom((t) => (
          <div
            className={`flex items-center gap-x-3 justify-center bg-white dark:bg-black/80 backdrop-blur-sm font-semibold text-sm text-zinc-700 dark:text-zinc-200 py-4 px-8 shadow-md rounded-full ${
              t.visible ? "animate-enter" : "animate-leave"
            }`}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
                className="text-rose-500"
              >
                <path
                  fill="currentColor"
                  d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
                  opacity={0.5}
                ></path>
                <path
                  fill="currentColor"
                  d="M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 1 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06"
                ></path>
              </svg>
            </span>
            <span>لطفا کد را به درستی وارد کنید</span>
          </div>
        ));
      } else {
        toast.custom((t) => (
          <div
            className={`flex items-center gap-x-3 justify-center bg-white dark:bg-black/80 backdrop-blur-sm font-semibold text-sm text-zinc-700 dark:text-zinc-200 py-4 px-8 shadow-md rounded-full ${
              t.visible ? "animate-enter" : "animate-leave"
            }`}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
                className="text-green-500"
              >
                <path
                  fill="currentColor"
                  d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
                  opacity={0.5}
                ></path>
                <path
                  fill="currentColor"
                  d="M16.03 8.97a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47l2.235-2.235L14.97 8.97a.75.75 0 0 1 1.06 0"
                ></path>
              </svg>
            </span>
            <span>باموفقیت وارد شدید</span>
          </div>
        ));

        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <span className="text-xl -mb-6">تایید شماره موبایل</span>
      <InputOtp
        length={4}
        dir="ltr"
        size="lg"
        color="primary"
        variant="underlined"
      />
      <Button fullWidth onPress={handleOtpSubmit} color="primary">
        ورود
      </Button>
      <div className="flex items-center gap-x-6">
        <button className="text-blue-400 text-sm">ارسال مجدد</button>
        <button
          onClick={() => setStep("mobile")}
          className="text-blue-400 text-sm"
        >
          تغیر شماره
        </button>
      </div>
    </>
  );
}
