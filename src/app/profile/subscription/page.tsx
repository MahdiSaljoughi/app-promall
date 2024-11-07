import Subscription from '@/components/Profile/Subscription/Subscription'
import { getServerSession } from 'next-auth';
import React from 'react'
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
      // const user = userData.data;

      return (
        <div className='min-h-screen bg-subscription-gradient' >
      <Subscription />
    </div>
      );
    }
  } else {
    redirect("/auth");
  }
}