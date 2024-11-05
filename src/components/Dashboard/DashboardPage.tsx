"use client";

import { useSession } from "next-auth/react";
import ChartSection from "@/components/Dashboard/ChartSection";
import DashboardGrid from "@/components/Dashboard/DashboardGrid";
import HamburgerMenu from "@/components/Dashboard/HamburgerMenu/HamburgerMenu";
import Header from "@/components/Dashboard/Header/Header";
import PopularProductsSection from "@/components/Dashboard/PopularProductsSection";
import StatRow from "@/components/Dashboard/StatRow";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
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
import { Spinner } from "@nextui-org/react";

interface MenuItemType {
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  path: string;
}

interface Shop {
  id: string;
  name: string;
  avatar: string;
  detail: any;
  shopCategories: any;
}

export default function DashboardPage({ shopId }) {
  const { data: session } = useSession();

  const [isOpen, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("داشبورد");
  const [shop, setShop] = useState<Shop | undefined>(undefined);

  async function fetchShop() {
    if (shopId === null) {
      return;
    }

    try {
      const response = await fetch(`${process.env.API_URL}/shop/${shopId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.user?.access_token}`,
        },
      });

      if (response.ok) {
        const shop = await response.json();
        setShop(shop.data);
      } else {
        console.log("Failed to fetch shop data:", response.statusText);
      }
    } catch (error) {
      console.log("Error fetching shop data:", error);
    }
  }

  useEffect(() => {
    if (session?.user?.access_token) {
      fetchShop();
    }
  }, [session?.user?.access_token, shopId]);

  const menuItems: MenuItemType[] = [
    {
      label: "ویرایش فروشگاه",
      icon: <MdOutlineSpaceDashboard size={28} />,
      activeIcon: <MdSpaceDashboard size={28} />,
      path: "/dashboard/edit-shop",
    },
    {
      label: "محصولات",
      icon: <MdOutlineSpaceDashboard size={28} />,
      activeIcon: <MdSpaceDashboard size={28} />,
      path: `/dashboard/products?shop-id=${shopId}`,
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

  return (
    <>
      <div className="dark:bg-gradient">
        {session?.user.access_token ? (
          <>
            <div className="hidden md:block">
              <p>shop id = {shopId}</p>
            </div>

            {/* mobile */}
            <div className="py-4 md:hidden">
              <Header
                isOpen={isOpen}
                setOpen={setOpen}
                user={session?.user}
                shopName={shop ? shop.name : ""}
                shopAvatar={
                  shop
                    ? `${process.env.API_URL}${shop.avatar}`
                    : "/assets/profile.png"
                }
              />

              <HamburgerMenu
                isOpen={isOpen}
                menuItems={menuItems}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />

              <StatRow stats={stats} />

              <ChartSection />

              <DashboardGrid />

              {/* <PopularProductsSection items={popularItems} /> */}

              {/* <Footer /> */}
            </div>
          </>
        ) : (
          <>
            <div className="w-screen h-screen flex items-center justify-center">
              <Spinner
                size="lg"
                color="primary"
                labelColor="primary"
                label="در حال برسی..."
                classNames={{ label: "mt-4" }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
