"use client";

import { User } from "lucide-react";
import { IoIosTimer } from "react-icons/io";
import { TbMoneybag } from "react-icons/tb";
import StatRow from "./StatRow";
import DashboardGrid from "./DashboardGrid";

export default function DashboardPage() {
  const stats = [
    {
      icon: <IoIosTimer size={32} />,
      label: "سفارشات در انتظار ارسال",
      value: "۳۰ تا",
    },
    {
      icon: <TbMoneybag size={32} />,
      label: "دخل امروز",
      value: "۳۹,۰۰۰,۰۰۰ ت",
    },
    {
      icon: <User size={32} />,
      label: "کل مشتری ها",
      value: "۳۰۰ نفر",
    },
  ];

  return (
    <>
      <StatRow stats={stats} />

      {/* !<ChartSection />! */}

      <DashboardGrid />
    </>
  );
}
