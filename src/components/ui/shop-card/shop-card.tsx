import Image from "next/image";
import { Bookmark } from "lucide-react";
import { HiBadgeCheck } from "react-icons/hi";

interface ShopCardProps {
  imageSrc: string;
  title: string;
  subtitle: string;
}

export default function shopcard({ imageSrc, title, subtitle }: ShopCardProps) {
  return (
    <>
      <div className="flex items-center bg-sky-50 dark:bg-gradient-to-br from-[#202426] to-[#000000] rounded-3xl gap-x-3 gap-y-3 w-full shadow-sm dark:shadow-[0px_1px_27px_3px_#000000]">
        <div className="flex-shrink-0 w-28 h-28 overflow-hidden dark:shadow-2xl">
          <Image
            src={imageSrc}
            alt={title}
            className="w-full h-full rounded-3xl object-cover dark:shadow-2xl dark:backdrop-blur-3xl scale-90"
            height={1000}
            width={1000}
          />
        </div>
        <div className="flex flex-col justify-center ml-4 flex-grow">
          <div className="flex flex-row">
            <p className="text-large font-bold">{title}</p>
            <span> &#160;&#160;</span>
            <HiBadgeCheck strokeWidth={0.5} color="white" size={20} />
          </div>
          <p className="text-sm text-default-500">{subtitle}</p>
        </div>
        <Bookmark
          className="ml-4 text-primary"
          fill="currentColor"
          strokeWidth={1.1}
        />
      </div>
    </>
  );
}
