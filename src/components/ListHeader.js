import React, { useState } from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

const ListHeader = ({ listName, isOwner, members, onArchive }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div className="d-flex align-items-center mb-2 mb-md-0">
            <h2 className="mb-0 me-2">{listName}</h2>
            {isOwner && (
              <Button 
                variant="outline-primary" 
                size="sm"
                className="ms-2"
              >
                ✏️
              </Button>
            )}
          </div>

          <div className="d-flex align-items-center gap-2">
            <div className="text-muted me-3">
              <Badge bg="light" text="dark">
                👥 {members.length} {members.length === 1 ? 'member' : 'members'}
              </Badge>
            </div>
            
            {isOwner && (
              <Button variant="outline-warning" size="sm" onClick={onArchive}>
                📁 Archive
              </Button>
            )}
          </div>
        </div>

        <div className="mt-2">
          <small className="text-muted">
            Members: {members.map(m => m.name).join(', ')}
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ListHeader;