"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Icon({ size }) {
  const { data: session } = useSession();

  const [notification, setNotification] = useState<any[]>([]);

  const readAll = notification.find((x) => x.is_read === false);

  const fetchNotif = async () => {
    if (!session?.user.access_token) return;
    try {
      const res = await fetch(
        `${process.env.API_URL}/admin/notifications/current`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.user.access_token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await res.json();
      setNotification(data.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotif();
  }, [session]);

  useEffect(() => {
    const socket = io(process.env.API_URL);

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("notification", (data) => {
      console.log("New notification received:", data);
      if (data) {
        fetchNotif();
      }
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="relative w-fit">
        {readAll !== undefined && (
          <span className="bg-rose-500 size-2 block rounded-full absolute top-0.5 -right-0.5 transform -translate-x-1/2 -translate-y-1/2 z-30" />
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          className="z-20"
        >
          <path
            fill="currentColor"
            d="M4 8a8 8 0 1 1 16 0v4.697l2 3V20h-5.611a4.502 4.502 0 0 1-8.777 0H2v-4.303l2-3zm5.708 12a2.5 2.5 0 0 0 4.584 0zM12 2a6 6 0 0 0-6 6v5.303l-2 3V18h16v-1.697l-2-3V8a6 6 0 0 0-6-6"
          />
        </svg>
      </div>
    </>
  );
}
