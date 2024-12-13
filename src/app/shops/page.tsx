import MainLayout from "@/components/Main/Layout/MainLayout";
import Shops from "@/components/Shop/Shops";

export default async function Page() {
  return (
    <>
      <MainLayout>
        <Shops />
      </MainLayout>
    </>
  );
}
