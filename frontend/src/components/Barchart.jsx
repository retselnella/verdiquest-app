import React from 'react';
import {Bar} from 'react-chartjs-2';
import { Chart as chartJS } from 'chart.js/auto';

function Barchart({chartData}) {
  const option = {
    plugins: {
      scales: {
        x: {
            barPercentage: 0.5, // Controls the width of the bar (0.5 is 50% of category width)
            categoryPercentage: 0 // Controls the width of the category (0.5 is 50% of available width)
        }
    },
      legend: {
          display: true, // Ensure the legend is displayed
          position: 'top', // Position at the top
          labels: {
              boxWidth: 20, // Adjust box width as needed
              padding: 20, // Adjust padding as needed
          }
      },
      title: {
          display: true,
          text: "Overall Report",
          font: {
              size: 18,
          },
          color: 'black'
      },
      tooltip: {
          titleFont: { color: 'black' },
          bodyFont: { color: 'black' },
      }
  },
  }
  return <Bar data={chartData} options={option}/>;
  
}

export default Barchart