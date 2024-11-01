import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Tickets from "@/components/Profile/Tickets/Tickets";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const response = await fetch(`${process.env.API_URL}/user/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session!.user.access_token}`,
      },
    });
    if (response.ok) {
      const userData = await response.json();
      const user = userData.data;

      return (
        <>
          <Tickets user={user} />
        </>
      );
    }
  } else {
    redirect("/auth");
  }
}
