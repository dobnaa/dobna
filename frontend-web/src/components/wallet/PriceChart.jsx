// components/wallet/PriceChart.jsx
import React from 'react';
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

const PriceChart = ({ data = [], timeframe = '1D' }) => {
  const labels = data.map((item) => {
    const date = new Date(item.timestamp);
    if (timeframe === '1H') return date.getHours() + ':00';
    if (timeframe === '1D') return date.getHours() + ':00';
    if (timeframe === '1W' || timeframe === '1M') return date.getDate() + '/' + (date.getMonth() + 1);
    return date.toLocaleDateString();
  });

  const prices = data.map((item) => item.price);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Price',
        data: prices,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true,
        pointRadius: 0,
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
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#333',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: 'rgba(255,255,255,0.05)',
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 10,
          },
          maxTicksLimit: 10,
        },
      },
      y: {
        grid: {
          color: 'rgba(255,255,255,0.05)',
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return (
    <div className="h-[200px] w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PriceChart;