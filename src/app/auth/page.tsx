"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import AuthPage from "@/components/Auth/AuthPage";
import { Spinner } from "@nextui-org/react";

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
            label="در حال بارگذاری..."
            classNames={{ label: "mt-4" }}
          />
        </div>
      </>
    );
  }

  if (session?.user.access_token) {
    redirect("/profile");
  }

  return (
    <>
      <AuthPage />
    </>
  );
}
