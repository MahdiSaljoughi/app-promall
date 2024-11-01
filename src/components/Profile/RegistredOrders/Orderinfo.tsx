import Image from "next/image";
import img1 from "../../../../public/assets/shoes-5.png";
import img2 from "../../../../public/assets/shoes-2.png";
import img3 from "../../../../public/assets/shoes-3.png";

export default function Orderinfo() {
  const dataInfo = {
    orderNumber: "ORD2023234",
    status: "خروج از مرکز پست",
    date: "1403/10/23",
    img: [
      { qty: 2, img: img1 },
      { qty: 1, img: img2 },
      { qty: 1, img: img3 },
    ],
  };

  return (
    <>
      <div className="bg-order-gradient p-4 mx-6 rounded-2xl h-72  flex flex-col gap-1 drop-shadow-ticket shadow-ticket ">
        <div className="flex justify-between items-center text-[#FFFFFF]   ">
          <div className="flex flex-col font-medium text-[16px] leading-8 ">
            <span>شماره سفارش :</span>
            <span>وضعیت :</span>
            <span>تاریخ :</span>
          </div>
          <div className="flex flex-col justify-center items-end font-black text-[#AED4FC] text-[16px] leading-8">
            <span>{`#${dataInfo?.orderNumber}`}</span>
            <span>{dataInfo?.status}</span>
            <span>{dataInfo?.date}</span>
          </div>
        </div>
        <p className=" border-b-[0.2px] text-[1px] mt-2 "></p>
        <div className="flex justify-around items-center ">
          {dataInfo?.img?.map((img, index) => (
            <div
              key={index}
              className="w-24 flex flex-col justify-center items-center "
            >
              <Image
                src={img?.img}
                className=" object-contain"
                alt="img-order"
              />
              <div className="qty bg-[#AED4FC] w-6 h-6 rounded-full text-lg font-[600] flex justify-center items-center p-2 text-black">
                {img?.qty}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
