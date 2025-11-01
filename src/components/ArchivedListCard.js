import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

const ArchivedListCard = ({ id, name, memberCount, itemCount, archivedDate, onRestore }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="archived-list-card h-100" style={{ opacity: 0.8 }}>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0 text-muted">{name}</Card.Title>
          <Badge bg="secondary">Archived</Badge>
        </div>
        
        <div className="mb-3">
          <Badge bg="light" text="dark" className="me-2">
            👥 {memberCount} members
          </Badge>
          <Badge bg="light" text="dark">
            📦 {itemCount} items
          </Badge>
        </div>

        <div className="mt-auto">
          <div className="text-muted small mb-2">
            Archived on: {formatDate(archivedDate)}
          </div>
          
          <Button 
            variant="outline-success" 
            className="w-100"
            onClick={() => {
              if (window.confirm(`Restore "${name}"?`)) {
                onRestore();
              }
            }}
          >
            ↻ Restore List
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ArchivedListCard;