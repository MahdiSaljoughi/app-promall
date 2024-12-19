import EditShop from "@/modules/shop/components/EditShop/EditShop";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Page({ params }) {
  const { shopid } = await params;
  const session = await getServerSession(authOptions);

  return (
    <>
      <EditShop shopId={shopid} session={session} />
    </>
  );
}
