import React, { useState } from 'react';
import { Button, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Icon from '../Images/Icon3.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import '../styles/custom.scss';

const Header = () => {
  const navigate = useNavigate(); 
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');  
  };

  const [showAccountsDropdown, setShowAccountsDropdown] = useState(false);
  const [showReportDropdown, setShowReportDropdown] = useState(false);
  const [isHoveredAccounts, setIsHoveredAccounts] = useState(false);
  const [isHoveredReport, setIsHoveredReport] = useState(false);

  return (
    <Navbar bg="primary" expand="lg">
      <Navbar.Brand href="/dashboard">
        <img 
          style={{ height: '40px', width: '40px', marginLeft: '5px', marginTop: '-15px'}} 
          src={Icon} 
          alt='icon' 
          className='logo' 
        />
        <span style={{ color: 'white', fontSize: '31.42px'}}>
          VerdiQuest
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link style={{color: 'white'}} href="/Dashboard">Home</Nav.Link>
          <Nav.Link style={{color: 'white'}} href="/Tasks">Tasks</Nav.Link>
          <Nav.Link style={{color: 'white'}} href="/Event">Events</Nav.Link>
          <Nav.Link style={{color: 'white'}} href="/Rewards">Rewards</Nav.Link>
          
          {/* Report Dropdown */}
          <NavDropdown
            title={
              <span 
                style={{ 
                  padding:'5px',
                  color: isHoveredReport ? '#7B904B' : 'white' 
                }}
                onMouseEnter={() => {
                  setIsHoveredReport(true);
                  setShowReportDropdown(true);
                }}
                onMouseLeave={() => {
                  setIsHoveredReport(false);
                  setShowReportDropdown(false);
                }}
              >
                Report
              </span>
            }
            id="report-nav-dropdown"
            show={showReportDropdown}
            onMouseEnter={() => setShowReportDropdown(true)}
            onMouseLeave={() => setShowReportDropdown(false)}
          >
            <NavDropdown.Item style={{color: 'white'}} href="/EventReport">Event Report</NavDropdown.Item>
            <NavDropdown.Item style={{color: 'white'}} href="/TaskReport">Task Report</NavDropdown.Item>
          </NavDropdown>
          
          {/* Accounts Dropdown */}
          <NavDropdown
              title={
              <span 
                style={{ 
                  padding:'5px',
                  color: isHoveredAccounts ? '#7B904B' : 'white' 
                }}
                onMouseEnter={() => {
                  setIsHoveredAccounts(true);
                  setShowAccountsDropdown(true);
                }}
                onMouseLeave={() => {
                  setIsHoveredAccounts(false);
                  setShowAccountsDropdown(false);
                }}
              >
                Accounts
              </span>
            }
            id="basic-nav-dropdown"
            show={showAccountsDropdown}
            onMouseEnter={() => setShowAccountsDropdown(true)}
            onMouseLeave={() => setShowAccountsDropdown(false)}
          >
            <NavDropdown.Item 
                style={{color: 'white'}} 
                className="navDropdownItem" 
                href="/Users"
            >
                Users
            </NavDropdown.Item>
            <NavDropdown.Item 
                style={{color: 'white'}} 
                className="navDropdownItem" 
                href="/Coordinator"
            >
                Coordinators
            </NavDropdown.Item>
            <NavDropdown.Item 
                style={{color: 'white'}} 
                className="navDropdownItem" 
                href="/Organization"
            >
                Organization
            </NavDropdown.Item>
            <NavDropdown.Item 
                style={{color: 'white'}} 
                className="navDropdownItem" 
                href="/Subscriber"
            >
                Subscriber
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        
        <form class="d-flex ms-auto order-5">
          <Button
            variant="primary"
            style={{
              color: 'white',
              borderColor: 'white',
              marginRight: '10px',
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
          </form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
