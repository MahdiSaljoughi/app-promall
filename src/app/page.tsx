import PopularRow from "@/components/PopularRow/PopularRow";
import HeadBanner from "@/components/HeadBanner/HeadBanner";
import Search from "@/components/Home/Search";
import PopularProducts from "@/components/Home/PopularProducts";
import StoryBar from "@/components/StoryBar/StoryBar";
import type { Metadata } from "next";
import MainLayout from "@/components/Layouts/MainLayout";
import InistallPwa from "@/components/Pwa/InistallPwa";

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
      <MainLayout>
        <div className="md:container md:mx-auto flex flex-col gap-y-8 py-4">
          <Search />

          <HeadBanner />

          <StoryBar />

          <div className="flex items-center justify-center">
            <InistallPwa />
          </div>

          <PopularProducts />

          <PopularRow items={itemsrow} />
        </div>
      </MainLayout>
    </>
  );
}
