import StatBox from "./StatBox";

export default function StatRow({ stats }) {
  return (
    <>
      <div className="flex flex-row  mt-5 gap-5 overflow-x-auto no-scrollbar font-bold ">
        {stats.map((stat, index) => (
          <StatBox
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </div>
    </>
  );
}
