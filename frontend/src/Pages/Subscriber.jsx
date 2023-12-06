import React, { useState, useEffect } from 'react';
import { Table } from "react-bootstrap";
import Header from './Header.jsx';
import '../styles/style.scss';

function Subscriber() {
  const [subscribers, setSubscriber] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/admin/subscribers');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong!');
        }

        setSubscriber(data);
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div>
        <Header />
        <div className="table-subscriber-container">
          <h3 style={{ textAlign: 'center' }}>Subscription View</h3>

          <div className="table-subscriber-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>SubscriberId</th>
                  <th>UserId</th>
                  <th>Status</th>
                  <th>SubscriptionEnd</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.length > 0 ? (
                  subscribers.map(subscriber => (
                    <tr key={subscriber.SubscriptionId}>
                      <td>{subscriber.SubscriptionId}</td>
                      <td>{subscriber.UserId}</td>
                      <td>{subscriber.Status}</td>
                      <td>{new Date(subscriber.SubscriptionEnd).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', color: 'white' }}>No data found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscriber;
