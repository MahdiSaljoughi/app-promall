import React from "react";
interface PropsPlan {
  name: string | number;
  price: string | number;

}

export default function Plan({ name, price }: PropsPlan) {

  return (

    <div

      className=" font-semibold text-lg   flex justify-between items-center w-full  "
    >
      <div className="days  ">{name}</div>
      <div className="price text-[#AED4FC]  ">{price}</div>
    </div>
  );
}
