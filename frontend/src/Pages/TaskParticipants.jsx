import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import { useParams } from 'react-router-dom';
import '../styles/style.scss';

const TaskParticipants = () => {
    const { taskId } = useParams();
    
    const [participants, setParticipants] = useState([]);
    const [taskName, setTaskName] = useState(''); 
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/admin/task-participants/${taskId}`);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong!');
                }
    
                setParticipants(data.participants);
                setTaskName(data.taskName);
    
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [taskId]);
    

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
                <h3 style={{ textAlign: 'center' }}>Participants for {taskName}</h3> 
                <div className="table-participant-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>UserId</th>
                                <th>Email</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(participants.length > 0) ? (
                                participants.map(participant => (
                                    <tr key={participant.UserId}>
                                        <td>{participant.UserId}</td>
                                        <td>{participant.Email}</td>
                                        <td>{participant.Status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center', color: 'white' }}>No participants found for this task.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TaskParticipants;
