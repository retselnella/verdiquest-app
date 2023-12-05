import React from 'react'
import {Line} from 'react-chartjs-2';
import { Chart as chartJS } from 'chart.js/auto';

function LineChart({chartData}) {
    const options = {
        scales: {
            x: { 
                grid: {
                    display: false,           
                    color: 'rgba(0, 0, 0, 0.1)', 
                    drawBorder: true,      
                    drawOnChartArea: true,      
                    drawTicks: true,        
                },
                ticks: {
                    color: 'black', // X-axis labels font color
                }
            },
            y: {
                grid: {
                    display: false,
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    color: 'black', // Y-axis labels font color
                }
            }
        },
        plugins: {
            legend: {
                display: false, 
                position: 'top', 
            },
            title: {
                display: true, 
                text: "Revenue",
                font: {
                    size: 18,
                },
                color: 'black'
            },
            tooltip: {
                titleFont: { color: 'black' }, // Tooltip title font color
                bodyFont: { color: 'black' },  // Tooltip body font color
            }
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
            backgroundColor: 'rgba(123, 144, 75, 0.5)', 
        },
        animation: {
            duration: 2000, // Animation duration in milliseconds
            easing: 'easeOutQuart', // Easing function for the animation
            // If you need more control over the animation, you can define onProgress or onComplete callbacks here
        }
    };
      
    return <div style={{ width: '800px', height: '350px', paddingLeft:'50px' }}>
                <Line data={chartData} options={options}/>;
            </div>
}

export default LineChart