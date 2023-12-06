import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Barchart from '../components/Barchart';

const OverAllReport = () => {
    const [userData, setUserData] = useState({
        labels: [], 
        datasets: [
            {
                label: "Registered User",
                data: [], 
                backgroundColor: '#7B904B',
                padding: 20, 
            },
            {
                label: "Task Completed",
                data: [], 
                backgroundColor: '#0B2000',
                padding: 20, 
            },
            {
                label: "Subscriptions",
                data: [], 
                backgroundColor: '#3D691B',
                padding: 20, 
            },
            
        ]
    });

    // Function to fetch and process data
    const fetchData = async () => {
        try {
            const responseUsers = await axios.get("http://localhost:3001/admin/registered-user");
            const responseSubs = await axios.get("http://localhost:3001/admin/subs-per-month");
            const responseCompleted = await axios.get("http://localhost:3001/admin/completed-task");

            // Assuming both responses have the same labels in the same order
            const labels = responseUsers.data.map(x => x.Month);

            const userCounts = responseUsers.data.map(x => x.TotalUser);
            const subCounts = responseSubs.data.map(x => x.TotalSubscribers);
            const completedTask = responseCompleted.data.map(x => x.Completed_Task);

            setUserData({
                labels: labels,
                datasets: [
                    { ...userData.datasets[0], data: userCounts },
                    { ...userData.datasets[1], data: completedTask },
                    { ...userData.datasets[2], data: subCounts },

                ]
            });
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
        <div style={{width: '500px', overflowX: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',padding: '10px'}}>
            <Barchart chartData={userData} />
        </div>
    );
}

export default OverAllReport;
