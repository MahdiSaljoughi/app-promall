import Products from "@/components/Dashboard/Products/Products";
import { Spinner } from "@nextui-org/react";

export default function Page({ params }) {
  return (
    <>
      {params.shopid ? (
        <Products shopId={params.shopid} />
      ) : (
        <div className="w-screen h-screen flex items-center justify-center">
          <Spinner
            size="lg"
            color="primary"
            labelColor="primary"
            label="در حال بارگذاری..."
            classNames={{ label: "mt-4" }}
          />
        </div>
      )}
    </>
  );
}
