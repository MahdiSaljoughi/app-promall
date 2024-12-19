import Image from "next/image";
import Chanel from "../../../public/assets/chanel.jpg";
import Dior from "../../../public/assets/dior-home.png";
import NikeImage3 from "../../../public/assets/nike3.png";
import { HoverBorderGradient } from "../ui/button-gradiant/button-gradiant";

export default function ImageGridMain() {
  return (
    <>
      <div
        className="grid grid-cols-2 grid-rows-6 gap-2 mt-7 mx-5 h-80"
        dir="ltr"
      >
        <div className="row-span-4 bg-red-600 card">
          <Image
            src={Dior}
            alt={`${Dior}`}
            className="w-full h-full card  shadow-2xl object-cover"
            quality={100}
          />
        </div>
        <div className="row-span-5 bg-red-600 card">
          <Image
            src={NikeImage3}
            alt={`${NikeImage3}`}
            className="w-full h-full card shadow-2xl object-cover"
            quality={100}
          />
        </div>
        <div className="row-span-2 row-start-5">
          <Image
            src={Chanel}
            alt={`${Chanel}`}
            className="w-full h-full card  shadow-2xl object-cover"
          />
        </div>
        <div className="row-span-1 col-start-2 row-start-6 flex justify-center text-center">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2  px-7 py-3  shadow-2xl"
          >
            <span>همه فروشگاه ها</span>
          </HoverBorderGradient>
        </div>
      </div>
    </>
  );
}
