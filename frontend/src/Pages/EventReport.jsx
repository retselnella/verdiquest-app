import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Header from './Header.jsx';
import { useNavigate } from 'react-router-dom'; 

import '../styles/style.scss';

const Reports = () => {
  const [participant, setParticipant] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/admin/report');
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong!');
        }
        setParticipant(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleViewParticipants = (eventId) => {
    navigate(`/participants/${eventId}`);
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
        <h3 style={{ textAlign: 'center'}}>Event Reports</h3>
        <div className="table-participant-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>EventId</th>
                <th>Event Name</th>
                <th>Event Date</th>
                <th>Status</th>
                <th>TotalParticipants</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(participant.length > 0) ? (
                participant.map(participant => {
                  const date = new Date(participant.EventDate).toLocaleDateString();
                  return (
                    <tr key={participant.EventId}>
                      <td>{participant.EventId}</td>
                      <td>{participant.EventName}</td>
                      <td>{date}</td>
                      <td>{participant.Status}</td>
                      <td>{participant.Count}</td>
                      <td>
                        <Button 
                          style={{ backgroundColor: 'black', color: 'white' }} 
                          onClick={() => handleViewParticipants(participant.EventId)}>
                          View 
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

export default Reports;
