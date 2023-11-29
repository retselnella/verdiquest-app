import React, { useState, useEffect } from 'react';
import Header from './Header.jsx'
import '../styles/style.scss'

function Coordinator() {
  const [coordinators, setCoordinators] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/admin/coordinators');
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }
            
            setCoordinators(data);
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
          <h3 style={{ textAlign: 'center' }}>Coordinator View</h3>
            <div className="table-coordinator-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                      <th>CoordinatorId</th>
                      <th>OrganizationId</th>
                      <th>PersonId</th>
                      <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                {coordinators.length > 0 ? (
                    coordinators.map(coordinator => (
                      <tr key={coordinator.CoordinatorId}>
                          <td>{coordinator.CoordinatorId}</td>
                          <td>{coordinator.OrganizationId}</td>
                          <td>{coordinator.PersonId}</td>
                          <td>{coordinator.Username}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                        <td colSpan="6" style={{ textAlign: 'center', color: 'white' }}>No coordinators data found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Coordinator