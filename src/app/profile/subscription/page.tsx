"use client";

import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Subscription from "@/components/Profile/Subscription/Subscription";

export default function Page() {
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

  return (
    <>
      <div className="min-h-screen bg-subscription-gradient">
        <Subscription />
      </div>
    </>
  );
}
