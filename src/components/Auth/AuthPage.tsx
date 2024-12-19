"use client";

import { Button, Input, Spacer } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { OtpInput } from "reactjs-otp-input";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import Logo from "../Main/Logo/Logo";

interface IPoster {
  id: number;
  src: string;
}

export default function AuthPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(60);
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const posters: IPoster[] = [
    {
      id: 0,
      src: "/assets/backgrounds/createshop2.png",
    },
    {
      id: 1,
      src: "/assets/backgrounds/createshop1.png",
    },
  ];

  // Utility to convert English numbers to Persian numbers
  const toPersianNumber = (num: string) =>
    num.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

  // Utility to convert Persian numbers to English numbers
  const toEnglishNumber = (num: string) =>
    num.replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728));

  // Validate mobile number
  const validateMobile = () => {
    const englishMobile = toEnglishNumber(mobile);
    if (!englishMobile) {
      setErrorMessage("شماره موبایل الزامی است.");
      return false;
    }
    if (!/^\d+$/.test(englishMobile)) {
      setErrorMessage("لطفا فقط اعداد را وارد کنید.");
      return false;
    }
    if (englishMobile.length < 10 || englishMobile.length > 11) {
      setErrorMessage("شماره موبایل باید بین 10 تا 11 رقم باشد.");
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleMobileSubmit = async () => {
    if (!validateMobile()) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      // Convert the mobile number to English before sending
      const englishMobile = toEnglishNumber(mobile);

      const res = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile: englishMobile }),
      });
      const resUser = await res.json();

      const isNewUser = resUser.data.isNewUser;
      setIsNewUser(isNewUser);

      setStep(2);
      setOtpTimer(60); // Reset timer
    } catch (error) {
      setErrorMessage("خطا در ورود، لطفا دوباره تلاش کنید");
    }

    setLoading(false);
  };

  // OTP Timer for Step 2
  useEffect(() => {
    if (step === 2 && otpTimer > 0) {
      const interval = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [step, otpTimer]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && mobile) {
      handleMobileSubmit();
    }
  };

  // Handle OTP input change
  const handleOtpChange = (inputOtp: string) => {
    setOtp(inputOtp);
    if (inputOtp.length === 4) {
      handleOtpSubmit(inputOtp);
    }
  };

  const handleOtpSubmit = async (inputOtp?: string) => {
    setOtpLoading(true);

    try {
      // Convert the OTP to English before sending
      const englishOtp = toEnglishNumber(inputOtp || otp);

      const signInData = await signIn("credentials", {
        redirect: false,
        mobile: toEnglishNumber(mobile),
        otp_code: englishOtp,
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
      setErrorMessage("با مشکل برخوردیم.");
      setOtpLoading(false);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleChangeNumber = () => {
    setStep(1);
    setOtp("");
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleResendOtp = async () => {
    if (!validateMobile()) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      setSuccessMessage("کد تایید جدید ارسال شد!");
      setOtpTimer(60); // Reset timer
    } catch (error) {
      setErrorMessage("با مشکل برخوردیم.");
    }
    setLoading(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col relative bg-gradient-to-b from-gray-800 to-gray-900"
      >
        <div className="fixed top-2 left-2 z-50">
          <Button
            variant="light"
            isIconOnly
            className="z-50"
            onClick={() => router.back()}
          >
            <ChevronLeft
              color="white"
              strokeWidth={2}
              absoluteStrokeWidth
              size={30}
            />
          </Button>
        </div>

        <div className="fixed top-0 bg-gradient-to-b from-black/90 to-transparent h-20 left-0 right-0 z-40" />

        {/* Banner section */}
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{ delay: 3000 }}
          spaceBetween={0}
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          className="mySwiper w-full"
          loop={true}
        >
          {posters.map((poster) => (
            <SwiperSlide key={poster.id}>
              <div className="h-56 sm:h-64 md:h-96 z-10">
                <img
                  src={poster.src}
                  alt=""
                  className="w-full lg:absolute inset-x-0 -bottom-96 object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Form section */}
        <AnimatePresence>
          <div className="flex flex-col flex-grow p-6 rounded-t-3xl shadow-2xl bg-black/50 backdrop-blur-xl z-20 -mt-5">
            <motion.h2
              className={
                step === 1
                  ? "text-white text-2xl font-semibold text-center mt-4 mb-8"
                  : "text-white text-2xl font-semibold text-center mt-4"
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {step === 1 ? "ورود | ثبت نام" : "تایید شماره موبایل"}
            </motion.h2>

            <motion.p
              className="text-sm mb-3 mr-2 text-center text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {step === 1 ? "لطفا شماره موبایل خود را وارد کنید" : ""}
            </motion.p>

            {successMessage && (
              <p className="text-cyan-400 text-sm text-center mb-4">
                {successMessage}
              </p>
            )}

            {errorMessage && (
              <motion.p
                className="text-red-500 text-sm text-center mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {errorMessage}
              </motion.p>
            )}

            <AnimatePresence mode="sync">
              <motion.div
                key={step}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -20 },
                }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 ? (
                  <div className="w-full md:w-96 md:mx-auto">
                    <Input
                      type="text"
                      variant="bordered"
                      color="primary"
                      value={toPersianNumber(mobile)}
                      onChange={(e) => setMobile(e.target.value)}
                      onKeyDown={handleKeyDown}
                      size="lg"
                      aria-label="Mobile Number"
                      fullWidth
                      classNames={{ inputWrapper: "border-zinc-600" }}
                      className="text-white"
                    />
                    <Spacer y={4} />
                    <Button
                      disabled={loading}
                      onPress={handleMobileSubmit}
                      className="w-full font-bold"
                      color="primary"
                      size="lg"
                      fullWidth
                    >
                      {loading ? (
                        <div className="flex posters-center justify-center">
                          <FaSpinner className="animate-spin mr-2" />
                          در حال بررسی ...
                        </div>
                      ) : (
                        "برو بریم"
                      )}
                    </Button>
                  </div>
                ) : (
                  <div
                    dir="ltr"
                    className="flex flex-col justify-center items-center w-full"
                  >
                    <OtpInput
                      value={otp}
                      onChange={handleOtpChange}
                      numInputs={4}
                      separator={<span style={{ width: "15px" }}></span>}
                      inputStyle={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "transparent",
                        color: "#fff",
                        fontSize: "20px",
                        borderBottom: "2px solid cyan",
                        textAlign: "center",
                        outline: "none",
                      }}
                      isInputNum
                    />
                    <Spacer y={2} />
                    {otpLoading ? (
                      <FaSpinner className="animate-spin text-white text-center mb-2 " />
                    ) : null}
                    <p className="text-white text-medium mt-3">
                      {otpTimer > 0 ? (
                        <small>
                          تا دریافت دوباره صبر کنید:{" "}
                          {toPersianNumber(otpTimer.toString())}
                        </small>
                      ) : (
                        <small className="text-red-400">
                          <button
                            className="underline"
                            onClick={handleResendOtp}
                          >
                            ارسال مجدد
                          </button>
                          <span>کدی دریافت نکردید؟</span>
                        </small>
                      )}
                    </p>
                    <Spacer y={2} />
                    <button
                      className="text-blue-500 mt-3"
                      onClick={handleChangeNumber}
                    >
                      تغییر شماره
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </AnimatePresence>

        <Link
          href="/"
          className="flex justify-center items-center w-full fixed bottom-4 inset-x-0 z-20"
        >
          <Logo />
        </Link>
      </motion.div>
    </>
  );
}
