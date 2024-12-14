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
      <div className="bg-zinc-100 dark:bg-black/50 p-4 rounded-2xl flex flex-col gap-1">
        <div className="flex justify-between items-center border-b dark:border-zinc-700 pb-4">
          <div className="flex flex-col leading-8">
            <span>شماره سفارش :</span>
            <span>وضعیت :</span>
            <span>تاریخ :</span>
          </div>
          <div className="flex flex-col justify-center items-end leading-8 text-primary">
            <span>{`#${dataInfo?.orderNumber}`}</span>
            <span>{dataInfo?.status}</span>
            <span>{dataInfo?.date}</span>
          </div>
        </div>
        <div className="flex justify-around items-center">
          {dataInfo.img.map((img, index) => (
            <div
              key={index}
              className="w-24 flex flex-col justify-center items-center"
            >
              <Image src={img.img} className="object-contain" alt="" />
              <div className="bg-primary size-6 rounded-full text-lg flex justify-center items-center p-2">
                {img.qty}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
