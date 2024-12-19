"use client";
import { Avatar } from "@nextui-org/react";

interface ImageData {
  image: string;
  isStoryAvailble: boolean;
  title: string;
}

const images: ImageData[] = [
  {
    image: "/assets/nike-logo.png",
    isStoryAvailble: true,
    title: "کفش",
  },
  {
    image: "/assets/nike-logo.png",
    isStoryAvailble: true,
    title: "مردونه",
  },
  {
    image: "/assets/nike-logo.png",
    isStoryAvailble: true,
    title: "زنونه",
  },
  {
    image: "/assets/nike-logo.png",
    isStoryAvailble: true,
    title: "عطر",
  },
];

const CategoryBar = () => {
  return (
    <div className="flex overflow-x-auto mt-6 gap-5 justify-center overflow-hidden">
      {images.map((imageData, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            key={index}
            className="flex flex-col h-18 w-18 overflow-hidden shadow-2xl justify-center  items-center p-1"
          >
            {/* <Image
              className="object-cover w-16 h-16 rounded-full ring-1 ring-gray-300 dark:ring-primary p-1"
              src={imageData.image}
              alt={"story"}
            /> */}
            {/* <Avatar
              isBordered
              color="primary"
              className="w-16 h-16 ring-1 ring-primary"
              src={imageData.image}
            /> */}
          </div>
          <p className="mt-2 text-center text-sm">{imageData.title}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;
