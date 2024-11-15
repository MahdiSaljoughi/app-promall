"use client";

import { Button, Input, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { HiOutlineSupport, HiSupport } from "react-icons/hi";
import {
  MdOutlineSpaceDashboard,
  MdSpaceDashboard,
  MdViewCarousel,
} from "react-icons/md";
import { PiCat, PiCatFill } from "react-icons/pi";
import { TbPaint, TbPaintFilled } from "react-icons/tb";
import Image from "next/image";
import Header from "./Header/Header";
import Orderinfo from "./RegistredOrders/Orderinfo";
import Footer from "../Footer/Footer";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  avatar: string;
  mobile: string;
}

interface MenuItemType {
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  path: string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();
  const [step, setStep] = useState(0);
  const [isOpenHeader, setOpenHeader] = useState(false);
  const [activeItem, setActiveItem] = useState("داشبورد");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/user/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.user.access_token}`,
        },
      });

      if (!response.ok) {
        console.error("*** error fetch user profile page ***");
      }

      const userData = await response.json();
      setUser(userData.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (session?.user.access_token) {
      fetchUser();
    }
  }, []);

  if (!user) {
    return (
      <>
        <div className="w-screen h-screen flex items-center justify-center">
          <Spinner
            size="lg"
            color="primary"
            labelColor="primary"
            label="در حال بارگذاری..."
            classNames={{ label: "mt-4" }}
          />
        </div>
      </>
    );
  }

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("first_name", firstNameRef.current?.value || "");
      formData.append("last_name", lastNameRef.current?.value || "");
      formData.append("email", emailRef.current?.value || "");
      formData.append("address", addressRef.current?.value || "");

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const response = await fetch(`${process.env.API_URL}/user/${user.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session?.user.access_token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setLoading(false);
      await fetchUser();
      alert("با موفقیت انجام شد");
      if (user.first_name === "" || user.last_name === "") {
        setStep(0);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating user:", error);
    }
  };

  const menuItems: MenuItemType[] = [
    {
      label: "پروفایل",
      icon: <MdOutlineSpaceDashboard size={28} />,
      activeIcon: <MdSpaceDashboard size={28} />,
      path: "/profile",
    },
    {
      label: "سفارشات ثبت شده",
      icon: <TbPaint size={28} />,
      activeIcon: <TbPaintFilled size={28} />,
      path: "/profile/registredOrders",
    },
    {
      label: "اشتراک",
      icon: <PiCat size={28} />,
      activeIcon: <PiCatFill size={28} />,
      path: "/profile/subscription",
    },
    {
      label: "ایجاد فروشگاه",
      icon: <MdViewCarousel size={28} />,
      activeIcon: <MdViewCarousel size={28} />,
      path: "/create-shop",
    },
    {
      label: "پشتیبانی",
      icon: <HiOutlineSupport size={28} />,
      activeIcon: <HiSupport size={28} />,
      path: "/profile/tickets",
    },
  ];

  // Utility to convert English numbers to Persian numbers
  const toPersianNumber = (num: string) => {
    return num.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  };

  const renderUserInfo = () => {
    return (
      <>
        <div className="container mx-auto px-4 md:px-0">
          <p className="text-xl text-center">اطلاعات کاربری</p>
          <div className="flex flex-col gap-y-6 md:gap-y-8 relative pb-4">
            {user.avatar === null ? (
              <>
                <button className="w-full flex items-center justify-center">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer relative"
                  >
                    <Image
                      src={
                        avatarPreview === ""
                          ? "/assets/profile.png"
                          : avatarPreview
                      }
                      alt="Avatar"
                      className="size-24 rounded-full my-4"
                      width={1000}
                      height={1000}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setAvatarFile(e.target.files[0]);
                          setAvatarPreview(
                            URL.createObjectURL(e.target.files[0])
                          );
                        }
                      }}
                      className="hidden"
                      id="file-upload"
                    />

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2.4em"
                      height="2.4em"
                      viewBox="0 0 24 24"
                      className="absolute right-0 bottom-2 bg-primary text-zinc-100 dark:text-zinc-800 p-1.5 rounded-2xl"
                    >
                      <path
                        fill="currentColor"
                        d="M22 12.698c-.002 1.47-.013 2.718-.096 3.743c-.097 1.19-.296 2.184-.74 3.009a4.2 4.2 0 0 1-.73.983c-.833.833-1.893 1.21-3.237 1.39C15.884 22 14.2 22 12.053 22h-.106c-2.148 0-3.83 0-5.144-.177c-1.343-.18-2.404-.557-3.236-1.39c-.738-.738-1.12-1.656-1.322-2.795c-.2-1.12-.236-2.512-.243-4.241Q1.999 12.737 2 12v-.054c0-2.148 0-3.83.177-5.144c.18-1.343.557-2.404 1.39-3.236s1.893-1.21 3.236-1.39c1.168-.157 2.67-.175 4.499-.177a.697.697 0 1 1 0 1.396c-1.855.002-3.234.018-4.313.163c-1.189.16-1.906.464-2.436.994S3.72 5.8 3.56 6.99C3.397 8.2 3.395 9.788 3.395 12v.784l.932-.814a2.14 2.14 0 0 1 2.922.097l3.99 3.99a1.86 1.86 0 0 0 2.385.207l.278-.195a2.79 2.79 0 0 1 3.471.209l2.633 2.37c.265-.557.423-1.288.507-2.32c.079-.972.09-2.152.091-3.63a.698.698 0 0 1 1.396 0"
                      />
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M17.5 11c-2.121 0-3.182 0-3.841-.659S13 8.621 13 6.5s0-3.182.659-3.841S15.379 2 17.5 2s3.182 0 3.841.659S22 4.379 22 6.5s0 3.182-.659 3.841S19.621 11 17.5 11m2.212-6.712a.983.983 0 0 1 0 1.39l-.058.058a.24.24 0 0 1-.211.067a1.6 1.6 0 0 1-.81-.436a1.6 1.6 0 0 1-.436-.81a.24.24 0 0 1 .067-.211l.058-.058a.983.983 0 0 1 1.39 0M17.35 8.04a3 3 0 0 1-.296.279a1.6 1.6 0 0 1-.303.187c-.09.043-.188.076-.381.14l-1.021.34a.265.265 0 0 1-.335-.335l.34-1.02c.064-.194.097-.291.14-.382q.077-.163.187-.303c.062-.08.134-.152.279-.296l1.799-1.799c.043-.043.118-.023.138.035a1.98 1.98 0 0 0 1.217 1.217c.058.02.078.095.035.138z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>
                </button>
              </>
            ) : (
              <>
                <button className="w-full flex items-center justify-center">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer relative"
                  >
                    <Image
                      src={
                        avatarPreview === ""
                          ? `${process.env.API_URL}/${user?.avatar}`
                          : avatarPreview
                      }
                      alt="Avatar"
                      className="size-24 rounded-full my-4"
                      width={1000}
                      height={1000}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setAvatarFile(e.target.files[0]);
                          setAvatarPreview(
                            URL.createObjectURL(e.target.files[0])
                          );
                        }
                      }}
                      className="hidden"
                      id="file-upload"
                    />

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2.4em"
                      height="2.4em"
                      viewBox="0 0 24 24"
                      className="absolute right-0 bottom-2 bg-primary text-zinc-100 dark:text-zinc-800 p-1.5 rounded-2xl"
                    >
                      <path
                        fill="currentColor"
                        d="M22 12.698c-.002 1.47-.013 2.718-.096 3.743c-.097 1.19-.296 2.184-.74 3.009a4.2 4.2 0 0 1-.73.983c-.833.833-1.893 1.21-3.237 1.39C15.884 22 14.2 22 12.053 22h-.106c-2.148 0-3.83 0-5.144-.177c-1.343-.18-2.404-.557-3.236-1.39c-.738-.738-1.12-1.656-1.322-2.795c-.2-1.12-.236-2.512-.243-4.241Q1.999 12.737 2 12v-.054c0-2.148 0-3.83.177-5.144c.18-1.343.557-2.404 1.39-3.236s1.893-1.21 3.236-1.39c1.168-.157 2.67-.175 4.499-.177a.697.697 0 1 1 0 1.396c-1.855.002-3.234.018-4.313.163c-1.189.16-1.906.464-2.436.994S3.72 5.8 3.56 6.99C3.397 8.2 3.395 9.788 3.395 12v.784l.932-.814a2.14 2.14 0 0 1 2.922.097l3.99 3.99a1.86 1.86 0 0 0 2.385.207l.278-.195a2.79 2.79 0 0 1 3.471.209l2.633 2.37c.265-.557.423-1.288.507-2.32c.079-.972.09-2.152.091-3.63a.698.698 0 0 1 1.396 0"
                      />
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M17.5 11c-2.121 0-3.182 0-3.841-.659S13 8.621 13 6.5s0-3.182.659-3.841S15.379 2 17.5 2s3.182 0 3.841.659S22 4.379 22 6.5s0 3.182-.659 3.841S19.621 11 17.5 11m2.212-6.712a.983.983 0 0 1 0 1.39l-.058.058a.24.24 0 0 1-.211.067a1.6 1.6 0 0 1-.81-.436a1.6 1.6 0 0 1-.436-.81a.24.24 0 0 1 .067-.211l.058-.058a.983.983 0 0 1 1.39 0M17.35 8.04a3 3 0 0 1-.296.279a1.6 1.6 0 0 1-.303.187c-.09.043-.188.076-.381.14l-1.021.34a.265.265 0 0 1-.335-.335l.34-1.02c.064-.194.097-.291.14-.382q.077-.163.187-.303c.062-.08.134-.152.279-.296l1.799-1.799c.043-.043.118-.023.138.035a1.98 1.98 0 0 0 1.217 1.217c.058.02.078.095.035.138z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>
                </button>
              </>
            )}

            <Input
              type="text"
              label="اسم*"
              variant="bordered"
              color="primary"
              className="w-full"
              defaultValue={user.first_name}
              ref={firstNameRef}
              placeholder="الزامی"
            />
            <Input
              type="text"
              label="فامیل*"
              variant="bordered"
              color="primary"
              className="w-full"
              defaultValue={user.last_name}
              ref={lastNameRef}
              placeholder="الزامی"
            />
            <Input
              dir="rtl"
              type="tel"
              label="شماره موبایل"
              variant="bordered"
              color="primary"
              className="w-full"
              disabled
              defaultValue={toPersianNumber(user.mobile)}
            />
            <Input
              type="text"
              label="آدرس"
              variant="bordered"
              color="primary"
              className="w-full"
              defaultValue={user.address}
              ref={addressRef}
              placeholder="اختیاری"
            />
            <Input
              type="text"
              label="ایمیل"
              variant="bordered"
              color="primary"
              className="w-full"
              defaultValue={user.email}
              ref={emailRef}
              placeholder="اختیاری"
            />

            <Button
              variant="solid"
              className="w-full rounded-full text-lg shadow-lg bg-primary dark:bg-default text-white"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? "در حال بارگذاری" : "ثبت"}
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="dark:bg-gradiant min-h-screen">
        <div
          className={
            (user.first_name === "" || user.last_name === "") && step === 0
              ? "blur-sm"
              : ""
          }
        >
          <Header isOpen={isOpenHeader} setOpen={setOpenHeader} user={user} />
        </div>

        {user.first_name === "" || user.last_name === "" ? (
          <>
            {step === 0 ? (
              <>
                <div className="flex flex-col items-center justify-center gap-y-4 fixed inset-0 text-center z-20">
                  <p className="text-xl leading-8">
                    لطفا برای استفاده از امکانات اپلیکیشن پروفایلتون رو{" "}
                    <span className="text-primary">تکمیل</span> کنید{" "}
                    <span className="text-rose-500/60">3{">"}</span>
                  </p>
                  <div className="px-10 w-full">
                    <Button
                      onPress={() => setStep(1)}
                      fullWidth
                      color="primary"
                      className="font-bold"
                    >
                      برو بریم
                    </Button>
                  </div>
                </div>
                <div className="blur-md">
                  <div className="flex items-center">
                    <div className="mx-auto rounded-3xl my-4 bg-gradient-to-r from-zinc-800 to-zinc-900 flex flex-col gap-y-4 items-center p-4">
                      <img src="/assets/profile/v2.svg" alt="x" />
                      <span className="text-lg">۵</span>
                      <span className="text-lg">سفارش ثبت شده</span>
                    </div>
                    <div className="mx-auto rounded-3xl my-4 bg-gradient-to-r from-zinc-800 to-zinc-900 flex flex-col gap-y-4 items-center p-4">
                      <img src="/assets/profile/v1.svg" alt="y" />
                      <span className="text-lg">20</span>
                      <span className="text-lg">سفارش ثبت شده</span>
                    </div>
                  </div>
                  <div className="mt-10 flex flex-col gap-4">
                    <Orderinfo />
                    <Orderinfo />
                  </div>
                </div>
              </>
            ) : (
              <>{renderUserInfo()}</>
            )}
          </>
        ) : (
          <>{renderUserInfo()}</>
        )}

        <Footer />

        <HamburgerMenu
          isOpen={isOpenHeader}
          menuItems={menuItems}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      </div>
    </>
  );
}
