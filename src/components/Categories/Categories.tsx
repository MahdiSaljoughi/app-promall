"use client";

import CategoriesSection from "@/components/CategorySection/CategorySection";
import { SearchBar } from "@/components/ui/search-bar/search-bar";

export default function Categories() {
  const categories = [
    { image: "/assets/banners/teenage.png", title: "امریکن استایل" },
    { image: "/assets/banners/business.png", title: "بیزنس کژوال" },
    { image: "/assets/banners/nightlife3.png", title: "نایت پارتی" },
    { image: "/assets/banners/shoes.jpg", title: "کفش" },
    { image: "/assets/banners/tshirts.jfif", title: "تی شرت" },
    { image: "/assets/banners/shoes.jpg", title: "کفش" },
  ];

  const placeholders = ["ورزشی", "جردن", "عطر", "هودی"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <>
      <div className="md:container md:mx-auto">
        <div className="flex justify-center items-center mt-10">
          <h1 className="text-2xl font-bold mb-10">بریم استایل کنیم ؟</h1>
        </div>
        <SearchBar
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />

        <CategoriesSection categories={categories} />
      </div>
    </>
  );
}
