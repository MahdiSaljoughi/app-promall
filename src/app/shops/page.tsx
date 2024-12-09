import MainLayout from "@/components/Layouts/MainLayout";
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
