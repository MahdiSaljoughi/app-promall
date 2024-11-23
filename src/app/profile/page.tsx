import ProfilePage from "@/components/Profile/ProfilePage";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <ProfilePage session={session} />
    </>
  );
}
