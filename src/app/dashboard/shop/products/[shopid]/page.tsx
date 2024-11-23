import React from "react";
import Products from "@/components/Dashboard/Products/Products";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Page({ params }) {
  const { shopid } = params;
  const session = await getServerSession(authOptions);

  return (
    <>
      <Products shopId={shopid} session={session} />
    </>
  );
}
