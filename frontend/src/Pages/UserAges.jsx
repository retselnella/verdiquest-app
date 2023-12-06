import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PieChart from '../components/PieChart';
const UserAges = () => {
    const [userData, setUserData] = useState({
        labels: [], // This will hold text labels for each slice of the pie chart
        datasets: [{
            label: "User Ages",
            data: [], // This will hold the data for each slice
            fill: true,
            backgroundColor: ['#7B904B','#3D691B','#0B2000'],
            padding: 20, // Adjust this value to control the thickness of the slices
        }]
    });
    

    // Function to fetch and process data
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/admin/age");
            const labels = response.data.map(x => x.age_range); // Age ranges
            const totalUsers = response.data.map(x => x.total_users); // User counts
    
            // Calculate total sum of all users
            const totalSum = totalUsers.reduce((acc, curr) => acc + curr, 0);
    
            // Calculate percentage for each group
            const percentages = totalUsers.map(users => ((users / totalSum) * 100).toFixed(2)); // ToFixed(2) for two decimal places
    
            setUserData(prevData => ({
                ...prevData,
                labels: labels.map((label, index) => `${label} (${percentages[index]}%)`), // Combine labels with percentages
                datasets: [{ ...prevData.datasets[0], data: totalUsers }]
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
        <div style={{width: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px'}}>
            <PieChart chartData={userData} />
        </div>
    );
}

export default UserAges