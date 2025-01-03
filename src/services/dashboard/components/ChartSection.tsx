import RoundedBarChart from "@/services/dashboard/components/Charts/ChartBar";
import React from "react";

const ChartSection: React.FC = () => {
  return (
    <div className="bg-[#f3f8fd] text-black  mx-5 mt-5 rounded-3xl flex flex-col justify-center items-center shadow-2xl shadow-black/50">
      <div className="flex flex-col justify-center mt-3 items-center">
        <span className="text-lg font-bold">چقدر کش زدیم این ماه ؟</span>
      </div>
      <RoundedBarChart />
      <div className="flex flex-col text-center mb-5 font-bold">
        <span className="text-md">۳۰۰ میل کش خالص زدیم</span>
        <span className="text-md">که ۱۹۸ میلش سوووود خالص</span>
      </div>
    </div>
  );
};

export default ChartSection;
