"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import Link from "next/link";

interface IPosters {
  id: number;
  src: string;
  alt: string;
  href: string;
}

export default function HeadPoster() {
  const posters: IPosters[] = [
    {
      id: 0,
      src: "/assets/posters/p1.webp",
      alt: "",
      href: "/",
    },
    {
      id: 1,
      src: "/assets/posters/p2.gif",
      alt: "",
      href: "/",
    },
    {
      id: 2,
      src: "/assets/posters/p3.gif",
      alt: "",
      href: "/",
    },
    {
      id: 3,
      src: "/assets/posters/p4.webp",
      alt: "",
      href: "/",
    },
  ];

  return (
    <>
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{ delay: 2000 }}
        spaceBetween={0}
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        className="mySwiper w-full group relative rounded-2xl"
        loop={true}
      >
        {posters.map((poster: IPosters) => (
          <SwiperSlide key={poster.id}>
            <Link href={poster.href} className="h-44 md:h-auto block">
              <img
                src={poster.src}
                alt={poster.alt}
                className="w-full h-full object-cover inline-block"
              />
            </Link>
          </SwiperSlide>
        ))}
        <div className="absolute right-6 bottom-4 hidden md:inline-block transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 z-10">
          <button className="swiper-button-prev-custom">
            <div className="p-2.5 rounded-2xl border bg-white text-black mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="rotate-180"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m15 19l-7-7l7-7"
                />
              </svg>
            </div>
          </button>
          <button className="swiper-button-next-custom">
            <div className="p-2.5 rounded-2xl border bg-white text-black mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m15 19l-7-7l7-7"
                />
              </svg>
            </div>
          </button>
        </div>
      </Swiper>
    </>
  );
}
