import React, { useState } from 'react';
import Item from './Item';
import { Card, Button } from 'react-bootstrap';

const ItemsContainer = ({ items, isOwner, onItemUpdate, onItemDelete }) => {
  const [showResolved, setShowResolved] = useState(false);

  const filteredItems = showResolved 
    ? items 
    : items.filter(item => !item.resolved);

  const resolvedCount = items.filter(item => item.resolved).length;

  const handleToggleResolved = (itemId) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      onItemUpdate(itemId, { resolved: !item.resolved });
    }
  };

  return (
    <div className="items-container mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>
          Items ({filteredItems.length})
        </h5>
        
        <Button 
          variant={showResolved ? "primary" : "outline-primary"}
          size="sm"
          onClick={() => setShowResolved(!showResolved)}
        >
          {showResolved ? '📋 Hide Resolved' : '📋 Show Resolved'}
          {resolvedCount > 0 && (
            <span className="badge bg-secondary ms-1">
              {resolvedCount}
            </span>
          )}
        </Button>
      </div>

      <Card>
        {filteredItems.length === 0 ? (
          <div className="text-center p-5 text-muted">
            <h6>No items {showResolved ? 'in this list' : 'to buy'}</h6>
            <p className="mb-0">
              {showResolved 
                ? 'No completed items yet' 
                : 'Add some items to your shopping list'
              }
            </p>
          </div>
        ) : (
          <div className="list-group list-group-flush">
            {filteredItems.map((item, index) => (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                quantity={item.quantity}
                resolved={item.resolved}
                isOwner={isOwner}
                index={index}
                onToggleResolved={handleToggleResolved}
                onDelete={onItemDelete}
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ItemsContainer;