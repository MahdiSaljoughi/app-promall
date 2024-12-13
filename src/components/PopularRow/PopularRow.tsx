import { ChevronLeft } from "lucide-react";
import ShopCard from "../ui/shop-card/shop-card";
import Link from "next/link";

export default function PopularRow({ items }) {
  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between items-center">
          <p>فروشگاه های فعال</p>
          <Link href={"/shops"} className="flex items-center">
            <span>همه</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="mb-0.5"
            >
              <path
                fill="currentColor"
                d="m8.165 11.63l6.63-6.43C15.21 4.799 16 5.042 16 5.57v12.86c0 .528-.79.771-1.205.37l-6.63-6.43a.5.5 0 0 1 0-.74"
              ></path>
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item: any, index: any) => (
            <Link href={"/shops"} key={index} className="block">
              <ShopCard
                imageSrc={item.imageSrc}
                title={item.title}
                subtitle={item.subtitle}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
