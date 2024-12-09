import EditShop from "@/components/Dashboard/EditShop/EditShop";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  const { shop } = await params;

  return (
    <>
      <EditShop shopId={shop} session={session} />
    </>
  );
}
