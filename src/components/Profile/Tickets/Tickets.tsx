"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import TicketsComponents from "./TicketsComponents";
import moment from "moment-jalaali";

interface Ticket {
  title: string;
  subject: string;
  isOpen: boolean;
  id?: string;
  createdAtJalali?: any;
}

export default function Tickets({ user, session }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketSubject, setTicketSubject] = useState("");
  const [tickeTtitle, setTickeTtitle] = useState("");

  // Get Tikets
  const fetchTickets = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/ticket-groups/my-ticket-groups`,
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
      setTickets(result.data.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      onClose();
      const intervalId = setInterval(() => {
        scrollTo(0, document.body.scrollHeight);
        clearInterval(intervalId);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [session]);

  // Post Tikets
  const createTickets = async () => {
    try {
      if (!ticketSubject || !tickeTtitle) {
        throw new Error("Ticket subject and title are required.");
      }

      const response = await fetch(`${process.env.API_URL}/ticket-groups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.access_token}`,
        },
        body: JSON.stringify({
          title: tickeTtitle,
          subject: ticketSubject,
          isOpen: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error ${response.status}: ${
            errorData.message || "Network response was not ok"
          }`
        );
      }

      setTickeTtitle("");
      setTicketSubject("");

      await fetchTickets();

      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Jalali
  moment.loadPersian();
  const formatJalaliDate = (jalaliDate: string) => {
    return moment(jalaliDate, "jYYYY-jMM-jDD HH:mm:ss").format(
      "jDD jMMMM jYYYY"
    );
  };
  const formatJalaliHour = (jalaliHour: string) => {
    return moment(jalaliHour, "jYYYY-jMM-jDD HH:mm:ss").format("HH:mm");
  };

  return (
    <>
      <div className="flex flex-col justify-center gap-8">
        <p className="text-xl text-center">تیکت ها</p>
        <div className="flex flex-col gap-4">
          {tickets?.map((ticket) => (
            <div key={ticket.id}>
              <TicketsComponents
                session={session}
                groupId={ticket.id}
                subject={ticket.subject}
                title={ticket.title}
                open={ticket.isOpen}
                date={formatJalaliDate(ticket.createdAtJalali)}
                hour={formatJalaliHour(ticket.createdAtJalali)}
              />
            </div>
          ))}
        </div>
        <Button fullWidth onPress={onOpen} className="mb-6">
          تیکت جدید
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop={"blur"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                موضوع تیکت
              </ModalHeader>
              <ModalBody>
                <Select
                  label="موضوع تیکت"
                  selectionMode="single"
                  className="w-full"
                  variant="bordered"
                  color="primary"
                  name="subject"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                >
                  <SelectItem key={"بخش فنی"}>بخش فنی</SelectItem>
                  <SelectItem key={"بخش مالی"}>بخش مالی</SelectItem>
                  <SelectItem key={"بخش فروشگاه ها"}>بخش فروشگاه ها</SelectItem>
                  <SelectItem key={"انتقادات و پیشنهادات"}>
                    انتقادات و پیشنهادات
                  </SelectItem>
                </Select>
                <Textarea
                  label="مشکلتون"
                  color="primary"
                  className="w-full"
                  variant="bordered"
                  name="title"
                  value={tickeTtitle}
                  onChange={(e) => setTickeTtitle(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  بستن
                </Button>
                <Button color="primary" onPress={createTickets} fullWidth>
                  ارسال
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
