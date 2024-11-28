import Image from "next/image";
import shoe from "../../../assets/shoes-1.png";

import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const carousel = () => {
  return (
    <div className="my-5 shadow-xl  overflow-hidden relative flex flex-col justify-center z-10 w-[100%] h-[200px]">
      <div className="bg-white w-[90%] h-[70%] absolute rounded-2xl z-30 self-center"></div>
      <div className="bg-green-600 w-full h-full absolute z-20"></div>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        customTransition="transform 1000ms ease-in-out"
        transitionDuration={2000}
        containerClass="carousel-container"
        className="z-50"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="hidden"
        itemClass="carousel-item-padding-40-px"
      >
        <div className="flex flex-row justify-around">
          <Image
            src={shoe}
            alt="Logo"
            className="rounded-lg object-cover -rotate-45 z-50 mb-[-20px] h-44"
          />
          <Image
            src={shoe}
            alt="Logo"
            className="rounded-lg object-cover -rotate-45 z-50 "
          />
        </div>
      </Carousel>
    </div>
  );
};

export default carousel;
