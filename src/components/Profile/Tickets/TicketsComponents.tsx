<<<<<<< HEAD
"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  InternalForwardRefRenderFunction,
  ModalBodyProps,
} from "@nextui-org/react";
import FileBox from "./Chat/FileBox";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdAttachFile } from "react-icons/md";
import { BiSend } from "react-icons/bi";
import moment from "moment-jalaali";

interface Ticket {
  id: string;
  text: string;
  createdAtJalali: string;
  messageSide: number;
  attachmentFile: any;
}

export default function TicketsComponents({
  session,
  groupId,
  subject,
  title,
  open,
  date,
  hour,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [file, setFile] = useState<File | string>("");
  const [text, setText] = useState("");
  const modalBodyRef =
    useRef<InternalForwardRefRenderFunction<"div", ModalBodyProps, never>>();

  useEffect(() => {
    if (isOpen) {
      const intervalId = setInterval(() => {
        if (modalBodyRef.current) {
          //@ts-expect-error
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
    formData.append("messageSide", "1");
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

      // const result = await response.json();
      // console.log("Ticket created:", result);
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

  // Jalali
  moment.loadPersian();
  const formatJalaliHour = (jalaliHour: string) => {
    return moment(jalaliHour, "jYYYY-jMM-jDD HH:mm:ss").format("HH:mm");
  };

  return (
    <>
      <div
        onClick={onOpen}
        className="p-4 flex flex-col rounded-2xl shadow-ticket mx-4 cursor-pointer gap-y-4"
      >
        <div className="flex justify-center items-center font-medium text-lg gap-1">
          <p>موضوع:</p>
          <p>{subject}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col leading-7 font-medium">
            <span>کد تیکت :</span>
            <span>وضعیت :</span>
            <span>تاریخ ثبت :</span>
            <span>ساعت :</span>
          </div>
          <div className="flex flex-col items-end leading-7 text-primary">
            <span>{`#${groupId}`}</span>
            <span className="text-primary">
              {open == true ? "درحال بررسی" : "بسته شده"}
            </span>
            <div className="flex items-center gap-x-1">
              <span>{date}</span>
              <span className="mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.4em"
                  height="1.4em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18.435 4.955h-1.94v-1.41c0-.26-.23-.51-.5-.5s-.5.22-.5.5v1.41h-7v-1.41c0-.26-.23-.51-.5-.5s-.5.22-.5.5v1.41h-1.93a2.5 2.5 0 0 0-2.5 2.5v11a2.5 2.5 0 0 0 2.5 2.5h12.87a2.5 2.5 0 0 0 2.5-2.5v-11a2.5 2.5 0 0 0-2.5-2.5m1.5 13.5c0 .83-.67 1.5-1.5 1.5H5.565c-.83 0-1.5-.67-1.5-1.5v-8.42h15.87zm0-9.42H4.065v-1.58c0-.83.67-1.5 1.5-1.5h1.93v.59c0 .26.23.51.5.5s.5-.22.5-.5v-.59h7v.59c0 .26.23.51.5.5s.5-.22.5-.5v-.59h1.94c.83 0 1.5.67 1.5 1.5z"
                  />
                  <path
                    fill="currentColor"
                    d="M11.492 17.173v-3.46a.075.075 0 0 0-.114-.064l-.638.392a.15.15 0 0 1-.228-.128v-.651c0-.105.055-.203.146-.257l.764-.457a.3.3 0 0 1 .154-.043h.626a.3.3 0 0 1 .3.3v4.367a.3.3 0 0 1-.3.3h-.409a.3.3 0 0 1-.301-.299"
                  />
                </svg>
              </span>
            </div>
            <div className="flex items-center gap-x-1">
              <span>{hour}</span>
              <span className="mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.3em"
                  height="1.3em"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" opacity="0.5" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l2.5 2.5"
                    />
                  </g>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        size={"full"}
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          closeButton: "text-3xl ml-2 mt-2",
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
          {/* @ts-expect-error */}
          <ModalBody ref={modalBodyRef} className="px-4">
            <div>
              <div className="flex flex-col gap-y-8">
                <div className="flex items-center justify-start">
                  <div>
                    <div className="p-4 rounded-2xl bg-primary text-black rounded-br-none">
                      <p>{title}</p>
                    </div>
                    <div className="flex items-center gap-x-1 opacity-60">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.4em"
                        height="1.4em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="m4 12.9l3.143 3.6L15 7.5m5 .063l-8.572 9L11 16"
                        />
                      </svg>
                      <time className="text-sm">{hour}</time>
                    </div>
                  </div>
                </div>

                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={`flex items-center ${
                      ticket.messageSide === 0 ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div>
                      <div
                        className={`p-4 rounded-2xl ${
                          ticket.messageSide === 0
                            ? "bg-slate-700 rounded-bl-none"
                            : "bg-primary text-black rounded-br-none"
                        }`}
                      >
                        <p>{ticket.text}</p>
                      </div>
                      <div
                        className={`flex items-center ${
                          ticket.messageSide === 0 ? "justify-end" : ""
                        } gap-x-1 opacity-60`}
                      >
                        {ticket.messageSide !== 0 && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.4em"
                            height="1.4em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="m4 12.9l3.143 3.6L15 7.5m5 .063l-8.572 9L11 16"
                            />
                          </svg>
                        )}
                        <time className="text-sm">
                          {formatJalaliHour(ticket.createdAtJalali)}
                        </time>
                      </div>
                      {ticket.attachmentFile && (
                        <FileBox File={ticket.attachmentFile} />
                      )}
                    </div>
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
                      className="p-1 mx-1 bg-transparent text-[18px] w-full placeholder:text-zinc-500 focus:outline-none"
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
=======
"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  InternalForwardRefRenderFunction,
  ModalBodyProps,
} from "@nextui-org/react";
import FileBox from "./Chat/FileBox";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdAttachFile } from "react-icons/md";
import { BiSend } from "react-icons/bi";
import moment from "moment-jalaali";
import UserAvatar from "@/components/Avatar/UserAvatar";

interface Ticket {
  id: string;
  text: string;
  createdAtJalali: string;
  messageSide: number;
  attachmentFile: any;
}

export default function TicketsComponents({
  session,
  groupId,
  subject,
  title,
  open,
  date,
  hour,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [tikets, setTickets] = useState<Ticket[]>([]);
  const [file, setFile] = useState<File | string>("");
  const [text, setText] = useState("");
  const modalBodyRef =
    useRef<InternalForwardRefRenderFunction<"div", ModalBodyProps, never>>();

  useEffect(() => {
    if (isOpen) {
      const intervalId = setInterval(() => {
        if (modalBodyRef.current) {
          //@ts-expect-error
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
    formData.append("messageSide", "1");
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

      // const result = await response.json();
      // console.log("Ticket created:", result);
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

  // Jalali
  moment.loadPersian();
  const formatJalaliHour = (jalaliHour: string) => {
    return moment(jalaliHour, "jYYYY-jMM-jDD HH:mm:ss").format("HH:mm");
  };

  return (
    <>
      <div
        onClick={onOpen}
        className="bg-order-gradient p-4 flex flex-col rounded-2xl shadow-ticket mx-4 cursor-pointer gap-y-4"
      >
        <div className="flex justify-center items-center font-medium text-lg gap-1">
          <p>موضوع:</p>
          <p>{subject}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col leading-7 font-medium">
            <span>کد تیکت :</span>
            <span>وضعیت :</span>
            <span>تاریخ ثبت :</span>
            <span>ساعت :</span>
          </div>
          <div className="flex flex-col items-end leading-7 text-primary">
            <span>{`#${groupId}`}</span>
            <span className="text-primary">
              {open == true ? "درحال بررسی" : "بسته شده"}
            </span>
            <div className="flex items-center gap-x-1">
              <span>{date}</span>
              <span className="mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.4em"
                  height="1.4em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18.435 4.955h-1.94v-1.41c0-.26-.23-.51-.5-.5s-.5.22-.5.5v1.41h-7v-1.41c0-.26-.23-.51-.5-.5s-.5.22-.5.5v1.41h-1.93a2.5 2.5 0 0 0-2.5 2.5v11a2.5 2.5 0 0 0 2.5 2.5h12.87a2.5 2.5 0 0 0 2.5-2.5v-11a2.5 2.5 0 0 0-2.5-2.5m1.5 13.5c0 .83-.67 1.5-1.5 1.5H5.565c-.83 0-1.5-.67-1.5-1.5v-8.42h15.87zm0-9.42H4.065v-1.58c0-.83.67-1.5 1.5-1.5h1.93v.59c0 .26.23.51.5.5s.5-.22.5-.5v-.59h7v.59c0 .26.23.51.5.5s.5-.22.5-.5v-.59h1.94c.83 0 1.5.67 1.5 1.5z"
                  />
                  <path
                    fill="currentColor"
                    d="M11.492 17.173v-3.46a.075.075 0 0 0-.114-.064l-.638.392a.15.15 0 0 1-.228-.128v-.651c0-.105.055-.203.146-.257l.764-.457a.3.3 0 0 1 .154-.043h.626a.3.3 0 0 1 .3.3v4.367a.3.3 0 0 1-.3.3h-.409a.3.3 0 0 1-.301-.299"
                  />
                </svg>
              </span>
            </div>
            <div className="flex items-center gap-x-1">
              <span>{hour}</span>
              <span className="mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.3em"
                  height="1.3em"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" opacity="0.5" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l2.5 2.5"
                    />
                  </g>
                </svg>
              </span>
            </div>
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
          {/* @ts-expect-error */}
          <ModalBody ref={modalBodyRef} className="px-4">
            <div className="relative">
              <div className="flex flex-col gap-y-4">
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <UserAvatar
                      userAcc={session?.user.access_token}
                      size={"w-10 h-10"}
                    />
                  </div>
                  <div className="chat-bubble bg-primary text-zinc-700 flex items-center justify-center">
                    <p className="break-words overflow-hidden">{title}</p>
                  </div>
                  <div className="chat-footer flex items-center gap-x-1 opacity-60 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.4em"
                      height="1.4em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="m4 12.9l3.143 3.6L15 7.5m5 .063l-8.572 9L11 16"
                      />
                    </svg>
                    <time className="text-sm">{hour}</time>
                  </div>
                </div>

                {tikets.map((ticket) => (
                  <div key={ticket.id}>
                    {ticket.messageSide === 1 ? (
                      <>
                        <div className="chat chat-start">
                          <div className="chat-image avatar">
                            <UserAvatar
                              userAcc={session?.user.access_token}
                              size={"w-10 h-10"}
                            />
                          </div>
                          <div className="chat-bubble bg-primary text-zinc-700 flex items-center justify-center">
                            <p className="break-words overflow-hidden">
                              {ticket.text}
                            </p>
                          </div>
                          <div className="chat-footer flex items-center gap-x-1 opacity-60 mt-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.4em"
                              height="1.4em"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="m4 12.9l3.143 3.6L15 7.5m5 .063l-8.572 9L11 16"
                              />
                            </svg>
                            <time className="text-sm">
                              {formatJalaliHour(ticket.createdAtJalali)}
                            </time>
                          </div>
                        </div>
                        {ticket.attachmentFile && (
                          <>
                            <FileBox File={ticket.attachmentFile} />
                          </>
                        )}
                      </>
                    ) : (
                      <div className="chat chat-end">
                        <div className="chat-image avatar">
                          <UserAvatar userAcc={""} size={"w-10 h-10"} />
                        </div>
                        <div className="chat-bubble flex items-center justify-center">
                          <p className="break-words overflow-hidden">
                            {ticket.text}
                          </p>
                        </div>
                        <div className="chat-footer opacity-60 mt-0.5">
                          <time className="text-sm">
                            {formatJalaliHour(ticket.createdAtJalali)}
                          </time>
                        </div>
                      </div>
                    )}
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
>>>>>>> 920b57d7d733d4949c99092b458390ed4130fa69
