import { useState, useEffect } from "react";
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

const ExpandedSleepGraph = () => {
  const [sleepData, setSleepData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/sleep.json');
        if (!response.ok) throw new Error('Failed to load sleep data');
        const data = await response.json();
        setSleepData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading sleep data:', error);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary text-xl">Loading...</div>
      </div>
    );
  }

  const sortedEntries = Object.entries(sleepData).sort(([a], [b]) => a.localeCompare(b));
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
        pointRadius: 6,
        pointHoverRadius: 8,
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
        display: true,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 16,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 16,
        borderColor: 'rgba(34, 197, 94, 0.5)',
        borderWidth: 2,
        titleColor: 'rgb(34, 197, 94)',
        bodyColor: '#fff',
        displayColors: false,
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawTicks: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 14,
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
          color: 'rgba(255, 255, 255, 0.7)',
          stepSize: 2,
          font: {
            size: 14,
          },
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="text-primary">😴</span> Sleep Time (Hours) - Expanded View
          </h1>
          <div className="h-[calc(100vh-16rem)]">
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedSleepGraph;
