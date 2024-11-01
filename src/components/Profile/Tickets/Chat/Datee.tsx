export default function Datee({ date, from }) {
  return (
    <>
      <div
        className={`date flex ${
          from === "me" ? "justify-end" : "justify-start"
        }`}
      >
        <span dir="ltr" className="font-medium  text-[#818181]">
          {date}
        </span>
      </div>
    </>
  );
}
