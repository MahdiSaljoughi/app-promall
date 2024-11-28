"use client";

import Image from "next/image";
import { IProduct } from "@/types/interfaces";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ImagesProduct({ product }) {
  const [productPreview, setProductPreview] = useState(0);

  return (
    <>
      <div className="flex flex-col gap-y-6 w-full lg:w-auto">
        <div className="rounded-3xl lg:max-w-96 bg-zinc-100 dark:bg-zinc-800">
          <motion.div
            className="w-full h-full min-w-96 min-h-96 max-w-96 max-h-96 mx-auto p-6"
            transition={{
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            key={product?.images[productPreview]}
          >
            <Image
              src={`${process.env.API_URL}/${product?.images[productPreview]}`}
              className="w-full h-full"
              alt={`${product?.name}`}
              quality={100}
              width={1000}
              height={1000}
            />
          </motion.div>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          {product?.images.map((img: string, index: number) => (
            <button
              key={index}
              className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg"
              onClick={() => setProductPreview(index)}
            >
              <Image
                src={`${process.env.API_URL}/${img}`}
                className="w-14 h-14"
                alt={`${product?.name}`}
                quality={100}
                width={1000}
                height={1000}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
