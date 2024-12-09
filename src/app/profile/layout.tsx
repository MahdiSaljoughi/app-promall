"use client";

import Header from "@/components/Profile/Header/Header";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IUser } from "@/types/interfaces";
import {
  MdOutlineSpaceDashboard,
  MdSpaceDashboard,
  MdViewCarousel,
} from "react-icons/md";
import { HiOutlineSupport, HiSupport } from "react-icons/hi";
import { PiCat, PiCatFill } from "react-icons/pi";
import { TbPaint, TbPaintFilled } from "react-icons/tb";
import Footer from "@/components/Footer/Footer";
import HamburgerMenu from "@/components/Profile/HamburgerMenu/HamburgerMenu";
<<<<<<< HEAD
import { usePathname } from "next/navigation";
=======
>>>>>>> 920b57d7d733d4949c99092b458390ed4130fa69

interface MenuItemType {
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  path: string;
}

export default function LayoutProfile({ children }) {
  const { data: session } = useSession();
  const [user, setUser] = useState<IUser | null>(null);
  const [isOpenHeader, setOpenHeader] = useState(false);
  const [activeItem, setActiveItem] = useState("پروفایل");
<<<<<<< HEAD
  const pathname = usePathname();
=======
>>>>>>> 920b57d7d733d4949c99092b458390ed4130fa69

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
  }, [session]);

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
      path: "/profile/registred-orders",
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
<<<<<<< HEAD
      path: "/profile/create-shop",
=======
      path: "/create-shop",
>>>>>>> 920b57d7d733d4949c99092b458390ed4130fa69
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
<<<<<<< HEAD
      {pathname !== "/profile/create-shop" && (
        <Header
          isOpen={isOpenHeader}
          setOpen={setOpenHeader}
          user={user}
          session={session}
        />
      )}

      <>{children}</>

      {pathname !== "/profile/create-shop" && (
        <>
          <Footer />

          <HamburgerMenu
            isOpen={isOpenHeader}
            menuItems={menuItems}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </>
      )}
=======
      <Header
        isOpen={isOpenHeader}
        setOpen={setOpenHeader}
        user={user}
        session={session}
      />

      <>{children}</>

      <Footer />

      <HamburgerMenu
        isOpen={isOpenHeader}
        menuItems={menuItems}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
>>>>>>> 920b57d7d733d4949c99092b458390ed4130fa69
    </>
  );
}