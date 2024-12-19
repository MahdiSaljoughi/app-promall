"use client";

import CategoriesSection from "@/components/CategorySection/CategorySection";
import { SearchBar } from "@/components/ui/search-bar/search-bar";

export default function Categories() {
  const categories = [
    { image: "/assets/banners/teenage.png", title: "امریکن استایل" },
    { image: "/assets/banners/teenage.png", title: "بیزنس کژوال" },
    { image: "/assets/banners/teenage.png", title: "نایت پارتی" },
    { image: "/assets/banners/teenage.png", title: "کفش" },
    { image: "/assets/banners/teenage.png", title: "تی شرت" },
    { image: "/assets/banners/teenage.png", title: "کفش" },
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
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-2xl font-bold text-center">بریم استایل کنیم ؟</h1>
          <SearchBar
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>

        <CategoriesSection categories={categories} />
      </div>
    </>
  );
}
