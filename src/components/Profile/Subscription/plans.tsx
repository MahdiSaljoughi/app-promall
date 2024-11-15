"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Plan from "./Plan";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useSession } from "next-auth/react";

const plans = [
  { name: "7 روزه", price: "رایگان", discount: "", id: "free" },
  { name: "ماهانه", price: "200000 ریال", discount: "", id: "monthly" },
  {
    name: "شش ماهه",
    price: "200000 ریال",
    discount: "یک ماه رایگان",
    id: "six-month",
  },
  {
    name: "سالانه",
    price: "200000 ریال",
    discount: "سه ماه رایگان",
    id: "yearly",
  },
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
    console.log("plan");
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
      <motion.div
        className="flex flex-col container mx-auto"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={slideVariants}
        transition={{ duration: 0.4 }}
      >
        <Image
          src={"/assets/subscripton.png"}
          alt="img-subscription"
          className="rounded-b-2xl object-cover w-full h-64"
          width={1000}
          height={1000}
        />

        <p className="mx-4 md:mx-0 text-lg -mt-10 font-semibold tracking-wider text-center bg-black/30 backdrop-blur-sm rounded-2xl px-32 py-6">
          پلن
        </p>

        <div className="my-8 px-4 md:px-0">
          {plans?.map((plan) => (
            <div key={plan.id} className="my-4 w-full">
              {plan?.discount && (
                <div className="bg-[#AED4FC] text-zinc-600 text-center rounded-t-2xl text-sm font-semibold">
                  {plan.discount}
                </div>
              )}
              <Button
                onPress={() => handleSelect(plan?.id)}
                fullWidth
                className="p-4 py-10 rounded-2xl bg-order-gradient w-full shadow-ticket drop-shadow-ticket border-primary focus:border"
              >
                <Plan name={plan.name} price={plan.price} />
              </Button>
            </div>
          ))}
        </div>

        <div className="px-4 md:px-0">
          <Button onPress={() => postPlan()} color="primary" fullWidth>
            <motion.span className="text-center font-semibold">
              برو بریم !
            </motion.span>
          </Button>
        </div>
      </motion.div>
    </>
  );
}
