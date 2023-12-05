import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Header from './Header.jsx';
import { useNavigate } from 'react-router-dom'; 

import '../styles/style.scss';

const TaskReport = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/admin/tasks');
            const data = await response.json();
            if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
            }
            setTasks(data);
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
        };
        fetchData();
    }, []);

    const handleViewParticipants = (taskId) => {
        navigate(`/task-participants/${taskId}`);
    };
    

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='bodeh'>
        <Header />
        <div className='div3'>
            <h3 style={{ textAlign: 'center' }}>Task Reports</h3>
            <div className="table-participant-responsive">
            <table className="table table-bordered">
                <thead>
                        <tr>
                            <th>TID</th>
                            <th>Task Name</th>
                            <th>Task Desc</th>
                            <th>Task Pts</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                </thead>
                <tbody>
                {(tasks.length > 0) ? (
                    tasks.map(task => {
                    return (
                        <tr key={task.TaskId}>
                        <td>{task.TaskId}</td>
                        <td>{task.TaskName}</td>
                        <td>{task.TaskDescription}</td>
                        <td>{task.TaskPoints}</td>
                        <td>{task.Status}</td>
                        <td>
                            <Button 
                            style={{ backgroundColor: 'black', color: 'white' }} 
                            onClick={() => handleViewParticipants(task.TaskId)}>
                            View Participants
                            </Button>
                        </td>
                        </tr>
                    );
                    })
                ) : (
                    <tr>
                    <td colSpan="6" style={{ textAlign: 'center', color: 'white' }}>No data found.</td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
}

export default TaskReport;
