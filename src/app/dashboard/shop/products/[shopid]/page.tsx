import Products from "@/components/Dashboard/Products/Products";
import { Spinner } from "@nextui-org/react";

export default async function Page({ params }) {
  const { shopid } = await params;

  return (
    <>
      {shopid ? (
        <>
          <Products shopId={shopid} />
        </>
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
