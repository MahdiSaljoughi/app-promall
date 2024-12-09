import ShopHeader from "@/components/Shop/ShopPage/Header/ShopHeader";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ShopHeader />

      <>{children}</>
    </>
  );
}
