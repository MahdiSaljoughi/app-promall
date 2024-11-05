import { motion } from "framer-motion";
import MenuItem from "./MenuItem";
import { usePathname, useRouter } from "next/navigation";
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

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  menuItems,
  activeItem,
  setActiveItem,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = (item: MenuItemType) => {
    setActiveItem(item.label); // Update active item state
    router.push(item.path); // Navigate to the corresponding path without reloading
  };

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

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      className="fixed self-center inset-y-0 rounded-l-xl right-0 w-3/4 bg-white/10 drop-shadow-2xl shadow-2xl shadow-black/50 backdrop-blur-3xl flex flex-col items-center z-40"
    >
      <ul className="flex flex-col gap-4 w-full p-4">
        {menuItems.map((item, index) => (
          <Link href={item.path} key={index}>
            <MenuItem
              label={item.label}
              icon={item.icon}
              activeIcon={item.activeIcon}
              isActive={pathname === item.path}
              onClick={() => handleMenuClick(item)}
              index={index}
            />
          </Link>
        ))}
      </ul>
    </motion.div>
  );
};

export default HamburgerMenu;
