import { Link,  NavLink,  useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { getToken, removeToken } from "../utils/tokenService";
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import LoginForm from './LoginForm';

const Navigation = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    const [username, setUsername] = useState(null)

    useEffect(() => {
        const token = getToken();
        if (token) {
            setIsLoggedIn(true);
            try {
                const decoded = jwtDecode(token);
                setUserEmail(decoded.email || null);
                setUsername(decoded.username || null);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        } else {
            setIsLoggedIn(false);
            setUserEmail(null);
            setUsername(null)
        }
    }, []);

    const handleLogout = () => {
        removeToken();
        setIsLoggedIn(false);
        setUserEmail(null);
        navigate('/');
    };

    return (
       <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand as={Link}>Quarky</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/NewsPage">News</Nav.Link>
                {isLoggedIn && <Nav.Link as={Link} to="/Account">Account</Nav.Link>}
              </Nav>

              <Nav className='ms-auto'>
                {!isLoggedIn ? (
                    <>
                      <LoginForm setIsLoggedIn={setIsLoggedIn} setUserEmail={setUserEmail}/>
                      <NavLink as={Link} to='/Register'>Register</NavLink>
                    </>
                ) : (
                    <>
                      <Navbar.Text className="me-3">
                        Welcome <strong>{username}</strong>
                      </Navbar.Text>
                    <Button variant='outline-secondary' onClick={handleLogout}>Logout</Button>
                    </>
                )}
              </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
};

export default Navigation;