import SelectorShop from "@/services/shop/components/SelectorShop/SelectorShop";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <SelectorShop session={session} />
    </>
  );
}
