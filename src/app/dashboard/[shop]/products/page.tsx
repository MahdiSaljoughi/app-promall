import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import TableProducts from "@/components/Dashboard/Products/TableProducts";

export default async function Page({ params }) {
  const { shop } = await params;
  const session = await getServerSession(authOptions);

  return (
    <>
      <TableProducts shopId={shop} session={session} />
    </>
  );
}
