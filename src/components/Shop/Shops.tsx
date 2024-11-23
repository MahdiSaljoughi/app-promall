"use client";

import HorizentalCategory from "@/components/ui/horizental-category/horizental-category";
import { SearchBar } from "@/components/ui/search-bar/search-bar";
import ShopCard from "@/components/ui/shop-card/shop-card";
import { IShop } from "@/types/interfaces";
import { Spinner } from "@nextui-org/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Shops() {
  const [shops, setShops] = useState<IShop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${process.env.API_URL}/shops`);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        // console.log(data.data);
        setShops(data.data);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching shops:", error);
        setError("خطا در بارگذاری فروشگاه‌ها!");
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const placeholders = ["نایکی", "آدیداس", "ایو سنت لورن", "اونتوس"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  const subtitle = "ورزشی اورجینال";

  if (loading) {
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center">
          <Spinner
            size="lg"
            color="primary"
            labelColor="primary"
            label="در حال بارگذاری..."
            classNames={{ label: "mt-4" }}
          />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center text-rose-500 text-center fixed inset-0">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen md:container md:mx-auto">
        <SearchBar
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />

        <HorizentalCategory />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 mx-4 md:mx-8 2xl:mx-0">
          {shops.map((shop) => (
            <motion.div
              key={shop.id}
              className="relative shadow-lg rounded-3xl transition-transform duration-500 ease-out hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={`/shops/${shop.id}`}>
                <ShopCard
                  key={shop.id}
                  imageSrc={`${process.env.API_URL}${shop.avatar}`}
                  title={shop.name}
                  subtitle={subtitle}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
