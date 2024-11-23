"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Notif({ session }) {
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const socket = io("https://api.promall.org");

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("notification", (data) => {
      console.log("New notification received:", data);
      if (data) {
        setNotification(data);
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
    <div className="min-h-screen p-4">
      <h1>پیام ها</h1>
      {notification ? (
        <>
          <p>پیام جدید :</p>
          <p>{notification}</p>
        </>
      ) : (
        <p>پیامی وجود ندارد</p>
      )}
    </div>
  );
}
