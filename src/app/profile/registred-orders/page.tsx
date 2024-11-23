import RegistredOrders from "@/components/Profile/RegistredOrders/RegistredOrders";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <RegistredOrders session={session} />
    </>
  );
}
