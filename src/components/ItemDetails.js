import React from 'react';

const ItemDetails = ({ name, quantity, resolved }) => {
  return (
    <div className="item-details flex-grow-1">
      <span className={resolved ? 'text-decoration-line-through text-muted' : 'fw-semibold'}>
        {name}
      </span>
      <small className="text-muted ms-2">- {quantity}</small>
    </div>
  );
};

export default ItemDetails;