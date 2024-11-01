import { Button } from "@nextui-org/button";
import Image from "next/image";
import shoe from "../../../public/assets/shoes-1.png";

export default function HeadBanner() {
  return (
    <>
      <div
        className="mx-4 max-h-32 relative dark:shadow-2xl dark:drop-shadow-2xl rounded-2xl border dark:border-none shadow-lg"
        dir="ltr"
      >
        <div className="grid grid-cols-6 grid-rows-6 gap-4 h-32 rounded-2xl !ease-soft-spring !duration-500 will-change-auto from-[#202426] to-[#000000] dark:shadow-[0px_1px_20px_1px_#000000] ">
          <div className="col-span-2 row-span-6 col-start-5">
            <Image
              src={shoe}
              alt="Logo"
              height={200}
              width={200}
              className="rounded-lg object-cover z-50 h-[11rem] absolute -rotate-45 right-[-2rem] bottom-[-30px] saturate-0 drop-shadow-lg"
            />
          </div>
          <div className="col-span-4 col-start-1 row-start-2 text-center ">
            Nike Adapt 2.0
          </div>
          <div className="col-span-2 col-start-2 row-start-5 relative flex items-center justify-center">
            <Button
              variant="solid"
              color="primary"
              size="sm"
              className="absolute top-[-8px] transform transition-transform duration-300 bg-primary text-white py-2 px-4 rounded-2xl active:shadow-none "
            >
              <span className="font-bold text-primary-foreground">چند ؟</span>
            </Button>
          </div>
          <div className="col-span-4 col-start-1 row-start-3 text-center mt-1">
            ( : به نظرت بعد تخفیف چند
          </div>
        </div>
      </div>
    </>
  );
}
