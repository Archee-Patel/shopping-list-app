import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge, Button } from 'react-bootstrap';

const ShoppingListCard = ({ id, name, memberCount, itemCount, isOwner, onDelete }) => {
  const getCategoryIcon = (listName) => {
    const lowerName = listName.toLowerCase();
    if (lowerName.includes('grocery') || lowerName.includes('food')) return '🛒';
    if (lowerName.includes('electron')) return '💻';
    if (lowerName.includes('cloth')) return '👕';
    return '📝';
  };

  return (
    <Card className="shopping-list-card h-100 fade-in">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="d-flex align-items-center">
            <span className="fs-4 me-2">{getCategoryIcon(name)}</span>
            <Card.Title className="mb-0">{name}</Card.Title>
          </div>
          {isOwner && (
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (window.confirm(`Delete "${name}"?`)) {
                  onDelete();
                }
              }}
            >
              ×
            </Button>
          )}
        </div>
        
        <div className="mb-3">
          <Badge bg="primary" className="me-2">
            👥 {memberCount} {memberCount === 1 ? 'member' : 'members'}
          </Badge>
          <Badge bg="secondary">
            📦 {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </Badge>
        </div>

        <div className="mt-auto">
          <Link to={`/list/${id}`} className="btn btn-primary w-100">
            Open List
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ShoppingListCard;