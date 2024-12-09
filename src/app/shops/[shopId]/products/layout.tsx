import ShopFooter from "@/components/Shop/ShopPage/Footer/ShopFooter";
import ShopHeader from "@/components/Shop/ShopPage/Header/ShopHeader";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
<<<<<<< HEAD:src/app/shops/[shopId]/products/layout.tsx
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, qui.
      </div>
      {/* <ShopHeader /> */}
      <>{children}</>
=======
      <ShopHeader />

      <>{children}</>

>>>>>>> 920b57d7d733d4949c99092b458390ed4130fa69:src/app/(store)/shops/[shopId]/layout.tsx
      {/* <ShopFooter /> */}
    </>
  );
}
