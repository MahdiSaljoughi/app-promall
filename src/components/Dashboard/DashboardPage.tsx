"use client";

import ChartSection from "@/components/Dashboard/ChartSection";
import DashboardGrid from "@/components/Dashboard/DashboardGrid";
import StatRow from "@/components/Dashboard/StatRow";
import { User } from "lucide-react";
import { IoIosTimer } from "react-icons/io";
import { TbMoneybag } from "react-icons/tb";

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

      <ChartSection />

      <DashboardGrid />
    </>
  );
}
