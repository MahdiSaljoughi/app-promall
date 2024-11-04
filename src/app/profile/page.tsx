import ProfilePage from "@/components/Profile/ProfilePage";
import { authOptions } from "@/lib/auth";
import { Spinner } from "@nextui-org/react";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const response = await fetch(`${process.env.API_URL}/user/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session!.user.access_token}`,
    },
  });

  if (!response.ok) {
    console.error("*** error fetch user profile page ***");
  }

  const userData = await response.json();
  const user = userData.data;

  return (
    <>
      <div>
        {session?.user.access_token ? (
          <>
            <ProfilePage user={user} />
          </>
        ) : (
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
        )}
      </div>
    </>
  );
}
