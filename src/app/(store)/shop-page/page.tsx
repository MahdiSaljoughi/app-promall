"use client";

import ShopBanner from "@/components/Shop/ShopPage/ShopBanner/ShopBanner";
import HorizontalCategory from "@/components/ui/horizental-category/horizental-category";
import ProductBlurCard from "@/components/ui/ProductBluredBlur/ProductBluredBlur";
import { SearchBar } from "@/components/ui/search-bar/search-bar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";

type Item = {
  imageSrc: string;
  title: string;
  subtitle: string;
};

type ProductProps = {
  products: Item[];
};

export default function Page() {
  const router = useRouter();

  const placeholders = ["جستجو در محصولات این فروشگاه ..."];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  const items = [
    {
      imageSrc: "/assets/nike-hoodie.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      title: "Solo Swoosh",
      price: "٣۰,۰۰۰,۰۰۰",
      describe: "هودی",
    },
    {
      imageSrc: "/assets/nike-shoe4.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      title: "Nike Free RN",
      price: "۲۲,۰۰۰,۰۰۰",
      describe: "کفش",
    },

    {
      imageSrc: "/assets/shoes-2.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      title: "Solo Swoosh",
      price: "٣۰,۰۰۰,۰۰۰",
      describe: "هودی",
    },
    {
      imageSrc: "/assets/nike-tshirt2.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      title: "North Carolina",
      price: "۲,۲۰۰,۰۰۰",
      describe: "تی شرت",
    },
    {
      imageSrc: "/assets/shoes-5.png",
      backImgSrc: "/assets/backgrounds/black-stone.jpg",
      title: "Nike Air Force 1",
      price: "٥۰,۰۰۰,۰۰۰",
      describe: "تی شرت",
    },
  ];

  return (
    <>
      <div className="min-h-screen pb-10">
        <ShopBanner imageUrl={"/"} />

        <div className="relative bg-background flex flex-col">
          <div className="w-28 h-28 bg-black/50 backdrop-blur-md absolute -bottom-7 right-10 rounded-xl flex justify-center items-center">
            <Image
              src={"/assets/nike-white.png"}
              className=" drop-shadow-2xl"
              alt="Shop Banner"
              quality={100}
              width={80}
              height={10}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between mt-12 mx-5">
            <span className="text-2xl font-bold">نایکی سنتر</span>
            <span className="text-2xl items-center justify-center flex gap-1">
              <span className="text-[16px]  justify-center items-center mt-1 ">
                ۴.۹
              </span>
              <FaStar size={23} color="white" strokeWidth={0.1} />
            </span>
          </div>
          <div className="mt-4 flex flex-col ">
            <SearchBar
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />

            <HorizontalCategory />
          </div>
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 mt-6 mx-7">
            {items.map((item, index) => (
              <Link
                key={index}
                href={"/shop-page/product"}
                className="mb-6 break-inside-avoid flex justify-center"
              >
                <ProductBlurCard
                  imageSrc={item.imageSrc}
                  title={item.title}
                  price={item.price}
                  describe={item.describe}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
