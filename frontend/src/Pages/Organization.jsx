import React, { useState, useEffect } from 'react';
import Header from './Header.jsx'
import '../styles/style.scss'

function Organization() {
    const [organizations, setOrganizations] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('http://localhost:3001/admin/organizations');
              const data = await response.json();

              if (!response.ok) {
                  throw new Error(data.message || 'Something went wrong!');
              }
              
              setOrganizations(data);
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
      </div>
      <div className="table-organization-container">
        <h3 style={{ textAlign: 'center' }}>Organization View</h3>
        <div className="table-organization-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                  <th>OrgID</th>
                  <th>Organization Name</th>
                  <th>Organization Address</th>
                  <th>Organization Type</th>
              </tr>
            </thead>
            <tbody>
              {organizations.length > 0 ? (
                organizations.map(organization => (
                  <tr key={organization.OrganizationId}>
                      <td>{organization.OrganizationId}</td>
                      <td>{organization.OrganizationName}</td>
                      <td>{organization.OrganizationAddress}</td>
                      <td>{organization.OrganizationType}</td>
                  </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', color: 'white' }}>No data found.</td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Organization