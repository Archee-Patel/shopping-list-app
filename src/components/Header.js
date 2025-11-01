import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = ({ currentUser }) => {
  return (
    <Navbar bg="white" expand="lg" className="border-bottom shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          🛒 ShoppingList App
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/archived">Archived Lists</Nav.Link>
          </Nav>
          
          <Nav>
            <Nav.Item className="d-flex align-items-center">
              <span className="text-muted me-2">Welcome,</span>
              <strong>{currentUser.name}</strong>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;