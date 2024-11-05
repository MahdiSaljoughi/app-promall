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
        <ShopBanner imageUrl={"/assets/nike-white.png"} />

        <div className="flex flex-col gap-y-8 md:mx-10">
          <div className="-mt-20 bg-black/80 size-28 flex items-center justify-center rounded-3xl mx-4 md:mx-0">
            <Image
              src={"/assets/nike-white.png"}
              className="drop-shadow-2xl"
              alt="Shop Banner"
              quality={100}
              width={80}
              height={10}
            />
          </div>

          <div className="flex items-center justify-between text-2xl mx-4 md:mx-0">
            <span className="font-bold">نایکی سنتر</span>
            <div className="flex items-center justify-center gap-x-2">
              <span className="text-base mt-2">۴.۹</span>
              <FaStar size={24} strokeWidth={0.1} />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <SearchBar
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />

            <HorizontalCategory />
          </div>

          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-5">
            {items.map((item, index) => (
              <Link
                key={index}
                href={"/shop/1/product"}
                className="mb-6 break-inside-avoid flex items-center justify-center"
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
