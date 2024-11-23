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
import Header from "../Header/Header";
import Footer from "@/components/Footer/Footer";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import { HiOutlineSupport, HiSupport } from "react-icons/hi";
import {
  MdOutlineSpaceDashboard,
  MdSpaceDashboard,
  MdViewCarousel,
} from "react-icons/md";
import { PiCat, PiCatFill } from "react-icons/pi";
import { TbPaint, TbPaintFilled } from "react-icons/tb";
import { motion } from "framer-motion";
import TicketsComponents from "./TicketsComponents";
import { useSession } from "next-auth/react";
import moment from "moment-jalaali";

interface Ticket {
  title: string;
  subject: string;
  isOpen: boolean;
  id?: string;
  createdAtJalali?: any;
}

interface MenuItemType {
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  path: string;
}

export default function Tickets({ user, session }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [tikets, setTickets] = useState<Ticket[]>([]);
  const [ticketSubject, setTicketSubject] = useState("");
  const [tickeTtitle, setTickeTtitle] = useState("");
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [activeItem, setActiveItem] = useState("داشبورد");

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

      // const result = await response.json();
      // console.log("Ticket created:", result);
      setTickeTtitle("");
      setTicketSubject("");

      await fetchTickets();

      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const menuItems: MenuItemType[] = [
    {
      label: "پروفایل",
      icon: <MdOutlineSpaceDashboard size={28} />,
      activeIcon: <MdSpaceDashboard size={28} />,
      path: "/profile",
    },
    {
      label: "سفارشات ثبت شده",
      icon: <TbPaint size={28} />,
      activeIcon: <TbPaintFilled size={28} />,
      path: "/profile/registredOrders",
    },
    {
      label: "اشتراک",
      icon: <PiCat size={28} />,
      activeIcon: <PiCatFill size={28} />,
      path: "/profile/subscription",
    },
    {
      label: "ایجاد فروشگاه",
      icon: <MdViewCarousel size={28} />,
      activeIcon: <MdViewCarousel size={28} />,
      path: "/create-shop",
    },
    {
      label: "پشتیبانی",
      icon: <HiOutlineSupport size={28} />,
      activeIcon: <HiSupport size={28} />,
      path: "/profile/tickets",
    },
  ];

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
      <motion.div className="bg-dashboard-gradient min-h-screen">
        <Header
          isOpen={isOpenMenu}
          setOpen={setOpenMenu}
          user={user}
          session={session}
        />

        <motion.div className="flex flex-col justify-center gap-8">
          <motion.p className="text-xl text-center">تیکت ها</motion.p>
          <motion.div className="tickets gap-4 flex flex-col">
            {tikets?.map((ticket) => (
              <motion.div key={ticket.id}>
                <TicketsComponents
                  session={session}
                  groupId={ticket.id}
                  subject={ticket.subject}
                  title={ticket.title}
                  open={ticket.isOpen}
                  date={formatJalaliDate(ticket.createdAtJalali)}
                  hour={formatJalaliHour(ticket.createdAtJalali)}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="mt-20">
          <Button
            onPress={onOpen}
            className="fixed bg-[#AED4FC] text-[#000000] bottom-24 inset-x-0 flex justify-center items-center text-center py-3 mx-5 rounded-full z-40"
          >
            <motion.span className="text-center">تیکت جدید</motion.span>
          </Button>
        </motion.div>
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
                    <SelectItem key={"بخش فروشگاه ها"}>
                      بخش فروشگاه ها
                    </SelectItem>
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
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    fullWidth
                  >
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

        <Footer />

        <HamburgerMenu
          isOpen={isOpenMenu}
          menuItems={menuItems}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      </motion.div>
    </>
  );
}
