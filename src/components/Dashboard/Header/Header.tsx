"use client";

import { useEffect, useState } from "react";
import Hamburger from "hamburger-react";
import Image from "next/image";

export default function Header({
  isOpen,
  setOpen,
  user,
  shopName,
  shopAvatar,
}) {
  const [firstName, setFirstName] = useState<string>("");

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/user/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFirstName(data.data.first_name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.access_token) fetchUserProfile();
  }, [user.access_token]);

  return (
    <>
      <div className="flex items-center py-4 justify-between font-bold rounded-3xl mx-4 bg-white dark:bg-black shadow-lg dark:drop-shadow-2xl dark:shadow-xl dark:shadow-black/10">
        <div className="flex items-center mr-4">
          <Image
            src={shopAvatar}
            width={40}
            height={40}
            alt={shopName}
            className="rounded-full border dark:border-zinc-700"
          />

          <div className="flex flex-col justify-center mr-3">
            <p className="text-md">
              {firstName} وقت بخیر :{")"}
            </p>
            <p className="text-zinc-600 dark:text-zinc-200 text-sm">{shopName}</p>
          </div>
        </div>
        <div className="ml-2">
          <Hamburger
            toggled={isOpen}
            size={25}
            animateOnMount={true}
            toggle={setOpen}
            direction="right"
            hideOutline={true}
            rounded={true}
          />
        </div>
      </div>
    </>
  );
}
