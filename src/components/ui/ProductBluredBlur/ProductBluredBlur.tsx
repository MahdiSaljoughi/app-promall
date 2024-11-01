import { Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function ProductBluredBlur({
  imageSrc,
  title,
  price,
  describe,
}) {
  return (
    <>
      <motion.div
        className="relative h-max w-[10rem] bg-gradient-to-br bg-sky-100/50 dark:from-[#202426] dark:to-[#000000] rounded-3xl transition-transform duration-500 ease-out dark:hover:shadow-xl cursor-pointer "
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => console.log("item pressed")}
        dir="ltr"
      >
        <div className="p-3 ">
          <Image
            alt={title}
            className="w-[136px] object-cover rounded-3xl h-[136px] shadow-xl dark:shadow-black"
            src={imageSrc}
          />
        </div>
        <div className="text-small mb-2 flex flex-col items-center px-4 w-full pb-2">
          <div className="grid grid-cols-2 grid-rows-3 self-center w-full h-[6rem]">
            <div className="col-span-2 text-md">
              <div className="flex flex-col items-center justify-center">
                <p className="text-medium z-50">{title}</p>
                <p className="text-sm text-default-500"> {describe}</p>
              </div>
            </div>
            <div className="col-span-2 row-start-2 text-small text-default-500 "></div>
            <div className="row-start-3 self-center font-bold">
              <div className="flex flex-row gap-1">
                <p className="text-small text-default-500">ت</p>
                <p className="text-md ">{price}</p>
              </div>
            </div>
            <div className="row-start-3 flex justify-end ">
              <button
                className="relative rounded-[12px]  align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] text-xs bg-primary text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
                data-twe-ripple-init
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <Plus
                    size={20}
                    strokeWidth={1.75}
                    className="text-primary-foreground"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
