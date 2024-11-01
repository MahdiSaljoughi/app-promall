"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import MessageBox from "./MessageBox";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { MdAttachFile } from "react-icons/md";
import { BiSend } from "react-icons/bi";

interface Ticket {
  id: string;
  text: string;
  createdAt: string;
  messageSide: number;
}

export default function Chat({ groupId, subject, title, open, deta, user }) {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [tikets, setTickets] = useState<Ticket[]>([]);
  const [file, setFile] = useState<File | string>("");
  const [text, setText] = useState("");

  const modalBodyRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const intervalId = setInterval(() => {
        if (modalBodyRef.current) {
          // @ts-ignore
          modalBodyRef.current.scrollTop = modalBodyRef.current.scrollHeight;
        }
        clearInterval(intervalId);
      }, 100);

      // return () => clearInterval(intervalId);
    }
  }, [isOpen]);

  // Get Tikets
  const fetchTickets = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/tickets/${groupId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error ${response.status}: ${
            errorData.message || "Network response was not ok"
          }`
        );
      }

      const result = await response.json();
      setTickets(result.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      const intervalId = setInterval(() => {
        if (modalBodyRef.current) {
          // @ts-ignore
          modalBodyRef.current.scrollTop = modalBodyRef.current.scrollHeight;
        }
        clearInterval(intervalId);
      }, 100);
    }
  }, [session]);

  // Post Tikets
  const createTickets = async () => {
    await fetchTickets();

    const formData = new FormData();
    formData.append("text", text);
    formData.append("messageSide", "0");
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.API_URL}/tickets/${groupId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.user.access_token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error ${response.status}: ${
            errorData.message || "Network response was not ok"
          }`
        );
      }

      const result = await response.json();
      console.log("Ticket created:", result);
      await fetchTickets();
      setText("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const loadTickets = async () => {
      if (!session?.user.access_token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      await fetchTickets();
    };
    loadTickets();
  }, [fetchTickets, session]);

  return (
    <>
      <div
        onClick={onOpen}
        className="bg-order-gradient p-4 flex flex-col rounded-2xl shadow-ticket mx-4 cursor-pointer gap-y-4"
      >
        <p>{user.first_name}</p>
        <p>{user.last_name}</p>

        <div className="flex justify-center items-center font-medium text-lg gap-1">
          <p>موضوع:</p>
          <p>{subject}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col leading-7 font-medium">
            <span>کد تیکت :</span>
            <span>وضعیت :</span>
            <span className="">تاریخ :</span>
          </div>
          <div className="flex flex-col items-end leading-7">
            <span>{`#${groupId}`}</span>
            <span className="text-primary">{`${open}`}</span>
            <span className="text-primary">{`${deta}`}</span>
          </div>
        </div>
      </div>
      <Modal
        size={"full"}
        isOpen={isOpen}
        onClose={onClose}
        className="bg-dashboard-gradient"
        classNames={{
          closeButton: "text-3xl pl-4 pt-4",
        }}
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader
            style={{
              paddingRight: 20,
              paddingTop: 20,
            }}
            className="text-2xl text-center shadow shadow-zinc-900"
          >
            <div className="text-center flex justify-center items-center gap-x-1 text-lg">
              <p>موضوع:</p>
              <p>{subject}</p>
            </div>
          </ModalHeader>
          {/* @ts-ignore */}
          <ModalBody ref={modalBodyRef} className="px-4">
            <div className="relative">
              <div className="flex flex-col gap-y-4">
                <MessageBox messageText={title} date={""} from={"me"} />
                {tikets.map((tiket) => (
                  <div key={tiket.id}>
                    <MessageBox
                      messageText={tiket.text}
                      date={tiket.createdAt}
                      from={tiket.messageSide === 1 ? "me" : "other"}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-20">
                <div className="p-1 mx-4 fixed border-zinc-700 inset-x-0 bottom-4 focus:ring-2 focus:ring-zinc-800 text-black bg-slate-200 rounded-full">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={createTickets}
                      className="p-2 text-center bg-blue-950 rounded-full"
                    >
                      <BiSend className="text-zinc-100" size={33} />
                    </button>
                    <input
                      type="text"
                      onChange={(e) => setText(e.target.value)}
                      value={text}
                      placeholder="اینجا تایپ کنید..."
                      className="p-1 mx-1 bg-transparent text-[18px] w-full placeholder:text-zinc-500 font-yekanbakh focus:outline-none"
                    />

                    <div className="text-zinc-500">
                      <input
                        id="input-file"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const selectedFile = e.target.files?.[0];
                          setFile(selectedFile || "");
                        }}
                      />
                      <label htmlFor="input-file">
                        <MdAttachFile size={30} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
