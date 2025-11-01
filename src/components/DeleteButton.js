import React from 'react';
import { Button } from 'react-bootstrap';

const DeleteButton = ({ onDelete }) => {
  return (
    <Button 
      variant="outline-danger" 
      size="sm"
      onClick={(e) => {
        e.stopPropagation();
        if (window.confirm('Delete this item?')) {
          onDelete();
        }
      }}
    >
      ×
    </Button>
  );
};

export default DeleteButton;