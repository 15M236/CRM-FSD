import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import {useNavigate} from 'react-router-dom' 

export default function Title() {
    let navigate = useNavigate();  
    const role = sessionStorage.getItem('role');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const handleLogOut = () => {
      sessionStorage.clear()
      navigate('login')
    }
    return (
         <div>
            <Navbar bg="light" variant="light">
              <Container>
                <Navbar.Brand href="/">CRM</Navbar.Brand>
                  <Nav className="me-auto">
                    {!role && <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>}
                    <Nav.Link onClick={() => navigate('/signup')}>SignUp</Nav.Link>
                    <Nav.Link onClick={() => navigate('/list-queries')}>Queries</Nav.Link>
                    
                    <Nav.Link onClick={() => navigate('/add-request')}>Add Request</Nav.Link>
                    {isLoggedIn && 
                       role === "admin" ? <Nav.Link onClick={() => navigate('/dashboard')}>DashBoard</Nav.Link> 
                       : null }
                       {role && <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>}
                  </Nav>
              </Container>
            </Navbar>
        </div>
    )
}