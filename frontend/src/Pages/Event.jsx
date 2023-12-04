import React, { useState, useEffect } from 'react';
import Header from './Header.jsx'
import '../styles/style.scss'

function Event() {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3001/admin/event")
            .then(res => res.json())
            .then(data => {
                setEvents(data);
            })
            .catch(err => {
                console.error("Failed to fetch events: ", err);
            });
    }, []); 

    return (
        <div>
            <Header />
            <div className="table-organization-container">
                <h3 style={{ textAlign: 'center' }}>Event View</h3>
                <div className="table-event-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>EID</th>
                                <th>Organization</th>
                                <th>EventName</th>
                                <th>EventDescription</th>
                                <th>EventDate</th>
                                <th>EventPoints</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.length > 0 ? (
                                events.map(event => (
                                    <tr key={event.EventId}>
                                        <td>{event.EventId}</td>
                                        <td>{event.OrganizationName}</td>
                                        <td>{event.EventName}</td>
                                        <td>{event.EventDescription}</td>
                                        <td>{new Date(event.EventDate).toLocaleDateString()}</td>
                                        <td>{event.EventPoints}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', color: 'white' }}>No events data found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Event;