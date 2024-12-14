"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  InternalForwardRefRenderFunction,
  ModalBodyProps,
  Button,
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
        className="flex flex-col rounded-2xl cursor-pointer gap-y-4 bg-zinc-100 dark:bg-black/50 p-4"
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
          closeButton: "text-3xl mt-1",
        }}
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader
            style={{
              paddingRight: 20,
              paddingTop: 20,
            }}
            className="text-2xl text-center shadow dark:shadow-zinc-900"
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
                            ? "bg-slate-400 dark:bg-slate-700 rounded-bl-none"
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
                <div className="p-2 mx-4 md:ml-8 fixed border-zinc-700 inset-x-0 bottom-4 focus:ring-2 focus:ring-zinc-800 text-black bg-slate-200 rounded-full">
                  <div className="flex justify-between items-center">
                    <Button
                      onPress={createTickets}
                      isIconOnly
                      className="p-2 text-center bg-blue-900 rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        viewBox="0 0 24 24"
                        className="text-white pr-0.5"
                      >
                        <path
                          fill="currentColor"
                          d="m18.636 15.67l1.716-5.15c1.5-4.498 2.25-6.747 1.062-7.934s-3.436-.438-7.935 1.062L8.33 5.364C4.7 6.574 2.885 7.18 2.37 8.067a2.72 2.72 0 0 0 0 2.73c.515.888 2.33 1.493 5.96 2.704c.45.15.957.042 1.294-.291l5.506-5.455a.79.79 0 1 1 1.11 1.122l-5.416 5.366a1.4 1.4 0 0 0-.324 1.427c1.21 3.63 1.816 5.446 2.703 5.962a2.72 2.72 0 0 0 2.731 0c.887-.516 1.492-2.331 2.703-5.962"
                        ></path>
                      </svg>
                    </Button>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2em"
                          height="2em"
                          viewBox="0 0 24 24"
                          className="ml-2"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth={2}
                          >
                            <path d="m12.792 15.8l1.43-1.432a6.076 6.076 0 0 0 0-8.59a6.067 6.067 0 0 0-8.583 0L2.778 8.643A6.076 6.076 0 0 0 6.732 19"></path>
                            <path
                              d="m11.208 8.2l-1.43 1.432a6.076 6.076 0 0 0 0 8.59a6.067 6.067 0 0 0 8.583 0l2.861-2.864A6.076 6.076 0 0 0 17.268 5"
                              opacity={0.5}
                            ></path>
                          </g>
                        </svg>
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
