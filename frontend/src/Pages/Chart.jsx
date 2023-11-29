import React, { useState } from 'react';
//import Barchart from '../components/Barchart';
import { UserData, option } from './Data';
import LineChart from '../components/LineChart';
//import PieChart from '../components/PieChart';

const Chart = () => {
    const labels = UserData?.map(data => data.year) || [];
    const userGains = UserData?.map(data => data.userGain) || [];

    const [userData, setUserData] = useState({
        labels: labels,
        datasets: [{
            label: "Profits",
            data: userGains,
            tension:0.43,
            fill:true,
            backgroundColor:'#7B904B',
            padding:20,

            pointBorderColor: 'transparent',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            
        }]
    });
    

    return (
        <div style={{width:'700px', display:'flex',alignItems:'center',justifyContent:'center', padding:'10px'}}>
            <LineChart chartData={userData} />
        </div>
    )
}

export default Chart;
