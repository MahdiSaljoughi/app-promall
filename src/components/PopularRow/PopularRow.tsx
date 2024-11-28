import { ChevronLeft } from "lucide-react";
import ShopCard from "../ui/shop-card/shop-card";
import Link from "next/link";

export default function PopularRow({ items }) {
  return (
    <>
      <div className="flex flex-col mx-4 md:mx-0">
        <div className="flex justify-between items-center">
          <p>این فروشگاه ها فعال ترن !!</p>
          <Link href={"/shops"} className="inline-flex items-center font-bold">
            <p className="text-sm">همش</p>
            <ChevronLeft size={20} strokeWidth={1.75} />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item: any, index: any) => (
            <Link href={"/shop-page"} key={index} className="block">
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
