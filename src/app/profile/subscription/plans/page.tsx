import Plans from "@/components/Profile/Subscription/plans";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";
import { redirect } from 'next/navigation';


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
        <div className="bg-subscription-gradient min-h-screen" >
        <Plans />
        </div>
      );
    }
  } else {
    redirect("/auth");
  }
}