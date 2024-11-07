"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ImgSubscription from "../../../../public/assets/subscripton.png";
import Plan from "./Plan";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useSession } from "next-auth/react";

const plans = [
  { name: '10 روزه', price: 'رایگان', discount: '', id: 'free' },
  { name: 'ماهانه', price: '200000 ریال',discount: '' , id: 'monthly' },
  { name: 'شش ماهه', price: '200000 ریال', discount: 'یک ماه رایگان' , id: 'six-month' },
  { name: 'سالانه', price: '200000 ریال', discount: 'سه ماه رایگان' ,  id: 'yearly' },
];

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState("");
  const { data: session } = useSession();

  // Handle selection change
  const handleSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  //post planId
  const postPlan = async () => {
    console.log('plan')
    // try {
    //   if (!selectedPlan) {
    //     throw new Error("Please choose a plan .");
    //   }

    //   const response = await fetch(`${process.env.API_URL}/`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${session?.user.access_token}`,
    //     },
    //     body: JSON.stringify({
    //       planId: selectedPlan
         
    //     }),
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(
    //       `Error ${response.status}: ${
    //         errorData.message || "Network response was not ok"
    //       }`
    //     );
    //   }

     
    //   setSelectedPlan("");


    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };


  const slideVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  };
  return (
    <>
      <motion.div className="subscription overflow-x-hidden   flex flex-col items-center min-h-screen  "   initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.4 }} >
        <motion.div className="img-subscription  relative "    >
          <Image
            src={ImgSubscription}
            alt="img-subscription"
            className=" rounded-b-2xl object-cover h-[260px]  "
          />
        </motion.div>
        <motion.div className="text-plan  text-center  bg-black/30 backdrop-blur-sm  mx-auto rounded-2xl absolute top-56 px-32 py-6  ">
          <motion.p className="text-[#FFFFFF] text-lg font-semibold tracking-wider  ">
            پلن
          </motion.p>
        </motion.div>

        <motion.div className="plans mt-20  w-full ">
          {
            plans?.map((plan) => (
              <div  key={plan.id}   className="mx-auto px-5 my-6  "     >
                {plan?.discount && (
                <div className="bg-[#AED4FC]  text-[#000000] text-center rounded-t-2xl w-5/6 mx-auto text-sm font-semibold  ">
                  {plan.discount}
               </div>
               ) }
                <Button  onClick={() => handleSelect(plan?.id)} className=" button-plan  mx-auto   h-20 p-4 rounded-2xl bg-order-gradient w-full shadow-ticket drop-shadow-ticket " >
                 <Plan   name={plan.name} price={plan.price}  />
                </Button>

              </div>
            ))
          }
         
        </motion.div>
        <motion.div className="lets-go "  >
          <Button  onClick={()=> postPlan()} className="fixed bg-[#AED4FC]  text-[#000000] mt-8 inset-x-0 flex justify-center items-center text-center py-6 mx-5 rounded-full z-40">
            <motion.span className="text-center font-semibold ">
              {" "}
              برو بریم !
            </motion.span>
          </Button>
        </motion.div>
      </motion.div>
    </>
  );
}

