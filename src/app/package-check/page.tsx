import SliderNumber from "@/components/ui/image-autoscroll/slider-num";
import { StaticImageData } from "next/image";
import lv from "../../../public/assets/balenciaga.png";
import dior2 from "../../../public/assets/dior2.jpg";
import ch from "../../../public/assets/justdoit.png";
import amiri from "../../../public/assets/package-slider/amiri.png";
import gucci from "../../../public/assets/package-slider/gucci.png";
import ivsnt from "../../../public/assets/package-slider/ivs.png";
import lvnew from "../../../public/assets/package-slider/lvnew.png";
import nikedontstop from "../../../public/assets/package-slider/nikeair.png";
import Modal from "@/components/PackageCheck/Modal";
import MainLayout from "@/components/Main/Layout/MainLayout";

interface Item {
  imageSrc: StaticImageData;
  width: number;
}

export default function Page() {
  const items: Item[] = [
    { imageSrc: dior2, width: 100 },
    { imageSrc: nikedontstop, width: 100 },
    { imageSrc: ch, width: 100 },
    { imageSrc: amiri, width: 100 },
    { imageSrc: ivsnt, width: 100 },
    { imageSrc: lv, width: 100 },
    { imageSrc: lvnew, width: 100 },
    { imageSrc: gucci, width: 100 },
  ];

  const randomizeItems = (items: Item[]): Item[] => {
    return items
      .map((item) => ({ ...item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ sort, ...item }) => item);
  };

  const sliderItems: Item[][] = Array(6)
    .fill(null)
    .map(() => randomizeItems(items));

  return (
    <>
      <MainLayout>
        <div className="fixed -top-28 -bottom-28 w-full flex flex-col gap-3">
          {sliderItems.map((sliderItem, index) => (
            <SliderNumber
              key={index}
              items={sliderItem}
              animateRight={index % 2 !== 0}
            />
          ))}
        </div>
        <div className="fixed inset-0 dark:bg-black/70 bg-sky-500/10" />
        <Modal />
      </MainLayout>
    </>
  );
}
