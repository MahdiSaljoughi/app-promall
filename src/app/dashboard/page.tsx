import { authOptions } from "@/lib/auth";
import SelectorShop from "@/modules/shop/components/SelectorShop/SelectorShop";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <SelectorShop session={session} />
    </>
  );
}
