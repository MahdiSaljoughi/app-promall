import PopularProducts from "@/components/Popular/Popular";
import { ChevronLeft } from "lucide-react";

export default function PopularProductsSection({ items }) {
  return (
    <>
      <div className=" bg-[#2d363c] backdrop-blur-3xl rounded-3xl p-4 mx-5 mt-5">
        <div className="flex flex-row justify-between">
          <p>پرفروش ترین محصولاتمون</p>
          <button className="inline-flex text-primary font-bold">
            <span className="text-sm block">همش</span>
            <ChevronLeft size={20} strokeWidth={1.75} />
          </button>
        </div>

        <PopularProducts items={items} />
      </div>
    </>
  );
}
