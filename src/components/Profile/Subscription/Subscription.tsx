"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import imgSub from "../../../../public/assets/sub.png";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Subscription() {
  const router = useRouter();
  const handleNavigation = () => {
    router.push("/profile/subscription/plans")
  }
  const Answers = [
    "مدیریت آسان شاپ",
    "به راحتی سفارش مشتریات رو هندل کن !",
    "    به راحتی سفارش مشتریات رو هندل کن",
  ];

  return (
    <motion.div className="subscription  overflow-x-hidden  flex flex-col items-center min-h-screen  " 
      >
      <motion.div className="img-subscription z-10  relative w-full  ">
        <Image
          src={imgSub}
          alt="img-subscription"
          className=" rounded-b-3xl object-cover h-80 "
        />
      </motion.div>
      <motion.div className="text-plan  fix text-center  bg-black/30 backdrop-blur-sm  mx-auto rounded-2xl absolute top-64 mt-4 px-32 py-6 z-40 ">
        <motion.p className="text-[#FFFFFF] text-lg font-semibold    ">
          اشتراک
        </motion.p>
      </motion.div>
      <motion.div className=" question-panel mt-20 w-full  ">
        <div className="h-[330px] bg-order-gradient rounded-2xl w-5/6  mx-auto flex flex-col items-center gap-8 p-3 shadow-ticket drop-shadow-ticket">
          <motion.h2 className="text-[#D8D3D3] text-lg font-semibold">
            حالا چرا پلن پرو ؟
          </motion.h2>
          <motion.div className="answer flex flex-col justify-center items-start gap-3 text-sm tracking-wider">
            {Answers?.map((answers, index) => (
              <motion.p key={index}>{answers}</motion.p>
            ))}
          </motion.div>
        </div>
      </motion.div >

      {/* <Link   passHref  className="lets-go "> */}
      <Button onClick={() => handleNavigation()} className="fixed bg-[#AED4FC]  text-[#000000] bottom-10 inset-x-0 flex justify-center items-center text-center py-6 mx-5 rounded-full z-40">
        <motion.span className="text-center font-semibold ">
          {" "}
          برو بریم !
        </motion.span>
      </Button>
      {/* </Link> */}
    </motion.div>
  );
}


