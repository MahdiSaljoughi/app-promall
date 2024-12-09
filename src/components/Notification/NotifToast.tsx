"use client";

import io from "socket.io-client";
import { useEffect } from "react";
<<<<<<< HEAD
import toast from "react-hot-toast";
=======
import { toast } from "react-toastify";
>>>>>>> 920b57d7d733d4949c99092b458390ed4130fa69

export default function NotifToast() {
  useEffect(() => {
    const socket = io(process.env.API_URL);

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("notification", (data) => {
      console.log("New notification received:", data);
      if (data) {
<<<<<<< HEAD
        toast.custom((t) => (
          <div
            className={`flex items-center gap-x-3 justify-center bg-white dark:bg-black/80 backdrop-blur-sm font-semibold text-sm text-zinc-700 dark:text-zinc-200 py-4 px-8 shadow-md rounded-full ${
              t.visible ? "animate-enter" : "animate-leave"
            }`}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
                className="text-primary"
              >
                <path
                  fill="currentColor"
                  d="M8.352 20.242A4.63 4.63 0 0 0 12 22a4.63 4.63 0 0 0 3.648-1.758a27.2 27.2 0 0 1-7.296 0M18.75 9v.704c0 .845.24 1.671.692 2.374l1.108 1.723c1.011 1.574.239 3.713-1.52 4.21a25.8 25.8 0 0 1-14.06 0c-1.759-.497-2.531-2.636-1.52-4.21l1.108-1.723a4.4 4.4 0 0 0 .693-2.374V9c0-3.866 3.022-7 6.749-7s6.75 3.134 6.75 7"
                ></path>
              </svg>
            </span>
            <span>{data}</span>
          </div>
        ));
=======
        toast(data, {
          position: "bottom-right",
        });
>>>>>>> 920b57d7d733d4949c99092b458390ed4130fa69
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
