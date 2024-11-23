"use client";

import { useState } from "react";
import BackgroundGradientDemo from "@/components/OrderCheckCard/OrderCheckCard";
import { SearchBar } from "../ui/search-bar/search-bar";

export default function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsModalOpen(true);
    console.log("submitted");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-white text-center w-[95%] md:w-[60%] mx-auto self-center bg-white/[0.07] backdrop-blur-2xl shadow-black/35 drop-shadow-[1000px] shadow-2xl p-8 rounded-3xl">
          <p className="text-[30px] font-bold mb-6">سفارشم کووو ؟</p>
          <SearchBar
            placeholders={["شماره سفارشتو بده تا ببینم کجاس .."]}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center dark:bg-black bg-opacity-50 z-40">
          <BackgroundGradientDemo onClose={closeModal} />
        </div>
      )}
    </>
  );
}
