import React from 'react';
import {Bar} from 'react-chartjs-2';
import { Chart as chartJS } from 'chart.js/auto';

function Barchart({chartData}) {
  return <Bar data={chartData}/>;
  
}

export default Barchart