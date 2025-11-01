import React from 'react';
import Checkbox from './Checkbox';
import ItemDetails from './ItemDetails';
import DeleteButton from './DeleteButton';

const Item = ({ id, name, quantity, resolved, isOwner, index, onToggleResolved, onDelete }) => {
  const rowClass = `item-row ${index % 2 === 0 ? 'even' : 'odd'} list-group-item d-flex justify-content-between align-items-center`;

  return (
    <div className={rowClass}>
      <div className="d-flex align-items-center flex-grow-1">
        <Checkbox 
          checked={resolved} 
          onChange={() => onToggleResolved(id)}
        />
        <ItemDetails name={name} quantity={quantity} resolved={resolved} />
      </div>
      
      <div className="d-flex align-items-center">
        {(isOwner || resolved) && (
          <DeleteButton onDelete={() => onDelete(id)} />
        )}
      </div>
    </div>
  );
};

export default Item;