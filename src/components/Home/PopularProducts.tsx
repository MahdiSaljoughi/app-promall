"use client";

import Popular from "@/components/Popular/Popular";

export default function PopularProducts() {
  const items = [
    {
      id: 0,
      imageSrc: "/assets/creed-absolo.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      shop: "سوها پارفیوم",
      title: "Creed Absolu",
      price: "۲۰,۰۰۰,۰۰۰",
    },
    {
      id: 1,
      imageSrc: "/assets/dior-shirt.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      shop: "ایران دیور",
      title: "Dior Suite",
      price: "٢۰,۰۰۰,۰۰۰",
    },
    {
      id: 2,
      imageSrc: "/assets/rolexgmtblack.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      shop: "رولکسیان",
      title: "Rolex GMT ",
      price: "۹۹,۰۰۰,۰۰۰",
    },
    {
      id: 3,
      imageSrc: "/assets/creed-absolo.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      shop: "سوها پارفیوم",
      title: "Creed Absolu",
      price: "۲۰,۰۰۰,۰۰۰",
    },
    {
      id: 4,
      imageSrc: "/assets/creed-absolo.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      title: "نایکی ",
      shop: "Soha Perfume",
      price: "٥۰,۰۰۰,۰۰۰",
    },
    {
      id: 5,
      imageSrc: "/assets/creed-absolo.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      shop: "سوها پارفیوم",
      title: "Creed Absolu",
      price: "۲۰,۰۰۰,۰۰۰",
    },
    {
      id: 6,
      imageSrc: "/assets/dior-shirt.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      shop: "ایران دیور",
      title: "Dior Suite",
      price: "٢۰,۰۰۰,۰۰۰",
    },
    {
      id: 7,
      imageSrc: "/assets/rolexgmtblack.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      shop: "رولکسیان",
      title: "Rolex GMT ",
      price: "۹۹,۰۰۰,۰۰۰",
    },
    {
      id: 8,
      imageSrc: "/assets/creed-absolo.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      shop: "سوها پارفیوم",
      title: "Creed Absolu",
      price: "۲۰,۰۰۰,۰۰۰",
    },
    {
      id: 9,
      imageSrc: "/assets/creed-absolo.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      title: "نایکی ",
      shop: "Soha Perfume",
      price: "٥۰,۰۰۰,۰۰۰",
    },
    {
      id: 10,
      imageSrc: "/assets/creed-absolo.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      shop: "سوها پارفیوم",
      title: "Creed Absolu",
      price: "۲۰,۰۰۰,۰۰۰",
    },
  ];

  return (
    <>
      <Popular items={items} />
    </>
  );
}
