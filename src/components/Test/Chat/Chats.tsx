"use client";

import { Spinner } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import Footer from "@/components/Footer/Footer";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Chat from "./Chat";

interface Ticket {
  title: string;
  subject: string;
  isOpen: boolean;
  id?: string;
  createdAt?: any;
  user?: any;
}

export default function Chats() {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [tikets, setTickets] = useState<Ticket[]>([]);

  // Get Tikets
  const fetchTickets = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${process.env.API_URL}/ticket-groups`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.access_token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error ${response.status}: ${
            errorData.message || "Network response was not ok"
          }`
        );
      }

      const result = await response.json();
      setTickets(result.data.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      const intervalId = setInterval(() => {
        scrollTo(0, document.body.scrollHeight);
        clearInterval(intervalId);
      }, 1000);
    }
  }, [session]);

  useEffect(() => {
    if (!session?.user.access_token) {
      setLoading(true);
      return;
    }
    if (session?.user.access_token) {
      fetchTickets();
    }
  }, [fetchTickets]);

  return (
    <>
      <motion.div className="bg-dashboard-gradient min-h-screen">
        <motion.div className="flex flex-col justify-center gap-8">
          <motion.p className="text-xl text-center">تیکت ها</motion.p>

          {loading ? (
            <>
              <motion.div className="flex items-center justify-center">
                <Spinner
                  label="در حال بارگذاری..."
                  color="primary"
                  labelColor="primary"
                  size="lg"
                />
              </motion.div>
            </>
          ) : (
            <>
              <motion.div className="tickets gap-4 flex flex-col">
                {tikets?.map((ticket) => (
                  <motion.div key={ticket.id}>
                    <Chat
                      groupId={ticket.id}
                      subject={ticket.subject}
                      title={ticket.title}
                      open={ticket.isOpen}
                      deta={ticket.createdAt}
                      user={ticket.user}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </motion.div>

        <Footer />
      </motion.div>
    </>
  );
}
