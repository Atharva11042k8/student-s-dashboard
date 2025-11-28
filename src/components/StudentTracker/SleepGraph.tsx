import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SleepGraphProps {
  data: Record<string, number>;
}

export const SleepGraph = ({ data }: SleepGraphProps) => {
  const sortedEntries = Object.entries(data).sort(([a], [b]) => a.localeCompare(b));
  const labels = sortedEntries.map(([date]) => new Date(date).getDate().toString());
  const values = sortedEntries.map(([, hours]) => hours);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Sleep Hours',
        data: values,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(34, 197, 94)',
        pointBorderColor: '#0e0e0e',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderColor: 'rgba(34, 197, 94, 0.5)',
        borderWidth: 1,
        titleColor: 'rgb(34, 197, 94)',
        bodyColor: '#fff',
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawTicks: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          font: {
            size: 11,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 12,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawTicks: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          stepSize: 2,
          font: {
            size: 11,
          },
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <span className="text-primary">😴</span> Sleep Time (Hours)
      </h3>
      <div className="h-64 md:h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};
