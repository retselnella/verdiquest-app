import Header from './Header.jsx';
import '../styles/style.scss';
import {Card, Button} from 'react-bootstrap';
import Profile from '../Images/profile.png';
import Chart from './Chart.jsx';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Dashboard() {
    const [usersCount, setUserCount] = useState(0);
    const [coordinatorsCount, setCoordinatorCount] = useState(0);
    const [organizationsCount, setOrganizationCount] = useState(0);
    const [subscribersCount, setSubscriberCount] = useState(0);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Setting up the loading for each account to false 
    const [loadingUser, setLoadingUser] = useState(false);
    const [loadingCoordinator, setLoadingCoordinator] = useState(false);
    const [loadingOrganization, setLoadingOrganization] = useState(false);
    const [loadingSubscriber, setLoadingSubscriber] = useState(false);


    const navigate = useNavigate();

    const handleUsersView = () => {
        setLoadingUser(true);
        setTimeout(() => {
            setLoadingUser(false);
            navigate('/users');
        }, 1500); 
    };
    
    const handleCoordinatorsView = () => {
        setLoadingCoordinator(true);
        setTimeout(() => {
            setLoadingCoordinator(false);
            navigate('/coordinator');
        }, 1500);
    };
    
    const handleOrganizationsView = () => {
        setLoadingOrganization(true);
        setTimeout(() => {
            setLoadingOrganization(false);
            navigate('/organization');
        }, 1500);
    };
    
    const handleSubscribersView = () => {
        setLoadingSubscriber(true);
        setTimeout(() => {
            setLoadingSubscriber(false);
            navigate('/subscriber');
        }, 1500);
    };
    
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:3001/admin/user-count');
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setUserCount(data.count);
        };

        const fetchCoordinators = async () => {
            const response = await fetch('http://localhost:3001/admin/coordinator-count');
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setCoordinatorCount(data.count);
        };

        const fetchOrganizations = async () => {
            const response = await fetch('http://localhost:3001/admin/organization-count');
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setOrganizationCount(data.count);
        };

        const fetchSubscribers = async () => {
            const response = await fetch('http://localhost:3001/admin/subscriber-count');
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setSubscriberCount(data.count);
        };

        const fetchData = async () => {
            try {
                await Promise.all([
                    fetchUsers(),
                    fetchCoordinators(),
                    fetchOrganizations(),
                    fetchSubscribers(),
                ]);
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
        <div className='bodeh'>
            <div>  
                <Header />
                <div className='div2'>
                    <Card style={{ width: '18rem', backgroundColor: '#7B904B', borderRadius: '30px', opacity: '95%' }}>
                        <Card.Img variant="top" src={Profile} className="mx-auto d-block" style={{ borderColor: 'white', borderRadius: '50%', borderStyle: 'solid', borderWidth: '3px', height: '90px', width: '90px', marginTop: '10px' }} />
                        <Card.Body style={{ backgroundColor: '#7B904B', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', textAlign: 'center' }}>
                            <Card.Title style={{ color: 'white' }}>Users</Card.Title>
                            <Card.Text style={{ justifyContent: 'justify', color: 'white' }}>{usersCount}</Card.Text>
                            <Button style={{ backgroundColor: 'black', color: 'white' }} onClick={handleUsersView}>
                                {loadingUser ? 'Loading...' : 'View'}
                            </Button>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '18rem', backgroundColor: '#7B904B', borderRadius: '30px', opacity: '95%' }}>
                        <Card.Img variant="top" src={Profile} className="mx-auto d-block" style={{ borderColor: 'white', borderRadius: '50%', borderStyle: 'solid', borderWidth: '3px', height: '90px', width: '90px', marginTop: '10px' }} />
                        <Card.Body style={{ backgroundColor: '#7B904B', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', textAlign: 'center' }}>
                            <Card.Title style={{ color: 'white' }}>Coordinator</Card.Title>
                            <Card.Text style={{ justifyContent: 'justify', color: 'white' }}>{coordinatorsCount}</Card.Text>
                            <Button style={{ backgroundColor: 'black', color: 'white' }} onClick={handleCoordinatorsView}>
                                {loadingCoordinator ? 'Loading...' : 'View'}
                            </Button>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '18rem', backgroundColor: '#7B904B', borderRadius: '30px', opacity: '95%' }}>
                        <Card.Img variant="top" src={Profile} className="mx-auto d-block" style={{ borderColor: 'white', borderRadius: '50%', borderStyle: 'solid', borderWidth: '3px', height: '90px', width: '90px', marginTop: '10px' }} />
                        <Card.Body style={{ backgroundColor: '#7B904B', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', textAlign: 'center' }}>
                            <Card.Title style={{ color: 'white' }}>Organizations</Card.Title>
                            <Card.Text style={{ justifyContent: 'justify', color: 'white' }}>{organizationsCount}</Card.Text>
                            <Button style={{ backgroundColor: 'black', color: 'white' }} onClick={handleOrganizationsView}>
                                {loadingOrganization ? 'Loading...' : 'View'}
                            </Button>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '18rem', backgroundColor: '#7B904B', borderRadius: '30px', opacity: '95%' }}>
                        <Card.Img variant="top" src={Profile} className="mx-auto d-block" style={{ borderColor: 'white', borderRadius: '50%', borderStyle: 'solid', borderWidth: '3px', height: '90px', width: '90px', marginTop: '10px' }} />
                        <Card.Body style={{ backgroundColor: '#7B904B', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', textAlign: 'center' }}>
                            <Card.Title style={{ color: 'white' }}>Subscriber</Card.Title>
                            <Card.Text style={{ justifyContent: 'justify', color: 'white' }}>{subscribersCount}</Card.Text>
                            <Button style={{ backgroundColor: 'black', color: 'white' }} onClick={handleSubscribersView}>
                                {loadingSubscriber ? 'Loading...' : 'View'}
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            
            <div className='div2'>
                <div style={{height:'300px',width:'300px',backgroundColor:'#7B904B', borderRadius:'20px', padding:'5px', color:'white'}}>
                    <center><h3>Total Revenue</h3></center>
                    <center>
                        <div style={{width:'auto', height:'50px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <center><h6>Data</h6></center>
                        </div>
                    </center>
                    <div style={{padding:'5px'}}>
                        <center><h5>Amount</h5></center>
                        <center>
                            <div style={{width:'auto', height:'50px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <center><h6>Data</h6></center>
                            </div>
                        </center>
                    </div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly',float:'bottom'}}>
                        <div>
                            <div style={{height:'60px', display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <center><h6>Data</h6></center>
                            </div>
                            <h6>Today</h6>
                        </div>
                        <div>
                            <div style={{height:'60px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <center><h6>Data</h6></center>
                            </div>
                            <h6>This Week</h6>
                        </div>
                        <div>
                            <div style={{height:'60px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <center><h6>Data</h6></center>
                            </div>
                            <h6>This Month</h6>
                        </div>
                    </div>
                </div><Chart/>
            </div>
        </div>
    )
}

export default Dashboard