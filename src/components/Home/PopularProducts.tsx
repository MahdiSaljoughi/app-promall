<<<<<<< HEAD
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
    <>
      <div className="mx-4 md:mx-0">
        <div className="flex justify-between mb-4 cursor-default">
          <span>پررر طرفدارر</span>
          <Link href={"/shops"} className="flex items-center font-bold">
            <span className="text-sm">همش</span>
            <ChevronLeft size={20} strokeWidth={1.75} />
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
    </>
  );
}
=======
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
    <>
      <div className="mx-4 md:mx-0">
        <div className="flex justify-between mb-4 cursor-default">
          <span>پررر طرفدارر</span>
          <Link href={"/shops"} className="flex items-center font-bold">
            <span className="text-sm">همش</span>
            <ChevronLeft size={20} strokeWidth={1.75} />
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
    </>
  );
}
>>>>>>> 920b57d7d733d4949c99092b458390ed4130fa69
