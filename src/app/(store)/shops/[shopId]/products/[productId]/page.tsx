"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

interface Product {
  id: string;
  name: string;
  images: string[];
  price: number;
  availibility: string;
}

interface Params {
  productId: string;
  shopId: string;
}

export default function Page({ params }: { params: Promise<Params> }) {
  const { shopId, productId } = use(params);
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);

      try {
        const response = await fetch(
          `${process.env.API_URL}/shops/${shopId}/products/${productId}`
        );

        if (response.ok) {
          const shopsData = await response.json();
          setProduct(shopsData.data);
        } else {
          console.log("Failed to fetch shop products data:", response.status);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error fetching shop products data:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  return (
    <>
      <div className="flex flex-col h-screen bg-product-gradient overflow-x-hidden">
        <div className="flex justify-center items-center relative">
          <div className="absolute -z-10 w-[400px] h-[400px] bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-60 blur-3xl rounded-full top-1/2 -translate-y-1/2" />
          <div className="absolute -z-10 w-[250px] h-[250px] bg-yellow-400 opacity-30 blur-[80px] top-1/2 -translate-y-1/2" />
          <div className="flex justify-center items-center">
            <p>کامپوننت مربوط به عکس های محصول</p>
            <Image
              src={`${process.env.API_URL}/${product?.images[0]}`}
              className="drop-shadow-2xl w-96"
              alt="Shop Banner"
              quality={100}
              width={1000}
              height={1000}
            />
          </div>

          <div className="inline-flex absolute bottom-5 gap-1">
            <div className="w-1 bg-white h-1 rounded-3xl" />
            <div className="w-1 bg-white h-1 rounded-3xl" />
            <div className="w-5 bg-white h-1 rounded-3xl" />
            <div className="w-1 bg-white h-1 rounded-3xl" />
          </div>
        </div>

        <div className="bg-black/40 rounded-t-3xl drop-shadow-2xl shadow-2xl flex flex-col justify-between">
          <div className="flex flex-col items-center mt-8 mx-4">
            <span className="text-2xl text-white">{product?.name}</span>
            <span className="text-1xl text-default-500">
              {product?.availibility}
            </span>
          </div>

          <div className="flex flex-col mx-6 gap-1">
            <div className="inline-flex items-center justify-between mb-2">
              <span className="text-md text-white font-semibold">توضیحات</span>
              <div className="inline-flex justify-center items-center ml-2">
                <span className="text-white justify-center items-center mt-1 ">
                  ۴.۹
                </span>
                &nbsp;&nbsp;
                <FaStar size={20} color="gold" strokeWidth={0.1} />
              </div>
            </div>
            <p className="text-default-500">
              کفش نایک دیور خاص لیمیتد، ترکیبی است از طراحی مدرن و ظرافت
              بی‌نظیر. این کفش نه تنها یک کالای ورزشی است، بلکه به عنوان یک
              اکسسوری لوکس نیز شناخته می‌شود.
            </p>
            <div className="inline-flex justify-center items-center mt-8 gap-3">
              <div className="flex flex-col items-center">
                <div className="bg-gray-900 w-9 h-9 rounded-lg" />
                <p className="text-center mt-2 ">میدنایت</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-[#DDD7D3] w-9 h-9 rounded-lg" />
                <p className="text-center mt-2 ">استخانی</p>
              </div>
            </div>
          </div>

          <div className="p-4 flex items-center gap-2">
            <Button
              variant="solid"
              color="primary"
              className="w-full font-bold rounded-full text-lg shadow-lg"
            >
              میخوامش !
            </Button>
            <div className="flex flex-col justify-center mx-6 items-start font-bold">
              <span className="text-sm text-default-500">موجود در انبار</span>
              <div className="flex items-center text-white">
                <span>{product?.price}</span>
                &nbsp;&nbsp;
                <span> ت</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
