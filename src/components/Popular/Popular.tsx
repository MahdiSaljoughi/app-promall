import Link from "next/link";
import ProductBluredBlur from "../ui/ProductBluredBlur/ProductBluredBlur";
import { ChevronLeft } from "lucide-react";

export default function Popular({
  items,
}: {
  items: {
    imageSrc: string;
    title: string;
    price: string;
    backImgSrc: string;
    id: number;
    shop: string;
  }[];
}) {
  return (
    <>
      <div className="mx-4 z-10">
        <div className="flex justify-between mb-4 cursor-default">
          <span>پررر طرفدارر</span>
          <Link
            href={"/shop"}
            className="flex items-center text-primary font-bold"
          >
            <span className="text-sm">همش</span>
            <ChevronLeft size={20} strokeWidth={1.75} />
          </Link>
        </div>

        <div className="overflow-x-auto flex gap-2 no-scrollbar">
          {items.map((item) => (
            <div className="mx-1 my-2" key={item.id}>
              <Link href={"/shop/1"} key={item.id}>
                <ProductBluredBlur
                  imageSrc={item.imageSrc}
                  title={item.title}
                  price={item.price}
                  describe={"test"}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
