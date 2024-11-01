import PopularRow from "@/components/PopularRow/PopularRow";
import HeadBanner from "@/components/HeadBanner/HeadBanner";
import Search from "@/components/Home/Search";
import PopularProducts from "@/components/Home/PopularProducts";
import StoryBar from "@/components/StoryBar/StoryBar";
import type { Metadata } from "next";
import Image from "next/image";
import nike from "/public/assets/nike-logo.png";

export const metadata: Metadata = {
  title: "پرومال",
  description: "Pro Mall, Shop Like a Pro",
};

export default function Home() {
  const itemsrow = [
    {
      imageSrc: "/assets/nike-logo.png",
      subtitle: "ورزشی اورجینال",
      title: "نایک",
    },
    {
      imageSrc: "/assets/nike-logo.png",
      subtitle: "ورزشی اورجینال",
      title: "نایک",
    },
    {
      imageSrc: "/assets/nike-logo.png",
      subtitle: "ورزشی اورجینال",
      title: "نایک",
    },
    {
      imageSrc: "/assets/nike-logo.png",
      subtitle: "ورزشی اورجینال",
      title: "نایک",
    },
  ];

  return (
    <>
      <div className="md:container md:mx-auto flex flex-col gap-y-8 py-4">
        <div className="flex flex-col gap-y-4">
          <p className="text-2xl text-red-500">img not import</p>
          <img src="/assets/nike-logo.png" alt="test" className="w-20" />
          <p className="text-2xl text-red-500">Image not import</p>
          <Image
            src="/assets/nike-logo.png"
            alt="test"
            width={100}
            height={100}
          />
          <p className="text-2xl text-red-500">Image import</p>
          <Image src={nike} alt="test" width={100} height={100} />
        </div>

        <Search />

        <HeadBanner />

        <StoryBar />

        <PopularProducts />

        <PopularRow items={itemsrow} />
      </div>
    </>
  );
}
