import UseShop from "@/components/Dashboard/UseShop/UseShop";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  
  return (
    <>
      <UseShop session={session} />
    </>
  );
}
