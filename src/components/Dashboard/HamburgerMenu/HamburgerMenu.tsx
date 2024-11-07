"use client";

import { motion } from "framer-motion";
import MenuItem from "./MenuItem";
import { MdOutlineLogout } from "react-icons/md";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface MenuItemType {
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  path: string;
}

interface HamburgerMenuProps {
  isOpen: boolean;
  menuItems: MenuItemType[];
  activeItem: string;
  setActiveItem: (label: string) => void;
}

export default function HamburgerMenu({
  isOpen,
  menuItems,
  activeItem,
  setActiveItem,
}: HamburgerMenuProps) {
  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const logout = {
    label: "خروج از حساب",
    icon: <MdOutlineLogout size={28} />,
    activeIcon: <MdOutlineLogout size={28} />,
    path: "/auth",
  };

  const handleLogout = () => {
    signOut({
      redirect: true,
      callbackUrl:
        process.env.NODE_ENV !== "production"
          ? "/auth"
          : `${process.env.APP_URL}/auth`,
    });
  };

  return (
    <>
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className="fixed self-center inset-y-0 rounded-l-xl right-0 w-3/4 bg-white/10 drop-shadow-2xl shadow-2xl shadow-black/50 backdrop-blur-3xl flex flex-col items-center z-30"
      >
        <ul className="flex flex-col gap-4 w-full p-4">
          {menuItems.map((item, index) => (
            <Link href={item.path} key={index}>
              <MenuItem
                label={item.label}
                icon={item.icon}
                activeIcon={item.activeIcon}
                isActive={activeItem === item.label}
                onClick={() => setActiveItem(item.label)}
                index={index}
              />
            </Link>
          ))}
          <MenuItem
            label={logout.label}
            icon={logout.icon}
            activeIcon={logout.activeIcon}
            isActive={activeItem === logout.label}
            onClick={handleLogout}
            index={1}
          />
        </ul>
      </motion.div>
    </>
  );
}
