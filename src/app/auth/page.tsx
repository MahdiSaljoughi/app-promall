import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AuthPage from "@/components/Auth/AuthPage";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <>
        <AuthPage />
      </>
    );
  } else {
    redirect("/profile");
  }
}
