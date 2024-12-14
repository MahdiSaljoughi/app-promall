"use client";

import Orderinfo from "./Orderinfo";

export default function RegistredOrders() {
  const dataInfo = ["order1", "order2", "order3"];

  return (
    <>
      <p className="text-center text-xl">سفارشات ثبت شده</p>
      <div className="pt-6 pb-10 flex flex-col gap-4">
        {dataInfo.map((o, index) => (
          <div key={index}>
            <Orderinfo />
          </div>
        ))}
      </div>
    </>
  );
}
