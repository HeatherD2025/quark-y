import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { userContext } from "./ContextProvider";
// import { getToken, removeToken } from "../utils/tokenService";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import LoginForm from "./LoginForm";
import logo from "../logo/quarkyLogo.png";

const Navigation = () => {
  const navigate = useNavigate();
  const { authenticated, username, handleLogout } = useContext(userContext);

  const onLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="Quarky Logo"
            style={{ height: "70px", width: "auto" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/NewsPage">
              News
            </Nav.Link>
            {authenticated && (
              <Nav.Link as={Link} to="/Account">
                Account
              </Nav.Link>
            )}
          </Nav>

          <Nav className="ms-auto">
            {!authenticated ? (
              <>
                <LoginForm />
                <NavLink as={Link} to="/Register">
                  <Button variant="outline-secondary">Register</Button>
                </NavLink>
              </>
            ) : (
              <>
                <Navbar.Text className="me-3">
                  Welcome <strong>{username || "User"}</strong>
                </Navbar.Text>
                <Button variant="outline-secondary" onClick={onLogoutClick}>
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
