"use client";

import Orderinfo from "./Orderinfo";
import { motion } from "framer-motion";

export default function RegistredOrders() {
  const dataInfo = ["order1", "order2", "order3"];

  return (
    <>
      <motion.div className="min-h-screen">
        <motion.p className="text-center text-xl">سفارشات ثبت شده</motion.p>
        <motion.div className="mt-10 flex flex-col gap-4">
          {dataInfo?.map((order, index) => (
            <div key={index}>
              <Orderinfo />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
