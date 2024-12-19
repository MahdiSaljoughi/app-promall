import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ProductBluredBlur from "../ui/ProductBluredBlur/ProductBluredBlur";

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
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between cursor-default">
        <span>پررر طرفدارر</span>
        <Link href={"/shops"} className="flex items-center">
          <span>همه</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="mb-0.5"
          >
            <path
              fill="currentColor"
              d="m8.165 11.63l6.63-6.43C15.21 4.799 16 5.042 16 5.57v12.86c0 .528-.79.771-1.205.37l-6.63-6.43a.5.5 0 0 1 0-.74"
            ></path>
          </svg>
        </Link>
      </div>

      <div className="overflow-x-auto flex items-center gap-2 no-scrollbar">
        {items.map((item) => (
          <div className="mx-1 my-2" key={item.id}>
            <ProductBluredBlur
              imageSrc={item.imageSrc}
              title={item.title}
              price={item.price}
              describe={"test"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
