import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function HalfCircleChart({ data }) {
  const chartOptions = {
    rotation: -90,
    circumference: 180,
    cutout: "50%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <Doughnut data={data} options={chartOptions} />
    </>
  );
}
