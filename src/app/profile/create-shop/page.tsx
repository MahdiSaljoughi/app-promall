import CreateShopPage from "@/services/shop/components/CreateShop/CreateShopPage";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <CreateShopPage session={session} />
    </>
  );
}
