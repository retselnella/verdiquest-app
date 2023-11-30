import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import '../styles/style.scss';
import { useParams } from 'react-router-dom';

const Participants = () => {
  const { eventId } = useParams();  // Only this line is needed
  
  const [participants, setParticipants] = useState([]);
  const [eventName, setEventName] = useState(''); // New state variable for eventName
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch(`http://localhost:3001/admin/participants/${eventId}`);
          const data = await response.json();
          if (!response.ok) {
              throw new Error(data.message || 'Something went wrong!');
          }
          
          setParticipants(data.participants);  
          setEventName(data.eventName);  
  
          setIsLoading(false);
      } catch (err) {
          setError(err.message);
          setIsLoading(false);
      }
  };
  
    fetchData();
  }, [eventId]);

  // If data is still being loaded, display a loading message
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // If there's an error, display it
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Header />
      <div className='div3'>
        <h3 style={{ textAlign: 'center' }}>Participants for {eventName}</h3> 
        <div className="table-participants-responsive">
          <table className="table table-bordered">
            <thead>
            <tr>
                <th>PID</th>
                <th>Organization Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {(participants.length > 0) ? (
                participants.map(participant => (
                  <tr key={participant.ParticipantId}>
                    <td>{participant.ParticipantId}</td>
                    <td>{participant.OrganizationName}</td>
                    <td>{participant.Email}</td>
                    <td>{participant.Status}</td>
                    <td>{participant.Feedback}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: 'white' }}>No participants found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Participants;
