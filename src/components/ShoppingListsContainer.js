import React from 'react';
import ShoppingListCard from './ShoppingListCard';
import { Row, Col, Alert } from 'react-bootstrap';

const ShoppingListsContainer = ({ lists, currentUser, onDeleteList }) => {
  if (lists.length === 0) {
    return (
      <Alert variant="info" className="text-center">
        <h5>No shopping lists yet</h5>
        <p className="mb-0">Create your first shopping list to get started!</p>
      </Alert>
    );
  }

  return (
    <div className="shopping-lists-container">
      <Row>
        {lists.map(list => (
          <Col key={list.id} xl={4} lg={6} md={6} className="mb-4">
            <ShoppingListCard
              id={list.id}
              name={list.name}
              memberCount={list.members.length}
              itemCount={list.items.length}
              isOwner={list.ownerId === currentUser.id}
              onDelete={() => onDeleteList(list.id)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ShoppingListsContainer;