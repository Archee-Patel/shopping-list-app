import React from 'react';
import { Form } from 'react-bootstrap';

const Checkbox = ({ checked, onChange }) => {
  return (
    <Form.Check 
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="me-3"
      style={{ minWidth: '20px' }}
    />
  );
};

export default Checkbox;