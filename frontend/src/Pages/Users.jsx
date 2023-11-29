import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import '../styles/style.scss';
import { Card, Container, Row, Col } from 'react-bootstrap';

function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); // <-- Add this
    const [filter, setFilter] = useState('');         // <-- Add this

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://localhost:3001/admin/users?search=${searchTerm}&filter=${filter}`;
                const response = await fetch(url);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong!');
                }

                setUsers(data);
                setIsLoading(false);  // Remember to set this to false once data is loaded
            } catch (err) {
                setError(err.message);
                setIsLoading(false); // Also set this to false in case of an error
            }
        };

        fetchData();
    }, [searchTerm, filter]);
    // <-- Add searchTerm and filter here

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <Header />
            <h3>User Management</h3>

            {/* Add the search and filter components */}
            <div className='div3'>
                <input
                    type="text"
                    style={{margin:'2px'}}
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <select value={filter} style={{height:'30px',marginTop:'2px'}} onChange={e => setFilter(e.target.value)}>
                    <option value="">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    {/* Add more filter options as needed */}
                </select>
            </div>
            <Container fluid>
                <Row>
                    {users.length === 0 && searchTerm !== '' ? (
                        <Col xs={12} className="text-center mt-4">
                            <p>User Not Found</p>
                        </Col>
                    ) : (
                        users.map(user => (
                            <Col xs={12} sm={6} md={4} lg={3} xl={2} style={{ margin: '5px 0' }}>
                                <Card style={{ width: '100%', backgroundColor: '#7B904B', borderRadius: '30px', paddingBottom: '5px' }}>
                                    <center>
                                        <Card.Img variant="top" src={user.Profile} style={{ borderColor: 'white', borderRadius: '50%', borderStyle: 'solid', borderWidth: '3px', height: '90px', width: '90px', marginTop: '10px' }} />
                                    </center>
                                    <Card.Body style={{ backgroundColor: '#7B904B', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px' }}>
                                        <Card.Title style={{ color: 'white' }}><center>{user.ID}<br /> {user.Name}</center></Card.Title>
                                        <Card.Text style={{ justifyContent: 'justify', color: 'white', fontSize: '12px' }}>
                                            <center><h6>Subscription Status: {user.Subscription}</h6></center>
                                            VerdiPoints: {user.Points}<br />
                                            Date of Birth: {new Date(user.DOB).toLocaleDateString()}<br />
                                            Gender: {user.Gender} <br />
                                            Address: {user.Address}<br />
                                            Email: {user.Email} <br />
                                            Phone Number: {user.Phone} <br />
                                            Date Registered: {new Date(user.Registered).toLocaleDateString()} <br />
                                            Last Updated: {new Date(user.Updated).toLocaleDateString()}<br />
                                            Last Active: {new Date(user['Last Active']).toLocaleDateString()} <br />
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </div>
    )
}

export default Users;