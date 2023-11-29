import React from 'react'
import {Line} from 'react-chartjs-2';
import { Chart as chartJS } from 'chart.js/auto';

function LineChart({chartData}) {
    const options = {
        scales: {
            x: {  // For x-axis grid lines (Chart.js version 3.x)
                grid: {
                    display: false,            // Set to false to remove grid lines
                    color: 'rgba(0, 0, 0, 0.1)',  // Color of the grid lines
                    drawBorder: true,        // Draw border at the edge between the axis and the chart
                    drawOnChartArea: true,   // Draw grid lines on the chart area
                    drawTicks: true,         // Draw ticks extending towards the label
                    // ... other grid line properties
                }
            },
            y: {  // For y-axis grid lines (Chart.js version 3.x)
                grid: {
                    display: false,
                    color: 'rgba(0, 0, 0, 0.1)',
                    // ... other grid line properties
                }
            }
        },
        plugins: {
            legend: {
            display: false,   // Set to false if you want to hide the legend
            position: 'top',  // Position can be 'top', 'left', 'bottom', or 'right'
            // ... other legend configuration properties
            },
        },
        };
    return <Line data={chartData} options={options}/>;
}

export default LineChart