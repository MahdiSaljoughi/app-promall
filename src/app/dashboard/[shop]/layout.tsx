"use client";

import {
  MdOutlineSpaceDashboard,
  MdSpaceDashboard,
  MdViewCarousel,
} from "react-icons/md";
import { HiOutlineSupport, HiSupport } from "react-icons/hi";
import { PiCat, PiCatFill } from "react-icons/pi";
import { TbPaint, TbPaintFilled } from "react-icons/tb";
import Footer from "@/components/Footer/Footer";
import HamburgerMenu from "@/components/Dashboard/HamburgerMenu/HamburgerMenu";
import Header from "@/components/Dashboard/Header/Header";
import { useParams } from "next/navigation";
import { useState } from "react";

interface MenuItemType {
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  path: string;
}

export default function LayoutProfile({ children }) {
  const [isOpen, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("داشبورد");

  const { shop } = useParams();

  const menuItems: MenuItemType[] = [
    {
      label: "ویرایش فروشگاه",
      icon: <MdOutlineSpaceDashboard size={28} />,
      activeIcon: <MdSpaceDashboard size={28} />,
      path: `/dashboard/${shop}/edit-shop`,
    },
    {
      label: "محصولات",
      icon: <MdOutlineSpaceDashboard size={28} />,
      activeIcon: <MdSpaceDashboard size={28} />,
      path: `/dashboard/${shop}/products`,
    },
    {
      label: "سفارشات",
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
    <div className="min-h-screen lg:p-20">
      <div className="lg:border dark:border-zinc-700 rounded-3xl p-4">
        <div className="mb-4">
          <Header isOpen={isOpen} setOpen={setOpen} shopId={shop} />
        </div>
        <>{children}</>
      </div>

      {/* <Footer /> */}

      <HamburgerMenu
        isOpen={isOpen}
        menuItems={menuItems}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
    </div>
  );
}
