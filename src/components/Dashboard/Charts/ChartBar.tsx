import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartBar() {
  const data = {
    labels: ["مرداد", "خرداد", "اردیبهشت", "فروردین"],
    datasets: [
      {
        label: "فروش ماهانه",
        data: [65000000, 59000000, 80000000, 80000000, 56000000, 55000000],
        backgroundColor: "black",
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 30,
        maxBarThickness: 40,
        hoverBackgroundColor: "rgba(0, 0, 0, 0.8)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 2,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "black",
        bodyColor: "black",
        titleFont: {
          size: 14,
          family: "'Yekan Bakh VF', 'Yekan Bakh Fa', sans-serif",
        },
        bodyFont: {
          size: 12,
          family: "'Yekan Bakh VF', 'Yekan Bakh Fa', sans-serif",
        },
        padding: 10,
        cornerRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return `فروش: ${value.toLocaleString("fa-IR")} تومان`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "black",
          font: {
            size: 14,
            family: "'Yekan Bakh VF', 'Yekan Bakh Fa', sans-serif",
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 100000000,
        min: 1000000,
        grid: {
          display: true,
        },
        ticks: {
          stepSize: 1000000,
          color: "black",
          font: {
            size: 14,
            family: "'Yekan Bakh VF', 'Yekan Bakh Fa', sans-serif",
          },
          callback: (value) => `${(value / 1000000).toLocaleString("fa-IR")} م`,
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <>
      <div className="chart-container rounded-lg px-2 pb-5 w-full h-full mx-2 text-black">
        <Bar data={data} options={options} />
      </div>
    </>
  );
}
