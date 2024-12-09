"use client";

<<<<<<< HEAD
import { Accordion, AccordionItem, Button, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
=======
import { Button, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
>>>>>>> 920b57d7d733d4949c99092b458390ed4130fa69
import io from "socket.io-client";

export default function Notif() {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);

  const [notification, setNotification] = useState<any[]>([]);

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
        setLoading(false);
        throw new Error("Failed to fetch notifications");
      }

      const data = await res.json();
      setNotification(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching notifications:", error);
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
              className="text-rose-500"
            >
              <path
                fill="currentColor"
                d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
                opacity={0.5}
              ></path>
              <path
                fill="currentColor"
                d="M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 1 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06"
              ></path>
            </svg>
          </span>
          <span>خطا در دریافت اعلان</span>
        </div>
      ));
=======
      toast("خطا در دریافت اعلان");
>>>>>>> 920b57d7d733d4949c99092b458390ed4130fa69
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

  const readAll = async () => {
    try {
      const res = await fetch(
        `${process.env.API_URL}/admin/notifications/mark-all-read`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        }
      );
      if (res.ok) {
        fetchNotif();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelRead = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.API_URL}/admin/notifications/${id}/read`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        }
      );
      if (res.ok) {
        fetchNotif();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center">
          <Spinner
            size="lg"
            color="primary"
            labelColor="primary"
            label="در حال بارگذاری..."
            classNames={{ label: "mt-4" }}
          />
        </div>
      </>
    );
  }

  return (
    <>
      {notification.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.6em"
                height="1.6em"
                viewBox="0 0 24 24"
                className="text-primary"
              >
                <path
                  fill="currentColor"
                  d="m13.629 20.472l-.542.916c-.483.816-1.69.816-2.174 0l-.542-.916c-.42-.71-.63-1.066-.968-1.262c-.338-.197-.763-.204-1.613-.219c-1.256-.021-2.043-.098-2.703-.372a5 5 0 0 1-2.706-2.706C2 14.995 2 13.83 2 11.5v-1c0-3.273 0-4.91.737-6.112a5 5 0 0 1 1.65-1.651C5.59 2 7.228 2 10.5 2h3c3.273 0 4.91 0 6.113.737a5 5 0 0 1 1.65 1.65C22 5.59 22 7.228 22 10.5v1c0 2.33 0 3.495-.38 4.413a5 5 0 0 1-2.707 2.706c-.66.274-1.447.35-2.703.372c-.85.015-1.275.022-1.613.219c-.338.196-.548.551-.968 1.262"
                  opacity={0.5}
                ></path>
                <path
                  fill="currentColor"
                  d="M7.25 9A.75.75 0 0 1 8 8.25h8a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 9m0 3.5a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75"
                ></path>
              </svg>
              <p className="font-semibold text-lg">پیام‌ها</p>
            </div>
            <Button
              className="flex items-center gap-x-1 text-black"
              onPress={readAll}
              color="primary"
            >
              <span className="text-xs">خواندن همه</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.4em"
                height="1.4em"
                viewBox="0 0 24 24"
                className="mb-0.5"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M15.493 6.935a.75.75 0 0 1 .072 1.058l-7.857 9a.75.75 0 0 1-1.13 0l-3.143-3.6a.75.75 0 0 1 1.13-.986l2.578 2.953l7.292-8.353a.75.75 0 0 1 1.058-.072m5.025.085c.3.285.311.76.025 1.06l-8.571 9a.75.75 0 0 1-1.14-.063l-.429-.563a.75.75 0 0 1 1.076-1.032l7.978-8.377a.75.75 0 0 1 1.06-.026"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
<<<<<<< HEAD

          <div className="flex flex-col gap-y-4">
            <Accordion variant="splitted">
              {notification.map((notif) => (
                <AccordionItem
                  key={notif.id}
                  onPress={() => handelRead(notif.id)}
                  aria-label={`Accordion ${notif.id}`}
                  title={`Accordion ${notif.title}`}
                  subtitle={new Date(notif.createdAt).toLocaleTimeString()}
                  startContent={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.6em"
                      height="1.6em"
=======
          <div className="flex flex-col gap-y-4">
            {notification.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handelRead(notif.id)}
                className={`collapse cursor-pointer ${
                  notif.is_read === false
                    ? " border dark:border-none bg-sky-50 dark:bg-black/50 dark:text-white "
                    : " border dark:border-none bg-none dark:bg-black/20 text-zinc-700 dark:text-white "
                }`}
              >
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
>>>>>>> 920b57d7d733d4949c99092b458390ed4130fa69
                      viewBox="0 0 24 24"
                      className={`${
                        notif.is_read === false ? "text-primary" : ""
                      }`}
                    >
                      <path
                        fill="currentColor"
                        d="M4 19v-2h2v-7q0-2.075 1.25-3.687T10.5 4.2v-.7q0-.625.438-1.062T12 2t1.063.438T13.5 3.5v.7q2 .5 3.25 2.113T18 10v7h2v2zm8 3q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22M2 10q0-2.5 1.113-4.587T6.1 1.95l1.175 1.6q-1.5 1.1-2.387 2.775T4 10zm18 0q0-2-.888-3.675T16.726 3.55l1.175-1.6q1.875 1.375 2.988 3.463T22 10z"
                      />
                    </svg>
<<<<<<< HEAD
                  }
                  className={`${
                    notif.is_read === false
                      ? " border dark:border-none bg-sky-50 dark:bg-black/50 dark:text-white "
                      : " border dark:border-none bg-none dark:bg-black/20 text-zinc-700 dark:text-white "
                  }`}
                >
                  <p className="break-words overflow-hidden">{notif.message}</p>
                </AccordionItem>
              ))}
            </Accordion>
=======
                    <p className="break-words overflow-hidden text-xl">
                      {notif.title}
                    </p>
                  </div>
                  <div className="-ml-8">
                    <time className="text-sm">
                      {new Date(notif.createdAt).toLocaleTimeString()}
                    </time>
                  </div>
                </div>
                <div className="collapse-content">
                  <p className="break-words overflow-hidden">{notif.message}</p>
                </div>
              </div>
            ))}
>>>>>>> 920b57d7d733d4949c99092b458390ed4130fa69
          </div>
        </>
      ) : (
        <p className="text-center">پیامی وجود ندارد!</p>
      )}
    </>
  );
}
