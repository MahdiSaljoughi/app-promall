import Image from "next/image";

type ShopBannerProps = {
  imageUrl: string;
};

export default function ShopBanner({ imageUrl }: ShopBannerProps) {
  return (
    <>
      <div className="relative rounded-b-3xl shadow-lg drop-shadow-md h-56 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt="Shop Banner"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
    </>
  );
}
