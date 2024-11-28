"use client";

import io from "socket.io-client";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function NotifToast() {
  useEffect(() => {
    const socket = io(process.env.API_URL);

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("notification", (data) => {
      console.log("New notification received:", data);
      if (data) {
        toast(data, {
          position: "bottom-right",
        });
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

  return null;
}
