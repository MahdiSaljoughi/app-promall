"use client";

import HorizentalCategory from "@/components/ui/horizental-category/horizental-category";
import { SearchBar } from "@/components/ui/search-bar/search-bar";
import ShopCard from "@/components/ui/shop-card/shop-card";
import { motion } from "framer-motion";
import Link from "next/link";
import useShopQuery from "../queries/useShopQuery";
import Loading from "@/components/Loadings/Loading";

export default function Shops() {
  const { isPending, error, data } = useShopQuery();

  const placeholders = ["نایکی", "آدیداس", "ایو سنت لورن", "اونتوس"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  if (isPending) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center text-rose-500 text-center fixed inset-0">
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-4">
          <SearchBar
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />

          <HorizentalCategory />
        </div>

        <div className="flex items-center flex-wrap justify-evenly gap-8">
          {data?.map((shop) => (
            <motion.div
              key={shop.id}
              className="shadow-lg rounded-3xl transition-transform duration-500 ease-out w-96"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={`/shops/${shop.id}`}>
                <ShopCard
                  key={shop.id}
                  imageSrc={shop.avatar}
                  title={shop.name}
                  subtitle={shop.detail}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
