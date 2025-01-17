import { motion } from "framer-motion";
import React from "react";

interface MenuItemProps {
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  icon,
  activeIcon,
  isActive,
  onClick,
  index,
}) => {
  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300 },
    },
    clicked: {
      scale: 0.95,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <>
      <motion.li
        className={`text-lg w-full relative cursor-pointer ${
          isActive ? "font-bold" : ""
        }`}
        onClick={onClick}
        variants={itemVariants}
        custom={index}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="clicked"
      >
        {isActive && (
          <div className="absolute inset-0 dark:bg-white/20 backdrop-blur-md rounded-lg -z-10 scale-105" />
        )}
        <div className="flex flex-row justify-between items-center py-3">
          <span>{label}</span>
          {isActive ? activeIcon : icon}
        </div>
      </motion.li>
    </>
  );
};

export default MenuItem;
