import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import TableProducts from "@/services/dashboard/components/Products/TableProducts";

export default async function Page({ params }) {
  const { shopid } = await params;
  const session = await getServerSession(authOptions);

  return (
    <>
      <TableProducts shopId={shopid} session={session} />
    </>
  );
}
