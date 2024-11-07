"use client";

import Header from "@/components/Profile/Header/Header";
import UserDetailsProfile from "@/components/Profile/UserDetailsProfile/UserDetailsProfile";
import { useEffect, useState } from "react";
import { HiOutlineSupport, HiSupport } from "react-icons/hi";
import {
  MdOutlineSpaceDashboard,
  MdSpaceDashboard,
  MdViewCarousel,
} from "react-icons/md";
import { PiCat, PiCatFill } from "react-icons/pi";
import { TbPaint, TbPaintFilled } from "react-icons/tb";
import Footer from "../Footer/Footer";
import { motion } from "framer-motion";
import Orderinfo from "./RegistredOrders/Orderinfo";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
import { useSession } from "next-auth/react";

interface User {
  id: string;
  first_name: string;
  last_name: string;
}

interface MenuItemType {
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  path: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const [user, setUser] = useState<User | undefined>(undefined);
  const [isOpen, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("داشبورد");
  const [step, setStep] = useState(0);

  async function fetchUser() {
    try {
      const response = await fetch(`${process.env.API_URL}/user/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session!.user.access_token}`,
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
  }

  useEffect(() => {
    fetchUser();
  }, [session, status]);

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
      path: "/subscription",
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

  const changeStep = () => {
    setStep(1);
  };

  return (
    <>
      <motion.div className="dark:bg-gradiant min-h-screen">
        <Header isOpen={isOpen} setOpen={setOpen} user={user} />

        {user && (user.first_name === "" || user.last_name === "") ? (
          <>
            {step === 0 ? (
              <>
                <motion.div className="flex flex-col items-center justify-center gap-y-4 fixed inset-0 text-center z-20">
                  <motion.p className="text-xl leading-8">
                    لطفا برای استفاده از امکانات اپلیکیشن پروفایلتون رو{" "}
                    <span className="text-primary">تکمیل</span> کنید{" "}
                    <span className="text-rose-500/60">3{">"}</span>
                  </motion.p>
                  <button
                    onClick={changeStep}
                    className="bg-primary px-20 py-2 text-zinc-700 font-bold rounded-3xl focus:scale-95 transition-transform"
                  >
                    برو بریم
                  </button>
                </motion.div>
                <div className="blur-sm">
                  <motion.div className="flex items-center">
                    <div className="mx-auto rounded-3xl my-4 bg-gradient-to-r from-zinc-800 to-zinc-900 flex flex-col gap-y-4 items-center p-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/assets/profile/v2.svg" alt="x" />
                      <span className="text-lg">۵</span>
                      <span className="text-lg">سفارش ثبت شده</span>
                    </div>
                    <div className="mx-auto rounded-3xl my-4 bg-gradient-to-r from-zinc-800 to-zinc-900 flex flex-col gap-y-4 items-center p-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/assets/profile/v1.svg" alt="y" />
                      <span className="text-lg">20</span>
                      <span className="text-lg">سفارش ثبت شده</span>
                    </div>
                  </motion.div>
                  <motion.div className="mt-10 flex flex-col gap-4">
                    <Orderinfo />
                    <Orderinfo />
                  </motion.div>
                </div>
              </>
            ) : (
              <>
                <UserDetailsProfile user={user} />
              </>
            )}
          </>
        ) : (
          <>{user && <UserDetailsProfile user={user} />}</>
        )}

        <Footer />

        <HamburgerMenu
          isOpen={isOpen}
          menuItems={menuItems}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      </motion.div>
    </>
  );
}
