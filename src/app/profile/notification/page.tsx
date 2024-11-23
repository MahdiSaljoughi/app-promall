import Notif from "@/components/Notification/Notif";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Notif session={session} />
    </>
  );
}
