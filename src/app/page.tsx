import PopularRow from "@/components/PopularRow/PopularRow";
import PopularProducts from "@/components/Home/PopularProducts";
import StoryBar from "@/components/Home/StoryBar/StoryBar";
import type { Metadata } from "next";
import InstallPwa from "@/components/Pwa/InstallPwa";
import HeadPoster from "@/components/Home/Posters/HeadPoster";
import MainLayout from "@/components/Main/Layout/MainLayout";

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
        <div className="flex flex-col gap-y-10">
          <HeadPoster />

          <StoryBar />

          <InstallPwa />

          <PopularProducts />

          <PopularRow items={itemsrow} />
        </div>
      </MainLayout>
    </>
  );
}
