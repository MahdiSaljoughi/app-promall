import Tickets from "@/components/Profile/Tickets/Tickets";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { IUser } from "@/types/interfaces";

export default async function Page() {
  const session = await getServerSession(authOptions);
  let user: IUser | null = null;

  try {
    const response = await fetch(`${process.env.API_URL}/user/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session!.user.access_token}`,
      },
    });
    if (response.ok) {
      const userData = await response.json();
      user = userData.data;
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <Tickets user={user} session={session} />
    </>
  );
}
