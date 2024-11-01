"use client";

import HorizentalCategory from "@/components/ui/horizental-category/horizental-category";
import { SearchBar } from "@/components/ui/search-bar/search-bar";
import ShopCard from "@/components/ui/shop-card/shop-card";
import { Spinner } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Shop {
  id: number;
  name: string;
  avatar: string;
  detail: [];
}

export default function Shop() {
  const { data: session } = useSession();
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${process.env.API_URL}/shop`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        // console.log(data.data);
        setShops(data.data);
      } catch (error) {
        console.error("Error fetching shops:", error);
        setError("خطا در بارگذاری فروشگاه‌ها!");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.access_token) {
      fetchShops();
    }
  }, [session?.user.access_token]);

  const placeholders = ["نایکی", "آدیداس", "ایو سنت لورن", "اونتوس"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  const imageSrc = "/assets/nike-logo.png";
  const subtitle = "ورزشی اورجینال";

  if (loading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <Spinner
            label="در حال بارگذاری..."
            color="primary"
            labelColor="primary"
            size="lg"
          />
        </div>
      </>
    );
  }

  if (error) {
    return <div>{error}</div>;
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
              <Link href="/shop-page">
                <ShopCard
                  key={shop.id}
                  imageSrc={imageSrc}
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
