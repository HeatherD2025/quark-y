import { Link, NavLink, useNavigate } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { logout } from "../features/auth/authSlice";
import LoginForm from './LoginForm';
import logo from '../assets/logo/quarkyLogo.png';

const Navigation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const username = user?.username;

  const onLogoutClick = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <img
            src={logo}
            alt='Quarky Logo'
            style={{ height: '70px', width: 'auto' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/'>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to='/news'>
              News
            </Nav.Link>
            {isAuthenticated && (
              <Nav.Link as={Link} to='/account'>
                Account
              </Nav.Link>
            )}
          </Nav>

          <Nav className='ms-auto'>
            {!isAuthenticated ? (
              <>

                <LoginForm />
                <NavLink as={Link} to='/register'>
                  <Button variant='outline-secondary'>Register</Button>
                </NavLink>
              </>
            ) : (
              <>
                <Navbar.Text className='me-3'>
                  Welcome <strong>{username || 'User'}</strong>
                </Navbar.Text>
                <Button variant='outline-secondary' onClick={onLogoutClick}>
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
