import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const ErrorTrackingChart = () => {

  const previous6Months = [ 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan' ];

  const data = {
    labels: previous6Months,

    datasets: [
      {
        label: 'Errors',
        data: [5, 10, 2, 20, 5, 3, 23], // Sample data
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Error Tracking of previous months'
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
            label: function (context: any) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `${context.parsed.y} errors`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options}  />;
};

export default ErrorTrackingChart;
