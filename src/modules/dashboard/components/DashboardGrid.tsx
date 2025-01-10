import { AiFillProduct } from "react-icons/ai";
import { IoCreateSharp } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";
import { TbChartPie2 } from "react-icons/tb";

export default function DashboardGrid() {
  return (
    <>
      <div className="text-center text-2xl mt-5">
        <span>دسترسی سریع</span>
      </div>
      <div className="grid grid-cols-2 mt-5 mx-5 gap-5 text-black font-bold">
        <div className="flex justify-center w-full bg-[#f3f8fd]   rounded-3xl items-center flex-col text-center p-5 shadow-2xl shadow-black/50 ">
          <AiFillProduct size={32} />
          <span className="mt-2">محصولات</span>
        </div>
        <div className="flex justify-center w-full bg-[#f3f8fd]  rounded-3xl items-center flex-col text-center p-5 shadow-2xl shadow-black/50 ">
          <IoCreateSharp size={32} />
          <span className="mt-2">ایجاد سفارش</span>
        </div>
        <div className="flex justify-center w-full bg-[#f3f8fd]  rounded-3xl items-center flex-col text-center p-5 shadow-2xl shadow-black/50 ">
          <TbChartPie2 size={32} />
          <span className="mt-2">سفارشات</span>
        </div>
        <div className="flex justify-center w-full bg-[#f3f8fd]  rounded-3xl items-center flex-col text-center p-5 shadow-2xl shadow-black/50 ">
          <RiUserSettingsLine size={32} />
          <span className="mt-2">تنظیمات</span>
        </div>
      </div>
    </>
  );
}
