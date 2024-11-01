export default function StatBox({ icon, label, value }) {
  return (
    <>
      <div className="h-40 min-w-40 bg-[#f3f8fd] text-black rounded-3xl flex flex-col gap-2 items-center justify-center p-3">
        {icon}
        <span className="">{label}</span>
        <span className="mt-2 text-center font-bold text-xl w-full">
          {value}
        </span>
      </div>
    </>
  );
}
