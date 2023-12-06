import React from 'react'
import {Pie} from 'react-chartjs-2';
import { Chart as chartJS } from 'chart.js/auto';

function PieChart({chartData}) {
  const option = {
    plugins: {
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
            text: "User Ages",
            font: {
                size: 18,
                family: 'Andada Pro, serif',
            },
            color: 'black'
        },
        tooltip: {
            titleFont: { color: 'black' },
            bodyFont: { color: 'black' },
        }
    },
    // Add responsive: true to ensure the chart adjusts to the container size
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
} 

  return <div style={{ width: '800px', height: '350px', paddingLeft:'50px' }}>
  <Pie data={chartData} options={option}/>
  </div>;
}

export default PieChart