"use client";

import ShopBanner from "@/components/Shop/ShopPage/ShopBanner/ShopBanner";
import HorizontalCategory from "@/components/ui/horizental-category/horizental-category";
import ProductBlurCard from "@/components/ui/ProductBluredBlur/ProductBluredBlur";
import { SearchBar } from "@/components/ui/search-bar/search-bar";
import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

interface Products {
  id: string;
  name: string;
  images: string[];
  price: number;
  availibility: string;
}

interface Shop {
  id: string;
  name: string;
  avatar: string;
  detail: any;
  shopCategories: any;
}

interface Params {
  shopId: string;
}

export default function Page({ params }: { params: Promise<Params> }) {
  const { data: session, status } = useSession();
  const { shopId } = use(params);
  const [shop, setShop] = useState<Shop | undefined>(undefined);
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchShop() {
    if (shopId === null) {
      return;
    }

    try {
      const response = await fetch(`${process.env.API_URL}/shop/${shopId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.user?.access_token}`,
        },
      });

      if (response.ok) {
        const shop = await response.json();
        setShop(shop.data);
      } else {
        console.log("Failed to fetch shop data:", response.statusText);
      }
    } catch (error) {
      console.log("Error fetching shop data:", error);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchShop();
    }
  }, [status, shopId]);

  async function fetchProducts() {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/products/shop/${shopId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
          },
        }
      );

      if (response.ok) {
        const shopsData = await response.json();
        setProducts(shopsData.data);
      } else {
        console.log("Failed to fetch shop products data:", response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error fetching shop products data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.access_token) {
        await fetchProducts();
      }
    };
    fetchData();
  }, [status, shopId]);

  const placeholders = ["جستجو در محصولات این فروشگاه ..."];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  if (status === "loading") {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner
          size="lg"
          color="primary"
          labelColor="primary"
          label="در حال بارگذاری..."
          classNames={{ label: "mt-4" }}
        />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen pb-10">
        <ShopBanner imageUrl={"/assets/nike-white.png"} />

        <div className="flex flex-col gap-y-8 md:mx-10">
          <div className="-mt-20 bg-black/80 size-28 flex items-center justify-center rounded-3xl mx-4 md:mx-0">
            <Image
              src={`${process.env.API_URL}/${shop?.avatar}`}
              alt="Shop Banner"
              quality={100}
              width={1000}
              height={1000}
              className="w-28 rounded-3xl"
            />
          </div>

          <div className="flex items-center justify-between text-2xl mx-4 md:mx-0">
            <span className="font-bold">{shop?.name}</span>
            <div className="flex items-center justify-center gap-x-2">
              <span className="text-base mt-2">۴.۹</span>
              <FaStar size={24} strokeWidth={0.1} />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <SearchBar
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />

            <HorizontalCategory />
          </div>

          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-5">
            {products.map((product, index) => (
              <Link
                key={index}
                href={`/shops/${shopId}/products/${product.id}`}
                className="mb-6 break-inside-avoid flex items-center justify-center"
              >
                <ProductBlurCard
                  imageSrc={`${process.env.API_URL}/${product.images[0]}`}
                  title={product.name}
                  price={product.price}
                  describe={product.availibility}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
