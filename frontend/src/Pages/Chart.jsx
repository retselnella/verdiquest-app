import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LineChart from '../components/LineChart';

const Chart = () => {
    const [userData, setUserData] = useState({
        labels: [],
        datasets: [{
            label: "Profits",
            data: [],
            tension: 0.3,
            fill: true,
            backgroundColor: 'rgba(123, 144, 75, 0.8)', // Added opacity to the original color
            padding: 20,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'rgba(11, 32, 0, 0.5)', // Added opacity to the original color
            pointBorderWidth: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)', // This already has opacity set to 1 (fully opaque)
            pointHoverBorderColor: 'rgba(220, 220, 220, 1)', // This already has opacity set to 1 (fully opaque)
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
        }]
    });

    // Function to fetch and process data
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/admin/total-revenue");
            const labels = response.data?.map(x => `${x.Month}-${x.Year}`);
            const totalCosts = response.data?.map(x => x.Revenue);
            setUserData(prevData => ({
                ...prevData,
                labels: labels,
                datasets: [{ ...prevData.datasets[0], data: totalCosts }]
            }));
        } catch (error) {
            console.error("There was an error fetching the data", error);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch immediately on mount
        const interval = setInterval(fetchData, 5000); // Fetch every 5000 milliseconds (5 seconds)
        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    return (
        <div style={{width: '700px', overflowX: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px'}}>
            <LineChart chartData={userData} />
        </div>
    );
}

export default Chart;
