"use client";

import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Tickets from "@/components/Profile/Tickets/Tickets";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState();

  const fetchUser = async () => {
    const response = await fetch(`${process.env.API_URL}/user/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session!.user.access_token}`,
      },
    });
    if (response.ok) {
      const userData = await response.json();
      setUser(userData.data);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchUser();
    }
  }, [session]);

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
      <Tickets user={user} />
    </>
  );
}
