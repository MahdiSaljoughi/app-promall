"use client";

import { useSession } from "next-auth/react";
import ChartSection from "@/components/Dashboard/ChartSection";
import DashboardGrid from "@/components/Dashboard/DashboardGrid";
import HamburgerMenu from "@/components/Dashboard/HamburgerMenu/HamburgerMenu";
import Header from "@/components/Dashboard/Header/Header";
import PopularProductsSection from "@/components/Dashboard/PopularProductsSection";
import StatRow from "@/components/Dashboard/StatRow";
import { User } from "lucide-react";
import React, { useState } from "react";
import { HiOutlineSupport, HiSupport } from "react-icons/hi";
import { IoIosTimer } from "react-icons/io";
import {
  MdOutlineSpaceDashboard,
  MdSpaceDashboard,
  MdViewCarousel,
} from "react-icons/md";
import { PiCat, PiCatFill } from "react-icons/pi";
import { TbMoneybag, TbPaint, TbPaintFilled } from "react-icons/tb";
import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/navigation";

interface MenuItemType {
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  path: string;
}

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();

  const [isOpen, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("داشبورد");

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

  const stats = [
    {
      icon: <IoIosTimer size={32} />,
      label: "سفارشات در انتظار ارسال",
      value: "۳۰ تا",
    },
    {
      icon: <TbMoneybag size={32} />,
      label: "دخل امروز",
      value: "۳۹,۰۰۰,۰۰۰ ت",
    },
    {
      icon: <User size={32} />,
      label: "کل مشتری ها",
      value: "۳۰۰ نفر",
    },
  ];

  const popularItems = [
    {
      id: 0,
      imageSrc: "/assets/creed-absolo.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      title: "Aventus",
      price: "۲۰,۰۰۰,۰۰۰",
    },
    {
      id: 1,
      imageSrc: "/assets/creed-absolo.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      title: "Nike ",
      price: "٢۰,۰۰۰,۰۰۰",
    },
    {
      id: 2,
      imageSrc: "/assets/creed-absolo.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      title: "Nike ",
      price: "٣۰,۰۰۰,۰۰۰",
    },
    {
      id: 3,
      imageSrc: "/assets/creed-absolo.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      title: "Nike ",
      price: "٤۰,۰۰۰,۰۰۰",
    },
    {
      id: 4,
      imageSrc: "/assets/creed-absolo.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      title: "Nike ",
      price: "٥۰,۰۰۰,۰۰۰",
    },
  ];

  if (session?.user.access_token) {
    return (
      <>
        <div className="py-10">
          <div className="fixed top-0 left-0 bottom-0 w-full h-full bg-dashboard-gradient blur-sm" />
          <div className="relative z-10">
            <Header isOpen={isOpen} setOpen={setOpen} user={session.user} />
            <HamburgerMenu
              isOpen={isOpen}
              menuItems={menuItems}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
            <StatRow stats={stats} />
            <ChartSection />
            <DashboardGrid />
            <PopularProductsSection items={popularItems} />
            <Footer />
          </div>
        </div>
      </>
    );
  } else router.push("/auth");
}
