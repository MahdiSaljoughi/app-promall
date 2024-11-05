"use client";

import BackgroundGradientDemo from "@/components/OrderCheckCard/OrderCheckCard";
import SliderNumber from "@/components/ui/image-autoscroll/slider-num";
import { SearchBar } from "@/components/ui/search-bar/search-bar";
import { StaticImageData } from "next/image";
import React, { useState } from "react";
import lv from "../../../public/assets/balenciaga.png";
import dior2 from "../../../public/assets/dior2.jpg";
import ch from "../../../public/assets/justdoit.png";
import amiri from "../../../public/assets/package-slider/amiri.png";
import gucci from "../../../public/assets/package-slider/gucci.png";
import ivsnt from "../../../public/assets/package-slider/ivs.png";
import lvnew from "../../../public/assets/package-slider/lvnew.png";
import nikedontstop from "../../../public/assets/package-slider/nikeair.png";

type Item = {
  imageSrc: StaticImageData;
  width: number;
};

export default function PackageCheck() {
  const items: Item[] = [
    // { imageSrc: dior, width: 100 },
    { imageSrc: dior2, width: 100 },
    { imageSrc: nikedontstop, width: 100 },
    { imageSrc: ch, width: 100 },
    { imageSrc: amiri, width: 100 },
    { imageSrc: ivsnt, width: 100 },
    { imageSrc: lv, width: 100 },
    { imageSrc: lvnew, width: 100 },
    // { imageSrc: nike3, width: 100 },
    { imageSrc: gucci, width: 100 },
  ];

  const randomizeItems = (items: Item[]): Item[] => {
    return items
      .map((item) => ({ ...item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ sort, ...item }) => item);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const sliderItems: Item[][] = Array(6)
    .fill(null)
    .map(() => randomizeItems(items));

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
      <div className="md:container md:mx-auto">
        <div className="fixed -top-28 -bottom-28 w-full flex flex-col gap-3">
          {sliderItems.map((sliderItem, index) => (
            <SliderNumber
              key={index}
              items={sliderItem}
              animateRight={index % 2 !== 0}
            />
          ))}
        </div>
        <div className="fixed inset-0 dark:bg-black/70 bg-sky-300/20" />
        <div className="md:min-h-screen">
          <div className="fixed inset-0 flex h-screen w-full items-center justify-center">
            <div className="text-white text-center w-[95%] md:w-[60%] mx-auto self-center bg-white/[0.07] backdrop-blur-2xl shadow-black/35 drop-shadow-[1000px] shadow-2xl p-8 rounded-3xl">
              <p className="text-[30px] font-bold mb-6">سفارشم کووو ؟</p>
              <SearchBar
                placeholders={["شماره سفارشتو بده تا ببینم کجاس .."]}
                onChange={handleChange}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center dark:bg-black bg-opacity-50 z-40">
            <BackgroundGradientDemo onClose={closeModal} />
          </div>
        )}
      </div>
    </>
  );
}
