"use client";

import { useSearchParams } from "next/navigation";
import Products from "@/components/Dashboard/Products/Products";
import { Spinner } from "@nextui-org/react";
import React, { Suspense } from "react";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const shopId = searchParams.get("shop-id");

  if (!shopId) {
    return (
      <>
        <div className="w-screen h-screen flex items-center justify-center">
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

  return <Products shopId={shopId} />;
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <>
          <div className="w-screen h-screen flex items-center justify-center">
            <Spinner
              size="lg"
              color="primary"
              labelColor="primary"
              label="در حال بارگذاری..."
              classNames={{ label: "mt-4" }}
            />
          </div>
        </>
      }
    >
      <ProductsPage />
    </Suspense>
  );
}
