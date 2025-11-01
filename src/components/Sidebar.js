import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ activeRoute }) => {
  const location = useLocation();
  
  return (
    <div className="sidebar p-3">
      <Nav className="flex-column">
        <h6 className="text-uppercase text-muted mb-3">Navigation</h6>
        
        <Nav.Link 
          as={Link} 
          to="/" 
          className={`mb-2 ${location.pathname === '/' ? 'active fw-bold' : ''}`}
        >
          📋 Active Lists
        </Nav.Link>
        
        <Nav.Link 
          as={Link} 
          to="/archived" 
          className={`mb-2 ${location.pathname === '/archived' ? 'active fw-bold' : ''}`}
        >
          📁 Archived Lists
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;