"use client";

import { Avatar } from "@nextui-org/react";

interface ImageData {
  image: string;
  isStoryAvailble: boolean;
  title: string;
}

export default function StoryBar() {
  const images: ImageData[] = [
    {
      image: "/assets/nike-logo.png",
      isStoryAvailble: true,
      title: "نایکی سنتر",
    },
    {
      image: "/assets/jordanlogo.png",
      isStoryAvailble: true,
      title: "جردن ایران",
    },
    {
      image: "/assets/diorlogo.png",
      isStoryAvailble: true,
      title: "ایران دیور",
    },
    {
      image: "/assets/lvlogo.png",
      isStoryAvailble: true,
      title: "لویی ویتون",
    },
  ];

  return (
    <div className="flex overflow-x-auto gap-4 justify-center overflow-hidden">
      {images.map((imageData, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            key={index}
            className="flex flex-col h-18 w-18 overflow-hidden  justify-center  items-center p-1"
          >
            <Avatar
              isBordered
              color="primary"
              className="size-16 md:size-20 ring-1 ring-primary shadow-sm"
              src={imageData.image}
            />
          </div>
          <p className="mt-2 text-center text-sm">{imageData.title}</p>
        </div>
      ))}
    </div>
  );
}
