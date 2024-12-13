"use client";

import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

// Define the component props type
type SliderNumberProps = {
  items: {
    imageSrc: StaticImageData; // Path to the image
    width: number; // Width for each image item
    // Width for each image item
  }[];
  animateRight: boolean;
};

// SliderNumber component definition
const SliderNumber = ({ items, animateRight }: SliderNumberProps) => {
  // Duplicate the items array to ensure seamless looping
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden h-44 -rotate-12 w-[100rem] right-[-100px] left-[-100px]">
      <motion.div
        className="flex h-full gap-2"
        animate={{
          x: animateRight ? ["0%", "100%"] : ["100%", "0%"],
          transition: {
            ease: "linear",
            duration: 450,
            repeat: Infinity,
          },
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="flex-none h-full"
            style={{ width: `${item.width}px` }}
          >
            <Image
              src={item.imageSrc}
              alt={`Slide ${index}`}
              className="grayscale rounded-lg h-full object-fill w-full"
              priority
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SliderNumber;
