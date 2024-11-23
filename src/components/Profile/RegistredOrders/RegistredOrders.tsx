"use client";

import { useEffect, useState } from "react";
import Orderinfo from "./Orderinfo";
import Header from "../Header/Header";
import Footer from "@/components/Footer/Footer";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import { HiOutlineSupport, HiSupport } from "react-icons/hi";
import {
  MdOutlineSpaceDashboard,
  MdSpaceDashboard,
  MdViewCarousel,
} from "react-icons/md";
import { PiCat, PiCatFill } from "react-icons/pi";
import { TbPaint, TbPaintFilled } from "react-icons/tb";
import { motion } from "framer-motion";
import { IUser } from "@/types/interfaces";

interface MenuItemType {
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  path: string;
}

export default function RegistredOrders({ session }) {
  const [isOpen, setOpen] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [activeItem, setActiveItem] = useState("داشبورد");

  const fetchUser = async () => {
    const response = await fetch(`${process.env.API_URL}/user/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    });
    if (response.ok) {
      const userData = await response.json();
      setUser(userData.data);
    }
  };

  useEffect(() => {
    if (session) {
      fetchUser();
    }
  }, [session]);

  const dataInfo = ["order1", "order2", "order3"];

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

  return (
    <>
      <motion.div className="bg-dashboard-gradient min-h-screen">
        <Header
          isOpen={isOpen}
          setOpen={setOpen}
          user={user}
          session={session}
        />

        <motion.p className="text-center text-xl">سفارشات ثبت شده</motion.p>
        <motion.div className="mt-10 flex flex-col gap-4">
          {dataInfo?.map((order, index) => (
            <div key={index}>
              <Orderinfo />
            </div>
          ))}
        </motion.div>

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
