"use client";

import Logo from "@/app/logo.png";
import { Button, Input, Spacer } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { OtpInput } from "reactjs-otp-input";

export default function AuthPage() {
  const router = useRouter();

  const [step, setStep] = useState(1); // 1: mobile input, 2: OTP input
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(""); // OTP state
  const [otpTimer, setOtpTimer] = useState(60); // Countdown timer
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [currentBanner, setCurrentBanner] = useState(0);

  // Array of banner images
  const bannerImages = ["/", "/"];

  // Utility to convert English numbers to Persian numbers
  const toPersianNumber = (num: string) =>
    num.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

  // Utility to convert Persian numbers to English numbers
  const toEnglishNumber = (num: string) =>
    num.replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728));

  // Change banner every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval); // Cleanup on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Validate mobile number
  const validateMobile = () => {
    const englishMobile = toEnglishNumber(mobile);
    if (!englishMobile) {
      setErrorMessage("لطفا شماره تلفن را وارد کنید");
      return false;
    }
    if (!/^\d+$/.test(englishMobile)) {
      setErrorMessage("لطفا فقط اعداد را وارد کنید");
      return false;
    }
    if (englishMobile.length < 10 || englishMobile.length > 11) {
      setErrorMessage("شماره تلفن باید بین 10 تا 11 رقم باشد");
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
        toast.error("لطفا کد را به درستی وارد کنید", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: "12px",
          },
        });
      } else {
        toast.success("با موفقیت وارد شدین", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: "12px",
          },
        });
        // toast.custom((t) => (
        //   <div
        //     className={`${
        //       t.visible ? "animate-enter" : "animate-leave"
        //     } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        //   >

        //     <div className="flex border-l border-gray-200">
        //       <button
        //         onClick={() => toast.dismiss(t.id)}
        //         className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        //       >
        //         Close
        //       </button>
        //     </div>
        //   </div>
        // ));
        router.push("/profile");
      }
    } catch (error) {
      setErrorMessage("با مشکل برخوردیم");
    }

    setOtpLoading(false);
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
      setErrorMessage("با مشکل برخوردیم");
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
        <div className="w-full h-64 z-0 relative overflow-hidden">
          <motion.div
            key={currentBanner}
            className="absolute inset-0"
            transition={{ opacity: { duration: 0.3 } }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Image
              // src={bannerImages[currentBanner]}
              src={"/"}
              alt="Banner Image"
              className="object-cover w-full h-full"
              height={250}
              width={1000}
            />
          </motion.div>
        </div>
        {/* Form section */}
        <AnimatePresence>
          <div className="flex flex-col flex-grow p-6 rounded-t-3xl shadow-2xl bg-black/50 backdrop-blur-xl -mt-5">
            <motion.h1
              className={
                step === 1
                  ? "text-white text-2xl font-semibold text-center mb-8"
                  : "text-white text-2xl font-semibold text-center"
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {step === 1 ? "ورود | ثبت نام" : "تایید شماره موبایل"}
            </motion.h1>

            <motion.p
              className="text-sm mb-3 mr-2 text-center"
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
                  <div className="w-full">
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
                    />
                    <Spacer y={2} />
                    <Button
                      disabled={loading}
                      onPress={handleMobileSubmit}
                      className="w-full font-bold"
                      color="primary"
                      size="lg"
                      fullWidth
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
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
          className="flex justify-center items-center w-full fixed bottom-4 inset-x-0"
        >
          <Image
            src={Logo}
            alt="Logo"
            width={40}
            height={40}
            className="object-cover"
          />
        </Link>
      </motion.div>
    </>
  );
}