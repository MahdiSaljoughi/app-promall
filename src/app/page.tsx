import PopularRow from "@/components/PopularRow/PopularRow";
import PopularProducts from "@/components/Home/PopularProducts";
import StoryBar from "@/components/Home/StoryBar/StoryBar";
import InstallPwa from "@/components/Pwa/InstallPwa";
import HeadPoster from "@/components/Home/Posters/HeadPoster";
import MainLayout from "@/layouts/MainLayout";

export default function Page() {
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
