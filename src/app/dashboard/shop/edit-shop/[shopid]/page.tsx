"use client";

import React from "react";
import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import EditShop from "@/components/Dashboard/EditShop/EditShop";

interface Params {
  shopid: string;
}

export default function Page({ params }: { params: Promise<Params> }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <>
        <div className="w-screen h-screen flex items-center justify-center">
          <Spinner
            size="lg"
            color="primary"
            labelColor="primary"
            label="در حال برسی..."
            classNames={{ label: "mt-4" }}
          />
        </div>
      </>
    );
  }

  if (!session?.user.access_token) {
    redirect("/auth");
  }

  const { shopid } = React.use(params);

  return (
    <>
      <EditShop shopId={shopid} />
    </>
  );
}
