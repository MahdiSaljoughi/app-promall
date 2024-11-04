import ShopFooter from "@/components/Shop/ShopPage/Footer/ShopFooter";
import ShopHeader from "@/components/Shop/ShopPage/Header/ShopHeader";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ShopHeader />

      <main>{children}</main>

      {/* <ShopFooter /> */}
    </div>
  );
}
