import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PriceChart = ({ data, labels, timeframe, onTimeframeChange }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Price',
        data: data,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(255,255,255,0.1)' } },
    },
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <div className="text-white">
          <span className="text-2xl font-bold">$2,071.82</span>
          <span className="text-green-400 ml-2">+$2.83 (+0.14%)</span>
        </div>
        <div className="flex gap-2">
          {['1H', '1D', '1W', '1M', 'YTD', 'ALL'].map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`px-3 py-1 rounded-lg text-sm ${
                timeframe === tf ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      <Line data={chartData} options={options} height={200} />
    </div>
  );
};
export default PriceChart;