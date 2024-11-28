"use client";

import { Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function UserAvatar({ userAcc, size }) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  async function fetchUserData() {
    if (!userAcc) return;

    try {
      const response = await fetch(`${process.env.API_URL}/user/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userAcc}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAvatarPreview(data.data.avatar);
    } catch (error) {
      console.log(`Error fetching user avatar: ${error}`);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [userAcc]);

  const userImage = avatarPreview
    ? `${process.env.API_URL}${avatarPreview}`
    : null;
  const defaultImage = "/assets/profile.png";

  return (
    <>
      <Avatar src={userImage || defaultImage} className={size} />
    </>
  );
}
